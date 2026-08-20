import WikiShell from "@/components/wiki/WikiShell"
import WikiPage from "@/components/wiki/WikiPage"

export default function FileStoragePage() {
  return (
    <WikiShell>
      <WikiPage section="How We Work" title="File Storage and Naming" lastUpdated="â€”">
        <p>
          Keep file storage clean, findable, and free of duplicates, whether it is client work or
          internal documentation. If a file is not stored correctly, it does not exist as far as the
          next person is concerned.
        </p>

        <h2>Core Principles</h2>
        <ul>
          <li><strong>Two systems only.</strong> thematrixHQ_Clients and thematrixHQ_Operations. Nothing lives outside those two. No mixing: client files never go in Operations, internal files never go to a client.</li>
          <li><strong>One source of truth.</strong> No duplicate storage, and no WhatsApp or email thread treated as the real copy of a file.</li>
          <li><strong>Immediate filing.</strong> A file gets moved to the correct folder within 24 hours of arriving, not left sitting in Downloads.</li>
          <li><strong>Zero ambiguity.</strong> File names, versions, and folders have to make sense to someone who was not in the conversation.</li>
        </ul>

        <h2>Success Criteria</h2>
        <ul>
          <li>Zero files stored in the wrong place</li>
          <li>Any client's assets can be found in under 30 seconds</li>
          <li>No duplicate or conflicting versions of the same file</li>
        </ul>

        <h2>Storage Architecture</h2>

        <h3>thematrixHQ_Clients</h3>
        <p>All client-facing work lives here, in Google Drive.</p>
        <table className="prose-table" style={{ marginBottom: 16 }}>
          <thead>
            <tr>
              <th>Folder</th>
              <th>What goes in it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Brand Assets/</code></td>
              <td>Anything the client hands us to work from: logo files, existing brand guidelines, reference decks. Never edited directly, always duplicated first.</td>
            </tr>
            <tr>
              <td><code>Working Files/</code></td>
              <td>In-progress files that are not Figma files: documents, slide decks, video projects. Figma files stay in Figma and get linked from the request.</td>
            </tr>
            <tr>
              <td><code>Exports/</code></td>
              <td>Final, client-ready deliverables only: PNG, PDF, MP4, packaged files. Nothing lands here until the Art Director has approved it.</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>Designers work only from Working Files or the linked Figma file, never from Exports</li>
          <li>Nothing gets delivered unless it is inside Exports</li>
          <li>Superseded files move to a dated subfolder inside Working Files, they never get deleted</li>
        </ul>

        <h3>thematrixHQ_Operations</h3>
        <p>All internal work lives here, in Google Drive.</p>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Folder</th>
              <th>What goes in it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>Brand/</code></td>
              <td>Logo suite, design system files</td>
            </tr>
            <tr>
              <td><code>Finance/</code></td>
              <td>Invoicing, billing records</td>
            </tr>
            <tr>
              <td><code>Archive/</code></td>
              <td>Retired or superseded internal files</td>
            </tr>
          </tbody>
        </table>

        <h2>Figma Naming</h2>
        <p>
          Figma files stay in Figma. Name them:<br />
          <code>[Client Name] - [Project Name]</code>
        </p>

        <h2>File Naming Convention</h2>
        <p>
          <code>[Client Name] - [Project Code] - [File Type] - [Version]</code>
        </p>
        <table className="prose-table" style={{ marginBottom: 24 }}>
          <thead>
            <tr>
              <th>Element</th>
              <th>Rule</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Client Name</td>
              <td>As listed in thematrixHQ_Clients</td>
              <td>AcmeCo</td>
            </tr>
            <tr>
              <td>Project Code</td>
              <td>Short code for the project or request</td>
              <td>BrandRefresh</td>
            </tr>
            <tr>
              <td>File Type</td>
              <td>What the file is</td>
              <td>LogoSuite, SocialPost, LandingPage</td>
            </tr>
            <tr>
              <td>Version</td>
              <td>Two-digit number, starting at v01</td>
              <td>v01, v02, v03</td>
            </tr>
          </tbody>
        </table>
        <div className="wiki-callout">
          <p className="wiki-callout-label">Version numbering</p>
          <p>
            Always use v01, v02, not v1 or V1. Two digits. Lowercase v. This keeps files sorting
            correctly when there are ten or more versions.
          </p>
        </div>

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
              <td><strong>Founder / PM</strong></td>
              <td>Moves client uploads to the correct folder. Verifies the final folder before anything goes out.</td>
            </tr>
            <tr>
              <td><strong>Designers</strong></td>
              <td>Work only from Working Files or the linked Figma file. Never deliver straight from a personal folder or a chat thread.</td>
            </tr>
            <tr>
              <td><strong>Art Director</strong></td>
              <td>Checks file location before delivery. Nothing ships that is not sitting in Exports.</td>
            </tr>
            <tr>
              <td><strong>Everyone</strong></td>
              <td>Stores internal docs in Notion, operations files in Drive immediately, never leaves a duplicate lying around.</td>
            </tr>
          </tbody>
        </table>
      </WikiPage>
    </WikiShell>
  )
}

