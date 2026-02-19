import type { Movie } from '../types/movie'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN as string | undefined

if (!API_KEY && !ACCESS_TOKEN) {
  // Warn during development if the key is missing
  // This will not leak the key value itself.
  console.warn(
    '[TMDB] Missing credentials. Set either VITE_TMDB_API_KEY (v3) or VITE_TMDB_ACCESS_TOKEN (v4) in a .env file at the project root, then restart the dev server.',
  )
}

type TMDBMediaType = 'movie' | 'tv'

export interface TMDBResult {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path: string | null
  poster_path: string | null
  vote_average: number
  media_type?: TMDBMediaType
  release_date?: string
  first_air_date?: string
}

interface TMDBListResponse {
  results: TMDBResult[]
}

export const buildImageUrl = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500',
) => {
  if (!path) return ''
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

async function request<T>(
  path: string,
  params?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${path}`)

  url.searchParams.set('language', 'en-US')

  const headers: HeadersInit = {}

  if (ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`
  } else if (API_KEY) {
    url.searchParams.set('api_key', API_KEY)
  } else {
    throw new Error(
      'Missing TMDB credentials. Set VITE_TMDB_API_KEY or VITE_TMDB_ACCESS_TOKEN and restart the dev server.',
    )
  }

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    })
  }

  const response = await fetch(url.toString(), { headers })

  if (!response.ok) {
    let message = `TMDB request failed with status ${response.status}`
    try {
      const maybeJson = (await response.json()) as Partial<{
        status_message: string
      }>
      if (maybeJson.status_message) {
        message = `${message}: ${maybeJson.status_message}`
      }
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message)
  }

  return (await response.json()) as T
}

export async function fetchList(path: string): Promise<Movie[]> {
  const data = await request<TMDBListResponse>(path)

  return data.results.map((item) => ({
    id: item.id,
    title: item.title ?? item.name ?? 'Untitled',
    overview: item.overview,
    backdropPath: item.backdrop_path,
    posterPath: item.poster_path,
    rating: item.vote_average,
    mediaType: item.media_type ?? 'movie',
    releaseDate: item.release_date ?? item.first_air_date ?? '',
  }))
}

export async function fetchFeatured(): Promise<Movie | null> {
  const movies = await fetchList('/trending/all/week')
  if (!movies.length) return null

  // Pick a random item from the trending list
  const index = Math.floor(Math.random() * movies.length)
  return movies[index] ?? null
}

