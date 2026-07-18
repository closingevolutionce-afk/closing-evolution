'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Clock, Quote, Trophy } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Quiz from '@/components/parcours/Quiz'
import ModuleExtras from '@/components/parcours/ModuleExtras'
import Flashcards from '@/components/parcours/Flashcards'
import SituationDrill from '@/components/parcours/SituationDrill'
import { moduleOrder, completeModule, useProgress } from '@/lib/progress'
import { getLevelForModule, getModule } from '@/lib/knowledge'
import { getFlashcards, getSituationsForModule } from '@/lib/interactive-content'

const NIVEAU_META = {
  fondations: { label: 'Fondations', color: 'text-volt', ring: 'ring-volt/30', bg: 'bg-volt/10' },
  pratique: { label: 'Pratique Avancée', color: 'text-coral', ring: 'ring-coral/30', bg: 'bg-coral/10' },
  elite: { label: 'Élite', color: 'text-amber', ring: 'ring-amber/30', bg: 'bg-amber/10' },
}

export default function ModuleContent({ id, module: m }) {
  const { completed, refresh } = useProgress()
  const niveau = NIVEAU_META[m.niveau]
  const level = getLevelForModule(id)
  const positionInLevel = level.modules.findIndex((mod) => mod.id === id) + 1
  const isDone = Boolean(completed[id])

  const orderIndex = moduleOrder.indexOf(id)
  const nextId = moduleOrder[orderIndex + 1] ?? null
  const nextModule = nextId ? getModule(nextId) : null

  const flashcards = getFlashcards(id)
  const moduleSituations = getSituationsForModule(id)

  async function handlePassed(perfect) {
    await completeModule(id, m.quiz.length, m.quiz.length, perfect)
    await refresh()
  }

  return (
    <Container className="max-w-3xl">
      <Link
        href="/parcours"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-mist-muted transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Retour au parcours
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold italic uppercase tracking-wider ${niveau.color} ${niveau.bg} ring-1 ${niveau.ring}`}
        >
          {niveau.label} · Module {positionInLevel}/{level.modules.length}
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-mist-dim">
          <Clock size={13} />
          {m.duree}
        </span>
        {isDone && (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-volt/10 px-3 py-1.5 text-xs font-semibold italic uppercase tracking-wider text-volt ring-1 ring-volt/30">
            <Check size={13} />
            Validé
          </span>
        )}
      </div>

      <h1 className="mt-5 font-display text-3xl font-bold italic leading-[1.1] text-white sm:text-4xl">
        {m.titre}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-mist-muted">{m.objectif}</p>

      {m.concepts_cles && m.concepts_cles.length > 0 && (
        <div className="mt-10">
          <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
            Ce qu'il faut retenir
          </p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {m.concepts_cles.map((concept, i) => (
              <motion.li
                key={concept}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex gap-3 rounded-lg border border-ink-border bg-ink-100/60 p-4 text-sm leading-relaxed text-mist"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-volt/15 text-volt">
                  <Check size={12} strokeWidth={3} />
                </span>
                {concept}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {m.bangers && m.bangers.length > 0 && (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {m.bangers.map((banger) => (
            <div
              key={banger}
              className="flex-1 rounded-lg border border-ink-border bg-ink-100/60 p-6"
            >
              <Quote size={18} className="text-volt/50" />
              <p className="mt-3 text-sm italic leading-relaxed text-mist">« {banger} »</p>
            </div>
          ))}
        </div>
      )}

      <ModuleExtras id={id} module={m} />

      {flashcards.length > 0 && (
        <div className="mt-14">
          <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
            Flashcards de révision
          </p>
          <p className="mt-1.5 text-sm text-mist-muted">
            Clique sur la carte pour retourner et vérifier ta réponse.
          </p>
          <div className="mt-5">
            <Flashcards cards={flashcards} />
          </div>
        </div>
      )}

      {moduleSituations.length > 0 && (
        <div className="mt-14">
          <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
            Mise en situation
          </p>
          <p className="mt-1.5 text-sm text-mist-muted">
            Un vrai cas, une vraie décision à prendre — comme en appel.
          </p>
          <div className="mt-5">
            <SituationDrill situations={moduleSituations} />
          </div>
        </div>
      )}

      <div className="mt-14">
        <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          Quiz de validation
        </p>
        <p className="mt-1.5 text-sm text-mist-muted">
          100% de bonnes réponses pour débloquer la suite du parcours.
        </p>
        <div className="mt-5">
          {isDone ? (
            <div className="rounded-2xl border border-volt/25 bg-volt/5 p-8 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-volt/15 text-volt ring-1 ring-volt/30">
                <Trophy size={24} />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold italic text-white">
                Module déjà validé — {completed[id].score}/{m.quiz.length}
              </h3>
            </div>
          ) : (
            <Quiz questions={m.quiz} onPassed={handlePassed} />
          )}
        </div>
      </div>

      {isDone && nextModule && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 flex items-center justify-between rounded-2xl border border-ink-border bg-ink-100/60 p-6"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-mist-dim">Module suivant</p>
            <p className="mt-1 font-display text-base font-bold text-white">{nextModule.titre}</p>
          </div>
          <Button href={`/parcours/${nextId.toLowerCase()}`} size="md">
            Continuer
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      )}

      {isDone && !nextModule && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-volt/25 bg-gradient-to-b from-volt/10 to-transparent p-8 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-volt-gradient text-white shadow-glow">
            <Trophy size={24} />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold italic text-white">
            Parcours complet — tu es Master Closer.
          </h3>
          <p className="mt-2 text-sm text-mist-muted">
            Direction l'Arena pour transformer la théorie en réflexe.
          </p>
          <Button href="/arena" size="md" className="mt-6">
            Aller à l'Arena
          </Button>
        </motion.div>
      )}
    </Container>
  )
}
