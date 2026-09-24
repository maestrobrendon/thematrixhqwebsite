import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { COOKIE_NAME, JWT_SECRET } from "@/lib/wiki/auth"
import { isBrendonHost } from "@/app/brendon/lib/isBrendonHost"

const WIKI_PUBLIC = ["/access", "/api/auth", "/api/logout"]

function wikiSecret() {
  return new TextEncoder().encode(JWT_SECRET)
}

// robots.ts and sitemap.ts are root-level special files (generating
// /robots.txt and /sitemap.xml) that already branch on the request's own
// Host header internally — they must never be rewritten, or Next.js looks
// for a nonexistent /brendon/robots.txt (etc.) and 404s instead of running
// that branch at all. Confirmed by hitting /robots.txt and /sitemap.xml with
// a maestrobrendon.com Host header before this bypass existed.
const UNREWRITTEN_PATHS = new Set(["/robots.txt", "/sitemap.xml"])

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? ""
  const { pathname } = req.nextUrl

  if (UNREWRITTEN_PATHS.has(pathname)) {
    return NextResponse.next()
  }

  // brendon.thematrixhq.com/*, maestrobrendon.com/* → /brendon/* (same content as /brendon)
  if (isBrendonHost(hostname)) {
    const rewriteUrl = req.nextUrl.clone()
    rewriteUrl.pathname = `/brendon${pathname === "/" ? "" : pathname}`
    return NextResponse.rewrite(rewriteUrl)
  }

  const isWiki = hostname.startsWith("wiki.")
  if (!isWiki) return NextResponse.next()

  const isPublic = WIKI_PUBLIC.some((p) => pathname.startsWith(p))

  // Auth check for protected wiki paths
  if (!isPublic) {
    const token = req.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.redirect(new URL("/access", req.url))
    }
    try {
      await jwtVerify(token, wikiSecret())
    } catch {
      const res = NextResponse.redirect(new URL("/access", req.url))
      res.cookies.delete(COOKIE_NAME)
      return res
    }
  }

  // Rewrite wiki.thematrixhq.com/* → /wiki/* internally
  const rewriteUrl = req.nextUrl.clone()
  rewriteUrl.pathname = `/wiki${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(rewriteUrl)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.ico).*)"],
}
