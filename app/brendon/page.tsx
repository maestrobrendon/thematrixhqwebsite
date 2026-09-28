import type { Metadata } from "next"
import { Dock } from "./components/Dock"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { CaseStack } from "./components/CaseStack"
import { BuiltShipped } from "./components/BuiltShipped"
import { MotionReel } from "./components/MotionReel"
import { Archive } from "./components/Archive"
import { Process } from "./components/Process"
import { Experience } from "./components/Experience"
import { Footer } from "./components/Footer"
import { CommandMenu } from "./components/CommandMenu"
import { Cursor } from "./components/Cursor"
import { Toast } from "./components/Toast"
import { InspectMode } from "./components/InspectMode"
import { GlobalMotion } from "./components/GlobalMotion"
import { seoAssets } from "./lib/assets"
import { creativeWorksSchema } from "./lib/schema"

export const metadata: Metadata = {
  title: "Brendon Oleghe (Maestro Brendon) — Senior brand & product designer",
  description:
    "Brendon Oleghe (Maestro Brendon) designs brand, product and motion as one system, then builds and ships it. 7+ years, 80+ brands across fintech, Web3, real estate and AI.",
  keywords: [
    "Brendon Oleghe",
    "Maestro Brendon",
    "Brendon Imudiase Ideba-Oleghe",
    "The Matrix HQ",
    "senior brand designer",
    "senior product designer",
    "fintech brand designer",
    "Web3 brand designer",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Brendon Oleghe — Senior brand & product designer",
    description: "7+ years, 80+ brands across fintech, Web3, real estate and AI. I design with intent over decoration, then build and ship it.",
    url: "https://maestrobrendon.com",
    siteName: "Brendon Oleghe Portfolio",
    images: [{ url: seoAssets.ogImage, width: 1200, height: 630, alt: "Brendon Oleghe" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brendon Oleghe — Senior brand & product designer",
    description: "7+ years, 80+ brands across fintech, Web3, real estate and AI.",
    images: [seoAssets.ogImage],
  },
}

export default function BrendonPortfolioPage() {
  return (
    <>
      {/* CreativeWork structured data, one per selected-work case study — see
          ./lib/schema.ts for why each `url` points off-site. */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorksSchema) }}
      />
      <a className="skip" href="#main">Skip to content</a>
      <Dock />
      <main id="main">
        <Hero />
        <About />
        <CaseStack />
        <BuiltShipped />
        <MotionReel />
        <Archive />
        <Process />
        <Experience />
      </main>
      <Footer />
      <CommandMenu />
      <Cursor />
      <Toast />
      <InspectMode />
      <GlobalMotion />
    </>
  )
}
