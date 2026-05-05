import Link from 'next/link'

import { Avatar } from '@/components/ui/Avatar'
import { AlbumCover } from '@/components/ui/AlbumCover'
import { formatRelative, formatScore } from '@/lib/utils/format'
import type { ReviewWithContext } from '@/lib/types/review'

interface ReviewCardProps {
  review: ReviewWithContext
  variant?: 'default' | 'compact' | 'featured'
}

export function ReviewCard({ review, variant = 'default' }: ReviewCardProps) {
  if (variant === 'compact') {
    return <CompactReview review={review} />
  }
  if (variant === 'featured') {
    return <FeaturedReview review={review} />
  }
  return <DefaultReview review={review} />
}

function DefaultReview({ review }: { review: ReviewWithContext }) {
  return (
    <article className='py-7 border-b border-border'>
      <div className='flex items-start gap-5'>
        <Link href={`/album/${review.targetSlug}`} className='block'>
          <AlbumCover
            title={review.targetTitle}
            artistName={review.targetSubtitle ?? undefined}
            size='md'
          />
        </Link>

        <div className='flex-1 min-w-0'>
          <div className='flex items-baseline justify-between gap-4 mb-2'>
            <Link
              href={`/album/${review.targetSlug}`}
              className='font-serif font-bold text-cream uppercase tracking-wide leading-tight hover:text-rust transition-colors duration-150 text-[clamp(0.95rem,1.6vw,1.15rem)]'
            >
              {review.targetTitle}
            </Link>
            <span className='font-serif font-black tabular-nums text-cream text-2xl leading-none flex-shrink-0'>
              {formatScore(review.rating)}
            </span>
          </div>
          <p className='font-sans text-[0.7rem] tracking-[0.15em] uppercase text-cream-dim mb-3'>
            {review.targetSubtitle}
          </p>

          {review.title && (
            <p className='font-serif italic text-cream mb-2 text-[clamp(0.85rem,1.2vw,0.95rem)]'>
              "{review.title}"
            </p>
          )}

          <p className='font-serif text-cream-dim leading-relaxed mb-4 text-[0.95rem]'>
            {review.body}
          </p>

          <div className='flex items-center gap-3 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-cream-dim'>
            <Avatar name={review.user.displayName} size='xs' />
            <Link
              href={`/u/${review.user.username}`}
              className='hover:text-cream transition-colors duration-150'
            >
              {review.user.displayName}
            </Link>
            {review.user.isVerified && <span className='text-rust'>✓</span>}
            <span className='text-border'>·</span>
            <span>{formatRelative(review.createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}

function CompactReview({ review }: { review: ReviewWithContext }) {
  return (
    <article className='flex items-center gap-4 py-4 border-b border-border'>
      <Avatar name={review.user.displayName} size='sm' />
      <div className='flex-1 min-w-0'>
        <p className='font-sans text-xs text-cream truncate'>
          <Link href={`/u/${review.user.username}`} className='hover:text-rust transition-colors duration-150 font-medium'>
            @{review.user.username}
          </Link>
          <span className='text-cream-dim'> reviewed </span>
          <Link
            href={`/album/${review.targetSlug}`}
            className='font-serif font-bold uppercase tracking-wide hover:text-rust transition-colors duration-150'
          >
            {review.targetTitle}
          </Link>
        </p>
        <p className='font-serif text-cream-dim text-[0.85rem] mt-1 line-clamp-2'>
          {review.body}
        </p>
      </div>
      <div className='flex flex-col items-end flex-shrink-0'>
        <span className='font-serif font-black tabular-nums text-cream text-lg leading-none'>
          {formatScore(review.rating)}
        </span>
        <span className='font-sans text-[0.6rem] tracking-widest uppercase text-cream-dim mt-1'>
          {formatRelative(review.createdAt)}
        </span>
      </div>
    </article>
  )
}

function FeaturedReview({ review }: { review: ReviewWithContext }) {
  return (
    <article className='grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-center py-12'>
      <Link href={`/album/${review.targetSlug}`} className='block'>
        <AlbumCover
          title={review.targetTitle}
          artistName={review.targetSubtitle ?? undefined}
          size='hero'
          className='max-w-md'
        />
      </Link>

      <div>
        <p className='font-sans text-[0.65rem] tracking-[0.3em] uppercase text-rust mb-5'>
          ALBUM OF THE WEEK
        </p>

        <Link href={`/album/${review.targetSlug}`} className='inline-block group'>
          <h1 className='font-serif font-black text-cream leading-[0.95] tracking-tight mb-3 text-[clamp(2.5rem,5.5vw,4.5rem)] group-hover:text-rust transition-colors duration-200'>
            {review.targetTitle.toUpperCase()}
          </h1>
        </Link>

        <p className='font-sans text-xs tracking-[0.25em] uppercase text-cream-dim mb-6'>
          {review.targetSubtitle}
        </p>

        <div className='flex items-baseline gap-3 mb-6'>
          <span className='font-serif font-black tabular-nums text-cream text-5xl leading-none'>
            {formatScore(review.rating)}
          </span>
          <span className='font-sans text-cream-dim text-sm'>/ 10</span>
        </div>

        {review.title && (
          <p className='font-serif italic text-cream mb-4 text-[clamp(1rem,1.5vw,1.2rem)]'>
            "{review.title}"
          </p>
        )}

        <p className='font-serif text-cream-dim leading-relaxed mb-8 text-[clamp(0.95rem,1.3vw,1.05rem)]'>
          {review.body}
        </p>

        <div className='flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase'>
          <Avatar name={review.user.displayName} size='sm' />
          <Link
            href={`/u/${review.user.username}`}
            className='text-cream hover:text-rust transition-colors duration-150'
          >
            BY {review.user.displayName}
          </Link>
          {review.user.isVerified && <span className='text-rust'>✓</span>}
        </div>
      </div>
    </article>
  )
}
