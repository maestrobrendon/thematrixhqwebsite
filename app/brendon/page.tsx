import type { Metadata } from "next"
import { headers } from "next/headers"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { FeaturedWork } from "./components/FeaturedWork"
import { AllWork } from "./components/AllWork"
import { WorkDivider } from "./components/WorkDivider"
import { Perspective } from "./components/Perspective"
import { SkillsExpertise } from "./components/SkillsExpertise"
import { ExperienceExpertise } from "./components/ExperienceExpertise"
import { Footer } from "./components/Footer"
import { seoAssets } from "./lib/assets"

export const metadata: Metadata = {
  title: "Brendon Oleghe (Maestro Brendon) — Multidisciplinary Designer & Brand Strategist",
  description:
    "Brendon Oleghe, known as Maestro Brendon, is a multidisciplinary designer and brand strategist with 7+ years leading design across fintech, Web3, e-commerce, and real estate. 80+ brands built.",
  keywords: [
    "Brendon Oleghe",
    "Maestro Brendon",
    "Brendon Imudiase Ideba-Oleghe",
    "The Matrix HQ",
    "Nigerian brand strategist",
    "multidisciplinary designer",
    "fintech brand designer",
    "Web3 brand designer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Brendon Oleghe — Multidisciplinary Designer & Brand Strategist",
    description: "7+ years leading design across fintech, Web3, e-commerce, and real estate. 80+ brands built.",
    url: "https://brendon.thematrixhq.com",
    siteName: "Brendon Oleghe Portfolio",
    images: [{ url: seoAssets.ogImage, width: 1200, height: 630, alt: "Brendon Oleghe" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendon Oleghe — Multidisciplinary Designer & Brand Strategist",
    description: "7+ years leading design across fintech, Web3, e-commerce, and real estate.",
    images: [seoAssets.ogImage],
  },
}

export default async function BrendonPortfolioPage() {
  // /public/brendon/hero-scene.html is a static file at the fixed path
  // /brendon/hero-scene.html. On brendon.thematrixhq.com, middleware.ts
  // rewrites any pathname starting with "/brendon" by prepending another
  // "/brendon" — so requesting "/brendon/hero-scene.html" there resolves to
  // "/brendon/brendon/hero-scene.html", which doesn't exist, and the hero's
  // iframe 404s. Requesting "/hero-scene.html" instead lets that same
  // middleware rewrite it correctly to "/brendon/hero-scene.html". The main
  // thematrixhq.com host isn't rewritten at all, so it needs the direct path.
  const host = (await headers()).get("host") ?? ""
  const sceneSrc = host.startsWith("brendon.") ? "/hero-scene.html" : "/brendon/hero-scene.html"

  return (
    <main className="relative bg-white text-(--brendon-ink) font-body">
      <Hero sceneSrc={sceneSrc} />
      <About />
      <FeaturedWork />
      <AllWork />
      <WorkDivider />
      <Perspective />
      <SkillsExpertise />
      <ExperienceExpertise />
      <Footer />
    </main>
  )
}
