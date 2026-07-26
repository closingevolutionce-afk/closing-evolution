'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lightbulb, Quote, X, Zap } from 'lucide-react'
import { hooks } from '@/lib/hooks-content'

const COVER_GRADIENTS = [
  'bg-gradient-to-br from-volt via-volt-deep to-ink',
  'bg-gradient-to-br from-coral via-coral-deep to-ink',
  'bg-gradient-to-tr from-amber via-coral-deep to-ink',
  'bg-gradient-to-br from-volt via-amber to-ink',
  'bg-gradient-to-tr from-coral via-amber to-ink',
  'bg-gradient-to-br from-amber via-volt-deep to-ink',
  'bg-gradient-to-tr from-volt-deep via-coral to-ink',
  'bg-gradient-to-br from-coral-deep via-volt to-ink',
]

function HookCover({ hook, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative aspect-square overflow-hidden rounded-2xl border border-ink-border text-left shadow-card transition-transform hover:-translate-y-1 ${COVER_GRADIENTS[index % COVER_GRADIENTS.length]}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            <Zap size={11} />
            {hook.technique}
          </span>
          <Quote size={20} className="text-white/40" />
        </div>

        <p className="font-display text-lg font-bold italic leading-snug text-white drop-shadow-sm sm:text-xl">
          {hook.cover}
        </p>

        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-white/70">
          <span>Closing Evolution</span>
          <span className="transition-transform group-hover:translate-x-0.5">Voir le hook →</span>
        </div>
      </div>
    </motion.button>
  )
}

function HookModal({ hook, onClose }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-ink-border bg-ink-50 shadow-card"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <X size={16} />
        </button>

        <div className="max-h-[85vh] overflow-y-auto p-6">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-volt/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-volt">
            <Zap size={11} />
            {hook.technique}
          </span>
          <p className="mt-3 font-display text-base font-bold text-white">{hook.situation}</p>

          <div className="mt-5 rounded-xl border border-ink-border bg-ink-100/60 p-5">
            <div className="flex flex-col gap-3">
              {hook.script.map((line, i) => (
                <p key={i} className="text-sm leading-relaxed text-mist">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-lg border border-volt/25 bg-volt/5 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-volt/15 text-volt">
              <Lightbulb size={15} />
            </span>
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-wide text-volt">
                Pourquoi ça marche
              </p>
              <p className="mt-1 text-sm leading-relaxed text-mist-muted">{hook.why}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function HooksGrid() {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
        {hooks.map((hook, i) => (
          <HookCover key={hook.situation} hook={hook} index={i} onOpen={() => setActiveIndex(i)} />
        ))}
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <HookModal hook={hooks[activeIndex]} onClose={() => setActiveIndex(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
