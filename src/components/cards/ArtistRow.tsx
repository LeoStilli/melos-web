import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import type { Artist } from '@/lib/types/artist'

interface ArtistRowProps {
  artist: Artist
}

export function ArtistRow({ artist }: ArtistRowProps) {
  return (
    <Link href={`/artist/${artist.slug}`} className='flex items-center gap-5 py-5 border-b border-border group'>
      <Avatar name={artist.name} size='md' />

      <div className='flex-1 min-w-0'>
        <p className='font-serif font-bold text-cream uppercase tracking-wide leading-tight truncate group-hover:text-rust transition-colors duration-150 text-[clamp(0.95rem,1.5vw,1.15rem)]'>
          {artist.name}
        </p>
        <p className='font-sans text-cream-dim mt-1 truncate text-[0.7rem] tracking-[0.15em] uppercase'>
          {artist.genres.slice(0, 3).join('  ·  ')}
          {artist.origin && `  ·  ${artist.origin.toUpperCase()}`}
        </p>
      </div>

      {artist.formedYear && (
        <span className='font-serif font-black tabular-nums text-cream-dim text-lg flex-shrink-0 hidden sm:inline'>
          {artist.formedYear}
        </span>
      )}
    </Link>
  )
}
