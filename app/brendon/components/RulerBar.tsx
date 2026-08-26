"use client"

import { motion, type MotionValue } from "framer-motion"

const TICKS = Array.from({ length: 15 }, (_, i) => 300 + i * 100)

/** Decorative design-tool canvas ruler under the top bar. Pans with the mouse. */
export function RulerBar({ x }: { x?: MotionValue<number> }) {
  return (
    <div className="ruler-track absolute top-20 inset-x-0 h-8 pointer-events-none select-none overflow-hidden">
      <motion.div
        style={{ x }}
        className="relative h-full flex items-end justify-center gap-[100px] text-[10px] font-mono-accent text-black/50 pb-1.5 px-8"
      >
        {TICKS.map((n) => (
          <span key={n} className="tabular-nums">
            {n}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
