import { cn, formatScore } from '@/lib/utils'

interface ScoreProps {
  value: number
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  verified?: boolean
  className?: string
}

const NUMBER_CLASS = {
  sm: 'text-base',
  md: 'text-2xl',
  lg: 'text-4xl',
  hero: 'text-[clamp(3rem,8vw,5.5rem)]'
}

export function Score({ value, label, size = 'md', verified, className }: ScoreProps) {
  return (
    <div className={cn('flex flex-col items-start', className)}>
      {label && (
        <span className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mb-1'>
          {label}
          {verified && <span className='ml-2 text-rust'>✓</span>}
        </span>
      )}
      <div className='flex items-baseline gap-1.5 font-serif tabular-nums leading-none'>
        <span className={cn('font-black text-cream', NUMBER_CLASS[size])}>
          {formatScore(value)}
        </span>
        <span className='font-sans text-cream-dim text-xs'>/ 10</span>
      </div>
    </div>
  )
}
