'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function FinalCTA() {
  return (
    <section id="rejoindre" className="relative py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-xl border border-volt/25 bg-gradient-to-b from-ink-100 to-ink-50 px-8 py-16 text-center sm:px-16"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-volt-gradient opacity-30 blur-[120px]" />

          <h2 className="relative font-display text-3xl font-bold italic text-white sm:text-4xl lg:text-5xl">
            Ton prochain <span className="gradient-text">closing</span> commence ici
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-base leading-relaxed text-mist-muted sm:text-lg">
            Rejoins Closing Evolution et entre dans l’Arena dès aujourd’hui. Premier roleplay
            offert, sans carte bancaire.
          </p>

          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="#" size="lg">
              Rejoindre gratuitement
              <ArrowRight size={18} />
            </Button>
            <Button href="#fonctionnalites" variant="secondary" size="lg">
              Explorer les fonctionnalités
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
