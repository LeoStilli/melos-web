import type { CuratedList, ListItem } from '@/lib/types'

export const lists: CuratedList[] = [
  {
    id: 'l_essential_dream_pop',
    userId: 'u_maya',
    title: 'Essential Dream Pop, 2010—2025',
    description: 'A working canon. Updated when something forces me to update it.',
    itemCount: 5,
    createdAt: new Date('2025-11-08')
  },
  {
    id: 'l_grief_albums',
    userId: 'u_sofia',
    title: 'Records I Reach For When Someone Has Died',
    description: 'No order. None of these are easy.',
    itemCount: 4,
    createdAt: new Date('2026-01-18')
  },
  {
    id: 'l_indie_2010s',
    userId: 'u_leo',
    title: 'The Indie 2010s, Ranked',
    description: 'Fifty albums I keep going back to from a decade I am still processing.',
    itemCount: 5,
    createdAt: new Date('2025-10-30')
  },
  {
    id: 'l_late_night_records',
    userId: 'u_nadia',
    title: 'Records for the Last Bus Home',
    description: 'Headphones only. After 11pm.',
    itemCount: 4,
    createdAt: new Date('2026-02-04')
  },
  {
    id: 'l_post_2015_canon',
    userId: 'u_amelia',
    title: 'Post-2015 Songwriter Canon',
    description: 'Where the lyric tradition went after Carrie & Lowell.',
    itemCount: 4,
    createdAt: new Date('2025-12-12')
  }
]

const listItemsByList: Record<string, ListItem[]> = {
  l_essential_dream_pop: [
    { rank: 1, targetType: 'album', targetId: 'al_bloom', note: 'The platonic ideal.' },
    { rank: 2, targetType: 'album', targetId: 'al_currents', note: 'Counts. Argue elsewhere.' },
    { rank: 3, targetType: 'album', targetId: 'al_blond', note: null },
    { rank: 4, targetType: 'album', targetId: 'al_22_million', note: 'A folk record disguised as dream pop.' },
    { rank: 5, targetType: 'album', targetId: 'al_be_the_cowboy', note: null }
  ],
  l_grief_albums: [
    { rank: 1, targetType: 'album', targetId: 'al_carrie_lowell', note: 'Obvious but unavoidable.' },
    { rank: 2, targetType: 'album', targetId: 'al_punisher', note: null },
    { rank: 3, targetType: 'album', targetId: 'al_ok_computer', note: 'Grieving a future.' },
    { rank: 4, targetType: 'album', targetId: 'al_high_violet', note: null }
  ],
  l_indie_2010s: [
    { rank: 1, targetType: 'album', targetId: 'al_currents', note: null },
    { rank: 2, targetType: 'album', targetId: 'al_punisher', note: 'Snuck in just under the wire.' },
    { rank: 3, targetType: 'album', targetId: 'al_be_the_cowboy', note: null },
    { rank: 4, targetType: 'album', targetId: 'al_carrie_lowell', note: null },
    { rank: 5, targetType: 'album', targetId: 'al_two_hands', note: null }
  ],
  l_late_night_records: [
    { rank: 1, targetType: 'album', targetId: 'al_blond', note: '"White Ferrari" specifically.' },
    { rank: 2, targetType: 'album', targetId: 'al_22_million', note: null },
    { rank: 3, targetType: 'album', targetId: 'al_bloom', note: null },
    { rank: 4, targetType: 'album', targetId: 'al_high_violet', note: null }
  ],
  l_post_2015_canon: [
    { rank: 1, targetType: 'album', targetId: 'al_carrie_lowell', note: null },
    { rank: 2, targetType: 'album', targetId: 'al_fetch_bolt_cutters', note: null },
    { rank: 3, targetType: 'album', targetId: 'al_be_the_cowboy', note: null },
    { rank: 4, targetType: 'album', targetId: 'al_punisher', note: null }
  ]
}

export function getList(id: string): CuratedList | undefined {
  return lists.find((l) => l.id === id)
}

export function getListItems(listId: string): ListItem[] {
  return listItemsByList[listId] ?? []
}

export function getListsByUser(userId: string): CuratedList[] {
  return lists
    .filter((l) => l.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export function getRecentLists(limit = 6): CuratedList[] {
  return [...lists]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}
