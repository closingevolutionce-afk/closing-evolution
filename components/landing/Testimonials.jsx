import { Quote } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import GlowCard from '@/components/ui/GlowCard'
import { testimonials } from '@/lib/content'

export default function Testimonials() {
  return (
    <section id="avis" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Ils ont progressé"
          title="Des closers, pas des témoignages en carton"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <GlowCard key={t.name} delay={i * 0.1}>
              <Quote size={22} className="text-emerald/50" />
              <p className="mt-5 text-sm leading-relaxed text-mist">“{t.quote}”</p>
              <div className="mt-6 flex items-center gap-3 border-t border-ink-border pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald/15 font-display text-sm font-bold text-emerald ring-1 ring-emerald/25">
                  {t.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-mist-dim">{t.role}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
