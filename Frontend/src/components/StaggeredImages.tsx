import React from 'react';

// JSON configuration for the staggered images
type ImageConfig = {
  id: string;
  src: string;
  alt: string;
  position: 'top' | 'middle' | 'bottom';
};

type GalleryConfig = {
  images?: ImageConfig[];
  spacing?: number;
  cornerRadius?: number;
  backgroundColor?: string;
};

const defaultGalleryConfig: GalleryConfig = {
  images: [
    {
      id: 'image1',
      src: '/api/placeholder/300/200',
      alt: 'Feature image 1',
      position: 'top',
    },
    {
      id: 'image2',
      src: '/api/placeholder/250/250',
      alt: 'Feature image 2',
      position: 'middle',
    },
    {
      id: 'image3',
      src: '/api/placeholder/300/180',
      alt: 'Feature image 3',
      position: 'bottom',
    },
  ],
  spacing: 16,
  cornerRadius: 16,
  backgroundColor: '#f8f9fa',
};

interface StaggeredGalleryProps {
  config?: GalleryConfig;
}

const StaggeredImageGallery: React.FC<StaggeredGalleryProps> = ({ config }) => {
  // Merge provided config with defaults
  const galleryConfig = {
    ...defaultGalleryConfig,
    ...config,
    images: config?.images ?? defaultGalleryConfig.images,
  };

  return (
    <div className="relative w-full h-full">
      {/* Container for staggered images */}
      <div
        className="flex flex-col h-full"
        style={{
          gap: `${galleryConfig.spacing}px`,
        }}
      >
        {/* Function to render images dynamically */}
        {['top', 'middle', 'bottom'].map((position, index) => {
          const image = galleryConfig.images?.find((img) => img.position === position) || galleryConfig.images?.[index];
          return (
            <div key={position} className="w-full" style={{ height: index === 1 ? '40%' : index === 0 ? '25%' : '35%' }}>
              <div
                className="w-full h-full overflow-hidden"
                style={{
                  borderRadius: `${galleryConfig.cornerRadius}px`,
                  backgroundColor: galleryConfig.backgroundColor,
                }}
              >
                {image && (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Usage example
const StaggeredGallery: React.FC = () => {
  const customConfig: GalleryConfig = {
    images: [
      {
        id: 'dashboard',
        src: '/api/placeholder/300/200',
        alt: 'Dashboard overview',
        position: 'top',
      },
      {
        id: 'analytics',
        src: '/api/placeholder/250/250',
        alt: 'Analytics panel',
        position: 'middle',
      },
      {
        id: 'features',
        src: '/api/placeholder/300/180',
        alt: 'Feature showcase',
        position: 'bottom',
      },
    ],
    spacing: 12,
    cornerRadius: 12,
    backgroundColor: '#ffffff',
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-3/5 p-6">
        {/* Your main content goes here */}
      </div>
      <div className="w-2/5 p-6">
        <StaggeredImageGallery config={customConfig} />
      </div>
    </div>
  );
};

export default StaggeredGallery;