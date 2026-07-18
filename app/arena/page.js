import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import { prospectProfiles, prospectProfileKeys } from '@/lib/knowledge'
import { arenaCards } from '@/lib/arena-content'
import MessageOfDay from '@/components/mindset/MessageOfDay'

export const metadata = {
  title: 'Arena du Roleplay — Closing Evolution',
  description: 'Choisis ton adversaire et entraîne-toi face à un prospect IA en temps réel.',
}

export default function ArenaPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />

        <Container className="relative">
          <Badge>Arena du Roleplay</Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            Choisis ton <span className="gradient-text">adversaire</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
            L'IA joue un vrai prospect avec une personnalité cohérente du début à la fin. Elle ne
            lâche rien facilement — à toi de mener l'appel.
          </p>

          <MessageOfDay className="mt-8 max-w-xl" />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {prospectProfileKeys.map((key) => {
              const profile = prospectProfiles[key]
              const card = arenaCards[key]
              const Icon = card.icon
              return (
                <Link
                  key={key}
                  href={`/arena/${key}`}
                  className="group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-100/60 p-7 shadow-card transition-colors duration-300 hover:border-volt/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <span className="rounded-md border border-ink-borderStrong px-3 py-1 text-[11px] font-semibold italic uppercase tracking-wider text-mist-dim">
                      {card.difficulty}
                    </span>
                  </div>

                  <h2 className="mt-6 font-display text-xl font-bold text-white">
                    {profile.nom}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist-muted">
                    {profile.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-ink-border pt-5 text-sm font-semibold italic text-volt">
                    Entrer dans l'appel
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </main>
    </>
  )
}
