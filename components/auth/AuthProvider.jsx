'use client'

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { getLevelForXP } from '@/lib/xp'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [daysSinceLastVisit, setDaysSinceLastVisit] = useState(null)
  const [levelUp, setLevelUp] = useState(null)
  const lastLevelKey = useRef(null)

  const fetchProfile = useCallback(async (userId) => {
    if (!userId) return null
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single()
    return data ?? null
  }, [])

  const applyProfile = useCallback((data) => {
    if (data) {
      const levelKey = getLevelForXP(data.xp ?? 0).key
      if (lastLevelKey.current && lastLevelKey.current !== levelKey) {
        setLevelUp(getLevelForXP(data.xp ?? 0))
      }
      lastLevelKey.current = levelKey
    }
    setProfile(data)
  }, [])

  const refreshProfile = useCallback(async () => {
    if (!user) return
    const data = await fetchProfile(user.id)
    applyProfile(data)
  }, [user, fetchProfile, applyProfile])

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setLoading(false)
      return
    }
    const supabase = getSupabaseBrowserClient()

    async function bootstrap(session) {
      setUser(session?.user ?? null)
      if (!session?.user) {
        setLoading(false)
        return
      }

      const before = await fetchProfile(session.user.id)
      if (before?.last_login_date) {
        const days = Math.floor(
          (Date.now() - new Date(before.last_login_date).getTime()) / 86400000
        )
        if (days >= 1) setDaysSinceLastVisit(days)
      }
      applyProfile(before)
      setLoading(false)

      await fetch('/api/session/login', { method: 'POST' })
      const after = await fetchProfile(session.user.id)
      applyProfile(after)
    }

    supabase.auth.getSession().then(({ data: { session } }) => bootstrap(session))

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        bootstrap(session)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [fetchProfile, applyProfile])

  async function signOut() {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
        signOut,
        daysSinceLastVisit,
        levelUp,
        clearLevelUp: () => setLevelUp(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>')
  return ctx
}
