"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { ArrowRight } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "Create visual identities that align with your voice and make lasting impressions."
  },
  {
    number: "02",
    title: "Design",
    description: "Shape powerful experiences with purpose-driven creativity and thoughtful execution."
  },
  {
    number: "03",
    title: "Develop",
    description: "Build scalable solutions that bring your vision to life with precision and performance."
  },
  {
    number: "04",
    title: "Launch & Grow",
    description: "Introduce your brand with impact through strategic rollouts that captivate and convert."
  }
]

export function OurProcessSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // Adjust speed (lower = slower, higher = faster)
    const cardWidth = 320 + 16 // Card width + gap
    const totalWidth = processSteps.length * cardWidth

    const autoScroll = () => {
      if (isAutoScrolling && scrollContainer) {
        scrollPosition += scrollSpeed
        
        // Reset to beginning when reaching the end
        if (scrollPosition >= totalWidth / 2) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
        animationFrameId = requestAnimationFrame(autoScroll)
      }
    }

    // Start auto-scrolling
    animationFrameId = requestAnimationFrame(autoScroll)

    // Pause auto-scroll on user interaction
    const handleTouchStart = () => setIsAutoScrolling(false)
    const handleTouchEnd = () => {
      // Resume auto-scrolling after 3 seconds of no interaction
      setTimeout(() => setIsAutoScrolling(true), 3000)
    }

    scrollContainer.addEventListener('touchstart', handleTouchStart)
    scrollContainer.addEventListener('touchend', handleTouchEnd)
    scrollContainer.addEventListener('scroll', handleTouchStart, { passive: true })

    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener('touchstart', handleTouchStart)
      scrollContainer.removeEventListener('touchend', handleTouchEnd)
      scrollContainer.removeEventListener('scroll', handleTouchStart)
    }
  }, [isAutoScrolling])

  return (
    <section className="relative bg-matrix-bg py-20 md:py-32 overflow-hidden border-t border-matrix-border">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-bg via-black to-matrix-bg" />
      
      <div className="relative container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-matrix-border bg-matrix-surface backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-matrix-blue animate-pulse" />
            <span className="text-sm text-matrix-text-muted font-medium tracking-wider uppercase">
              Our Process
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-matrix-text mb-4 leading-tight">
                <span className="font-serif italic">The Journey                                       </span> to a
                <br />
                <span className="font-bold">Successful Product</span>
              </h2>
            </div>
            
            <p className="text-matrix-text-muted text-base md:text-lg max-w-md">
              We keep working until you are 100% satisfied with the final result.
            </p>
          </div>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="relative h-full min-h-[320px] p-8 rounded-3xl border border-matrix-border bg-gradient-to-br from-matrix-surface to-matrix-bg backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-matrix-border-light hover:bg-matrix-surface-hover">
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-matrix-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={hoveredIndex === index ? { 
                    opacity: [0, 0.15, 0],
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="text-sm text-matrix-text-dim font-mono mb-6 tracking-wider">
                    {step.number}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-matrix-text mb-4 group-hover:text-matrix-blue transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-matrix-text-muted text-sm leading-relaxed mb-auto">
                    {step.description}
                  </p>
                </div>

                {/* Decorative circle arc */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border-2 border-dashed border-matrix-border"
                    animate={{ 
                      rotate: hoveredIndex === index ? 360 : 0,
                    }}
                    transition={{ 
                      duration: 20, 
                      repeat: hoveredIndex === index ? Infinity : 0, 
                      ease: "linear" 
                    }}
                  />
                </div>

                {/* Arrow icon */}
                <motion.div
                  className="absolute top-8 right-8 w-10 h-10 rounded-full border border-matrix-border bg-matrix-surface flex items-center justify-center group-hover:border-matrix-blue group-hover:bg-matrix-surface-hover transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4 text-matrix-text-muted group-hover:text-matrix-blue transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Horizontal Slider */}
        <div className="md:hidden relative">
          <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6">
            <div className="flex gap-4" style={{ width: `${processSteps.length * 320 + 80}px` }}>
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-[320px]"
                >
                  <div className="relative h-full min-h-[320px] p-8 rounded-3xl border border-matrix-border bg-gradient-to-br from-matrix-surface to-matrix-bg backdrop-blur-sm overflow-hidden">
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="text-sm text-matrix-text-dim font-mono mb-6 tracking-wider">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-matrix-text mb-4">
                        {step.title}
                      </h3>
                      <p className="text-matrix-text-muted text-sm leading-relaxed mb-auto">
                        {step.description}
                      </p>
                    </div>

                    {/* Decorative circle arc */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 overflow-hidden opacity-20">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full border-2 border-dashed border-matrix-border" />
                    </div>

                    {/* Arrow icon */}
                    <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-matrix-border bg-matrix-surface flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-matrix-text-muted" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center items-center gap-2 mt-8 text-matrix-text-dim text-sm"
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </motion.div>
            <span className="tracking-wider">Swipe to explore</span>
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Custom scrollbar hide CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
