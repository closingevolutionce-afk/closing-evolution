'use client'

import { Flame } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'

export default function InactivityBanner() {
  const { daysSinceLastVisit, profile } = useAuth()

  if (!daysSinceLastVisit || daysSinceLastVisit < 1) return null

  const message =
    daysSinceLastVisit >= 3
      ? `Ça fait ${daysSinceLastVisit} jours, ${profile?.prenom ?? 'closer'}. On reprend où tu t'étais arrêté ?`
      : "Ta série a repris — 5 minutes aujourd'hui suffisent pour la garder vivante."

  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-coral/25 bg-coral/5 px-5 py-3.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-coral/15 text-coral">
        <Flame size={16} />
      </span>
      <p className="text-sm text-mist">{message}</p>
    </div>
  )
}
