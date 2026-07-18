'use client'

import { useAuth } from '@/components/auth/AuthProvider'

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}

export function useDefiProgress() {
  const { profile, refreshProfile } = useAuth()
  const today = toDateStr(new Date())
  const doneToday = profile?.last_defi_date === today

  async function complete(defiId) {
    await fetch('/api/defi/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ defiId }),
    })
    await refreshProfile()
  }

  return { doneToday, streak: profile?.defi_streak ?? 0, complete }
}
