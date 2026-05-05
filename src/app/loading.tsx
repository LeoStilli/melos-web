import { Skeleton, RowSkeleton } from '@/components/ui/Skeleton'

export default function Loading() {
  return (
    <div className='min-h-screen bg-ink'>
      <div className='flex items-center justify-between px-6 md:px-12 py-5 border-b border-border'>
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-9 w-9' />
      </div>

      <div className='px-6 md:px-12 py-12'>
        <Skeleton className='h-3 w-32 mb-8' />
        <Skeleton className='h-12 w-3/4 max-w-2xl mb-6' />
        <Skeleton className='h-4 w-1/2 max-w-md mb-12' />
        <RowSkeleton count={5} />
      </div>
    </div>
  )
}
