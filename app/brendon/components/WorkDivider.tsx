"use client"

import { useRef } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { featuredWorkAssets } from "../lib/assets"
import { useReveal, useScrollScrub } from "@/lib/gsap-utils"

export function WorkDivider() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useScrollScrub<HTMLSpanElement>({ x: "6%" }, { x: "-6%" }, { triggerRef: sectionRef })
  const revealRef = useReveal<HTMLDivElement>({ scale: 0.85, duration: 0.6 })

  return (
    <section ref={sectionRef} className="relative py-8 md:py-12 overflow-hidden bg-white flex flex-col items-center justify-center">
      <span
        ref={textRef}
        aria-hidden
        className="font-display select-none pointer-events-none text-[22vw] leading-none tracking-tight text-black/[0.06] whitespace-nowrap"
      >
        Work
      </span>

      <div ref={revealRef} className="absolute flex flex-col items-center gap-3">
        <Image src={featuredWorkAssets.folderIcon} alt="" width={64} height={52} className="w-14 h-auto" />
        <p className="text-xs md:text-sm text-black/60 text-center">
          Curious?... Check out my{" "}
          <a
            href="https://linkedin.com/in/brendonoleghe"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-black transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>
          <br />
          Or keep scrolling
        </p>
      </div>
    </section>
  )
}
