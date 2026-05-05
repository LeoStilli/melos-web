import Link from 'next/link'

import { AlbumCover } from '@/components/ui/AlbumCover'
import { Score } from '@/components/ui/Score'
import { formatLongDuration } from '@/lib/utils'
import type { Album, Artist } from '@/lib/types'

interface AlbumMastheadProps {
  album: Album
  artist: Artist | undefined
}

export function AlbumMasthead({ album, artist }: AlbumMastheadProps) {
  return (
    <header className='px-6 md:px-12 py-14 md:py-20 border-b border-border'>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_1.7fr] gap-10 md:gap-16 items-center'>
        <AlbumCover title={album.title} artistName={album.artistName} size='hero' className='max-w-md mx-auto md:mx-0' />

        <div>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5'>
            ALBUM  ·  {album.releaseYear}
          </p>

          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-4 text-[clamp(2.75rem,7vw,5.5rem)]'>
            {album.title.toUpperCase()}
          </h1>

          {artist ? (
            <Link
              href={`/artist/${artist.slug}`}
              className='font-serif italic text-cream-dim hover:text-rust transition-colors duration-150 inline-block mb-7 text-[clamp(1.05rem,1.6vw,1.25rem)]'
            >
              by {album.artistName}
            </Link>
          ) : (
            <p className='font-serif italic text-cream-dim mb-7 text-[clamp(1.05rem,1.6vw,1.25rem)]'>
              by {album.artistName}
            </p>
          )}

          <div className='flex flex-wrap items-baseline gap-x-10 gap-y-5 mb-8'>
            <Score value={album.communityScore} label='COMMUNITY' size='lg' />
            <Score value={album.verifiedScore} label='VERIFIED' size='lg' verified />
            <div className='flex flex-col items-start'>
              <span className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mb-1'>
                REVIEWS
              </span>
              <span className='font-serif font-black tabular-nums text-cream text-3xl leading-none'>
                {album.reviewCount.toLocaleString()}
              </span>
            </div>
          </div>

          {album.description && (
            <p className='font-serif italic text-cream-dim leading-relaxed max-w-2xl mb-8 text-[clamp(0.95rem,1.4vw,1.1rem)]'>
              {album.description}
            </p>
          )}

          <div className='flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim mb-8'>
            <span>{album.trackCount} TRACKS</span>
            <span className='text-border'>·</span>
            <span>{formatLongDuration(album.durationMs)}</span>
            <span className='text-border'>·</span>
            <span>{album.genres.slice(0, 2).join('  ·  ')}</span>
          </div>

          <button
            type='button'
            className='font-sans text-[0.65rem] tracking-[0.25em] uppercase border border-rust bg-rust text-cream px-6 py-3 hover:bg-rust-dim hover:border-rust-dim transition-colors duration-150 cursor-pointer'
          >
            WRITE A REVIEW
          </button>
        </div>
      </div>
    </header>
  )
}
