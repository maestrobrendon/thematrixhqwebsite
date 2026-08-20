import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function BrandGuidelinesPage() {
  return (
    <WikiShell>
      <WikiPage
        section="Company"
        title="Brand Guidelines"
        owner="[Maestro]"
        team="All"
        lastUpdated="â€”"
      >
        <p>
          Keep the thematrixHQ brand looking and reading the same everywhere it shows up, so anything a
          client sees feels like it came from one studio, not ten different people's individual taste.
        </p>

        <h2>Core Brand Requirements</h2>
        <ul>
          <li><strong>Use Approved Assets Only.</strong> Always pull colours, type, and the notch shape from this page and the Design System file. Do not introduce new styles project by project.</li>
          <li><strong>One System, Applied Consistently.</strong> The brand only works if it looks the same everywhere. Avoid one-off treatments that pull away from the approved system.</li>
          <li><strong>Typography Carries the Brand.</strong> We do not lean on decoration. Headlines, spacing, and type hierarchy do the work of making something look considered.</li>
          <li><strong>Plain, Bold, Clear.</strong> Every design should read easily and say exactly what it means. thematrixHQ moves fast and does not waste anyone's time. The work should look like that too.</li>
        </ul>

        <h2>Logo and Mark</h2>
        <p>
          The full logo suite (primary lockup, standalone glyph, monogram, one-colour and reversed
          versions) is still in production. Until it is ready, use the wordmark "thematrixHQ" set in
          Archivo exactly as shown in the Design System file. Never stretch, distort, rotate, or
          hand-recreate it.
        </p>

        <h2>Typography System</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Typeface</th>
              <th>Use</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Archivo</strong></td>
              <td>Headlines, sub-headlines, page titles, document covers</td>
              <td>Medium to Semibold (500 to 600). Not the heavier 800.</td>
            </tr>
            <tr>
              <td><strong>Instrument Sans</strong></td>
              <td>Body copy. Anything a client actually reads start to finish</td>
              <td>400 to 600</td>
            </tr>
            <tr>
              <td><strong>JetBrains Mono</strong></td>
              <td>Eyebrows, labels, status tags, SLA times, tier names, version numbers</td>
              <td>400 to 500</td>
            </tr>
          </tbody>
        </table>

        <h2>Colour System</h2>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Hex</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Ink</strong></td>
              <td><code>#0A0A0A</code></td>
              <td>Structure, type, rules, borders. Primary text colour.</td>
            </tr>
            <tr>
              <td><strong>Base</strong></td>
              <td><code>#FFFFFF</code></td>
              <td>Default background for almost everything.</td>
            </tr>
            <tr>
              <td><strong>Paper</strong></td>
              <td><code>#F1EFE8</code></td>
              <td>Secondary surface, callout backgrounds, sidebar.</td>
            </tr>
            <tr>
              <td><strong>Root</strong></td>
              <td><code>#00301D</code></td>
              <td>System surfaces representing process, panels, pricing frames.</td>
            </tr>
            <tr>
              <td><strong>Live</strong></td>
              <td><code>#12B34A</code></td>
              <td>Confirmation only. Status tags. Never a background, never a headline.</td>
            </tr>
            <tr>
              <td><strong>Human</strong></td>
              <td><code>#FF4D00</code></td>
              <td>Judgement, CTAs, Art Director notes. Stays under 5% of any layout.</td>
            </tr>
          </tbody>
        </table>

        <h3>Usage Ratio Guide</h3>
        <ul>
          <li><strong>Paper</strong> 44%</li>
          <li><strong>Ink</strong> 26%</li>
          <li><strong>Root</strong> 18%</li>
          <li><strong>Live</strong> 8%</li>
          <li><strong>Human</strong> 4%</li>
        </ul>

        <h2>The Notch</h2>
        <p>
          The notch is the signature shape element: one corner clipped at 14px. It appears on cards,
          frames, and UI components. Apply it with a single CSS{" "}
          <code>clip-path</code> rule. Do not fake it with a visual cut or rounded edge.
        </p>
        <div className="wiki-callout">
          <p className="wiki-callout-label">Notch clip-path</p>
          <p><code>clip-path: polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)</code></p>
        </div>

        <h2>What to Avoid</h2>
        <ul>
          <li>No coloured callout fills (no green or orange fill backgrounds on callout boxes)</li>
          <li>No pill badges</li>
          <li>No em dashes in copy, use plain dashes or rewrite the sentence</li>
          <li>No Canva-default templates, rainbow colour palettes, or decorative illustration styles</li>
          <li>No heavy 800-weight Archivo, it reads dense and dated</li>
          <li>No one-off visual styles introduced project by project</li>
        </ul>

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
              <td><strong>Art Director</strong></td>
              <td>Approves any new brand asset before it is used. Keeps this page current.</td>
            </tr>
            <tr>
              <td><strong>Designers</strong></td>
              <td>Follow this guide on every deliverable. Flag anything that does not fit before it ships.</td>
            </tr>
            <tr>
              <td><strong>Founder</strong></td>
              <td>Final call on any change to the brand system itself.</td>
            </tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}

