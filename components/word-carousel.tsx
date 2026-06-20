"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const words = ["startups", "founders", "businesses", "brands"]

export function WordCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStriking, setIsStriking] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Start strikethrough animation
      setIsStriking(true)

      // After strikethrough completes, change word
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length)
        setIsStriking(false)
      }, 600) // Duration of strikethrough animation
    }, 2500) // Total display time per word

    return () => clearInterval(interval)
  }, [])

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative inline-block"
        >
          {words[currentIndex]}

          {/* Strikethrough line */}
          <motion.span
            className="absolute left-0 top-1/2 h-[3px] md:h-[4px] bg-matrix-blue rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: isStriking ? "100%" : "0%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ transform: "translateY(-50%)" }}
          />
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
