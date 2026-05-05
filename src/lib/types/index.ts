export interface User {
  id: string
  username: string
  displayName: string
  bio: string | null
  isVerified: boolean
  credibilityScore: number
  joinedAt: Date
  followerCount: number
  followingCount: number
  reviewCount: number
  listCount: number
}

export interface Artist {
  id: string
  slug: string
  name: string
  formedYear: number | null
  origin: string | null
  genres: string[]
  bio: string
}

export interface Album {
  id: string
  slug: string
  title: string
  artistId: string
  artistName: string
  releaseYear: number
  genres: string[]
  trackCount: number
  durationMs: number
  communityScore: number
  verifiedScore: number
  reviewCount: number
  description: string | null
}

export interface Track {
  id: string
  title: string
  albumId: string
  rank: number
  durationMs: number
  score: number
}

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

export interface CuratedList {
  id: string
  userId: string
  title: string
  description: string | null
  itemCount: number
  createdAt: Date
}

export interface ListItem {
  rank: number
  targetType: ReviewTargetType
  targetId: string
  note: string | null
}

export interface Conversation {
  id: string
  participantIds: string[]
  lastMessageId: string
  unreadCount: number
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  body: string
  createdAt: Date
}

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

export interface Follow {
  followerId: string
  followingId: string
  createdAt: Date
}
