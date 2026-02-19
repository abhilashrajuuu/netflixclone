import { buildImageUrl } from '../services/tmdb'
import { useFeaturedMovie } from '../hooks/useMovies'

export function HeroBanner() {
  const { data: movie, loading, error } = useFeaturedMovie()

  const backgroundImage =
    movie && (movie.backdropPath || movie.posterPath)
      ? buildImageUrl(movie.backdropPath ?? movie.posterPath, 'w780')
      : ''

  return (
    <section className="relative h-[70vh] min-h-[420px] max-h-[760px] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage})` }
            : { backgroundColor: '#111' }
        }
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/10 to-transparent" />

      <div className="relative z-10 flex h-full items-end px-4 pb-16 sm:px-8 lg:px-16">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          {loading && (
            <div className="space-y-4">
              <div className="h-10 w-48 rounded bg-zinc-800/70" />
              <div className="space-y-2">
                <div className="h-3 w-full max-w-md rounded bg-zinc-800/70" />
                <div className="h-3 w-5/6 rounded bg-zinc-800/70" />
                <div className="h-3 w-2/3 rounded bg-zinc-800/70" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-24 rounded bg-zinc-800/70" />
                <div className="h-10 w-28 rounded bg-zinc-800/70" />
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="space-y-1 text-sm text-red-400">
              <p>
                Failed to load featured title. Please check your TMDB API key.
              </p>
              <p className="text-xs">{error}</p>
            </div>
          )}

          {!loading && movie && (
            <>
              <h1 className="max-w-md text-3xl font-extrabold drop-shadow-md sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              <p className="hidden max-w-xl text-sm text-zinc-200 drop-shadow sm:block sm:text-base">
                {movie.overview}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 rounded bg-white px-5 py-2 text-sm font-semibold text-black shadow hover:bg-zinc-200">
                  <span>▶</span>
                  <span>Play</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded bg-zinc-600/80 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-zinc-500/80">
                  <span>ℹ</span>
                  <span>More info</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

