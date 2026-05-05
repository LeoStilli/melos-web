import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  label: string
  href?: string
  hrefLabel?: string
  className?: string
}

export function SectionHeading({ label, href, hrefLabel = 'SEE ALL', className }: SectionHeadingProps) {
  return (
    <div className={cn('flex items-baseline justify-between mb-8', className)}>
      <h2 className='font-sans text-xs tracking-[0.3em] uppercase text-rust'>
        {label}
      </h2>
      {href && (
        <Link
          href={href}
          className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim hover:text-cream transition-colors duration-150'
        >
          {hrefLabel} →
        </Link>
      )}
    </div>
  )
}
