import type React from "react"
import type { Metadata, Viewport } from "next"
import { Anybody, Hanken_Grotesk, DM_Mono, Just_Me_Again_Down_Here } from "next/font/google"
import "./brendon.css"
import { personSchema } from "./lib/schema"
import { SmoothScroll } from "./components/SmoothScroll"

// v2 type system (spec §3.3): Anybody carries the kinetic width axis for the
// name/email/headings; Hanken Grotesk is body/UI; DM Mono is reserved for
// spec values (Inspect mode, the hero size readout); the hand font is
// reserved for the two hero sticky notes + the polaroid caption.
const display = Anybody({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
})
const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})
const spec = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-spec",
  display: "swap",
  preload: false,
})
const hand = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand",
  display: "swap",
  preload: false,
})

// Fallback metadata for any /brendon route that doesn't define its own —
// each real route (page.tsx, about/page.tsx) sets its own more specific
// title/description/OG data that takes precedence over this.
export const metadata: Metadata = {
  metadataBase: new URL("https://maestrobrendon.com"),
  title: "Brendon Oleghe (Maestro Brendon) — Senior brand & product designer",
  description:
    "Brendon Oleghe (Maestro Brendon) designs brand, product and motion as one system, then builds and ships it. 7+ years, 80+ brands across fintech, Web3, real estate and AI.",
}

export const viewport: Viewport = {
  themeColor: "#3A3E33",
}

export default function BrendonLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${display.variable} ${spec.variable} ${hand.variable} ${body.variable} brendon-scope`}>
      {/* Person structured data — read by search engines to resolve
          "Brendon Oleghe" and "Maestro Brendon" as one entity. See
          ./lib/schema.ts for the ground rules behind what's in here. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <SmoothScroll />
      {children}
    </div>
  )
}
