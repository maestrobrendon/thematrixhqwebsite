"use client"

// Coordinates ScrollTrigger across every section (spec §5.3 implementation
// note): the pinned CaseStack adds a large scroll-height spacer once it
// mounts, which shifts every trigger registered by a later-mounting sibling
// (Built, Motion, Process, Experience, Dock's nav pill) out from under its
// own cached start/end. Mounted last in the tree so its effect runs after
// every section has registered its own triggers, this does one coordinated
// sort + refresh once fonts and images have settled — matching the
// prototype's own `ScrollTrigger.sort(); ScrollTrigger.refresh();` boot step.
import { useEffect } from "react"
import { ScrollTrigger } from "@/lib/gsap-utils"

export function GlobalMotion() {
  useEffect(() => {
    let cancelled = false
    ;(document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (cancelled) return
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })

    const imgs = Array.from(document.images)
    let pending = imgs.filter((i) => !i.complete).length
    function onLoad() {
      pending--
      if (pending <= 0) ScrollTrigger.refresh()
    }
    if (pending > 0) {
      imgs.forEach((i) => !i.complete && i.addEventListener("load", onLoad, { once: true }))
    }

    return () => {
      cancelled = true
      imgs.forEach((i) => i.removeEventListener("load", onLoad))
    }
  }, [])

  return null
}
