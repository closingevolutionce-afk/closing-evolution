'use client'

import { useCallback, useEffect, useState } from 'react'
import { levels, moduleOrder } from '@/lib/knowledge'

const STORAGE_KEY = 'cec_progress_v1'

export { moduleOrder }

const RANK_BY_LEVEL = {
  fondations: 'Closer Junior',
  pratique: 'Closer Confirmé',
  elite: 'Master Closer',
}

function readProgress() {
  if (typeof window === 'undefined') return { completed: {} }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    return parsed && typeof parsed.completed === 'object' ? parsed : { completed: {} }
  } catch {
    return { completed: {} }
  }
}

function writeProgress(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  window.dispatchEvent(new Event('cec-progress-updated'))
}

export function isModuleUnlocked(moduleId, completed) {
  const index = moduleOrder.indexOf(moduleId)
  if (index <= 0) return true
  const previous = moduleOrder[index - 1]
  return Boolean(completed[previous])
}

export function completeModule(moduleId, score) {
  const data = readProgress()
  data.completed[moduleId] = { score, completedAt: new Date().toISOString() }
  writeProgress(data)
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
  const [completed, setCompleted] = useState({})
  const [ready, setReady] = useState(false)

  const refresh = useCallback(() => {
    setCompleted(readProgress().completed)
    setReady(true)
  }, [])

  useEffect(() => {
    refresh()
    window.addEventListener('cec-progress-updated', refresh)
    window.addEventListener('storage', refresh)
    return () => {
      window.removeEventListener('cec-progress-updated', refresh)
      window.removeEventListener('storage', refresh)
    }
  }, [refresh])

  return { completed, ready, rank: getRank(completed) }
}
