import { cn } from '@/lib/utils'

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
  size?: 'md' | 'lg' | 'hero'
  className?: string
}

export function SearchBar({
  defaultValue,
  placeholder = 'Albums, artists, songs, listeners...',
  size = 'md',
  className
}: SearchBarProps) {
  return (
    <form
      action='/search'
      method='get'
      className={cn(
        'flex items-center gap-4 md:gap-6 border-b-2 border-border focus-within:border-rust transition-colors duration-200',
        className
      )}
    >
      <span className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim flex-shrink-0 hidden sm:block'>
        SEARCH
      </span>
      <input
        type='search'
        name='q'
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete='off'
        className={cn(
          'flex-1 min-w-0 bg-transparent font-serif italic text-cream placeholder:text-cream-dim focus:outline-none py-3',
          size === 'md' && 'text-base md:text-lg',
          size === 'lg' && 'text-xl md:text-2xl',
          size === 'hero' && 'text-[clamp(1.25rem,3vw,2.25rem)]'
        )}
      />
      <button
        type='submit'
        className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream hover:text-rust transition-colors duration-150 cursor-pointer flex-shrink-0'
      >
        FIND →
      </button>
    </form>
  )
}
