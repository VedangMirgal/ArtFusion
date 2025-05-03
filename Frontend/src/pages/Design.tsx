"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Upload,
  CuboidIcon as Cube,
  ImageIcon,
  ArrowRight,
  Download,
  Loader,
  MoonStar,
  Sun,
  Sparkles,
  Palette,
  Wand2,
  Layers,
  CheckCircle2,
  Zap,
  Share2,
  BookmarkPlus,
  LogOut,
  User,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom"


const imageUrls: string[] = [
  "/art1.jpg",
  "/art2.jpg",
  "/art3.jpg",
  "/art4.jpg",
];

// Instead of importing a file that might not exist, we'll use a URL
const DEMO_VIDEO_URL = "/placeholder.svg?height=400&width=600&text=Demo%20Video"

const Popup = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={18} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="p-8 pt-10">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const FeatureCard: React.FC<{
  title: string
  description: string
  icon: React.ReactNode
  is3D?: boolean
  onClick: () => void
}> = ({ title, description, icon, is3D = false, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        cursor-pointer
        relative
        overflow-hidden
        rounded-2xl
        shadow-lg
        transition-all
        duration-300
        ${is3D
          ? "bg-gradient-to-br from-purple-500/90 to-indigo-600/90 dark:from-purple-600/90 dark:to-indigo-700/90"
          : "bg-gradient-to-br from-blue-500/90 to-teal-400/90 dark:from-blue-600/90 dark:to-teal-500/90"
        }
      `}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 -translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-12 -translate-x-8"></div>

      <div className="relative p-8 flex flex-col h-full">
        <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-6">{description}</p>
        <div className="mt-auto flex items-center text-white font-medium">
          <span>Get Started</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </motion.div>
  )
}

const UploadCard = ({
  title,
  description,
  onUpload,
  acceptType = "image/*",
  icon,
}: {
  title: string
  description: string
  onUpload: (file: File) => void
  acceptType?: string
  icon: React.ReactNode
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      if (acceptType === "image/*" && !file.type.startsWith("image/")) {
        alert("Please upload a valid image file.")
        return
      }
      if (acceptType === "video/*" && !file.type.startsWith("video/")) {
        alert("Please upload a valid video file.")
        return
      }
      onUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (acceptType === "image/*" && !file.type.startsWith("image/")) {
        alert("Please upload a valid image file.")
        return
      }
      if (acceptType === "video/*" && !file.type.startsWith("video/")) {
        alert("Please upload a valid video file.")
        return
      }
      onUpload(file)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={handleClick}
      className={`
        border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
        ${isDragging
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
          : "border-gray-300 dark:border-gray-600 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        }
      `}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{description}</p>
        <span className="text-indigo-600 dark:text-indigo-400 font-medium">Browse files</span>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptType}
        className="hidden"
        id={`upload-${title.split(" ").join("-")}`}
        onChange={handleFileSelect}
      />
    </motion.div>
  )
}

const ResultCard = ({
  title,
  media,
  type,
  onDownload,
}: {
  title: string
  media: string
  type: "image" | "video"
  onDownload: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
    >
      <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <h3 className="font-medium flex items-center">
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {title}
        </h3>
      </div>
      <div className="p-2">
        {type === "image" ? (
          <img src={media || "/placeholder.svg"} alt="Result" className="w-full h-auto object-cover rounded-lg" />
        ) : (
          <video src={media} controls className="w-full h-auto rounded-lg" />
        )}
      </div>
      <div className="p-4">
        <button
          onClick={onDownload}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <Download size={16} />
          <span>Download {type === "image" ? "Image" : "Video"}</span>
        </button>
      </div>
    </motion.div>
  )
}

// Settings popup component
const SettingsPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [userName, setUserName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [notifications, setNotifications] = useState(true)

  if (!isOpen) return null

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Account Settings</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Manage your profile and preferences</p>

        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg?height=64&width=64" alt={userName} />
            <AvatarFallback>
              {userName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{userName}</h3>
            <p className="text-gray-500 dark:text-gray-400">{email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-900 dark:text-white">
              Name
            </Label>
            <Input
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 dark:text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-gray-900 dark:text-white">
              Email Notifications
            </Label>
            <div
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
              onClick={() => setNotifications(!notifications)}
            >
              <span
                className={`${notifications ? "translate-x-6 bg-indigo-600" : "translate-x-1 bg-gray-500"} inline-block h-4 w-4 transform rounded-full transition-transform`}
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onClose()
              // Here you would typically save the settings
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Popup>
  )
}

export default function Design() {
  const router = useNavigate()
  const { toast } = useToast()
  const [is3DPopupOpen, setIs3DPopupOpen] = useState(false)
  const [is2DPopupOpen, setIs2DPopupOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<{
    contentImage?: File
    styleImage?: File
    resultImage?: string
    resultBlob?: Blob
  }>({})
  const [uploaded3DFiles, setUploaded3DFiles] = useState<{
    contentVideo?: File
    styleImage?: File
    resultVideo?: string
    resultBlob?: Blob
  }>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [is3DProcessing, setIs3DProcessing] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [show3DResult, setShow3DResult] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<"2d" | "3d">("2d")

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleContentUpload = (file: File) => {
    setUploadedFiles((prev) => ({ ...prev, contentImage: file }))
    toast({
      title: "Content image uploaded",
      description: "Your content image has been successfully uploaded.",
    })
  }

  const handleStyleUpload = (file: File) => {
    setUploadedFiles((prev) => ({ ...prev, styleImage: file }))
    toast({
      title: "Style image uploaded",
      description: "Your style image has been successfully uploaded.",
    })
  }

  const handle3DContentUpload = (file: File) => {
    setUploaded3DFiles((prev) => ({ ...prev, contentVideo: file }))
    toast({
      title: "Content video uploaded",
      description: "Your content video has been successfully uploaded.",
    })
  }

  const handle3DStyleUpload = (file: File) => {
    setUploaded3DFiles((prev) => ({ ...prev, styleImage: file }))
    toast({
      title: "Style image uploaded",
      description: "Your style image has been successfully uploaded.",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router("/login")
  }

  // Function to send the images to backend for 2D style transfer
  const handleStyleTransfer = async () => {
    if (uploadedFiles.contentImage && uploadedFiles.styleImage) {
      setIsProcessing(true)

      const formData = new FormData()
      formData.append("content_image", uploadedFiles.contentImage)
      formData.append("style_image", uploadedFiles.styleImage)

      try {
        const response = await axios.post("http://127.0.0.1:8000/style-transfer/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // Set responseType to arraybuffer to handle binary data
        })

        console.log(response.data)

        // Convert the binary data to a Blob
        const blob = new Blob([response.data], { type: "image/png" })

        // Create a URL for the Blob
        const imageUrl = URL.createObjectURL(blob)

        // Update the state with the image URL and Blob
        setUploadedFiles((prev) => ({
          ...prev,
          resultImage: imageUrl, // Set the result image to the Blob URL
          resultBlob: blob, // Store the blob for download
        }))

        setIsProcessing(false)
        setIs2DPopupOpen(false)
        setShowResult(true)

        toast({
          title: "Style transfer complete",
          description: "Your image has been successfully processed.",
        })
      } catch (error) {
        console.error("Error during style transfer:", error)

        // For demo purposes, simulate a successful response
        setTimeout(() => {
          // Use one of the uploaded images as a mock result
          if (uploadedFiles.styleImage) {
            const mockResultUrl = URL.createObjectURL(uploadedFiles.styleImage)
            setUploadedFiles((prev) => ({
              ...prev,
              resultImage: mockResultUrl,
            }))
            setShowResult(true)
          }
          setIsProcessing(false)
          setIs2DPopupOpen(false)

          toast({
            title: "Style transfer complete",
            description: "Your image has been successfully processed (demo mode).",
          })
        }, 2000)
      }
    }
  }

  // Function to send the video and style image to backend for 3D style transfer
  const handle3DStyleTransfer = async () => {
    if (uploaded3DFiles.contentVideo && uploaded3DFiles.styleImage) {
      setIs3DProcessing(true)

      const formData = new FormData()
      formData.append("content_video", uploaded3DFiles.contentVideo)
      formData.append("style_image", uploaded3DFiles.styleImage)

      try {
        // This would be your actual API endpoint for 3D style transfer
        const response = await axios.post("http://127.0.0.1:8000/video-style-transfer/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer", // Set responseType to arraybuffer to handle binary data
        })

        // Convert the binary data to a Blob
        const blob = new Blob([response.data], { type: "video/mp4" })

        // Create a URL for the Blob
        const videoUrl = URL.createObjectURL(blob)

        // Update the state with the video URL and Blob
        setUploaded3DFiles((prev) => ({
          ...prev,
          resultVideo: videoUrl,
          resultBlob: blob,
        }))

        setIs3DProcessing(false)
        setIs3DPopupOpen(false)
        setShow3DResult(true)

        toast({
          title: "3D style transfer complete",
          description: "Your video has been successfully processed.",
        })
      } catch (error) {
        console.error("Error during 3D style transfer:", error)

        // For demo purposes, simulate a successful response after 3 seconds
        setTimeout(() => {
          setUploaded3DFiles((prev) => ({
            ...prev,
            resultVideo: DEMO_VIDEO_URL,
          }))
          setIs3DProcessing(false)
          setIs3DPopupOpen(false)
          setShow3DResult(true)

          toast({
            title: "3D style transfer complete",
            description: "Your video has been successfully processed (demo mode).",
          })
        }, 3000)
      }
    }
  }

  // Function to handle image download
  const handleDownload = () => {
    if (uploadedFiles.resultBlob) {
      // Create download link
      const downloadLink = document.createElement("a")

      // Set the download attribute with a filename
      downloadLink.download = "art_fusion_result.png"

      // Create a URL for the blob
      downloadLink.href = URL.createObjectURL(uploadedFiles.resultBlob)

      // Append to the document
      document.body.appendChild(downloadLink)

      // Trigger click
      downloadLink.click()

      // Clean up
      document.body.removeChild(downloadLink)

      toast({
        title: "Download started",
        description: "Your image is being downloaded.",
      })
    } else if (uploadedFiles.resultImage) {
      // If we don't have a blob but have an image URL
      const downloadLink = document.createElement("a")
      downloadLink.download = "art_fusion_result.png"
      downloadLink.href = uploadedFiles.resultImage
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      toast({
        title: "Download started",
        description: "Your image is being downloaded.",
      })
    }
  }

  // Function to handle video download
  const handle3DDownload = () => {
    if (uploaded3DFiles.resultBlob) {
      // Create download link
      const downloadLink = document.createElement("a")

      // Set the download attribute with a filename
      downloadLink.download = "art_fusion_3d_result.mp4"

      // Create a URL for the blob
      downloadLink.href = URL.createObjectURL(uploaded3DFiles.resultBlob)

      // Append to the document
      document.body.appendChild(downloadLink)

      // Trigger click
      downloadLink.click()

      // Clean up
      document.body.removeChild(downloadLink)

      toast({
        title: "Download started",
        description: "Your video is being downloaded.",
      })
    } else if (uploaded3DFiles.resultVideo) {
      // If we're using the demo video
      const downloadLink = document.createElement("a")
      downloadLink.download = "art_fusion_3d_result.mp4"
      downloadLink.href = uploaded3DFiles.resultVideo
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      toast({
        title: "Download started",
        description: "Your video is being downloaded.",
      })
    }
  }

  return (
    <>
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 text-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-300" />
            <span className="font-bold text-xl">ArtFusion</span>
          </Link>

          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? <Sun className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full border border-white/20 p-0">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder.svg?height=36&width=36" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div
        className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center mb-4">
              <Badge variant="outline" className="px-3 py-1 border-purple-400/30 bg-purple-400/10 text-purple-400">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Creative Studio
              </Badge>
            </div>
            <h1
              className={`text-4xl md:text-5xl font-bold mb-4 ${isDarkMode ? "bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300" : "bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600"}`}
            >
              ArtFusion Studio
            </h1>
            <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Transform your creative vision with our powerful style transfer tools. Blend 2D and art styles to create
              unique visual experiences.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <Tabs defaultValue="2d" className="mb-8" onValueChange={(value) => setActiveTab(value as "2d" | "3d")}>
            <div className="flex justify-center">
              <TabsList className={`grid w-full max-w-md grid-cols-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <TabsTrigger value="2d">2D Design</TabsTrigger>
                <TabsTrigger value="3d">Video Visualization</TabsTrigger>
                
                <TabsTrigger value="4d">
                <Link to ="https://style-transfer-frontend.vercel.app" target="_blank">
                  Faster Output
                </Link>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="2d" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeatureCard
                    title="2D Style Transfer"
                    description="Transform your images with artistic styles. Perfect for creating unique digital art and designs."
                    icon={<Palette className="h-8 w-8 text-white" />}
                    onClick={() => setIs2DPopupOpen(true)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Wand2 className={`h-5 w-5 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        How It Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-purple-500/30 text-purple-200" : "bg-purple-100 text-purple-700"} font-medium mr-3`}
                          >
                            1
                          </span>
                          <div>
                            <p className="font-medium">Upload your content</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Select an image you want to transform
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-indigo-500/30 text-indigo-200" : "bg-indigo-100 text-indigo-700"} font-medium mr-3`}
                          >
                            2
                          </span>
                          <div>
                            <p className="font-medium">Choose a style</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Upload a reference image with the style you want to apply
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-pink-500/30 text-pink-200" : "bg-pink-100 text-pink-700"} font-medium mr-3`}
                          >
                            3
                          </span>
                          <div>
                            <p className="font-medium">Process and download</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Our model will blend the content and style, creating a unique result
                            </p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                    <CardFooter>
                      <div
                        className={`flex items-center text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        <span>Powered by advanced neural style transfer models</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="3d" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FeatureCard
                    title="Video Style Transfer"
                    description="Apply artistic styles to videos. Create immersive visual experiences."
                    icon={<Cube className="h-8 w-8 text-white" />}
                    is3D
                    onClick={() => setIs3DPopupOpen(true)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Wand2 className={`h-5 w-5 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        How It Works
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-4">
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-purple-500/30 text-purple-200" : "bg-purple-100 text-purple-700"} font-medium mr-3`}
                          >
                            1
                          </span>
                          <div>
                            <p className="font-medium">Upload your video</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Select a video you want to transform
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-indigo-500/30 text-indigo-200" : "bg-indigo-100 text-indigo-700"} font-medium mr-3`}
                          >
                            2
                          </span>
                          <div>
                            <p className="font-medium">Choose a style</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Upload a reference image with the style you want to apply
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <span
                            className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isDarkMode ? "bg-pink-500/30 text-pink-200" : "bg-pink-100 text-pink-700"} font-medium mr-3`}
                          >
                            3
                          </span>
                          <div>
                            <p className="font-medium">Process and download</p>
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Our model will apply the style to each frame of your video
                            </p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                    <CardFooter>
                      <div
                        className={`flex items-center text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        <span>Powered by advanced neural style transfer models</span>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Display 2D uploaded files and results */}
          {(uploadedFiles.contentImage || uploadedFiles.styleImage || uploadedFiles.resultImage) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-12 rounded-2xl p-6 shadow-xl ${isDarkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-white"}`}
            >
              <div className="flex items-center mb-6">
                <Layers className={`h-5 w-5 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                <h2 className="text-2xl font-bold">2D Style Transfer</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {uploadedFiles.contentImage && (
                  <Card className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <ImageIcon className={`h-4 w-4 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        Content Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative rounded-lg overflow-hidden aspect-square">
                        <img
                          src={URL.createObjectURL(uploadedFiles.contentImage) || "/placeholder.svg"}
                          alt="Content"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {uploadedFiles.styleImage && (
                  <Card className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Palette className={`h-4 w-4 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        Style Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative rounded-lg overflow-hidden aspect-square">
                        <img
                          src={URL.createObjectURL(uploadedFiles.styleImage) || "/placeholder.svg"}
                          alt="Style"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {uploadedFiles.resultImage && showResult && (
                  <ResultCard
                    title="Result Image"
                    media={uploadedFiles.resultImage}
                    type="image"
                    onDownload={handleDownload}
                  />
                )}
              </div>

              {uploadedFiles.contentImage && uploadedFiles.styleImage && !uploadedFiles.resultImage && (
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleStyleTransfer}
                    disabled={isProcessing}
                    className={`flex items-center gap-2 py-3 px-6 rounded-lg transition-colors ${isDarkMode
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white disabled:from-gray-600 disabled:to-gray-700"
                        : "bg-gradient-to-r from-pink-600 to-purple-700 hover:from-pink-700 hover:to-purple-800 text-white disabled:from-gray-400 disabled:to-gray-500"
                      }`}
                  >
                    {isProcessing ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        <span>Generate Artwork</span>
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Display 3D uploaded files and results */}
          {(uploaded3DFiles.contentVideo || uploaded3DFiles.styleImage || uploaded3DFiles.resultVideo) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-12 rounded-2xl p-6 shadow-xl ${isDarkMode ? "bg-gray-800/80 backdrop-blur-sm" : "bg-white"}`}
            >
              <div className="flex items-center mb-6">
                <Cube className={`h-5 w-5 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                <h2 className="text-2xl font-bold">3D Style Transfer</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {uploaded3DFiles.contentVideo && (
                  <Card className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <ImageIcon className={`h-4 w-4 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        Content Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative rounded-lg overflow-hidden">
                        <video
                          src={URL.createObjectURL(uploaded3DFiles.contentVideo)}
                          controls
                          className="w-full h-auto"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {uploaded3DFiles.styleImage && (
                  <Card className={isDarkMode ? "bg-gray-900/50" : "bg-gray-50"}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Palette className={`h-4 w-4 mr-2 ${isDarkMode ? "text-purple-400" : "text-purple-600"}`} />
                        Style Image
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative rounded-lg overflow-hidden aspect-square">
                        <img
                          src={URL.createObjectURL(uploaded3DFiles.styleImage) || "/placeholder.svg"}
                          alt="Style"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {uploaded3DFiles.resultVideo && show3DResult && (
                  <ResultCard
                    title="Result Video"
                    media={uploaded3DFiles.resultVideo}
                    type="video"
                    onDownload={handle3DDownload}
                  />
                )}
              </div>

              {uploaded3DFiles.contentVideo && uploaded3DFiles.styleImage && !uploaded3DFiles.resultVideo && (
                <div className="mt-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handle3DStyleTransfer}
                    disabled={is3DProcessing}
                    className={`flex items-center gap-2 py-3 px-6 rounded-lg transition-colors ${isDarkMode
                        ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white disabled:from-gray-600 disabled:to-gray-700"
                        : "bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white disabled:from-gray-400 disabled:to-gray-500"
                      }`}
                  >
                    {is3DProcessing ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        <span>Processing Video...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 size={18} />
                        <span>Generate 3D Artwork</span>
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          )}

          {/* Featured Artworks */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Artworks</h2>
              <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Explore creations made with ArtFusion</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {imageUrls.map((url, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative rounded-xl overflow-hidden h-64 shadow-md"
                >
                  <img
                    src={url}
                    alt={`Featured Artwork ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold">Artwork Title {i + 1}</h3>
                      <p className="text-gray-200 text-sm">by Artist Name</p>
                      <div className="flex mt-2 space-x-2">
                        <button className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <Share2 className="h-4 w-4 text-white" />
                        </button>
                        <button className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                          <BookmarkPlus className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Popup */}
          <Popup isOpen={is3DPopupOpen} onClose={() => setIs3DPopupOpen(false)}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Video Style Transfer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Upload a video and style image to create a stylized Video animation
              </p>

              <div className="grid gap-6">
                <UploadCard
                  title="Upload Content Video"
                  description="Select a video file to apply style to"
                  onUpload={handle3DContentUpload}
                  acceptType="video/*"
                  icon={<Upload className="h-6 w-6 text-purple-500" />}
                />
                <UploadCard
                  title="Upload Style Image"
                  description="Select an image that defines the artistic style"
                  onUpload={handle3DStyleUpload}
                  acceptType="image/*"
                  icon={<Palette className="h-6 w-6 text-purple-500" />}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handle3DStyleTransfer}
                disabled={!uploaded3DFiles.contentVideo || !uploaded3DFiles.styleImage || is3DProcessing}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {is3DProcessing ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Processing Video...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Transfer Style to Video</span>
                  </>
                )}
              </motion.button>

              {is3DProcessing && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>This may take a few minutes. Please wait...</p>
                </div>
              )}
            </div>
          </Popup>

          {/* 2D Popup */}
          <Popup isOpen={is2DPopupOpen} onClose={() => setIs2DPopupOpen(false)}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">2D Style Transfer</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Upload content and style images to create a unique artistic blend
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <UploadCard
                  title="Content Image"
                  description="The base image to transform"
                  onUpload={handleContentUpload}
                  icon={<Upload className="h-6 w-6 text-pink-500" />}
                />
                <UploadCard
                  title="Style Image"
                  description="The artistic style to apply"
                  onUpload={handleStyleUpload}
                  icon={<Palette className="h-6 w-6 text-pink-500" />}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStyleTransfer}
                disabled={!uploadedFiles.contentImage || !uploadedFiles.styleImage || isProcessing}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={20} />
                    <span>Transfer Style</span>
                  </>
                )}
              </motion.button>

              {isProcessing && (
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <p>Please wait while we process your images...</p>
                </div>
              )}
            </div>
          </Popup>

          {/* Settings Popup */}
          <SettingsPopup isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </div>
      </div>
    </>
  )
}