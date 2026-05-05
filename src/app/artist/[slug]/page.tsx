import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { AlbumRow } from '@/components/content/AlbumRow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Avatar } from '@/components/ui/Avatar'

import { getArtistBySlug, getArtist } from '@/lib/mock/artists'
import { getAlbumsByArtist } from '@/lib/mock/albums'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArtistPage({ params }: PageProps) {
  const { slug } = await params
  const artist = getArtistBySlug(slug)
  if (!artist) notFound()

  const discography = getAlbumsByArtist(artist.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav />

      <header className='px-6 md:px-12 py-14 md:py-20 border-b border-border'>
        <div className='flex flex-col md:flex-row md:items-end gap-10 md:gap-16'>
          <div className='flex-1 min-w-0'>
            <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5'>
              ARTIST
              {artist.formedYear && ` ·  EST. ${artist.formedYear}`}
              {artist.origin && `  ·  ${artist.origin.toUpperCase()}`}
            </p>

            <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-6 text-[clamp(3rem,9vw,7rem)]'>
              {artist.name.toUpperCase()}
            </h1>

            <p className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mb-8'>
              {artist.genres.slice(0, 4).join('  ·  ')}
            </p>

            <p className='font-serif italic text-cream-dim leading-relaxed max-w-2xl text-[clamp(0.95rem,1.4vw,1.15rem)]'>
              {artist.bio}
            </p>
          </div>

          <Avatar name={artist.name} size='xl' />
        </div>
      </header>

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <SectionHeading label='DISCOGRAPHY' />
        {discography.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NO ALBUMS LOGGED YET.
          </p>
        ) : (
          <ol>
            {discography.map((album) => (
              <AlbumRow key={album.id} album={album} />
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}
