import { Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import { features } from '@/lib/content'

const TONES = {
  volt: { icon: 'bg-volt/10 text-volt ring-volt/25', tag: 'border-volt/30 text-volt', check: 'text-volt' },
  coral: { icon: 'bg-coral/10 text-coral ring-coral/25', tag: 'border-coral/30 text-coral', check: 'text-coral' },
  amber: { icon: 'bg-amber/10 text-amber ring-amber/25', tag: 'border-amber/30 text-amber', check: 'text-amber' },
  gradient: {
    icon: 'bg-volt-gradient text-white',
    tag: 'border-ink-borderStrong text-mist-dim',
    check: 'text-volt',
  },
}

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
            const tone = TONES[feature.tone] ?? TONES.volt
            return (
              <GlowCard
                key={feature.title}
                delay={i * 0.08}
                className={i === 0 ? 'lg:col-span-2' : ''}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-md ring-1 ${tone.icon}`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <span
                    className={`rounded-md border px-3 py-1 text-[11px] font-semibold italic uppercase tracking-wider ${tone.tag}`}
                  >
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
                      <Check size={16} className={`mt-0.5 shrink-0 ${tone.check}`} />
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
