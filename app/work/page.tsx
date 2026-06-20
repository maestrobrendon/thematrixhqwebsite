"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock, ArrowRight, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Project data
const behanceProjects = [
  {
    id: 1,
    title: "Alavda Travel",
    subtitle: "Brand Identity Design",
    category: "Branding",
    tags: ["visual design", "brand identity", "travel branding"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
    link: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",
    type: "behance"
  },
  {
    id: 2,
    title: "Stix & Codes",
    subtitle: "Branding for a Kids Tech Academy",
    category: "Branding",
    tags: ["education design", "kids brand", "tech education"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    link: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
    type: "behance"
  },
  {
    id: 3,
    title: "ARCLLY",
    subtitle: "Branding and Visual Identity",
    category: "Branding",
    tags: ["grocery", "brand identity", "food delivery"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
    link: "https://www.behance.net/gallery/209998445/ARCLLY-BRANDING-AND-VISUAL-IDENTITY",
    type: "behance"
  },
  {
    id: 4,
    title: "Sheikh Meow",
    subtitle: "Luxury Meme Token Branding & Social Media Identity",
    category: "Social Media",
    tags: ["cryptocurrency", "meme culture", "character design"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    link: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
    type: "behance"
  },
  {
    id: 5,
    title: "Let's Spot",
    subtitle: "Crypto Jackpot – The Ultimate Web3 Prize Token",
    category: "Web3",
    tags: ["crypto", "3D design", "blockchain"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279314/qttpvs3rqmdwba5hsojy.jpg",
    link: "https://www.behance.net/gallery/225118937/Crypto-Jackpot-The-Ultimate-Web3-Prize-Token",
    type: "behance"
  },
  {
    id: 6,
    title: "LEDGA Finance",
    subtitle: "Full Branding and Identity Design",
    category: "Finance",
    tags: ["finance", "corporate", "brand identity"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
    link: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    type: "behance"
  },
  {
    id: 7,
    title: "WEVOLTE Engineering",
    subtitle: "Brand Identity Design",
    category: "Energy",
    tags: ["solar", "energy", "visual identity"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
    link: "https://www.behance.net/gallery/209972307/WEVOLTE-Engineering-Brand-Identity-Design",
    type: "behance"
  },
  {
    id: 8,
    title: "Penumbra Interiors",
    subtitle: "Brand Identity Design",
    category: "Interior Design",
    tags: ["interior design", "branding", "visual identity"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
    link: "https://www.behance.net/gallery/209966253/Penumbra-Brand-Identity-Design",
    type: "behance"
  },
  {
    id: 9,
    title: "Elysium Jetty",
    subtitle: "Luxury Cruise Branding",
    category: "Hospitality",
    tags: ["hospitality", "luxury design", "cruise ship"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279705/vt5iz1esenykqnsxz5sr.jpg",
    link: "https://www.behance.net/gallery/209971863/Elysium-Branding",
    type: "behance"
  },
  {
    id: 10,
    title: "WMM Solutions",
    subtitle: "Branding and Visual Identity Design",
    category: "Fintech",
    tags: ["finance", "fintech", "app design"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279573/jnhrw9xc6fgctlgs9mqd.jpg",
    link: "https://www.behance.net/gallery/209968573/WMM-SOLUTIONS-Branding-and-Visual-Identity-Design",
    type: "behance"
  },
  {
    id: 11,
    title: "Modern Finance Website",
    subtitle: "Modern Website Design for a Finance Company",
    category: "Web Design",
    tags: ["web design", "UI/UX", "responsive design"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279591/rmfuu4p1rygnmtt0wfdm.jpg",
    link: "https://www.behance.net/gallery/233993689/Modern-Website-Design-for-a-Finance-Company",
    type: "behance"
  }
]

const websiteProjects = [
  {
    id: 12,
    title: "Assura Cash",
    subtitle: "Financial Management App",
    category: "Web Design",
    tags: ["fintech", "web app", "financial management"],
    year: "2025",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
    link: "https://assuracash.com",
    type: "website"
  },
  {
    id: 13,
    title: "Moods and Motion",
    subtitle: "Photo Studio Rental",
    category: "Web Design",
    tags: ["photography", "studio", "rental platform"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
    link: "https://moodsandmotion.vercel.app",
    type: "website"
  },
  {
    id: 14,
    title: "Inaara Woman",
    subtitle: "Luxury Fashion Brand",
    category: "E-commerce",
    tags: ["fashion", "luxury", "e-commerce"],
    year: "2024",
    cover: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
    link: "https://inaarawoman.com",
    type: "website"
  }
]

const allProjects = [...behanceProjects, ...websiteProjects]

const archivedProjects = [
  { id: 1, name: "Poskina", category: "BRANDING" },
  { id: 2, name: "Lens for Good Creatives Workshop", category: "EVENT BRANDING" },
  { id: 3, name: "UN Accelerate 2030, Impact Hub", category: "VISUAL IDENTITY" },
  { id: 4, name: "Body Pimp", category: "HEALTH & WELLNESS" },
  { id: 5, name: "Glitch Arcade", category: "ENTERTAINMENT" },
  { id: 6, name: "Gusto Premium Sardine", category: "PACKAGING" },
  { id: 7, name: "Maestro Mills, Garriflakes", category: "FOOD & BEVERAGE" },
  { id: 8, name: "Scoops By Maestro", category: "FOOD & BEVERAGE" }
]

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283723/gtimkbhhs72kxg0qctbp.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283759/z9jvpgg2bmqusl4vpvrt.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283687/w2nlreoxajlp57z2ndze.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283640/fcehfyvpcsf3ubbyvjxg.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283560/ptqfleu9vvurtkmqwcta.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283322/g56dpyob2t0p41stqxdl.png"
]

export default function WorkPage() {
  const [viewMode, setViewMode] = useState<"gallery" | "list">("gallery")
  const [hoveredArchive, setHoveredArchive] = useState<number | null>(null)

  return (
    <main className="relative bg-matrix-bg min-h-screen">
      <NavigationHeader />

      {/* Intro Text Section */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl text-left text-matrix-text leading-relaxed max-w-5xl"
          >
            Working to shape the future of your startup? We create brands that bring that ambition to life.
          </motion.h2>
        </div>
      </section>

      {/* Hero Section with View Toggle */}
      <section className="relative pb-16 md:pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          {/* Large Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 className="text-[15vw] md:text-[12vw] font-bold text-matrix-text opacity-[0.03] select-none tracking-tighter">
              WORK
            </h1>
          </div>

          {/* View Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex gap-6 md:gap-8"
          >
            <button
              onClick={() => setViewMode("gallery")}
              className={`text-sm md:text-base font-medium tracking-wider uppercase transition-colors ${
                viewMode === "gallery" ? "text-matrix-text" : "text-matrix-text-dim"
              }`}
            >
              GALLERY
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`text-sm md:text-base font-medium tracking-wider uppercase transition-colors ${
                viewMode === "list" ? "text-matrix-text" : "text-matrix-text-dim"
              }`}
            >
              LIST
            </button>
          </motion.div>
        </div>
      </section>

      {/* Projects Display */}
      <AnimatePresence mode="wait">
        {viewMode === "gallery" ? (
          <GalleryView key="gallery" projects={allProjects} />
        ) : (
          <ListView key="list" projects={allProjects} />
        )}
      </AnimatePresence>

      {/* Client Logos Section */}
      <ClientLogosSection logos={clientLogos} />

      {/* Archived Projects */}
      <ArchivedProjectsSection projects={archivedProjects} />

      {/* CTA Section - Dark Mode */}
      <CTASection />

      {/* Contact Form Section */}
      <ContactFormSection />

      <Footer />
    </main>
  )
}

// Gallery View Component
function GalleryView({ projects }: { projects: typeof allProjects }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-matrix-surface mb-4">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-matrix-green-light flex items-center justify-center">
                      <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-black" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg md:text-xl font-bold text-matrix-text group-hover:text-matrix-green-light transition-colors">
                      {project.title}
                    </h3>
                    {project.type === "website" && (
                      <ExternalLink className="w-4 h-4 text-matrix-text-muted" />
                    )}
                  </div>
                  <p className="text-sm text-matrix-text-muted">{project.subtitle}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 rounded-full bg-matrix-surface border border-matrix-border text-matrix-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// List View Component
function ListView({ projects }: { projects: typeof allProjects }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="py-12 md:py-16"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="space-y-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="flex items-center justify-between py-4 md:py-6 border-b border-matrix-border hover:border-matrix-green/30 transition-colors">
                  <div className="flex items-center gap-4 md:gap-8 flex-1">
                    <span className="text-sm md:text-base text-matrix-text-dim font-mono w-12 md:w-16">
                      {project.year}
                    </span>
                    <span className="text-base md:text-lg font-bold text-matrix-text group-hover:text-matrix-green-light transition-colors">
                      [ {project.title.toUpperCase()} ]
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden md:block text-sm text-matrix-text-muted uppercase tracking-wider">
                      {project.category}
                    </span>
                    <ExternalLink className="w-4 h-4 text-matrix-text-muted group-hover:text-matrix-green-light transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Client Logos Section
function ClientLogosSection({ logos }: { logos: string[] }) {
  // Double the logos for seamless loop
  const doubledLogos = [...logos, ...logos]

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            From ambitious brands to <br />
            world-shaping leaders
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Our partnerships are built on trust, collaboration and relentless craft. At The Matrix HQ 
            we turn that trust into bold digital experiences, designed with precision, emotion, and a 
            drive to make brands unforgettable.
          </p>
        </motion.div>

        {/* Auto-scrolling Logos */}
        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: [0, -1400] }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex gap-12 md:gap-16 items-center whitespace-nowrap"
            >
              {doubledLogos.map((logo, i) => (
                <div
                  key={i}
                  className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0"
                >
                  <Image
                    src={logo}
                    alt={`Client ${i + 1}`}
                    fill
                    className="object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Archived Projects Section
function ArchivedProjectsSection({ projects }: { projects: typeof archivedProjects }) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 md:py-32 bg-gray-100 relative">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-sm md:text-base font-medium tracking-wider uppercase text-black mb-8">
            Archived & NDA Protected Projects
          </h3>
        </motion.div>

        {/* Desktop View */}
        <div className="hidden md:block">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative group"
            >
              <div className="flex items-center justify-between py-6 border-b border-gray-300">
                <div className="flex items-center gap-8 flex-1">
                  <span className="text-2xl font-bold text-black w-16">
                    {String(project.id).padStart(2, "0")}
                  </span>
                  <span className="text-xl font-bold text-black group-hover:text-red-600 transition-colors">
                    {project.name.toUpperCase()}
                  </span>
                  <span className="text-sm text-red-600 uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="bg-transparent border-black text-black hover:bg-black hover:text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  CONTACT FOR DETAILS
                </Button>
              </div>

              {/* Hover Image Preview */}
              <AnimatePresence>
                {hoveredId === project.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 rounded-lg overflow-hidden shadow-2xl pointer-events-none z-50"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <Lock className="w-16 h-16 text-gray-500" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white p-4 rounded-lg border border-gray-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-sm text-gray-500 mb-1">
                    {String(project.id).padStart(2, "0")}
                  </div>
                  <h4 className="text-base font-bold text-black mb-1">
                    {project.name}
                  </h4>
                  <span className="text-xs text-red-600 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-black text-black"
                >
                  <Lock className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// CTA Section - Dark Mode
function CTASection() {
  return (
    <section className="py-20 md:py-32 bg-matrix-bg relative overflow-hidden border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-matrix-text mb-6 leading-tight">
              Let's Make <br />
              It Unforgettable!
            </h2>
            <p className="text-lg md:text-xl text-matrix-text-muted mb-8 max-w-xl">
              Driven by passion, we craft experiences that are beautifully unforgettable.
            </p>
            <Button className="h-12 md:h-14 px-8 md:px-10 rounded-full bg-matrix-text text-matrix-bg hover:bg-matrix-text-muted text-base md:text-lg font-medium">
              Schedule a call
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8"
          >
            <div className="text-left lg:text-right">
              <p className="text-sm text-matrix-text-muted mb-2">Have an idea in mind? Let's build your</p>
              <p className="text-lg font-medium text-matrix-text">vision right, from the start.</p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:justify-end gap-4">
              <div className="flex-shrink-0 order-2 sm:order-1 lg:order-2">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-matrix-surface">
                  <Image
                    src="/images/design-mode/ka9nkuvweajfpg9t7d6z.jpg"
                    alt="Brendon Maestro"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="text-left sm:text-right lg:text-right order-1 sm:order-2 lg:order-1">
                <p className="font-bold text-matrix-text">Brendon Maestro</p>
                <p className="text-sm text-matrix-text-muted">Creative Director and CEO</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:justify-end gap-4 pt-6">
              <div className="text-left sm:text-right lg:text-right order-2 sm:order-1">
                <p className="text-sm text-matrix-text-muted mb-2">Backed by best</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
              </div>
              <div className="flex -space-x-2 order-1 sm:order-2">
                {clientLogos.slice(0, 4).map((logo, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-matrix-bg overflow-hidden bg-white flex-shrink-0"
                  >
                    <Image
                      src={logo}
                      alt={`Client ${i + 1}`}
                      width={40}
                      height={40}
                      className="object-contain p-1"
                    />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full bg-matrix-surface border-2 border-matrix-bg flex items-center justify-center text-sm font-medium text-matrix-text flex-shrink-0">
                  71+
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Contact Form Section
function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", message: "" })
    }, 2000)
  }

  return (
    <section className="py-20 md:py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Let's Talk
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-serif italic text-gray-400">
              Your Next Big Idea
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-matrix-surface border border-matrix-border rounded-2xl p-6 md:p-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-matrix-text mb-6">
              Fill This Form Below
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-matrix-text mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-green-light transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-matrix-text mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter the e-mail"
                  required
                  className="w-full px-4 py-3 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-green-light transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-matrix-text mb-2">
                  More About The Project
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black border border-matrix-border rounded-lg text-matrix-text placeholder-matrix-text-dim focus:outline-none focus:border-matrix-green-light transition-colors resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-white text-black hover:bg-gray-200 font-medium text-base rounded-lg transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 w-4 h-4" />
              </Button>

              {/* WhatsApp Option */}
              <div className="text-center pt-4">
                <p className="text-sm text-matrix-text-muted mb-3">Or reach me on WhatsApp</p>
                <Link
                  href="https://wa.me/2347045985964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-colors font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Chat on WhatsApp
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
