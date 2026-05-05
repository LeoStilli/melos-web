import type { User } from './user'

export type ReviewTargetType = 'album' | 'artist' | 'track'

export interface Review {
  id: string
  userId: string
  targetType: ReviewTargetType
  targetId: string
  rating: number
  title: string | null
  body: string
  isVerified: boolean
  createdAt: Date
  likeCount: number
}

export interface ReviewWithContext extends Review {
  user: User
  targetTitle: string
  targetSubtitle: string | null
  targetSlug: string
}
