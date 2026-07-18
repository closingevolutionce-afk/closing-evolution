'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Check } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

export default function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!user) return
    const supabase = getSupabaseBrowserClient()

    async function load() {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
      setNotifications(data ?? [])
    }
    load()

    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((prev) => [payload.new, ...prev])
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user])

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  async function markAllRead() {
    if (unreadCount === 0) return
    const supabase = getSupabaseBrowserClient()
    const ids = notifications.filter((n) => !n.read).map((n) => n.id)
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    await supabase.from('notifications').update({ read: true }).in('id', ids)
  }

  if (!user) return null

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o)
          if (!open) markAllRead()
        }}
        className="relative flex h-9 w-9 items-center justify-center rounded-md border border-ink-border text-mist-muted transition-colors hover:border-volt/40 hover:text-white"
      >
        <Bell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral text-[9px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 z-50 max-h-96 w-80 overflow-y-auto rounded-lg border border-ink-border bg-ink-50 shadow-card"
          >
            {notifications.length === 0 ? (
              <p className="p-5 text-center text-sm text-mist-dim">Aucune notification.</p>
            ) : (
              <ul className="divide-y divide-ink-border">
                {notifications.map((n) => (
                  <li key={n.id} className="p-4">
                    <p className="text-sm font-semibold text-white">{n.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-mist-muted">{n.body}</p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-wide text-mist-dim">
                      {new Date(n.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {notifications.length > 0 && (
              <div className="flex items-center justify-center gap-1.5 border-t border-ink-border p-2.5 text-xs text-mist-dim">
                <Check size={12} />
                Tout marqué comme lu
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
