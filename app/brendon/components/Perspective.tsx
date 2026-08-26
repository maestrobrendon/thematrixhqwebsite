"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { perspectiveAssets } from "../lib/assets"

export function Perspective() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"])

  return (
    <section ref={ref} className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src={perspectiveAssets.workingPhoto}
          alt="Brendon at work"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      <div className="relative z-10 max-w-2xl px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-sm md:text-base text-white/70 mb-2"
        >
          Companies partner with me because of my
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        >
          <span style={{ color: "var(--brendon-cyan)" }}>perspective</span>{" "}
          <span className="text-white">+ sharp instincts</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-base md:text-lg text-white/80"
        >
          I bring a sharp eye and clear direction that makes your product stand out —{" "}
          <span className="font-medium text-white">and working with me saves it.</span>
        </motion.p>
      </div>
    </section>
  )
}
