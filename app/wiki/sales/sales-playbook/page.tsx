import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function SalesPlaybookPage() {
  return (
    <WikiShell>
      <WikiPage section="Sales" title="Sales Playbook" team="Sales" lastUpdated="—">
        <p>
          One document that tells a Sales Agent everything they need to sell thematrixHQ well:
          what we sell, who we sell to, how the process runs, and exactly how they get paid.
        </p>

        <h2>What We Sell</h2>
        <p>
          thematrixHQ is a creative subscription service for founders, business owners, and teams.
          One flat monthly fee. Unlimited design requests, unlimited revisions, and a human Art Director
          checking every piece of work before it reaches the client. Lagos-based, working with clients
          anywhere in the world.
        </p>

        <div className="wiki-callout">
          <p className="wiki-callout-label">The one-minute pitch</p>
          <p>
            Most businesses have two bad options for design. Hire someone full-time, which is expensive
            and slow to get right. Or use freelancers, who disappear or miss deadlines. thematrixHQ is
            a third option: a full design team on a flat monthly subscription. Send as many requests as
            your plan allows, get unlimited revisions, and a senior Art Director signs off on everything
            before you see it. No contracts, cancel anytime.
          </p>
        </div>

        <h3>The Three Plans</h3>
        <table className="prose-table" style={{ marginBottom: 8 }}>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Monthly (NGN)</th>
              <th>Built for</th>
              <th>Key limit</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Small Business</strong></td>
              <td>₦249,999</td>
              <td>Founders and small teams</td>
              <td>2 active requests, 1 brand</td>
            </tr>
            <tr>
              <td><strong>Marketing and Ads</strong></td>
              <td>₦499,999</td>
              <td>Startups running campaigns</td>
              <td>4 active requests, up to 3 brands</td>
            </tr>
            <tr>
              <td><strong>Agency</strong></td>
              <td>₦899,999</td>
              <td>Agencies and in-house teams</td>
              <td>Unlimited requests and brands, white-label</td>
            </tr>
          </tbody>
        </table>
        <p>
          International clients are billed in USD at the equivalent rate. Same service, same
          turnaround, same quality. The currency is the only difference — never present it as a
          different tier of service.
        </p>

        <h2>Who We Sell To</h2>
        <h3>Strong fit</h3>
        <ul>
          <li>Businesses already spending money on design, just inconsistently</li>
          <li>Companies running regular marketing campaigns that need creative fast</li>
          <li>Agencies who need overflow capacity they can white-label</li>
          <li>Founders who have been burned by a freelancer disappearing mid-project</li>
          <li>Businesses with more than one brand or product line to keep consistent</li>
        </ul>
        <h3>Weak fit — do not chase</h3>
        <ul>
          <li>Anyone looking for a one-off logo and nothing else</li>
          <li>Businesses that need mostly photography, videography, or 3D animation (out of scope)</li>
          <li>Anyone who needs media buying or ad spend managed (we do creative, not campaign management)</li>
          <li>Prospects who cannot commit to the first month's fee</li>
        </ul>
        <blockquote>
          A bad-fit client costs the company more than no client at all. They consume delivery capacity,
          churn in month two, and the bounty gets clawed back. Qualifying properly protects your own earnings.
        </blockquote>

        <h2>The Sales Process</h2>
        <p>Six steps, same for every agent, every deal.</p>
        <ol>
          <li><strong>Log the prospect.</strong> Before you make contact, log them in the CRM. This is what gives you ownership of that lead.</li>
          <li><strong>Make contact.</strong> Your own network, referrals, direct outreach. Use approved pitch materials only — never invent your own claims about what we deliver.</li>
          <li><strong>Discovery call.</strong> Understand what they actually need before recommending a plan. Ask what design work they are doing now, who does it, and what breaks.</li>
          <li><strong>Recommend a plan.</strong> Match the plan to their real volume, not the highest price you can push. An oversold client churns.</li>
          <li><strong>Fit check.</strong> Send the deal to the Sales Lead or founder for a quick review before anything is signed. This confirms the client is in scope and we have capacity to deliver.</li>
          <li><strong>Close and hand off.</strong> Once the client signs and the first payment clears, hand them over to the Project Manager for onboarding. Your job ends at the handoff.</li>
        </ol>

        <h2>Commission Structure</h2>
        <h3>Signing Bounty</h3>
        <p>One-time payment per new client, confirmed once the first subscription payment has cleared.</p>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr><th>Plan</th><th>Rate</th><th>Bounty (NGN)</th></tr>
          </thead>
          <tbody>
            <tr><td>Small Business</td><td>15%</td><td>₦37,500</td></tr>
            <tr><td>Marketing and Ads</td><td>15%</td><td>₦75,000</td></tr>
            <tr><td>Agency</td><td>20%</td><td>₦180,000</td></tr>
          </tbody>
        </table>

        <h3>Monthly Bounty</h3>
        <p>Recurring payment for each active client you introduced, capped at 12 consecutive months per client.</p>
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
        <p>
          The Monthly Bounty stops in the month a client cancels, pauses, or stops paying. If a paused
          client resumes within 90 days, the bounty resumes for the remainder of the original 12-month
          window — it does not restart.
        </p>

        <h3>Payment Terms</h3>
        <ul>
          <li>Bounties are paid monthly, on the 5th, covering the previous calendar month</li>
          <li>A Signing Bounty becomes payable only once the client's first payment has cleared</li>
          <li>The Company provides a monthly statement showing each client, bounty type, and amount paid</li>
        </ul>

        <h3>Clawback</h3>
        <ul>
          <li>If a client cancels, charges back, or fails to pay within 60 days of signing, the full Signing Bounty is deducted from the next payout</li>
          <li>No clawback applies where a client cancels because the Company failed to deliver</li>
        </ul>

        <h2>Lead Ownership Rules</h2>
        <ul>
          <li>Log a prospect in the CRM before you make any contact — this establishes ownership</li>
          <li>No agent may contact a prospect logged by another agent within that agent's ownership window</li>
          <li>Ownership disputes go to the Sales Lead; their decision is final</li>
          <li>Logging a prospect does not guarantee a bounty — only a closed, paid client earns one</li>
        </ul>

        <h2>What You Must Never Do</h2>
        <ul>
          <li>Promise any deliverable, turnaround, or discount not in this playbook or the Services doc</li>
          <li>Negotiate custom pricing — the published plans are the only pricing</li>
          <li>Enter into any agreement on the Company's behalf — only the founder may sign a client contract</li>
          <li>Skip the fit check — every deal goes through it before anything is signed</li>
        </ul>
      </WikiPage>
    </WikiShell>
  )
}
