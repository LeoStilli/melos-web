import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { UserRow } from '@/components/cards/UserRow'

import { getUserByUsername, getFollowing, isFollowing, CURRENT_USER_ID } from '@/lib/mock/users'

import { ProfileMasthead } from '../_components/ProfileMasthead'
import { ProfileTabs } from '../_components/ProfileTabs'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function FollowingPage({ params }: PageProps) {
  const { username } = await params
  const user = getUserByUsername(username)
  if (!user) notFound()

  const following = getFollowing(user.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='profile' />
      <ProfileMasthead user={user} />
      <ProfileTabs username={username} active='following' />

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-10'>
          FOLLOWING {following.length}
        </p>

        {following.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NOT FOLLOWING ANYONE YET.
          </p>
        ) : (
          <div>
            {following.map((u) => (
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
  )
}
