'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils/cn'
import { Magnetic } from '@/lib/motion/Magnetic'

interface NavLinkProps {
  href: string
  label: string
  active?: boolean
  className?: string
  children?: React.ReactNode
}

export function NavLink({ href, label, active, className, children }: NavLinkProps) {
  return (
    <Magnetic strength={0.3} className='inline-block'>
      <Link
        href={href}
        data-cursor='link'
        className={cn(
          'relative inline-flex items-center font-sans text-[0.65rem] tracking-[0.3em] uppercase transition-colors duration-200',
          active ? 'text-cream' : 'text-cream-dim hover:text-cream',
          className
        )}
      >
        <span className='relative inline-block overflow-hidden'>
          <motion.span
            className='inline-block'
            whileHover={{ y: '-110%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {label}
          </motion.span>
          <motion.span
            aria-hidden
            className='absolute left-0 top-0 inline-block text-rust'
            initial={{ y: '110%' }}
            whileHover={{ y: '0%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            {label}
          </motion.span>
        </span>
        {active && (
          <motion.span
            layoutId='nav-active'
            className='absolute -bottom-1.5 left-0 right-0 h-px bg-rust'
            transition={{ type: 'spring', damping: 20, stiffness: 240 }}
          />
        )}
        {children}
      </Link>
    </Magnetic>
  )
}
