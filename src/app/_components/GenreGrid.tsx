'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import { coverColor } from '@/lib/utils/colors'

interface GenreGridProps {
  genres: { genre: string; count: number }[]
}

export function GenreGrid({ genres }: GenreGridProps) {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <ul ref={ref} className='grid grid-cols-2 md:grid-cols-4 gap-px bg-border'>
      {genres.map(({ genre, count }, i) => (
        <motion.li
          key={genre}
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 40, filter: 'blur(10px)' }}
          transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/search?q=${encodeURIComponent(genre)}`}
            data-cursor='view'
            data-cursor-label='OPEN'
            className={cn(
              'relative aspect-[5/3] flex flex-col justify-end p-5 group overflow-hidden',
              coverColor(genre)
            )}
          >
            <motion.span
              className='absolute inset-0 bg-rust origin-bottom'
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            />
            <p className='relative font-serif font-black text-cream uppercase leading-[0.92] tracking-tight text-[clamp(1.1rem,2.6vw,2rem)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:translate-x-1'>
              {genre}
            </p>
            <p className='relative font-sans text-[0.55rem] tracking-[0.3em] uppercase text-cream/70 mt-2 transition-colors duration-200 group-hover:text-cream'>
              {count} {count === 1 ? 'ALBUM' : 'ALBUMS'}
              <motion.span
                aria-hidden
                className='inline-block ml-2'
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
              >
                →
              </motion.span>
            </p>
          </Link>
        </motion.li>
      ))}
    </ul>
  )
}
