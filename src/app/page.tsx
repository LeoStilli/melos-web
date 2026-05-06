import { TopNav } from '@/components/nav/TopNav'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { UserRow } from '@/components/cards/UserRow'
import { ListPreview } from '@/components/cards/ListPreview'

import { albums } from '@/lib/mock/albums'
import { artists } from '@/lib/mock/artists'
import { users, isFollowing, getUser } from '@/lib/mock/users'
import { getRecentLists } from '@/lib/mock/lists'
import { requireCurrentUser } from '@/lib/auth/current-user'

import { Hero } from './_components/Hero'
import { GenreGrid } from './_components/GenreGrid'
import { ArtistRail } from './_components/ArtistRail'
import { TopTracks } from './_components/TopTracks'
import { HomeFeed } from './_components/HomeFeed'
import { MarqueeStrip } from './_components/MarqueeStrip'
import { RevealSection } from './_components/RevealSection'
import { TrendingAlbums } from './_components/TrendingAlbums'
import { Footer } from './_components/Footer'

export default async function HomePage() {
  const me = await requireCurrentUser()
  const genreCounts = new Map<string, number>()
  for (const album of albums) {
    for (const g of album.genres) {
      genreCounts.set(g, (genreCounts.get(g) ?? 0) + 1)
    }
  }
  const genres = Array.from(genreCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([genre, count]) => ({ genre, count }))

  const trendingAlbums = [...albums]
    .sort((a, b) => b.communityScore - a.communityScore)
    .slice(0, 6)

  const featuredArtists = artists.slice(0, 6)

  const peopleToFollow = users
    .filter((u) => u.id !== me.id && !isFollowing(me.id, u.id))
    .slice(0, 4)

  const featuredLists = getRecentLists(3)

  const marqueeArtists = artists.slice(0, 12).map((a) => a.name)

  return (
    <div className='min-h-screen bg-ink relative'>
      <TopNav active='home' />

      <Hero />

      <MarqueeStrip items={marqueeArtists} variant='serif' direction='left' />

      <RevealSection>
        <SectionHeading label='BROWSE BY GENRE' />
        <GenreGrid genres={genres} />
      </RevealSection>

      <RevealSection>
        <SectionHeading label='TRENDING ALBUMS' href='/discover' />
        <TrendingAlbums albums={trendingAlbums} />
      </RevealSection>

      <MarqueeStrip
        items={['NEW REVIEWS', 'NEW LISTS', 'NEW LISTENERS', 'NEW SOUNDS', 'NEW STORIES', 'NEW SCORES']}
        variant='sans'
        direction='right'
      />

      <RevealSection>
        <SectionHeading label='ARTISTS WORTH KNOWING' />
        <ArtistRail artists={featuredArtists} />
      </RevealSection>

      <RevealSection>
        <SectionHeading label='SONGS RIGHT NOW' />
        <TopTracks />
      </RevealSection>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-border'>
        <RevealSection className='lg:border-r lg:border-border' border={false}>
          <SectionHeading label='CURATED LISTS' href='/lists' />
          <div>
            {featuredLists.map((list) => {
              const author = getUser(list.userId)
              if (!author) return null
              return <ListPreview key={list.id} list={list} author={author} />
            })}
          </div>
        </RevealSection>

        <RevealSection border={false}>
          <SectionHeading label='LISTENERS TO FOLLOW' />
          <div>
            {peopleToFollow.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                showFollowButton
                isFollowing={isFollowing(me.id, u.id)}
              />
            ))}
          </div>
        </RevealSection>
      </div>

      <RevealSection border={false}>
        <SectionHeading label='RECENT ACTIVITY' />
        <HomeFeed />
      </RevealSection>

      <Footer />
    </div>
  )
}
