import { NextRequest, NextResponse } from "next/server"
import { ALLOWED_EMAILS, ACCESS_CODE } from "@/lib/wiki/allowedEmails"
import { signSession, COOKIE_NAME, COOKIE_MAX_AGE } from "@/lib/wiki/auth"

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = (body.email ?? "").trim().toLowerCase()
  const code  = (body.code  ?? "").trim()

  await new Promise((r) => setTimeout(r, 400))

  const emailOk = ALLOWED_EMAILS.map((e) => e.toLowerCase()).includes(email)
  const codeOk  = code === ACCESS_CODE

  if (!emailOk || !codeOk) {
    return NextResponse.json({ error: "Access denied." }, { status: 401 })
  }

  const token = await signSession(email)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  })
  return res
}
