import type React from "react"
import type { Metadata } from "next"
import { Chakra_Petch, DM_Mono, Just_Me_Again_Down_Here, Inter } from "next/font/google"
import "./brendon.css"
import { personSchema } from "./lib/schema"

// Display font for the wordmark + "FEATURED WORKS" heading. The reference design
// uses a licensed font called "Flux" (per its Figma file) that isn't available as a
// web font — Chakra Petch is the closest free substitute with the same blocky,
// technical letterforms. Swap this import if a "Flux" webfont license is acquired.
const displayFont = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
})

// Monospace accent — ruler bar numerals + clock, matching the reference site's own
// shipped DM Mono webfont for that chrome.
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

// Handwritten sticky-note font ("my name is", "explore my work!", captions)
const handwritten = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
})

// Body / UI font
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
})

// Fallback metadata for any /brendon route that doesn't define its own —
// each real route (page.tsx, about/page.tsx) sets its own more specific
// title/description/OG data that takes precedence over this.
export const metadata: Metadata = {
  metadataBase: new URL("https://brendon.thematrixhq.com"),
  title: "Brendon Oleghe — Multidisciplinary Designer",
  description:
    "Brendon Oleghe — multidisciplinary designer working across brand identity, design systems, motion, and web design.",
}

export default function BrendonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${displayFont.variable} ${dmMono.variable} ${handwritten.variable} ${inter.variable} brendon-scope`}>
      {/* Person structured data — read by search engines to resolve
          "Brendon Oleghe" and "Maestro Brendon" as one entity. See
          ./lib/schema.ts for the ground rules behind what's in here. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {children}
    </div>
  )
}
