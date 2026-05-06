'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { AlbumCover } from '@/components/ui/AlbumCover'
import { albums, getAlbumTracks } from '@/lib/mock/albums'
import { formatRank, formatDuration, formatScore } from '@/lib/utils/format'

export function TopTracks() {
  const tracks = albums
    .flatMap((album) => getAlbumTracks(album.id).map((t) => ({ ...t, album })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <ol ref={ref} className='grid grid-cols-1 lg:grid-cols-2 gap-x-12'>
      {tracks.map((track, i) => (
        <motion.li
          key={track.id}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.9, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className='flex items-center gap-4 py-5 border-b border-border group relative overflow-hidden'
        >
          <motion.span
            aria-hidden
            className='absolute left-0 top-0 bottom-0 w-px bg-rust origin-top'
            initial={{ scaleY: 0 }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className='font-sans text-xs tabular-nums text-cream-dim w-7 flex-shrink-0 group-hover:text-rust transition-colors duration-300'>
            {formatRank(i + 1)}
          </span>

          <Link href={`/album/${track.album.slug}`} className='flex-shrink-0'>
            <motion.div whileHover={{ rotate: -3, scale: 1.06 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <AlbumCover title={track.album.title} size='sm' />
            </motion.div>
          </Link>

          <div className='flex-1 min-w-0 relative'>
            <Link
              href={`/album/${track.album.slug}`}
              data-cursor='link'
              className='block font-serif text-cream truncate transition-colors duration-300 text-[0.95rem] leading-tight group-hover:text-rust group-hover:translate-x-1 transition-transform'
            >
              {track.title}
            </Link>
            <p className='font-sans text-cream-dim mt-0.5 truncate text-[0.65rem] tracking-[0.2em] uppercase'>
              {track.album.artistName}  ·  {track.album.title}
            </p>
          </div>

          <span className='font-serif font-black tabular-nums text-cream-dim text-sm flex-shrink-0 w-10 text-right group-hover:text-cream transition-colors duration-300'>
            {formatScore(track.score)}
          </span>
          <span className='font-sans tabular-nums text-cream-dim flex-shrink-0 text-[0.7rem] w-10 text-right hidden sm:inline'>
            {formatDuration(track.durationMs)}
          </span>
        </motion.li>
      ))}
    </ol>
  )
}
