import Link from 'next/link'

import { cn } from '@/lib/utils/cn'
import { coverColor } from '@/lib/utils/colors'

interface GenreGridProps {
  genres: { genre: string; count: number }[]
}

export function GenreGrid({ genres }: GenreGridProps) {
  return (
    <ul className='grid grid-cols-2 md:grid-cols-4 gap-px bg-border'>
      {genres.map(({ genre, count }) => (
        <li key={genre}>
          <Link
            href={`/search?q=${encodeURIComponent(genre)}`}
            className={cn(
              'relative aspect-[5/3] flex flex-col justify-end p-5 group hover:brightness-110 transition-all duration-200',
              coverColor(genre)
            )}
          >
            <p className='font-serif font-black text-cream uppercase leading-[0.92] tracking-tight text-[clamp(1.1rem,2.6vw,2rem)] group-hover:translate-y-[-2px] transition-transform duration-200'>
              {genre}
            </p>
            <p className='font-sans text-[0.55rem] tracking-[0.3em] uppercase text-cream/70 mt-2'>
              {count} {count === 1 ? 'ALBUM' : 'ALBUMS'} →
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
