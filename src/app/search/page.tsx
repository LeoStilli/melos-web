import Link from 'next/link'

import { TopNav } from '@/components/nav/TopNav'
import { SearchBar } from '@/components/ui/SearchBar'
import { AlbumRow } from '@/components/content/AlbumRow'
import { UserRow } from '@/components/content/UserRow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AlbumCover } from '@/components/ui/AlbumCover'

import { albums, getAlbumTracks } from '@/lib/mock/albums'
import { artists } from '@/lib/mock/artists'
import { users, isFollowing, CURRENT_USER_ID } from '@/lib/mock/users'
import { formatDuration } from '@/lib/utils'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = (q ?? '').trim().toLowerCase()
  const hasQuery = query.length > 0

  const matchingAlbums = hasQuery
    ? albums.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.artistName.toLowerCase().includes(query) ||
          a.genres.some((g) => g.toLowerCase().includes(query))
      )
    : albums.slice(0, 6)

  const matchingArtists = hasQuery
    ? artists.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.genres.some((g) => g.toLowerCase().includes(query)) ||
          (a.origin?.toLowerCase().includes(query) ?? false)
      )
    : []

  const matchingTracks = hasQuery
    ? albums
        .flatMap((album) => getAlbumTracks(album.id).map((t) => ({ ...t, album })))
        .filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            t.album.artistName.toLowerCase().includes(query)
        )
        .slice(0, 12)
    : []

  const matchingUsers = hasQuery
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.displayName.toLowerCase().includes(query)
      )
    : users.slice(0, 5)

  const totalResults = matchingAlbums.length + matchingArtists.length + matchingTracks.length + matchingUsers.length

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='search' />

      <header className='px-6 md:px-12 py-12 border-b border-border'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-4'>
          {hasQuery ? `${totalResults} ${totalResults === 1 ? 'RESULT' : 'RESULTS'}` : 'SEARCH'}
        </p>
        {hasQuery ? (
          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-8 text-[clamp(2rem,5vw,3.5rem)]'>
            "{q}"
          </h1>
        ) : (
          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-8 text-[clamp(2rem,5vw,3.5rem)]'>
            FIND ANYTHING.
          </h1>
        )}
        <SearchBar defaultValue={q} size='lg' className='max-w-3xl' />
      </header>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-0'>
        <section className='px-6 md:px-12 py-12 lg:border-r lg:border-border'>
          <SectionHeading label={hasQuery ? `ALBUMS (${matchingAlbums.length})` : 'POPULAR ALBUMS'} />
          {matchingAlbums.length === 0 ? (
            <Empty label={`NO ALBUMS MATCH "${q}"`} />
          ) : (
            <ol>
              {matchingAlbums.slice(0, 10).map((album) => (
                <AlbumRow key={album.id} album={album} />
              ))}
            </ol>
          )}

          {matchingArtists.length > 0 && (
            <div className='mt-14'>
              <SectionHeading label={`ARTISTS (${matchingArtists.length})`} />
              <ul>
                {matchingArtists.map((artist) => (
                  <li key={artist.id} className='py-4 border-b border-border'>
                    <Link
                      href={`/artist/${artist.slug}`}
                      className='font-serif font-bold text-cream uppercase tracking-wide hover:text-rust transition-colors duration-150 text-[clamp(1rem,1.6vw,1.2rem)]'
                    >
                      {artist.name}
                    </Link>
                    <p className='font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim mt-1'>
                      {artist.genres.slice(0, 3).join('  ·  ')}
                      {artist.origin && ` · ${artist.origin.toUpperCase()}`}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {matchingTracks.length > 0 && (
            <div className='mt-14'>
              <SectionHeading label={`SONGS (${matchingTracks.length})`} />
              <ol>
                {matchingTracks.map((track) => (
                  <li key={track.id} className='flex items-center gap-4 py-3 border-b border-border group'>
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
                        {track.album.artistName}
                      </p>
                    </div>
                    <span className='font-sans tabular-nums text-cream-dim flex-shrink-0 text-[0.7rem]'>
                      {formatDuration(track.durationMs)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </section>

        <section className='px-6 md:px-12 py-12'>
          <SectionHeading label={hasQuery ? `LISTENERS (${matchingUsers.length})` : 'NOTABLE LISTENERS'} />
          {matchingUsers.length === 0 ? (
            <Empty label={`NO LISTENERS MATCH "${q}"`} />
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

function Empty({ label }: { label: string }) {
  return (
    <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim py-8'>
      {label}
    </p>
  )
}
