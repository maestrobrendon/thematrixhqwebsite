// Captures full-page screenshots of every live site in app/brendon/lib/sites.ts
// and uploads them to Cloudinary (spec §14.2). Run with:
//   node --env-file=.env.local scripts/capture-sites.mjs
// Prints a JSON map of { url: secure_url } at the end — paste those into
// sites.ts's `screenshot` fields by hand (kept manual so a bad capture can't
// silently overwrite good data).
import { chromium } from "playwright"
import { createHash } from "node:crypto"
import { writeFile, mkdir } from "node:fs/promises"

const CLOUD = process.env.CLOUDINARY_CLOUD_NAME
const KEY = process.env.CLOUDINARY_API_KEY
const SECRET = process.env.CLOUDINARY_API_SECRET
if (!CLOUD || !KEY || !SECRET) {
  console.error("Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in env")
  process.exit(1)
}

const sites = [
  { slug: "thematrixhq-com", url: "https://thematrixhq.com" },
  { slug: "maestrobrendon-com", url: "https://maestrobrendon.com" },
]

const outDir = "scratchpad-shots"
await mkdir(outDir, { recursive: true })

function signature(params) {
  const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join("&")
  return createHash("sha1").update(toSign + SECRET).digest("hex")
}

async function uploadToCloudinary(filePath, publicId) {
  const timestamp = Math.floor(Date.now() / 1000)
  const params = { folder: "brendon/shots", public_id: publicId, timestamp }
  const sig = signature(params)
  const { readFile } = await import("node:fs/promises")
  const buf = await readFile(filePath)
  const form = new FormData()
  form.append("file", new Blob([buf]), publicId + ".png")
  form.append("api_key", KEY)
  form.append("timestamp", String(timestamp))
  form.append("folder", "brendon/shots")
  form.append("public_id", publicId)
  form.append("signature", sig)
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, { method: "POST", body: form })
  const json = await res.json()
  if (!res.ok) throw new Error(`Cloudinary upload failed for ${publicId}: ${JSON.stringify(json)}`)
  return json.secure_url
}

const browser = await chromium.launch()
const results = {}

for (const site of sites) {
  console.error(`Capturing ${site.url}...`)
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })
    await page.goto(site.url, { waitUntil: "load", timeout: 30000 })
    await page.waitForTimeout(1500)
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 120))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(400)
    const filePath = `${outDir}/${site.slug}.png`
    await page.screenshot({ path: filePath, fullPage: true })
    await page.close()
    const url = await uploadToCloudinary(filePath, site.slug)
    results[site.url] = url
    console.error(`  -> ${url}`)
  } catch (err) {
    console.error(`  FAILED: ${err.message}`)
    results[site.url] = null
  }
}

await browser.close()
await writeFile(`${outDir}/results.json`, JSON.stringify(results, null, 2))
console.log(JSON.stringify(results, null, 2))
