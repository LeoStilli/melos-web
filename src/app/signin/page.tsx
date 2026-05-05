'use client'

import { useActionState } from 'react'
import Link from 'next/link'

import { signInAction, type AuthFormState } from '@/lib/actions/auth'

const initialState: AuthFormState = {}

export default function SignInPage() {
  const [state, formAction, pending] = useActionState(signInAction, initialState)

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
          href='/signup'
          className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim hover:text-cream transition-colors duration-150'
        >
          CREATE ACCOUNT →
        </Link>
      </header>

      <div className='flex-1 flex items-center justify-center px-6 md:px-12 py-12'>
        <div className='w-full max-w-md'>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5'>
            SIGN IN
          </p>

          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-3 text-[clamp(2.5rem,6vw,4rem)]'>
            WELCOME<br />BACK.
          </h1>

          <p className='font-serif italic text-cream-dim mb-10 text-[clamp(0.95rem,1.4vw,1.1rem)]'>
            Pick up where you left off.
          </p>

          <form action={formAction} className='space-y-7'>
            <Field label='EMAIL' name='email' type='email' defaultValue={state.values?.email} required autoComplete='email' />
            <Field label='PASSWORD' name='password' type='password' required autoComplete='current-password' />

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
              {pending ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>

          <p className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mt-10'>
            NEW HERE?{' '}
            <Link href='/signup' className='text-cream hover:text-rust transition-colors duration-150 underline-offset-4 hover:underline'>
              CREATE AN ACCOUNT
            </Link>
          </p>

          <div className='mt-12 pt-6 border-t border-border'>
            <p className='font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim mb-3'>
              DEMO ACCOUNTS
            </p>
            <p className='font-serif italic text-cream-dim text-[0.85rem] leading-relaxed'>
              Sign in as any seeded user with their <span className='text-cream'>username@melos.test</span> and password{' '}
              <span className='text-cream'>demo1234</span>. Try{' '}
              <code className='font-sans text-[0.7rem] tracking-widest text-rust'>maya_h@melos.test</code>.
            </p>
          </div>
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
}

function Field({ label, name, type = 'text', required, defaultValue, autoComplete }: FieldProps) {
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
    </label>
  )
}
