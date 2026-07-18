'use client'

import { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function WeeklyLeaderboard() {
  const { user, profile } = useAuth()
  const [rows, setRows] = useState(null)

  useEffect(() => {
    if (!user) return
    const supabase = getSupabaseBrowserClient()
    supabase.rpc('get_weekly_leaderboard').then(({ data }) => setRows(data ?? []))
  }, [user])

  if (!rows) return null

  const top10 = rows.slice(0, 10)
  const myRank = rows.findIndex((r) => r.id === user?.id) + 1
  const inTop10 = myRank > 0 && myRank <= 10

  return (
    <div className="rounded-2xl border border-ink-border bg-ink-100/60 p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-amber/15 text-amber ring-1 ring-amber/30">
          <Trophy size={16} />
        </span>
        <div>
          <p className="font-display text-sm font-bold text-white">Classement hebdomadaire</p>
          <p className="text-xs text-mist-dim">Remise à zéro chaque lundi — nouvelle semaine, nouveau classement.</p>
        </div>
      </div>

      <ol className="mt-5 flex flex-col gap-1.5">
        {top10.map((r, i) => (
          <li
            key={r.id}
            className={`flex items-center justify-between rounded-lg px-3.5 py-2 text-sm ${
              r.id === user?.id ? 'bg-volt/10 ring-1 ring-volt/30' : ''
            }`}
          >
            <span className="flex items-center gap-3">
              <span className="w-5 text-xs font-bold text-mist-dim">{i + 1}</span>
              <span className={r.id === user?.id ? 'font-semibold text-white' : 'text-mist'}>
                {r.prenom ?? 'Closer'}
              </span>
            </span>
            <span className="text-xs font-semibold text-volt">{r.weekly_xp} XP</span>
          </li>
        ))}
      </ol>

      {!inTop10 && myRank > 0 && (
        <p className="mt-4 border-t border-ink-border pt-4 text-xs text-mist-muted">
          Tu es {myRank}ème cette semaine — encore{' '}
          {Math.max(0, (rows[9]?.weekly_xp ?? 0) - (rows[myRank - 1]?.weekly_xp ?? 0))} XP pour
          entrer dans le top 10.
        </p>
      )}
    </div>
  )
}
