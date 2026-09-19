"use client"

import { useEffect, useState } from "react"
import { isBrendonHost } from "./isBrendonHost"

/**
 * This same /brendon content is reachable multiple ways — thematrixhq.com/brendon/*
 * directly, and brendon.thematrixhq.com/* or maestrobrendon.com/* via a
 * middleware rewrite that strips the /brendon prefix (see middleware.ts). A
 * link to another Brendon route needs a different href depending on which one
 * served the current page, or it 404s on the rewritten ones.
 *
 * `path` is the route relative to the /brendon section, e.g. "/about" or "/"
 * (home). Renders with the thematrixhq.com/brendon/* form during SSR/first
 * paint (always correct, never breaks), then swaps to the shorter rewritten
 * form after mount if that's the host actually in use.
 */
export function useBrendonHref(path: string): string {
  const normalized = path === "/" ? "" : path
  const [href, setHref] = useState(`/brendon${normalized}`)

  useEffect(() => {
    if (isBrendonHost(window.location.hostname)) {
      setHref(normalized || "/")
    }
  }, [normalized])

  return href
}
