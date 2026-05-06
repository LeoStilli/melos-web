'use client'

import { Marquee } from '@/lib/motion/Marquee'

interface MarqueeStripProps {
  items: string[]
  variant?: 'serif' | 'sans'
  direction?: 'left' | 'right'
}

export function MarqueeStrip({ items, variant = 'serif', direction = 'left' }: MarqueeStripProps) {
  return (
    <div className='border-y border-border py-6 md:py-8 bg-ink overflow-hidden'>
      <Marquee speed={45} direction={direction}>
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className='inline-flex items-center gap-12'>
            <span
              className={
                variant === 'serif'
                  ? 'font-serif italic text-cream text-[clamp(2rem,6vw,5rem)] leading-none'
                  : 'font-sans uppercase tracking-[0.3em] text-cream text-[clamp(0.9rem,1.4vw,1.1rem)]'
              }
            >
              {item}
            </span>
            <span className='inline-block w-2 h-2 rounded-full bg-rust' />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
