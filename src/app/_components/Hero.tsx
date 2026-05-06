'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

import { SearchBar } from '@/components/ui/SearchBar'
import { RevealText } from '@/lib/motion/RevealText'
import { Magnetic } from '@/lib/motion/Magnetic'

const TRY_QUERIES = ['frank ocean', 'art pop', 'paranoid', 'radiohead', 'indie folk']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['-2%', '-32%'])
  const ghostOpacity = useTransform(scrollYProgress, [0, 1], [0.06, 0])
  const ghostBlur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(12px)'])
  const tagY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <section
      ref={ref}
      className='relative border-b border-border px-6 md:px-12 py-20 md:py-32 overflow-hidden'
    >
      <motion.div
        aria-hidden
        className='absolute inset-y-0 left-0 right-0 flex items-center pointer-events-none select-none'
        style={{ x: ghostX, opacity: ghostOpacity, filter: ghostBlur }}
      >
        <span className='font-serif italic text-cream whitespace-nowrap leading-none' style={{ fontSize: 'clamp(12rem, 35vw, 28rem)' }}>
          melos
        </span>
      </motion.div>

      <motion.div
        className='relative z-10'
        style={{ y: heroY }}
      >
        <motion.div style={{ y: tagY }} className='flex items-center gap-3 mb-10'>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className='block h-px w-16 bg-rust origin-left'
          />
          <RevealText
            as='p'
            className='font-sans text-rust tracking-[0.3em] uppercase text-xs'
            stagger={0.04}
            delay={0.4}
          >
            BROWSE THE LIBRARY
          </RevealText>
        </motion.div>

        <h1 className='font-serif font-black text-cream leading-[0.92] tracking-tight mb-12 text-[clamp(2.75rem,8vw,7rem)]'>
          <span className='block overflow-hidden'>
            <RevealText className='inline-block uppercase' stagger={0.07} delay={0.2}>
              FIND SOMETHING
            </RevealText>
          </span>
          <span className='block overflow-hidden italic font-normal text-cream-dim'>
            <RevealText className='inline-block' stagger={0.07} delay={0.4}>
              worth hearing.
            </RevealText>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className='max-w-3xl'
        >
          <SearchBar size='hero' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className='flex flex-wrap items-center gap-x-3 gap-y-2 mt-7 font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim'
        >
          <span>TRY:</span>
          {TRY_QUERIES.map((q, i) => (
            <Magnetic key={q} strength={0.5}>
              <motion.a
                href={`/search?q=${encodeURIComponent(q)}`}
                data-cursor='link'
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.5 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className='inline-block hover:text-rust transition-colors duration-150 underline-offset-4 hover:underline'
              >
                {q}
              </motion.a>
            </Magnetic>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className='absolute right-6 md:right-12 bottom-0 hidden md:flex flex-col items-center gap-3'
        >
          <span className='font-sans text-[0.55rem] tracking-[0.4em] uppercase text-cream-dim [writing-mode:vertical-rl]'>
            SCROLL
          </span>
          <motion.span
            animate={{ y: [0, 18, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className='block w-px h-12 bg-cream-dim origin-top'
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
