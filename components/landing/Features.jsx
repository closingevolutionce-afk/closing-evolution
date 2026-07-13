import { Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import { features } from '@/lib/content'

export default function Features() {
  return (
    <section id="fonctionnalites" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Fonctionnalités"
          title="Tout ce qu’il te faut pour progresser vite"
          description="Cinq outils pensés pour créer une vraie boucle de progression : tu t’entraînes, tu mesures, tu corriges, tu recommences."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <GlowCard
                key={feature.title}
                delay={i * 0.08}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span className="rounded-md border border-ink-borderStrong px-3 py-1 text-[11px] font-semibold italic uppercase tracking-wider text-mist-dim">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-muted">
                  {feature.description}
                </p>

                <ul className="mt-5 flex flex-col gap-2.5">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5 text-sm text-mist">
                      <Check size={16} className="mt-0.5 shrink-0 text-volt" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
