import { cn } from '@/lib/utils/cn'

interface DividerProps {
  label?: string
  className?: string
}

export function Divider({ label, className }: DividerProps) {
  if (!label) {
    return <div className={cn('border-t border-border', className)} />
  }
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim flex-shrink-0'>
        {label}
      </span>
      <div className='flex-1 border-t border-border' />
    </div>
  )
}
