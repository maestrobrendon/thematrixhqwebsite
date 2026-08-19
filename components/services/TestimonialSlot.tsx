"use client"

import { motion } from "framer-motion"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

interface TestimonialSlotProps {
  service: ServiceEntry
}

export function TestimonialSlot({ service }: TestimonialSlotProps) {
  if (!service.testimonial) return null

  const { quote, name, role } = service.testimonial

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#142B22" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: BEZIER }}
          className="max-w-3xl"
        >
          <p
            className="font-serif italic text-[1.4rem] sm:text-[1.8rem] lg:text-[2.2rem] leading-snug mb-8"
            style={{ color: "#ffffff" }}
          >
            &ldquo;{quote}&rdquo;
          </p>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#D6FF5C" }}>
              {name}
            </p>
            <p className="text-[12px]" style={{ color: "#5C7A6A" }}>
              {role}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
