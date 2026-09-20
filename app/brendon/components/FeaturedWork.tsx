"use client"

import { useRef } from "react"
import Image from "next/image"
import { StickyNote } from "./StickyNote"
import { WorkShowcase } from "./WorkShowcase"
import { featuredWorkAssets } from "../lib/assets"
import { useReveal } from "@/lib/gsap-utils"

export function FeaturedWork() {
  const boundsRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useReveal<HTMLParagraphElement>({ y: -8, duration: 0.5 })

  return (
    <section id="work" ref={boundsRef} className="relative pt-14 pb-12 md:pt-16 md:pb-16 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative text-center mb-8">
          <p ref={eyebrowRef} className="font-hand text-xl text-black/70 -rotate-2">
            explore my work!
          </p>

          <StickyNote dragConstraints={boundsRef} rotate={5} className="hidden sm:block absolute right-[28%] top-0 w-24">
            <Image src={featuredWorkAssets.projectsTag} alt="Projects" width={376} height={234} className="w-full h-auto" draggable={false} />
          </StickyNote>
        </div>
      </div>

      {/* Full-bleed, outside the max-w-5xl column on purpose — the diagonal
          strip needs to run edge to edge, not sit letterboxed inside the
          content column like the rest of this section. */}
      <WorkShowcase />
    </section>
  )
}
