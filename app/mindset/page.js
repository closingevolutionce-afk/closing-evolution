import { Quote, Target } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import Button from '@/components/ui/Button'
import MessageOfDay from '@/components/mindset/MessageOfDay'
import { getModule } from '@/lib/knowledge'
import { coreBeliefs, weeklyPillars } from '@/lib/mindset-content'

export const metadata = {
  title: 'Mindset — Closing Evolution',
  description:
    "Le mental d'un closer d'élite : les 6 croyances omnipotentes et la méthode pour viser plus grand.",
}

export default function MindsetPage() {
  const m0 = getModule('M0')
  const mamb = getModule('MAMB')

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />

        <Container className="relative">
          <Badge>Mindset</Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            La technique ne sert à rien sans <span className="gradient-text">conviction</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
            {m0.objectif}. Avant chaque appel, avant chaque script, avant chaque framework — le
            mental.
          </p>

          <MessageOfDay className="mt-8 max-w-xl" />
        </Container>

        <Container className="relative mt-24">
          <SectionHeading
            eyebrow="M0 — Mindset du closer d'élite"
            title="Les 6 croyances omnipotentes"
            description="Elles précèdent la technique. Sans elles, les scripts ne servent à rien."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreBeliefs.map((belief, i) => (
              <GlowCard key={belief.title} delay={i * 0.06}>
                <span className="font-display text-2xl font-bold italic text-volt">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{belief.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                  {belief.description}
                </p>
              </GlowCard>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {m0.bangers.map((banger) => (
              <div
                key={banger}
                className="flex-1 rounded-lg border border-ink-border bg-ink-100/60 p-6"
              >
                <Quote size={18} className="text-volt/50" />
                <p className="mt-3 text-sm italic leading-relaxed text-mist">« {banger} »</p>
              </div>
            ))}
          </div>
        </Container>

        <Container className="relative mt-28">
          <div className="rounded-2xl border border-volt/20 bg-gradient-to-b from-ink-100 to-ink-50 px-8 py-14 sm:px-14">
            <Badge icon={Target}>MAMB — Module Ambition</Badge>
            <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold italic text-white sm:text-4xl">
              « {mamb.concepts_cles[0].replace('PHRASE FONDATRICE : ', '').replace(/^'|'$/g, '')} »
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-muted">
              {mamb.objectif}. Un objectif trop petit ne te demande pas de changer — donc rien ne
              change.
            </p>

            <h3 className="mt-10 font-display text-sm font-bold italic uppercase tracking-wider text-volt">
              Méthode de chiffrage
            </h3>
            <ol className="mt-5 flex flex-col gap-3">
              {mamb.methode_chiffrage.map((step) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-mist">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  {step.replace(/^\d+\.\s*/, '')}
                </li>
              ))}
            </ol>

            <h3 className="mt-10 font-display text-sm font-bold italic uppercase tracking-wider text-volt">
              4 piliers hebdomadaires
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {weeklyPillars.map((pillar) => (
                <div key={pillar.title} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                  <h4 className="font-display text-sm font-bold text-white">{pillar.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-mist-muted">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/arena" size="md">
                Mettre ce mindset en pratique
              </Button>
            </div>
          </div>
        </Container>
      </main>
    </>
  )
}
