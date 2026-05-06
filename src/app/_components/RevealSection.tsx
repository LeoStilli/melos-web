'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/lib/utils/cn'

interface RevealSectionProps {
  children: React.ReactNode
  className?: string
  border?: boolean
}

export function RevealSection({ children, className, border = true }: RevealSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <motion.section
      ref={ref}
      className={cn(border && 'border-b border-border', 'px-6 md:px-12 py-20 md:py-28', className)}
      initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 60, filter: 'blur(8px)' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
