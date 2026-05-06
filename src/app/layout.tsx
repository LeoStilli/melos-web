import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

import { SmoothScroll } from '@/lib/motion/SmoothScroll'
import { Cursor } from '@/lib/motion/Cursor'
import { Grain } from '@/lib/motion/Grain'
import { PageTransition } from '@/lib/motion/PageTransition'

import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '600', '700', '900'],
  style: ['normal', 'italic']
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Melos — Your Music Identity',
  description: 'Connect your Spotify. Build your listening identity. Find the music and the people you didn\'t know you were looking for.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${playfair.variable} ${inter.variable}`}>
      <body className='melos-body'>
        <SmoothScroll>
          <Grain />
          <Cursor />
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
