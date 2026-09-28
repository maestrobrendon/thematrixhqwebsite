// Experience data (spec §7, §5.9) — ordered by start date, newest first.
// `body` may contain `<metric>...</metric>` markers; components render those
// as <span class="metric"> rather than trusting raw HTML.

export type Job = { company: string; role: string; when: string; where: string; body: string; tags: string[] }

export const jobs: Job[] = [
  {
    company: "Growmodo",
    role: "Senior graphic designer and AI expert (contract)",
    when: "2026",
    where: "Germany, remote",
    body: "On-call senior design for Growmodo's global client base across brand, marketing and digital, using AI-assisted workflows to speed up production without dropping quality.",
    tags: ["Brand", "Marketing design", "AI workflows"],
  },
  {
    company: "HEED / The Render Unit",
    role: "Creative lead",
    when: "Nov 2025 – Aug 2026",
    where: "Colorado, US, remote",
    body: "Led creative for real estate developer clients: brand identity, architectural visualization and lead-generation marketing that contributed to <metric>$2M+ in estimated pre-sales</metric>. Directed renders, landing pages and ad creative from concept to sales-ready output on weekly turnarounds.",
    tags: ["Brand identity", "Landing pages", "Art direction"],
  },
  {
    company: "Quintes",
    role: "Lead graphics designer",
    when: "Nov 2024 – Jul 2025",
    where: "Remote",
    body: "Led branding for two token launches that secured <metric>$2M+ in seed funding</metric>. Social content drove <metric>200% community growth</metric> in six months; motion-ready assets and mascots lifted engagement by <metric>35%</metric>.",
    tags: ["Web3", "Brand", "Motion"],
  },
  {
    company: "LEDGA",
    role: "Brand identity designer (contract)",
    when: "May – Aug 2024",
    where: "Remote",
    body: "End-to-end identity for a digital banking platform: type, iconography and logos, plus product UI that improved engagement and accessibility by <metric>22%</metric> and contributed to a <metric>15% lift in customer acquisition</metric>.",
    tags: ["Brand identity", "Product UI", "Fintech"],
  },
  {
    company: "The Matrix HQ",
    role: "Creative director",
    when: "Aug 2019 – Oct 2024",
    where: "Lagos",
    body: "Led creative strategy and brand identity for a boutique studio, directing work for <metric>80+ clients</metric> across fintech, e-commerce, Web3 and logistics. Built the studio's design systems, SOPs and contractor model, and led full redesigns of client websites, dashboards and mobile apps.",
    tags: ["Creative direction", "Design systems", "Team lead"],
  },
  {
    company: "The Matrix House",
    role: "Junior graphic designer",
    when: "2019 – 2020",
    where: "Lagos",
    body: "Cross-platform assets for corporate brands, including presentations and packaging. Supported UI/UX on large website revamps.",
    tags: ["Brand", "Packaging", "UI support"],
  },
  {
    company: "Freelance",
    role: "Brand and digital designer",
    when: "2016 – 2019",
    where: "Remote",
    body: "Launched <metric>20+ brand identities</metric> for startups, with logo systems, marketing toolkits and responsive landing pages, from concept to final output.",
    tags: ["Brand identity", "Landing pages"],
  },
]
