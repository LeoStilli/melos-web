import type { Album, Track } from '@/lib/types'

export const albums: Album[] = [
  {
    id: 'al_ok_computer',
    slug: 'ok-computer',
    title: 'OK Computer',
    artistId: 'a_radiohead',
    artistName: 'Radiohead',
    releaseYear: 1997,
    genres: ['art rock', 'alternative rock', 'electronic'],
    trackCount: 12,
    durationMs: 3204000,
    communityScore: 9.2,
    verifiedScore: 9.4,
    reviewCount: 1247,
    description: 'A panic attack rendered as a rock record. The album that taught a generation what alienation could sound like at the end of a century.'
  },
  {
    id: 'al_blond',
    slug: 'blond',
    title: 'Blond',
    artistId: 'a_frank_ocean',
    artistName: 'Frank Ocean',
    releaseYear: 2016,
    genres: ['alternative R&B', 'art pop', 'psychedelic soul'],
    trackCount: 17,
    durationMs: 3604000,
    communityScore: 9.0,
    verifiedScore: 9.1,
    reviewCount: 1102,
    description: 'A record that withholds as much as it reveals. Built from fragments — voice memos, half-finished thoughts, a memory of a beach.'
  },
  {
    id: 'al_high_violet',
    slug: 'high-violet',
    title: 'High Violet',
    artistId: 'a_the_national',
    artistName: 'The National',
    releaseYear: 2010,
    genres: ['indie rock', 'chamber pop'],
    trackCount: 11,
    durationMs: 2832000,
    communityScore: 8.6,
    verifiedScore: 8.8,
    reviewCount: 543,
    description: 'The album where The National finally became The National. Slow, processional, drunk on its own grandeur.'
  },
  {
    id: 'al_punisher',
    slug: 'punisher',
    title: 'Punisher',
    artistId: 'a_phoebe_bridgers',
    artistName: 'Phoebe Bridgers',
    releaseYear: 2020,
    genres: ['indie folk', 'singer-songwriter'],
    trackCount: 11,
    durationMs: 2520000,
    communityScore: 8.9,
    verifiedScore: 9.0,
    reviewCount: 821,
    description: 'A record that sneaks up on you. Begins as a quiet folk album, ends with a chorus of voices screaming at the apocalypse.'
  },
  {
    id: 'al_currents',
    slug: 'currents',
    title: 'Currents',
    artistId: 'a_tame_impala',
    artistName: 'Tame Impala',
    releaseYear: 2015,
    genres: ['psychedelic pop', 'synth-pop'],
    trackCount: 13,
    durationMs: 3147000,
    communityScore: 8.7,
    verifiedScore: 8.6,
    reviewCount: 962,
    description: 'The pivot album. Kevin Parker trades fuzzy guitars for synthesizers, and turns inward.'
  },
  {
    id: 'al_bloom',
    slug: 'bloom',
    title: 'Bloom',
    artistId: 'a_beach_house',
    artistName: 'Beach House',
    releaseYear: 2012,
    genres: ['dream pop'],
    trackCount: 10,
    durationMs: 3263000,
    communityScore: 8.5,
    verifiedScore: 8.7,
    reviewCount: 412,
    description: 'A dream pop record that operates like a tide — slow, patient, completely committed to its own interior weather.'
  },
  {
    id: 'al_be_the_cowboy',
    slug: 'be-the-cowboy',
    title: 'Be the Cowboy',
    artistId: 'a_mitski',
    artistName: 'Mitski',
    releaseYear: 2018,
    genres: ['art pop', 'indie rock'],
    trackCount: 14,
    durationMs: 1953000,
    communityScore: 8.8,
    verifiedScore: 9.0,
    reviewCount: 718,
    description: 'Fourteen vignettes of loneliness, performance, and want. The shortest songs hit the hardest.'
  },
  {
    id: 'al_carrie_lowell',
    slug: 'carrie-and-lowell',
    title: 'Carrie & Lowell',
    artistId: 'a_sufjan_stevens',
    artistName: 'Sufjan Stevens',
    releaseYear: 2015,
    genres: ['indie folk'],
    trackCount: 11,
    durationMs: 2484000,
    communityScore: 9.1,
    verifiedScore: 9.3,
    reviewCount: 689,
    description: 'A grief album. Sufjan Stevens stripping away his usual maximalism to face the death of his mother in real time.'
  },
  {
    id: 'al_22_million',
    slug: '22-a-million',
    title: '22, A Million',
    artistId: 'a_bon_iver',
    artistName: 'Bon Iver',
    releaseYear: 2016,
    genres: ['indie folk', 'art pop', 'electronic'],
    trackCount: 10,
    durationMs: 2014000,
    communityScore: 8.4,
    verifiedScore: 8.6,
    reviewCount: 387,
    description: 'A radical break with the cabin-folk image. Vernon and his collaborators run their voices through machines until they become weather.'
  },
  {
    id: 'al_fetch_bolt_cutters',
    slug: 'fetch-the-bolt-cutters',
    title: 'Fetch the Bolt Cutters',
    artistId: 'a_fiona_apple',
    artistName: 'Fiona Apple',
    releaseYear: 2020,
    genres: ['art pop', 'chamber pop'],
    trackCount: 13,
    durationMs: 3132000,
    communityScore: 9.0,
    verifiedScore: 9.2,
    reviewCount: 814,
    description: 'Recorded almost entirely at home, made of percussion that sounds like it could be anything. The most unusual major-label release of the decade.'
  },
  {
    id: 'al_two_hands',
    slug: 'two-hands',
    title: 'Two Hands',
    artistId: 'a_big_thief',
    artistName: 'Big Thief',
    releaseYear: 2019,
    genres: ['indie folk', 'indie rock'],
    trackCount: 10,
    durationMs: 2298000,
    communityScore: 8.3,
    verifiedScore: 8.4,
    reviewCount: 256,
    description: 'Big Thief\'s most direct record. Recorded live, played close, refusing to soften its edges.'
  },
  {
    id: 'al_funeral',
    slug: 'funeral',
    title: 'Funeral',
    artistId: 'a_arcade_fire',
    artistName: 'Arcade Fire',
    releaseYear: 2004,
    genres: ['indie rock', 'art rock'],
    trackCount: 10,
    durationMs: 2842000,
    communityScore: 9.0,
    verifiedScore: 9.2,
    reviewCount: 1031,
    description: 'A debut album about mourning that sounds like a celebration. Reframed indie rock as something communal and grand.'
  }
]

