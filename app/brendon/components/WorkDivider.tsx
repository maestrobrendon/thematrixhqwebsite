"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Linkedin } from "lucide-react"
import { featuredWorkAssets } from "../lib/assets"

export function WorkDivider() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"])

  return (
    <section ref={ref} className="relative py-8 md:py-12 overflow-hidden bg-white flex flex-col items-center justify-center">
      <motion.span
        aria-hidden
        style={{ x }}
        className="font-display select-none pointer-events-none text-[22vw] leading-none tracking-tight text-black/[0.06] whitespace-nowrap"
      >
        Work
      </motion.span>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute flex flex-col items-center gap-3"
      >
        <Image src={featuredWorkAssets.folderIcon} alt="" width={64} height={52} className="w-14 h-auto" />
        <p className="text-xs md:text-sm text-black/60 text-center">
          Curious?... Check out my{" "}
          <a
            href="https://linkedin.com/in/brendonoleghe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-black transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <br />
          Or keep scrolling
        </p>
      </motion.div>
    </section>
  )
}
