"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { motion } from "framer-motion"

const clientLogos = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283723/gtimkbhhs72kxg0qctbp.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283759/z9jvpgg2bmqusl4vpvrt.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283687/w2nlreoxajlp57z2ndze.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283670/k7rmtutzsl5rztjaysa8.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283640/fcehfyvpcsf3ubbyvjxg.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283292/yvupabaaiyggfrgdacbi.png",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764283322/g56dpyob2t0p41stqxdl.png"
]

export function VisionSection() {
  // Double the logos for seamless loop
  const doubledLogos = [...clientLogos, ...clientLogos]

  return (
    <section className="py-20 md:py-32 bg-matrix-bg border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <ScrollReveal>
          {/* Main Headline */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-matrix-text leading-tight md:leading-tight lg:leading-tight max-w-5xl">
              We turn founders&apos; visions into remarkable brands by combining strategy, design, and performance
              marketing, all under one roof.{" "}
              <Link
                href="/work"
                className="underline underline-offset-4 decoration-2 hover:text-matrix-blue transition-colors"
              >
                Explore what we do  
              </Link>
              .
            </h2>
          </div>

          {/* Divider Line */}
          <div className="w-full h-px bg-matrix-border mb-12 md:mb-16" />

          {/* Two Column Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {/* Left Column - Tagline */}
            <div>
              <p className="text-xl md:text-2xl text-matrix-text font-medium">Tomorrow&apos;s brands, today.</p>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-matrix-text leading-relaxed">
                Since 2019, we have been helping our clients find exceptional solutions for their businesses, creating memorable websites and digital products.
              </p>

              <p className="text-lg md:text-xl text-matrix-text leading-relaxed">
                {"We don&#39;t do cookie-cutter solutions. We build pixel-perfect products that match the vision — no dilution, no deviation, no excuses."}
              </p>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-lg md:text-xl text-matrix-text underline underline-offset-4 decoration-2 hover:text-matrix-blue transition-colors group mt-4"
              >
                Learn more
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Client Logos Carousel */}
        <div className="mt-20 md:mt-32">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm text-matrix-text-dim uppercase tracking-wider font-medium">
                Trusted by
              </p>
            </div>
          </ScrollReveal>

          {/* Infinite scroll container */}
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-matrix-bg to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-matrix-bg to-transparent z-10 pointer-events-none" />
            
            {/* Scrolling logos */}
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
                    className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    <Image
                      src={logo}
                      alt={`Client ${i + 1}`}
                      fill
                      className="object-contain grayscale brightness-0 invert"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
