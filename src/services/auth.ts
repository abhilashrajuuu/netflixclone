const API_BASE =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000'

export interface AuthUser {
  id: number
  username: string
  email: string
  phone?: string | null
}

export interface AuthResponse {
  user: AuthUser
  token: string
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  const data = (await response.json()) as
    | T
    | {
        error?: string
      }

  if (!response.ok) {
    const errorMessage =
      typeof data === 'object' && data && 'error' in data && data.error
        ? data.error
        : `Request failed with status ${response.status}`
    throw new Error(errorMessage)
  }

  return data as T
}

export function login(email: string, password: string) {
  return request<AuthResponse>('/api/auth/login', { email, password })
}

export function register(
  username: string,
  email: string,
  password: string,
  phone?: string,
) {
  return request<AuthResponse>('/api/auth/register', {
    username,
    email,
    password,
    phone,
  })
}

