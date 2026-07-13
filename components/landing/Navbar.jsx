'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Swords } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const links = [
  { href: '#fonctionnalites', label: 'Fonctionnalités' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#comment-ca-marche', label: 'Comment ça marche' },
  { href: '#avis', label: 'Avis' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist-muted transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button href="#rejoindre" variant="ghost" size="md" className="hidden sm:inline-flex">
              Connexion
            </Button>
            <Button href="#rejoindre" variant="primary" size="md">
              Rejoindre
            </Button>
          </div>
        </nav>
      </Container>
    </header>
  )
}
