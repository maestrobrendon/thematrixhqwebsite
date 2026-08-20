import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function WorkingPrinciplesPage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="Working Principles" lastUpdated="â€”">
        <p>
          thematrixHQ runs lean, so how we work together matters more than it would on a bigger team.
          These principles exist so nobody has to guess what is expected. They translate the{" "}
          <a href="/company/core-values" style={{ color: "var(--root)", textDecoration: "underline" }}>
            Core Values
          </a>{" "}
          into specific daily expectations.
        </p>
        <p>Five principles. Together, these are the operating standard for everyone at thematrixHQ.</p>

        <h2>1. Do Not Go Silent</h2>
        <p>Problems get bigger in silence. Flag it before it becomes an emergency.</p>
        <h3>What this means</h3>
        <ul>
          <li>Say something the moment you see a problem forming</li>
          <li>Ask clarifying questions before starting work, not halfway through it</li>
          <li>If you are going to be late, say so before the deadline, not after</li>
        </ul>
        <h3>In practice</h3>
        <ul>
          <li>Give a heads-up before a task is at risk, not after you have missed it</li>
          <li>If you do not understand a brief, ask. Do not guess and deliver the wrong thing.</li>
        </ul>
        <blockquote>
          The biggest problems we have seen were never the mistake itself. They were the silence around it.
        </blockquote>

        <h2>2. Own What You Ship</h2>
        <p>No excuses. Fix it, learn from it. Do not blame the brief, the tools, or someone else.</p>
        <h3>What this means</h3>
        <ul>
          <li>Acknowledge what went wrong, plainly</li>
          <li>Follow through on what you said you would do</li>
          <li>Do not repeat the same mistake twice</li>
        </ul>
        <h3>In practice</h3>
        <ul>
          <li>If the Art Director flags an issue, fix it. Do not argue that it is fine.</li>
          <li>If you miss a deadline, own it to the PM rather than waiting to be asked</li>
        </ul>
        <blockquote>Extreme ownership beats a good excuse, every time.</blockquote>

        <h2>3. Do Not Leave a Mess</h2>
        <p>Set up the next person to win, not to clean up after you.</p>
        <h3>What this means</h3>
        <ul>
          <li>Every handoff should be ready to go, not half-finished</li>
          <li>Files are named and organised the way the{" "}
            <a href="/how-we-work/file-storage-and-naming" style={{ color: "var(--root)", textDecoration: "underline" }}>
              File Storage and Naming
            </a>{" "}
            doc describes</li>
          <li>Access and credentials are shared before you go quiet, not after someone has to ask</li>
        </ul>
        <blockquote>Make it better than you found it.</blockquote>

        <h2>4. Take Feedback, Do Not Take It Personally</h2>
        <p>Nobody is perfect. Everyone gets notes. That is the job.</p>
        <h3>What this means</h3>
        <ul>
          <li>When the Art Director flags something, that is the quality control working, not a personal jab</li>
          <li>Ask questions if you do not understand feedback</li>
          <li>Do not go defensive. Do not go quiet.</li>
        </ul>
        <h3>In practice</h3>
        <ul>
          <li>Treat every revision as information, not criticism</li>
          <li>"Can you tell me more about what is not working here?" is always the right response to unclear feedback</li>
        </ul>
        <blockquote>Feedback on the work is not feedback on the person.</blockquote>

        <h2>5. Be Direct, Be Kind</h2>
        <p>Say what needs saying without making it personal.</p>
        <h3>What this means</h3>
        <ul>
          <li>You can disagree without being disagreeable</li>
          <li>Say what you see. Do not talk around it.</li>
          <li>You can be honest and respectful at the same time</li>
        </ul>
        <h3>In practice</h3>
        <ul>
          <li>"This section is not landing for me because..." beats "I am not sure this is right"</li>
          <li>Kindness does not mean softening the message until it disappears</li>
        </ul>
        <blockquote>Direct is not the same as harsh. Say it clearly and move on.</blockquote>

        <hr />
        <h2>Roles</h2>
        <table className="prose-table">
          <thead>
            <tr>
              <th>Role</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Founder</strong></td>
              <td>Models these principles first. Holds everyone, including themselves, accountable to them.</td>
            </tr>
            <tr>
              <td><strong>Project Manager</strong></td>
              <td>Reinforces these principles in every client interaction. Flags patterns early, not after they have become a habit.</td>
            </tr>
            <tr>
              <td><strong>Roster</strong></td>
              <td>Follows these principles on every request. No exceptions for a tight deadline.</td>
            </tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}

