export interface Artist {
  id: string
  slug: string
  name: string
  formedYear: number | null
  origin: string | null
  genres: string[]
  bio: string
}
