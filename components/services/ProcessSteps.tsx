"use client"

import { motion } from "framer-motion"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

function Em({ children }: { children: React.ReactNode }) {
  return <span className="font-serif italic font-normal">{children}</span>
}

interface ProcessStepsProps {
  service: ServiceEntry
}

export function ProcessSteps({ service }: ProcessStepsProps) {
  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: BEZIER }}
            className="text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{ color: "#D6FF5C" }}
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: BEZIER }}
            className="text-[1.8rem] sm:text-[2.2rem] lg:text-[2.8rem] font-bold leading-tight tracking-tight"
            style={{ color: "#ffffff", maxWidth: 480 }}
          >
            From brief to <Em>brilliant</Em> — fast.
          </motion.h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {service.process.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: BEZIER }}
            >
              {/* Step number */}
              <p
                className="text-[13px] font-bold mb-3"
                style={{ color: "#D6FF5C" }}
              >
                0{i + 1}
              </p>

              {/* Horizontal rule */}
              <div
                className="w-8 h-px mb-4"
                style={{ backgroundColor: "#1A332A" }}
              />

              {/* Step name */}
              <h3
                className="text-[17px] font-semibold mb-2.5"
                style={{ color: "#ffffff" }}
              >
                {s.step}
              </h3>

              {/* Description */}
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: "#8CA89A" }}
              >
                {s.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
