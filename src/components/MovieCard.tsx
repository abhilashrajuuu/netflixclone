import type { Movie } from '../types/movie'
import { buildImageUrl } from '../services/tmdb'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = buildImageUrl(movie.posterPath ?? movie.backdropPath, 'w342')

  return (
    <article className="group relative mr-2 w-36 flex-shrink-0 cursor-pointer overflow-hidden rounded-md bg-zinc-900/80 text-xs sm:w-40 md:w-48">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={movie.title}
          loading="lazy"
          className="h-52 w-full transform object-cover transition duration-300 group-hover:scale-110 sm:h-56 md:h-64"
        />
      ) : (
        <div className="flex h-52 items-center justify-center bg-zinc-800 text-[0.7rem] text-zinc-300 sm:h-56 md:h-64">
          No image
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-4 space-y-1 p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <h3 className="line-clamp-2 text-[0.7rem] font-semibold sm:text-xs">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-[0.65rem] text-zinc-300 sm:text-[0.7rem]">
          <span className="rounded border border-zinc-500/70 px-1">
            {(movie.rating ?? 0).toFixed(1)}
          </span>
          <span className="uppercase tracking-wide">
            {movie.mediaType === 'tv' ? 'TV' : 'Movie'}
          </span>
        </div>
      </div>
    </article>
  )
}

