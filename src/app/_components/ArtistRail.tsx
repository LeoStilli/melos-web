import Link from 'next/link'

import { cn, avatarColor } from '@/lib/utils'
import type { Artist } from '@/lib/types'

interface ArtistRailProps {
  artists: Artist[]
}

export function ArtistRail({ artists }: ArtistRailProps) {
  return (
    <ul className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10'>
      {artists.map((artist) => (
        <li key={artist.id}>
          <ArtistTile artist={artist} />
        </li>
      ))}
    </ul>
  )
}

function ArtistTile({ artist }: { artist: Artist }) {
  const bg = avatarColor(artist.name)
  const initial = artist.name.replace(/^the\s+/i, '')[0]?.toUpperCase() ?? '?'

  return (
    <Link href={`/artist/${artist.slug}`} className='block group'>
      <div
        className={cn(
          'aspect-square border border-border flex items-center justify-center mb-4 group-hover:border-cream-dim transition-colors duration-200',
          bg
        )}
      >
        <span className='font-serif font-black text-cream/95 leading-none text-[clamp(2rem,5vw,3.5rem)] select-none'>
          {initial}
        </span>
      </div>
      <p className='font-serif font-bold text-cream uppercase tracking-wide truncate group-hover:text-rust transition-colors duration-150 text-[clamp(0.85rem,1.2vw,0.95rem)]'>
        {artist.name}
      </p>
      <p className='font-sans text-[0.6rem] tracking-[0.2em] uppercase text-cream-dim mt-1 truncate'>
        {artist.genres[0]}
      </p>
    </Link>
  )
}
