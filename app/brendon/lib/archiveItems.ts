// Archive index data (spec §7 `lib/archive.ts` — named archiveItems.ts here
// so it doesn't collide with the existing `archiveProjects` export in
// ./projects.ts, which this replaces on the v2 page without deleting it).

export type ArchiveTag = "Brand identity" | "Design system" | "Web design"

export type ArchiveItem = {
  slug: string
  title: string
  description: string
  year: string
  tags: ArchiveTag[]
  image: string
  href: string
}

export const archiveItems: ArchiveItem[] = [
  {
    slug: "sheikh-meow",
    title: "Sheikh Meow",
    description: "Web3 brand and social identity",
    year: "2025",
    tags: ["Brand identity"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279126/kmyux5c6vnaf2hisotza.jpg",
    href: "https://www.behance.net/gallery/234060663/Luxury-Meme-Token-Branding-Social-Media-Identity",
  },
  {
    slug: "alavda-travel",
    title: "Alavda Travel",
    description: "Brand identity and design system",
    year: "2024",
    tags: ["Brand identity", "Design system"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764278972/vdeiw8wlj7gdjgbsbw4s.jpg",
    href: "https://www.behance.net/gallery/222946803/Alavda-Travel-Brand-Identity-Design",
  },
  {
    slug: "arclly",
    title: "ARCLLY",
    description: "Grocery brand and design system",
    year: "2024",
    tags: ["Brand identity", "Design system"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764280363/ifdv28cltsgypa7nhhuv.jpg",
    href: "https://www.behance.net/gallery/209998445/ARCLLY-Grocery-Branding",
  },
  {
    slug: "stixs-and-codes",
    title: "Stixs and Codes",
    description: "Brand for a kids' tech academy",
    year: "2024",
    tags: ["Brand identity", "Design system"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279109/ryrwpj24gnfju87pbkbs.jpg",
    href: "https://www.behance.net/gallery/225121059/Stix-Codes-Branding-for-a-Kids-Tech-Academy",
  },
  {
    slug: "wevolte-engineering",
    title: "Wevolte Engineering",
    description: "Brand identity and website",
    year: "2024",
    tags: ["Brand identity", "Web design"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279295/mziuakmaaf8bsmyieuyn.png",
    href: "https://www.behance.net/gallery/209972307/WEVOLTE-Engineering-Brand-Identity-Design",
  },
  {
    slug: "modern-finance-website",
    title: "Modern Finance Website",
    description: "Website for a finance company",
    year: "2024",
    tags: ["Web design"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279591/rmfuu4p1rygnmtt0wfdm.jpg",
    href: "https://www.behance.net/gallery/233993689/Modern-Website-Design-for-a-Finance-Company",
  },
  {
    slug: "letspot-token",
    title: "Letspot Token",
    description: "Web3 prize-token brand",
    year: "2024",
    tags: ["Brand identity"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279314/qttpvs3rqmdwba5hsojy.jpg",
    href: "https://www.behance.net/gallery/225118937/Crypto-Jackpot-The-Ultimate-Web3-Prize-Token",
  },
  {
    slug: "wmm-solutions",
    title: "WMM Solutions",
    description: "Brand and visual identity",
    year: "2024",
    tags: ["Brand identity"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279573/jnhrw9xc6fgctlgs9mqd.jpg",
    href: "https://www.behance.net/gallery/209968573/WMM-SOLUTIONS-Branding-and-Visual-Identity-Design",
  },
  {
    slug: "elysium-jetty",
    title: "Elysium Jetty",
    description: "Hospitality brand identity",
    year: "2024",
    tags: ["Brand identity"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279705/vt5iz1esenykqnsxz5sr.jpg",
    href: "https://www.behance.net/gallery/209971863/Elysium-Branding",
  },
  {
    slug: "penumbra-interiors",
    title: "Penumbra Interiors",
    description: "Interior studio brand identity",
    year: "2024",
    tags: ["Brand identity"],
    image: "https://res.cloudinary.com/dusynu0kv/image/upload/v1764279438/gh07foriuqoz7rfkligd.png",
    href: "https://www.behance.net/gallery/209966253/Penumbra-Interiors-Brand-Identity-Design",
  },
]

export const archiveFilters: (ArchiveTag | "All")[] = ["All", "Brand identity", "Design system", "Web design"]
