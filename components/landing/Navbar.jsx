'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, LogOut, Swords, User } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useAuth } from '@/components/auth/AuthProvider'
import NotificationBell from '@/components/notifications/NotificationBell'
import { getLevelProgress } from '@/lib/xp'
import { cn } from '@/lib/utils'

const links = [
  { href: '/arena', label: 'Arena' },
  { href: '/objections', label: 'Objections' },
  { href: '/mindset', label: 'Mindset' },
  { href: '/parcours', label: 'Parcours' },
  { href: '/defi', label: 'Défis' },
  { href: '/replays', label: 'Replays' },
]

function UserMenu({ user, profile, signOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const { level, percent } = getLevelProgress(profile?.xp ?? 0)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-md border border-ink-border py-1.5 pl-1.5 pr-2.5 transition-colors hover:border-volt/40"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-volt-gradient text-xs font-bold text-white">
          {(profile?.prenom ?? user.email)[0]?.toUpperCase()}
        </span>
        <span className="hidden text-sm font-medium text-white sm:inline">
          {profile?.prenom ?? 'Profil'}
        </span>
        <ChevronDown size={14} className="text-mist-dim" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-64 rounded-lg border border-ink-border bg-ink-50 p-4 shadow-card">
          {profile && (
            <div className="mb-3 border-b border-ink-border pb-3">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wide text-mist-dim">
                <span className="font-bold italic text-volt">{level.label}</span>
                <span>{profile.xp ?? 0} XP</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-200">
                <div
                  className="h-full rounded-full bg-volt-gradient transition-all duration-700"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}
          <Link
            href="/profil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 rounded-md px-2 py-2 text-sm text-mist transition-colors hover:bg-ink-100 hover:text-white"
          >
            <User size={15} />
            Mon profil
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left text-sm text-coral transition-colors hover:bg-ink-100"
          >
            <LogOut size={15} />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { user, profile, signOut } = useAuth()

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = profile?.role === 'admin' ? [...links, { href: '/coach', label: 'Coach' }] : links

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <Container>
        <nav
          className={cn(
            'flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300',
            scrolled && 'glass border border-ink-border shadow-card'
          )}
        >
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-volt-gradient text-white">
              <Swords size={18} strokeWidth={2.5} />
            </span>
            <span className="hidden flex-col leading-tight xl:flex">
              <span className="font-display text-lg font-bold italic text-white">
                Closing <span className="text-volt">Evolution</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-mist-dim">
                Doute moins. Close plus.
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-mist-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {user ? (
            <div className="flex shrink-0 items-center gap-2.5">
              <NotificationBell />
              <UserMenu user={user} profile={profile} signOut={signOut} />
            </div>
          ) : (
            <div className="flex shrink-0 items-center gap-3">
              <Button href="/login" variant="ghost" size="md" className="hidden sm:inline-flex">
                Connexion
              </Button>
              <Button href="/signup" variant="primary" size="md">
                Candidater
              </Button>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}
