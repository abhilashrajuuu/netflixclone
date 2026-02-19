import { useState } from 'react'
import type { FormEvent } from 'react'
import { login, register, type AuthUser } from '../services/auth'

interface AuthPageProps {
  onAuthSuccess: (user: AuthUser, token: string) => void
}

type Mode = 'login' | 'register'

export function AuthPage({ onAuthSuccess }: AuthPageProps) {
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'login') {
        const result = await login(email, password)
        onAuthSuccess(result.user, result.token)
      } else {
        const result = await register(username, email, password, phone || undefined)
        onAuthSuccess(result.user, result.token)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-900 via-black to-black px-4">
      <div className="w-full max-w-md rounded-xl bg-black/80 p-6 shadow-xl ring-1 ring-zinc-800/80">
        <h1 className="mb-1 text-2xl font-bold">
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </h1>
        <p className="mb-4 text-sm text-zinc-300">
          {mode === 'login'
            ? 'Use your email and password to continue.'
            : 'Sign up with a new account to continue.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  className="w-full rounded bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-700 focus:ring-red-600"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium">Phone (optional)</label>
                <input
                  type="tel"
                  className="w-full rounded bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-700 focus:ring-red-600"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-1">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-700 focus:ring-red-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded bg-zinc-900 px-3 py-2 text-sm outline-none ring-1 ring-zinc-700 focus:ring-red-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700 disabled:opacity-60"
          >
            {loading
              ? 'Please wait...'
              : mode === 'login'
                ? 'Sign in'
                : 'Create account'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-zinc-300">
          {mode === 'login' ? (
            <>
              New here?{' '}
              <button
                type="button"
                className="font-semibold text-white hover:underline"
                onClick={() => {
                  setMode('register')
                  setError(null)
                }}
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                className="font-semibold text-white hover:underline"
                onClick={() => {
                  setMode('login')
                  setError(null)
                }}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

