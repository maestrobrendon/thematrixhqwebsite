import { NextRequest, NextResponse } from "next/server"
import { jwtVerify } from "jose"
import { COOKIE_NAME, JWT_SECRET } from "@/lib/wiki/auth"

const WIKI_PUBLIC = ["/access", "/api/auth", "/api/logout"]

function wikiSecret() {
  return new TextEncoder().encode(JWT_SECRET)
}

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") ?? ""
  const isWiki = hostname.startsWith("wiki.")

  if (!isWiki) return NextResponse.next()

  const { pathname } = req.nextUrl
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
