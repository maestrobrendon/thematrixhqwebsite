"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(() => {
    springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest))
    })
  }, [springValue])

  return <span ref={ref}>{displayValue}</span>
}

export function StatsSection() {
  const stats = [
    { value: 90, label: "Projects Completed", suffix: "+" },
    { value: 50, label: "Happy Clients", suffix: "+" },
    { value: 15, label: "Years Combined Experience", suffix: "+" },
    { value: 100, label: "Client Satisfaction", suffix: "%" },
  ]

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div
        className="absolute top-1/2 left-1/4 w-96 h-96 bg-matrix-blue/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-matrix-cyan/10 rounded-full blur-3xl"
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-default"
              >
                <div className="relative inline-block">
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-matrix-blue/20 blur-xl rounded-full opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-2 bg-gradient-to-r from-matrix-blue via-matrix-cyan to-white bg-clip-text text-transparent">
                    <AnimatedCounter value={stat.value} />
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                    >
                      {stat.suffix}
                    </motion.span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-gray-400 text-sm md:text-base group-hover:text-white transition-colors duration-300"
                >
                  {stat.label}
                </motion.div>

                {/* Animated underline on hover */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-matrix-blue to-matrix-cyan mx-auto mt-4"
                  initial={{ width: 0 }}
                  whileHover={{ width: "60%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 md:mt-20"
        >
          <p className="text-lg md:text-xl text-gray-500 italic">
            Numbers that speak to commitment, not just capability.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
