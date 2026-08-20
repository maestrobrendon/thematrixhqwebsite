import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function WhatIsPage() {
  return (
    <WikiShell>
      <WikiPage section="Company" title="What is thematrixHQ?" lastUpdated="â€”">
        <p>
          thematrixHQ is a creative subscription service for founders, business owners, and teams.
          We handle the design work most businesses either cannot afford to hire for, or cannot afford
          to get wrong. One flat monthly fee. Unlimited requests. Unlimited revisions. Every piece of
          work moves fast because it is AI-assisted, and every piece is checked by a human Art Director
          before it reaches you.
        </p>
        <p>
          The name comes from a simple idea: step out of a broken system and into something built better.
          Traditional agencies are slow and expensive. Freelancers disappear or miss deadlines.
          thematrixHQ is the alternative to both.
        </p>

        <h2>Who We Help</h2>
        <p>
          thematrixHQ is built for founders, business owners, and teams who need design work done
          consistently, without the cost or the hassle of building an in-house team. They usually need to:
        </p>
        <ul>
          <li>Get design work done without hiring</li>
          <li>Stop relying on freelancers who miss deadlines or disappear</li>
          <li>Keep quality consistent across every request</li>
          <li>Move fast without the work looking rushed</li>
        </ul>

        <h2>What We Do</h2>
        <p>
          We provide a fully managed design service. Every plan includes a dedicated designer, unlimited
          revisions, and human review on everything before delivery. This includes:
        </p>
        <ul>
          <li>Brand identity and guidelines</li>
          <li>Social media and marketing graphics</li>
          <li>Presentations and pitch decks</li>
          <li>Print and marketing collateral</li>
          <li>Ad creative and landing pages</li>
          <li>Web design and development</li>
          <li>Motion graphics and short animations</li>
        </ul>

        <h2>How It Works</h2>
        <ol>
          <li><strong>Subscribe.</strong> Pick a plan. No contracts, no long approval process.</li>
          <li><strong>We learn your brand.</strong> Share your guidelines, or let us build them with you from scratch.</li>
          <li><strong>You submit requests.</strong> Send in as many as your plan allows, one at a time or as a running queue.</li>
          <li><strong>We produce, fast.</strong> AI speeds up production. A human Art Director checks every piece before it reaches you.</li>
          <li><strong>Unlimited revisions.</strong> Until it is right. No extra charge, no revision limits.</li>
          <li><strong>Scale or pause anytime.</strong> No lock-in. Your plan grows or slows with your business.</li>
        </ol>
      </WikiPage>
    </WikiShell>
  )
}

