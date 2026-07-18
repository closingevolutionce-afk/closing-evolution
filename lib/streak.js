'use client'

import { useAuth } from '@/components/auth/AuthProvider'

// La série de connexion est matérialisée sur profiles.login_streak,
// mise à jour par app/api/session/login/route.js à chaque nouvelle journée.
export function useStreak() {
  const { profile } = useAuth()
  return profile?.login_streak ?? 0
}
