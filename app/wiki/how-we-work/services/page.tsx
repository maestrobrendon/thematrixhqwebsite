import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function ServicesPage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="Services" lastUpdated="â€”">
        <p>
          One accurate list of what thematrixHQ delivers, so nobody, on the team or in front of a client,
          promises something that is not actually in scope.
        </p>

        <h2>Core Service Description</h2>
        <p>
          A flat monthly subscription covering design and development requests, managed end to end. Every
          request moves through AI-accelerated production, then a human Art Director, before it reaches you.
          Deliver as much value as the plan allows, every working day, without ever cutting the review step.
        </p>

        <h2>Service Catalogue</h2>
        <p>Five service areas. Everything thematrixHQ produces falls under one of these.</p>

        <h3>01 Graphic and Brand Design</h3>
        <p>Logos to campaigns, everything that makes a brand visible.</p>
        <ul>
          <li>Logo design and brand identity systems</li>
          <li>Social media graphics, static and animated</li>
          <li>Marketing collateral: flyers, banners, posters</li>
          <li>Ad creative for digital and print campaigns</li>
          <li>Packaging design and merchandise graphics</li>
          <li>Brand guidelines and asset libraries</li>
        </ul>

        <h3>02 UI/UX Design</h3>
        <p>Interfaces that look considered and hold up under real use.</p>
        <ul>
          <li>Web and app interfaces</li>
          <li>Wireframes and interactive prototypes</li>
          <li>Figma design systems and component libraries</li>
          <li>User flow diagrams</li>
          <li>Landing page design</li>
        </ul>

        <h3>03 Web and App Development</h3>
        <p>From a landing page to a working prototype, built and shipped, not just designed.</p>
        <ul>
          <li>Marketing websites, built on Next.js, Framer, or Webflow</li>
          <li>Landing pages and campaign microsites</li>
          <li>Early-stage app and software prototypes, from idea to a clickable build</li>
          <li>CMS updates, bug fixes, ongoing maintenance</li>
        </ul>
        <p>
          A web or app build runs differently from a standard design request. See the section below.
        </p>

        <h3>04 Motion and Presentations</h3>
        <p>Moving visuals and slides that hold attention.</p>
        <ul>
          <li>Motion graphics and animated brand intros</li>
          <li>Social media reels and animated ad creative</li>
          <li>Pitch decks and investor presentations</li>
          <li>PPTX, Keynote, and Google Slides design</li>
          <li>Video thumbnails and channel art</li>
        </ul>

        <h3>05 AI-Augmented Creative</h3>
        <p>AI speed, human direction. Where the model earns its name.</p>
        <ul>
          <li>AI product photography and compositing</li>
          <li>AI-generated brand imagery, always reviewed and refined before delivery</li>
          <li>AI-assisted UI exploration, directed by a human designer</li>
          <li>Brand-specific AI prompt kits, as a client deliverable on request</li>
        </ul>

        <h2>How a Web and App Development Request Runs</h2>
        <p>
          A design request moves fast because the scope is contained: one graphic, one deck, one page.
          A web or app build is bigger, so it runs its own version of the same pipeline.
        </p>
        <ol>
          <li><strong>Scope the build.</strong> The Art Director and the client agree on what is being built and what "done" looks like before any work starts.</li>
          <li><strong>AI-accelerated scaffold.</strong> The base structure, layout, and core screens get built fast using AI tools under human direction.</li>
          <li><strong>Human development pass.</strong> A developer on the roster reviews and completes the build, ensuring it is production-ready.</li>
          <li><strong>Art Director review.</strong> Every build passes through the Art Director before the client sees it.</li>
          <li><strong>Client review.</strong> The client reviews and requests revisions. Revisions are unlimited within the agreed scope.</li>
          <li><strong>Handoff or deployment.</strong> Files are handed off clean, or deployed directly if that is part of the scope.</li>
        </ol>
      </WikiPage>
    </WikiShell>
  )
}

