import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function ToolsAndAccessPage() {
  return (
    <WikiShell>
      <WikiPage section="Company" title="Tools and Access" lastUpdated="â€”">
        <p>
          One place to see every tool thematrixHQ runs on, who uses it, and how to get access. Nobody
          should have to ask around to find a login or a link.
        </p>
        <div className="wiki-callout">
          <p className="wiki-callout-label">Ground rule</p>
          <p>
            We are a lean team right now, so every tool on this list has to earn its place on a free plan.
            We upgrade a tool the same way we hire a person: when its free tier is the actual bottleneck,
            not before.
          </p>
        </div>

        <h2>Everyone</h2>
        <table className="prose-table" style={{ marginBottom: 32 }}>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Used by</th>
              <th>Cost</th>
              <th>Access via</th>
              <th>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Notion</strong></td>
              <td>Everyone</td>
              <td>Free</td>
              <td>Invite sent to company email</td>
              <td>The wiki. Company docs, SOPs, brand guidelines, all of it.</td>
            </tr>
            <tr>
              <td><strong>Discord</strong></td>
              <td>Everyone</td>
              <td>Free</td>
              <td>Invite link on onboarding</td>
              <td>Team communication. Not Slack, we use Discord.</td>
            </tr>
            <tr>
              <td><strong>Google Drive</strong></td>
              <td>Everyone</td>
              <td>Free (15 GB)</td>
              <td>Shared folder invite</td>
              <td>File storage for anything too large or too raw for Notion.</td>
            </tr>
          </tbody>
        </table>

        <h2>Design</h2>
        <table className="prose-table" style={{ marginBottom: 32 }}>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Used by</th>
              <th>Cost</th>
              <th>Access via</th>
              <th>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Figma</strong></td>
              <td>Design</td>
              <td>Free (Starter, capped at 3 editable files)</td>
              <td>Shared project invite</td>
              <td>Brand system, org chart, and any UI or layout work.</td>
            </tr>
            <tr>
              <td><strong>Canva</strong></td>
              <td>Design, freelance pool</td>
              <td>Free</td>
              <td>Shared brand template link</td>
              <td>Fast social graphics for designers without full design software.</td>
            </tr>
            <tr>
              <td><strong>Google Fonts</strong></td>
              <td>Design, Development</td>
              <td>Free</td>
              <td>fonts.google.com</td>
              <td>Archivo, Instrument Sans, JetBrains Mono.</td>
            </tr>
          </tbody>
        </table>

        <h2>Development</h2>
        <table className="prose-table" style={{ marginBottom: 32 }}>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Used by</th>
              <th>Cost</th>
              <th>Access via</th>
              <th>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>GitHub</strong></td>
              <td>Development</td>
              <td>Free</td>
              <td>Org invite</td>
              <td>Code hosting and version control for the website.</td>
            </tr>
            <tr>
              <td><strong>Vercel</strong></td>
              <td>Development</td>
              <td>Free (Hobby)</td>
              <td>Org invite</td>
              <td>Website hosting.</td>
            </tr>
          </tbody>
        </table>

        <h2>Billing</h2>
        <table className="prose-table" style={{ marginBottom: 32 }}>
          <thead>
            <tr>
              <th>Tool</th>
              <th>Used by</th>
              <th>Notes</th>
              <th>Access via</th>
              <th>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Paystack</strong></td>
              <td>Billing</td>
              <td>No monthly fee; % per transaction</td>
              <td>Founder account</td>
              <td>NGN subscription billing.</td>
            </tr>
            <tr>
              <td><strong>Flutterwave</strong></td>
              <td>Billing</td>
              <td>No monthly fee; % per transaction</td>
              <td>Founder account</td>
              <td>NGN subscription billing, alternate rail.</td>
            </tr>
            <tr>
              <td><strong>Stripe</strong></td>
              <td>Billing</td>
              <td>No monthly fee; % per transaction</td>
              <td>Founder account</td>
              <td>USD and international subscription billing.</td>
            </tr>
          </tbody>
        </table>

        <h2>Client Communication</h2>
        <table className="prose-table">
          <thead>
            <tr>
              <th>Tool</th>
              <th>Used by</th>
              <th>Cost</th>
              <th>Access via</th>
              <th>What it is for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Zoho Mail</strong></td>
              <td>Client-facing</td>
              <td>Free (up to 5 users)</td>
              <td>Custom domain inbox</td>
              <td>Default client channel. hello@thematrixhq.com, not a personal Gmail address.</td>
            </tr>
            <tr>
              <td><strong>WhatsApp Business</strong></td>
              <td>Client-facing</td>
              <td>Free</td>
              <td>Founder / PM number</td>
              <td>Offered on top of email for clients who prefer it. Optional, not the default.</td>
            </tr>
          </tbody>
        </table>

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
              <td>Approves any new tool before it is adopted. Owns every account until there is a dedicated Ops hire.</td>
            </tr>
            <tr>
              <td><strong>Designers</strong></td>
              <td>Use only the tools listed here for thematrixHQ work. Flag it if something is not working instead of introducing a personal workaround.</td>
            </tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}

