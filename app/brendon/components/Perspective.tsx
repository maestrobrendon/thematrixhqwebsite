"use client"

import { useRef } from "react"
import Image from "next/image"
import { perspectiveAssets } from "../lib/assets"
import { useReveal, useScrollScrub } from "@/lib/gsap-utils"

export function Perspective() {
  const sectionRef = useRef<HTMLElement>(null)
  const imgWrapRef = useScrollScrub<HTMLDivElement>(
    { scale: 1.08, y: "-4%" },
    { scale: 1, y: "4%" },
    { triggerRef: sectionRef },
  )
  const eyebrowRef = useReveal<HTMLParagraphElement>({ y: 16, duration: 0.7 })
  const headingRef = useReveal<HTMLHeadingElement>({ y: 20, duration: 0.7, delay: 0.1 })
  const bodyRef = useReveal<HTMLParagraphElement>({ y: 16, duration: 0.7, delay: 0.2 })

  return (
    <section ref={sectionRef} className="relative min-h-[80vh] md:min-h-screen overflow-hidden flex items-center">
      <div ref={imgWrapRef} className="absolute inset-0">
        <Image
          src={perspectiveAssets.workingPhoto}
          alt="Brendon at work"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

      <div className="relative z-10 max-w-2xl px-6 md:px-16">
        <p ref={eyebrowRef} className="text-sm md:text-base text-white/70 mb-2">
          Companies partner with me because of my
        </p>
        <h2 ref={headingRef} className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          <span style={{ color: "var(--brendon-cyan)" }}>perspective</span>{" "}
          <span className="text-white">+ sharp instincts</span>
        </h2>
        <p ref={bodyRef} className="mt-4 text-base md:text-lg text-white/80">
          I bring a sharp eye and clear direction that makes your product stand out —{" "}
          <span className="font-medium text-white">and working with me saves it.</span>
        </p>
      </div>
    </section>
  )
}
