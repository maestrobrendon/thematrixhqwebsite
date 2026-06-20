"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"

// Service card data
const services = [
  {
    id: "design",
    title: "Design",
    description: "We shape interfaces that feel clear, elegant, and human.",
    image: "/images/d4rn9fqgjqsbv7uunk56mteooy.avif",
    bgColor: "bg-[#1a1a1a]",
    span: "md:col-span-1",
  },
  {
    id: "development",
    title: "Development",
    description: "We build fast, reliable websites that scale with precision.",
    image: "/images/dt95ziwss0vpumpeibhgtph5y0.avif",
    video: "https://res.cloudinary.com/dusynu0kv/video/upload/v1764315834/wvloc8mkfq6km5j3thho.mp4",
    bgColor: "bg-[#2d4a3e]",
    span: "md:col-span-1",
  },
  {
    id: "branding",
    title: "Branding",
    description: "We craft identities that speak clearly and grow with meaning.",
    image: "/images/d1z5fwoauhoi9yxobvn3nw2wic.avif",
    bgColor: "bg-[#0a0a0a]",
    span: "md:col-span-1",
  },
]

// Animated text component that fills from gray to white on scroll
function AnimatedHeadline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  })

  const words = "What we create is built to connect".split(" ")

  return (
    <div ref={ref} className="flex flex-wrap">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </div>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: any
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  const color = useTransform(progress, range, ["#4b5563", "#ffffff"])

  return (
    <motion.span
      style={{ opacity, color }}
      className="mr-3 md:mr-4 text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
    >
      {children}
    </motion.span>
  )
}

// Service card component
function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [showVideo, setShowVideo] = useState(false)
  const [videoEnded, setVideoEnded] = useState(false)
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false)

  // Auto-play video when scrolled into view (for development card)
  useEffect(() => {
    if (isInView && service.video && videoRef.current && !hasPlayedOnce) {
      setShowVideo(true)
      setHasPlayedOnce(true)
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }, [isInView, service.video, hasPlayedOnce])

  const handleMouseEnter = () => {
    if (service.video && videoRef.current) {
      setShowVideo(true)
      setVideoEnded(false)
      videoRef.current.currentTime = 0
      videoRef.current.play()
    }
  }

  const handleVideoEnd = () => {
    setVideoEnded(true)
    // After showing the image briefly, restart the cycle
    setTimeout(() => {
      if (videoRef.current) {
        setShowVideo(true)
        setVideoEnded(false)
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    }, 2000) // Show image for 2 seconds before restarting video
  }

  const handleMouseLeave = () => {
    if (service.video && videoRef.current) {
      videoRef.current.pause()
      setShowVideo(false)
      setVideoEnded(false)
    }
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${service.span}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-sm aspect-[4/3] md:aspect-[3/4] cursor-pointer">
        {/* Image */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${showVideo && !videoEnded ? 'opacity-0' : 'opacity-100'}`}>
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Video (if available) */}
        {service.video && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${showVideo && !videoEnded ? 'opacity-100' : 'opacity-0'}`}
            muted
            playsInline
            onEnded={handleVideoEnd}
          >
            <source src={service.video} type="video/mp4" />
          </video>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Content overlay on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-xl md:text-2xl font-medium text-white mb-2 flex items-center gap-2">
              {service.title}
              <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
          </motion.div>
        </div>
      </div>

      {/* Description below card */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
        className="mt-4 text-sm text-matrix-text-muted leading-relaxed"
      >
        {service.description}
      </motion.p>
    </motion.div>
  )
}

export function OurServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-matrix-bg relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-start mb-12 md:mb-16"
        >
          <span className="text-xs tracking-widest uppercase text-matrix-text-muted">Services</span>
          <span className="text-xs tracking-widest text-matrix-text-muted">01</span>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-16 md:mb-24">
          {/* Left - Animated Headline */}
          <div className="max-w-xl">
            <AnimatedHeadline />
          </div>

          {/* Right - Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-end lg:justify-end"
          >
            <p className="text-lg md:text-xl text-matrix-text-muted max-w-md leading-relaxed">
             We build premium digital experiences for luxury brands and ambitious startups, crafting world-class designs that drive measurable business growth that positions your brand for global reach.
            </p>
          </motion.div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
