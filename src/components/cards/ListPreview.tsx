import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import type { CuratedList } from '@/lib/types/list'
import type { User } from '@/lib/types/user'

interface ListPreviewProps {
  list: CuratedList
  author: User
}

export function ListPreview({ list, author }: ListPreviewProps) {
  return (
    <Link href={`/list/${list.id}`} className='block py-6 border-b border-border group'>
      <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-3'>
        {list.itemCount} {list.itemCount === 1 ? 'ENTRY' : 'ENTRIES'}
      </p>

      <h3 className='font-serif font-bold text-cream uppercase tracking-tight leading-[1.05] mb-3 group-hover:text-rust transition-colors duration-200 text-[clamp(1.25rem,2.5vw,1.75rem)]'>
        {list.title}
      </h3>

      {list.description && (
        <p className='font-serif italic text-cream-dim leading-relaxed mb-4 text-[0.9rem]'>
          {list.description}
        </p>
      )}

      <div className='flex items-center gap-2 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim'>
        <Avatar name={author.displayName} size='xs' />
        <span>BY @{author.username}</span>
        {author.isVerified && <span className='text-rust'>✓</span>}
      </div>
    </Link>
  )
}
