import { projectCovers } from "./assets"

export type Project = {
  slug: string
  number: string
  date: string
  title: string
  description: string
  href: string
  image: string
  tags: string[]
  color: "cyan" | "black" | "gold" | "magenta"
}

// Real projects from Brendon's Behance, in the order they should appear.
// Add more entries here as they're finalized — the card component cycles
// through the 4-color palette automatically.
export const projects: Project[] = [
  {
    slug: "vaultra",
    number: "01",
    date: "Aug 2026",
    title: "Vaultra Finance",
    description: "A full brand identity system for a finance platform built to feel secure, modern, and trustworthy.",
    href: "https://www.behance.net/gallery/244030983/Vaultra-Finance-Brand-Identity",
    image: projectCovers.vaultra,
    tags: ["Brand Identity", "Finance"],
    color: "cyan",
  },
  {
    slug: "giftlyft",
    number: "02",
    date: "Aug 2026",
    title: "Giftlyft",
    description: "Brand identity and packaging design for a gifting platform designed to feel joyful and giftable.",
    href: "https://www.behance.net/gallery/244047577/Giftlyft-Brand-Identity-Packaging-Design",
    image: projectCovers.giftlyft,
    tags: ["Brand Identity", "Packaging"],
    color: "black",
  },
  {
    slug: "ledga",
    number: "03",
    date: "2025",
    title: "LEDGA Finance",
    description: "Full branding and identity design for a finance platform, built as a cohesive design system.",
    href: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279279/vvn9avecee8eaj9yptti.jpg",
    tags: ["Brand Identity", "Design System"],
    color: "gold",
  },
  {
    slug: "sheikh-meow",
    number: "04",
    date: "2025",
    title: "Sheikh Meow",
    description: "Luxury meme token branding and social media identity for a Web3 project.",
    href: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    tags: ["Brand Identity", "Motion", "Web Design"],
    color: "magenta",
  },
]

// Color scheme per card, read directly from the Project_1–4 SVG exports
// (background hex) plus the confirmed tag-chip / IMAGE.JPG-badge pairing
// per card. Each card uses its own pairing — not one shared rule.
export const colorSchemes: Record<
  Project["color"],
  { bg: string; tabText: string; tagBg: string; tagText: string; badgeBg: string; badgeText: string }
> = {
  cyan: { bg: "#36c5f0", tabText: "#111212", tagBg: "#111212", tagText: "#36c5f0", badgeBg: "#111212", badgeText: "#36c5f0" },
  black: { bg: "#111212", tabText: "#ffffff", tagBg: "#ffffff", tagText: "#111212", badgeBg: "#ffffff", badgeText: "#111212" },
  gold: { bg: "#ecb22e", tabText: "#111212", tagBg: "#111212", tagText: "#ecb22e", badgeBg: "#ecb22e", badgeText: "#111212" },
  magenta: { bg: "#e01e5a", tabText: "#ffffff", tagBg: "#ffffff", tagText: "#e01e5a", badgeBg: "#e01e5a", badgeText: "#ffffff" },
}
