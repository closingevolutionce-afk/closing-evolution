'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, PhoneOff, RotateCcw, Send } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import VoiceButton from '@/components/ui/VoiceButton'
import { ARENA_MAX_MESSAGES } from '@/lib/arena-constants'
import { arenaCards } from '@/lib/arena-content'

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const FEEDBACK_LABELS = {
  accroche: 'Accroche',
  decouverte: 'Découverte',
  gestion_objections: 'Gestion des objections',
  pitch: 'Pitch',
  conclusion: 'Conclusion',
}

export default function ArenaChat({ profileKey, profile }) {
  const ProspectIcon = arenaCards[profileKey]?.icon
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  const [elapsed, setElapsed] = useState(0)
  const [callEnded, setCallEnded] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackError, setFeedbackError] = useState(null)

  const scrollRef = useRef(null)
  const limitReached = messages.length >= ARENA_MAX_MESSAGES

  useEffect(() => {
    if (callEnded) return
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000)
    return () => clearInterval(timer)
  }, [callEnded])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  async function sendMessage(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending || limitReached) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setSending(true)
    setError(null)

    try {
      const res = await fetch('/api/arena/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileKey, messages: nextMessages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue')
      setMessages([...nextMessages, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setSending(false)
    }
  }

  async function endCall() {
    setCallEnded(true)
    setFeedbackLoading(true)
    setFeedbackError(null)
    try {
      const res = await fetch('/api/arena/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: profileKey, messages }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue')
      setFeedback(data)
    } catch (err) {
      setFeedbackError(err.message)
    } finally {
      setFeedbackLoading(false)
    }
  }

  function replay() {
    setMessages([])
    setInput('')
    setElapsed(0)
    setCallEnded(false)
    setFeedback(null)
    setFeedbackError(null)
  }

  if (callEnded) {
    return (
      <Container className="max-w-2xl">
        <Link
          href="/arena"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-mist-muted transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Retour à l'Arena
        </Link>

        <div className="rounded-2xl border border-ink-border bg-ink-100/60 p-8 shadow-card">
          {feedbackLoading && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2.5 w-2.5 animate-pulse rounded-full bg-volt"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-mist-muted">Analyse de l'appel en cours...</p>
            </div>
          )}

          {feedbackError && (
            <div className="py-12 text-center">
              <p className="text-sm text-coral">{feedbackError}</p>
              <Button variant="secondary" size="md" className="mt-6" onClick={endCall}>
                Réessayer l'analyse
              </Button>
            </div>
          )}

          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center gap-2 border-b border-ink-border pb-8 text-center">
                <span className="font-display text-xs font-bold italic uppercase tracking-[0.25em] text-volt">
                  Score du call
                </span>
                <span className="font-display text-6xl font-bold text-white">
                  {feedback.score}
                  <span className="text-2xl text-mist-dim">/100</span>
                </span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {Object.entries(FEEDBACK_LABELS).map(([key, label]) => (
                  <div key={key} className="rounded-lg border border-ink-border bg-ink-50/60 p-5">
                    <h3 className="font-display text-sm font-bold italic text-volt">{label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-muted">
                      {feedback.feedback[key]}
                    </p>
                  </div>
                ))}
              </div>

              {feedback.moments_cles?.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-sm font-bold italic uppercase tracking-wider text-white">
                    Moments clés
                  </h3>
                  <div className="mt-4 flex flex-col gap-4">
                    {feedback.moments_cles.map((moment, i) => (
                      <div key={i} className="border-l-2 border-volt/40 pl-4">
                        <p className="text-sm italic text-mist">« {moment.citation} »</p>
                        <p className="mt-1.5 text-sm text-mist-muted">{moment.commentaire}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-4 border-t border-ink-border pt-8">
                <Button onClick={replay} size="md">
                  <RotateCcw size={16} />
                  Rejouer cet adversaire
                </Button>
                <Button href="/arena" variant="secondary" size="md">
                  Choisir un autre adversaire
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </Container>
    )
  }

  return (
    <Container className="max-w-2xl">
      <Link
        href="/arena"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-mist-muted transition-colors hover:text-white"
      >
        <ArrowLeft size={16} />
        Retour à l'Arena
      </Link>

      <div className="glass overflow-hidden rounded-xl border border-ink-border shadow-glow-lg">
        <div className="flex items-center justify-between border-b border-ink-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink-300 text-mist ring-1 ring-ink-border">
              {ProspectIcon && <ProspectIcon size={16} />}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-ink-100 bg-coral" />
              </span>
            </span>
            <span className="text-sm font-semibold italic text-white">
              {profile.nom} — en direct
            </span>
          </div>
          <span className="rounded-md bg-ink-300 px-2.5 py-1 text-xs font-medium text-mist-muted">
            {formatTime(elapsed)}
          </span>
        </div>

        <div ref={scrollRef} className="flex h-[420px] flex-col gap-3 overflow-y-auto px-5 py-6">
          {messages.length === 0 && (
            <p className="m-auto max-w-xs text-center text-sm text-mist-dim">
              C'est à toi d'ouvrir l'appel. Cadre la conversation, puis pose ta question
              d'ouverture.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              {m.role === 'assistant' && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-300 text-mist-dim ring-1 ring-ink-border">
                  {ProspectIcon && <ProspectIcon size={13} />}
                </span>
              )}
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-snug ${
                  m.role === 'user'
                    ? 'rounded-br-sm bg-volt-gradient font-medium text-white'
                    : 'rounded-bl-sm bg-ink-300 text-mist'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {sending && (
            <div className="flex items-end gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-300 text-mist-dim ring-1 ring-ink-border">
                {ProspectIcon && <ProspectIcon size={13} />}
              </span>
              <div className="flex gap-1 rounded-lg rounded-bl-sm bg-ink-300 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-mist-dim"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {error && <p className="px-5 pb-2 text-xs text-coral">{error}</p>}
        {limitReached && (
          <p className="px-5 pb-2 text-xs text-amber">
            L'appel a atteint sa durée maximale — termine-le pour voir ton feedback.
          </p>
        )}

        <form
          onSubmit={sendMessage}
          className="flex items-center gap-3 border-t border-ink-border px-5 py-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={limitReached ? "Termine l'appel pour continuer" : 'Écris ta réplique...'}
            disabled={sending || limitReached}
            className="flex-1 bg-transparent text-sm text-white placeholder:text-mist-dim focus:outline-none disabled:opacity-40"
          />
          {!limitReached && (
            <VoiceButton
              onTranscript={(text) => setInput((prev) => (prev ? `${prev} ${text}` : text))}
            />
          )}
          <button
            type="submit"
            disabled={sending || limitReached || !input.trim()}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-volt-gradient text-white transition-opacity disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={endCall} variant="secondary" size="md" disabled={messages.length < 2}>
          <PhoneOff size={16} />
          Terminer l'appel
        </Button>
      </div>
    </Container>
  )
}
