import type { Review, ReviewWithContext } from '@/lib/types'
import { getUser } from './users'
import { getAlbum } from './albums'

export const reviews: Review[] = [
  {
    id: 'r_1',
    userId: 'u_maya',
    targetType: 'album',
    targetId: 'al_blond',
    rating: 9.4,
    title: 'A Record That Refuses to Be Solved',
    body: 'Eight years on, Blond still resists every easy reading. It is a rare thing — a major-label R&B record that earned its place by withholding. The pitched voices, the half-finished thoughts, the way "Nights" splits in two and walks off in opposite directions. Frank Ocean built a record that asks you to bring your own ending.',
    isVerified: true,
    createdAt: new Date('2026-04-29T14:33:00'),
    likeCount: 218
  },
  {
    id: 'r_2',
    userId: 'u_sofia',
    targetType: 'album',
    targetId: 'al_carrie_lowell',
    rating: 9.5,
    title: null,
    body: 'A grief record that does not perform its grief. Sufjan strips away the choirs, the orchestras, the state-themed concept albums, and just sits with the loss. The result is the most direct work of his career — and the most unbearable.',
    isVerified: true,
    createdAt: new Date('2026-04-22T09:14:00'),
    likeCount: 412
  },
  {
    id: 'r_3',
    userId: 'u_amelia',
    targetType: 'album',
    targetId: 'al_punisher',
    rating: 9.0,
    title: 'The End That Doesn\'t End',
    body: 'I keep going back to the final scream on "I Know the End." It is the most cathartic moment in indie folk this decade. Punisher is a record that pretends to be quiet and then absolutely is not.',
    isVerified: true,
    createdAt: new Date('2026-04-18T22:01:00'),
    likeCount: 156
  },
  {
    id: 'r_4',
    userId: 'u_leo',
    targetType: 'album',
    targetId: 'al_ok_computer',
    rating: 9.5,
    title: null,
    body: 'I have written about this record three times in three different decades and I have nothing new to say except: it still works.',
    isVerified: false,
    createdAt: new Date('2026-04-12T18:42:00'),
    likeCount: 91
  },
  {
    id: 'r_5',
    userId: 'u_benji',
    targetType: 'album',
    targetId: 'al_22_million',
    rating: 8.7,
    title: null,
    body: 'The first time I heard "715 - CR∑∑KS" I thought a piece of audio software had broken. The second time I cried. Vernon turning his voice into weather is the closest thing this decade has to a folk record from another century.',
    isVerified: false,
    createdAt: new Date('2026-04-08T11:18:00'),
    likeCount: 47
  },
  {
    id: 'r_6',
    userId: 'u_nadia',
    targetType: 'album',
    targetId: 'al_fetch_bolt_cutters',
    rating: 9.2,
    title: 'Recorded at Home, Hits Like a Storm',
    body: 'Fiona Apple in 2020 sounds like Fiona Apple has always sounded — uncompromising, percussive, refusing to be smoothed out for the radio. That she made this in her house, with dogs barking in the background, only makes it more astonishing.',
    isVerified: false,
    createdAt: new Date('2026-04-02T15:44:00'),
    likeCount: 188
  },
  {
    id: 'r_7',
    userId: 'u_jake',
    targetType: 'album',
    targetId: 'al_currents',
    rating: 8.4,
    title: null,
    body: '"The Less I Know the Better" is the song every indie band wishes they had written. Currents is the album where Tame Impala stopped being a guitar band, and got better for it.',
    isVerified: false,
    createdAt: new Date('2026-03-29T20:11:00'),
    likeCount: 34
  },
  {
    id: 'r_8',
    userId: 'u_theo',
    targetType: 'album',
    targetId: 'al_be_the_cowboy',
    rating: 9.1,
    title: null,
    body: 'Mitski writing pop songs about loneliness with the precision of a knife thrower. Two-minute tracks that hit harder than most bands manage in five.',
    isVerified: false,
    createdAt: new Date('2026-03-24T13:08:00'),
    likeCount: 72
  },
  {
    id: 'r_9',
    userId: 'u_maya',
    targetType: 'album',
    targetId: 'al_funeral',
    rating: 9.3,
    title: null,
    body: 'Twenty years on, "Wake Up" still sounds like a generation arriving at the same realization at the same time. A debut album that reframed indie rock as something communal.',
    isVerified: true,
    createdAt: new Date('2026-03-15T10:30:00'),
    likeCount: 264
  },
  {
    id: 'r_10',
    userId: 'u_leo',
    targetType: 'album',
    targetId: 'al_high_violet',
    rating: 8.9,
    title: 'Slow Burn, Late Style',
    body: 'The National figuring out exactly what kind of band they are. Matt Berninger\'s voice still doesn\'t do what voices are supposed to do, and that is the point.',
    isVerified: false,
    createdAt: new Date('2026-03-08T16:55:00'),
    likeCount: 41
  },
  {
    id: 'r_11',
    userId: 'u_sofia',
    targetType: 'album',
    targetId: 'al_bloom',
    rating: 8.8,
    title: null,
    body: 'A dream pop record that refuses to wake up. Beach House have built an aesthetic so total it could be its own weather system.',
    isVerified: true,
    createdAt: new Date('2026-03-01T08:22:00'),
    likeCount: 119
  },
  {
    id: 'r_12',
    userId: 'u_amelia',
    targetType: 'album',
    targetId: 'al_two_hands',
    rating: 8.5,
    title: null,
    body: 'Big Thief recorded most of this live in a room and you can hear the room. Adrianne Lenker writing the kind of folk songs that sound like they have always existed.',
    isVerified: true,
    createdAt: new Date('2026-02-22T19:45:00'),
    likeCount: 88
  }
]

export function getReview(id: string): Review | undefined {
  return reviews.find((r) => r.id === id)
}

export function getReviewsByUser(userId: string): Review[] {
  return reviews.filter((r) => r.userId === userId).sort(byNewest)
}

export function getReviewsByAlbum(albumId: string): Review[] {
  return reviews
    .filter((r) => r.targetType === 'album' && r.targetId === albumId)
    .sort(byNewest)
}

export function getRecentReviews(limit = 10): Review[] {
  return [...reviews].sort(byNewest).slice(0, limit)
}

export function getReviewsByUsers(userIds: string[], limit = 20): Review[] {
  return reviews
    .filter((r) => userIds.includes(r.userId))
    .sort(byNewest)
    .slice(0, limit)
}

export function withContext(review: Review): ReviewWithContext | null {
  const user = getUser(review.userId)
  if (!user) return null

  if (review.targetType === 'album') {
    const album = getAlbum(review.targetId)
    if (!album) return null
    return {
      ...review,
      user,
      targetTitle: album.title,
      targetSubtitle: album.artistName,
      targetSlug: album.slug
    }
  }

  return null
}

function byNewest(a: Review, b: Review): number {
  return b.createdAt.getTime() - a.createdAt.getTime()
}
