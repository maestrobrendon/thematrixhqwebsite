"use client"

import { useRef } from "react"
import Image from "next/image"
import { StickyNote } from "./StickyNote"
import { aboutAssets } from "../lib/assets"
import { CheckerIcon, StarburstIcon, EyeIcon, DotsIcon } from "./SkillIcons"
import { useBrendonHref } from "../lib/useBrendonHref"
import { useReveal, useStaggerReveal } from "@/lib/gsap-utils"

const skills = [
  { label: "Brand Identity", Icon: CheckerIcon, bg: "#f2b705", text: "#1a1400" },
  { label: "Art Direction", Icon: StarburstIcon, bg: "#3fae6a", text: "#ffffff" },
  { label: "Design Systems", Icon: EyeIcon, bg: "#ec1561", text: "#ffffff" },
  { label: "Motion Design", Icon: DotsIcon, bg: "#3fc6f0", text: "#04222b" },
]

export function About() {
  const boundsRef = useRef<HTMLDivElement>(null)
  const aboutPageHref = useBrendonHref("/about")

  const polaroidRef = useReveal<HTMLDivElement>({ scale: 0.9, rotateFrom: 6, duration: 0.6, delay: 0.2 })
  const headingRef = useReveal<HTMLHeadingElement>({ y: 20, duration: 0.7 })
  const mobilePhotoRef = useReveal<HTMLDivElement>({ scale: 0.9, rotateFrom: -3, duration: 0.6, delay: 0.2 })
  const bodyRef = useReveal<HTMLParagraphElement>({ duration: 0.6, delay: 0.3 })
  const skillsRef = useStaggerReveal<HTMLDivElement>(".skill-pill", { y: 12, duration: 0.4, stagger: 0.08 })

  return (
    <section id="about" ref={boundsRef} className="relative py-16 md:py-20 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        {/* Polaroid — sits in the outer wide column so it never overlaps the text */}
        <div
          ref={polaroidRef}
          className="hidden lg:block absolute right-0 top-28 w-36 bg-white p-2 pb-6 shadow-lg border border-black/5 z-10 transition-transform duration-300 hover:rotate-0 hover:scale-[1.03]"
          style={{ rotate: "4deg" }}
        >
          <div className="relative w-full aspect-4/5 overflow-hidden">
            <Image src={aboutAssets.workspacePhoto} alt="Brendon Oleghe at his workspace, 2026" fill className="object-cover" />
          </div>
          <p className="font-hand text-center text-sm mt-1 text-black/70">2026</p>
        </div>

        <div className="max-w-2xl mx-auto relative text-center">
          {/* Tag row */}
          <div className="relative h-16 mb-2">
            <StickyNote dragConstraints={boundsRef} rotate={-3} className="hidden sm:block absolute left-2 md:left-8 top-0 w-32">
              <Image src={aboutAssets.aboutMeTag} alt="About me!" width={373} height={263} className="w-full h-auto" draggable={false} />
            </StickyNote>

            <StickyNote dragConstraints={boundsRef} rotate={4} className="hidden sm:block absolute right-2 md:right-8 top-1 w-32">
              <Image src={aboutAssets.startProjectButton} alt="Start a project" width={168} height={91} className="w-full h-auto" draggable={false} />
            </StickyNote>
          </div>

          {/* Statement heading */}
          <h2 ref={headingRef} className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug text-(--brendon-ink)">
            I&apos;m a Designer who gets excited about the harder problem, the one where{" "}
            <span className="relative inline-flex items-center gap-1.5">
              brand
              <Image src={aboutAssets.yellowInBetween} alt="" width={48} height={68} className="inline-block h-8 w-auto align-middle" />
            </span>{" "}
            and product have to work as one system, not two
            <Image src={aboutAssets.lastIcon} alt="" width={48} height={68} className="inline-block h-8 w-auto align-middle ml-1.5" />.
          </h2>

          {/* Same photo, shown inline instead of floating once there's no room to the side */}
          <div
            ref={mobilePhotoRef}
            className="lg:hidden mx-auto mt-6 w-28 bg-white p-2 pb-5 shadow-lg border border-black/5"
            style={{ rotate: "-3deg" }}
          >
            <div className="relative w-full aspect-4/5 overflow-hidden">
              <Image src={aboutAssets.workspacePhoto} alt="Brendon Oleghe at his workspace, 2026" fill className="object-cover" />
            </div>
            <p className="font-hand text-center text-xs mt-1 text-black/70">2026</p>
          </div>

          <p ref={bodyRef} className="mt-8 text-base md:text-lg text-(--brendon-muted) max-w-xl mx-auto">
            with over 7+ years crafting design strategy for large and medium sized institutions in finance, Web3,
            crypto, real estate, Ai, tech and in-house agencies. I merge aesthetics with strategy, so the work looks
            good and actually moves the business. Also known as{" "}
            <span className="text-(--brendon-ink) font-medium">Maestro Brendon</span> — read the full story on{" "}
            <a href={aboutPageHref} className="underline underline-offset-2 hover:text-(--brendon-ink)">
              the about page
            </a>
            .
          </p>

          {/* Skill pills */}
          <div ref={skillsRef} className="mt-10 flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
            {skills.map((skill) => (
              <div
                key={skill.label}
                className="skill-pill flex items-stretch font-medium text-sm transition-transform duration-200 hover:-translate-y-[3px]"
              >
                <span className="flex items-center px-4 py-2.5" style={{ backgroundColor: skill.bg, color: skill.text }}>
                  {skill.label}
                </span>
                <skill.Icon className="w-10 h-10 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
