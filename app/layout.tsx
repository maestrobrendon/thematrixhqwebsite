import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import localFont from "next/font/local"

import { Plus_Jakarta_Sans, Geist_Mono, Source_Serif_4, Geist, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

// Initialize Google fonts
const geist = Geist({ 
  subsets: ['latin'], 
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["100","200","300","400","500","600","700","800","900"],
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-serif",
})

// Loading Basis Grotesque Arabic Pro font
const basisGrotesque = localFont({
  src: [
    {
      path: "./fonts/BasisGrotesqueArabicPro-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/BasisGrotesqueArabicPro-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-basis-grotesque",
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "The Matrix HQ — Step Out of the Ordinary",
  description: "A creative and AI-driven design agency in Lagos, Nigeria. Fast websites, bold brands, intelligent solutions.",
  icons: {
    icon: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764316993/sswh8theoz9tocz5g2tp.png",
    apple: "/apple-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${plusJakartaSans.variable} ${geistMono.variable} ${sourceSerif.variable} ${basisGrotesque.variable}`}>
      <body className="font-sans antialiased bg-black text-white overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  
  )
}
