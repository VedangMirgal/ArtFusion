from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torchvision import models, transforms
from PIL import Image
import numpy as np
from io import BytesIO
from fastapi.responses import FileResponse
import uvicorn
import cv2
import tensorflow as tf
import tensorflow_hub as hub
import shutil
import os
import tempfile

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load VGG Model (new)
vgg = models.vgg19(pretrained=True).features
for param in vgg.parameters():
    param.requires_grad_(False)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
vgg.to(device)

# Feature extraction function
def get_features(image, model, layers=None):
    if layers is None:
        layers = {
            '0': 'conv1_1',
            '5': 'conv2_1',
            '10': 'conv3_1',
            '19': 'conv4_1',
            '21': 'conv4_2',
            '28': 'conv5_1'
        }

    features = {}
    x = image
    for name, layer in model._modules.items():
        x = layer(x)
        if name in layers:
            features[layers[name]] = x
    return features

# Gram matrix function
def gram_matrix(tensor):
    _, d, h, w = tensor.size()
    tensor = tensor.view(d, h * w)
    return torch.mm(tensor, tensor.t())

# Image loading function
def load_image(image, max_size=400, shape=None):
    size = min(max(image.size), max_size) if shape is None else shape

    in_transform = transforms.Compose([
        transforms.Resize(size),
        transforms.ToTensor(),
        transforms.Normalize((0.485, 0.456, 0.406), (0.229, 0.224, 0.225))
    ])
    image = in_transform(image)[:3, :, :].unsqueeze(0)
    return image

# Convert tensor to image
def im_convert(tensor):
    image = tensor.to("cpu").clone().detach().numpy().squeeze()
    image = image.transpose(1,2,0)
    image = image * np.array((0.229, 0.224, 0.225)) + np.array((0.485, 0.456, 0.406))
    image = np.clip(image, 0, 1)
    return Image.fromarray((image * 255).astype('uint8'))

@app.post("/style-transfer/")
async def style_transfer(content_image: UploadFile = File(...), style_image: UploadFile = File(...)):
    try:
        # Load images
        content = Image.open(BytesIO(await content_image.read())).convert("RGB")
        style = Image.open(BytesIO(await style_image.read())).convert("RGB")

        content = load_image(content).to(device)
        style = load_image(style, shape=content.shape[-2:]).to(device)

        # Extract features
        content_features = get_features(content, vgg)
        style_features = get_features(style, vgg)
        style_grams = {layer: gram_matrix(style_features[layer]) for layer in style_features}

        # Create target image
        target = content.clone().requires_grad_(True).to(device)

        # Define weights
        style_weights = {'conv1_1': 1.0, 'conv2_1': 0.75, 'conv3_1': 0.2, 'conv4_1': 0.2, 'conv5_1': 0.2}
        content_weight = 1
        style_weight = 1e6

        # Optimizer
        optimizer = torch.optim.Adam([target], lr=0.003)

        # Training loop
        steps = 1000
        for step in range(steps):
            target_features = get_features(target, vgg)

            # Content loss
            content_loss = torch.mean((target_features['conv4_2'] - content_features['conv4_2'])**2)

            # Style loss
            style_loss = 0
            for layer in style_weights:
                target_feature = target_features[layer]
                target_gram = gram_matrix(target_feature)
                _, d, h, w = target_feature.shape
                style_gram = style_grams[layer]
                layer_style_loss = style_weights[layer] * torch.mean((target_gram - style_gram)**2)
                style_loss += layer_style_loss / (d * h * w)

            # Total loss
            total_loss = content_weight * content_loss + style_weight * style_loss

            optimizer.zero_grad()
            total_loss.backward()
            optimizer.step()

            if step % 400 == 0:
                print(f"Step {step}, Content Loss: {content_loss.item()}, Style Loss: {style_loss.item()}, Total Loss: {total_loss.item()}")

        # Convert and return final image
        img_pil = im_convert(target)
        img_byte_arr = BytesIO()
        img_pil.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)

        return Response(content=img_byte_arr.read(), media_type="image/png")

    except Exception as e:
        return {"error": str(e)}
    
# STYLE_MODEL_URL = "https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2"
# hub_module = hub.load(STYLE_MODEL_URL)
# def apply_style_transfer(frame, style_image):
#     """Applies style transfer on a single frame."""
#     image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     style_rgb = cv2.cvtColor(style_image, cv2.COLOR_BGR2RGB)

#     # Resize and normalize images
#     resized_frame = cv2.resize(image_rgb, (256, 256)).astype(np.float32) / 255.0
#     resized_style = cv2.resize(style_rgb, (256, 256)).astype(np.float32) / 255.0

#     # Convert to TensorFlow tensors
#     content_tensor = tf.convert_to_tensor([resized_frame], dtype=tf.float32)
#     style_tensor = tf.convert_to_tensor([resized_style], dtype=tf.float32)

#     # Apply style transfer
#     outputs = hub_module(content_tensor, style_tensor)
#     stylized_image = outputs[0].numpy()[0]
    
#     return cv2.cvtColor((stylized_image * 255).astype(np.uint8), cv2.COLOR_RGB2BGR)

# def process_video(video_path, style_image_path, output_path):
#     """Processes video and applies style transfer frame by frame."""
#     cap = cv2.VideoCapture(video_path)
#     style_image = cv2.imread(style_image_path)
    
#     frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
#     fps = int(cap.get(cv2.CAP_PROP_FPS))
    
#     out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (256, 256))
    
#     counter = 0
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break
        
#         print(f"Processing Frame: {counter}")
#         stylized_frame = apply_style_transfer(frame, style_image)
#         out.write(stylized_frame)
#         counter += 1
    
#     cap.release()
#     out.release()
#     return output_path
# @app.post("/video-style-transfer/")
# async def upload_files(content_video: UploadFile = File(...), style_image: UploadFile = File(...)):
#     """Endpoint to receive video and style image from the frontend and return the processed video."""

#     with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as video_temp, \
#          tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as style_temp:
        
#         video_path = video_temp.name
#         style_image_path = style_temp.name

#     # Save uploaded files temporarily
#     with open(video_path, "wb") as buffer:
#         shutil.copyfileobj(content_video.file, buffer)

#     with open(style_image_path, "wb") as buffer:
#         shutil.copyfileobj(style_image.file, buffer)

#     # Process the video
#     output_path = "styled_output.mp4"
#     processed_video = process_video(video_path, style_image_path, output_path)

#     # Delete temporary files
#     os.remove(video_path)
#     os.remove(style_image_path)

#     # Send back the generated video
#     return FileResponse(processed_video, media_type="video/mp4", filename="styled_output.mp4")