import { TopNav } from '@/components/nav/TopNav'
import { AlbumRow } from '@/components/cards/AlbumRow'
import { ReviewCard } from '@/components/cards/ReviewCard'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { albums } from '@/lib/mock/albums'
import { reviews, withContext } from '@/lib/mock/reviews'

export default function DiscoverPage() {
  const verifiedTop = [...albums]
    .sort((a, b) => b.verifiedScore - a.verifiedScore)
    .slice(0, 8)

  const recent = [...albums]
    .sort((a, b) => b.releaseYear - a.releaseYear)
    .slice(0, 6)

  const featuredReviews = reviews
    .filter((r) => r.isVerified)
    .slice(0, 4)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='discover' />

      <header className='px-6 md:px-12 py-14 border-b border-border'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-4'>
          DISCOVER
        </p>
        <h1 className='font-serif font-black text-cream leading-none tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]'>
          WHAT'S WORTH LISTENING TO
        </h1>
        <p className='font-serif italic text-cream-dim mt-6 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)]'>
          Aggregated from verified reviewers and the wider community. Updated continuously.
        </p>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-0'>
        <section className='px-6 md:px-12 py-14 lg:border-r lg:border-border'>
          <SectionHeading label='HIGHEST RATED  ·  VERIFIED' />
          <ol>
            {verifiedTop.map((album, i) => (
              <AlbumRow key={album.id} album={album} rank={i + 1} />
            ))}
          </ol>

          <div className='mt-14'>
            <SectionHeading label='RECENT RELEASES' />
            <ol>
              {recent.map((album) => (
                <AlbumRow key={album.id} album={album} />
              ))}
            </ol>
          </div>
        </section>

        <section className='px-6 md:px-12 py-14'>
          <SectionHeading label='VERIFIED REVIEWS' />
          <div>
            {featuredReviews.map((r) => {
              const ctx = withContext(r)
              if (!ctx) return null
              return <ReviewCard key={r.id} review={ctx} />
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
