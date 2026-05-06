import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import { Magnetic } from '@/lib/motion/Magnetic'
import { getCurrentUser } from '@/lib/auth/current-user'
import { signOutAction } from '@/lib/actions/auth'
import { getConversationsForUser } from '@/lib/mock/messages'

import { NavLink } from './NavLink'
import { NavShell } from './NavShell'

interface TopNavProps {
  active?: 'home' | 'discover' | 'lists' | 'search' | 'messages' | 'profile' | null
}

export async function TopNav({ active = null }: TopNavProps) {
  const me = await getCurrentUser()
  const conversations = me ? getConversationsForUser(me.id) : []
  const unread = conversations.reduce((acc, c) => acc + c.unreadCount, 0)

  return (
    <NavShell>
      <nav className='flex items-center justify-between px-6 md:px-12 py-5'>
        <div className='flex items-center gap-10'>
          <Magnetic strength={0.4}>
            <Link
              href='/'
              data-cursor='link'
              className='font-serif font-black text-base tracking-[0.3em] uppercase text-cream hover:text-rust transition-colors duration-200'
            >
              MELOS
            </Link>
          </Magnetic>

          <div className='hidden md:flex items-center gap-8'>
            <NavLink href='/' label='HOME' active={active === 'home'} />
            <NavLink href='/discover' label='DISCOVER' active={active === 'discover'} />
            <NavLink href='/lists' label='LISTS' active={active === 'lists'} />
          </div>
        </div>

        <div className='flex items-center gap-7'>
          <NavLink href='/search' label='SEARCH' active={active === 'search'} className='hidden sm:flex' />

          <NavLink href='/messages' label='MESSAGES' active={active === 'messages'}>
            {unread > 0 && (
              <span className='ml-1.5 font-serif font-black text-rust tabular-nums normal-case'>
                {unread}
              </span>
            )}
          </NavLink>

          <form action={signOutAction}>
            <Magnetic strength={0.3}>
              <button
                type='submit'
                data-cursor='link'
                className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim hover:text-rust transition-colors duration-200 cursor-pointer'
              >
                SIGN OUT
              </button>
            </Magnetic>
          </form>

          {me && (
            <Magnetic strength={0.3}>
              <Link href={`/u/${me.username}`} data-cursor='view' data-cursor-label='PROFILE' className='flex items-center'>
                <Avatar
                  name={me.displayName}
                  size='sm'
                  className={active === 'profile' ? 'ring-2 ring-rust ring-offset-2 ring-offset-ink' : ''}
                />
              </Link>
            </Magnetic>
          )}
        </div>
      </nav>
    </NavShell>
  )
}
