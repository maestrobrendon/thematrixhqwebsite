"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

interface PricingCTAProps {
  service: ServiceEntry
}

export function PricingCTA({ service }: PricingCTAProps) {
  return (
    <section
      className="py-14 md:py-20 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: BEZIER }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-widest mb-2"
            style={{ color: "#5C7A6A" }}
          >
            How pricing works
          </p>
          <p
            className="text-[15px] leading-relaxed font-medium"
            style={{ color: "#16240A", maxWidth: 480 }}
          >
            {service.pricingNote}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: BEZIER }}
          className="flex-shrink-0"
        >
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#16240A", color: "#D6FF5C" }}
          >
            See plans & pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
