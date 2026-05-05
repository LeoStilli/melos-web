export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDuration(ms: number): string {
  const total = Math.floor(ms / 1000)
  const mins = Math.floor(total / 60)
  const secs = total % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function formatLongDuration(ms: number): string {
  const total = Math.floor(ms / 1000)
  const hours = Math.floor(total / 3600)
  const mins = Math.floor((total % 3600) / 60)
  if (hours > 0) return `${hours}H ${mins}M`
  return `${mins}M`
}

export function formatRank(n: number): string {
  return n.toString().padStart(2, '0')
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

export function formatRelative(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'JUST NOW'
  if (mins < 60) return `${mins}M AGO`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}H AGO`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}D AGO`
  const weeks = Math.floor(days / 7)
  if (weeks < 5) return `${weeks}W AGO`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}MO AGO`
  return `${Math.floor(days / 365)}Y AGO`
}

export function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash = hash & hash
  }
  return Math.abs(hash)
}

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

export function coverColor(seed: string): string {
  return COVER_PALETTE[hashString(seed) % COVER_PALETTE.length]
}

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

export function avatarColor(seed: string): string {
  return AVATAR_PALETTE[hashString(seed) % AVATAR_PALETTE.length]
}
