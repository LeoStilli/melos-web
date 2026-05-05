import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import type { User } from '@/lib/types'

interface UserRowProps {
  user: User
  showFollowButton?: boolean
  isFollowing?: boolean
}

export function UserRow({ user, showFollowButton, isFollowing }: UserRowProps) {
  return (
    <div className='flex items-center gap-5 py-5 border-b border-border'>
      <Link href={`/u/${user.username}`} className='flex-shrink-0'>
        <Avatar name={user.displayName} size='md' />
      </Link>

      <div className='flex-1 min-w-0'>
        <Link href={`/u/${user.username}`} className='inline-flex items-center gap-2 group'>
          <p className='font-serif font-bold text-cream uppercase tracking-wide leading-tight group-hover:text-rust transition-colors duration-150 text-[clamp(0.9rem,1.4vw,1.05rem)]'>
            {user.displayName}
          </p>
          {user.isVerified && <span className='text-rust text-xs'>✓</span>}
        </Link>
        <p className='font-sans text-cream-dim text-[0.7rem] tracking-[0.15em] uppercase mt-0.5'>
          @{user.username} · {user.followerCount.toLocaleString()} followers
        </p>
        {user.bio && (
          <p className='font-serif text-cream-dim text-[0.85rem] mt-2 line-clamp-1'>
            {user.bio}
          </p>
        )}
      </div>

      {showFollowButton && (
        <button
          type='button'
          className='flex-shrink-0 font-sans text-[0.65rem] tracking-[0.25em] uppercase border border-border px-5 py-2.5 hover:border-cream-dim hover:text-cream text-cream-dim transition-colors duration-150 cursor-pointer aria-pressed:bg-cream aria-pressed:text-ink'
          aria-pressed={isFollowing}
        >
          {isFollowing ? 'FOLLOWING' : 'FOLLOW'}
        </button>
      )}
    </div>
  )
}
