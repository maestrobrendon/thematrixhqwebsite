"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  category: string
  description: string
  image: string
  year: string
  tags: string[]
  link: string
  type: "website" | "behance"
}

const projects: Project[] = [
  {
    title: "ARCLLY",
    category: "Grocery Branding",
    description: "Modern grocery brand identity with fresh visual language and comprehensive brand guidelines",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
    year: "2024",
    tags: ["Branding", "Visual Identity", "Retail"],
    link: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",
    type: "behance"
  },
  {
    title: "LEDGA Finance",
    category: "Brand Identity",
    description: "Full branding and identity design for corporate finance company",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
    year: "2024",
    tags: ["Branding", "Corporate", "Identity"],
    link: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    type: "behance"
  },
  {
    title: "Inaara Woman",
    category: "Luxury Fashion Brand",
    description: "Premium e-commerce experience for luxury fashion brand with seamless shopping journey",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281205/yruv2nywtqxicdja6kxe.jpg",
    year: "2024",
    tags: ["E-commerce", "Luxury", "Web Design"],
    link: "https://inaarawoman.com",
    type: "website"
  },
  {
    title: "Assura Cash",
    category: "Financial Management App",
    description: "Complete financial management platform with intuitive budgeting and real-time expense tracking",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
    year: "2025",
    tags: ["Fintech", "Web App", "UI/UX"],
    link: "https://assuracash.com",
    type: "website"
  },
  {
    title: "Sheikh Meow",
    category: "Meme Token Branding",
    description: "Luxury meme token branding with comprehensive social media identity and character design",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    year: "2024",
    tags: ["Cryptocurrency", "Social Media", "Branding"],
    link: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
    type: "behance"
  },
  {
    title: "Moods and Motion",
    category: "Photo Studio Rental",
    description: "Modern platform for photo studio rental with seamless booking experience",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764281736/kpccrqsvrrqz8ew5htbt.jpg",
    year: "2024",
    tags: ["Photography", "Web Design", "Platform"],
    link: "https://moodsandmotion.vercel.app",
    type: "website"
  },
  {
    title: "Alavda Travel",
    category: "Travel Brand Identity",
    description: "Complete brand identity design for travel agency with clean and modern visual system",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
    year: "2024",
    tags: ["Visual Design", "Brand Identity", "Travel"],
    link: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",
    type: "behance"
  },
]

export function PortfolioShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <ScrollReveal key={index} delay={index * 100}>
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card
              className="group relative overflow-hidden border border-matrix-border shadow-none bg-matrix-surface hover:bg-matrix-surface-hover backdrop-blur-sm cursor-pointer transition-all duration-300 rounded-2xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center p-6 md:p-8">
                {/* Project Image */}
                <div className="md:col-span-8 relative">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-matrix-bg/50 border border-matrix-border">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-matrix-bg/50 to-transparent group-hover:from-matrix-bg/30 transition-all duration-300" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="md:col-span-4 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-matrix-text-muted">
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.category}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-matrix-text group-hover:text-matrix-blue transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-matrix-text-muted leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-medium bg-matrix-surface-hover text-matrix-text-muted rounded-full border border-matrix-border"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium pt-4 text-matrix-text-muted group-hover:text-matrix-blue transition-colors">
                    <span>{project.type === "website" ? "Visit Website" : "View on Behance"}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </ScrollReveal>
      ))}

      {/* View More Button */}
      <ScrollReveal delay={projects.length * 100}>
        <div className="flex justify-center pt-8">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-matrix-blue hover:bg-matrix-blue/90 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-matrix-blue/20"
          >
            <span>View More Work</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </ScrollReveal>
    </div>
  )
}
