// ── Pexels CDN helper ─────────────────────────────────────────────────────────
export function px(id: number) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`
}

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ProcessStep {
  step: string
  description: string
}

export interface PortfolioItem {
  src: string
  caption: string
}

export interface Testimonial {
  quote: string
  name: string
  role: string
}

export interface ServiceEntry {
  slug: string
  category: "Creative Design Services" | "Specialized Production" | "AI Services" | "Marketing Services"
  categoryColor: "lime" | "green" | "blue" | "tan"
  eyebrow: string
  headline: string
  subhead: string
  proofStrip: string
  heroImage: number
  included: string[]
  process: ProcessStep[]
  portfolio: PortfolioItem[]
  testimonial: Testimonial | null
  pricingNote: string
  faq: Array<{ question: string; answer: string }>
  cta: string
  whatsappText: string
}

// ── Service data ──────────────────────────────────────────────────────────────
export const services: ServiceEntry[] = [
  // ── CREATIVE DESIGN SERVICES ────────────────────────────────────────────────
  {
    slug: "brand-identity",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "A brand identity built to last, not just look good today.",
    subhead:
      "Logo, color, type, and the rules that hold them together. Everything you need to look like the same brand everywhere your name shows up.",
    proofStrip: "30-hour first draft. Reviewed by an Art Director. Unlimited revisions.",
    heroImage: 8532639,
    included: [
      "Primary and secondary logo suite",
      "Brand guidelines document",
      "Color palette and typography system",
      "Business card and stationery design",
      "Brand pattern and texture library",
    ],
    process: [
      { step: "Discover", description: "We start with your brief, your brand, and your goals. No forms to fill out twice." },
      { step: "Design", description: "Your designer builds a visual identity system that matches your voice: logo, color, type, and the rules that hold it together." },
      { step: "Refine", description: "AI tools speed up the first draft. Your Art Director reviews and finishes every file by hand before it ships." },
      { step: "Deliver", description: "Full copyright and source files transfer with every plan." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "One flat monthly rate. Unlimited requests, unlimited revisions. No per-task billing.",
    faq: [
      { question: "How fast is the first draft?", answer: "30 hours from brief to first concept." },
      { question: "Who reviews the work before I see it?", answer: "Every file goes through your Art Director first. No unfinished drafts land in your inbox." },
      { question: "Do I own the files?", answer: "Yes. Full copyright and source files transfer on every plan." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Brand Identity design — can you tell me more?",
  },
  {
    slug: "social-media-creative",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Social content that still looks like your brand on the five-hundredth post.",
    subhead:
      "Templates and one-off creative for every platform, sized right and on-brand from the first post onward.",
    proofStrip: "Same 30-hour first draft. Same Art Director review. Every request.",
    heroImage: 6322506,
    included: [
      "Platform-sized templates for Instagram, LinkedIn, X, and TikTok",
      "Carousel and story designs",
      "Ad creative variations",
      "Profile and cover assets",
      "Content calendars, on request",
    ],
    process: [
      { step: "Discover", description: "Send the brief. We already know your brand from prior work, so no re-explaining." },
      { step: "Design", description: "Your designer builds out the platform-specific formats you need." },
      { step: "Refine", description: "AI speeds up variations across platforms. Your designer finishes each one by hand." },
      { step: "Deliver", description: "Ready to post, sized right, on-brand." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "One flat monthly rate. No extra billing per platform.",
    faq: [
      { question: "Can I request multiple platforms in one brief?", answer: "Yes, submit once and we build out what you need across formats." },
      { question: "Do you handle content calendars?", answer: "On request, yes." },
      { question: "Will this still look like my brand at post 500?", answer: "That's the point of the system: consistency, not one-off design." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Social Media Creative — can you tell me more?",
  },
  {
    slug: "presentation-design",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Decks that make a complex idea land in one read.",
    subhead:
      "Pitch decks, investor presentations, sales decks, and internal reports, built to be understood, not just looked at.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 6150530,
    included: [
      "Slide template systems",
      "Investor and pitch deck design",
      "Sales and case study decks",
      "Internal report formatting",
      "Chart and data visualization",
    ],
    process: [
      { step: "Discover", description: "Share your raw content, structure, or even a messy draft." },
      { step: "Design", description: "Your designer builds the narrative flow and visual system slide by slide." },
      { step: "Refine", description: "Charts, data, and layout get the same Art Director pass as every other deliverable." },
      { step: "Deliver", description: "A deck built to be presented, not just read." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Can you work from a rough outline?", answer: "Yes, that's usually where briefs start." },
      { question: "Do you build data visualizations?", answer: "Yes, charts and infographics are part of the service." },
      { question: "How fast can I get a deck before a pitch?", answer: "First draft in 30 hours." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Presentation Design — can you tell me more?",
  },
  {
    slug: "illustration-artwork",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Original illustration, built around your brand, not pulled from a stock library.",
    subhead:
      "Custom artwork for the moments a photo or template can't carry: icons, spot illustrations, packaging art, and full visual systems.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 12913151,
    included: [
      "Custom icon sets",
      "Spot illustrations",
      "Character or mascot design",
      "Packaging and product illustration",
      "Editorial artwork",
    ],
    process: [
      { step: "Discover", description: "Tell us where the illustration lives and what it needs to do." },
      { step: "Design", description: "Your designer sketches concepts matched to your brand's visual language." },
      { step: "Refine", description: "AI speeds up early exploration. Every final piece is finished by hand." },
      { step: "Deliver", description: "Original artwork, not stock, not generic." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests, unlimited revisions.",
    faq: [
      { question: "Is this custom work or stock-based?", answer: "Fully custom, built around your brand." },
      { question: "Can you design a mascot or character?", answer: "Yes, that's part of the service." },
      { question: "Does this cover packaging illustration?", answer: "Yes." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Illustration & Artwork — can you tell me more?",
  },
  {
    slug: "print-design",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Print that holds up as well in hand as it does on screen.",
    subhead:
      "Brochures, banners, and packaging designed for the material they'll actually be printed on.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 36682054,
    included: [
      "Brochures and flyers",
      "Banners and signage",
      "Packaging design",
      "Business stationery",
      "Event and trade show materials",
    ],
    process: [
      { step: "Discover", description: "Tell us the format, the material, and the deadline." },
      { step: "Design", description: "Your designer builds for print specs from the start, not as an afterthought." },
      { step: "Refine", description: "Art Director review before anything goes to print." },
      { step: "Deliver", description: "Print-ready files, sized and specced correctly." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Do you design for specific print specs?", answer: "Yes, tell us the material and format upfront." },
      { question: "Can you handle trade show materials?", answer: "Yes." },
      { question: "Is this covered under the same subscription as digital work?", answer: "Yes, one plan covers both." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Print Design — can you tell me more?",
  },
  {
    slug: "email-newsletter-design",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Emails built to be opened, read, and clicked, not just sent.",
    subhead:
      "Newsletter templates and campaign graphics designed for inboxes, not just design files.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 4133783,
    included: [
      "Newsletter templates",
      "Campaign graphics",
      "Header and banner design",
      "Mobile-responsive layouts",
      "A/B variant design",
    ],
    process: [
      { step: "Discover", description: "Share your campaign goal and existing brand assets." },
      { step: "Design", description: "Your designer builds templates that render properly across inboxes." },
      { step: "Refine", description: "Mobile-responsive checks and Art Director review before delivery." },
      { step: "Deliver", description: "Files ready to drop into your email platform." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Do templates work across email platforms?", answer: "Yes, built mobile-responsive from the start." },
      { question: "Can you build A/B variants?", answer: "Yes, that's part of the service." },
      { question: "Do I need to provide the copy?", answer: "No, copy support is available separately if needed." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Email & Newsletter Design — can you tell me more?",
  },
  {
    slug: "ebooks-report-design",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Long-form content that looks as good as it reads.",
    subhead:
      "Ebooks, whitepapers, and reports, laid out for a reader who scrolls, not just downloads.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 7735721,
    included: [
      "Ebook and whitepaper layout",
      "Report design and formatting",
      "Cover design",
      "Chart and infographic design",
      "Interactive PDF elements",
    ],
    process: [
      { step: "Discover", description: "Send the raw content, structure, or draft." },
      { step: "Design", description: "Your designer builds the layout system and visual hierarchy." },
      { step: "Refine", description: "Charts, covers, and interactive elements get the same review pass." },
      { step: "Deliver", description: "A finished document built for reading, not just downloading." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Can you design interactive PDFs?", answer: "Yes, that's part of the service." },
      { question: "Do you handle long-form layout, not just covers?", answer: "Yes, full document layout is included." },
      { question: "What if my content isn't finalized yet?", answer: "We can start from a rough draft or outline." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Ebook & Report Design — can you tell me more?",
  },
  {
    slug: "packaging-merchandise",
    category: "Creative Design Services",
    categoryColor: "lime",
    eyebrow: "Creative Design Services",
    headline: "Packaging that makes the shelf decision easy.",
    subhead:
      "Box design, label design, merchandise graphics, and retail-ready print files. Built for how your customer actually picks things up.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 8015704,
    included: [
      "Product packaging structure and design",
      "Label design (front, back, and side panels)",
      "Merchandise graphics (tees, totes, hats)",
      "Retail-ready dieline files",
      "Gift and seasonal packaging",
    ],
    process: [
      { step: "Discover", description: "Tell us the product, the material, and who's picking it up." },
      { step: "Design", description: "Your designer builds around the physical format first, then the visual system." },
      { step: "Refine", description: "Art Director review and print-spec check before anything goes to production." },
      { step: "Deliver", description: "Print-ready files with supplier specs included." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Do you provide dieline files?", answer: "Yes, retail-ready dieline files are included with every packaging project." },
      { question: "Can you design merchandise graphics?", answer: "Yes, tees, totes, hats — all covered." },
      { question: "Is this covered under the standard subscription?", answer: "Yes, same plan, same rate." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Packaging & Merchandise design — can you tell me more?",
  },

  // ── SPECIALIZED PRODUCTION ──────────────────────────────────────────────────
  {
    slug: "motion-video",
    category: "Specialized Production",
    categoryColor: "green",
    eyebrow: "Specialized Production",
    headline: "Motion that explains your product in under a minute.",
    subhead:
      "Explainer animations, reels, and edits, built to hold attention on the platform they're actually meant for.",
    proofStrip: "AI tools speed up the rough cut. A motion artist finishes every frame before it reaches you.",
    heroImage: 8981853,
    included: [
      "Explainer animations",
      "Social reels and shorts",
      "Video editing",
      "Motion graphics for presentations",
      "Video ad creative",
    ],
    process: [
      { step: "Discover", description: "Share the message and the platform it needs to live on." },
      { step: "Design", description: "AI tools speed up the rough cut and early exploration." },
      { step: "Refine", description: "A motion artist finishes every frame by hand before it ships." },
      { step: "Deliver", description: "Platform-sized, ready to publish." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "How fast is a rough cut?", answer: "AI speeds up the first pass; a motion artist finishes it by hand from there." },
      { question: "Do you edit existing footage, not just build from scratch?", answer: "Yes." },
      { question: "Is this scoped per video or included in the subscription?", answer: "Included, same as every other request." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Motion & Video production — can you tell me more?",
  },
  {
    slug: "web-landing-page-design",
    category: "Specialized Production",
    categoryColor: "green",
    eyebrow: "Specialized Production",
    headline: "A page built to convert, not just to exist.",
    subhead:
      "Landing pages and websites designed around what a visitor actually needs to do next.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 7191172,
    included: [
      "Landing page design",
      "Website UI design",
      "Responsive layouts",
      "Design systems for developer handoff",
      "Conversion-focused page structure",
    ],
    process: [
      { step: "Discover", description: "Tell us the goal of the page: sign-ups, sales, waitlist, whatever it is." },
      { step: "Design", description: "Your designer builds the structure around that one action first." },
      { step: "Refine", description: "Responsive checks and Art Director review before handoff." },
      { step: "Deliver", description: "Developer-ready files, with a design system if you need one." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Do you build the site or hand off the design?", answer: "Both, depending on scope. Design systems are available for developer handoff." },
      { question: "Is this responsive across devices?", answer: "Yes, every layout is checked before delivery." },
      { question: "Can this integrate with our existing site?", answer: "Yes, tell us the constraints in your brief." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Web & Landing Page Design — can you tell me more?",
  },
  {
    slug: "product-design",
    category: "Specialized Production",
    categoryColor: "green",
    eyebrow: "Specialized Production",
    headline: "UI and UX built around how someone actually uses your product.",
    subhead:
      "App screens and prototypes designed for real use, not a portfolio piece.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 32396960,
    included: [
      "UI and UX design",
      "App screen design",
      "Interactive prototypes",
      "Design systems",
      "User flow mapping",
    ],
    process: [
      { step: "Discover", description: "Share the product, the user, and the problem you're solving." },
      { step: "Design", description: "Your designer maps the user flow before touching a single screen." },
      { step: "Refine", description: "Prototypes and design systems get the same Art Director review." },
      { step: "Deliver", description: "Developer-ready screens and a system that scales." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Do you build interactive prototypes?", answer: "Yes, that's part of the service." },
      { question: "Do you also build the design system, not just screens?", answer: "Yes." },
      { question: "Can you work within an existing product?", answer: "Yes, we work from your existing patterns where they exist." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Product Design — can you tell me more?",
  },
  {
    slug: "copywriting",
    category: "Specialized Production",
    categoryColor: "green",
    eyebrow: "Specialized Production",
    headline: "Words that get read, and get acted on.",
    subhead:
      "Copy for the pages, campaigns, and decks your design work sits inside, written in your brand's voice, not a generic one.",
    proofStrip: "30-hour first draft. Reviewed and finished by your Art Director before it reaches you.",
    heroImage: 8489930,
    included: [
      "Website copy",
      "Ad and campaign copy",
      "Email copy",
      "Deck and pitch copy",
      "Product and UX copy",
    ],
    process: [
      { step: "Discover", description: "Share your brand voice, existing copy, or none at all if you're starting fresh." },
      { step: "Design", description: "Your writer drafts in your voice, not a generic one." },
      { step: "Refine", description: "Art Director review before it reaches you." },
      { step: "Deliver", description: "Copy ready to drop into the design it was written for." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Unlimited requests.",
    faq: [
      { question: "Can this pair with a design request?", answer: "Yes, copy and design can be requested together or separately." },
      { question: "Do you write in our existing brand voice?", answer: "Yes, that's the starting point of every brief." },
      { question: "Does this cover UX copy, not just marketing copy?", answer: "Yes." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Copywriting — can you tell me more?",
  },

  // ── AI SERVICES ─────────────────────────────────────────────────────────────
  {
    slug: "ai-powered-creative",
    category: "AI Services",
    categoryColor: "blue",
    eyebrow: "AI Services",
    headline: "Human brilliance, accelerated by AI, never replaced by it.",
    subhead:
      "AI tools compress the distance between a brief and a finished file. Every deliverable is still reviewed and finished by a human creative before it reaches you.",
    proofStrip: "First draft in 30 hours. Every file reviewed and finished by a human creative before you see it.",
    heroImage: 8386437,
    included: [
      "AI-accelerated first drafts",
      "Rapid concept exploration",
      "Faster iteration cycles",
      "Human-reviewed final files",
      "Full visibility into what's AI-assisted and what's hand-finished",
    ],
    process: [
      { step: "Discover", description: "Brief in, same as any other request." },
      { step: "Design", description: "AI tools move through the unglamorous parts: first drafts, variations, exploration." },
      { step: "Refine", description: "A human creative reviews and finishes every file. No unfinished AI output ships." },
      { step: "Deliver", description: "You always know what's AI-assisted and what's hand-finished." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Flat monthly rate. Same as every other request.",
    faq: [
      { question: "Is anything AI-generated shipped without review?", answer: "No. Every file is reviewed and finished by a human creative." },
      { question: "Can I see what was AI-assisted?", answer: "Yes, full visibility into that is part of the service." },
      { question: "Does this cost extra?", answer: "No, it's part of the same subscription." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in AI-Powered Creative — can you tell me more?",
  },
  {
    slug: "ai-consulting",
    category: "AI Services",
    categoryColor: "blue",
    eyebrow: "AI Services",
    headline: "Bring AI into your workflow without losing your standard.",
    subhead:
      "We help your team use AI tools the way we do: for speed, never for judgment. A practical look at where AI fits in your creative process and where a person still needs to be.",
    proofStrip: "Scoped with your Operator, delivered on a project timeline.",
    heroImage: 25630341,
    included: [
      "Workflow audits",
      "Tool recommendations",
      "Team training sessions",
      "Process documentation",
      "Ongoing advisory",
    ],
    process: [
      { step: "Discover", description: "We audit how your team currently works and where AI could help." },
      { step: "Recommend", description: "Specific tool and workflow recommendations, not generic advice." },
      { step: "Train", description: "Sessions with your team, documented so it sticks." },
      { step: "Advise", description: "Ongoing support as your workflow evolves." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Scoped per engagement with your Operator.",
    faq: [
      { question: "Is this a one-time audit or ongoing?", answer: "Both are available, scoped to what you need." },
      { question: "Do you train our internal team?", answer: "Yes, training sessions are part of the service." },
      { question: "Will you tell us where AI shouldn't be used?", answer: "Yes, that's the point. Speed, never judgment." },
    ],
    cta: "Book a call",
    whatsappText: "Hi, I'm interested in AI Consulting — can you tell me more?",
  },
  {
    slug: "automation",
    category: "AI Services",
    categoryColor: "blue",
    eyebrow: "AI Services",
    headline: "Move fast without compromising craft.",
    subhead:
      "We automate the repetitive parts of creative production so your team spends time on the work that actually needs a person.",
    proofStrip: "Scoped with your Operator, delivered on a project timeline.",
    heroImage: 37911158,
    included: [
      "Workflow automation setup",
      "Asset resizing and export pipelines",
      "Template systems",
      "Approval and delivery automation",
      "Integration with your existing tools",
    ],
    process: [
      { step: "Discover", description: "We map your current repetitive tasks." },
      { step: "Build", description: "We set up the automation and templates around them." },
      { step: "Integrate", description: "Connected to your existing tools, not a separate system." },
      { step: "Deliver", description: "Less manual work, same output quality." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Scoped per engagement with your Operator.",
    faq: [
      { question: "Does this replace our team?", answer: "No, it removes the repetitive parts so your team focuses on the work that needs a person." },
      { question: "Can this integrate with our existing tools?", answer: "Yes, that's part of the setup." },
      { question: "Is this a one-time setup or ongoing?", answer: "Scoped to what you need, one-time or ongoing." },
    ],
    cta: "Get started",
    whatsappText: "Hi, I'm interested in Automation services — can you tell me more?",
  },

  // ── MARKETING SERVICES ───────────────────────────────────────────────────────
  {
    slug: "campaign-strategy",
    category: "Marketing Services",
    categoryColor: "tan",
    eyebrow: "Marketing Services",
    headline: "A campaign built on a strategy, not just a deadline.",
    subhead:
      "Strategy, messaging, and concept for every campaign, so the creative work has something to stand on before a single asset gets made.",
    proofStrip: "Scoped with your Operator, delivered on a project timeline.",
    heroImage: 7710082,
    included: [
      "Campaign strategy and planning",
      "Messaging frameworks",
      "Concept development",
      "Channel planning",
      "Creative briefs for execution",
    ],
    process: [
      { step: "Discover", description: "We start with the campaign goal, not the asset list." },
      { step: "Strategize", description: "Messaging and concept get built before any design starts." },
      { step: "Plan", description: "Channel planning and briefs, ready to hand to a creative team." },
      { step: "Deliver", description: "A campaign your creative work can actually stand on." },
    ],
    portfolio: [],
    testimonial: null,
    pricingNote: "Scoped per engagement with your Operator.",
    faq: [
      { question: "Do you also execute the creative, or just strategy?", answer: "Strategy and briefs here; execution runs through the relevant service." },
      { question: "Do you plan channels, not just messaging?", answer: "Yes, channel planning is included." },
      { question: "Can this pair with an existing campaign in progress?", answer: "Yes, tell us where it currently stands." },
    ],
    cta: "Book a call",
    whatsappText: "Hi, I'm interested in Campaign Strategy — can you tell me more?",
  },
]

export function getServiceBySlug(slug: string): ServiceEntry | undefined {
  return services.find((s) => s.slug === slug)
}

export function generateStaticSlugs() {
  return services.map((s) => ({ slug: s.slug }))
}
