"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CaretDown } from "@phosphor-icons/react"
import type { ServiceEntry } from "@/lib/data/services"

const BEZIER = [0.25, 0, 0, 1] as [number, number, number, number]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ border: "1px solid #1A332A", backgroundColor: "#0F2B20" }}
      onClick={() => setOpen((o) => !o)}
    >
      {/* Header row */}
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <span
          className="text-sm font-semibold leading-snug"
          style={{ color: "#E8F0EC" }}
        >
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: BEZIER }}
          className="flex-shrink-0"
        >
          <CaretDown weight="bold" className="w-4 h-4" style={{ color: "#D6FF5C" }} />
        </motion.div>
      </div>

      {/* Expandable answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: BEZIER }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "#8CA89A" }}
            >
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface ServiceFAQProps {
  service: ServiceEntry
}

export function ServiceFAQ({ service }: ServiceFAQProps) {
  if (!service.faq.length) return null

  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: "#0B1F17", borderTop: "1px solid #1A332A" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left: section label */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: BEZIER }}
              className="text-[11px] font-bold uppercase tracking-widest mb-3"
              style={{ color: "#5C7A6A" }}
            >
              Common questions
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06, ease: BEZIER }}
              className="text-[1.8rem] sm:text-[2.2rem] font-bold leading-tight tracking-tight"
              style={{ color: "#ffffff" }}
            >
              Good questions deserve straight answers.
            </motion.h2>
          </div>

          {/* Right: accordion items */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: BEZIER }}
            className="flex flex-col gap-3"
          >
            {service.faq.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
