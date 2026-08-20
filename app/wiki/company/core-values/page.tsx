import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function CoreValuesPage() {
  return (
    <WikiShell>
      <WikiPage section="Company" title="Core Values" lastUpdated="â€”">
        <p>
          These are our fundamental beliefs. They guide how the team behaves, decides, and acts, every
          day, with clients and with each other.
        </p>

        <h2>1. Speed With a Backbone</h2>
        <p>
          Fast is easy. Fast and right is the job. AI gets every request moving the moment it comes in.
          But speed without judgement just gets you to the wrong answer faster. Every piece of work passes
          through a person before a client sees it. That review is not a delay, it is the point.
        </p>
        <h3>What it looks like</h3>
        <ul>
          <li>We use AI to cut out the slow parts of production, not the thinking</li>
          <li>Every deliverable gets a human review before it ships</li>
          <li>We would rather take an extra hour than send out something wrong</li>
          <li>Nobody signs off on work they have not actually looked at</li>
        </ul>
        <blockquote>The system moves fast so a person has time to get it right.</blockquote>

        <h2>2. Every Client Gets the Same Room</h2>
        <p>
          The size of the account does not change the size of the effort. A founder on our smallest plan
          gets the same care as our biggest client. We do not have a tier for how much attention someone gets.
        </p>
        <h3>What it looks like</h3>
        <ul>
          <li>Every request gets the same standard, whatever plan it is on</li>
          <li>We do not quietly deprioritise a smaller account</li>
          <li>Feedback gets acted on the same way, no matter who sent it</li>
          <li>No one on the team is treated as "just handling the small clients"</li>
        </ul>
        <blockquote>Every client is our most important client, for as long as we are working on their request.</blockquote>

        <h2>3. Own the Work, Not Just Your Part</h2>
        <p>
          If it is on your desk, it is your responsibility. We do not wait for someone else to catch what
          we missed. If something is off, you flag it, fix it, or find who can, before it becomes the
          client's problem.
        </p>
        <h3>What it looks like</h3>
        <ul>
          <li>We ask "what can I do about this" instead of asking whose fault it is</li>
          <li>We flag risk early instead of hoping it works itself out</li>
          <li>We follow through on what we say we will do</li>
          <li>We take responsibility for outcomes, not just for finishing a task</li>
        </ul>
        <blockquote>Ownership means the buck stops with you, even on the parts nobody is watching.</blockquote>

        <h2>4. Say It Straight</h2>
        <p>
          If it needs three sentences to explain, it is not clear yet. We do not dress up simple ideas in
          complicated language, with clients or with each other. Clear beats clever, every time.
        </p>
        <h3>What it looks like</h3>
        <ul>
          <li>We write in plain language, not agency-speak</li>
          <li>We explain any brand-specific term the first time we use it</li>
          <li>We give clients real answers, not vague reassurance</li>
          <li>We would rather say "we do not know yet" than fake certainty</li>
        </ul>
        <blockquote>Clarity is a form of respect.</blockquote>

        <hr />
        <p>
          These values guide who we are and how we think. The{" "}
          <a href="/how-we-work/working-principles" style={{ color: "var(--root)", textDecoration: "underline" }}>
            Working Principles
          </a>{" "}
          page turns them into specific daily expectations: how we communicate, collaborate, and hold each
          other accountable. Values are the why. Working Principles are the how.
        </p>
      </WikiPage>
    </WikiShell>
  )
}

