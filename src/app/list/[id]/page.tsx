import { notFound } from 'next/navigation'
import Link from 'next/link'

import { TopNav } from '@/components/nav/TopNav'
import { Avatar } from '@/components/ui/Avatar'
import { AlbumCover } from '@/components/ui/AlbumCover'

import { getList, getListItems } from '@/lib/mock/lists'
import { getUser } from '@/lib/mock/users'
import { getAlbum } from '@/lib/mock/albums'
import { formatRank } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ListPage({ params }: PageProps) {
  const { id } = await params
  const list = getList(id)
  if (!list) notFound()

  const author = getUser(list.userId)
  const items = getListItems(list.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='lists' />

      <header className='px-6 md:px-12 py-14 md:py-20 border-b border-border max-w-5xl'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-6'>
          A CURATED LIST  ·  {list.itemCount} {list.itemCount === 1 ? 'ENTRY' : 'ENTRIES'}
        </p>

        <h1 className='font-serif font-black text-cream leading-[0.95] tracking-tight mb-7 text-[clamp(2.5rem,6vw,5rem)]'>
          {list.title.toUpperCase()}
        </h1>

        {list.description && (
          <p className='font-serif italic text-cream-dim leading-relaxed mb-8 text-[clamp(1rem,1.5vw,1.2rem)]'>
            {list.description}
          </p>
        )}

        {author && (
          <div className='flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase'>
            <Avatar name={author.displayName} size='sm' />
            <Link
              href={`/u/${author.username}`}
              className='text-cream hover:text-rust transition-colors duration-150'
            >
              BY {author.displayName}
            </Link>
            {author.isVerified && <span className='text-rust'>✓</span>}
          </div>
        )}
      </header>

      <section className='px-6 md:px-12 py-12 max-w-5xl'>
        {items.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim py-8'>
            THIS LIST IS EMPTY.
          </p>
        ) : (
          <ol>
            {items.map((item) => {
              const album = item.targetType === 'album' ? getAlbum(item.targetId) : undefined
              if (!album) return null

              return (
                <li key={item.rank} className='flex items-start gap-6 md:gap-10 py-7 border-b border-border group'>
                  <span className='font-serif font-black tabular-nums text-cream-dim text-4xl md:text-5xl leading-none w-12 md:w-16 flex-shrink-0 group-hover:text-rust transition-colors duration-150'>
                    {formatRank(item.rank)}
                  </span>

                  <Link href={`/album/${album.slug}`} className='flex-shrink-0'>
                    <AlbumCover title={album.title} artistName={album.artistName} size='lg' />
                  </Link>

                  <div className='flex-1 min-w-0 pt-2'>
                    <Link
                      href={`/album/${album.slug}`}
                      className='font-serif font-bold text-cream uppercase tracking-wide leading-tight hover:text-rust transition-colors duration-150 text-[clamp(1.05rem,1.8vw,1.3rem)]'
                    >
                      {album.title}
                    </Link>
                    <p className='font-sans text-cream-dim mt-1.5 truncate text-[0.7rem] tracking-[0.2em] uppercase'>
                      {album.artistName}  ·  {album.releaseYear}
                    </p>
                    {item.note && (
                      <p className='font-serif italic text-cream-dim mt-4 leading-relaxed text-[0.95rem]'>
                        "{item.note}"
                      </p>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        )}
      </section>
    </div>
  )
}
