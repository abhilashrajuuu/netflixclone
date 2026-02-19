export interface Movie {
  id: number
  title: string
  overview: string
  backdropPath: string | null
  posterPath: string | null
  rating: number
  mediaType: 'movie' | 'tv'
  releaseDate: string
}

