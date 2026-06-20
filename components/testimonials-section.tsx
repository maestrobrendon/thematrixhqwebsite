"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Target } from "lucide-react"
import { useRef, useEffect } from "react"
import Link from "next/link"

const principles = [
  {
    number: "01",
    title: "Speed Without Compromise",
    description:
      "We move fast, but we never cut corners. Every pixel, every line of code, every brand decision is deliberate.",
  },
  {
    number: "02",
    title: "Built for Growth",
    description:
      "We don't just design for today. We architect systems that scale with your ambition and evolve with your business.",
  },
  {
    number: "03",
    title: "Human-Centered",
    description:
      "Technology is our tool, but empathy is our foundation. We build brands that connect with real people.",
  },
]

const brandValues = [
  "No fluff. Just results.",
  "Quality over quantity, always.",
  "Your vision. Our execution.",
  "Built to last, designed to scale.",
  "Obsessed with excellence.",
  "Clarity in every decision.",
]

export function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const playVideo = async () => {
        try {
          await video.play()
        } catch (error) {
          if (error instanceof Error && error.name !== "AbortError") {
            console.error("Video playback error:", error)
          }
        }
      }
      playVideo()
    }
  }, [])

  return (
    <section className="py-24 md:py-32 bg-matrix-bg relative overflow-hidden border-t border-matrix-border">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-matrix-blue/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-matrix-cyan/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-matrix-text leading-tight">
              We Are a Design-First Agency.
            </h2>

            <p className="text-xl md:text-2xl text-matrix-text-muted max-w-3xl mx-auto leading-relaxed">
              Our work blends aesthetics with function, ensuring every element delivers purpose, clarity, and results.
              Nothing we create is random, everything is engineered to move your brand forward.
            </p>
          </div>
        </ScrollReveal>

        {/* Our Principles */}
        <ScrollReveal></ScrollReveal>

        {/* Brand Values Marquee */}
        <div className="mb-20 md:mb-32">
          <h3 className="text-2xl md:text-3xl font-bold text-matrix-text mb-12 text-center">What drives us</h3>

          <div className="relative overflow-hidden py-8">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-matrix-bg to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-matrix-bg to-transparent z-10" />

            {/* Scrolling values */}
            <div className="flex">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="flex gap-8 whitespace-nowrap"
              >
                {[...brandValues, ...brandValues].map((value, i) => (
                  <div
                    key={i}
                    className="px-6 py-3 rounded-full bg-matrix-surface border border-matrix-border text-matrix-text font-medium text-lg"
                  >
                    {value}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 py-24 md:py-32 text-center overflow-hidden"
          >
            {/* Video background - seamless blend */}
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ropes-BcLGWHPPiqcJeR7V5K34t13YuA0njB.mp4" type="video/mp4" />
            </video>

            {/* Gradient overlays for seamless blending */}
            <div className="absolute inset-0 bg-gradient-to-b from-matrix-bg via-transparent to-matrix-bg" />
            <div className="absolute inset-0 bg-matrix-bg/40" />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-matrix-text mb-6">
                Ready to build something <br className="hidden md:block" />
                <span className="text-[#FFFFFF]">extraordinary?</span>
              </h3>

              <p className="text-xl text-matrix-text-muted mb-8 max-w-2xl mx-auto">
                Let's turn your vision into a brand that stands out, drives growth, and makes an impact.
              </p>

              <Link href="https://wa.me/2347045985964" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-matrix-blue text-white rounded-full font-medium text-lg hover:bg-matrix-blue-light transition-colors"
                >
                  <span>Start Your Project</span>
                  <Target className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  )
}
