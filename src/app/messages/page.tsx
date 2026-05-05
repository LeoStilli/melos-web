import Link from 'next/link'

import { TopNav } from '@/components/nav/TopNav'
import { Avatar } from '@/components/ui/Avatar'

import {
  getConversationsForUser,
  getMessage,
  getOtherParticipantId
} from '@/lib/mock/messages'
import { getUser } from '@/lib/mock/users'
import { requireCurrentUser } from '@/lib/auth/current-user'
import { cn } from '@/lib/utils/cn'
import { formatRelative } from '@/lib/utils/format'

export default async function MessagesInboxPage() {
  const me = await requireCurrentUser()
  const conversations = getConversationsForUser(me.id)

  return (
    <div className='min-h-screen bg-ink'>
      <TopNav active='messages' />

      <header className='px-6 md:px-12 py-12 border-b border-border flex items-end justify-between'>
        <div>
          <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-3'>
            INBOX
          </p>
          <h1 className='font-serif font-black text-cream leading-none tracking-tight text-[clamp(2.5rem,5vw,4rem)]'>
            MESSAGES
          </h1>
        </div>

        <button
          type='button'
          className='font-sans text-[0.65rem] tracking-[0.25em] uppercase border border-rust bg-rust text-cream px-5 py-3 hover:bg-rust-dim hover:border-rust-dim transition-colors duration-150 cursor-pointer'
        >
          NEW MESSAGE
        </button>
      </header>

      <section className='max-w-3xl'>
        {conversations.length === 0 ? (
          <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim p-12'>
            NO CONVERSATIONS YET.
          </p>
        ) : (
          <ul>
            {conversations.map((c) => {
              const otherId = getOtherParticipantId(c, me.id)
              const other = getUser(otherId)
              const last = getMessage(c.lastMessageId)
              if (!other || !last) return null

              const isFromMe = last.senderId === me.id

              return (
                <li key={c.id} className='border-b border-border'>
                  <Link
                    href={`/messages/${c.id}`}
                    className='flex items-start gap-5 px-6 md:px-12 py-6 hover:bg-surface transition-colors duration-150 group'
                  >
                    <Avatar name={other.displayName} size='md' />

                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2 mb-1.5'>
                        <p className='font-serif font-bold text-cream uppercase tracking-wide truncate group-hover:text-rust transition-colors duration-150'>
                          {other.displayName}
                        </p>
                        {other.isVerified && <span className='text-rust text-xs'>✓</span>}
                        {c.unreadCount > 0 && (
                          <span className='ml-1 px-1.5 py-0.5 bg-rust text-cream font-sans text-[0.55rem] tabular-nums tracking-widest leading-none'>
                            {c.unreadCount}
                          </span>
                        )}
                      </div>

                      <p className={cn(
                        'font-serif text-[0.95rem] truncate leading-snug',
                        c.unreadCount > 0 ? 'text-cream' : 'text-cream-dim'
                      )}>
                        {isFromMe && <span className='text-cream-dim'>YOU: </span>}
                        {last.body}
                      </p>
                    </div>

                    <span className='font-sans text-[0.6rem] tracking-[0.25em] uppercase text-cream-dim flex-shrink-0 mt-2'>
                      {formatRelative(last.createdAt)}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
