import type { Metadata } from "next"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Footer } from "../components/Footer"
import { aboutAssets, seoAssets } from "../lib/assets"

export const metadata: Metadata = {
  title: "About Brendon Oleghe (Maestro Brendon) — Career, Education & Ventures",
  description:
    "The full story behind Brendon Oleghe, also known as Maestro Brendon: career history across The Matrix HQ, HEED, Growmodo and more, education, and side ventures.",
  keywords: [
    "Brendon Oleghe",
    "Maestro Brendon",
    "Brendon Imudiase Ideba-Oleghe",
    "Brendon Oleghe bio",
    "Brendon Oleghe career",
    "University of Benin",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Brendon Oleghe — Maestro Brendon",
    description: "Career, education, and side ventures behind the multidisciplinary designer known as Maestro Brendon.",
    url: "https://brendon.thematrixhq.com/about",
    siteName: "Brendon Oleghe Portfolio",
    images: [{ url: seoAssets.ogImage, width: 1200, height: 630, alt: "Brendon Oleghe" }],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Brendon Oleghe — Maestro Brendon",
    description: "Career, education, and side ventures behind the multidisciplinary designer known as Maestro Brendon.",
    images: [seoAssets.ogImage],
  },
}

// Same content, two hosts — see middleware.ts. Resolved server-side here so
// the "back home" link is correct on first paint, no client-side swap needed.
async function homeHref() {
  const host = (await headers()).get("host") ?? ""
  return host.startsWith("brendon.") ? "/" : "/brendon"
}

export default async function AboutPage() {
  const home = await homeHref()

  return (
    <main className="relative bg-white text-(--brendon-ink) font-body">
      <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20">
        <Link
          href={home}
          className="inline-flex items-center gap-1.5 text-sm text-(--brendon-muted) hover:text-(--brendon-ink) transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-12">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 overflow-hidden rounded-full border border-black/10">
            <Image src={aboutAssets.workspacePhoto} alt="Brendon Oleghe" fill className="object-cover" />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-tight text-(--brendon-ink)">
              About Brendon Oleghe
            </h1>
            <p className="mt-2 text-(--brendon-muted)">
              Also known as <span className="font-medium text-(--brendon-ink)">Maestro Brendon</span> — full name{" "}
              <span className="font-medium text-(--brendon-ink)">Brendon Imudiase Ideba-Oleghe</span>.
            </p>
          </div>
        </div>

        <article className="prose-brendon space-y-12 text-base md:text-lg leading-relaxed text-(--brendon-muted)">
          <section>
            <h2 className="font-display text-xl md:text-2xl tracking-tight text-(--brendon-ink) mb-4">
              Design, from the fintech side to the front end
            </h2>
            <p>
              Brendon Oleghe is a multidisciplinary designer and brand strategist with 7+ years leading design
              across fintech, Web3, e-commerce, and real estate — 80+ brands built across that time. The work
              spans brand identity, design systems, motion, and product design, with a consistent throughline: make
              the aesthetics and the strategy work as one system, not two.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl tracking-tight text-(--brendon-ink) mb-4">Career</h2>
            <p>
              Brendon led creative execution for HEED / The Render Unit LLC as Creative Lead (Nov 2025 – Aug 2026,
              remote from Colorado, US), directing brand identity, architectural visualization, and
              lead-generation marketing for real estate developer clients that contributed to an estimated $2M+ in
              pre-sales. Alongside that, he has provided senior design support to Growmodo&apos;s global client base
              as a contract Senior Graphic Designer &amp; AI Expert, applying AI-assisted workflows to production
              design work.
            </p>
            <p className="mt-4">
              Earlier, he led branding for two major token launches as Lead Graphics Designer at Quintes (Nov 2024 –
              July 2025), helping secure $2M+ in seed funding, and built an end-to-end brand identity system for a
              digital banking platform as a contract Brand Identity Designer at LEDGA (May 2024 – Aug 2024).
            </p>
            <p className="mt-4">
              From August 2019 to October 2024, Brendon was Creative Director at{" "}
              <a
                href="https://thematrixhq.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-(--brendon-ink)"
              >
                The Matrix HQ
              </a>
              , a boutique design studio in Lagos, Nigeria, where he led creative strategy and brand identity for
              80+ clients across fintech, e-commerce, Web3, and logistics, and built the agency&apos;s design
              systems, SOPs, and contractor model from the ground up. Before that, he was a Junior Graphic Designer
              at The Matrix House (2019–2020), and freelanced as a Brand &amp; Digital Designer from 2016–2019,
              launching 20+ brand identities for startups.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl tracking-tight text-(--brendon-ink) mb-4">Education</h2>
            <p>Bachelor of Science in Computer Science, University of Benin, 2023.</p>
          </section>

          <section>
            <h2 className="font-display text-xl md:text-2xl tracking-tight text-(--brendon-ink) mb-4">
              Other ventures
            </h2>
            <p>
              Outside of client design work, Brendon has built and backed a handful of smaller ventures: Viax
              Global Logistics, Bake Box, Maestro Mills, Scoops by Maestro, Aaron Noir, and Cyon&apos;s Treat. Maestro
              Mills received a ₦500,000 grant from JCI IEES in 2024.
            </p>
          </section>
        </article>
      </div>

      <Footer />
    </main>
  )
}
