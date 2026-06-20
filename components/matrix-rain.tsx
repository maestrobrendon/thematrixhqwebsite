"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const fontSize = 12 // Smaller font for subtlety
    const columns = canvas.width / (fontSize * 1.5) // More spacing between columns

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 255, 70, 0.15)"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)]
        ctx.fillText(text, i * fontSize * 1.5, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 80)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
