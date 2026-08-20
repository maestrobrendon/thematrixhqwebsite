export interface SearchEntry {
  id: string
  title: string
  section: "Company" | "How We Work" | "Sales"
  href: string
  description: string
  body: string
}

export const SEARCH_INDEX: SearchEntry[] = [
  {
    id: "what-is-thematrixhq",
    title: "What is thematrixHQ?",
    section: "Company",
    href: "/company/what-is-thematrixhq",
    description: "Our service model, who we help, and how the subscription works.",
    body: `thematrixHQ is a creative subscription service for founders business owners and teams. One flat monthly fee unlimited requests unlimited revisions. Every piece of work moves fast because it's AI-assisted and every piece is checked by a human Art Director before it reaches you. We help founders who need design work done without hiring, stop relying on freelancers, keep quality consistent, and move fast. We provide brand identity social media marketing graphics presentations pitch decks print marketing collateral ad creative landing pages web design motion graphics. You subscribe pick a plan. We learn your brand. You submit requests. We produce fast with AI and human review. Unlimited revisions until it's right. Scale or pause anytime.`,
  },
  {
    id: "compass",
    title: "thematrixHQ Compass",
    section: "Company",
    href: "/company/compass",
    description: "Purpose, mission, brand promise, vision, BHAG, and 3-year picture.",
    body: `Purpose: to give founders and business owners real access to a design team. Mission: we pair AI speed with a vetted pool of designers and put every piece of work through a human Art Director. Brand promise: the best team you never had to hire. Vision: a future where the best creative work doesn't come from the biggest agency it comes from the smartest pairing of people and technology out of Lagos. BHAG: by 2032 build 1000 lasting partnerships with African founders and business owners. A lasting partnership is a client relationship with real paid work every month for at least six months. 3-Year Picture by mid-2029: 150+ active subscriptions 65% gross margin 40%+ net margin 85%+ subscriber retention 90% of requests delivered on or before 30-hour SLA pool of 30 to 40 vetted designers 100+ five-star reviews 4.8 average rating 300+ lasting partnerships.`,
  },
  {
    id: "core-values",
    title: "Core Values",
    section: "Company",
    href: "/company/core-values",
    description: "The four values that guide how the team behaves, decides, and acts.",
    body: `Speed With a Backbone: fast is easy fast and right is the job. AI gets every request moving the moment it comes in but speed without judgement just gets you to the wrong answer faster. Every Client Gets the Same Room: the size of the account doesn't change the size of the effort. A founder on our smallest plan gets the same care as our biggest client. Own the Work Not Just Your Part: if it's on your desk it's your responsibility. Don't wait for someone else to catch what we missed. Say It Straight: if it needs three sentences to explain it's not clear yet. We write in plain language not agency-speak. Values are the why working rules are the how.`,
  },
  {
    id: "talent-directory",
    title: "Talent Directory",
    section: "Company",
    href: "/company/talent-directory",
    description: "How the team is organised, decision-making authority, and how we grow.",
    body: `The thematrixHQ Talent Directory shows how our people are organised how decisions get made and how the team grows as demand grows. Every hire is triggered by a bottleneck not a headcount target. Core team and freelance talent model. Human review always no matter how the team grows. Phase 0 pre-launch founder plus freelance pool. Phase 1 beta clients first hire project manager operations. Phase 2 public launch sales rep once case studies exist. Designers day-to-day execution. Project Manager intake and timeline decisions. Art Director final call on deliverables. Founder company direction pricing major hires.`,
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    section: "Company",
    href: "/company/brand-guidelines",
    description: "Colours, typography, shape system, and how to apply the brand consistently.",
    body: `Keep the thematrixHQ brand looking and reading the same everywhere. Archivo medium to semibold 500 to 600 weight headlines. Instrument Sans body copy. JetBrains Mono eyebrows labels status tags. Ink #0A0A0A structure type rules borders. Base #FFFFFF default background. Paper #F1EFE8 secondary surface. Root #00301D the system surfaces that represent the machine process panels pricing frames. Live #12B34A confirmation only status tags never a background never a headline. Human #FF4D00 judgement CTAs Art Director notes stays under 5% of any layout. The notch: one corner clipped at 14px. Usage ratio Paper 44 Ink 26 Root 18 Live 8 Human 4. Typography carries the brand headlines spacing and type hierarchy do the work. Plain bold clear.`,
  },
  {
    id: "tools-and-access",
    title: "Tools and Access",
    section: "Company",
    href: "/company/tools-and-access",
    description: "Every tool we use, who uses it, and how to get access.",
    body: `Notion wiki company docs SOPs brand guidelines all of it. Discord team communication not Slack. Google Drive file storage for anything too large for Notion 15GB free. Figma brand system org chart UI layout work free starter capped at 3 editable files. Canva fast social graphics. Google Fonts Archivo Instrument Sans JetBrains Mono. GitHub code hosting version control. Vercel website hosting. Paystack NGN subscription billing. Flutterwave NGN subscription billing alternate rail. Stripe USD and international billing. Zoho Mail default client channel hello@thematrixhq.com. WhatsApp Business optional not the default. We upgrade a tool the same way we hire a person when its free tier is the actual bottleneck not before.`,
  },
  {
    id: "services",
    title: "Services",
    section: "How We Work",
    href: "/how-we-work/services",
    description: "What we offer, how each service area works, and what's included by plan.",
    body: `Graphic and brand design logos to campaigns brand identity systems social media graphics marketing collateral ad creative packaging design brand guidelines. UI/UX design web and app interfaces wireframes prototypes Figma design systems landing page design. Web and app development marketing websites Next.js Framer Webflow landing pages campaign microsites early-stage app prototypes CMS updates. Motion and presentations motion graphics animated brand intros social media reels pitch decks investor presentations PPTX Keynote Google Slides. AI-augmented creative AI product photography compositing AI-generated brand imagery AI-assisted UI exploration brand-specific AI prompt kits. Small Business Marketing and Ads Agency plans. Web and app builds run differently from standard design requests scope the build AI-accelerated scaffold human development pass Art Director review client review handoff or deployment.`,
  },
  {
    id: "roles-and-responsibilities",
    title: "Roles and Responsibilities",
    section: "How We Work",
    href: "/how-we-work/roles-and-responsibilities",
    description: "Who owns what at thematrixHQ, from founder to roster designers.",
    body: `Zero confusion about ownership when something needs to get done. Open communication not open hierarchy. Growth-focused roles triggered by real bottlenecks. If you create it you own it. If you lead people you own their success. If you own a system you own the results. If you hand something off you own the clarity of that handoff. Founder sets creative vision quality bar pricing positioning partnerships product direction manages roster. Art Director final call whether a deliverable is ready to ship reviews every piece before client. Project Manager single point of contact intake and timeline decisions manages request queue sends progress updates. Designers deliver assigned requests flag scope or timeline issues early. Sales Rep qualifies and closes new subscriptions. Escalation path individual issues to PM or founder team issues to Art Director company-level to founder.`,
  },
  {
    id: "working-principles",
    title: "Working Principles",
    section: "How We Work",
    href: "/how-we-work/working-principles",
    description: "The five operating principles everyone at thematrixHQ works to.",
    body: `Five principles. Don't go silent: problems get bigger in silence flag it before it becomes an emergency say something the moment you see a problem ask clarifying questions before starting work. Own what you ship: no excuses fix it learn from it don't blame the brief the tools or someone else acknowledge what went wrong follow through. Don't leave a mess: set up the next person to win not to clean up after you every handoff should be ready to go files named and organised. Take feedback don't take it personally: when the Art Director flags something that's the job working not a personal jab ask questions if you don't understand feedback. Be direct be kind: say what needs saying without making it personal you can disagree without being disagreeable say what you see don't talk around it.`,
  },
  {
    id: "communication-guide",
    title: "Communication Guide",
    section: "How We Work",
    href: "/how-we-work/communication-guide",
    description: "How we communicate internally, with clients, and when things go wrong.",
    body: `thematrixHQ runs on a freelance roster spread across different locations and schedules. Get to the point state the main point first then give context. Communicate completely status where the work actually stands relevant context blocker if there is one next step who owns it. Response time standard during working hours on Discord respond within one hour. Close loops never leave a thread open if something is done say so if it's blocked explain why if it's delayed give a new timeline. Be proactive not chased. Escalate early if something blocks progress raise it within hours not days. Be direct not personal. Client communication PM owns every conversation single point of contact. Designer to PM communication flag questions blockers and delays the moment they come up never go quiet. Client-facing tone professional clear not corporate.`,
  },
  {
    id: "meetings",
    title: "Meetings",
    section: "How We Work",
    href: "/how-we-work/meetings",
    description: "Which meetings we run, how to run them, and what every meeting must produce.",
    body: `Keep meetings to a minimum every one takes time away from the request queue. Can this be a Discord message send the message instead. Weekly check-in founder and PM review active requests blockers and priorities. Art Director Review AD and designer walk through flagged work when feedback needs discussion. Roster onboarding new designer walkthrough brand system SOPs how requests get queued and delivered. Kickoff call first call with new subscriber how requests work brand walkthrough expectations. Check-in call periodic review only when client wants one not a default. Escalation call when written thread isn't resolving. Every meeting has a goal agenda takeaways with owner and due date. Meetings happen on Discord voice or video. Camera on for internal reviews. Cancel or reschedule if a key person is missing.`,
  },
  {
    id: "file-storage-and-naming",
    title: "File Storage and Naming",
    section: "How We Work",
    href: "/how-we-work/file-storage-and-naming",
    description: "How to name and store files so anything can be found in under 30 seconds.",
    body: `Two systems only thematrixHQ_Clients and thematrixHQ_Operations. No mixing client files never go in operations internal files never to a client. One source of truth no duplicate storage. Immediate filing within 24 hours. thematrixHQ_Clients Google Drive Client Name Brand Assets what client hands us Working Files in-progress Exports approved client-ready only. thematrixHQ_Operations Brand logo suite design system Finance invoicing billing Archive retired files. Figma naming Client Name dash Project Name. File naming Client Name dash Project Code dash File Type dash Version. Version numbers v01 v02 not v1 or V1. Exports folder final deliverables only PNG PDF MP4 packaged files nothing lands here until Art Director approved. Superseded files move to dated subfolder inside Working Files never deleted.`,
  },
  {
    id: "sales-playbook",
    title: "Sales Playbook",
    section: "Sales",
    href: "/sales/sales-playbook",
    description: "What we sell, who to sell to, the 6-step process, and how agents get paid.",
    body: `thematrixHQ creative subscription service founders business owners teams. One flat monthly fee unlimited design requests unlimited revisions human Art Director. Small Business 249999 naira Marketing Ads 499999 naira Agency 899999 naira. Strong fit businesses spending on design inconsistently agencies needing overflow capacity founders burned by freelancers. Weak fit one-off logo photography videography 3D animation media buying. Six steps log prospect make contact discovery call recommend plan fit check close and hand off. CRM lead ownership. Commission bounty signing 15% small business 15% marketing ads 20% agency. Monthly recurring 4% per month capped 12 months. Clawback if client cancels within 60 days.`,
  },
  {
    id: "sales-agent-agreement",
    title: "Sales Agent Agreement",
    section: "Sales",
    href: "/sales/sales-agent-agreement",
    description: "Commission structure, obligations, and terms for Sales Agents.",
    body: `Independent contractor agreement commission-only no salary no retainer. Log prospects in CRM before contact. Present only approved plans and pricing. Submit every deal for fit check before signing. Signing bounty 15% small business 37500 naira 15% marketing ads 75000 naira 20% agency 180000 naira. Monthly bounty 4% per month small business 10000 naira marketing ads 20000 naira agency 36000 naira capped 12 months per client. Payment on 5th of each month. Clawback if client cancels or charges back within 60 days. Cannot promise deliverables not in playbook cannot negotiate custom pricing cannot contact another agent's logged prospect.`,
  },
  {
    id: "sales-lead-agreement",
    title: "Sales Lead Agreement",
    section: "Sales",
    href: "/sales/sales-lead-agreement",
    description: "Lead commission structure, team override, and responsibilities for the Sales Lead.",
    body: `Sales Lead independent contractor commission-only leads team of agents closes clients personally. Recruit onboard train agents run pipeline reviews settle lead ownership disputes flag underperformance. Fit check every deal before signing. Personal signing bounty same as agents 15% small business 15% marketing ads 20% agency. Personal monthly bounty same as agents 4% capped 12 months. Team override 2% of total monthly subscription revenue from every active client from entire team uncapped no 12 month limit. Cannot negotiate custom pricing cannot reassign agent leads without founder agreement cannot recruit agent without founder approval.`,
  },
]
