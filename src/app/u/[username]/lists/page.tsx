import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { ListPreview } from '@/components/content/ListPreview'

import { getUserByUsername } from '@/lib/mock/users'
import { getListsByUser } from '@/lib/mock/lists'

import { ProfileMasthead } from '../_components/ProfileMasthead'
import { ProfileTabs } from '../_components/ProfileTabs'

interface PageProps {
  params: Promise<{ username: string }>
}

export default async function UserListsPage({ params }: PageProps) {
  const { username } = await params
  const user = getUserByUsername(username)
  if (!user) notFound()

  const userLists = getListsByUser(user.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='profile' />
      <ProfileMasthead user={user} />
      <ProfileTabs username={username} active='lists' />

      <section className='px-6 md:px-12 py-14 max-w-4xl'>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-10'>
          {userLists.length} {userLists.length === 1 ? 'LIST' : 'LISTS'}
        </p>

        {userLists.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim'>
            NO LISTS YET.
          </p>
        ) : (
          <div>
            {userLists.map((list) => (
              <ListPreview key={list.id} list={list} author={user} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
