'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, RotateCcw, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function SituationDrill({ situations }) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState(null)

  const situation = situations[index]
  const isLast = index === situations.length - 1
  const chosen = picked ? situation.options.find((o) => o.lettre === picked) : null

  function pick(lettre) {
    if (picked) return
    setPicked(lettre)
  }

  function next() {
    setPicked(null)
    setIndex((i) => (isLast ? 0 : i + 1))
  }

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-100/60 p-7">
      {situations.length > 1 && (
        <span className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          Situation {index + 1}/{situations.length}
        </span>
      )}
      <h3 className="mt-2 font-display text-lg font-bold text-white">{situation.titre}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist-muted">{situation.contexte}</p>
      <p className="mt-4 font-display text-sm font-bold italic text-volt-soft">
        {situation.question}
      </p>

      <div className="mt-5 flex flex-col gap-2.5">
        {situation.options.map((option) => {
          const isPicked = picked === option.lettre
          let stateClasses = 'border-ink-border hover:border-volt/40'
          if (picked) {
            if (option.correct) stateClasses = 'border-volt bg-volt/10'
            else if (isPicked) stateClasses = 'border-coral bg-coral/10'
            else stateClasses = 'border-ink-border opacity-40'
          }
          return (
            <button
              key={option.lettre}
              type="button"
              onClick={() => pick(option.lettre)}
              disabled={Boolean(picked)}
              className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left text-sm text-mist transition-colors ${stateClasses}`}
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-ink-200 text-[11px] font-bold text-mist-dim">
                {option.lettre}
              </span>
              <span className="flex-1">{option.texte}</span>
              {picked && option.correct && (
                <Check size={16} className="mt-0.5 shrink-0 text-volt" />
              )}
              {picked && isPicked && !option.correct && (
                <X size={16} className="mt-0.5 shrink-0 text-coral" />
              )}
            </button>
          )
        })}
      </div>

      {chosen && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className={`mt-5 rounded-lg border-l-2 p-4 text-sm leading-relaxed ${
            chosen.correct
              ? 'border-volt bg-volt/5 text-mist'
              : 'border-coral bg-coral/5 text-mist'
          }`}
        >
          {chosen.explication}
        </motion.div>
      )}

      {picked && (
        <div className="mt-5 flex justify-end">
          <Button onClick={next} size="md" variant="secondary">
            <RotateCcw size={14} />
            {isLast ? 'Recommencer' : 'Situation suivante'}
          </Button>
        </div>
      )}
    </div>
  )
}
