import Link from 'next/link'

import { AlbumCover } from '@/components/ui/AlbumCover'
import { formatDuration } from '@/lib/utils/format'
import type { Track } from '@/lib/types/album'
import type { Album } from '@/lib/types/album'

interface TrackRowProps {
  track: Track
  album: Album
}

export function TrackRow({ track, album }: TrackRowProps) {
  return (
    <li className='flex items-center gap-4 py-4 border-b border-border group'>
      <Link href={`/album/${album.slug}`} className='flex-shrink-0'>
        <AlbumCover title={album.title} size='sm' />
      </Link>

      <div className='flex-1 min-w-0'>
        <Link
          href={`/album/${album.slug}`}
          className='block font-serif text-cream truncate group-hover:text-rust transition-colors duration-150 text-[0.95rem] leading-tight'
        >
          {track.title}
        </Link>
        <p className='font-sans text-cream-dim mt-0.5 truncate text-[0.65rem] tracking-[0.15em] uppercase'>
          {album.artistName}  ·  {album.title}
        </p>
      </div>

      <span className='font-sans tabular-nums text-cream-dim flex-shrink-0 text-[0.7rem]'>
        {formatDuration(track.durationMs)}
      </span>
    </li>
  )
}
