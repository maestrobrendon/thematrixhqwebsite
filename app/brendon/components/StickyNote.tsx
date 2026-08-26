"use client"

import { motion, useMotionValue, useTransform } from "framer-motion"
import type { RefObject, ReactNode, CSSProperties } from "react"
import { useState } from "react"

type StickyNoteProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  rotate?: number
  dragConstraints: RefObject<HTMLElement | null>
  zIndex?: number
  /** Gentle idle breathing loop, independent of drag/hover transforms. */
  pulse?: boolean
}

/**
 * A draggable "sticky note" — matches the reference template's hand-placed
 * canvas notes. Bounded to the section it lives in, bumps above its siblings
 * while dragged, and stays wherever it's dropped (design-tool "pin it" feel
 * rather than snapping back — confirmed from the reference recording, where
 * the dragged tag is still in its new spot after the drag ends).
 *
 * Rotation is tied to how far it's been dragged horizontally, on top of its
 * baked-in base tilt — in the reference recording, tags visibly tilt further
 * the more they're dragged rather than staying at a fixed angle.
 */
export function StickyNote({
  children,
  className = "",
  style,
  rotate = 0,
  dragConstraints,
  zIndex = 10,
  pulse = false,
}: StickyNoteProps) {
  const [active, setActive] = useState(false)
  const dragX = useMotionValue(0)
  const liveRotate = useTransform(dragX, [-160, 160], [rotate - 14, rotate + 14])

  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={() => setActive(true)}
      onDragEnd={() => setActive(false)}
      whileHover={{ y: -3, boxShadow: "3px 5px 0 rgba(0,0,0,0.18)" }}
      whileDrag={{ scale: 1.04, cursor: "grabbing" }}
      style={{ ...style, x: dragX, rotate: liveRotate, zIndex: active ? 50 : zIndex }}
      className={`cursor-grab select-none touch-none ${className}`}
    >
      <motion.div
        animate={pulse ? { scale: [1, 1.06, 1] } : undefined}
        transition={pulse ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
