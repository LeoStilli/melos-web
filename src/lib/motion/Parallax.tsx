'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

interface ParallaxProps {
  children: React.ReactNode
  offset?: number
  className?: string
  rotate?: number
}

export function Parallax({ children, offset = 80, className, rotate = 0 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rawY = useTransform(scrollYProgress, [0, 1], [offset, -offset])
  const rawR = useTransform(scrollYProgress, [0, 1], [-rotate, rotate])
  const y = useSpring(rawY, { damping: 30, stiffness: 90, mass: 0.4 })
  const r = useSpring(rawR, { damping: 30, stiffness: 90, mass: 0.4 })

  return (
    <motion.div ref={ref} style={{ y, rotate: r }} className={className}>
      {children}
    </motion.div>
  )
}
