import Link from 'next/link'

import { cn } from '@/lib/utils/cn'

interface ProfileTabsProps {
  username: string
  active: 'overview' | 'reviews' | 'lists' | 'followers' | 'following'
}

const TABS: { key: ProfileTabsProps['active']; label: string; href: (u: string) => string }[] = [
  { key: 'overview', label: 'OVERVIEW', href: (u) => `/u/${u}` },
  { key: 'reviews', label: 'REVIEWS', href: (u) => `/u/${u}/reviews` },
  { key: 'lists', label: 'LISTS', href: (u) => `/u/${u}/lists` },
  { key: 'followers', label: 'FOLLOWERS', href: (u) => `/u/${u}/followers` },
  { key: 'following', label: 'FOLLOWING', href: (u) => `/u/${u}/following` }
]

export function ProfileTabs({ username, active }: ProfileTabsProps) {
  return (
    <nav className='border-b border-border px-6 md:px-12'>
      <ul className='flex flex-wrap gap-x-8 gap-y-2'>
        {TABS.map((tab) => {
          const isActive = tab.key === active
          return (
            <li key={tab.key}>
              <Link
                href={tab.href(username)}
                className={cn(
                  'inline-block font-sans text-[0.7rem] tracking-[0.3em] uppercase py-5 transition-colors duration-150',
                  isActive
                    ? 'text-cream border-b-2 border-rust -mb-[1px]'
                    : 'text-cream-dim hover:text-cream'
                )}
              >
                {tab.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
