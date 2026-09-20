"use client"

import { useEffect, useRef } from "react"
import { gsap } from "@/lib/gsap-utils"

// Inline SVGs (not <img>/<Image>) so individual shapes inside can be animated
// independently. Each one idles forever — slow, quiet motion, not a hover effect.

const CHECKER_TILES = [
  { x: 26.5, y: 15, delay: 0 },
  { x: 38, y: 26.5, delay: 0.5 },
  { x: 26.5, y: 38, delay: 1 },
  { x: 15, y: 26.5, delay: 1.5 },
]

/** Brand Identity — four diamond tiles fading in and out of sync with each other. */
export function CheckerIcon({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const tiles = ref.current?.querySelectorAll<SVGRectElement>("[data-tile]")
    if (!tiles?.length) return
    const tweens = Array.from(tiles).map((tile, i) =>
      gsap.to(tile, {
        opacity: 0.2,
        duration: 1.8,
        delay: CHECKER_TILES[i].delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    )
    return () => tweens.forEach((t) => t.kill())
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="#ECB22E" />
      <rect x="1.5" y="1.5" width="61" height="61" stroke="#522E29" strokeWidth="3" strokeDasharray="6 3" />
      {CHECKER_TILES.map((t, i) => (
        <rect
          key={i}
          data-tile
          x={t.x}
          y={t.y}
          width="11"
          height="11"
          transform={`rotate(45 ${t.x + 5.5} ${t.y + 5.5})`}
          fill="#111212"
          opacity={0.95}
        />
      ))}
    </svg>
  )
}

const RAY_COUNT = 8

/** Art Direction — the whole ray cluster turns slowly behind a static center dot. */
export function StarburstIcon({ className }: { className?: string }) {
  const groupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const el = groupRef.current
    if (!el) return
    const tween = gsap.to(el, { rotate: 360, duration: 18, repeat: -1, ease: "none", transformOrigin: "32px 32px" })
    return () => tween.kill()
  }, [])

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="#3fae6a" />
      <g ref={groupRef}>
        {Array.from({ length: RAY_COUNT }).map((_, i) => (
          <path key={i} d="M32 5 L37.5 23 L32 18.5 L26.5 23 Z" fill="#111212" transform={`rotate(${(i * 360) / RAY_COUNT} 32 32)`} />
        ))}
      </g>
      <circle cx="32" cy="32" r="13.8" fill="#E01E5A" />
    </svg>
  )
}

/** Design Systems — a periodic blink: long open pause, quick close, reopen. */
export function EyeIcon({ className }: { className?: string }) {
  const groupRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const el = groupRef.current
    if (!el) return
    const tween = gsap.to(el, {
      keyframes: {
        "0%": { scaleY: 1 },
        "80%": { scaleY: 1 },
        "86%": { scaleY: 0.08 },
        "92%": { scaleY: 1 },
        "100%": { scaleY: 1 },
      },
      duration: 4.5,
      repeat: -1,
      ease: "power1.inOut",
      transformOrigin: "32px 32px",
    })
    return () => tween.kill()
  }, [])

  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="#E01E5A" />
      <g ref={groupRef}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M31.4925 48.7728C44.7267 48.7728 56.2101 40.3177 61.9274 35.2238C64.2309 33.1716 64.2309 29.7419 61.9274 27.6896C56.2101 22.5957 44.7267 14.1406 31.4925 14.1406C18.2583 14.1406 6.77506 22.5957 1.05774 27.6896C-1.24581 29.7419 -1.24581 33.1716 1.05774 35.2238C6.77506 40.3177 18.2583 48.7728 31.4925 48.7728ZM31.4925 43.5377C38.1771 43.5377 43.5959 38.1289 43.5959 31.4566C43.5959 24.7845 38.1771 19.3757 31.4925 19.3757C24.8081 19.3757 19.3893 24.7845 19.3893 31.4566C19.3893 38.1289 24.8081 43.5377 31.4925 43.5377Z"
          fill="white"
        />
        <path d="M31.5 22.5L34.3 29.2L41 32L34.3 34.8L31.5 41.5L28.7 34.8L22 32L28.7 29.2Z" fill="#ECB22E" />
      </g>
    </svg>
  )
}

const DOTS = [
  { cx: 23.68, cy: 23.67, r: 6.15, fill: "#111212", dx: -2, dy: 2, duration: 5.5, delay: 0 },
  { cx: 40.31, cy: 23.68, r: 4.11, fill: "#111212", dx: 2, dy: -1.5, duration: 4.5, delay: 0.6 },
  { cx: 23.68, cy: 40.32, r: 0.6, fill: "#111212", dx: 1.5, dy: 1.5, duration: 3.5, delay: 1.2 },
  { cx: 10.28, cy: 10.28, r: 7, fill: "#E01E5A", dx: -1.5, dy: -2, duration: 6, delay: 0.3 },
  { cx: 52, cy: 13.14, r: 2, fill: "#E01E5A", dx: 2, dy: 2, duration: 4, delay: 0.9 },
  { cx: 12, cy: 54.85, r: 2, fill: "#E01E5A", dx: -2, dy: -1.5, duration: 4.8, delay: 1.5 },
  { cx: 54.28, cy: 53.71, r: 5.5, fill: "#E01E5A", dx: -2.5, dy: -2, duration: 5, delay: 0.2 },
]

/** Motion Design — every dot drifts to a slightly offset position on its own loop. */
export function DotsIcon({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const circles = ref.current?.querySelectorAll<SVGCircleElement>("[data-dot]")
    if (!circles?.length) return
    const tweens = Array.from(circles).map((circle, i) =>
      gsap.to(circle, {
        x: DOTS[i].dx,
        y: DOTS[i].dy,
        duration: DOTS[i].duration / 2,
        delay: DOTS[i].delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      }),
    )
    return () => tweens.forEach((t) => t.kill())
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" fill="#36C5F0" />
      {DOTS.map((d, i) => (
        <circle key={i} data-dot cx={d.cx} cy={d.cy} r={d.r} fill={d.fill} />
      ))}
    </svg>
  )
}
