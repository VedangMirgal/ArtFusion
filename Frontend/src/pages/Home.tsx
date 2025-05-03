"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Check, Sparkles, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import About from "@/components/AboutOld"
import Contact from "@/components/ContactOld"
import { useNavigate } from "react-router-dom"

// Import demo video
import DemoVideo from "@/assets/3d_demo_video.mp4"

export default function Home() {
  const router = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(true)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signUpData, setSignUpData] = useState({ name: "", email: "", password: "" })
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)

  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A") {
        const href = target.getAttribute("href")
        if (href && href.startsWith("#")) {
          e.preventDefault()
          const targetId = href.substring(1)
          const targetElement = document.getElementById(targetId)
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80, // Offset for navbar
              behavior: "smooth",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)
    return () => document.removeEventListener("click", handleAnchorClick)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (showLoginForm) {
      setLoginData((prev) => ({ ...prev, [name]: value }))
    } else {
      setSignUpData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      router("/design")
    }, 800)
  }

  const handleSignUp = () => {
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      setErrorMessage("Please fill in all fields.")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      localStorage.setItem("isLoggedIn", "true")
      router("/onboarding")
    }, 800)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 overflow-hidden relative">
        <Navbar />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0.9, 1],
                opacity: [0, 0.2, 0.15, 0.1],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between relative z-10">
          <motion.div
            className="text-left w-full md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
                <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg">
                  <Sparkles className="w-6 h-6 text-purple-200" />
                </div>
                <span className="text-purple-200 font-medium">Model-Powered Style Transfer</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
                ArtFusion{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">
                  Style Synthesis
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-purple-100 leading-relaxed mb-8 text-lg md:text-xl max-w-xl"
              >
                Transform your creative vision with our enterprise-ready platform that merges 2D and Video style transfer
                techniques into a seamless, user-friendly experience.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setShowLoginForm(false)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white group"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                  onClick={() => setShowVideoModal(true)}
                >
                  Watch Demo
                </Button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <div className="flex items-center gap-2 text-sm text-purple-200">
                  <Check className="h-4 w-4" /> No credit card required
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-200 mt-2">
                  <Check className="h-4 w-4" /> 14-day free trial
                </div>
                <div className="flex items-center gap-2 text-sm text-purple-200 mt-2">
                  <Check className="h-4 w-4" /> Cancel anytime
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 max-w-md w-full"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              transition={{ duration: 0.3 }}
            >
              <motion.h2
                className="text-2xl font-semibold mb-6 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {showLoginForm ? "Welcome Back" : "Start Your Free Trial"}
              </motion.h2>

              {errorMessage && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errorMessage}
                </motion.div>
              )}

              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {!showLoginForm && (
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={signUpData.name}
                      onChange={handleChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
                    />
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={showLoginForm ? loginData.email : signUpData.email}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={showLoginForm ? loginData.password : signUpData.password}
                    onChange={handleChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-purple-400"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    onClick={showLoginForm ? handleLogin : handleSignUp}
                    className={cn(
                      "w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white",
                      isLoading && "opacity-80 cursor-not-allowed",
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </div>
                    ) : showLoginForm ? (
                      "Sign In"
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </motion.div>

                <motion.div variants={itemVariants} className="text-center text-white/80 mt-4">
                  {showLoginForm ? "Don't have an account? " : "Already have an account? "}
                  <button
                    onClick={() => {
                      setShowLoginForm(!showLoginForm)
                      setErrorMessage("")
                    }}
                    className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
                  >
                    {showLoginForm ? "Sign up" : "Sign in"}
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <section className="py-20 relative z-10" id="features">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Powerful Features</h2>
              <p className="text-purple-200 max-w-2xl mx-auto">
                Discover what makes ArtFusion the leading platform for creative style transfer
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "2D Style Transfer",
                  description: "Transform your images with artistic styles from any reference image",
                  icon: "🎨",
                },
                {
                  title: "3D Visualization",
                  description: "Apply artistic styles to videos and 3D models for immersive experiences",
                  icon: "🧊",
                },
                {
                  title: "Model-Powered",
                  description: "Advanced neural networks ensure high-quality results every time",
                  icon: "🧠",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-purple-200">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      <Footer />

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-r from-purple-900 to-indigo-900 rounded-xl p-4 max-w-4xl w-full">
            <button 
              onClick={() => setShowVideoModal(false)}
              className="absolute top-2 right-2 bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">ArtFusion Demo</h3>
            <div className="aspect-video rounded-lg overflow-hidden">
              <video 
                src={DemoVideo} 
                controls 
                className="w-full h-full"
                autoPlay
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
}