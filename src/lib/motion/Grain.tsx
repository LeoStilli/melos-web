export function Grain() {
  return (
    <div aria-hidden className='melos-grain pointer-events-none fixed inset-0 z-[80] opacity-[0.06] mix-blend-overlay'>
      <svg className='w-full h-full' xmlns='http://www.w3.org/2000/svg'>
        <filter id='melos-noise'>
          <feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch' />
          <feColorMatrix type='saturate' values='0' />
        </filter>
        <rect width='100%' height='100%' filter='url(#melos-noise)' />
      </svg>
    </div>
  )
}
