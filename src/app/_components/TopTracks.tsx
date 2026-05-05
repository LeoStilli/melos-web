import Link from 'next/link'

import { AlbumCover } from '@/components/ui/AlbumCover'
import { albums, getAlbumTracks } from '@/lib/mock/albums'
import { formatRank, formatDuration, formatScore } from '@/lib/utils'

export function TopTracks() {
  const tracks = albums
    .flatMap((album) => getAlbumTracks(album.id).map((t) => ({ ...t, album })))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)

  return (
    <ol className='grid grid-cols-1 lg:grid-cols-2 gap-x-12'>
      {tracks.map((track, i) => (
        <li key={track.id} className='flex items-center gap-4 py-4 border-b border-border group'>
          <span className='font-sans text-xs tabular-nums text-cream-dim w-7 flex-shrink-0 group-hover:text-rust transition-colors duration-150'>
            {formatRank(i + 1)}
          </span>

          <Link href={`/album/${track.album.slug}`} className='flex-shrink-0'>
            <AlbumCover title={track.album.title} size='sm' />
          </Link>

          <div className='flex-1 min-w-0'>
            <Link
              href={`/album/${track.album.slug}`}
              className='block font-serif text-cream truncate group-hover:text-rust transition-colors duration-150 text-[0.95rem] leading-tight'
            >
              {track.title}
            </Link>
            <p className='font-sans text-cream-dim mt-0.5 truncate text-[0.65rem] tracking-[0.15em] uppercase'>
              {track.album.artistName}  ·  {track.album.title}
            </p>
          </div>

          <span className='font-serif font-black tabular-nums text-cream-dim text-sm flex-shrink-0 w-10 text-right'>
            {formatScore(track.score)}
          </span>
          <span className='font-sans tabular-nums text-cream-dim flex-shrink-0 text-[0.7rem] w-10 text-right hidden sm:inline'>
            {formatDuration(track.durationMs)}
          </span>
        </li>
      ))}
    </ol>
  )
}
