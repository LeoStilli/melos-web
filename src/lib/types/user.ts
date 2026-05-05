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

export interface Follow {
  followerId: string
  followingId: string
  createdAt: Date
}
