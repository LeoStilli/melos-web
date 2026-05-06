'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface RevealTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  by?: 'word' | 'char' | 'line'
}

export function RevealText({
  children,
  as = 'span',
  className,
  delay = 0,
  stagger = 0.05,
  by = 'word'
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  const lines = by === 'line' ? children.split('\n') : [children]

  const Tag = motion[as]

  return (
    <Tag ref={ref as never} className={className} aria-label={children}>
      {lines.map((line, lineIdx) => {
        const tokens = by === 'char' ? Array.from(line) : line.split(' ')
        return (
          <span key={lineIdx} className='inline-block overflow-hidden align-bottom' style={{ paddingBottom: '0.12em' }}>
            <span className='inline-block'>
              {tokens.map((token, i) => (
                <motion.span
                  key={`${lineIdx}-${i}`}
                  className='inline-block'
                  style={{ willChange: 'transform' }}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={inView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                  transition={{
                    duration: 1.1,
                    ease: [0.22, 1, 0.36, 1],
                    delay: delay + i * stagger
                  }}
                >
                  {token}
                  {by === 'word' && i < tokens.length - 1 && ' '}
                </motion.span>
              ))}
            </span>
            {by === 'line' && lineIdx < lines.length - 1 && <br />}
          </span>
        )
      })}
    </Tag>
  )
}
