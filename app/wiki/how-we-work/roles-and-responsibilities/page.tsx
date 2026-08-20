import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function RolesPage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="Roles and Responsibilities" lastUpdated="â€”">
        <p>
          Zero confusion about ownership when something needs to get done. Every task, decision, and
          outcome belongs to someone specific.
        </p>

        <h2>Organisational Principles</h2>
        <ul>
          <li>
            <strong>Open Communication, Not Open Hierarchy.</strong> You can raise something with anyone
            on the team. The roles below decide what gets approved, they do not gatekeep who you are
            allowed to talk to.
          </li>
          <li>
            <strong>Growth-Focused.</strong> Roles here expand as the business does, each one triggered
            by a real bottleneck, not a headcount target. For how the team grows over time, see the{" "}
            <a href="/company/talent-directory" style={{ color: "var(--root)", textDecoration: "underline" }}>
              Talent Directory
            </a>
            . This page covers who owns what, right now.
          </li>
        </ul>

        <h2>Ownership Rules</h2>
        <ul>
          <li>If you create it, you own it.</li>
          <li>If you lead people, you own their success.</li>
          <li>If you own a system, you own the results.</li>
          <li>If you hand something off, you own the clarity of that handoff.</li>
        </ul>

        <h2>Roles and Responsibilities</h2>
        <p>Roles marked Phase 1 or Phase 2 are on the hiring roadmap and get filled as real bottlenecks show up, not before.</p>

        <h3>Founder</h3>
        <p>Active. Currently also acting as Art Director, Sales, and Operations.</p>
        <ul>
          <li>Sets the creative vision and the quality bar for every deliverable</li>
          <li>Owns pricing, positioning, partnerships, and product direction</li>
          <li>Final approval on any client-facing work, until a dedicated Art Director is hired</li>
          <li>Leads client relationships at the senior level</li>
          <li>Manages the roster: vetting, quality, performance</li>
          <li>Owns company culture, brand voice, and operating principles</li>
        </ul>

        <h3>Art Director</h3>
        <p>Currently held by the founder. Becomes a dedicated hire in Phase 2.</p>
        <ul>
          <li>Final call on whether a deliverable is ready to ship</li>
          <li>Reviews every piece of work before it reaches a client, no exceptions</li>
          <li>Sets the quality standard the whole roster works to</li>
        </ul>

        <h3>Project Manager</h3>
        <p>Phase 1, first hire.</p>
        <ul>
          <li>Single point of contact between clients and the roster</li>
          <li>Receives requests and routes them to the right designer</li>
          <li>Manages the request queue: priorities, timelines, revisions</li>
          <li>Sends progress updates during active request cycles</li>
          <li>Flags blockers and scope questions to the Art Director immediately</li>
          <li>Owns the client experience from onboarding to delivery</li>
        </ul>

        <h3>Designers (the roster)</h3>
        <p>Active. Freelance, retainer-style.</p>
        <ul>
          <li>Deliver assigned requests to the brief and to thematrixHQ's brand system</li>
          <li>Flag scope or timeline issues early, not after the deadline</li>
          <li>Submit work to the Art Director for review before any client sees it</li>
          <li>Follow all file storage and naming conventions</li>
        </ul>

        <h3>Sales Rep</h3>
        <p>Phase 2, once case studies exist.</p>
        <ul>
          <li>Qualifies and closes new subscriptions</li>
          <li>Owns the pipeline from first contact to signed plan</li>
          <li>Hands off new clients to the PM with a full brief</li>
        </ul>

        <h2>Escalation Path</h2>
        <table className="prose-table">
          <thead>
            <tr>
              <th>Type of issue</th>
              <th>Escalate to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Individual task issues, timeline questions, brief clarifications</td>
              <td>Project Manager (or founder until PM is hired)</td>
            </tr>
            <tr>
              <td>Quality issues, work that is not ready to ship</td>
              <td>Art Director</td>
            </tr>
            <tr>
              <td>Team-level patterns, repeated issues, performance concerns</td>
              <td>Art Director</td>
            </tr>
            <tr>
              <td>Company-level decisions, pricing, major hires</td>
              <td>Founder</td>
            </tr>
          </tbody>
        </table>

        <div className="wiki-callout" style={{ marginTop: 24 }}>
          <p className="wiki-callout-label">When escalating</p>
          <p>
            Include: what the issue is, what you have already tried, what you need from the person you
            are escalating to. Do not escalate blind. Come with context.
          </p>
        </div>
      </WikiPage>
    </WikiShell>
  )
}

