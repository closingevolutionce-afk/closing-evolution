'use client'

import { motion } from 'framer-motion'
import { Lock, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { levels } from '@/lib/content'

export default function Levels() {
  return (
    <section id="parcours" className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 bg-volt-gradient opacity-5 blur-[120px]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Parcours de formation"
          title="Un chemin clair, du débutant au Master Closer"
          description="Chaque module se débloque après validation du précédent. Pas de raccourci — juste une vraie progression."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {levels.map((level, i) => (
            <motion.div
              key={level.tier}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl border border-ink-border bg-ink-100/60 p-7"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-bold italic uppercase tracking-wider text-volt">
                  {level.range}
                </span>
                {i === 2 ? (
                  <Trophy size={18} className="text-amber" />
                ) : (
                  <Lock size={16} className="text-mist-dim" />
                )}
              </div>

              <h3 className="mt-4 font-display text-2xl font-bold text-white">{level.tier}</h3>
              <p className="mt-1 text-sm font-medium text-mist-muted">
                {level.title} · {level.moduleCount} modules
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mist-muted">{level.description}</p>

              <div className="mt-6 flex items-center gap-2 border-t border-ink-border pt-5">
                <span className="h-2 w-2 rounded-full bg-volt" />
                <span className="text-xs font-semibold uppercase tracking-wider text-mist-dim">
                  Rang débloqué : <span className="text-white">{level.rank}</span>
                </span>
              </div>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-ink-300">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(i + 1) * 33}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                  className="h-full rounded-full bg-volt-gradient"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button href="/parcours" size="lg">
            Découvrir les 20 modules
          </Button>
        </div>
      </Container>
    </section>
  )
}
