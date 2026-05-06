'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  scrollDriven?: boolean
  className?: string
  contentClassName?: string
}

export function Marquee({
  children,
  speed = 40,
  direction = 'left',
  scrollDriven = true,
  className,
  contentClassName
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawX = useTransform(scrollYProgress, [0, 1], direction === 'left' ? [0, -260] : [0, 260])
  const scrollX = useSpring(rawX, { damping: 35, stiffness: 80, mass: 0.3 })

  return (
    <div ref={ref} className={cn('overflow-hidden whitespace-nowrap', className)}>
      <motion.div
        className='inline-block will-change-transform'
        style={scrollDriven ? { x: scrollX } : undefined}
      >
        <motion.div
          className={cn('inline-flex flex-nowrap gap-12', contentClassName)}
          animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
          transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        >
          <div className='inline-flex flex-nowrap gap-12'>{children}</div>
          <div aria-hidden className='inline-flex flex-nowrap gap-12'>
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
