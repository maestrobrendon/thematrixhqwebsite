"use client"

// Dock nav (spec §6.1) — fixed glass pill on desktop, bottom tab-bar on
// mobile. Sliding active pill tracked with ScrollTrigger per section.
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap-utils"
import { chrome } from "../lib/chrome"

const SECTION_NAV: Record<string, string> = {
  about: "about",
  work: "work",
  built: "built",
  motion: "motion",
  archive: "motion",
  process: "experience",
  experience: "experience",
  contact: "contact",
}

export function Dock() {
  const dockRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const dock = dockRef.current
    if (!dock) return
    const pill = dock.querySelector<HTMLElement>(".pill")
    const navLinks = Array.from(dock.querySelectorAll<HTMLAnchorElement>("[data-nav]"))
    if (!pill) return

    function setNav(id: string | null) {
      navLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === id))
      const a = navLinks.find((a) => a.dataset.nav === id && a.offsetParent !== null)
      if (!a || a.classList.contains("hire")) {
        gsap.to(pill!, { opacity: 0, duration: 0.3 })
        return
      }
      gsap.to(pill!, { x: a.offsetLeft, width: a.offsetWidth, opacity: 1, duration: 0.6, ease: "expo.out" })
    }

    const triggers = Object.keys(SECTION_NAV).map((id) =>
      ScrollTrigger.create({
        trigger: "#" + id,
        start: "top 50%",
        end: "bottom 50%",
        refreshPriority: -1,
        onToggle: (s: any) => s.isActive && setNav(SECTION_NAV[id]),
      })
    )
    const heroTrigger = ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "bottom 50%",
      onToggle: (s: any) => s.isActive && setNav(null),
    })

    return () => {
      triggers.forEach((t) => t.kill())
      heroTrigger.kill()
    }
  }, [])

  return (
    <nav className="dock" aria-label="Primary" data-ix="Dock / Default" ref={dockRef}>
      <span className="pill" aria-hidden="true" />
      <a className="mark" href="#top" aria-label="Brendon Oleghe, back to top">
        <svg viewBox="0 0 22 24" fill="currentColor" aria-hidden="true">
          <path d="M11 1.3c-2.1 0-3.95 1.2-4.75 2.95C3.95 4.55 2.3 6.25 2.3 8.35c0 2.3 1.9 4.2 4.3 4.2h8.8c2.4 0 4.3-1.9 4.3-4.2 0-2.1-1.65-3.8-4-4.1C14.95 2.5 13.1 1.3 11 1.3Z" />
          <path d="M9.6 12.55h2.8v4.2c1.35.3 2.45 1.15 3.15 2.4-1.35.4-2.4.15-3.15-.4v4.15H9.6v-4.15c-.75.55-1.8.8-3.15.4.7-1.25 1.8-2.1 3.15-2.4v-4.2Z" />
        </svg>
      </a>
      <a href="#work" data-nav="work">Work</a>
      <a href="#built" data-nav="built">Built</a>
      <a href="#motion" data-nav="motion">Motion</a>
      <a href="#about" data-nav="about" className="d-hide">About</a>
      <a href="#experience" data-nav="experience" className="d-hide">Experience</a>
      <span className="sep" />
      <button
        className="icon-btn"
        aria-label="Open command menu"
        aria-haspopup="dialog"
        onClick={() => chrome.openCommandMenu?.()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-4.2-4.2" />
        </svg>
        <span className="kbd d-hide">⌘K</span>
      </button>
      <button
        className="icon-btn"
        id="ixBtn"
        aria-pressed="false"
        aria-label="Toggle inspect mode (I)"
        data-cursor="Inspect this page"
        onClick={() => chrome.toggleInspect?.()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
          <path d="m10 10 6 2.5-2.6 1-1 2.6z" />
        </svg>
      </button>
      <a className="hire d-hide" href="#contact" data-nav="contact">Hire me</a>
    </nav>
  )
}
