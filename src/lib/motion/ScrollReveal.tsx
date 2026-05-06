'use client'

import { motion, useInView, type Variants } from 'framer-motion'
import { useRef } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  as?: 'div' | 'section' | 'li' | 'article'
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 60,
  blur = true,
  as = 'div'
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  const variants: Variants = {
    hidden: { opacity: 0, y, filter: blur ? 'blur(10px)' : 'blur(0px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
  }

  const Tag = motion[as]

  return (
    <Tag
      ref={ref as never}
      className={className}
      variants={variants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  )
}
