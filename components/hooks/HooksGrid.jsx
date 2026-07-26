'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lightbulb, Zap } from 'lucide-react'
import { hooks } from '@/lib/hooks-content'

function HookCard({ hook, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="overflow-hidden rounded-2xl border border-ink-border bg-ink-100/60"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-6 text-left"
      >
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-volt/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-volt">
            <Zap size={11} />
            {hook.technique}
          </span>
          <p className="mt-3 font-display text-base font-bold text-white">{hook.situation}</p>
        </div>
        <ChevronDown
          size={18}
          className={`shrink-0 text-mist-dim transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-border px-6 pb-6 pt-5">
              <div className="rounded-xl border border-ink-border bg-ink-50 p-5">
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
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function HooksGrid() {
  return (
    <div className="flex flex-col gap-5">
      {hooks.map((hook, i) => (
        <HookCard key={hook.situation} hook={hook} index={i} />
      ))}
    </div>
  )
}
