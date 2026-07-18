'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Trophy, Zap } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Flashcards from '@/components/parcours/Flashcards'
import SituationDrill from '@/components/parcours/SituationDrill'
import DefiCard from '@/components/defi/DefiCard'
import { getRandomFlashcards, getRandomSituation, getChallengeForDate } from '@/lib/interactive-content'

const STEPS = ['flashcards', 'situation', 'defi', 'recap']

export default function DefiExpressFlow() {
  const [stepIndex, setStepIndex] = useState(0)
  const [cards] = useState(() => getRandomFlashcards(3))
  const [situation] = useState(() => getRandomSituation())
  const [challenge] = useState(() => getChallengeForDate())

  const step = STEPS[stepIndex]

  function next() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }

  return (
    <Container className="max-w-2xl">
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
              i <= stepIndex ? 'bg-coral' : 'bg-ink-200'
            }`}
          />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mt-8"
      >
        {step === 'flashcards' && (
          <>
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-coral">
              1/3 — Révision éclair
            </p>
            <div className="mt-4">
              <Flashcards cards={cards} />
            </div>
            <Button onClick={next} size="md" className="mt-6 w-full justify-center">
              Continuer
              <ArrowRight size={16} />
            </Button>
          </>
        )}

        {step === 'situation' && (
          <>
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-coral">
              2/3 — Mise en situation
            </p>
            <div className="mt-4">
              <SituationDrill situations={[situation]} />
            </div>
            <Button onClick={next} size="md" className="mt-6 w-full justify-center">
              Continuer
              <ArrowRight size={16} />
            </Button>
          </>
        )}

        {step === 'defi' && (
          <>
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-coral">
              3/3 — Défi du jour
            </p>
            <div className="mt-4">
              <DefiCard challenge={challenge} />
            </div>
            <Button onClick={next} size="md" className="mt-6 w-full justify-center">
              Terminer
              <ArrowRight size={16} />
            </Button>
          </>
        )}

        {step === 'recap' && (
          <div className="rounded-2xl border border-coral/25 bg-coral/5 p-8 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-coral text-white shadow-glow">
              <Trophy size={24} />
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold italic text-white">
              5 minutes bien utilisées.
            </h2>
            <p className="mt-2 text-sm text-mist-muted">
              5 minutes aujourd'hui = 1 closer meilleur demain.
            </p>
            <Button href="/parcours" size="md" className="mt-6">
              <Zap size={16} />
              Retour au parcours
            </Button>
          </div>
        )}
      </motion.div>
    </Container>
  )
}
