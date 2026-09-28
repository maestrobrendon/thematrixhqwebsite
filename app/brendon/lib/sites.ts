// "Built and shipped" data (spec §7, §5.5).

export type LiveSite = {
  title: string
  url: string
  href: string
  description: string
  tags: string[]
  screenshot?: string
  video?: string
  verify?: boolean
}

export const sites: LiveSite[] = [
  {
    title: "Assura Cash",
    url: "assuracash.com",
    href: "https://assuracash.com",
    description: "Lending platform. Designed and built end to end.",
    tags: ["Design", "Build", "Next.js"],
    // Full-page capture (spec §14.2), captured via scripts/capture-sites.mjs
    // and hosted on the du5nhfcgd Cloudinary account with the rest of this
    // rebuild's assets — tall enough for the hover-scroll travel effect.
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/assuracash-com",
    verify: true,
  },
  {
    title: "Inaara Woman",
    url: "inaarawoman.com",
    href: "https://inaarawoman.com",
    description: "Storefront for a womenswear label.",
    tags: ["Design", "Build", "E-commerce"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/inaarawoman-com",
    verify: true,
  },
  {
    title: "Moods and Motion",
    url: "moodsandmotion.vercel.app",
    href: "https://moodsandmotion.vercel.app",
    description: "An experimental piece on mood, type and movement.",
    tags: ["Design", "Build", "GSAP"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/moodsandmotion-vercel-app",
    verify: true,
  },
  {
    title: "The Matrix HQ",
    url: "thematrixhq.com",
    href: "https://thematrixhq.com",
    description: "Site for the studio I led as creative director for five years.",
    tags: ["Design", "Build", "Next.js"],
    screenshot: "https://res.cloudinary.com/du5nhfcgd/image/upload/f_auto,q_auto,w_1600/brendon/shots/thematrixhq-com",
  },
  {
    title: "This portfolio",
    url: "maestrobrendon.com",
    href: "https://maestrobrendon.com",
    description: "Designed in Figma, built with Next.js, GSAP and Claude Code. Press I to inspect it.",
    tags: ["Design", "Build", "GSAP"],
  },
]
