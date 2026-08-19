"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

interface ClosingCTAProps {
  headline: string
  whatsappText: string
}

export function ClosingCTA({ headline, whatsappText }: ClosingCTAProps) {
  const encoded = encodeURIComponent(whatsappText)
  const waHref = `https://wa.me/message/YOURWALINK?text=${encoded}`

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 lg:px-16 xl:px-24 text-center"
      style={{ backgroundColor: "#0B1F17" }}
    >
      <div className="max-w-[860px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: BEZIER }}
          className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] font-bold leading-tight tracking-tight mb-10"
          style={{ color: "#ffffff" }}
        >
          {headline}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease: BEZIER }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#D6FF5C", color: "#16240A" }}
          >
            Start a project
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold border transition-opacity hover:opacity-70"
            style={{ borderColor: "#1A332A", color: "#8CA89A" }}
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
