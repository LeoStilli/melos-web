import { cn, coverColor } from '@/lib/utils'

interface AlbumCoverProps {
  title: string
  artistName?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero'
  className?: string
}

const SIZE_CLASS = {
  sm: 'w-12 h-12 text-base',
  md: 'w-20 h-20 text-2xl',
  lg: 'w-32 h-32 text-4xl',
  xl: 'w-48 h-48 text-6xl',
  hero: 'w-full aspect-square text-[clamp(4rem,16vw,12rem)]'
}

export function AlbumCover({ title, artistName, size = 'md', className }: AlbumCoverProps) {
  const bg = coverColor(title)
  const initial = title.replace(/^the\s+/i, '')[0]?.toUpperCase() ?? '?'

  return (
    <div
      className={cn(
        'relative flex-shrink-0 border border-border overflow-hidden flex items-center justify-center',
        bg,
        SIZE_CLASS[size],
        className
      )}
    >
      <span className='font-serif font-black text-cream/95 leading-none select-none'>
        {initial}
      </span>
      {(size === 'lg' || size === 'xl' || size === 'hero') && (
        <div className='absolute bottom-0 left-0 right-0 px-3 py-2 flex items-end justify-between'>
          <span className='font-sans text-[0.55rem] tracking-[0.2em] uppercase text-cream/70 max-w-[60%] leading-tight'>
            {title}
          </span>
          {artistName && (
            <span className='font-sans text-[0.55rem] tracking-[0.2em] uppercase text-cream/50 text-right max-w-[40%] leading-tight'>
              {artistName}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
