'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import HeroMockup from '@/components/landing/HeroMockup'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-40 lg:pb-32 lg:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge icon={Sparkles}>Propulsé par l’IA</Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              Deviens un closer <span className="gradient-text">d’élite</span>, un appel à la fois.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-mist-muted"
            >
              La formation francophone qui te fait affronter de vrais prospects IA en temps réel,
              t’entraîne sur les objections qui te font perdre des deals, et transforme chaque
              session en progrès mesurable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="/arena" size="lg">
                Entrer dans l’Arena
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </Button>
              <Button href="#comment-ca-marche" variant="secondary" size="lg">
                <Play size={16} />
                Voir comment ça marche
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-12 flex items-center gap-5"
            >
              <div className="flex -space-x-3">
                {['#a480ff', '#ff8a72', '#c8b8ff', '#fbbf24'].map((color, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full border-2 border-ink ring-1 ring-white/10"
                    style={{ background: `linear-gradient(135deg, ${color}, #281f4d)` }}
                  />
                ))}
              </div>
              <p className="text-sm text-mist-muted">
                <span className="font-semibold text-white">Des dizaines de closers</span>{' '}
                s’entraînent déjà
              </p>
            </motion.div>
          </div>

          <HeroMockup />
        </div>
      </Container>
    </section>
  )
}
