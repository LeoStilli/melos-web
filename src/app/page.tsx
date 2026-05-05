import { TopNav } from '@/components/nav/TopNav'
import { ReviewCard } from '@/components/content/ReviewCard'
import { AlbumRow } from '@/components/content/AlbumRow'
import { ListPreview } from '@/components/content/ListPreview'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { albums } from '@/lib/mock/albums'
import { reviews, withContext } from '@/lib/mock/reviews'
import { getRecentLists } from '@/lib/mock/lists'
import { getUser } from '@/lib/mock/users'

import { HomeFeed } from './_components/HomeFeed'

export default function HomePage() {
  const featured = withContext(reviews[0])
  const topAlbums = [...albums].sort((a, b) => b.communityScore - a.communityScore).slice(0, 6)
  const featuredLists = getRecentLists(3)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='home' />

      <main>
        {featured && (
          <section className='px-6 md:px-12 border-b border-border'>
            <ReviewCard review={featured} variant='featured' />
          </section>
        )}

        <div className='grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0 lg:gap-16'>
          <section className='px-6 md:px-12 py-14 lg:border-r lg:border-border'>
            <SectionHeading label='FROM PEOPLE YOU FOLLOW' href='/activity' />
            <HomeFeed />
          </section>

          <aside className='px-6 md:px-12 py-14 space-y-14'>
            <section>
              <SectionHeading label='TOP THIS WEEK' href='/discover' />
              <ol>
                {topAlbums.map((album, i) => (
                  <AlbumRow key={album.id} album={album} rank={i + 1} />
                ))}
              </ol>
            </section>

            <section>
              <SectionHeading label="EDITOR'S PICKS" href='/lists' />
              <div>
                {featuredLists.map((list) => {
                  const author = getUser(list.userId)
                  if (!author) return null
                  return <ListPreview key={list.id} list={list} author={author} />
                })}
              </div>
            </section>
          </aside>
        </div>

        <footer className='border-t border-border px-6 md:px-12 py-8'>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim'>
            MELOS  ·  RATINGS  ·  REVIEWS  ·  LISTS  ·  DISCOVERY
          </p>
        </footer>
      </main>
    </div>
  )
}
