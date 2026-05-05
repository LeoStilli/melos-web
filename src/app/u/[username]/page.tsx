import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { ReviewCard } from '@/components/content/ReviewCard'
import { ListPreview } from '@/components/content/ListPreview'
import { SectionHeading } from '@/components/ui/SectionHeading'

import { getUserByUsername, getUser } from '@/lib/mock/users'
import { getReviewsByUser, withContext } from '@/lib/mock/reviews'
import { getListsByUser } from '@/lib/mock/lists'

import { ProfileMasthead } from './_components/ProfileMasthead'
import { ProfileTabs } from './_components/ProfileTabs'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params
  const user = getUserByUsername(username)
  if (!user) notFound()

  const recentReviews = getReviewsByUser(user.id).slice(0, 3)
  const recentLists = getListsByUser(user.id).slice(0, 3)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='profile' />
      <ProfileMasthead user={user} />
      <ProfileTabs username={username} active='overview' />

      <div className='grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0'>
        <section className='px-6 md:px-12 py-14 lg:border-r lg:border-border'>
          <SectionHeading
            label='RECENT REVIEWS'
            href={recentReviews.length > 0 ? `/u/${username}/reviews` : undefined}
          />
          {recentReviews.length === 0 ? (
            <EmptyState label='No reviews yet.' />
          ) : (
            <div>
              {recentReviews.map((r) => {
                const ctx = withContext(r)
                if (!ctx) return null
                return <ReviewCard key={r.id} review={ctx} />
              })}
            </div>
          )}
        </section>

        <aside className='px-6 md:px-12 py-14'>
          <SectionHeading
            label='LISTS'
            href={recentLists.length > 0 ? `/u/${username}/lists` : undefined}
          />
          {recentLists.length === 0 ? (
            <EmptyState label='No lists yet.' />
          ) : (
            <div>
              {recentLists.map((list) => {
                const author = getUser(list.userId)
                if (!author) return null
                return <ListPreview key={list.id} list={list} author={author} />
              })}
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim py-8'>
      {label}
    </p>
  )
}
