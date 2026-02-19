import { useState, useRef, useEffect } from 'react'
import type { AuthUser } from '../services/auth'

interface NavbarProps {
  user: AuthUser
  onLogout: () => void
}

export function Navbar({ user, onLogout }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user.username.slice(0, 2).toUpperCase()

  return (
    <header className="fixed inset-x-0 top-0 z-20 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <div className="flex items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-2 sm:gap-6">
          <div className="h-7 w-16 rounded-sm bg-red-600 text-center text-lg font-extrabold tracking-tight sm:h-8 sm:w-20">
            <span className="align-middle">N</span>
          </div>
          <nav className="hidden gap-4 text-sm text-zinc-200 sm:flex">
            <button className="hover:text-white transition-colors">Home</button>
            <button className="hover:text-white transition-colors">TV Shows</button>
            <button className="hover:text-white transition-colors">Movies</button>
            <button className="hover:text-white transition-colors">New &amp; Popular</button>
            <button className="hover:text-white transition-colors">My List</button>
          </nav>
        </div>

        {/* Right: Profile avatar + dropdown */}
        <div className="relative flex items-center gap-3" ref={dropdownRef}>
          <button
            id="profile-avatar-btn"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 group focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {/* Avatar circle */}
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-transparent group-hover:ring-red-500 transition-all">
              {initials}
            </div>
            {/* Caret */}
            <svg
              className={`w-3 h-3 text-zinc-300 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              id="profile-dropdown"
              className="absolute right-0 top-full mt-2 w-56 rounded-md bg-zinc-900 border border-zinc-700 shadow-2xl"
              role="menu"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center text-sm font-bold text-white shadow">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                    <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Profile
                </button>
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 hover:text-white transition-colors"
                  role="menuitem"
                  onClick={() => setDropdownOpen(false)}
                >
                  <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Account Settings
                </button>
              </div>

              {/* Divider + Logout */}
              <div className="border-t border-zinc-700 py-1">
                <button
                  id="logout-btn"
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
                  role="menuitem"
                  onClick={() => {
                    setDropdownOpen(false)
                    onLogout()
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign out of Netflix
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
