"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Github, Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all fields.")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Simulating submission for demo purposes
    setTimeout(() => {
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitting(false)
    }, 1500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <div id="contact" className="min-h-screen bg-gradient-to-br from-indigo-900 via-violet-800 to-purple-900 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5 backdrop-blur-sm"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.9, 1],
              opacity: [0, 0.15, 0.1, 0.05],
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

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white tracking-tight">
              Get in <span className="text-indigo-300">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto">
              Have questions about ArtFusion? We'd love to hear from you and help bring your creative vision to life.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            {/* Contact Info Side */}
            <motion.div
              className="md:w-1/3 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 text-white"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h2 className="text-2xl font-semibold mb-6 text-indigo-200" variants={itemVariants}>
                Contact Information
              </motion.h2>

              <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                  <div className="bg-indigo-500/30 p-3 rounded-full group-hover:bg-indigo-500/50 transition-colors">
                    <Phone className="h-5 w-5 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-200">Phone</h3>
                    <p className="mt-1 text-white/80">+91 98765 43210</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                  <div className="bg-indigo-500/30 p-3 rounded-full group-hover:bg-indigo-500/50 transition-colors">
                    <Mail className="h-5 w-5 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-200">Email</h3>
                    <p className="mt-1 text-white/80">contact@artfusion.com</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex items-start space-x-4 group">
                  <div className="bg-indigo-500/30 p-3 rounded-full group-hover:bg-indigo-500/50 transition-colors">
                    <MapPin className="h-5 w-5 text-indigo-200" />
                  </div>
                  <div>
                    <h3 className="font-medium text-indigo-200">Office</h3>
                    <p className="mt-1 text-white/80">
                      123 Creative Avenue
                      <br />
                      Innovation District
                      <br />
                      Mumbai 400050
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-medium mb-4 text-indigo-200">Connect With Us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="#"
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>

            {/* Form Side - Now with glassmorphic styling */}
            <motion.div
              className="md:w-2/3 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20 text-white"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6 text-indigo-200">Send Us a Message</h2>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    className="text-center py-16"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <motion.div
                      className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500/30 rounded-full mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="h-8 w-8 text-indigo-200" />
                    </motion.div>
                    <motion.h3
                      className="text-2xl font-bold text-indigo-100 mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Thank You!
                    </motion.h3>
                    <motion.p
                      className="text-indigo-200 mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Your message has been sent successfully. We'll get back to you soon.
                    </motion.p>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {error && (
                      <motion.div
                        className="bg-red-500/20 border border-red-500/50 text-white px-4 py-3 rounded-lg text-sm"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring" }}
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label htmlFor="name" className="text-indigo-200">
                        Full Name
                      </Label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label htmlFor="email" className="text-indigo-200">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div className="space-y-2" variants={itemVariants}>
                      <Label htmlFor="message" className="text-indigo-200">
                        Your Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="How can we help you today?"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-white/10 border-white/20 text-white placeholder:text-indigo-300/60 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                        disabled={isSubmitting}
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Loader2 className="animate-spin h-5 w-5" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}