'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'

interface SectionHeadingProps {
  label: string
  href?: string
  hrefLabel?: string
  className?: string
}

export function SectionHeading({ label, href, hrefLabel = 'SEE ALL', className }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <div ref={ref} className={cn('flex items-baseline justify-between mb-12', className)}>
      <h2 className='flex items-center gap-4 font-sans text-xs tracking-[0.3em] uppercase text-rust'>
        <motion.span
          aria-hidden
          className='block h-px bg-rust origin-left'
          initial={{ scaleX: 0, width: 0 }}
          animate={inView ? { scaleX: 1, width: 48 } : { scaleX: 0, width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          className='inline-block overflow-hidden'
        >
          <motion.span
            className='inline-block'
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {label}
          </motion.span>
        </motion.span>
      </h2>
      {href && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={href}
            data-cursor='link'
            className='group font-sans text-[0.65rem] tracking-[0.25em] uppercase text-cream-dim hover:text-cream transition-colors duration-200 inline-flex items-center gap-2'
          >
            {hrefLabel}
            <span className='inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5'>
              →
            </span>
          </Link>
        </motion.div>
      )}
    </div>
  )
}
