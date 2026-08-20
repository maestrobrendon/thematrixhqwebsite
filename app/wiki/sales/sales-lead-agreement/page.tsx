import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function SalesLeadAgreementPage() {
  return (
    <WikiShell>
      <WikiPage section="Sales" title="Sales Lead Agreement" team="Sales" lastUpdated="—">
        <div className="wiki-callout">
          <p className="wiki-callout-label">Contract · Version 1.0</p>
          <p>
            Commission-only independent contractor agreement for the Sales Lead. Payment comes from
            two sources: personal sales (same as any Agent) plus a team override on all revenue the
            sales team generates.
          </p>
        </div>

        <h2>1. What This Agreement Covers</h2>
        <ul>
          <li>The Sales Lead is engaged to build, coordinate, and lead thematrixHQ's team of Sales Agents, and to close new subscription clients personally.</li>
          <li>The Sales Lead is an <strong>independent contractor</strong>, not an employee. This Agreement does not create an employment relationship, a partnership, or a joint venture.</li>
          <li>The Sales Lead is responsible for their own taxes and any statutory contributions that apply to them.</li>
          <li>The Sales Lead decides their own working hours and methods, provided they meet the responsibilities in section 2.</li>
        </ul>

        <h2>2. What the Sales Lead Does</h2>

        <h3>2.1 Leading the team</h3>
        <ul>
          <li>Recruit, onboard, and train Sales Agents, in coordination with the founder</li>
          <li>Run the sales team's rhythm: regular check-ins, pipeline reviews, and performance conversations</li>
          <li>Make sure every Agent knows and follows the Sales Playbook</li>
          <li>Settle lead ownership disputes between Agents — the Sales Lead's decision is final, subject to review by the founder</li>
          <li>Flag underperformance or conduct issues to the founder early, rather than after they have become a pattern</li>
        </ul>

        <h3>2.2 Quality control</h3>
        <ul>
          <li>Run the fit check on every deal before it is signed, confirming the client is in scope and the Company has capacity to deliver</li>
          <li>Escalate to the founder any deal that is unusual in size, scope, or risk</li>
          <li>Watch early churn across the team and address the cause where it points to oversold or badly qualified clients</li>
        </ul>

        <h3>2.3 Selling personally</h3>
        <ul>
          <li>Find and close clients directly, on the same terms as any Agent</li>
          <li>Log every personal prospect in the CRM under the same lead ownership rules that apply to Agents</li>
        </ul>

        <h3>2.4 What the Sales Lead must not do</h3>
        <ul>
          <li>Promise any deliverable, turnaround, or discount not stated in the Sales Playbook</li>
          <li>Negotiate custom pricing, or authorise an Agent to do so</li>
          <li>Take over or reassign an Agent's logged lead without the founder's agreement</li>
          <li>Enter into any agreement on the Company's behalf — only the founder may sign a client contract</li>
          <li>Recruit an Agent onto the team without the founder's approval</li>
        </ul>

        <h2>3. Commission Bounty</h2>
        <p>The Sales Lead is paid entirely on commission. There is no salary, retainer, or guaranteed minimum.</p>

        <h3>3.1 Personal Signing Bounty</h3>
        <p>On any client the Sales Lead closes personally. One-time payment, confirmed once that client's first payment has cleared.</p>
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

        <h3>3.2 Personal Monthly Bounty</h3>
        <p>On clients the Sales Lead introduced personally, capped at 12 consecutive months per client.</p>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr><th>Plan</th><th>Rate</th><th>Per month (NGN)</th><th>Maximum total</th></tr>
          </thead>
          <tbody>
            <tr><td>Small Business</td><td>4%</td><td>₦10,000</td><td>₦120,000</td></tr>
            <tr><td>Marketing and Ads</td><td>4%</td><td>₦20,000</td><td>₦240,000</td></tr>
            <tr><td>Agency</td><td>4%</td><td>₦36,000</td><td>₦432,000</td></tr>
          </tbody>
        </table>

        <h3>3.3 Team Override</h3>
        <ul>
          <li>The Sales Lead receives <strong>2%</strong> of total monthly subscription revenue from every active client brought in by the sales team, including their own personal clients</li>
          <li>The Team Override is <strong>not capped at 12 months</strong> — it continues for as long as each client remains active and this Agreement is in force</li>
          <li>The Override is calculated on subscription revenue actually received by the Company in that month, not on invoiced or expected revenue</li>
        </ul>
        <blockquote>
          The Override is uncapped because leading the team is ongoing work, unlike closing a single deal.
          It scales directly with how well the team performs.
        </blockquote>

        <h3>3.4 Payment Terms</h3>
        <ul>
          <li>All bounties and the Team Override are paid monthly, on the 5th, covering the previous calendar month</li>
          <li>The Company provides a monthly statement showing each client, bounty type, Override calculation, and total amount paid</li>
          <li>Payment is made to the bank account nominated by the Sales Lead in writing</li>
        </ul>

        <h3>3.5 Clawback</h3>
        <ul>
          <li>If a client the Sales Lead closed personally cancels, charges back, or fails to pay within 60 days of signing, the full Signing Bounty is deducted from the next payout</li>
          <li>No clawback applies to the Team Override</li>
          <li>No clawback applies where a client cancels because the Company failed to deliver</li>
        </ul>

        <h2>4. Confidentiality</h2>
        <p>
          The Sales Lead must keep confidential all client information, Agent commission structures,
          pricing, pipeline data, and internal processes. This obligation continues after the Agreement ends.
        </p>

        <h2>5. Termination</h2>
        <ul>
          <li>Either party may end this Agreement with 14 days written notice</li>
          <li>Bounties already earned on closed, paid clients remain payable after termination</li>
          <li>The Team Override stops accruing on the date this Agreement ends</li>
          <li>The Company may terminate immediately for breach of section 2.4</li>
        </ul>

        <h2>6. Signature Block</h2>
        <table className="prose-table">
          <thead>
            <tr><th>Field</th><th>Detail</th></tr>
          </thead>
          <tbody>
            <tr><td>Sales Lead name</td><td style={{ minWidth: 240 }}></td></tr>
            <tr><td>Address</td><td></td></tr>
            <tr><td>Email</td><td></td></tr>
            <tr><td>Phone</td><td></td></tr>
            <tr><td>Start date</td><td></td></tr>
            <tr><td>Sales Lead signature</td><td></td></tr>
            <tr><td>Founder signature</td><td></td></tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}
