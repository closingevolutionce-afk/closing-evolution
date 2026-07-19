'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Clock, Lock, Play } from 'lucide-react'

export default function ModuleCard({ moduleData, unlocked, done, delay = 0 }) {
  const { id, titre, duree } = moduleData
  const href = `/parcours/${id.toLowerCase()}`

  const content = (
    <>
      <div className="flex items-start justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-md text-xs font-bold ${
            done
              ? 'bg-volt-gradient text-white'
              : unlocked
                ? 'bg-volt/10 text-volt ring-1 ring-volt/25'
                : 'bg-ink-200 text-mist-dim'
          }`}
        >
          {done ? <Check size={16} strokeWidth={3} /> : unlocked ? <Play size={14} /> : <Lock size={14} />}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-mist-dim">
          {id}
        </span>
      </div>

      <h3
        className={`mt-4 font-display text-base font-bold leading-snug ${
          unlocked ? 'text-white' : 'text-mist-dim'
        }`}
      >
        {titre}
      </h3>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-mist-dim">
        <Clock size={12} />
        {duree}
      </div>
    </>
  )

  const className = `group relative block overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
    done
      ? 'border-volt/30 bg-volt/5 hover:border-volt/50'
      : unlocked
        ? 'border-ink-border bg-ink-100/60 hover:border-volt/40 hover:-translate-y-0.5 shadow-card'
        : 'border-ink-border bg-ink-100/30 opacity-50'
  }`

  if (!unlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 0.5, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay }}
        className={className}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href} className={className}>
        {content}
      </Link>
    </motion.div>
  )
}
