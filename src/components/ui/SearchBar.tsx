'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

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
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <form
      action='/search'
      method='get'
      className={cn(
        'relative flex items-center gap-4 md:gap-6',
        className
      )}
    >
      <span className='relative block w-full'>
        <span className='flex items-center gap-4 md:gap-6 py-3'>
          <span className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim flex-shrink-0 hidden sm:block'>
            SEARCH
          </span>
          <input
            type='search'
            name='q'
            defaultValue={defaultValue}
            placeholder={placeholder}
            autoComplete='off'
            data-cursor='text'
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              'flex-1 min-w-0 bg-transparent font-serif italic text-cream placeholder:text-cream-dim focus:outline-none',
              size === 'md' && 'text-base md:text-lg',
              size === 'lg' && 'text-xl md:text-2xl',
              size === 'hero' && 'text-[clamp(1.25rem,3vw,2.25rem)]'
            )}
          />
          <motion.button
            type='submit'
            data-cursor='link'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream hover:text-rust transition-colors duration-200 cursor-pointer flex-shrink-0 inline-flex items-center gap-2'
          >
            FIND
            <motion.span
              animate={{ x: hovered ? 8 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className='inline-block'
            >
              →
            </motion.span>
          </motion.button>
        </span>
        <span className='absolute left-0 right-0 bottom-0 h-px bg-border' />
        <motion.span
          className='absolute left-0 bottom-0 h-px bg-rust origin-left'
          initial={{ scaleX: 0 }}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </form>
  )
}
