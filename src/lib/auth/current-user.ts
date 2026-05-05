import { getSessionUserId } from './session'
import { getUser } from '@/lib/mock/users'
import type { User } from '@/lib/types/user'

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSessionUserId()
  if (!userId) return null
  return getUser(userId) ?? null
}

export async function getCurrentUserId(): Promise<string | null> {
  return getSessionUserId()
}

export async function requireCurrentUser(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}
