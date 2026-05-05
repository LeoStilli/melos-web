import { TopNav } from '@/components/nav/TopNav'
import { SearchBar } from '@/components/ui/SearchBar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AlbumRow } from '@/components/cards/AlbumRow'
import { UserRow } from '@/components/cards/UserRow'
import { ListPreview } from '@/components/cards/ListPreview'

import { albums } from '@/lib/mock/albums'
import { artists } from '@/lib/mock/artists'
import { users, isFollowing, getUser } from '@/lib/mock/users'
import { getRecentLists } from '@/lib/mock/lists'
import { requireCurrentUser } from '@/lib/auth/current-user'

import { GenreGrid } from './_components/GenreGrid'
import { ArtistRail } from './_components/ArtistRail'
import { TopTracks } from './_components/TopTracks'
import { HomeFeed } from './_components/HomeFeed'

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

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='home' />

      <section className='border-b border-border px-6 md:px-12 py-14 md:py-20'>
        <p className='font-sans text-rust tracking-[0.3em] uppercase text-xs mb-6'>
          BROWSE THE LIBRARY
        </p>
        <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-10 text-[clamp(2.5rem,7vw,5.5rem)]'>
          FIND SOMETHING<br />WORTH HEARING.
        </h1>
        <SearchBar size='hero' className='max-w-3xl' />
        <div className='flex flex-wrap items-center gap-x-3 gap-y-2 mt-6 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim'>
          <span>TRY:</span>
          {['frank ocean', 'art pop', 'paranoid', 'radiohead', 'indie folk'].map((q) => (
            <a
              key={q}
              href={`/search?q=${encodeURIComponent(q)}`}
              className='hover:text-rust transition-colors duration-150 underline-offset-4 hover:underline'
            >
              {q}
            </a>
          ))}
        </div>
      </section>

      <section className='border-b border-border px-6 md:px-12 py-14'>
        <SectionHeading label='BROWSE BY GENRE' />
        <GenreGrid genres={genres} />
      </section>

      <section className='border-b border-border px-6 md:px-12 py-14'>
        <SectionHeading label='TRENDING ALBUMS' href='/discover' />
        <ol className='grid grid-cols-1 lg:grid-cols-2 gap-x-14'>
          {trendingAlbums.map((album, i) => (
            <AlbumRow key={album.id} album={album} rank={i + 1} />
          ))}
        </ol>
      </section>

      <section className='border-b border-border px-6 md:px-12 py-14'>
        <SectionHeading label='ARTISTS WORTH KNOWING' />
        <ArtistRail artists={featuredArtists} />
      </section>

      <section className='border-b border-border px-6 md:px-12 py-14'>
        <SectionHeading label='SONGS RIGHT NOW' />
        <TopTracks />
      </section>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-border'>
        <section className='px-6 md:px-12 py-14 lg:border-r lg:border-border'>
          <SectionHeading label='CURATED LISTS' href='/lists' />
          <div>
            {featuredLists.map((list) => {
              const author = getUser(list.userId)
              if (!author) return null
              return <ListPreview key={list.id} list={list} author={author} />
            })}
          </div>
        </section>

        <section className='px-6 md:px-12 py-14'>
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
        </section>
      </div>

      <section className='px-6 md:px-12 py-14'>
        <SectionHeading label='RECENT ACTIVITY' />
        <HomeFeed />
      </section>

      <footer className='border-t border-border px-6 md:px-12 py-8'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim'>
          MELOS  ·  RATINGS  ·  REVIEWS  ·  LISTS  ·  DISCOVERY
        </p>
      </footer>
    </div>
  )
}
