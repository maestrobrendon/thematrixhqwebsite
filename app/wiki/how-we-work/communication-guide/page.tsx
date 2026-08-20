import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function CommunicationGuidePage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="Communication Guide" lastUpdated="â€”">
        <p>
          thematrixHQ runs on a freelance roster spread across different locations and schedules.
          Communication is what makes that feel like one studio instead of ten different people doing
          their own thing. This page sets the standard everyone works to.
        </p>

        <h2>Roles</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Role</th>
              <th>Communication responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Founder</strong></td>
              <td>Sets the communication standard and holds the team to it. Final voice on anything a client sees until a dedicated PM or Art Director owns that lane.</td>
            </tr>
            <tr>
              <td><strong>Project Manager</strong></td>
              <td>Owns every client conversation. The single point of contact between the client and the roster.</td>
            </tr>
            <tr>
              <td><strong>Art Director</strong></td>
              <td>Reviews work and gives feedback that is specific enough to act on, not just "this needs work."</td>
            </tr>
            <tr>
              <td><strong>Designers</strong></td>
              <td>Flag questions, blockers, and delays to the PM the moment they come up. Never go quiet.</td>
            </tr>
          </tbody>
        </table>

        <h2>General Communication Standards</h2>
        <p>These apply to everyone at thematrixHQ, on every channel, every day.</p>

        <h3>Get to the Point</h3>
        <p>
          Respect people's time. State the main point first, then give context if it is needed.
          "Just to give some background..." is the wrong opener. "The deadline slips by one day, missing
          assets" is the right one. Clarity first, context second.
        </p>

        <h3>Communicate Completely</h3>
        <p>Do not send a message in fragments and make someone piece it together. A complete update includes:</p>
        <ul>
          <li><strong>Status</strong> - where the work actually stands</li>
          <li><strong>Relevant context</strong> - only what is needed to understand it</li>
          <li><strong>Blocker</strong> - if there is one</li>
          <li><strong>Next step</strong> - and who owns it</li>
        </ul>
        <blockquote>
          "Homepage draft is done. Waiting on copy for section 3. If it is not in by tomorrow noon,
          the deadline shifts by one day." Complete. Actionable. Nobody has to chase a follow-up.
        </blockquote>

        <h3>Response Time Standard</h3>
        <p>
          During working hours, on Discord, respond within one hour. If a full answer takes longer,
          acknowledge it and give a clear time for the real response: "Got it, reviewing now, update by
          3pm." Silence with no context is not acceptable. Responsiveness is how trust gets built here.
        </p>

        <h3>Close Loops</h3>
        <p>
          Never leave a thread open. If something is done, say so. If it is blocked, explain why. If it
          is delayed, give a new timeline. A thread that goes cold is a problem waiting to surface.
        </p>

        <h3>Be Proactive, Not Chased</h3>
        <p>
          Do not wait to be asked for an update. If something changes, flag it before anyone has to chase
          it. Being responsive to things happening is table stakes. Flagging things before they happen is
          the standard here.
        </p>

        <h3>Escalate Early</h3>
        <p>
          If something blocks progress, raise it within hours, not days. Early escalation is a sign of
          professionalism. Late escalation is a problem. The goal is never to surprise anyone with bad news.
        </p>

        <h3>Be Direct, Not Personal</h3>
        <p>
          Say what needs saying. Do not dress it up or soften it until the message disappears. You can
          be direct and respectful at the same time. See the{" "}
          <a href="/how-we-work/working-principles" style={{ color: "var(--root)", textDecoration: "underline" }}>
            Working Principles
          </a>{" "}
          for more on this.
        </p>

        <h2>Client Communication</h2>
        <p>
          The PM owns every client conversation. Designers do not contact clients directly unless the PM
          routes something to them. Everything the client sees reads like it came from one studio.
        </p>
        <ul>
          <li>Professional, clear, and not corporate. Write like a human.</li>
          <li>Give real answers, not vague reassurance</li>
          <li>Never tell a client something is fine if it is not</li>
          <li>If a deadline is at risk, the client hears it from us before they have to ask</li>
        </ul>

        <h2>Designer to PM Communication</h2>
        <ul>
          <li>Flag questions, blockers, and delays the moment they come up. Never go quiet.</li>
          <li>If you cannot hit a deadline, say so immediately with a revised estimate</li>
          <li>If a brief is unclear, ask before starting, not after delivering the wrong thing</li>
          <li>If something in the file is wrong or missing, it is your job to flag it</li>
        </ul>
      </WikiPage>
    </WikiShell>
  )
}

