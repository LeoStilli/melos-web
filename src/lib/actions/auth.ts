'use server'

import { redirect } from 'next/navigation'

import { setSessionCookie, clearSessionCookie } from '@/lib/auth/session'
import { authenticate, register } from '@/lib/auth/store'

export interface AuthFormState {
  error?: string
  values?: {
    email?: string
    username?: string
    displayName?: string
    bio?: string
  }
}

export async function signInAction(
  _prev: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''

  if (!email || !password) {
    return { error: 'Enter your email and password.', values: { email } }
  }

  const result = await authenticate(email, password)
  if (!result.ok || !result.userId) {
    return { error: result.error ?? 'Could not sign you in.', values: { email } }
  }

  await setSessionCookie(result.userId)
  redirect('/')
}

export async function signUpAction(
  _prev: AuthFormState | undefined,
  formData: FormData
): Promise<AuthFormState> {
  const email = formData.get('email')?.toString() ?? ''
  const username = formData.get('username')?.toString() ?? ''
  const displayName = formData.get('displayName')?.toString() ?? ''
  const password = formData.get('password')?.toString() ?? ''
  const passwordConfirm = formData.get('passwordConfirm')?.toString() ?? ''
  const bio = formData.get('bio')?.toString() ?? ''

  const values = { email, username, displayName, bio }

  if (password !== passwordConfirm) {
    return { error: 'Passwords do not match.', values }
  }

  const result = await register({ email, username, displayName, password, bio })
  if (!result.ok || !result.userId) {
    return { error: result.error ?? 'Could not create your account.', values }
  }

  await setSessionCookie(result.userId)
  redirect('/')
}

export async function signOutAction(): Promise<void> {
  await clearSessionCookie()
  redirect('/signin')
}
