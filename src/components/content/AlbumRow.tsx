import Link from 'next/link'

import { AlbumCover } from '@/components/ui/AlbumCover'
import { formatRank, formatScore } from '@/lib/utils'
import type { Album } from '@/lib/types'

interface AlbumRowProps {
  album: Album
  rank?: number
  variant?: 'list' | 'grid'
}

export function AlbumRow({ album, rank, variant = 'list' }: AlbumRowProps) {
  if (variant === 'grid') {
    return <GridTile album={album} />
  }

  return (
    <Link
      href={`/album/${album.slug}`}
      className='flex items-center gap-5 md:gap-7 py-5 border-b border-border group'
    >
      {rank !== undefined && (
        <span className='font-sans text-xs tabular-nums text-cream-dim w-7 flex-shrink-0 group-hover:text-rust transition-colors duration-150'>
          {formatRank(rank)}
        </span>
      )}

      <AlbumCover title={album.title} artistName={album.artistName} size='md' />

      <div className='flex-1 min-w-0'>
        <p className='font-serif font-bold text-cream uppercase tracking-wide leading-tight truncate group-hover:text-rust transition-colors duration-150 text-[clamp(0.9rem,1.5vw,1.1rem)]'>
          {album.title}
        </p>
        <p className='font-sans text-cream-dim mt-1 truncate text-[0.7rem] tracking-[0.15em] uppercase'>
          {album.artistName} · {album.releaseYear}
        </p>
      </div>

      <div className='flex items-baseline gap-1.5 font-serif tabular-nums leading-none flex-shrink-0'>
        <span className='font-black text-cream text-xl'>{formatScore(album.communityScore)}</span>
      </div>
    </Link>
  )
}

function GridTile({ album }: { album: Album }) {
  return (
    <Link href={`/album/${album.slug}`} className='block group'>
      <AlbumCover title={album.title} artistName={album.artistName} size='lg' className='mb-3 w-full h-auto aspect-square' />
      <p className='font-serif font-bold text-cream uppercase tracking-wide leading-tight truncate group-hover:text-rust transition-colors duration-150 text-sm'>
        {album.title}
      </p>
      <p className='font-sans text-cream-dim mt-0.5 truncate text-[0.65rem] tracking-[0.15em] uppercase'>
        {album.artistName}
      </p>
    </Link>
  )
}
