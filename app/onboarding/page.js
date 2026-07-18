'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { ONBOARDING_QUESTIONS, getRecommendedPath, getWelcomeMessage } from '@/lib/onboarding'
import { getModule } from '@/lib/knowledge'

export default function OnboardingPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [saving, setSaving] = useState(false)
  const [done, setDone] = useState(false)

  const question = ONBOARDING_QUESTIONS[step]
  const isLast = step === ONBOARDING_QUESTIONS.length - 1
  const prenom = profile?.prenom ?? 'closer'

  async function selectOption(value) {
    const nextAnswers = { ...answers, [question.key]: value }
    setAnswers(nextAnswers)

    if (!isLast) {
      setStep((s) => s + 1)
      return
    }

    setSaving(true)
    const recommended = getRecommendedPath(nextAnswers)
    if (user) {
      const supabase = getSupabaseBrowserClient()
      await supabase
        .from('profiles')
        .update({ ...nextAnswers, parcours_recommande: recommended, onboarding_completed: true })
        .eq('id', user.id)
      await refreshProfile()
    }
    setSaving(false)
    setDone(true)
  }

  if (done) {
    const recommended = getRecommendedPath(answers)
    return (
      <main className="relative flex min-h-screen items-center overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-20 blur-[140px]" />
        <Container className="relative max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-volt-gradient text-white shadow-glow">
              <Sparkles size={24} />
            </span>
            <h1 className="mt-6 text-center font-display text-3xl font-bold italic text-white">
              Ton parcours est prêt, {prenom}.
            </h1>
            <p className="mt-4 text-center text-base leading-relaxed text-mist-muted">
              {getWelcomeMessage(prenom, answers)}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {recommended.map((id) => {
                const m = getModule(id)
                if (!m) return null
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between rounded-lg border border-volt/25 bg-volt/5 px-5 py-3.5"
                  >
                    <span className="text-sm font-semibold text-white">{m.titre}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-volt">
                      {id}
                    </span>
                  </div>
                )
              })}
            </div>

            <Button href="/parcours" size="lg" className="mt-8 w-full justify-center">
              Commencer mon parcours
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </Container>
      </main>
    )
  }

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-20 blur-[140px]" />

      <Container className="relative max-w-xl">
        <div className="flex items-center gap-2">
          {ONBOARDING_QUESTIONS.map((q, i) => (
            <div
              key={q.key}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${
                i <= step ? 'bg-volt-gradient' : 'bg-ink-200'
              }`}
            />
          ))}
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-mist-dim">
          Question {step + 1}/{ONBOARDING_QUESTIONS.length}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="mt-6 font-display text-2xl font-bold italic leading-snug text-white sm:text-3xl">
              {question.question}
            </h1>

            <div className="mt-8 flex flex-col gap-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  disabled={saving}
                  onClick={() => selectOption(option.value)}
                  className="flex items-center justify-between rounded-lg border border-ink-border bg-ink-100/60 px-5 py-4 text-left text-sm font-medium text-mist transition-colors hover:border-volt/40 hover:text-white disabled:opacity-50"
                >
                  {option.label}
                  <ArrowRight size={16} className="shrink-0 text-mist-dim" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </main>
  )
}
