'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function Cursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { damping: 28, stiffness: 280, mass: 0.4 })
  const springY = useSpring(cursorY, { damping: 28, stiffness: 280, mass: 0.4 })

  const [variant, setVariant] = useState<'default' | 'link' | 'text' | 'view'>('default')
  const [label, setLabel] = useState<string | null>(null)
  const [hidden, setHidden] = useState(true)
  const lastTouch = useRef(0)

  useEffect(() => {
    function move(e: MouseEvent) {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (hidden && performance.now() - lastTouch.current > 400) setHidden(false)
    }

    function over(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor]') as HTMLElement | null
      if (!interactive) {
        setVariant('default')
        setLabel(null)
        return
      }
      const cursorAttr = interactive.dataset.cursor as 'link' | 'text' | 'view' | undefined
      const labelAttr = interactive.dataset.cursorLabel ?? null
      if (cursorAttr) {
        setVariant(cursorAttr)
        setLabel(labelAttr)
        return
      }
      if (interactive.tagName === 'INPUT' || interactive.tagName === 'TEXTAREA') {
        setVariant('text')
        setLabel(null)
        return
      }
      setVariant('link')
      setLabel(labelAttr)
    }

    function leave() {
      setHidden(true)
    }

    function touch() {
      lastTouch.current = performance.now()
      setHidden(true)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseleave', leave)
    window.addEventListener('touchstart', touch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseleave', leave)
      window.removeEventListener('touchstart', touch)
    }
  }, [cursorX, cursorY, hidden])

  const baseScale = variant === 'link' ? 2.6 : variant === 'view' ? 4.4 : variant === 'text' ? 0.6 : 1

  return (
    <>
      <motion.div
        aria-hidden
        className='pointer-events-none fixed top-0 left-0 z-[100] mix-blend-difference hidden md:block'
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{
            scale: baseScale,
            opacity: hidden ? 0 : 1
          }}
          transition={{ type: 'spring', damping: 18, stiffness: 240, mass: 0.4 }}
          className='relative flex items-center justify-center'
          style={{ width: 14, height: 14 }}
        >
          <span className='block w-full h-full rounded-full bg-cream' />
          {variant === 'view' && label && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='absolute font-sans text-[0.4rem] tracking-[0.3em] uppercase text-ink'
              style={{ scale: 1 / baseScale }}
            >
              {label}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className='pointer-events-none fixed top-0 left-0 z-[99] hidden md:block'
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          animate={{ opacity: hidden ? 0 : 0.5, scale: variant === 'default' ? 1 : 0.6 }}
          transition={{ type: 'spring', damping: 30, stiffness: 380 }}
          className='rounded-full bg-rust'
          style={{ width: 5, height: 5 }}
        />
      </motion.div>
    </>
  )
}
