'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function CommunityFeed() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!user) return
    const supabase = getSupabaseBrowserClient()
    supabase
      .from('community_feed')
      .select('id, message, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => setEvents(data ?? []))
  }, [user])

  if (events.length === 0) return null

  return (
    <div className="mt-6 rounded-lg border border-ink-border bg-ink-100/40 px-5 py-3.5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mist-muted">
        <span className="font-semibold uppercase tracking-wide text-mist-dim">Communauté</span>
        <span>{events[0].message}</span>
      </div>
    </div>
  )
}
