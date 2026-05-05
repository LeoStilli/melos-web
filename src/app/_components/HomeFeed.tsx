import { ActivityCard } from '@/components/cards/ActivityCard'
import { getRecentActivity } from '@/lib/mock/activity'
import { getUser } from '@/lib/mock/users'
import { getReview } from '@/lib/mock/reviews'
import { getAlbum } from '@/lib/mock/albums'
import { getList } from '@/lib/mock/lists'

export function HomeFeed() {
  const items = getRecentActivity(10)

  return (
    <ul>
      {items.map((item) => {
        const user = getUser(item.userId)
        if (!user) return null

        return (
          <ActivityCard
            key={item.id}
            item={item}
            user={user}
            review={item.reviewId ? getReview(item.reviewId) : undefined}
            album={item.albumId ? getAlbum(item.albumId) : undefined}
            list={item.listId ? getList(item.listId) : undefined}
            targetUser={item.targetUserId ? getUser(item.targetUserId) ?? undefined : undefined}
          />
        )
      })}
    </ul>
  )
}
