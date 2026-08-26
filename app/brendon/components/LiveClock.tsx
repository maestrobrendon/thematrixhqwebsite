"use client"

import { useEffect, useState } from "react"

function format(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
}

export function LiveClock({ className }: { className?: string }) {
  // Render nothing time-dependent until mounted, so SSR and first client
  // paint match exactly (no hydration mismatch from real-time clocks).
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    setTime(format(new Date()))
    const id = setInterval(() => setTime(format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? " "}
    </span>
  )
}
