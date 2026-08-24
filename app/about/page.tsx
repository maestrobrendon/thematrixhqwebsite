"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavigationHeader } from "@/components/navigation-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const galleryImages = [
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764286643/v16ohkolblwkurwmp8mq.avif",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764286645/oqwyve8bpkjdwqizg26q.avif",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279314/qttpvs3rqmdwba5hsojy.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
  "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png"
]

const goals = [
  "Human-centered design that resonates",
  "Strategic thinking that drives results",
  "Seamless collaboration, zero friction",
  "Momentum that compounds over time",
  "Premium execution, every single time"
]

const stats = [
  {
    number: "30hr",
    label: "First draft turnaround",
    description: "AI-accelerated speed, finished by hand."
  },
  {
    number: "100%",
    label: "Art Director reviewed",
    description: "Every file checked before it reaches you."
  },
  {
    number: "0",
    label: "Template shortcuts",
    description: "Every deliverable built from scratch for your brand."
  }
]

const faqs = [
  {
    question: "What services do you offer?",
    answer: "We specialize in brand identity, web design & development, UI/UX design, and digital strategy. From concept to launch, we handle the entire creative and technical lifecycle."
  },
  {
    question: "Do you work with startups or only established brands?",
    answer: "We work with ambitious founders and visionary teams at every stage. Whether you're pre-launch or scaling, if you're ready to build something unforgettable, we're ready to help."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timeline depends on scope. A full brand identity takes 2-4 weeks, websites 3-6 weeks, and custom software 4-8 weeks. We move fast without compromising quality."
  },
  {
    question: "What's your pricing structure?",
    answer: "We offer fixed-price packages and custom quotes based on project complexity. Book a discovery call and we'll provide a clear, transparent proposal tailored to your needs."
  }
]

export default function AboutPage() {
  return (
    <main className="relative bg-matrix-bg min-h-screen">
      <NavigationHeader />
      
      <HeroSection />
      <BentoGallerySection />
      <VisionSection />
      <MissionGoalsSection />
      <StatsSection />
      <BannerCTASection />
      <FAQSection />
      <FinalCTASection />
      
      <Footer />
    </main>
  )
}

