import { cookies } from 'next/headers'
import { signHMAC, verifyHMAC } from './crypto'

export const SESSION_COOKIE = 'melos_session'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30

function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (!secret) throw new Error('AUTH_SECRET is not set. Add it to .env.local.')
  return secret
}

export async function setSessionCookie(userId: string): Promise<void> {
  const sig = await signHMAC(userId, getSecret())
  const store = await cookies()
  store.set(SESSION_COOKIE, `${userId}.${sig}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS
  })
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSessionUserId(): Promise<string | null> {
  const store = await cookies()
  const cookie = store.get(SESSION_COOKIE)?.value
  return verifySessionValue(cookie)
}

export async function verifySessionValue(cookieValue: string | undefined): Promise<string | null> {
  if (!cookieValue) return null
  const dot = cookieValue.indexOf('.')
  if (dot === -1) return null
  const userId = cookieValue.slice(0, dot)
  const sig = cookieValue.slice(dot + 1)
  if (!userId || !sig) return null
  const valid = await verifyHMAC(userId, sig, getSecret())
  return valid ? userId : null
}
