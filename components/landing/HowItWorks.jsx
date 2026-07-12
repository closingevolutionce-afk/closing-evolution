'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import { steps } from '@/lib/content'

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="relative py-28">
      <Container>
        <SectionHeading
          eyebrow="Comment ça marche"
          title="De la première session au premier closing"
          description="Une boucle simple, répétée jusqu’à ce qu’elle devienne un réflexe."
        />

        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-ink-border to-transparent lg:block" />
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative flex flex-col gap-4"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald/25 bg-ink-100 font-display text-xl font-bold text-emerald shadow-glow">
                {step.number}
              </span>
              <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-mist-muted">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
