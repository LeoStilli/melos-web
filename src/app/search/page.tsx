import { TopNav } from '@/components/nav/TopNav'
import { AlbumRow } from '@/components/content/AlbumRow'
import { UserRow } from '@/components/content/UserRow'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { albums } from '@/lib/mock/albums'
import { artists, getArtistBySlug } from '@/lib/mock/artists'
import { users, isFollowing, CURRENT_USER_ID } from '@/lib/mock/users'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = (q ?? '').trim().toLowerCase()

  const matchingAlbums = query
    ? albums.filter(
        (a) =>
          a.title.toLowerCase().includes(query) || a.artistName.toLowerCase().includes(query)
      )
    : albums.slice(0, 6)

  const matchingArtists = query
    ? artists.filter((a) => a.name.toLowerCase().includes(query))
    : []

  const matchingUsers = query
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.displayName.toLowerCase().includes(query)
      )
    : users.slice(0, 5)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='search' />

      <header className='px-6 md:px-12 py-12 border-b border-border'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-3'>
          SEARCH
        </p>
        <form action='/search' method='get'>
          <input
            type='search'
            name='q'
            defaultValue={q}
            placeholder='Albums, artists, listeners...'
            className='w-full max-w-3xl bg-transparent font-serif italic text-cream placeholder:text-cream-dim border-b border-border focus:border-rust focus:outline-none py-3 text-[clamp(1.25rem,3vw,2rem)]'
          />
        </form>
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
        <section className='px-6 md:px-12 py-12 lg:border-r lg:border-border'>
          <SectionHeading label={query ? 'ALBUMS' : 'POPULAR ALBUMS'} />
          {matchingAlbums.length === 0 ? (
            <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
              NO ALBUMS MATCH "{query}"
            </p>
          ) : (
            <ol>
              {matchingAlbums.slice(0, 8).map((album) => (
                <AlbumRow key={album.id} album={album} />
              ))}
            </ol>
          )}

          {matchingArtists.length > 0 && (
            <div className='mt-12'>
              <SectionHeading label='ARTISTS' />
              <ul>
                {matchingArtists.map((artist) => (
                  <li key={artist.id} className='py-4 border-b border-border'>
                    <a
                      href={`/artist/${artist.slug}`}
                      className='font-serif font-bold text-cream uppercase tracking-wide hover:text-rust transition-colors duration-150 text-[clamp(1rem,1.6vw,1.2rem)]'
                    >
                      {artist.name}
                    </a>
                    <p className='font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim mt-1'>
                      {artist.genres.slice(0, 3).join('  ·  ')}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className='px-6 md:px-12 py-12'>
          <SectionHeading label={query ? 'LISTENERS' : 'NOTABLE LISTENERS'} />
          {matchingUsers.length === 0 ? (
            <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
              NO LISTENERS MATCH "{query}"
            </p>
          ) : (
            <div>
              {matchingUsers.map((u) => (
                <UserRow
                  key={u.id}
                  user={u}
                  showFollowButton={u.id !== CURRENT_USER_ID}
                  isFollowing={isFollowing(CURRENT_USER_ID, u.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
