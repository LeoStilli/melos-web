'use client'

import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'

import { cn } from '@/lib/utils/cn'
import { coverColor } from '@/lib/utils/colors'
import { formatRank, formatScore } from '@/lib/utils/format'
import type { Album } from '@/lib/types/album'

interface TrendingAlbumsProps {
  albums: Album[]
}

export function TrendingAlbums({ albums }: TrendingAlbumsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { damping: 22, stiffness: 200, mass: 0.5 })
  const y = useSpring(mvY, { damping: 22, stiffness: 200, mass: 0.5 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mvX.set(e.clientX - rect.left - 140)
    mvY.set(e.clientY - rect.top - 160)
  }

  const active = albums.find((a) => a.id === activeId) ?? null

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={() => setActiveId(null)}
      className='relative'
    >
      <ol className='grid grid-cols-1 lg:grid-cols-2 gap-x-16'>
        {albums.map((album, i) => (
          <Row
            key={album.id}
            album={album}
            rank={i + 1}
            onEnter={() => setActiveId(album.id)}
          />
        ))}
      </ol>

      <motion.div
        aria-hidden
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-30 hidden lg:flex items-center justify-center border border-border overflow-hidden',
          active ? coverColor(active.title) : 'bg-surface'
        )}
        style={{ x, y, width: 280, height: 320 }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85, rotate: active ? 0 : -4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {active && (
          <motion.span
            key={active.id}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className='font-serif font-black text-cream/95 leading-none text-9xl select-none'
          >
            {active.title.replace(/^the\s+/i, '')[0]?.toUpperCase()}
          </motion.span>
        )}
      </motion.div>
    </div>
  )
}

interface RowProps {
  album: Album
  rank: number
  onEnter: () => void
}

function Row({ album, rank, onEnter }: RowProps) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <motion.li
      ref={ref}
      onMouseEnter={onEnter}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 1, delay: (rank - 1) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className='border-b border-border'
    >
      <Link
        href={`/album/${album.slug}`}
        data-cursor='view'
        data-cursor-label='OPEN'
        className='relative flex items-baseline gap-6 py-7 group'
      >
        <span className='font-sans text-xs tabular-nums text-cream-dim w-9 flex-shrink-0 group-hover:text-rust transition-colors duration-300'>
          {formatRank(rank)}
        </span>

        <div className='flex-1 min-w-0 relative'>
          <div className='overflow-hidden'>
            <motion.p
              className='font-serif font-bold text-cream uppercase tracking-wide leading-tight truncate transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 text-[clamp(1rem,2vw,1.5rem)]'
            >
              {album.title}
            </motion.p>
          </div>
          <p className='font-sans text-cream-dim mt-1.5 truncate text-[0.65rem] tracking-[0.25em] uppercase'>
            {album.artistName} <span className='inline-block mx-1 w-1 h-1 rounded-full bg-cream-dim align-middle' /> {album.releaseYear}
          </p>
        </div>

        <div className='flex items-baseline gap-2 flex-shrink-0'>
          <span className='font-serif italic text-cream-dim text-xs hidden md:inline'>score</span>
          <span className='font-serif font-black text-cream text-2xl tabular-nums leading-none'>{formatScore(album.communityScore)}</span>
        </div>
      </Link>
    </motion.li>
  )
}
