import { cn } from '@/lib/utils/cn'
import { avatarColor } from '@/lib/utils/colors'

interface AvatarProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const SIZE_CLASS = {
  xs: 'w-6 h-6 text-[0.6rem]',
  sm: 'w-9 h-9 text-xs',
  md: 'w-12 h-12 text-base',
  lg: 'w-20 h-20 text-2xl',
  xl: 'w-36 h-36 md:w-48 md:h-48 text-[clamp(2rem,4vw,3rem)]'
}

export function Avatar({ name, size = 'md', className }: AvatarProps) {
  const bg = avatarColor(name)
  const initial = name.trim()[0]?.toUpperCase() ?? '?'

  return (
    <div
      className={cn(
        'flex-shrink-0 border border-border flex items-center justify-center',
        bg,
        SIZE_CLASS[size],
        className
      )}
    >
      <span className='font-serif font-bold text-cream/95 leading-none select-none'>
        {initial}
      </span>
    </div>
  )
}
