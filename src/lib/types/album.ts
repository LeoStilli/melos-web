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
