import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function CompassPage() {
  return (
    <WikiShell>
      <WikiPage section="Company" title="thematrixHQ Compass" lastUpdated="â€”">
        <h2>Purpose</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>Why we exist</p>
        <p>
          To give founders and business owners real access to a design team, the kind of team that used
          to only exist inside big companies with big budgets.
        </p>

        <h2>Mission</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>How we accomplish it</p>
        <p>
          We pair AI speed with a vetted pool of designers, and put every piece of work through a human
          Art Director before it reaches you. Fast without being careless, affordable without being thin.
        </p>

        <h2>Brand Promise</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>Who we want to be to our clients</p>
        <blockquote>The best team you never had to hire.</blockquote>

        <h2>Vision</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>The broader future we want to create</p>
        <p>
          A future where the best creative work does not come from the biggest agency, it comes from the
          smartest pairing of people and technology. We think that future is close. We intend to be the
          one who built it first, out of Lagos.
        </p>

        <h2>BHAG</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>The bold long-term goal that makes our vision measurable</p>
        <p>
          By 2032, build 1,000 lasting partnerships with African founders and business owners.
        </p>
        <div className="wiki-callout">
          <p className="wiki-callout-label">What counts toward the 1,000</p>
          <p>
            A lasting partnership is a client relationship with real, paid work every month for at least
            six months. Each one counts once.
          </p>
        </div>

        <h2>Current Core Focus</h2>
        <p>
          Flat-fee, AI-accelerated design subscriptions for founders and business owners who need
          consistent creative work without building an in-house team.
        </p>

        <h2>3-Year Picture</h2>
        <p style={{ fontStyle: "italic", color: "var(--ink-60)" }}>What thematrixHQ looks like by mid-2029</p>
        <ul>
          <li>150+ active subscriptions, consistently and profitably, with a gross margin of at least 65% and a net margin of 40%+</li>
          <li>Subscriber retention at 85%+, with pause and cancellation combined under 15%</li>
          <li>90% of requests delivered on or before the 30-hour SLA, averaging no more than two revision rounds</li>
          <li>A trusted pool of 30 to 40 vetted designers with a clear path to more work as we grow</li>
          <li>100+ five-star reviews with an average rating of 4.8 or higher</li>
          <li>AI-assisted workflows running through every core process, keeping speed high without losing the human review layer</li>
          <li>A delivery system that can grow without headcount growing at the same rate</li>
          <li>300+ lasting partnerships built toward the BHAG</li>
          <li>The name African founders think of first when they need a design team without hiring one</li>
        </ul>
      </WikiPage>
    </WikiShell>
  )
}

