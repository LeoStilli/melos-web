import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { ReviewCard } from '@/components/cards/ReviewCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { getAlbumBySlug, getAlbumTracks } from '@/lib/mock/albums'
import { getArtist } from '@/lib/mock/artists'
import { getReviewsByAlbum, withContext } from '@/lib/mock/reviews'

import { AlbumMasthead } from './_components/AlbumMasthead'
import { Tracklist } from './_components/Tracklist'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function AlbumPage({ params }: PageProps) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) notFound()

  const artist = getArtist(album.artistId)
  const tracks = getAlbumTracks(album.id)
  const albumReviews = getReviewsByAlbum(album.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav />
      <AlbumMasthead album={album} artist={artist} />

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0'>
        <section className='px-6 md:px-12 py-14 lg:border-r lg:border-border'>
          <SectionHeading label='TRACKLIST' />
          <Tracklist tracks={tracks} />
        </section>

        <section className='px-6 md:px-12 py-14'>
          <SectionHeading label={`${albumReviews.length} ${albumReviews.length === 1 ? 'REVIEW' : 'REVIEWS'}`} />
          {albumReviews.length === 0 ? (
            <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim py-8'>
              BE THE FIRST TO REVIEW THIS RECORD.
            </p>
          ) : (
            <div>
              {albumReviews.map((r) => {
                const ctx = withContext(r)
                if (!ctx) return null
                return <ReviewCard key={r.id} review={ctx} />
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
