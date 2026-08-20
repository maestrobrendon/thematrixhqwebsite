import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function MeetingsPage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="Meetings" lastUpdated="â€”">
        <p>
          Define which meetings thematrixHQ actually runs, why each one exists, and what every meeting
          has to produce afterward, so it was not a waste of anyone's time.
        </p>

        <h2>Before You Schedule</h2>
        <p>Keep meetings to a minimum. Every one of them takes time away from the request queue. Ask first:</p>
        <ul>
          <li>Can this be a Discord message? Send the message instead.</li>
          <li>Can this be a short voice note? Do that instead.</li>
          <li>Is this already answered somewhere? Search the wiki first.</li>
          <li>Does everyone invited actually need to be there? If not, cut them.</li>
        </ul>
        <div className="wiki-callout">
          <p className="wiki-callout-label">Do not schedule</p>
          <p>
            Never schedule a meeting purely for information sharing or an announcement.
            Post it in Discord instead.
          </p>
        </div>

        <h2>Roles</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Role</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Meeting Owner</strong></td>
              <td>Schedules the meeting, sets the goal and agenda in advance, and sends a short summary after.</td>
            </tr>
            <tr>
              <td><strong>Participants</strong></td>
              <td>Show up prepared and on time. Challenge the agenda if it is unclear. Do not just sit through it.</td>
            </tr>
          </tbody>
        </table>

        <h2>Meetings We Run</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Type</th>
              <th>Meeting</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Internal</td>
              <td><strong>Weekly Check-in</strong></td>
              <td>Founder and PM (once hired) review active requests, blockers, and priorities for the week.</td>
            </tr>
            <tr>
              <td>Internal</td>
              <td><strong>Art Director Review</strong></td>
              <td>AD and designer walk through flagged work together, when feedback needs a real discussion, not just comments on a file.</td>
            </tr>
            <tr>
              <td>Internal</td>
              <td><strong>Roster Onboarding</strong></td>
              <td>New designer walkthrough of the brand system, SOPs, and how requests get queued and delivered.</td>
            </tr>
            <tr>
              <td>Client</td>
              <td><strong>Kickoff Call</strong></td>
              <td>First call with a new subscriber: how requests work, brand walkthrough, expectations set from day one.</td>
            </tr>
            <tr>
              <td>Client</td>
              <td><strong>Check-in Call</strong></td>
              <td>Periodic review of how the plan is working. Only when the client wants one, not a default add-on.</td>
            </tr>
            <tr>
              <td>Client</td>
              <td><strong>Escalation Call</strong></td>
              <td>Called when a written thread on Discord or WhatsApp is not resolving something and it needs a live conversation.</td>
            </tr>
          </tbody>
        </table>

        <h2>Meeting Settings</h2>
        <ul>
          <li>Meetings happen on Discord voice or video channels</li>
          <li>The Meeting Owner takes their own notes during the call, or assigns someone to</li>
          <li>Notes get logged to Notion right after the call, while it is still fresh</li>
          <li>Client calls that need a paper trail get a short recap sent by Zoho Mail afterward</li>
          <li>Camera on for internal reviews</li>
          <li>Cancel or reschedule if a key person is missing</li>
        </ul>

        <h2>Every Meeting Must Produce</h2>
        <ul>
          <li><strong>A defined goal</strong> - what we were trying to resolve</li>
          <li><strong>An agenda</strong> - set before the meeting, not improvised during it</li>
          <li><strong>Takeaways with an owner and a due date</strong> - for every action item that came out of it</li>
        </ul>
        <blockquote>
          If a meeting ends without someone owning something, the meeting did not work.
        </blockquote>
      </WikiPage>
    </WikiShell>
  )
}