// Hero Section with Video
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="https://res.cloudinary.com/dusynu0kv/video/upload/v1764287296/jmysjhbbhx8e27ijyv9f.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-matrix-text mb-8 leading-[1.1]">
            We <span className="text-matrix-blue">craft</span> brands{" "}
            <br className="hidden md:block" />
            that move <span className="text-matrix-blue">people</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-matrix-text-muted max-w-3xl mb-12 leading-relaxed">
            A boutique creative roster, built around your brand. Senior Art Director eyes on every file before it reaches you. AI tools that compress production time without cutting corners on craft.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Button
              asChild
              className="h-12 md:h-14 px-8 md:px-10 rounded-full bg-matrix-blue text-white hover:bg-matrix-blue-light font-medium text-base md:text-lg"
            >
              <Link href="/work">View Our Work</Link>
            </Button>
            
            <span className="text-sm text-matrix-text-dim">
              (6.5244° N, 3.3792° E) — Lagos, Nigeria
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-matrix-text-muted" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Bento Gallery Section
function BentoGallerySection() {
  return (
    <section className="py-20 md:py-32 bg-matrix-bg border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {/* Large Image - Spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-1 md:row-span-2 relative aspect-[3/4] md:aspect-auto"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[0]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Medium Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[1]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Wide Image - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="col-span-2 md:col-span-1 md:row-span-1 relative aspect-[2/1] md:aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[2]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Medium Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[3]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Large Image - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-2 relative aspect-[2/1]"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[4]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Medium Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[5]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Tall Image - Spans 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="md:col-span-1 md:row-span-2 relative aspect-[3/4] md:aspect-auto"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[6]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>

          {/* Medium Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="relative aspect-square"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group">
              <Image
                src={galleryImages[7]}
                alt="Gallery"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Vision Section
function VisionSection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/design-mode/xzlfypeot6qkd3kq6x8n.avif"
          alt="Vision Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-matrix-bg via-matrix-bg/90 to-matrix-bg" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm md:text-base text-matrix-blue uppercase tracking-wider mb-8">
            More than execution
          </p>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-matrix-text mb-12 leading-tight">
            Building brands <br />
            with <span className="text-matrix-blue">purpose</span>
          </h2>

          <p className="text-xl md:text-2xl text-matrix-text-muted leading-relaxed mb-12">
            Every project starts with understanding what truly matters — the people behind the brand, 
            the emotions you want to evoke, and the impact you want to create. Strategy without empathy 
            is noise. We build with intention.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-matrix-surface">
              <Image
                src="/images/design-mode/ka9nkuvweajfpg9t7d6z(1).jpg"
                alt="Brendon Maestro"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-matrix-text font-bold">Brendon Maestro</p>
              <p className="text-sm text-matrix-text-muted">Founder & Creative Director</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Mission & Goals Section
function MissionGoalsSection() {
  return (
    <section className="py-20 md:py-32 bg-matrix-bg border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm md:text-base text-matrix-blue uppercase tracking-wider mb-6">
              Our mission
            </h3>
            <p className="text-xl md:text-2xl text-matrix-text leading-relaxed">
              To help founders and visionary leaders turn ambitious ideas into brands that people 
              remember, connect with, and champion. We believe great design isn't decoration — 
              it's the bridge between vision and growth.
            </p>
          </motion.div>

          {/* Goals */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm md:text-base text-matrix-blue uppercase tracking-wider mb-6">
              How we work
            </h3>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-lg md:text-xl text-matrix-text-muted"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue flex-shrink-0" />
                  <span>{goal}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-20 md:py-32 bg-matrix-bg">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center md:text-left"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-matrix-blue mb-4">
                {stat.number}
              </div>
              <div className="text-xl md:text-2xl font-bold text-matrix-text mb-2">
                {stat.label}
              </div>
              <p className="text-base text-matrix-text-muted">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Banner CTA Section
function BannerCTASection() {
  return (
    <section className="relative py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/design-mode/xzlfypeot6qkd3kq6x8n.avif"
          alt="CTA Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Ready to build something <br />
            <span className="text-matrix-blue">unforgettable?</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12">
            Let's turn your vision into a brand that moves people and drives results.
          </p>

          <Button
            asChild
            className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-matrix-blue text-white hover:bg-matrix-blue-light font-medium text-lg md:text-xl"
          >
            <Link href="/#contact">
              Start a Project
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-32 bg-matrix-bg border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-sm md:text-base text-matrix-blue uppercase tracking-wider mb-4">
            Have questions?
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-matrix-text">
            Find the <span className="text-matrix-blue">answers</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-matrix-border rounded-2xl overflow-hidden bg-matrix-surface"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 md:px-8 py-6 md:py-8 flex items-center justify-between text-left hover:bg-matrix-surface-hover transition-colors"
              >
                <span className="text-lg md:text-xl font-bold text-matrix-text pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-matrix-text-muted" />
                </motion.div>
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <p className="text-base md:text-lg text-matrix-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Final CTA Section
function FinalCTASection() {
  const [emailCopied, setEmailCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@thematrixhq.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <section className="py-20 md:py-32 bg-matrix-bg border-t border-matrix-border">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm md:text-base text-matrix-blue uppercase tracking-wider mb-6">
              Start the conversation today
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-matrix-text mb-12 leading-tight">
              Start your <br />
              <span className="text-matrix-blue">project</span> today
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-matrix-text-muted mb-2">Do you prefer email?</p>
                <button
                  onClick={copyEmail}
                  className="text-xl md:text-2xl font-bold text-matrix-text hover:text-matrix-blue transition-colors flex items-center gap-2"
                >
                  hello@thematrixhq.com
                  <span className="text-sm text-matrix-blue">
                    {emailCopied ? "Copied!" : ""}
                  </span>
                </button>
              </div>

              <div className="pt-6 space-y-3">
                <p className="text-lg font-bold text-matrix-text">How do we connect?</p>
                <ul className="space-y-2 text-matrix-text-muted">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue" />
                    We reply within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue" />
                    Direct access to our team — no bots
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-matrix-blue" />
                    We ask smart questions fast
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-matrix-blue/20 blur-2xl rounded-full" />
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-matrix-blue">
                <Image
                  src="/images/design-mode/ka9nkuvweajfpg9t7d6z(1).jpg"
                  alt="Team leader"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-matrix-surface border border-matrix-border px-6 py-3 rounded-full whitespace-nowrap">
                <p className="text-sm font-medium text-matrix-text">Creative Director</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
