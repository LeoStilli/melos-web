'use client'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='min-h-screen bg-ink flex flex-col justify-center px-8 md:px-16'>
      <p className='font-sans text-xs tracking-[0.25em] uppercase text-rust mb-6'>
        SOMETHING WENT WRONG
      </p>
      <p className='font-serif text-cream-dim mb-8 text-[1.1rem]'>
        {error.message ?? 'An unexpected error occurred.'}
      </p>
      <button
        onClick={reset}
        className='self-start font-sans text-xs tracking-widest uppercase text-cream-dim border border-border px-6 py-3 hover:border-cream-dim hover:text-cream transition-colors duration-150 cursor-pointer'
      >
        TRY AGAIN
      </button>
    </div>
  )
}
