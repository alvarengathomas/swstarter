export interface SearchResult {
  uid: string
  properties: {
    name?: string
    title?: string
  }
}

export interface PersonData {
  success: boolean
  person: {
    name: string
    birth_year: string
    gender: string
    eye_color: string
    hair_color: string
    height: string
    mass: string
  }
  films: Array<{
    uid: string
    title: string
  }>
}

export interface FilmData {
  success: boolean
  film: {
    title: string
    opening_crawl: string
    director: string
    producer: string
    release_date: string
  }
  characters: Array<{
    uid: string
    name: string
  }>
}