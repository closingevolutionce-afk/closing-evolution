import Link from 'next/link'
import { Swords } from 'lucide-react'
import Container from '@/components/ui/Container'

const columns = [
  {
    title: 'Produit',
    links: [
      { label: 'Arena du Roleplay', href: '/arena' },
      { label: 'Simulateur d’Objections', href: '#fonctionnalites' },
      { label: 'Parcours de formation', href: '#parcours' },
      { label: 'Défi du jour', href: '#fonctionnalites' },
    ],
  },
  {
    title: 'Ressources',
    links: [
      { label: 'Comment ça marche', href: '#comment-ca-marche' },
      { label: 'Avis des closers', href: '#avis' },
      { label: 'FAQ', href: '#' },
    ],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Mentions légales', href: '#' },
      { label: 'Confidentialité', href: '#' },
      { label: 'CGV', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-ink-border py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-volt-gradient text-white">
                <Swords size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold italic text-white">
                Cercle Élite <span className="text-volt">Closing</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-dim">
              La formation francophone qui transforme les débutants en closers d’élite grâce au
              roleplay IA.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-sm font-bold text-white">{col.title}</h4>
                <ul className="mt-4 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-mist-dim transition-colors hover:text-volt"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-border pt-8 sm:flex-row">
          <p className="text-xs text-mist-dim">
            © {new Date().getFullYear()} Cercle Élite Closing. Tous droits réservés.
          </p>
          <p className="text-xs text-mist-dim">Conçu pour les closers francophones.</p>
        </div>
      </Container>
    </footer>
  )
}
