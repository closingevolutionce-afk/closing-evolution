'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Play, X } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getRecommendedPath, getWelcomeMessage } from '@/lib/onboarding'
import { getModule } from '@/lib/knowledge'

export default function WelcomeVideo() {
  const { profile } = useAuth()
  const [dismissed, setDismissed] = useState(false)
  const [playing, setPlaying] = useState(false)

  if (!profile || dismissed) return null

  const answers = {
    niveau_actuel: profile.niveau_actuel,
    type_offre: profile.type_offre,
    challenge_principal: profile.challenge_principal,
    appels_semaine: profile.appels_semaine,
    objectif_3_mois: profile.objectif_3_mois,
  }
  const recommended = profile.parcours_recommande?.length
    ? profile.parcours_recommande
    : getRecommendedPath(answers)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-volt/25 bg-gradient-to-b from-volt/10 to-transparent p-7"
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-4 text-mist-dim hover:text-white"
      >
        <X size={18} />
      </button>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-lg border border-ink-border bg-ink-200"
        >
          {playing ? (
            <p className="px-4 text-center text-xs text-mist-dim">
              Vidéo à venir — Chirine l'enregistre bientôt.
            </p>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-volt-gradient text-white shadow-glow transition-transform group-hover:scale-110">
                <Play size={18} fill="currentColor" />
              </span>
              <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-md bg-ink/80 px-2 py-1 text-[10px] font-semibold text-mist">
                <Clock size={10} />
                2:00
              </span>
            </>
          )}
        </button>

        <div>
          <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
            Bienvenue, {profile.prenom ?? 'closer'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-mist">
            {profile.onboarding_completed
              ? getWelcomeMessage(profile.prenom ?? 'closer', answers)
              : "Complète ton onboarding pour recevoir ton parcours personnalisé."}
          </p>
          {recommended.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {recommended.slice(0, 4).map((id) => {
                const m = getModule(id)
                if (!m) return null
                return (
                  <span
                    key={id}
                    className="rounded-md border border-volt/25 bg-volt/5 px-2.5 py-1 text-xs font-semibold text-volt"
                  >
                    {id} · {m.titre}
                  </span>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
