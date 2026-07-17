'use client'

import { useEffect, useState } from 'react'

const STREAK_KEY = 'cec_streak_v1'

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}

function recordVisit() {
  if (typeof window === 'undefined') return { streak: 0 }
  const raw = window.localStorage.getItem(STREAK_KEY)
  const data = raw ? JSON.parse(raw) : { lastVisit: null, streak: 0 }

  const today = toDateStr(new Date())
  if (data.lastVisit === today) return data

  const yesterday = toDateStr(new Date(Date.now() - 86400000))
  const streak = data.lastVisit === yesterday ? data.streak + 1 : 1
  const next = { lastVisit: today, streak }
  window.localStorage.setItem(STREAK_KEY, JSON.stringify(next))
  return next
}

export function useStreak() {
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    setStreak(recordVisit().streak)
  }, [])

  return streak
}
