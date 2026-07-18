'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Swords } from 'lucide-react'
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
  { href: '/defi', label: 'Défi du jour' },
  { href: '/replays', label: 'Replays' },
]

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
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-volt-gradient text-white">
              <Swords size={18} strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg font-bold italic text-white">
              Cercle Élite <span className="text-volt">Closing</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              {profile && (
                <div className="hidden items-center gap-2 rounded-md border border-ink-border px-3 py-1.5 md:flex">
                  <span className="text-[11px] font-bold italic uppercase tracking-wider text-volt">
                    {getLevelProgress(profile.xp ?? 0).level.label}
                  </span>
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-ink-200">
                    <div
                      className="h-full rounded-full bg-volt-gradient transition-all duration-700"
                      style={{ width: `${getLevelProgress(profile.xp ?? 0).percent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-mist-dim">{profile.xp ?? 0} XP</span>
                </div>
              )}
              <Link
                href="/profil"
                className="flex items-center gap-2.5 rounded-md border border-ink-border px-3 py-1.5 transition-colors hover:border-volt/40"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-volt-gradient text-xs font-bold text-white">
                  {(profile?.prenom ?? user.email)[0]?.toUpperCase()}
                </span>
                <span className="hidden text-sm font-medium text-white sm:inline">
                  {profile?.prenom ?? 'Profil'}
                </span>
              </Link>
              <NotificationBell />
              <Button onClick={signOut} variant="ghost" size="md" className="hidden sm:inline-flex">
                Déconnexion
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button href="/login" variant="ghost" size="md" className="hidden sm:inline-flex">
                Connexion
              </Button>
              <Button href="/signup" variant="primary" size="md">
                Rejoindre
              </Button>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}
