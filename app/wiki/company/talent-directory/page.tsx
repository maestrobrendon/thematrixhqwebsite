import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function TalentDirectoryPage() {
  return (
    <WikiShell>
      <WikiPage
        section="Company"
        title="Talent Directory"
        lastUpdated="â€”"
        pendingNote="The org chart referenced in section 2.3 is still being built in Figma. Team numbers and phase status may be out of date. Check with the founder for the current roster count before sharing externally."
      >
        <h2>Purpose</h2>
        <p>
          The thematrixHQ Talent Directory shows how our people are organised, how decisions get made,
          and how the team grows as demand grows. Our structure runs on one rule: every hire is triggered
          by a bottleneck, not a headcount target. We do not build a team ahead of what the business
          actually needs.
        </p>

        <h2>How Our Structure Works</h2>

        <h3>Organisational Principles</h3>
        <ul>
          <li>
            <strong>Bottleneck-Based Growth.</strong> We do not hire against a plan, we hire against a
            problem. Every role on this page exists because something specific was breaking without it:
            intake piling up, review taking too long, leads going uncontacted. No named bottleneck, no hire.
          </li>
          <li>
            <strong>Core + Freelance Talent Model.</strong> The thematrixHQ team is two connected groups.
            The core team (the founder and any future full-time hires) runs day-to-day operations and
            carries long-term continuity. The freelance pool (vetted designers on a retainer-style
            arrangement, paid per task) delivers the design work itself.
          </li>
          <li>
            <strong>Human Review, Always.</strong> No matter how the team grows, every deliverable passes
            through a human Art Director before it reaches a client. That layer does not get automated
            away as we scale, it gets staffed.
          </li>
          <li>
            <strong>Built to Change.</strong> This page is a snapshot of where we are, not a fixed shape.
            As the business grows, roles split, reporting lines shift, and new functions get added.
          </li>
        </ul>

        <h3>Reading the Structure</h3>
        <p>
          <strong>Reporting Lines</strong> show who a person answers to day to day.
          <br />
          <strong>Review Lines</strong> show who checks the quality of someone's work, which is not always
          the same person they report to.
          <br />
          <strong>Phase Markers</strong> show which phase of growth unlocked each role, so it is clear why
          a position exists.
        </p>

        <div className="wiki-callout">
          <p className="wiki-callout-label">Org Chart</p>
          <p>
            The visual chart is being built in Figma and will sit here once it is ready. Until then,
            this document is the source of truth for how the team is structured.
          </p>
        </div>

        <h2>Decision-Making Authority</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Role</th>
              <th>Decides</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Designers</strong></td>
              <td>Day-to-day execution of assigned requests, flagging issues on their own work, suggesting improvements to their Art Director</td>
            </tr>
            <tr>
              <td><strong>Project Manager</strong></td>
              <td>Intake and timeline decisions, revision tracking, day-to-day client communication</td>
            </tr>
            <tr>
              <td><strong>Art Director</strong></td>
              <td>Final call on whether a deliverable is ready to ship. Sets the quality standard for the whole team</td>
            </tr>
            <tr>
              <td><strong>Founder</strong></td>
              <td>Company direction, pricing, major hires, and anything that sets a precedent the whole team follows</td>
            </tr>
          </tbody>
        </table>

        <h2>Growth Phases</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Phase</th>
              <th>Stage</th>
              <th>What changes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Phase 0</strong></td>
              <td>Pre-launch</td>
              <td>Founder plus freelance pool. No dedicated ops hires yet.</td>
            </tr>
            <tr>
              <td><strong>Phase 1</strong></td>
              <td>Beta clients</td>
              <td>First hire: Project Manager / Operations. Triggered when intake piles up.</td>
            </tr>
            <tr>
              <td><strong>Phase 2</strong></td>
              <td>Public launch</td>
              <td>Sales Rep once case studies exist. Art Director becomes dedicated hire.</td>
            </tr>
          </tbody>
        </table>

        <h2>Keeping This Page Current</h2>
        <p>
          The founder reviews this page whenever a new role is filled or a phase changes. If something
          here does not match the current reality, flag it in Discord and the founder will update within
          48 hours.
        </p>
      </WikiPage>
    </WikiShell>
  )
}

