'use client'

import { motion } from 'framer-motion'
import { Mic, TrendingUp, Zap } from 'lucide-react'

const bubbles = [
  { from: 'prospect', text: '“Honnêtement, je vais y réfléchir de mon côté...”' },
  { from: 'closer', text: 'Je comprends. Qu’est-ce qui vous ferait dire oui aujourd’hui plutôt que dans 3 mois ?' },
  { from: 'prospect', text: '“C’est surtout une question de budget en ce moment.”' },
]

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto mt-14 w-full max-w-md lg:mt-0"
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-volt-gradient opacity-30 blur-3xl" />

      <div className="glass relative overflow-hidden rounded-xl border border-ink-border shadow-glow-lg">
        <div className="flex items-center justify-between border-b border-ink-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" />
            </span>
            <span className="text-sm font-semibold italic text-white">Boss Final — en direct</span>
          </div>
          <span className="rounded-md bg-ink-300 px-2.5 py-1 text-xs font-medium text-mist-muted">
            04:12
          </span>
        </div>

        <div className="flex flex-col gap-3 px-5 py-6">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: b.from === 'closer' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.25 }}
              className={`max-w-[85%] rounded-lg px-4 py-3 text-sm leading-snug ${
                b.from === 'closer'
                  ? 'ml-auto rounded-br-sm bg-volt-gradient text-white font-medium'
                  : 'rounded-bl-sm bg-ink-300 text-mist'
              }`}
            >
              {b.text}
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-ink-border px-5 py-4">
          <div className="flex items-center gap-2 text-xs text-mist-dim">
            <Mic size={14} />
            En train de répondre...
          </div>
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-volt"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="glass absolute -right-4 bottom-full mb-4 flex items-center gap-3 rounded-lg border border-ink-border px-4 py-3 shadow-card animate-float"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-volt/15 text-volt ring-1 ring-volt/30">
          <TrendingUp size={16} />
        </div>
        <div>
          <p className="font-display text-lg font-bold leading-none text-white">87/100</p>
          <p className="whitespace-nowrap text-[11px] text-mist-dim">Score de closing IA</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="glass absolute -left-4 top-full mt-4 flex items-center gap-3 rounded-lg border border-ink-border px-4 py-3 shadow-card animate-float"
        style={{ animationDelay: '1s' }}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber ring-1 ring-amber/30">
          <Zap size={16} />
        </div>
        <div>
          <p className="font-display text-lg font-bold leading-none text-white">12 jours</p>
          <p className="whitespace-nowrap text-[11px] text-mist-dim">Streak active</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
