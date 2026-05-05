import Link from 'next/link'
import { notFound } from 'next/navigation'

import { TopNav } from '@/components/nav/TopNav'
import { Avatar } from '@/components/ui/Avatar'

import {
  getConversation,
  getConversationMessages,
  getOtherParticipantId
} from '@/lib/mock/messages'
import { getUser, CURRENT_USER_ID } from '@/lib/mock/users'
import { cn } from '@/lib/utils/cn'
import { formatRelative } from '@/lib/utils/format'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ConversationPage({ params }: PageProps) {
  const { id } = await params
  const conversation = getConversation(id)
  if (!conversation || !conversation.participantIds.includes(CURRENT_USER_ID)) notFound()

  const otherId = getOtherParticipantId(conversation, CURRENT_USER_ID)
  const other = getUser(otherId)
  if (!other) notFound()

  const conversationMessages = getConversationMessages(conversation.id)

  return (
    <div className='min-h-screen bg-ink flex flex-col'>
      <TopNav active='messages' />

      <header className='px-6 md:px-12 py-7 border-b border-border'>
        <Link
          href='/messages'
          className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim hover:text-cream transition-colors duration-150 mb-4 inline-block'
        >
          ← INBOX
        </Link>
        <div className='flex items-center gap-4'>
          <Avatar name={other.displayName} size='md' />
          <div>
            <Link
              href={`/u/${other.username}`}
              className='font-serif font-black text-cream uppercase tracking-tight leading-none text-[clamp(1.5rem,3vw,2.25rem)] hover:text-rust transition-colors duration-150 inline-flex items-center gap-2'
            >
              {other.displayName}
              {other.isVerified && <span className='text-rust text-base'>✓</span>}
            </Link>
            <p className='font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim mt-2'>
              @{other.username}
            </p>
          </div>
        </div>
      </header>

      <section className='flex-1 px-6 md:px-12 py-10 max-w-3xl w-full'>
        <ol className='flex flex-col gap-8'>
          {conversationMessages.map((m) => {
            const isFromMe = m.senderId === CURRENT_USER_ID
            const sender = isFromMe ? null : other

            return (
              <li
                key={m.id}
                className={cn('flex flex-col', isFromMe ? 'items-end text-right' : 'items-start')}
              >
                <p className='font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim mb-2'>
                  {isFromMe ? 'YOU' : sender?.displayName.toUpperCase()}
                  <span className='ml-2 text-border'>·</span>
                  <span className='ml-2'>{formatRelative(m.createdAt)}</span>
                </p>
                <p
                  className={cn(
                    'font-serif leading-relaxed max-w-[42ch] text-[clamp(0.95rem,1.3vw,1.05rem)]',
                    isFromMe ? 'text-cream' : 'text-cream-dim'
                  )}
                >
                  {m.body}
                </p>
              </li>
            )
          })}
        </ol>
      </section>

      <footer className='border-t border-border px-6 md:px-12 py-5'>
        <form className='flex items-center gap-4'>
          <input
            type='text'
            placeholder='Write a message...'
            className='flex-1 bg-transparent font-serif text-cream placeholder:text-cream-dim border-b border-border focus:border-cream-dim focus:outline-none py-3 text-base'
          />
          <button
            type='submit'
            className='font-sans text-[0.65rem] tracking-[0.25em] uppercase bg-rust text-cream px-6 py-3 hover:bg-rust-dim transition-colors duration-150 cursor-pointer'
          >
            SEND
          </button>
        </form>
      </footer>
    </div>
  )
}
