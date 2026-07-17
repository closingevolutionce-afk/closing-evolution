'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cec_defi_v1'

function toDateStr(date) {
  return date.toISOString().slice(0, 10)
}

function read() {
  if (typeof window === 'undefined') return { lastDone: null, streak: 0 }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : { lastDone: null, streak: 0 }
  } catch {
    return { lastDone: null, streak: 0 }
  }
}

function write(data) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function markChallengeDone() {
  const data = read()
  const today = toDateStr(new Date())
  if (data.lastDone === today) return data

  const yesterday = toDateStr(new Date(Date.now() - 86400000))
  const streak = data.lastDone === yesterday ? data.streak + 1 : 1
  const next = { lastDone: today, streak }
  write(next)
  return next
}

export function useDefiProgress() {
  const [state, setState] = useState({ lastDone: null, streak: 0 })

  useEffect(() => {
    setState(read())
  }, [])

  const today = toDateStr(new Date())
  const doneToday = state.lastDone === today

  function complete() {
    setState(markChallengeDone())
  }

  return { doneToday, streak: state.streak, complete }
}
