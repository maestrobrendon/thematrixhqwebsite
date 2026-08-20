import { SignJWT, jwtVerify } from "jose"
import { JWT_SECRET } from "./allowedEmails"

export { JWT_SECRET } from "./allowedEmails"

export const COOKIE_NAME = "wiki_session"
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 30

function secret() {
  return new TextEncoder().encode(JWT_SECRET)
}

export async function signSession(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret())
}

export async function verifySession(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, secret())
    return { email: payload.email as string }
  } catch {
    return null
  }
}
