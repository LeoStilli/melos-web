import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import { isFollowing as checkFollowing, CURRENT_USER_ID } from '@/lib/mock/users'
import type { User } from '@/lib/types/user'

interface ProfileMastheadProps {
  user: User
}

export function ProfileMasthead({ user }: ProfileMastheadProps) {
  const isMe = user.id === CURRENT_USER_ID
  const following = !isMe && checkFollowing(CURRENT_USER_ID, user.id)
  const joinYear = user.joinedAt.getFullYear()

  return (
    <header className='px-6 md:px-12 py-14 md:py-20 border-b border-border'>
      <div className='flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-12'>
        <div className='flex-1 min-w-0'>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5 flex items-center gap-3'>
            LISTENER PROFILE
            {user.isVerified && (
              <span className='border border-rust px-2 py-0.5 text-[0.55rem] tracking-[0.25em]'>
                VERIFIED REVIEWER
              </span>
            )}
          </p>

          <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-5 text-[clamp(2.75rem,7vw,5.5rem)]'>
            {user.displayName.toUpperCase()}
          </h1>

          <div className='flex flex-wrap items-center gap-3 text-cream-dim font-sans text-xs tracking-widest uppercase mb-8'>
            <span>@{user.username}</span>
            <span className='text-border'>·</span>
            <span>MEMBER SINCE {joinYear}</span>
            {user.credibilityScore > 0 && (
              <>
                <span className='text-border'>·</span>
                <span className='text-cream'>
                  CRED <span className='font-serif font-black tabular-nums text-rust'>{user.credibilityScore}</span>
                </span>
              </>
            )}
          </div>

          {user.bio && (
            <p className='font-serif italic text-cream-dim leading-relaxed max-w-2xl text-[clamp(0.95rem,1.4vw,1.1rem)]'>
              {user.bio}
            </p>
          )}
        </div>

        <Avatar name={user.displayName} size='xl' />
      </div>

      <div className='flex flex-wrap items-center justify-between gap-6 mt-12'>
        <div className='flex flex-wrap items-baseline gap-x-10 gap-y-4'>
          <Stat value={user.reviewCount} label='REVIEWS' />
          <Stat value={user.listCount} label='LISTS' />
          <Stat value={user.followerCount} label='FOLLOWERS' href={`/u/${user.username}/followers`} />
          <Stat value={user.followingCount} label='FOLLOWING' href={`/u/${user.username}/following`} />
        </div>

        {!isMe && (
          <div className='flex items-center gap-3'>
            <button
              type='button'
              className='font-sans text-[0.65rem] tracking-[0.25em] uppercase border border-border px-6 py-3 hover:border-cream-dim transition-colors duration-150 cursor-pointer aria-pressed:bg-cream aria-pressed:text-ink aria-pressed:border-cream'
              aria-pressed={following}
            >
              {following ? 'FOLLOWING' : 'FOLLOW'}
            </button>
            <Link
              href={`/messages?to=${user.username}`}
              className='font-sans text-[0.65rem] tracking-[0.25em] uppercase border border-rust bg-rust text-cream px-6 py-3 hover:bg-rust-dim hover:border-rust-dim transition-colors duration-150'
            >
              MESSAGE
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

interface StatProps {
  value: number
  label: string
  href?: string
}

function Stat({ value, label, href }: StatProps) {
  const inner = (
    <div className='group inline-flex flex-col items-start'>
      <span className='font-serif font-black tabular-nums text-cream text-3xl leading-none group-hover:text-rust transition-colors duration-150'>
        {value.toLocaleString()}
      </span>
      <span className='font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim mt-1.5'>
        {label}
      </span>
    </div>
  )
  if (href) {
    return <Link href={href}>{inner}</Link>
  }
  return inner
}
