import type { ReviewTargetType } from './review'

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
