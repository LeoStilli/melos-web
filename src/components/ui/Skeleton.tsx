import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('bg-surface-2 animate-pulse', className)} />
}

export function RowSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className='flex items-center gap-5 py-5 border-b border-border'>
          <Skeleton className='w-12 h-12 flex-shrink-0' />
          <div className='flex-1 space-y-2'>
            <Skeleton className='h-5 w-2/3' />
            <Skeleton className='h-3 w-1/3' />
          </div>
          <Skeleton className='w-10 h-6 flex-shrink-0' />
        </div>
      ))}
    </div>
  )
}
