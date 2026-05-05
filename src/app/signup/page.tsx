'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { signUpAction, type AuthFormState } from '@/lib/actions/auth'

const initialState: AuthFormState = {}

export default function SignUpPage() {
  const [state, formAction, pending] = useActionState(signUpAction, initialState)

  return (
    <main className='min-h-screen bg-ink flex flex-col'>
      <header className='px-6 md:px-12 py-8 flex items-center justify-between border-b border-border'>
        <Link
          href='/signin'
          className='font-serif font-black text-base tracking-[0.3em] uppercase text-cream hover:text-rust transition-colors duration-150'
        >
          MELOS
        </Link>
        <Link
          href='/signin'
          className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim hover:text-cream transition-colors duration-150'
        >
          ← SIGN IN
        </Link>
      </header>

      <div className='flex-1 flex items-center justify-center px-6 md:px-12 py-12'>
        <div className='w-full max-w-md'>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5'>
            CREATE ACCOUNT
          </p>

          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-3 text-[clamp(2.5rem,6vw,4rem)]'>
            JOIN THE<br />LIBRARY.
          </h1>

          <p className='font-serif italic text-cream-dim mb-10 text-[clamp(0.95rem,1.4vw,1.1rem)]'>
            Build a profile. Find your sound.
          </p>

          <form action={formAction} className='space-y-6'>
            <Field
              label='DISPLAY NAME'
              name='displayName'
              required
              defaultValue={state.values?.displayName}
              autoComplete='name'
            />
            <Field
              label='USERNAME'
              name='username'
              required
              defaultValue={state.values?.username}
              autoComplete='username'
              hint='3–30 characters · letters, numbers, underscores'
            />
            <Field
              label='EMAIL'
              name='email'
              type='email'
              required
              defaultValue={state.values?.email}
              autoComplete='email'
            />
            <Field
              label='PASSWORD'
              name='password'
              type='password'
              required
              autoComplete='new-password'
              hint='at least 8 characters'
            />
            <Field
              label='CONFIRM PASSWORD'
              name='passwordConfirm'
              type='password'
              required
              autoComplete='new-password'
            />
            <Field
              label='BIO (OPTIONAL)'
              name='bio'
              defaultValue={state.values?.bio}
            />

            {state.error && (
              <p className='font-sans text-[0.7rem] tracking-[0.2em] uppercase text-rust border-l-2 border-rust pl-4 py-1'>
                {state.error}
              </p>
            )}

            <button
              type='submit'
              disabled={pending}
              className='w-full font-sans text-[0.7rem] tracking-[0.3em] uppercase bg-rust text-cream py-4 hover:bg-rust-dim transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-wait'
            >
              {pending ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mt-10'>
            ALREADY A MEMBER?{' '}
            <Link href='/signin' className='text-cream hover:text-rust transition-colors duration-150 underline-offset-4 hover:underline'>
              SIGN IN
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  defaultValue?: string
  autoComplete?: string
  hint?: string
}

function Field({ label, name, type = 'text', required, defaultValue, autoComplete, hint }: FieldProps) {
  return (
    <label className='block group'>
      <span className='font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim group-focus-within:text-rust transition-colors duration-150'>
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        className='mt-2 w-full bg-transparent font-serif text-cream text-lg border-b-2 border-border focus:border-rust focus:outline-none py-2 placeholder:text-cream-dim'
      />
      {hint && (
        <span className='block font-sans text-[0.6rem] tracking-[0.2em] uppercase text-cream-dim/70 mt-1.5'>
          {hint}
        </span>
      )}
    </label>
  )
}
