'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showCurtain, setShowCurtain] = useState(false)
  const [key, setKey] = useState(pathname)

  useEffect(() => {
    if (pathname === key) return
    setShowCurtain(true)
    const id = setTimeout(() => {
      setKey(pathname)
      setShowCurtain(false)
    }, 700)
    return () => clearTimeout(id)
  }, [pathname, key])

  return (
    <>
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {showCurtain && (
          <>
            <motion.div
              key='curtain-1'
              className='fixed inset-0 z-[90] bg-ink pointer-events-none origin-bottom'
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, originY: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              key='curtain-2'
              className='fixed inset-0 z-[91] pointer-events-none flex items-center justify-center'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <motion.span
                className='font-serif italic text-cream text-[clamp(2rem,8vw,6rem)] leading-none'
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                melos
              </motion.span>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
