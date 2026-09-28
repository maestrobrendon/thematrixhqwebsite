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
    slug: "stixs-and-codes",
    title: "Stixs and Codes",
    year: "2024",
    industry: "Education",
    disciplines: ["Brand identity", "Design system"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    summary: "A brand for a kids' tech academy, built to feel playful without losing credibility with parents.",
    problem:
      "A tech academy for kids has two audiences at once: it has to feel fun enough for children and credible enough for the parents paying for it.",
    role: "Brand identity designer.",
    delivered: ["Logo system", "Type and color", "Iconography", "Brand applications"],
    outcome: "One identity that reads as playful to kids and trustworthy to parents.",
    stats: [],
    href: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
    cta: "Read the full case study",
    verify: true,
  },
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
    slug: "rebuild",
    title: "Re-Build",
    year: "2025",
    industry: "Hardware",
    disciplines: ["Build"],
    image: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/re-build-now",
    summary: "The site for an African hardware studio that designs and prototypes physical products.",
    problem: "The studio's own design needed to become a fast, reliable production site without the design changing along the way.",
    role: "Site developer. I built and coded the site from the team's design; I didn't design or prototype it.",
    delivered: ["Front-end build", "Responsive layout", "Production deployment"],
    outcome: "Live at re-build.now.",
    stats: [],
    href: "https://re-build.now",
    cta: "Visit the live site",
    verify: true,
  },
]
