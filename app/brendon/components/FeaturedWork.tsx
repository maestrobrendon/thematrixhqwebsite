"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { StickyNote } from "./StickyNote"
import { ProjectStack } from "./ProjectStack"
import { featuredWorkAssets } from "../lib/assets"

export function FeaturedWork() {
  const boundsRef = useRef<HTMLDivElement>(null)

  return (
    <section id="work" ref={boundsRef} className="relative pt-14 pb-12 md:pt-16 md:pb-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative text-center mb-8">
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-hand text-xl text-black/70 -rotate-2"
          >
            explore my work!
          </motion.p>

          <StickyNote dragConstraints={boundsRef} rotate={5} className="hidden sm:block absolute right-[28%] top-0 w-24">
            <Image src={featuredWorkAssets.projectsTag} alt="Projects" width={376} height={234} className="w-full h-auto" draggable={false} />
          </StickyNote>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-(--brendon-ink) mt-2"
          >
            FEATURED WORKS
          </motion.h2>
        </div>

        <ProjectStack />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://behance.net/maestrobrendon"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-2.5 text-sm font-medium text-black/70 hover:text-black hover:border-black/30 transition-colors"
          >
            View all work on Behance
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
