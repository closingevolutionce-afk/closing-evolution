'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Heart, RotateCcw, Sparkles, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { playCorrect, playIncorrect, vibrate } from '@/lib/sounds'

export default function Quiz({ questions, onPassed }) {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctFlags, setCorrectFlags] = useState([])
  const [finished, setFinished] = useState(false)
  const [hadMistake, setHadMistake] = useState(false)
  const [lives, setLives] = useState(3)

  const current = questions[index]
  const isLast = index === questions.length - 1
  const score = correctFlags.filter(Boolean).length
  const passed = finished && score === questions.length

  function pick(option) {
    if (selected) return
    const correct = option === current.reponse
    if (!correct) {
      setHadMistake(true)
      setLives((l) => Math.max(0, l - 1))
      playIncorrect()
      vibrate(20)
    } else {
      playCorrect()
      vibrate(10)
    }
    setSelected(option)
    setCorrectFlags((prev) => [...prev, correct])
  }

  function next() {
    if (isLast) {
      setFinished(true)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  function retry() {
    setIndex(0)
    setSelected(null)
    setCorrectFlags([])
    setFinished(false)
    setHadMistake(false)
    setLives(3)
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border border-ink-border bg-ink-100/60 p-8 text-center"
      >
        {passed ? (
          <>
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-volt/15 text-volt ring-1 ring-volt/30">
              <Sparkles size={24} />
            </span>
            <h3 className="mt-4 font-display text-xl font-bold italic text-white">
              Module validé — {score}/{questions.length}
            </h3>
            {!hadMistake && (
              <p className="mt-1.5 text-xs font-bold uppercase tracking-wider text-volt">
                Perfect — +100 XP bonus
              </p>
            )}
            <p className="mt-2 text-sm text-mist-muted">Le module suivant vient de se débloquer.</p>
            <Button onClick={() => onPassed(!hadMistake)} size="md" className="mt-6">
              Continuer
            </Button>
          </>
        ) : (
          <>
            <h3 className="font-display text-xl font-bold italic text-white">
              {score}/{questions.length} — pas encore validé
            </h3>
            <p className="mt-2 text-sm text-mist-muted">
              Il faut tout juste pour valider le module. Retente.
            </p>
            <Button onClick={retry} size="md" className="mt-6">
              <RotateCcw size={16} />
              Recommencer le quiz
            </Button>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-100/60 p-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          Question {index + 1}/{questions.length}
        </span>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <Heart
              key={i}
              size={16}
              className={i < lives ? 'fill-coral text-coral' : 'text-ink-border'}
            />
          ))}
        </div>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-white">{current.question}</h3>
      <div className="mt-5 flex flex-col gap-2.5">
        {current.options.map((option) => {
          const isSelected = selected === option
          const isCorrectOption = option === current.reponse
          let stateClasses = 'border-ink-border hover:border-volt/40'
          if (selected) {
            if (isCorrectOption) stateClasses = 'border-volt bg-volt/10'
            else if (isSelected) stateClasses = 'border-coral bg-coral/10'
            else stateClasses = 'border-ink-border opacity-40'
          }
          return (
            <button
              key={option}
              type="button"
              onClick={() => pick(option)}
              disabled={Boolean(selected)}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm text-mist transition-colors ${stateClasses}`}
            >
              {option}
              {selected && isCorrectOption && <Check size={16} className="shrink-0 text-volt" />}
              {selected && isSelected && !isCorrectOption && (
                <X size={16} className="shrink-0 text-coral" />
              )}
            </button>
          )
        })}
      </div>
      {selected && (
        <div className="mt-5 flex justify-end">
          <Button onClick={next} size="md">
            {isLast ? 'Voir mon résultat' : 'Question suivante'}
          </Button>
        </div>
      )}
    </div>
  )
}
