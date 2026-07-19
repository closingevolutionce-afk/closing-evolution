'use client'

import { useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { playLevelUp, vibrate } from '@/lib/sounds'

const CONFETTI_COLORS = ['#8a5cf6', '#ff6b5b', '#d946ef', '#b7a6ff', '#ff9686']

export default function LevelUpCelebration() {
  const { levelUp, clearLevelUp, profile } = useAuth()

  const confetti = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.8 + Math.random() * 1.2,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rotate: Math.random() * 360,
      })),
    [levelUp]
  )

  useEffect(() => {
    if (!levelUp) return
    playLevelUp()
    vibrate([20, 40, 20, 60])
    const timer = setTimeout(() => clearLevelUp(), 4200)
    return () => clearTimeout(timer)
  }, [levelUp, clearLevelUp])

  return (
    <AnimatePresence>
      {levelUp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={clearLevelUp}
        >
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              initial={{ y: -40, x: `${c.left}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: '110vh', rotate: c.rotate }}
              transition={{ duration: c.duration, delay: c.delay, ease: 'easeIn' }}
              className="absolute top-0 h-2.5 w-2.5"
              style={{ backgroundColor: c.color }}
            />
          ))}

          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            className="relative text-center"
          >
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-volt-gradient text-white shadow-glow-lg">
              <Sparkles size={36} />
            </span>
            <p className="mt-6 font-display text-sm font-bold italic uppercase tracking-[0.3em] text-volt">
              Level up
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold italic text-white sm:text-5xl">
              {levelUp.label}
            </h2>
            <p className="mt-3 text-sm text-mist-muted">
              {profile?.prenom ?? 'Closer'}, tu viens de passer un cap. {profile?.xp ?? 0} XP au
              compteur.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
