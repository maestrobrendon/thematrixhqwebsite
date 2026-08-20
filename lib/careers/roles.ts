export type RoleType = "Full-time" | "Contract" | "Commission"
export type Department = "Creative" | "Product" | "Operations" | "Sales"

export interface Role {
  slug: string
  title: string
  department: Department
  type: RoleType
  location: string
  summary: string
  about: string
  responsibilities: string[]
  wontDo?: string[]
  requirements: string[]
  niceToHave: string[]
  whatYouGet: string[]
  successLooks?: string[]
}

export const ROLES: Role[] = [
  {
    slug: "art-director",
    title: "Art Director",
    department: "Creative",
    type: "Full-time",
    location: "Remote",
    summary: "Lead creative direction across client projects — from brand campaigns to digital assets. You set the bar, then help everyone clear it.",
    about: `thematrixHQ is a creative subscription studio. Clients get a full design team on a flat monthly fee — unlimited requests, unlimited revisions, and an Art Director (you) signing off on everything before it reaches them. We move fast, we work remotely, and we care about craft more than hours.

The Art Director is the creative backbone of the studio. Every file that leaves thematrixHQ goes through you. You're not just reviewing work — you're shaping the aesthetic direction of the company and the creative output of every designer on the team.`,
    responsibilities: [
      "Review and approve every client deliverable before it ships",
      "Set creative direction and quality standards across all active projects",
      "Work directly with clients during onboarding to establish brand guidelines and creative intent",
      "Mentor junior designers and provide actionable feedback, not just corrections",
      "Collaborate with the founder on studio positioning and how our work is presented publicly",
      "Identify recurring quality gaps and build solutions — template systems, feedback guides, style references",
      "Contribute to the company's own visual identity as it evolves",
    ],
    requirements: [
      "5+ years of design experience, at least 2 as an Art Director or Senior Designer",
      "A portfolio that demonstrates range — brand identity, digital design, campaign work",
      "Deep fluency in Figma; Adobe suite proficiency is a plus",
      "Strong written and verbal communication — you'll be writing briefs, giving feedback, and talking to clients",
      "High standards and the ability to articulate exactly why something isn't working",
      "Comfortable managing multiple projects and deadlines simultaneously",
    ],
    niceToHave: [
      "Experience running design teams or managing creative workflows",
      "Background in motion or video direction",
      "Familiarity with AI-assisted design tools",
      "Experience working within a subscription or productized service model",
    ],
    whatYouGet: [
      "Competitive salary + performance bonuses",
      "Remote — results matter, not your location",
      "Direct creative ownership over a growing studio's output",
      "Exposure to a wide range of industries and brand challenges",
      "A seat at the table on studio strategy and direction",
    ],
  },
  {
    slug: "brand-designer",
    title: "Brand Designer",
    department: "Creative",
    type: "Full-time",
    location: "Remote",
    summary: "Design brands that stick — identities, guidelines, and the visual systems that hold everything together.",
    about: `At thematrixHQ, brand designers are the core of what we deliver. Clients come to us because their brand isn't doing the work it should — whether that's a first-time founder building from scratch or an established company that's outgrown their identity.

You'll work on multiple client brands at once, moving between discovery, concept, and execution. Every piece of work goes through an Art Director before it ships, which means you'll get real feedback and grow faster than in most agency roles.`,
    responsibilities: [
      "Design brand identities from concept through complete brand guidelines",
      "Create logos, colour systems, typography stacks, and visual language for client brands",
      "Produce brand collateral: stationery, pitch decks, social templates, and more",
      "Translate client briefs into clear visual directions for Art Director review",
      "Manage multiple active client projects while maintaining consistency and quality",
      "Contribute ideas during creative briefs and brand strategy sessions",
    ],
    requirements: [
      "3+ years of brand design experience",
      "Portfolio showing complete brand identity projects — not just logos",
      "Expert-level Figma proficiency",
      "Strong typographic sensibility and eye for colour",
      "Ability to work at pace without sacrificing craft",
      "Clear written communication for client-facing files and handoffs",
    ],
    niceToHave: [
      "Experience designing for both print and digital across the same brand system",
      "Motion skills for animated logo variants or social content",
      "Familiarity with brand strategy or positioning work",
    ],
    whatYouGet: [
      "Competitive salary",
      "Art Director feedback on every piece of work — you'll grow fast",
      "Remote",
      "A diverse portfolio of brand challenges across industries",
      "Clear progression toward Senior Designer and Art Director tracks",
    ],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "Product",
    type: "Full-time",
    location: "Remote",
    summary: "Design digital products that are as considered as they are beautiful — interfaces, flows, and systems that work for real people.",
    about: `thematrixHQ handles digital design for founders, startups, and growing teams. As our UI/UX Designer, you'll own the digital product side of the studio — everything from landing pages and dashboards to full product flows.

You'll work closely with clients to understand what they're building, then translate that into interfaces that are clear, functional, and visually sharp. Our Art Director reviews everything, so quality is always the standard.`,
    responsibilities: [
      "Design user interfaces for web applications, landing pages, and mobile products",
      "Run discovery conversations to understand user needs and product goals",
      "Create wireframes, prototypes, and high-fidelity UI designs in Figma",
      "Build and maintain design systems for client products",
      "Collaborate with developers to ensure accurate implementation",
      "Conduct usability reviews and iterate based on feedback",
    ],
    requirements: [
      "3+ years of UI/UX design experience",
      "Portfolio showing product design work — not just visual design",
      "Expert Figma proficiency, including component systems and prototyping",
      "Strong understanding of interaction design principles and usability",
      "Comfortable moving between research, wireframing, and final UI",
      "Experience designing responsive layouts for web and mobile",
    ],
    niceToHave: [
      "Experience with design tokens and handoff workflows for development",
      "Basic understanding of front-end development (HTML/CSS)",
      "Background in SaaS product design",
      "Motion and micro-interaction design experience",
    ],
    whatYouGet: [
      "Competitive salary",
      "Exposure to diverse product challenges across industries",
      "Remote",
      "Art Director oversight — you'll ship better work than on your own",
      "Clear career path toward Product Design Lead",
    ],
  },
  {
    slug: "motion-designer",
    title: "Motion Designer",
    department: "Creative",
    type: "Contract",
    location: "Remote",
    summary: "Bring brands to life through motion — social content, animated identities, and video assets that stop the scroll.",
    about: `We're bringing motion capability into the studio. As our Motion Designer, you'll work on contract across client projects that need animation, video, or motion design — brand reveals, social reels, presentation animations, and more.

This is a flexible, project-based engagement. You pick up work as it comes through and deliver at a high standard. The goal is to build toward a longer-term relationship as motion becomes a bigger part of what we offer clients.`,
    responsibilities: [
      "Create animated brand assets — logo reveals, motion guidelines, animated identities",
      "Design and animate social content — reels, stories, short-form video",
      "Produce motion graphics for client presentations and pitch decks",
      "Collaborate with the Creative team to ensure motion aligns with brand guidelines",
      "Deliver export-ready files across relevant formats (MP4, GIF, Lottie, etc.)",
    ],
    requirements: [
      "2+ years of motion design experience",
      "Portfolio showing motion work across multiple formats — not just one style",
      "Proficiency in After Effects; Premiere Pro is a plus",
      "Understanding of brand identity principles — motion should extend the brand, not fight it",
      "Reliable turnaround and clear communication on project timelines",
    ],
    niceToHave: [
      "Experience with Rive or Lottie for web animations",
      "3D motion capabilities (Cinema 4D, Blender)",
      "Social-first content experience — knowing what performs on Instagram, TikTok, LinkedIn",
    ],
    whatYouGet: [
      "Competitive day/project rates",
      "Flexible, remote work — you own your schedule",
      "Consistent pipeline of work as the studio grows",
      "Creative freedom within brand guardrails",
    ],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    department: "Operations",
    type: "Full-time",
    location: "Remote",
    summary: "Keep the studio running with precision — client onboarding, project coordination, and making sure nothing slips through.",
    about: `At thematrixHQ, speed and reliability are non-negotiable. Clients are on subscriptions — they expect fast turnarounds and clear communication. The Project Manager is the person who makes sure that happens, every time.

You'll sit between clients and the creative team. You run onboarding, manage active project queues, communicate progress, and handle anything that threatens a deadline. You'll work directly with the founder on studio operations and have a real hand in how we scale.`,
    responsibilities: [
      "Onboard new clients — kick-off calls, brief intake, asset collection",
      "Manage and prioritise the active project queue across all designers",
      "Communicate project status, timeline updates, and revision rounds to clients",
      "Track deliverables, deadlines, and revision counts in our project management tools",
      "Identify and escalate blockers before they become problems",
      "Maintain clear records of client preferences, brand notes, and file structures",
      "Support the founder with studio process improvements and workflow optimisation",
    ],
    requirements: [
      "2+ years of project management experience, ideally in a creative or agency environment",
      "Strong written communication — you'll be writing to clients every day",
      "Experience with project management tools (Notion, Asana, Linear, or similar)",
      "Calm under pressure — when clients are urgent, you stay clear",
      "Detail-oriented: nothing falls through on your watch",
      "Ability to manage multiple concurrent projects without losing track",
    ],
    niceToHave: [
      "Experience in a productized service or subscription-based business",
      "Understanding of the creative process — you don't need to design, but you need to understand what's involved",
      "Experience with CRM tools for client communication tracking",
    ],
    whatYouGet: [
      "Competitive salary",
      "Ownership over studio operations — your ideas for improvement get implemented",
      "Remote",
      "Direct access to the founder and real influence on how the studio runs",
      "Growth path toward Head of Operations as the studio scales",
    ],
  },
  {
    slug: "sales-agent",
    title: "Sales Agent",
    department: "Sales",
    type: "Commission",
    location: "Remote",
    summary: "Find and close new clients for thematrixHQ's creative subscription — commission-only, uncapped, and yours to build.",
    about: `thematrixHQ runs on subscriptions. Clients pay a flat monthly fee and get a full design team. The sales model is simple: find a founder or business that needs design, help them see that a subscription beats freelancers and full-time hires, and close the deal.

As a Sales Agent, you work independently — your own hours, your own methods, your own network. There's no salary, but there's a real commission structure with a signing bounty per deal and a monthly recurring bounty for as long as your client stays active.

Read the Sales Playbook in the team wiki before applying. It has everything you need to know about the product, the commission structure, and how we work.`,
    responsibilities: [
      "Find and qualify prospective clients through your own network, outreach, and referrals",
      "Log every prospect in the CRM before making contact",
      "Run discovery conversations to understand what clients need and recommend the right plan",
      "Submit every deal for a fit check before anything is signed",
      "Hand closed clients over to the Project Manager for onboarding",
      "Represent thematrixHQ professionally and accurately — no promises beyond what's in the playbook",
    ],
    requirements: [
      "Proven track record in sales or business development — you know how to close",
      "Strong network of potential clients: founders, startups, SMEs, or agencies",
      "Comfortable with a commission-only structure — you're motivated by results, not hours",
      "Clear communicator: you can explain a product simply and handle objections confidently",
      "Self-directed — you don't need a manager to tell you to work",
    ],
    niceToHave: [
      "Existing relationships in the startup or SME ecosystem",
      "Experience selling subscription or SaaS products",
      "Background in design, marketing, or creative services — you understand what we deliver",
    ],
    whatYouGet: [
      "Signing bounty on every new client you close",
      "Monthly recurring bounty for every active client you introduced",
      "Fully remote and self-directed work",
      "No cap on earnings — your income scales with your performance",
      "Full support: pitch materials, pricing docs, and a founder who picks up the phone",
    ],
  },
  {
    slug: "sales-lead",
    title: "Sales Lead",
    department: "Sales",
    type: "Commission",
    location: "Remote",
    summary: "Build and lead the sales team from scratch — recruit agents, close clients personally, and own the pipeline that funds the studio's growth.",
    about: `thematrixHQ is a creative subscription agency for founders, business owners, and teams. One flat monthly fee, unlimited design requests, unlimited revisions. Every piece of work moves fast because it's AI-accelerated, and every piece is checked by a human Art Director before it reaches a client.

We're Lagos-based and we work with clients anywhere in the world. We're building toward the kind of work that stands next to the best creative studios globally, not a discount alternative to them.

We're hiring our first Sales Lead. This is a build-the-team role, not a run-an-existing-playbook role. You'll recruit, train, and lead a small team of commission-only Sales Agents, close clients personally, and be the person who makes sure everything the team sells actually matches what we can deliver.

You'll work closely with the founder, who currently handles sales personally. This role exists to take that off their plate and build something bigger than one person closing deals.`,
    responsibilities: [
      "Recruit, onboard, and train Sales Agents, working with the founder on hiring decisions",
      "Run the team's rhythm: check-ins, pipeline reviews, performance conversations",
      "Make sure every Agent knows and follows the Sales Playbook",
      "Settle lead ownership disputes between Agents",
      "Flag underperformance or conduct issues early, not after they've become a pattern",
      "Run a fit check on every deal before it's signed, confirming the client is in scope and we have the capacity to deliver",
      "Escalate anything unusual in size, scope, or risk to the founder",
      "Watch early churn across the team and address the cause when it points to oversold or badly qualified clients",
      "Find and close clients directly, on the same terms as any Agent on the team",
      "Log every personal prospect in the CRM under the same lead ownership rules that apply to Agents",
    ],
    requirements: [
      "You've sold before, ideally in a service, agency, or subscription business — and you know what a real sales process looks like beyond \"send more messages\"",
      "You can lead people without a title doing the work for you. Commission-only teams don't stay motivated by accident",
      "You're comfortable being the one who says no to a deal that doesn't fit, even when it means walking away from a close",
      "You communicate clearly and directly — no vague reassurance, internally or with clients",
      "You're organised enough to run a CRM properly, because lead ownership and commission both depend on it being accurate",
      "Based in Nigeria or able to work Nigeria-friendly hours, and open to an independent contractor arrangement",
    ],
    niceToHave: [
      "Experience building or managing a commission-only sales team",
      "Background in creative services, agency, or subscription businesses",
      "Existing network of founders, SMEs, or agencies who need design",
    ],
    wontDo: [
      "Promise a deliverable, turnaround, or discount that isn't in the Sales Playbook",
      "Negotiate custom pricing, or authorise an Agent to do so",
      "Sign a client contract — only the founder signs",
    ],
    whatYouGet: [
      "Signing bounty on every client you close personally",
      "Monthly recurring bounty on your personal clients",
      "Team override on all revenue your agents bring in — uncapped, ongoing",
      "Fully remote and self-directed",
      "Direct line to the founder — you're building this together, not executing someone else's plan",
    ],
    successLooks: [
      "A team of Sales Agents who know the playbook cold and don't need to be micromanaged",
      "Deals that survive past 60 days — meaning the team is qualifying properly, not just closing",
      "A pipeline that's clean and current, not a black box",
      "The founder spending less time on sales, not more",
    ],
  },
]

export function getRoleBySlug(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug)
}

export const DEPT_COLORS: Record<Department, string> = {
  Creative: "#E84519",
  Product:  "#4CAF88",
  Operations: "#C8A427",
  Sales:    "#E86830",
}
