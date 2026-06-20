"use client"

import { useEffect, useRef } from "react"

export function MatrixSignalWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerWidth < 768 ? 150 : 200
    }

    setCanvasSize()

    const characters = "▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓│┤┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌|"
    const fontSize = 8
    const columns = Math.floor(canvas.width / fontSize)

    let time = 0
    const waves: number[] = []

    for (let i = 0; i < columns; i++) {
      waves[i] = 0
    }

    function draw() {
      if (!ctx || !canvas) return

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "rgba(0, 255, 70, 0.3)"
      ctx.font = `${fontSize}px monospace`

      time += 0.05

      for (let i = 0; i < columns; i++) {
        const waveHeight = Math.sin(i * 0.1 + time) * 40 + Math.sin(i * 0.05 + time * 0.5) * 20
        const normalizedHeight = (waveHeight + 60) / 120

        const rows = Math.floor(normalizedHeight * 25)

        for (let j = 0; j < rows; j++) {
          const char = characters[Math.floor((j / rows) * characters.length)]
          const y = canvas.height - j * (fontSize * 0.8)
          const alpha = (j / rows) * 0.5 + 0.2
          ctx.fillStyle = `rgba(0, 255, 70, ${alpha})`
          ctx.fillText(char, i * fontSize, y)
        }
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      setCanvasSize()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute bottom-0 left-0 w-full pointer-events-none opacity-30 md:opacity-40" />
  )
}
