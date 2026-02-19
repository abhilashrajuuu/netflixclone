import { useEffect, useState } from 'react'
import { HeroBanner } from './components/HeroBanner'
import { MovieRow } from './components/MovieRow'
import { Navbar } from './components/Navbar'
import { AuthPage } from './components/AuthPage'
import type { AuthUser } from './services/auth'

const STORAGE_KEY = 'netflix_clone_auth'

interface StoredAuth {
  user: AuthUser
  token: string
}

function App() {
  const [auth, setAuth] = useState<StoredAuth | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        setAuth(JSON.parse(raw) as StoredAuth)
      }
    } catch {
      // ignore storage errors
    }
  }, [])

  const handleAuthSuccess = (user: AuthUser, token: string) => {
    const value: StoredAuth = { user, token }
    setAuth(value)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }

  const handleLogout = () => {
    setAuth(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  if (!auth) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />
  }

  return (
    <div className="bg-gradient-to-b from-zinc-900/80 via-black to-black min-h-screen text-white">
      <Navbar user={auth.user} onLogout={handleLogout} />
      <main className="relative z-0">
        <HeroBanner />
        <section className="space-y-8 px-4 pb-10 sm:px-8 lg:px-12 -mt-24 relative z-10">
          <MovieRow
            title="Trending Now"
            endpoint="/trending/all/week"
            rowId="trending"
          />
          <MovieRow
            title="Top Rated"
            endpoint="/movie/top_rated"
            rowId="top-rated"
          />
          <MovieRow
            title="Popular Movies"
            endpoint="/movie/popular"
            rowId="popular-movies"
          />
          <MovieRow
            title="Upcoming Movies"
            endpoint="/movie/upcoming"
            rowId="upcoming-movies"
          />
          <MovieRow
            title="Popular TV Shows"
            endpoint="/tv/popular"
            rowId="popular-tv"
          />
        </section>
      </main>
    </div>
  )
}

export default App
