// Selected-work data for CaseStack + CaseSheet (spec §7, §5.3, §5.4).
// Items marked `verify: true` carry DRAFT copy that Brendon must confirm
// before this is treated as final (spec §14.1) — do not add new unverified
// metrics beyond what's here.

export type Stat = { value: string; label: string }

export type CaseStudy = {
  slug: string
  title: string
  year: string
  industry: string
  disciplines: string[]
  image: string
  summary: string
  problem: string
  role: string
  delivered: string[]
  outcome: string
  stats: Stat[]
  href: string
  cta: "Read the full case study" | "Visit the live site"
  verify?: boolean
}

export const cases: CaseStudy[] = [
  {
    slug: "vaultra",
    title: "Vaultra Finance",
    year: "2026",
    industry: "Fintech",
    disciplines: ["Brand identity", "Design system"],
    image: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/1_gdy8an",
    summary: "A brand system for a finance platform that had to feel secure without feeling cold.",
    problem:
      "Finance brands default to navy and shields. Vaultra needed trust signals that still felt modern to a younger, mobile-first audience.",
    role: "Brand designer. Positioning, identity and the full visual system.",
    delivered: ["Logo system", "Type and color", "Iconography", "Product and marketing applications"],
    outcome: "One identity system that carries from app icon to launch campaign.",
    stats: [],
    href: "https://www.behance.net/gallery/244030983/Vaultra-Finance-Brand-Identity",
    cta: "Read the full case study",
    verify: true,
  },
  {
    slug: "ledga",
    title: "LEDGA",
    year: "2024",
    industry: "Digital banking",
    disciplines: ["Brand identity", "Product UI"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/f_auto,q_auto,w_1600/v1764279279/vvn9avecee8eaj9yptti.jpg",
    summary: "An end-to-end identity and product UI for a digital banking platform.",
    problem:
      "A new bank needed one identity that worked everywhere, from the app icon to onboarding screens, and felt accessible to first-time users.",
    role: "Brand identity designer (contract). Identity system plus key product screens.",
    delivered: ["Logo and wordmark", "Typography and iconography", "Onboarding and dashboard UI", "Accessibility pass"],
    outcome: "Higher engagement and accessibility, and a measurable lift in customer acquisition.",
    stats: [
      { value: "+22%", label: "user engagement and accessibility" },
      { value: "+15%", label: "customer acquisition" },
    ],
    href: "https://www.behance.net/gallery/209969707/LEDGA-Full-Branding-and-Identity-Design",
    cta: "Read the full case study",
  },
  {
    slug: "assura",
    title: "Assura Cash",
    year: "2025",
    industry: "Fintech",
    disciplines: ["Web design", "Build"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/f_auto,q_auto,w_1600/v1764281754/mnv7i1uyrl4pgfowyjrk.jpg",
    summary: "A lending product site, designed and built to explain the offer in seconds.",
    problem: "Visitors had to understand the product, trust it and start an application, all on a phone and in under a minute.",
    role: "Designer and builder. Information architecture, UI and the production build.",
    delivered: ["Site architecture", "Responsive UI", "Motion and interaction", "Production build"],
    outcome: "Live at assuracash.com.",
    stats: [],
    href: "https://assuracash.com",
    cta: "Visit the live site",
    verify: true,
  },
  {
    slug: "giftlyft",
    title: "Giftlyft",
    year: "2026",
    industry: "E-commerce",
    disciplines: ["Brand identity", "Packaging"],
    image: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/25_stljpn",
    summary: "Brand identity and packaging for a gifting platform, designed to feel joyful and giftable.",
    problem: "A gifting brand lives or dies at the unboxing. The identity had to work as hard on a box as on a screen.",
    role: "Brand and packaging designer.",
    delivered: ["Identity system", "Packaging range", "Pattern and illustration", "Social templates"],
    outcome: "A brand that feels like the gift before it's opened.",
    stats: [],
    href: "https://www.behance.net/gallery/244047577/Giftlyft-Brand-Identity-Packaging-Design",
    cta: "Read the full case study",
    verify: true,
  },
]
