import { formatRank, formatDuration, formatScore } from '@/lib/utils'
import type { Track } from '@/lib/types'

interface TracklistProps {
  tracks: Track[]
}

export function Tracklist({ tracks }: TracklistProps) {
  if (tracks.length === 0) {
    return (
      <p className='font-sans text-xs tracking-[0.2em] uppercase text-cream-dim py-8'>
        TRACKLIST UNAVAILABLE
      </p>
    )
  }

  return (
    <ol>
      {tracks.map((track) => (
        <li key={track.id} className='flex items-center gap-5 py-4 border-b border-border group'>
          <span className='font-sans text-xs tabular-nums text-cream-dim w-7 flex-shrink-0 group-hover:text-rust transition-colors duration-150'>
            {formatRank(track.rank)}
          </span>

          <p className='flex-1 min-w-0 font-serif text-cream leading-tight truncate group-hover:text-rust transition-colors duration-150 text-[clamp(0.9rem,1.4vw,1rem)]'>
            {track.title}
          </p>

          <span className='font-serif font-black tabular-nums text-cream-dim text-sm flex-shrink-0 w-12 text-right'>
            {formatScore(track.score)}
          </span>

          <span className='font-sans tabular-nums text-cream-dim flex-shrink-0 text-[0.72rem] w-12 text-right'>
            {formatDuration(track.durationMs)}
          </span>
        </li>
      ))}
    </ol>
  )
}
