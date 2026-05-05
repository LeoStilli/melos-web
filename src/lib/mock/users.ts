import type { User, Follow } from '@/lib/types/user'

export const users: User[] = [
  {
    id: 'u_leo',
    username: 'leostilli',
    displayName: 'Leonardo Stilli',
    bio: 'Writing about records that haunt me. Vinyl collector, occasional gig promoter.',
    isVerified: false,
    credibilityScore: 142,
    joinedAt: new Date('2025-09-04'),
    followerCount: 87,
    followingCount: 134,
    reviewCount: 47,
    listCount: 9
  },
  {
    id: 'u_maya',
    username: 'maya_h',
    displayName: 'Maya Hartmann',
    bio: 'Music critic, contributing editor at The Quietus. Slow listener.',
    isVerified: true,
    credibilityScore: 1247,
    joinedAt: new Date('2024-02-11'),
    followerCount: 4920,
    followingCount: 412,
    reviewCount: 218,
    listCount: 26
  },
  {
    id: 'u_benji',
    username: 'benji_pdx',
    displayName: 'Benji Castellanos',
    bio: 'Portland. Drone, ambient, third stream jazz. Currently obsessed with Alice Coltrane.',
    isVerified: false,
    credibilityScore: 318,
    joinedAt: new Date('2024-08-22'),
    followerCount: 312,
    followingCount: 89,
    reviewCount: 64,
    listCount: 14
  },
  {
    id: 'u_sofia',
    username: 'sofia_writes',
    displayName: 'Sofia Vasquez',
    bio: 'Senior staff at Pitchfork. Currently working on a book about post-punk in São Paulo.',
    isVerified: true,
    credibilityScore: 2104,
    joinedAt: new Date('2023-11-04'),
    followerCount: 12400,
    followingCount: 198,
    reviewCount: 401,
    listCount: 38
  },
  {
    id: 'u_jake',
    username: 'jake_d',
    displayName: 'Jake Donovan',
    bio: 'College radio DJ. Indie, math rock, anything weird and earnest.',
    isVerified: false,
    credibilityScore: 92,
    joinedAt: new Date('2025-01-18'),
    followerCount: 56,
    followingCount: 201,
    reviewCount: 23,
    listCount: 4
  },
  {
    id: 'u_nadia',
    username: 'nadia_rios',
    displayName: 'Nadia Rios',
    bio: 'Producer. R&B, neo-soul, and the rare jazz fusion record. Mostly listen on the bus.',
    isVerified: false,
    credibilityScore: 487,
    joinedAt: new Date('2024-05-30'),
    followerCount: 891,
    followingCount: 145,
    reviewCount: 102,
    listCount: 17
  },
  {
    id: 'u_theo',
    username: 'theo_park',
    displayName: 'Theo Park',
    bio: 'Hardcore, post-hardcore, screamo. The louder the better.',
    isVerified: false,
    credibilityScore: 211,
    joinedAt: new Date('2024-12-09'),
    followerCount: 178,
    followingCount: 92,
    reviewCount: 41,
    listCount: 7
  },
  {
    id: 'u_amelia',
    username: 'amelia_w',
    displayName: 'Amelia Wright',
    bio: 'Songwriter. Currently in love with the Carrie & Lowell era.',
    isVerified: true,
    credibilityScore: 763,
    joinedAt: new Date('2024-03-15'),
    followerCount: 2104,
    followingCount: 320,
    reviewCount: 156,
    listCount: 22
  }
]

export function addUser(user: User): void {
  users.push(user)
}

export const follows: Follow[] = [
  { followerId: 'u_leo', followingId: 'u_maya', createdAt: new Date('2025-09-10') },
  { followerId: 'u_leo', followingId: 'u_sofia', createdAt: new Date('2025-09-10') },
  { followerId: 'u_leo', followingId: 'u_benji', createdAt: new Date('2025-09-15') },
  { followerId: 'u_leo', followingId: 'u_nadia', createdAt: new Date('2025-10-01') },
  { followerId: 'u_leo', followingId: 'u_amelia', createdAt: new Date('2025-10-12') },
  { followerId: 'u_maya', followingId: 'u_leo', createdAt: new Date('2025-09-15') },
  { followerId: 'u_jake', followingId: 'u_leo', createdAt: new Date('2025-11-22') },
  { followerId: 'u_theo', followingId: 'u_leo', createdAt: new Date('2026-01-04') },
  { followerId: 'u_nadia', followingId: 'u_leo', createdAt: new Date('2025-12-01') },
  { followerId: 'u_benji', followingId: 'u_maya', createdAt: new Date('2024-09-01') },
  { followerId: 'u_jake', followingId: 'u_sofia', createdAt: new Date('2025-03-01') },
  { followerId: 'u_amelia', followingId: 'u_sofia', createdAt: new Date('2024-04-01') }
]

export function getUser(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username)
}

export function getFollowers(userId: string): User[] {
  const ids = follows.filter((f) => f.followingId === userId).map((f) => f.followerId)
  return ids.map((id) => getUser(id)).filter((u): u is User => Boolean(u))
}

export function getFollowing(userId: string): User[] {
  const ids = follows.filter((f) => f.followerId === userId).map((f) => f.followingId)
  return ids.map((id) => getUser(id)).filter((u): u is User => Boolean(u))
}

export function isFollowing(followerId: string, followingId: string): boolean {
  return follows.some((f) => f.followerId === followerId && f.followingId === followingId)
}
