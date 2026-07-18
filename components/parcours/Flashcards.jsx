'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronLeft, RotateCw, Sparkles } from 'lucide-react'
import { vibrate } from '@/lib/sounds'

export default function Flashcards({ cards }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState(() => new Set())
  const [exitDirection, setExitDirection] = useState(0)

  const card = cards[index]
  const isLast = index === cards.length - 1
  const allSeen = seen.size === cards.length

  function markSeen(i) {
    setSeen((prev) => new Set(prev).add(i))
  }

  function flip() {
    setFlipped((f) => !f)
    if (!flipped) markSeen(index)
  }

  function next() {
    setFlipped(false)
    setIndex((i) => (isLast ? 0 : i + 1))
  }

  function prev() {
    setFlipped(false)
    setIndex((i) => (i === 0 ? cards.length - 1 : i - 1))
  }

  function handleDragEnd(_e, info) {
    if (info.offset.x > 100) {
      setExitDirection(1)
      markSeen(index)
      vibrate(15)
      next()
    } else if (info.offset.x < -100) {
      setExitDirection(-1)
      vibrate(15)
      next()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          Carte {index + 1}/{cards.length}
        </span>
        {allSeen && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold italic text-volt">
            <Sparkles size={13} />
            Toutes les cartes vues
          </span>
        )}
      </div>

      <p className="mt-2 text-[11px] text-mist-dim">
        Glisse à droite si tu savais, à gauche sinon — ou utilise les flèches.
      </p>

      <div className="relative mt-4 h-56" style={{ perspective: '1200px' }}>
        <AnimatePresence>
          <motion.div
            key={index}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: exitDirection * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: exitDirection * 300, rotate: exitDirection * 12 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <motion.button
              type="button"
              onClick={flip}
              className="relative h-full w-full text-left"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-ink-border bg-ink-100/60 p-7"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-mist-dim">
                  Question — clique pour retourner
                </span>
                <p className="font-display text-lg font-bold leading-snug text-white">
                  {card.recto}
                </p>
                <span />
              </div>
              <div
                className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-volt/30 bg-volt/10 p-7"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-volt">
                  Réponse
                </span>
                <p className="text-base leading-relaxed text-mist">{card.verso}</p>
                <span />
              </div>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-border text-mist-muted transition-colors hover:border-volt/40 hover:text-white"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={flip}
          className="inline-flex items-center gap-2 rounded-md border border-ink-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-mist-muted transition-colors hover:border-volt/40 hover:text-white"
        >
          <RotateCw size={13} />
          Retourner
        </button>
        <button
          type="button"
          onClick={() => {
            markSeen(index)
            next()
          }}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-volt/30 text-volt transition-colors hover:bg-volt/10"
        >
          <Check size={18} />
        </button>
      </div>
    </div>
  )
}
