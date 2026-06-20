"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  glitchOnHover?: boolean
}

export function GlitchText({ children, className, glitchOnHover = false }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 300)
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [glitchOnHover])

  return (
    <span
      className={cn("relative inline-block", isGlitching && "animate-glitch", className)}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
    >
      {children}
    </span>
  )
}
