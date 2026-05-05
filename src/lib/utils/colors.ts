const COVER_PALETTE = [
  'bg-[#7B3F00]',
  'bg-[#2C3E50]',
  'bg-[#1B5E20]',
  'bg-[#37474F]',
  'bg-[#8E2A2C]',
  'bg-[#3E2723]',
  'bg-[#5D4037]',
  'bg-[#1A237E]',
  'bg-[#4E342E]',
  'bg-[#263238]',
  'bg-[#0D47A1]',
  'bg-[#33691E]'
]

const AVATAR_PALETTE = [
  'bg-[#3E2723]',
  'bg-[#1B5E20]',
  'bg-[#1A237E]',
  'bg-[#37474F]',
  'bg-[#7B3F00]',
  'bg-[#0D47A1]',
  'bg-[#33691E]',
  'bg-[#5D4037]'
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

export function coverColor(seed: string): string {
  return COVER_PALETTE[hashString(seed) % COVER_PALETTE.length]
}

export function avatarColor(seed: string): string {
  return AVATAR_PALETTE[hashString(seed) % AVATAR_PALETTE.length]
}
