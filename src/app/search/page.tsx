import { TopNav } from '@/components/nav/TopNav'
import { SearchBar } from '@/components/ui/SearchBar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { AlbumRow } from '@/components/cards/AlbumRow'
import { ArtistRow } from '@/components/cards/ArtistRow'
import { TrackRow } from '@/components/cards/TrackRow'
import { UserRow } from '@/components/cards/UserRow'

import { albums, getAlbumTracks } from '@/lib/mock/albums'
import { artists } from '@/lib/mock/artists'
import { users, isFollowing, CURRENT_USER_ID } from '@/lib/mock/users'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = (q ?? '').trim().toLowerCase()
  const hasQuery = query.length > 0

  const matchingArtists = hasQuery
    ? artists.filter(
        (a) =>
          a.name.toLowerCase().includes(query) ||
          a.genres.some((g) => g.toLowerCase().includes(query)) ||
          (a.origin?.toLowerCase().includes(query) ?? false)
      )
    : []

  const matchingAlbums = hasQuery
    ? albums.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.artistName.toLowerCase().includes(query) ||
          a.genres.some((g) => g.toLowerCase().includes(query))
      )
    : []

  const matchingTracks = hasQuery
    ? albums
        .flatMap((album) => getAlbumTracks(album.id).map((t) => ({ track: t, album })))
        .filter(
          ({ track, album }) =>
            track.title.toLowerCase().includes(query) ||
            album.artistName.toLowerCase().includes(query) ||
            album.title.toLowerCase().includes(query)
        )
        .slice(0, 20)
    : []

  const matchingUsers = hasQuery
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query) ||
          u.displayName.toLowerCase().includes(query)
      )
    : []

  const total = matchingArtists.length + matchingAlbums.length + matchingTracks.length + matchingUsers.length

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='search' />

      <header className='px-6 md:px-12 py-12 md:py-14 border-b border-border'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-4'>
          {hasQuery ? `${total} ${total === 1 ? 'RESULT' : 'RESULTS'}` : 'SEARCH'}
        </p>

        <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-8 text-[clamp(2rem,5vw,3.5rem)]'>
          {hasQuery ? `"${q}"` : 'FIND ANYTHING.'}
        </h1>

        <SearchBar defaultValue={q} size='lg' className='max-w-3xl' />

        {hasQuery && (
          <div className='flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 font-sans text-[0.65rem] tracking-[0.25em] uppercase'>
            <CountChip label='ARTISTS' count={matchingArtists.length} anchor='artists' />
            <CountChip label='ALBUMS' count={matchingAlbums.length} anchor='albums' />
            <CountChip label='SONGS' count={matchingTracks.length} anchor='songs' />
            <CountChip label='LISTENERS' count={matchingUsers.length} anchor='listeners' />
          </div>
        )}
      </header>

      {!hasQuery ? (
        <EmptyState />
      ) : total === 0 ? (
        <NoResults query={q ?? ''} />
      ) : (
        <div className='px-6 md:px-12 py-12 max-w-5xl space-y-16'>
          {matchingArtists.length > 0 && (
            <section id='artists'>
              <SectionHeading label={`ARTISTS  ·  ${matchingArtists.length}`} />
              <ol>
                {matchingArtists.map((artist) => (
                  <ArtistRow key={artist.id} artist={artist} />
                ))}
              </ol>
            </section>
          )}

          {matchingAlbums.length > 0 && (
            <section id='albums'>
              <SectionHeading label={`ALBUMS  ·  ${matchingAlbums.length}`} />
              <ol>
                {matchingAlbums.map((album) => (
                  <AlbumRow key={album.id} album={album} />
                ))}
              </ol>
            </section>
          )}

          {matchingTracks.length > 0 && (
            <section id='songs'>
              <SectionHeading label={`SONGS  ·  ${matchingTracks.length}`} />
              <ol>
                {matchingTracks.map(({ track, album }) => (
                  <TrackRow key={track.id} track={track} album={album} />
                ))}
              </ol>
            </section>
          )}

          {matchingUsers.length > 0 && (
            <section id='listeners'>
              <SectionHeading label={`LISTENERS  ·  ${matchingUsers.length}`} />
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
            </section>
          )}
        </div>
      )}
    </div>
  )
}

interface CountChipProps {
  label: string
  count: number
  anchor: string
}

function CountChip({ label, count, anchor }: CountChipProps) {
  if (count === 0) {
    return (
      <span className='text-cream-dim/40'>
        {label} <span className='font-serif font-black tabular-nums ml-1'>0</span>
      </span>
    )
  }
  return (
    <a href={`#${anchor}`} className='text-cream-dim hover:text-rust transition-colors duration-150'>
      {label} <span className='font-serif font-black tabular-nums text-cream ml-1'>{count}</span>
    </a>
  )
}

function EmptyState() {
  return (
    <div className='px-6 md:px-12 py-16 max-w-3xl'>
      <p className='font-serif italic text-cream-dim leading-relaxed text-[clamp(1rem,1.5vw,1.2rem)]'>
        Type a name, a genre, a track. We'll search across artists, albums, songs, and listeners.
      </p>
      <div className='mt-10 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim'>
        {['Frank Ocean', 'art pop', 'Paranoid', 'Radiohead'].map((q) => (
          <a key={q} href={`/search?q=${encodeURIComponent(q)}`} className='hover:text-rust transition-colors duration-150'>
            → {q}
          </a>
        ))}
      </div>
    </div>
  )
}

function NoResults({ query }: { query: string }) {
  return (
    <div className='px-6 md:px-12 py-16'>
      <p className='font-sans text-xs tracking-[0.25em] uppercase text-cream-dim'>
        NOTHING MATCHES "{query}".
      </p>
      <p className='font-serif italic text-cream-dim mt-4 text-[clamp(0.95rem,1.4vw,1.1rem)] max-w-xl'>
        Try a broader query — an artist name, a genre, or a single track title.
      </p>
    </div>
  )
}
