"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Mail, ArrowRight, Github, Linkedin, Twitter, ImageIcon, CuboidIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TeamMember {
  id: string
  name: string
  role: string
  description: string
  image: string
  skills: string[]
  social: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    id: "ronit",
    name: "Ronit Naik",
    role: "Digital Artist",
    description:
      "Expert in creating AI models with a focus on neural style transfer techniques and image processing algorithms.",
    image: "/src/assets/Ronit.png", // Updated to use the actual image path
    skills: ["Neural Networks", "Image Processing", "AI Models"],
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: "vedang",
    name: "Vedang Mirgal",
    role: "3D Stylist",
    description:
      "Specializes in 3D animations and applying artistic styles to three-dimensional objects and environments.",
    image: "/src/assets/Vedang.png", // Updated to use the actual image path
    skills: ["3D Modeling", "Animation", "Style Transfer"],
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
  {
    id: "rohit",
    name: "Rohit Patra",
    role: "UI/UX Designer",
    description: "Creates intuitive and visually appealing interfaces that enhance user experience and engagement.",
    image: "/src/assets/Rohit.png", // Updated to use the actual image path
    skills: ["UI Design", "User Experience", "Prototyping"],
    social: {
      twitter: "#",
      github: "#",
      linkedin: "#",
    },
  },
]

export default function About() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div id="about" className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Users size={16} className="text-purple-300" />
              <span className="text-sm font-medium text-purple-300">Our Team</span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
                ArtFusion
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              ArtFusion is a revolutionary platform that merges multiple Neural Style Transfer techniques into a
              seamless, user-friendly experience. Our mission is to democratize artistic creation by giving users full
              creative freedom in both 2D and Video domains.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
              <Button className="bg-white text-purple-900 hover:bg-purple-100 group" size="lg">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-purple-900/50 to-gray-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our talented team combines expertise in AI, design, and development to create cutting-edge style transfer
              solutions for artists and creators.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1 }}
                          animate={{
                            scale: hoveredMember === member.id ? 1.05 : 1,
                          }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"
                        initial={{ opacity: 0.6 }}
                        animate={{
                          opacity: hoveredMember === member.id ? 0.8 : 0.6,
                        }}
                        transition={{ duration: 0.4 }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-purple-300 mb-3">{member.role}</p>
                        <div className="flex gap-2 mb-3">
                          {member.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="bg-white/10 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          {member.social.twitter && (
                            <motion.a
                              href={member.social.twitter}
                              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              whileHover={{ y: -3 }}
                            >
                              <Twitter size={16} />
                            </motion.a>
                          )}
                          {member.social.github && (
                            <motion.a
                              href={member.social.github}
                              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              whileHover={{ y: -3 }}
                            >
                              <Github size={16} />
                            </motion.a>
                          )}
                          {member.social.linkedin && (
                            <motion.a
                              href={member.social.linkedin}
                              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                              whileHover={{ y: -3 }}
                            >
                              <Linkedin size={16} />
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-purple-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Approach</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              ArtFusion focuses on two key areas that set us apart from other style transfer platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center mb-6">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">2D Image Style Transfer</h3>
              <p className="text-gray-300 mb-6">
                Unlike existing tools that rely on predefined filters, ArtFusion gives users full creative freedom by
                allowing them to upload their own style and content references, resulting in more personalized and
                unique transformations.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Custom style references
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  High-resolution output
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-blue-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Advanced neural network algorithms
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mb-6">
                <CuboidIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Video Style Synthesis</h3>
              <p className="text-gray-300 mb-6">
                While NST is traditionally limited to 2D images, we are exploring its application to Video models, enabling
                users to transfer artistic aesthetics onto moving objects. This could be a game-changer for
                digital art, gaming, and virtual reality.
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-purple-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Video style transfer
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-purple-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  Video model styling
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-purple-500/20 p-1 rounded-full">
                    <svg className="h-3 w-3 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  VR/AR applications
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}