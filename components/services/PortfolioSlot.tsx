"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

interface PortfolioSlotProps {
  service: ServiceEntry
}

export function PortfolioSlot({ service }: PortfolioSlotProps) {
  if (!service.portfolio.length) return null

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#F4F1E8", borderTop: "1px solid #E4E0D4" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: BEZIER }}
          className="text-[11px] font-bold uppercase tracking-widest mb-3"
          style={{ color: "#5C7A6A" }}
        >
          See it in action
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06, ease: BEZIER }}
          className="text-[1.8rem] sm:text-[2.4rem] font-bold leading-tight tracking-tight mb-10"
          style={{ color: "#16240A", maxWidth: 480 }}
        >
          Work that delivers.
        </motion.h2>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${Math.min(service.portfolio.length, 3)}, 1fr)`,
          }}
        >
          {service.portfolio.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: BEZIER }}
              className="relative overflow-hidden rounded-2xl group"
              style={{ height: "clamp(200px, 28vw, 380px)" }}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                sizes="(max-width:768px) 100vw, 33vw"
              />
              <div
                className="absolute inset-0 flex items-end p-5"
                style={{ background: "linear-gradient(to top, rgba(11,31,23,0.7) 0%, transparent 60%)" }}
              >
                <span
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  {item.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
