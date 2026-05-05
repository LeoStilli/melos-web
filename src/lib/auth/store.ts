import type { User } from '@/lib/types/user'
import { addUser, getUserByUsername, users as registeredUsers } from '@/lib/mock/users'
import { hashPassword, verifyPassword, randomId } from './crypto'

const passwordHashes = new Map<string, string>()
const emailIndex = new Map<string, string>()

const DEFAULT_PASSWORD = 'demo1234'

let seedPromise: Promise<void> | null = null

function seed(): Promise<void> {
  if (seedPromise) return seedPromise
  seedPromise = (async () => {
    const hash = await hashPassword(DEFAULT_PASSWORD)
    for (const user of registeredUsers) {
      passwordHashes.set(user.id, hash)
      emailIndex.set(`${user.username}@melos.test`.toLowerCase(), user.id)
    }
  })()
  return seedPromise
}

export const DEFAULT_DEMO_PASSWORD = DEFAULT_PASSWORD

export interface SignupInput {
  email: string
  username: string
  displayName: string
  password: string
  bio?: string
}

export interface AuthResult {
  ok: boolean
  userId?: string
  error?: string
}

export async function authenticate(email: string, password: string): Promise<AuthResult> {
  await seed()
  const lookup = email.trim().toLowerCase()
  const userId = emailIndex.get(lookup)
  if (!userId) return { ok: false, error: 'No account with that email.' }
  const stored = passwordHashes.get(userId)
  if (!stored) return { ok: false, error: 'Account is missing a password.' }
  const valid = await verifyPassword(password, stored)
  if (!valid) return { ok: false, error: 'Wrong password.' }
  return { ok: true, userId }
}

export async function register(input: SignupInput): Promise<AuthResult> {
  await seed()

  const email = input.email.trim().toLowerCase()
  const username = input.username.trim()
  const displayName = input.displayName.trim()
  const bio = input.bio?.trim() || null

  if (!email || !email.includes('@') || email.length > 200) {
    return { ok: false, error: 'Enter a valid email address.' }
  }
  if (username.length < 3 || username.length > 30) {
    return { ok: false, error: 'Username must be 3 to 30 characters.' }
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { ok: false, error: 'Username can only contain letters, numbers, and underscores.' }
  }
  if (displayName.length < 1 || displayName.length > 60) {
    return { ok: false, error: 'Display name must be 1 to 60 characters.' }
  }
  if (input.password.length < 8) {
    return { ok: false, error: 'Password must be at least 8 characters.' }
  }
  if (emailIndex.has(email)) {
    return { ok: false, error: 'That email is already registered.' }
  }
  if (getUserByUsername(username)) {
    return { ok: false, error: 'That username is taken.' }
  }

  const id = `u_${randomId()}`
  const hash = await hashPassword(input.password)

  const user: User = {
    id,
    username,
    displayName,
    bio,
    isVerified: false,
    credibilityScore: 0,
    joinedAt: new Date(),
    followerCount: 0,
    followingCount: 0,
    reviewCount: 0,
    listCount: 0
  }

  addUser(user)
  passwordHashes.set(id, hash)
  emailIndex.set(email, id)

  return { ok: true, userId: id }
}

export async function getEmailForUser(userId: string): Promise<string | null> {
  await seed()
  for (const [email, id] of emailIndex) {
    if (id === userId) return email
  }
  return null
}
