'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'

import { cn } from '@/lib/utils/cn'

export function NavShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 24)
  })

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'sticky top-0 z-50 transition-[backdrop-filter,background-color,border-color] duration-500',
        scrolled ? 'backdrop-blur-md bg-ink/70 border-b border-border' : 'bg-transparent border-b border-transparent'
      )}
    >
      {children}
    </motion.header>
  )
}
