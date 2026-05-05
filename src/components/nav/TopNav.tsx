import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import { getCurrentUser } from '@/lib/auth/current-user'
import { signOutAction } from '@/lib/actions/auth'
import { getConversationsForUser } from '@/lib/mock/messages'
import { cn } from '@/lib/utils/cn'

interface TopNavProps {
  active?: 'home' | 'discover' | 'lists' | 'search' | 'messages' | 'profile' | null
}

export async function TopNav({ active = null }: TopNavProps) {
  const me = await getCurrentUser()
  const conversations = me ? getConversationsForUser(me.id) : []
  const unread = conversations.reduce((acc, c) => acc + c.unreadCount, 0)

  return (
    <nav className='flex items-center justify-between px-6 md:px-12 py-5 border-b border-border'>
      <div className='flex items-center gap-10'>
        <Link
          href='/'
          className='font-serif font-black text-base tracking-[0.3em] uppercase text-cream hover:text-rust transition-colors duration-150'
        >
          MELOS
        </Link>

        <div className='hidden md:flex items-center gap-7'>
          <NavLink href='/' label='HOME' active={active === 'home'} />
          <NavLink href='/discover' label='DISCOVER' active={active === 'discover'} />
          <NavLink href='/lists' label='LISTS' active={active === 'lists'} />
        </div>
      </div>

      <div className='flex items-center gap-5'>
        <Link
          href='/search'
          className={cn(
            'hidden sm:block font-sans text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-150',
            active === 'search' ? 'text-cream' : 'text-cream-dim hover:text-cream'
          )}
        >
          SEARCH
        </Link>

        <Link
          href='/messages'
          className={cn(
            'relative font-sans text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-150',
            active === 'messages' ? 'text-cream' : 'text-cream-dim hover:text-cream'
          )}
        >
          MESSAGES
          {unread > 0 && (
            <span className='ml-1.5 font-serif font-black text-rust tabular-nums'>
              {unread}
            </span>
          )}
        </Link>

        <form action={signOutAction}>
          <button
            type='submit'
            className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim hover:text-rust transition-colors duration-150 cursor-pointer'
          >
            SIGN OUT
          </button>
        </form>

        {me && (
          <Link href={`/u/${me.username}`} className='flex items-center'>
            <Avatar
              name={me.displayName}
              size='sm'
              className={active === 'profile' ? 'ring-2 ring-rust ring-offset-2 ring-offset-ink' : ''}
            />
          </Link>
        )}
      </div>
    </nav>
  )
}

interface NavLinkProps {
  href: string
  label: string
  active?: boolean
}

function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'font-sans text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-150',
        active ? 'text-cream' : 'text-cream-dim hover:text-cream'
      )}
    >
      {label}
    </Link>
  )
}
