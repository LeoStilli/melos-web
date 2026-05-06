'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { coverColor } from '@/lib/utils/colors'

interface HoverRevealProps {
  children: React.ReactNode
  imageTitle: string
  imageInitial?: string
  className?: string
}

export function HoverReveal({ children, imageTitle, imageInitial, className }: HoverRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { damping: 22, stiffness: 200, mass: 0.5 })
  const y = useSpring(mvY, { damping: 22, stiffness: 200, mass: 0.5 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mvX.set(e.clientX - rect.left - 110)
    mvY.set(e.clientY - rect.top - 130)
  }

  const initial = imageInitial ?? imageTitle.replace(/^the\s+/i, '')[0]?.toUpperCase() ?? '?'

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={handleMove}
      className={cn('relative', className)}
    >
      {children}

      <motion.div
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-30 flex items-center justify-center border border-border overflow-hidden',
          coverColor(imageTitle)
        )}
        style={{ x, y, width: 220, height: 260 }}
        animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.85 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.span
          className='font-serif font-black text-cream/95 leading-none text-7xl select-none'
          animate={{ scale: hover ? 1 : 0.6 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {initial}
        </motion.span>
      </motion.div>
    </div>
  )
}