export function getAlbum(id: string): Album | undefined {
  return albums.find((a) => a.id === id)
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return albums.find((a) => a.slug === slug)
}

export function getAlbumsByArtist(artistId: string): Album[] {
  return albums
    .filter((a) => a.artistId === artistId)
    .sort((a, b) => b.releaseYear - a.releaseYear)
}

const albumTrackTitles: Record<string, string[]> = {
  al_ok_computer: [
    'Airbag',
    'Paranoid Android',
    'Subterranean Homesick Alien',
    'Exit Music (For a Film)',
    'Let Down',
    'Karma Police',
    'Fitter Happier',
    'Electioneering',
    'Climbing Up the Walls',
    'No Surprises',
    'Lucky',
    'The Tourist'
  ],
  al_blond: [
    'Nikes',
    'Ivy',
    'Pink + White',
    'Be Yourself',
    'Solo',
    'Skyline To',
    'Self Control',
    'Good Guy',
    'Nights',
    'Solo (Reprise)',
    'Pretty Sweet',
    'Facebook Story',
    'Close to You',
    'White Ferrari',
    'Seigfried',
    'Godspeed',
    'Futura Free'
  ],
  al_high_violet: [
    'Terrible Love',
    'Sorrow',
    'Anyone\'s Ghost',
    'Little Faith',
    'Afraid of Everyone',
    'Bloodbuzz Ohio',
    'Lemonworld',
    'Runaway',
    'Conversation 16',
    'England',
    'Vanderlyle Crybaby Geeks'
  ],
  al_punisher: [
    'DVD Menu',
    'Garden Song',
    'Kyoto',
    'Punisher',
    'Halloween',
    'Chinese Satellite',
    'Moon Song',
    'Savior Complex',
    'ICU',
    'Graceland Too',
    'I Know the End'
  ],
  al_currents: [
    'Let It Happen',
    'Nangs',
    'The Moment',
    'Yes I\'m Changing',
    'Eventually',
    'Gossip',
    'The Less I Know the Better',
    'Past Life',
    'Disciples',
    'Cause I\'m a Man',
    'Reality in Motion',
    'Love/Paranoia',
    'New Person, Same Old Mistakes'
  ],
  al_bloom: [
    'Myth',
    'Wild',
    'Lazuli',
    'Other People',
    'The Hours',
    'Troublemaker',
    'New Year',
    'Wishes',
    'On the Sea',
    'Irene'
  ],
  al_be_the_cowboy: [
    'Geyser',
    'Why Didn\'t You Stop Me?',
    'Old Friend',
    'A Pearl',
    'Lonesome Love',
    'Remember My Name',
    'Me and My Husband',
    'Come into the Water',
    'Nobody',
    'Pink in the Night',
    'A Horse Named Cold Air',
    'Washing Machine Heart',
    'Blue Light',
    'Two Slow Dancers'
  ],
  al_carrie_lowell: [
    'Death with Dignity',
    'Should Have Known Better',
    'All of Me Wants All of You',
    'Drawn to the Blood',
    'Eugene',
    'Fourth of July',
    'The Only Thing',
    'Carrie & Lowell',
    'John My Beloved',
    'No Shade in the Shadow of the Cross',
    'Blue Bucket of Gold'
  ],
  al_22_million: [
    '22 (OVER S∞∞N)',
    '10 d E A T h b R E a s T ⚄ ⚄',
    '715 - CR∑∑KS',
    '33 "GOD"',
    '29 #Strafford APTS',
    '666 ʇ',
    '21 M♢♢N WATER',
    '8 (circle)',
    '____45_____',
    '00000 Million'
  ],
  al_fetch_bolt_cutters: [
    'I Want You to Love Me',
    'Shameika',
    'Fetch the Bolt Cutters',
    'Under the Table',
    'Relay',
    'Rack of His',
    'Newspaper',
    'Ladies',
    'Heavy Balloon',
    'Cosmonauts',
    'For Her',
    'Drumset',
    'On I Go'
  ],
  al_two_hands: [
    'Rock and Sing',
    'Forgotten Eyes',
    'The Toy',
    'Two Hands',
    'Those Girls',
    'Shoulders',
    'Replaced',
    'Wolf',
    'Cut My Hair',
    'Turtle'
  ],
  al_funeral: [
    'Neighborhood #1 (Tunnels)',
    'Neighborhood #2 (Laïka)',
    'Une année sans lumière',
    'Neighborhood #3 (Power Out)',
    'Neighborhood #4 (7 Kettles)',
    'Crown of Love',
    'Wake Up',
    'Haïti',
    'Rebellion (Lies)',
    'In the Backseat'
  ]
}

export function getAlbumTracks(albumId: string): Track[] {
  const album = getAlbum(albumId)
  if (!album) return []
  const titles = albumTrackTitles[albumId] ?? []
  const avgMs = Math.floor(album.durationMs / Math.max(titles.length, 1))

  return titles.map((title, i) => {
    const seed = (i + 1) * 17 + albumId.length
    const variance = (seed % 90) * 1000 - 45000
    return {
      id: `t_${albumId}_${i + 1}`,
      title,
      albumId,
      rank: i + 1,
      durationMs: Math.max(60000, avgMs + variance),
      score: Math.round((album.communityScore + ((seed % 9) - 4) / 5) * 10) / 10
    }
  })
}
