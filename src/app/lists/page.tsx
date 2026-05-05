import { TopNav } from '@/components/nav/TopNav'
import { ListPreview } from '@/components/content/ListPreview'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { lists } from '@/lib/mock/lists'
import { getUser } from '@/lib/mock/users'

export default function ListsIndexPage() {
  const sorted = [...lists].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='lists' />

      <header className='px-6 md:px-12 py-14 border-b border-border'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-4'>
          LISTS
        </p>
        <h1 className='font-serif font-black text-cream leading-none tracking-tight text-[clamp(2.75rem,7vw,5.5rem)]'>
          CURATED RANKINGS
        </h1>
        <p className='font-serif italic text-cream-dim mt-6 max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)]'>
          Working canons. Personal histories. Living documents from listeners across the network.
        </p>
      </header>

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <SectionHeading label={`${sorted.length} LISTS`} />
        {sorted.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NO LISTS YET.
          </p>
        ) : (
          <div>
            {sorted.map((list) => {
              const author = getUser(list.userId)
              if (!author) return null
              return <ListPreview key={list.id} list={list} author={author} />
            })}
          </div>
        )}
      </section>
    </div>
  )
}
