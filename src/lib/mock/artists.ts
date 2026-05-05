import type { Artist } from '@/lib/types'

export const artists: Artist[] = [
  {
    id: 'a_radiohead',
    slug: 'radiohead',
    name: 'Radiohead',
    formedYear: 1985,
    origin: 'Abingdon, England',
    genres: ['art rock', 'alternative rock', 'electronic'],
    bio: 'Formed in 1985, Radiohead spent the late 90s and early 2000s redefining what a rock band could sound like — pulling guitar music apart at the seams with electronics, classical arrangements, and a deep distrust of the world they were singing about.'
  },
  {
    id: 'a_frank_ocean',
    slug: 'frank-ocean',
    name: 'Frank Ocean',
    formedYear: null,
    origin: 'New Orleans, USA',
    genres: ['alternative R&B', 'art pop', 'soul'],
    bio: 'A reluctant pop figure whose two studio albums and one visual project have shaped a decade of R&B. His silences have become almost as influential as his releases.'
  },
  {
    id: 'a_the_national',
    slug: 'the-national',
    name: 'The National',
    formedYear: 1999,
    origin: 'Cincinnati / Brooklyn',
    genres: ['indie rock', 'chamber pop'],
    bio: 'Five musicians who have spent two decades writing very serious songs about late nights, family, and the slow crawl of getting older.'
  },
  {
    id: 'a_phoebe_bridgers',
    slug: 'phoebe-bridgers',
    name: 'Phoebe Bridgers',
    formedYear: null,
    origin: 'Los Angeles, USA',
    genres: ['indie folk', 'singer-songwriter'],
    bio: 'A songwriter who turns small moments into vast emotional landscapes. Her work threads grief and humor with unsettling precision.'
  },
  {
    id: 'a_tame_impala',
    slug: 'tame-impala',
    name: 'Tame Impala',
    formedYear: 2007,
    origin: 'Perth, Australia',
    genres: ['psychedelic pop', 'neo-psychedelia', 'synth-pop'],
    bio: 'Kevin Parker’s solo project that became a stadium-filling psychedelic pop machine without ever quite leaving his bedroom studio.'
  },
  {
    id: 'a_beach_house',
    slug: 'beach-house',
    name: 'Beach House',
    formedYear: 2004,
    origin: 'Baltimore, USA',
    genres: ['dream pop', 'indie pop'],
    bio: 'Two musicians, a steadfast aesthetic, eight albums of slow-burning dream pop that rewards patience.'
  },
  {
    id: 'a_mitski',
    slug: 'mitski',
    name: 'Mitski',
    formedYear: null,
    origin: 'New York, USA',
    genres: ['indie rock', 'art pop'],
    bio: 'A songwriter who turns longing and rage into compact, vivid pop songs. Her live show is a kind of theater.'
  },
  {
    id: 'a_sufjan_stevens',
    slug: 'sufjan-stevens',
    name: 'Sufjan Stevens',
    formedYear: null,
    origin: 'Detroit, USA',
    genres: ['indie folk', 'baroque pop', 'electronic'],
    bio: 'A maximalist folk songwriter who has built entire universes around states, family losses, and the slow work of belief.'
  },
  {
    id: 'a_bon_iver',
    slug: 'bon-iver',
    name: 'Bon Iver',
    formedYear: 2006,
    origin: 'Eau Claire, USA',
    genres: ['indie folk', 'art pop'],
    bio: 'Justin Vernon’s project that began in a Wisconsin cabin and now lives somewhere between folk, electronics, and gospel.'
  },
  {
    id: 'a_fiona_apple',
    slug: 'fiona-apple',
    name: 'Fiona Apple',
    formedYear: null,
    origin: 'New York, USA',
    genres: ['art pop', 'singer-songwriter', 'chamber pop'],
    bio: 'A songwriter who has spent thirty years refusing to be smoothed out. Each album arrives on its own schedule and on its own terms.'
  },
  {
    id: 'a_big_thief',
    slug: 'big-thief',
    name: 'Big Thief',
    formedYear: 2015,
    origin: 'Brooklyn, USA',
    genres: ['indie folk', 'indie rock'],
    bio: 'Adrianne Lenker and her band quietly making some of the most lived-in folk records of the decade.'
  },
  {
    id: 'a_arcade_fire',
    slug: 'arcade-fire',
    name: 'Arcade Fire',
    formedYear: 2001,
    origin: 'Montreal, Canada',
    genres: ['indie rock', 'art rock'],
    bio: 'A Montreal collective whose first three records redefined what indie rock could ask of its listeners.'
  }
]

export function getArtist(id: string): Artist | undefined {
  return artists.find((a) => a.id === id)
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug)
}
