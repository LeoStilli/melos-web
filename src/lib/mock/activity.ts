import type { ActivityItem } from '@/lib/types/activity'

export const activity: ActivityItem[] = [
  {
    id: 'act_1',
    type: 'review_posted',
    userId: 'u_maya',
    createdAt: new Date('2026-04-29T14:33:00'),
    reviewId: 'r_1',
    listId: null,
    albumId: 'al_blond',
    targetUserId: null
  },
  {
    id: 'act_2',
    type: 'list_created',
    userId: 'u_nadia',
    createdAt: new Date('2026-02-04T18:22:00'),
    reviewId: null,
    listId: 'l_late_night_records',
    albumId: null,
    targetUserId: null
  },
  {
    id: 'act_3',
    type: 'review_posted',
    userId: 'u_sofia',
    createdAt: new Date('2026-04-22T09:14:00'),
    reviewId: 'r_2',
    listId: null,
    albumId: 'al_carrie_lowell',
    targetUserId: null
  },
  {
    id: 'act_4',
    type: 'review_posted',
    userId: 'u_amelia',
    createdAt: new Date('2026-04-18T22:01:00'),
    reviewId: 'r_3',
    listId: null,
    albumId: 'al_punisher',
    targetUserId: null
  },
  {
    id: 'act_5',
    type: 'review_posted',
    userId: 'u_benji',
    createdAt: new Date('2026-04-08T11:18:00'),
    reviewId: 'r_5',
    listId: null,
    albumId: 'al_22_million',
    targetUserId: null
  },
  {
    id: 'act_6',
    type: 'list_created',
    userId: 'u_maya',
    createdAt: new Date('2025-11-08T15:00:00'),
    reviewId: null,
    listId: 'l_essential_dream_pop',
    albumId: null,
    targetUserId: null
  },
  {
    id: 'act_7',
    type: 'review_posted',
    userId: 'u_nadia',
    createdAt: new Date('2026-04-02T15:44:00'),
    reviewId: 'r_6',
    listId: null,
    albumId: 'al_fetch_bolt_cutters',
    targetUserId: null
  },
  {
    id: 'act_8',
    type: 'follow_started',
    userId: 'u_jake',
    createdAt: new Date('2026-04-25T10:00:00'),
    reviewId: null,
    listId: null,
    albumId: null,
    targetUserId: 'u_leo'
  }
]

export function getRecentActivity(limit = 10): ActivityItem[] {
  return [...activity]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}

export function getActivityByUsers(userIds: string[], limit = 20): ActivityItem[] {
  return activity
    .filter((a) => userIds.includes(a.userId))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)
}
