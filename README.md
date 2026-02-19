## Netflix-style TMDB UI (React + Vite + Tailwind)

This project is a Netflix-style landing page using the TMDB API for movies and TV shows.

### 1. Prerequisites

- Node.js 18+ and npm
- A TMDB API key (create one at `https://www.themoviedb.org/`)

### 2. Environment setup

1. In the project root, create a `.env` file (do **not** commit this file):

   ```bash
   cp .env.example .env
   ```

2. Open `.env` and set your keys:

   ```bash
   VITE_TMDB_API_KEY=your_real_tmdb_api_key_here
   DATABASE_URL=your_database_connection_url_here   # from your DB provider (e.g. Aiven)
   JWT_SECRET=some_long_random_string               # used to sign login tokens
   ```

   Never paste your real key into chats or commit it to Git.

### 3. Install dependencies

From the project root (frontend):

```bash
npm install
```

For the backend auth server:

```bash
cd server
npm install
npm run dev
```

The backend will listen on `http://localhost:4000`.

### 4. Run the app locally (frontend)

```bash
npm run dev
```

Then open the URL shown in the terminal (typically `http://localhost:5173`).

### 5. Features

- Hero banner with a random featured trending title
- Horizontal scrollable rows:
  - Trending Now
  - Top Rated
  - Popular Movies
  - Upcoming Movies
  - Popular TV Shows
- Movie cards with hover scale and overlay details
- Responsive layout (mobile → desktop)
- Loading skeletons and basic error messages per row and hero

### 6. Project structure (key parts)

- `src/services/tmdb.ts` — TMDB API client and helpers
- `src/hooks/useMovies.ts` — reusable hooks for lists and featured movie
- `src/components/Navbar.tsx` — top navigation bar
- `src/components/HeroBanner.tsx` — main hero section
- `src/components/MovieRow.tsx` — horizontal scrollable row
- `src/components/MovieCard.tsx` — individual movie/TV thumbnail
- `src/types/movie.ts` — shared movie type

### 7. Tailwind CSS

- Tailwind CSS v4 is integrated using the `@tailwindcss/vite` plugin in `vite.config.ts`.
- Global styles and Tailwind import live in `src/index.css`.

### 8. Deployment (optional)

You can build and deploy as a static site:

```bash
npm run build
npm run preview   # to test the production build locally
```

Then deploy the `dist` folder to any static host (Netlify, Vercel, GitHub Pages, etc.). Make sure to add your `VITE_TMDB_API_KEY` as an environment variable in your hosting provider settings.

### 9. Possible improvements

- Add routing for detail pages per movie/TV show
- Add search and filtering by genre
- Implement authentication and a real user "My List"
- Add skeleton loaders and shimmer effects for a more polished feel
- Persist user preferences (e.g., last watched row) with local storage

