'use client'

import { useCallback, useEffect, useState } from 'react'
import { levels, moduleOrder } from '@/lib/knowledge'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export { moduleOrder }

const RANK_BY_LEVEL = {
  fondations: 'Closer Junior',
  pratique: 'Closer Confirmé',
  elite: 'Master Closer',
}

export function isModuleUnlocked(moduleId, completed) {
  const index = moduleOrder.indexOf(moduleId)
  if (index <= 0) return true
  const previous = moduleOrder[index - 1]
  return Boolean(completed[previous])
}

// Enregistre la complétion côté serveur (attribution XP + badges incluse) —
// voir app/api/progress/complete-module/route.js.
export async function completeModule(moduleId, score, quizTotal, perfect) {
  const res = await fetch('/api/progress/complete-module', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ moduleId, score, quizTotal, perfect }),
  })
  return res.json()
}

export function getRank(completed) {
  let rank = null
  for (const level of levels) {
    const allDone = level.modules.every((m) => completed[m.id])
    if (allDone) rank = RANK_BY_LEVEL[level.id]
  }
  return rank
}

export function getLevelStats(level, completed) {
  const total = level.modules.length
  const done = level.modules.filter((m) => completed[m.id]).length
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 }
}

export function useProgress() {
  const { user } = useAuth()
  const [completed, setCompleted] = useState({})
  const [ready, setReady] = useState(false)

  const refresh = useCallback(async () => {
    if (!user) {
      setCompleted({})
      setReady(true)
      return
    }
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from('module_progress')
      .select('module_id, score, completed_at')
      .eq('user_id', user.id)

    const map = {}
    ;(data ?? []).forEach((row) => {
      map[row.module_id] = { score: row.score, completedAt: row.completed_at }
    })
    setCompleted(map)
    setReady(true)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  return { completed, ready, rank: getRank(completed), refresh }
}
