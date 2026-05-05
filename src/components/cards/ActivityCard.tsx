import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import { formatRelative, formatScore } from '@/lib/utils/format'
import type { ActivityItem } from '@/lib/types/activity'
import type { User } from '@/lib/types/user'
import type { Album } from '@/lib/types/album'
import type { CuratedList } from '@/lib/types/list'
import type { Review } from '@/lib/types/review'

interface ActivityCardProps {
  item: ActivityItem
  user: User
  review?: Review
  album?: Album
  list?: CuratedList
  targetUser?: User
}

export function ActivityCard({ item, user, review, album, list, targetUser }: ActivityCardProps) {
  return (
    <li className='flex items-start gap-4 py-5 border-b border-border'>
      <Link href={`/u/${user.username}`} className='flex-shrink-0 mt-0.5'>
        <Avatar name={user.displayName} size='sm' />
      </Link>

      <div className='flex-1 min-w-0'>
        <p className='font-sans text-sm leading-relaxed'>
          <Link href={`/u/${user.username}`} className='font-medium text-cream hover:text-rust transition-colors duration-150'>
            @{user.username}
          </Link>
          {user.isVerified && <span className='text-rust ml-1.5'>✓</span>}
          <span className='text-cream-dim'>{' '}{describe(item.type)}</span>
          {album && (
            <Link href={`/album/${album.slug}`} className='ml-1 font-serif font-bold uppercase tracking-wide text-cream hover:text-rust transition-colors duration-150'>
              {album.title}
            </Link>
          )}
          {list && (
            <Link href={`/list/${list.id}`} className='ml-1 font-serif font-bold italic text-cream hover:text-rust transition-colors duration-150'>
              "{list.title}"
            </Link>
          )}
          {targetUser && (
            <Link href={`/u/${targetUser.username}`} className='ml-1 font-medium text-cream hover:text-rust transition-colors duration-150'>
              @{targetUser.username}
            </Link>
          )}
          {review && album && (
            <span className='ml-2 font-serif font-black tabular-nums text-cream'>
              · {formatScore(review.rating)}
            </span>
          )}
        </p>

        {review?.body && (
          <p className='font-serif text-cream-dim text-[0.9rem] mt-2 line-clamp-2 leading-relaxed'>
            "{review.body}"
          </p>
        )}

        <p className='font-sans text-[0.6rem] tracking-[0.25em] uppercase text-cream-dim mt-2'>
          {formatRelative(item.createdAt)}
        </p>
      </div>
    </li>
  )
}

function describe(type: ActivityItem['type']): string {
  switch (type) {
    case 'review_posted':
      return ' reviewed'
    case 'rating_added':
      return ' rated'
    case 'list_created':
      return ' created a list'
    case 'list_updated':
      return ' updated a list'
    case 'follow_started':
      return ' followed'
    default:
      return ''
  }
}
