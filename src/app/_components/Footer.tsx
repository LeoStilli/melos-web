'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const lift = useTransform(scrollYProgress, [0, 1], [120, 0])
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(20px)', 'blur(0px)'])
  const skew = useTransform(scrollYProgress, [0, 1], [-8, 0])

  return (
    <footer ref={ref} className='relative border-t border-border overflow-hidden bg-ink'>
      <div className='px-6 md:px-12 pt-24 pb-10'>
        <div className='flex flex-wrap items-end justify-between gap-y-10 mb-16'>
          <div>
            <p className='font-sans text-rust tracking-[0.3em] uppercase text-xs mb-4'>THE LIBRARY ENDS HERE</p>
            <p className='font-serif italic text-cream text-2xl md:text-3xl max-w-md leading-snug'>
              The music finds you, eventually.
            </p>
          </div>
          <ul className='grid grid-cols-2 gap-x-10 gap-y-3 font-sans text-[0.65rem] tracking-[0.3em] uppercase text-cream-dim'>
            <li><a href='/discover' className='hover:text-cream transition-colors duration-200'>DISCOVER</a></li>
            <li><a href='/lists' className='hover:text-cream transition-colors duration-200'>LISTS</a></li>
            <li><a href='/search' className='hover:text-cream transition-colors duration-200'>SEARCH</a></li>
            <li><a href='/messages' className='hover:text-cream transition-colors duration-200'>MESSAGES</a></li>
          </ul>
        </div>
      </div>

      <motion.div
        className='px-6 md:px-12 pb-6 leading-[0.85] select-none'
        style={{ y: lift, filter: blur, skewY: skew }}
      >
        <span className='block font-serif italic font-black text-cream uppercase tracking-tight whitespace-nowrap' style={{ fontSize: 'clamp(5rem, 22vw, 22rem)' }}>
          melos.
        </span>
      </motion.div>

      <div className='px-6 md:px-12 py-6 border-t border-border flex items-center justify-between font-sans text-[0.6rem] tracking-[0.3em] uppercase text-cream-dim'>
        <span>RATINGS · REVIEWS · LISTS · DISCOVERY</span>
        <span>{new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
