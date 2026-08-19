"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "@phosphor-icons/react"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

interface WhatsIncludedProps {
  service: ServiceEntry
}

export function WhatsIncluded({ service }: WhatsIncludedProps) {
  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#F4F1E8" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: BEZIER }}
          className="text-[11px] font-bold uppercase tracking-widest mb-3"
          style={{ color: "#5C7A6A" }}
        >
          What&apos;s included
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06, ease: BEZIER }}
          className="text-[1.8rem] sm:text-[2.4rem] lg:text-[3rem] font-bold leading-tight tracking-tight mb-12"
          style={{ color: "#16240A", maxWidth: 540 }}
        >
          Everything you need. Nothing you don&apos;t.
        </motion.h2>

        {/* Checklist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.included.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: BEZIER }}
              className="flex items-start gap-3.5 p-5 rounded-2xl"
              style={{ backgroundColor: "#E8F0EC" }}
            >
              <CheckCircle
                weight="fill"
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "#16240A" }}
              />
              <span
                className="text-sm leading-snug font-medium"
                style={{ color: "#16240A" }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Art Director note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex items-start gap-4 mt-12 pt-8"
          style={{ borderTop: "1px solid #C9D6CE" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
            style={{ backgroundColor: "#D6FF5C" }}
          />
          <p className="text-sm leading-relaxed" style={{ color: "#5C7A6A" }}>
            Every deliverable reviewed by a senior Art Director before it reaches you. No template work. No shortcuts on craft. All included in your flat monthly subscription.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
