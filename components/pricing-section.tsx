"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

function AnimatedHeadline() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "end start"],
  })

  const textFillProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100])

  const backgroundImage = useMotionTemplate`linear-gradient(to right, #ffffff ${textFillProgress}%, #666666 ${textFillProgress}%)`

  return (
    <motion.h2
      ref={headlineRef}
      className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-6 md:mb-8 leading-tight"
      style={{
        backgroundImage,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      Launch Your Website
      <br />
      in One Week
    </motion.h2>
  )
}

export function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative bg-matrix-bg py-24 md:py-32 overflow-hidden">
      {/* Hero Image */}
      <div className="relative w-full mb-16 md:mb-24">
        <Image
          src="/images/design-mode/matrixhq.jpg"
          alt="Architectural 3D Design"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          priority
        />
        {/* Gradient overlay for smooth transition to background */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-matrix-bg to-transparent" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Animated Headline */}
        <div className="mb-20 md:mb-32">
          <AnimatedHeadline />

          <motion.p
            className="text-center text-lg md:text-xl text-matrix-text-muted max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            For Half the Time. Half the Cost.
            <br />
            No long timelines. No inflated costs. No bureaucracy.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {/* Website Package */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-matrix-surface border-matrix-border hover:border-matrix-blue transition-all duration-300 p-8 md:p-10 flex flex-col group">
              <div className="mb-6">
                <h3 className="text-sm uppercase tracking-wider text-matrix-blue font-medium mb-3">Website Launch</h3>
                <p className="text-matrix-text-muted text-sm leading-relaxed mb-6">
                  Get a professionally designed website built and launched for your business in just 7 days.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-matrix-text">$700</span>
                  <span className="text-matrix-text-muted">/$2000</span>
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {[
                  "4–6 page website (Home, About, Services, Contact + more)",
                  "Mobile-responsive & SEO-ready",
                  "Integrated contact forms",
                  "Google Analytics setup",
                  "One revision round",
                  "Delivered in 7 business days",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-matrix-blue flex-shrink-0 mt-0.5" />
                    <span className="text-matrix-text-muted text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="w-full h-12 bg-matrix-text text-matrix-bg hover:bg-matrix-text-muted font-medium transition-all group-hover:scale-[1.02]"
              >
                <Link href="https://wa.me/2347045985964" target="_blank" rel="noopener noreferrer">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </motion.div>

          {/* Custom Software Package */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-matrix-surface border-matrix-blue hover:border-matrix-blue-light transition-all duration-300 p-8 md:p-10 flex flex-col group relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Top corner accent */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-matrix-blue/10 blur-3xl opacity-50" />

              <div className="relative z-10 mb-6">
                <div className="inline-block px-3 py-1 bg-matrix-blue/20 border border-matrix-blue/30 rounded-full text-xs uppercase tracking-wider text-matrix-blue font-medium mb-4">
                  Most Popular
                </div>
                <h3 className="text-sm uppercase tracking-wider text-matrix-blue font-medium mb-3">Custom Software</h3>
                <p className="text-matrix-text-muted text-sm leading-relaxed mb-6">
                  Tailored software solutions built from the ground up to match your exact business needs and scale.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-bold text-matrix-text">$2000</span>
                  <span className="text-matrix-text-muted">and above</span>
                </div>
              </div>

              <div className="relative z-10 flex-1 space-y-4 mb-8">
                {[
                  "Custom web or mobile application",
                  "Advanced database architecture",
                  "User authentication & authorization",
                  "API integrations & third-party services",
                  "Admin dashboard & analytics",
                  "Unlimited revision rounds",
                  "2 weeks development + testing",
                  "30 days post-launch support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-matrix-blue flex-shrink-0 mt-0.5" />
                    <span className="text-matrix-text-muted text-sm leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                className="relative z-10 w-full h-12 bg-matrix-blue text-white hover:bg-matrix-blue-light font-medium transition-all group-hover:scale-[1.02]"
              >
                <Link href="https://wa.me/2347045985964" target="_blank" rel="noopener noreferrer">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
