'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, RotateCcw, X } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const AXIS_LABELS = {
  identification: 'Identification de la vraie objection',
  posture: 'Posture stoïque',
}

const LONGUEUR_LABELS = {
  trop_courte: 'Trop courte',
  trop_longue: 'Trop longue',
  adaptee: 'Adaptée',
}

function AxisResult({ label, reussi, commentaire }) {
  return (
    <div className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-md ${
            reussi ? 'bg-volt/15 text-volt' : 'bg-coral/15 text-coral'
          }`}
        >
          {reussi ? <Check size={14} /> : <X size={14} />}
        </span>
        <h3 className="font-display text-sm font-bold text-white">{label}</h3>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-mist-muted">{commentaire}</p>
    </div>
  )
}

export default function ObjectionDrill({ objectionKey, objection, line }) {
  const [response, setResponse] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function submit(e) {
    e.preventDefault()
    if (!response.trim() || submitting) return

    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/objections/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ objection: objectionKey, response: response.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue')
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function retry() {
    setResponse('')
    setResult(null)
    setError(null)
  }

  return (
    <Container className="max-w-2xl">
      <Link
        href="/objections"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-mist-muted transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Retour aux objections
      </Link>

      <div className="rounded-lg rounded-bl-sm bg-ink-300 px-5 py-4 text-sm leading-snug text-mist">
        « {line} »
      </div>

      {!result && (
        <form onSubmit={submit} className="mt-6">
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            disabled={submitting}
            rows={4}
            placeholder="Écris ta réponse à cette objection..."
            className="w-full rounded-lg border border-ink-border bg-ink-100/60 p-4 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none disabled:opacity-60"
          />
          {error && <p className="mt-2 text-xs text-coral">{error}</p>}
          <div className="mt-4 flex justify-end">
            <Button type="submit" size="md" disabled={submitting || !response.trim()}>
              {submitting ? 'Analyse en cours...' : 'Valider ma réponse'}
            </Button>
          </div>
        </form>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-2xl border border-ink-border bg-ink-100/60 p-8 shadow-card"
        >
          <div className="rounded-lg bg-volt-gradient px-4 py-3 text-sm font-medium text-white">
            {response}
          </div>

          <div className="mt-8 flex flex-col items-center gap-1 border-y border-ink-border py-8 text-center">
            <span className="font-display text-xs font-bold italic uppercase tracking-[0.25em] text-volt">
              Score
            </span>
            <span className="font-display text-6xl font-bold text-white">
              {result.score}
              <span className="text-2xl text-mist-dim">/100</span>
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <AxisResult
              label={AXIS_LABELS.identification}
              reussi={result.identification.reussi}
              commentaire={result.identification.commentaire}
            />
            <AxisResult
              label={AXIS_LABELS.posture}
              reussi={result.posture.reussi}
              commentaire={result.posture.commentaire}
            />
          </div>

          <div className="mt-4 rounded-lg border border-ink-border bg-ink-50/60 p-5">
            <h3 className="font-display text-sm font-bold text-white">
              Longueur de la réponse :{' '}
              <span className="text-volt">{LONGUEUR_LABELS[result.longueur.evaluation]}</span>
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-mist-muted">
              {result.longueur.commentaire}
            </p>
          </div>

          <div className="mt-6 border-l-2 border-volt/40 pl-4">
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
              Conseil
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-mist">{result.conseil}</p>
          </div>

          <div className="mt-9 flex flex-wrap gap-4 border-t border-ink-border pt-8">
            <Button onClick={retry} size="md">
              <RotateCcw size={16} />
              Réessayer cette objection
            </Button>
            <Button href="/objections" variant="secondary" size="md">
              Choisir une autre objection
            </Button>
          </div>
        </motion.div>
      )}
    </Container>
  )
}
