import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { ReviewCard } from '@/components/content/ReviewCard'

import { getUserByUsername } from '@/lib/mock/users'
import { getReviewsByUser, withContext } from '@/lib/mock/reviews'

import { ProfileMasthead } from '../_components/ProfileMasthead'
import { ProfileTabs } from '../_components/ProfileTabs'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function UserReviewsPage({ params }: PageProps) {
  const { username } = await params
  const user = getUserByUsername(username)
  if (!user) notFound()

  const userReviews = getReviewsByUser(user.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='profile' />
      <ProfileMasthead user={user} />
      <ProfileTabs username={username} active='reviews' />

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-10'>
          {userReviews.length} {userReviews.length === 1 ? 'REVIEW' : 'REVIEWS'}
        </p>

        {userReviews.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NO REVIEWS YET.
          </p>
        ) : (
          <div>
            {userReviews.map((r) => {
              const ctx = withContext(r)
              if (!ctx) return null
              return <ReviewCard key={r.id} review={ctx} />
            })}
          </div>
        )}
      </section>
    </div>
  )
}
