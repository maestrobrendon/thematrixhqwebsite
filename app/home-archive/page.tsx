"use client"

import { NavigationHeader } from "@/components/navigation-header"
import { MatrixSignalWave } from "@/components/matrix-signal-wave"
import { ScrollReveal } from "@/components/scroll-reveal"
import { VisionSection } from "@/components/vision-section"
import { PricingSection } from "@/components/pricing-section"
import { OurServicesSection } from "@/components/our-services-section"
import { ServicesSection } from "@/components/services-section"
import { OurProcessSection } from "@/components/our-process-section"
import { PortfolioShowcase } from "@/components/portfolio-showcase"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowDown } from "lucide-react"
import { WordCarousel } from "@/components/word-carousel"
import Link from "next/link"

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="relative bg-matrix-bg min-h-screen selection:bg-matrix-blue/30">
      {/* Navigation - Atom AI Style */}
      <NavigationHeader />

      {/* Hero Section - Atom AI Clone */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-matrix-bg via-matrix-bg to-matrix-bg" />

        <MatrixSignalWave />

        <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
          <ScrollReveal>
            <div className="inline-flex md:flex md:justify-center md:w-full items-center gap-2 mb-8 md:mb-12">

            </div>

            <h1 className="text-5xl md:text-6xl md:text-center lg:text-7xl font-bold tracking-tight text-matrix-text md:mx-auto md:max-w-3xl lg:max-w-4xl leading-[1.1] md:leading-[1.05] mb-12 md:mb-16 font-sans">
              World-class branding and websites for <WordCarousel />.
            </h1>

            <div className="flex items-center gap-4 md:gap-6 md:justify-center">
              <Button
                asChild
                className="h-11 md:h-12 px-6 md:px-8 rounded-md bg-matrix-text text-matrix-bg hover:bg-matrix-text-muted font-medium text-sm md:text-base transition-all"
              >
                <Link href="https://wa.me/2347045985964" target="_blank" rel="noopener noreferrer">
                  START NOW
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                onClick={() => scrollToSection("work")}
                variant="ghost"
                className="h-11 md:h-12 px-6 md:px-8 rounded-md text-matrix-text hover:bg-matrix-surface-hover font-medium text-sm md:text-base transition-all"
              >
                VIEW WORK
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision Section */}
      <VisionSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Our Services Section */}
      <OurServicesSection />

      {/* Our Process Section */}
      <OurProcessSection />

      {/* Featured Work Section - MOVED BEFORE Why Choose Us */}
      <section id="work" className="py-32 bg-matrix-bg relative border-t border-matrix-border">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-matrix-text">
                Work that quietly <span className="text-matrix-text-dim">speaks for itself</span>
              </h2>
              <p className="text-xl text-matrix-text-muted max-w-2xl mx-auto">
                We shape each experience to tell a story that feels true.
              </p>
            </div>
          </ScrollReveal>
          <PortfolioShowcase />
        </div>
      </section>

      {/* Services Section with Bento Grid - Why Choose Us */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </main>
  )
}
