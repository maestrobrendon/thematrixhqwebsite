import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import localFont from "next/font/local"
import { Plus_Jakarta_Sans, Geist_Mono, Source_Serif_4, Geist } from "next/font/google"

// ── Google fonts — each loaded once, all with display:swap ────────────────────
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-geist-mono",
  display: "swap",
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  preload: true,
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-serif",
  display: "swap",
})

// ── Local font — Basis Grotesque ─────────────────────────────────────────────
const basisGrotesque = localFont({
  src: [
    { path: "./fonts/BasisGrotesqueArabicPro-Light.ttf",   weight: "300", style: "normal" },
    { path: "./fonts/BasisGrotesqueArabicPro-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/BasisGrotesqueArabicPro-Medium.ttf",  weight: "500", style: "normal" },
    { path: "./fonts/BasisGrotesqueArabicPro-Bold.ttf",    weight: "700", style: "normal" },
    { path: "./fonts/BasisGrotesqueArabicPro-Black.ttf",   weight: "900", style: "normal" },
  ],
  variable: "--font-basis-grotesque",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "The Matrix HQ — Step Out of the Ordinary",
  description:
    "A creative and AI-driven design agency in Lagos, Nigeria. Fast websites, bold brands, intelligent solutions.",
  icons: {
    icon: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764316993/sswh8theoz9tocz5g2tp.png",
    apple: "/apple-icon.png",
  },
}

const fontVars = [
  geist.variable,
  plusJakartaSans.variable,
  geistMono.variable,
  sourceSerif.variable,
  basisGrotesque.variable,
].join(" ")

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`scroll-smooth ${fontVars}`}>
      <head>
        {/* Preconnect to external image and font hosts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* Critical above-the-fold CSS — prevents FOUC before Tailwind loads */}
        <style dangerouslySetInnerHTML={{ __html: `
          body { background-color: #0B1F17; margin: 0; }
          nav { height: 68px; }
          section:first-of-type { min-height: 100vh; }
        ` }} />
      </head>
      <body className="font-sans antialiased bg-black text-white overflow-x-hidden">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
