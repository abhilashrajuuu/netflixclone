import { useEffect, useState } from 'react'
import type { Movie } from '../types/movie'
import { fetchFeatured, fetchList } from '../services/tmdb'

interface MoviesState {
  data: Movie[]
  loading: boolean
  error: string | null
}

export function useMovieList(endpoint: string) {
  const [state, setState] = useState<MoviesState>({
    data: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetchList(endpoint)
      .then((movies) => {
        if (!isMounted) return
        setState({ data: movies, loading: false, error: null })
      })
      .catch((error) => {
        if (!isMounted) return
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      })

    return () => {
      isMounted = false
    }
  }, [endpoint])

  return state
}

interface FeaturedState {
  data: Movie | null
  loading: boolean
  error: string | null
}

export function useFeaturedMovie() {
  const [state, setState] = useState<FeaturedState>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let isMounted = true

    setState((prev) => ({ ...prev, loading: true, error: null }))

    fetchFeatured()
      .then((movie) => {
        if (!isMounted) return
        setState({ data: movie, loading: false, error: null })
      })
      .catch((error) => {
        if (!isMounted) return
        setState({
          data: null,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        })
      })

    return () => {
      isMounted = false
    }
  }, [])

  return state
}

