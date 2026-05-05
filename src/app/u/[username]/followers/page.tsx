import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { UserRow } from '@/components/cards/UserRow'

import { getUserByUsername, getFollowers, isFollowing } from '@/lib/mock/users'
import { requireCurrentUser } from '@/lib/auth/current-user'

import { ProfileMasthead } from '../_components/ProfileMasthead'
import { ProfileTabs } from '../_components/ProfileTabs'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function FollowersPage({ params }: PageProps) {
  const me = await requireCurrentUser()
  const { username } = await params
  const user = getUserByUsername(username)
  if (!user) notFound()

  const followers = getFollowers(user.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='profile' />
      <ProfileMasthead user={user} />
      <ProfileTabs username={username} active='followers' />

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-10'>
          {followers.length} {followers.length === 1 ? 'FOLLOWER' : 'FOLLOWERS'}
        </p>

        {followers.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NO FOLLOWERS YET.
          </p>
        ) : (
          <div>
            {followers.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                showFollowButton={u.id !== me.id}
                isFollowing={isFollowing(me.id, u.id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
