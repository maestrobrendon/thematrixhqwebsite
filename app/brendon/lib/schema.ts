import { seoAssets } from "./assets"

// Structured data (JSON-LD) for Brendon Oleghe / Maestro Brendon — this is
// what lets search engines resolve "Brendon Oleghe" and "Maestro Brendon" as
// the same entity across the web, and is the foundation any future Knowledge
// Panel would be built from.
//
// Ground rule: every claim here must already be established, verifiable
// content elsewhere on this site (About.tsx, ExperienceExpertise.tsx,
// Footer.tsx) or explicitly confirmed by Brendon. Schema that contradicts a
// page's own visible copy is worse than no schema — it reads to Google as an
// untrustworthy signal, not just a missing one.
//
// Deliberately omitted: a `worksFor` claim. The site's own career history
// (ExperienceExpertise.tsx) lists The Matrix HQ as a past role (Creative
// Director, Aug 2019–Oct 2024) and the more recent entries (HEED/The Render
// Unit, Growmodo) read as fixed-term/contract work rather than one clear
// current employer — so asserting a current worksFor here would go beyond
// what's actually established. Add it back once there's a single, current,
// confirmed affiliation to point at.
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Brendon Oleghe",
  // Full legal name is as supplied by Brendon; not independently verified
  // against a resume file (none exists in this repo) — confirm before
  // treating it as authoritative beyond this site.
  alternateName: ["Maestro Brendon", "Brendon Imudiase Ideba-Oleghe"],
  url: "https://brendon.thematrixhq.com",
  jobTitle: "Multidisciplinary Designer & Brand Strategist",
  description:
    "Brendon Oleghe, known as Maestro Brendon, is a multidisciplinary designer and brand strategist with 7+ years leading design across fintech, Web3, e-commerce, and real estate — 80+ brands built.",
  // Reuses the real photo already published in the About section (see
  // seoAssets in ./assets) rather than a placeholder.
  image: seoAssets.headshot,
  // Supplied by Brendon; not independently verified (no resume file in this
  // repo to cross-check against).
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Benin",
  },
  // The single most important field for entity resolution — every URL here
  // is a corroborating signal telling Google "these are the same person."
  // Keep this complete: an incomplete list is much weaker than a full one.
  sameAs: [
    "https://www.linkedin.com/in/brendonoleghe",
    "https://www.behance.net/maestrobrendon",
    "https://dribbble.com/maestrobrendon",
    "https://twitter.com/maestrobrendon",
    // TODO: add a live Instagram URL if one is used professionally
    // TODO: add a live GitHub URL if one exists
  ],
  knowsAbout: [
    "Brand Identity",
    "UI/UX Design",
    "Design Systems",
    "Motion Design",
    "Art Direction",
    "Web Design",
    "Product Design",
  ],
} as const
