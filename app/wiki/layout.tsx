import type { Metadata } from "next"
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google"

const archivo = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--wiki-archivo", display: "swap" })
const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--wiki-instrument-sans", display: "swap" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--wiki-jetbrains-mono", display: "swap" })

export const metadata: Metadata = {
  title: "thematrixHQ Wiki",
  description: "Internal knowledge base",
  robots: "noindex,nofollow",
}

export default function WikiLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [archivo.variable, instrumentSans.variable, jetbrainsMono.variable].join(" ")
  return (
    <div className={fontVars} style={{
      "--wiki-font-display": "var(--wiki-archivo, 'Archivo', system-ui, sans-serif)",
      "--wiki-font-body":    "var(--wiki-instrument-sans, 'Instrument Sans', system-ui, sans-serif)",
      "--wiki-font-mono":    "var(--wiki-jetbrains-mono, 'JetBrains Mono', ui-monospace, monospace)",
    } as React.CSSProperties}>
      {children}
    </div>
  )
}
