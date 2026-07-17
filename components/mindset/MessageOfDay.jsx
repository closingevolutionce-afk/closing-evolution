'use client'

import { useEffect, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { getMessageOfTheDay } from '@/lib/daily-message'

export default function MessageOfDay({ className = '' }) {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    setMessage(getMessageOfTheDay())
  }, [])

  if (!message) return null

  return (
    <div
      className={`glass flex items-start gap-3 rounded-lg border border-volt/25 px-5 py-4 ${className}`}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-volt/15 text-volt ring-1 ring-volt/30">
        <Sparkles size={15} />
      </span>
      <div>
        <p className="font-display text-[11px] font-bold italic uppercase tracking-[0.2em] text-volt">
          Message du jour
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-mist">{message}</p>
      </div>
    </div>
  )
}
