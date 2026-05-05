export type ActivityType =
  | 'review_posted'
  | 'rating_added'
  | 'list_created'
  | 'list_updated'
  | 'follow_started'

export interface ActivityItem {
  id: string
  type: ActivityType
  userId: string
  createdAt: Date
  reviewId: string | null
  listId: string | null
  albumId: string | null
  targetUserId: string | null
}
