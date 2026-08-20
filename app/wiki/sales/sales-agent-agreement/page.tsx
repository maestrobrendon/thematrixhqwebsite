import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function SalesAgentAgreementPage() {
  return (
    <WikiShell>
      <WikiPage section="Sales" title="Sales Agent Agreement" team="Sales" lastUpdated="—">
        <div className="wiki-callout">
          <p className="wiki-callout-label">Contract · Version 1.0</p>
          <p>
            Commission-only independent contractor agreement. This is the standard agreement between
            thematrixHQ and each Sales Agent. The founder countersigns on behalf of the Company.
          </p>
        </div>

        <h2>1. What This Agreement Covers</h2>
        <ul>
          <li>The Agent is engaged to find and close new subscription clients for thematrixHQ.</li>
          <li>The Agent is an <strong>independent contractor</strong>, not an employee. This Agreement does not create an employment relationship, a partnership, or a joint venture.</li>
          <li>The Agent is responsible for their own taxes and any statutory contributions that apply to them.</li>
          <li>The Agent decides their own working hours and methods, provided they follow the standards in the Sales Playbook.</li>
        </ul>

        <h2>2. What the Agent Does</h2>
        <ul>
          <li>Find, contact, and qualify prospective clients for thematrixHQ's subscription plans</li>
          <li>Log every prospect in the CRM before making contact</li>
          <li>Present only the plans, pricing, and services set out in the Sales Playbook and Services doc</li>
          <li>Submit every deal to the Sales Lead or founder for a fit check before anything is signed</li>
          <li>Hand a closed client over to a Project Manager for onboarding</li>
          <li>Represent thematrixHQ in line with the Company's Core Values and Working Principles</li>
        </ul>
        <h3>What the Agent must not do</h3>
        <ul>
          <li>Promise any deliverable, turnaround, or discount not stated in the Sales Playbook</li>
          <li>Negotiate custom pricing — the published plans are the only pricing</li>
          <li>Contact a prospect logged by another Agent within that Agent's ownership window</li>
          <li>Enter into any agreement on the Company's behalf — only the founder may sign a client contract</li>
        </ul>

        <h2>3. Commission Bounty</h2>
        <p>The Agent is paid entirely on commission. There is no salary, retainer, or guaranteed minimum.</p>

        <h3>3.1 Signing Bounty</h3>
        <p>One-time payment per new client, confirmed once that client's first subscription payment has cleared.</p>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr><th>Plan</th><th>Rate</th><th>Bounty (NGN)</th><th>Basis</th></tr>
          </thead>
          <tbody>
            <tr><td>Small Business</td><td>15%</td><td>₦37,500</td><td>First month's fee</td></tr>
            <tr><td>Marketing and Ads</td><td>15%</td><td>₦75,000</td><td>First month's fee</td></tr>
            <tr><td>Agency</td><td>20%</td><td>₦180,000</td><td>First month's fee</td></tr>
          </tbody>
        </table>
        <p>For clients billed in a currency other than Naira, the same percentage rates apply to the equivalent amount in that currency.</p>

        <h3>3.2 Monthly Bounty</h3>
        <p>Recurring payment for each active client the Agent introduced, capped at 12 consecutive months per client.</p>
        <table className="prose-table" style={{ marginBottom: 16 }}>
          <thead>
            <tr><th>Plan</th><th>Rate</th><th>Per month (NGN)</th><th>Maximum total</th></tr>
          </thead>
          <tbody>
            <tr><td>Small Business</td><td>4%</td><td>₦10,000</td><td>₦120,000</td></tr>
            <tr><td>Marketing and Ads</td><td>4%</td><td>₦20,000</td><td>₦240,000</td></tr>
            <tr><td>Agency</td><td>4%</td><td>₦36,000</td><td>₦432,000</td></tr>
          </tbody>
        </table>
        <ul>
          <li>The Monthly Bounty stops in the month a client cancels, pauses, or stops paying</li>
          <li>If a paused client resumes within 90 days, the bounty resumes for the remainder of the original 12-month window — it does not restart</li>
        </ul>

        <h3>3.3 Payment Terms</h3>
        <ul>
          <li>Bounties are paid monthly, on the 5th, covering the previous calendar month</li>
          <li>A deal is confirmed, and the Signing Bounty becomes payable, only once the client's first payment has cleared into the Company's account</li>
          <li>The Company provides a monthly statement showing each client, bounty type, and amount paid</li>
          <li>Payment is made to the bank account nominated by the Agent in writing</li>
        </ul>

        <h3>3.4 Clawback</h3>
        <ul>
          <li>If a client cancels, charges back, or fails to pay within 60 days of signing, the full Signing Bounty for that client is deducted from the Agent's next payout</li>
          <li>If the next payout does not cover the amount owed, the balance carries forward against future payouts</li>
          <li>No clawback applies where a client cancels because the Company failed to deliver, or where the Company terminates the client relationship</li>
        </ul>

        <h2>4. Confidentiality</h2>
        <p>
          The Agent must keep confidential all client information, pricing, internal processes, and
          commission structures. This obligation continues after the Agreement ends.
        </p>

        <h2>5. Termination</h2>
        <ul>
          <li>Either party may end this Agreement with 7 days written notice</li>
          <li>Bounties already earned on closed, paid clients remain payable after termination</li>
          <li>No bounty is owed on any deal not yet closed at the time of termination</li>
          <li>The Company may terminate immediately for breach of section 2</li>
        </ul>

        <h2>6. Signature Block</h2>
        <table className="prose-table">
          <thead>
            <tr><th>Field</th><th>Detail</th></tr>
          </thead>
          <tbody>
            <tr><td>Agent name</td><td style={{ minWidth: 240 }}></td></tr>
            <tr><td>Address</td><td></td></tr>
            <tr><td>Email</td><td></td></tr>
            <tr><td>Phone</td><td></td></tr>
            <tr><td>Start date</td><td></td></tr>
            <tr><td>Agent signature</td><td></td></tr>
            <tr><td>Founder signature</td><td></td></tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}
