import { useMovieList } from '../hooks/useMovies'
import { MovieCard } from './MovieCard'

interface MovieRowProps {
  title: string
  endpoint: string
  rowId: string
}

export function MovieRow({ title, endpoint, rowId }: MovieRowProps) {
  const { data: movies, loading, error } = useMovieList(endpoint)

  return (
    <section aria-labelledby={rowId} className="space-y-2">
      <div className="flex items-center justify-between px-1">
        <h2
          id={rowId}
          className="text-base font-semibold tracking-tight sm:text-lg"
        >
          {title}
        </h2>
        {loading && (
          <span className="text-xs text-zinc-400 sm:text-sm">Loading…</span>
        )}
      </div>

      {error && !loading && (
        <div className="space-y-1 px-1 text-xs text-red-400 sm:text-sm">
          <p>
            Could not load this row. Check your internet connection and TMDB
            API key.
          </p>
          <p className="text-[0.7rem] sm:text-xs">{error}</p>
        </div>
      )}

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />

        <div className="scrollbar-none relative flex snap-x snap-mandatory space-x-2 overflow-x-auto px-1 pb-2 pt-3">
          {loading &&
            !movies.length &&
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="mr-2 h-52 w-36 flex-shrink-0 rounded-md bg-zinc-900/80 sm:h-56 sm:w-40 md:h-64 md:w-48"
              />
            ))}

          {!loading &&
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      </div>
    </section>
  )
}

