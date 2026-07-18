'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Eye, Flame, Sparkles } from 'lucide-react'
import Button from '@/components/ui/Button'
import VoiceButton from '@/components/ui/VoiceButton'
import { useDefiProgress } from '@/lib/defi'

const CATEGORY_COLORS = {
  Technique: 'text-volt bg-volt/10 ring-volt/25',
  Objection: 'text-coral bg-coral/10 ring-coral/25',
  Discovery: 'text-volt bg-volt/10 ring-volt/25',
  Posture: 'text-amber bg-amber/10 ring-amber/25',
  Profil: 'text-coral bg-coral/10 ring-coral/25',
  Mindset: 'text-volt bg-volt/10 ring-volt/25',
  Analyse: 'text-amber bg-amber/10 ring-amber/25',
}

export default function DefiCard({ challenge }) {
  const [response, setResponse] = useState('')
  const [revealed, setRevealed] = useState(false)
  const { doneToday, streak, complete } = useDefiProgress()
  const categoryClasses = CATEGORY_COLORS[challenge.categorie] ?? 'text-volt bg-volt/10 ring-volt/25'

  function reveal() {
    setRevealed(true)
  }

  function markDone() {
    complete(challenge.id)
  }

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-100/60 p-8 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold italic uppercase tracking-wider ring-1 ${categoryClasses}`}
          >
            {challenge.categorie}
          </span>
          <span className="text-xs font-medium text-mist-dim">{challenge.jour}</span>
        </div>
        {streak > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold italic text-coral">
            <Flame size={14} />
            {streak} {streak > 1 ? 'jours' : 'jour'} de suite
          </span>
        )}
      </div>

      <h2 className="mt-5 font-display text-2xl font-bold italic text-white">{challenge.titre}</h2>
      <p className="mt-4 text-base leading-relaxed text-mist-muted">{challenge.consigne}</p>

      <div className="relative mt-6">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={4}
          placeholder="Écris ou dicte ta réponse..."
          className="w-full rounded-lg border border-ink-border bg-ink-100/60 p-4 pr-14 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
        />
        <VoiceButton
          className="absolute right-3 top-3"
          onTranscript={(text) => setResponse((prev) => (prev ? `${prev} ${text}` : text))}
        />
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5 rounded-lg border border-volt/25 bg-volt/5 p-5"
        >
          <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
            Réponse idéale
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">{challenge.reponse_ideale}</p>
        </motion.div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        {!revealed && (
          <Button onClick={reveal} size="md" variant="secondary" disabled={!response.trim()}>
            <Eye size={16} />
            Voir la réponse idéale
          </Button>
        )}
        {doneToday ? (
          <span className="inline-flex items-center gap-2 rounded-md bg-volt/10 px-5 py-2.5 text-sm font-semibold italic text-volt ring-1 ring-volt/30">
            <Sparkles size={16} />
            Défi du jour relevé
          </span>
        ) : (
          <Button onClick={markDone} size="md">
            <Check size={16} />
            Marquer comme fait
          </Button>
        )}
      </div>
    </div>
  )
}
