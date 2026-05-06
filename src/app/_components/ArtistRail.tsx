'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'
import { avatarColor } from '@/lib/utils/colors'
import { Magnetic } from '@/lib/motion/Magnetic'
import type { Artist } from '@/lib/types/artist'

interface ArtistRailProps {
  artists: Artist[]
}

export function ArtistRail({ artists }: ArtistRailProps) {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <ul ref={ref} className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-12'>
      {artists.map((artist, i) => (
        <motion.li
          key={artist.id}
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 50, filter: 'blur(10px)' }}
          transition={{ duration: 1, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <ArtistTile artist={artist} />
        </motion.li>
      ))}
    </ul>
  )
}

function ArtistTile({ artist }: { artist: Artist }) {
  const bg = avatarColor(artist.name)
  const initial = artist.name.replace(/^the\s+/i, '')[0]?.toUpperCase() ?? '?'

  return (
    <Magnetic strength={0.15}>
      <Link href={`/artist/${artist.slug}`} data-cursor='view' data-cursor-label='VIEW' className='block group'>
        <div
          className={cn(
            'relative aspect-square border border-border flex items-center justify-center mb-4 overflow-hidden transition-colors duration-500 group-hover:border-cream-dim',
            bg
          )}
        >
          <motion.span
            aria-hidden
            className='absolute inset-0 bg-ink/0'
            whileHover={{ backgroundColor: 'rgba(13,13,13,0.35)' }}
            transition={{ duration: 0.4 }}
          />
          <motion.span
            className='relative font-serif font-black text-cream/95 leading-none text-[clamp(2rem,5vw,3.5rem)] select-none'
            whileHover={{ scale: 1.08, letterSpacing: '0.04em' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {initial}
          </motion.span>
          <motion.span
            className='absolute bottom-3 right-3 font-sans text-[0.5rem] tracking-[0.3em] uppercase text-cream/0 group-hover:text-cream/80 transition-colors duration-300'
          >
            VIEW →
          </motion.span>
        </div>
        <p className='font-serif font-bold text-cream uppercase tracking-wide truncate group-hover:text-rust transition-colors duration-300 text-[clamp(0.85rem,1.2vw,0.95rem)]'>
          {artist.name}
        </p>
        <p className='font-sans text-[0.6rem] tracking-[0.2em] uppercase text-cream-dim mt-1 truncate'>
          {artist.genres[0]}
        </p>
      </Link>
    </Magnetic>
  )
}
