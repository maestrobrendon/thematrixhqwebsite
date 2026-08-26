"use client"

import { useEffect, useState } from "react"

/**
 * Scroll-spy: tracks which of the given section ids is currently crossing a
 * thin band near the vertical center of the viewport, so nav links can
 * highlight the section actually in view rather than just reacting to a click.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b))
          setActive(topMost.target.id)
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ids is a literal array from the caller; keying on its
    // stringified contents (instead of reference identity) avoids tearing the observer down on every active-section change.
  }, [ids.join(",")])

  return active
}
