'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Send, ShieldOff, Swords, Target, Trash2, Unlock, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { moduleOrder, getModule, getObjection } from '@/lib/knowledge'

const ACCESS_BADGE = {
  aucun: { label: 'Aucun accès', classes: 'bg-coral/10 text-coral', icon: Lock },
  apercu: { label: 'Aperçu', classes: 'bg-amber/10 text-amber', icon: Lock },
  complet: { label: 'Complet', classes: 'bg-volt/10 text-volt', icon: Unlock },
}

function timeAgo(dateStr) {
  if (!dateStr) return 'Jamais'
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000)
  if (diffDays <= 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  return `Il y a ${diffDays} jours`
}

export default function CoachDashboard() {
  const { user } = useAuth()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [detail, setDetail] = useState(null)
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [updatingAccess, setUpdatingAccess] = useState(false)
  const [pending, setPending] = useState([])
  const [newEmail, setNewEmail] = useState('')
  const [newLevel, setNewLevel] = useState('aucun')
  const [addingPending, setAddingPending] = useState(false)
  const [pendingError, setPendingError] = useState(null)

  async function loadPending() {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from('restricted_signups')
      .select('email, access_level, created_at')
      .order('created_at', { ascending: false })
    setPending(data ?? [])
  }

  useEffect(() => {
    async function load() {
      const supabase = getSupabaseBrowserClient()
      const [{ data: profiles }, { data: allProgress }] = await Promise.all([
        supabase.from('profiles').select('*').eq('role', 'student').order('created_at'),
        supabase.from('module_progress').select('user_id'),
      ])

      const progressCount = {}
      ;(allProgress ?? []).forEach((row) => {
        progressCount[row.user_id] = (progressCount[row.user_id] ?? 0) + 1
      })

      const withProgress = (profiles ?? []).map((p) => ({
        ...p,
        completedCount: progressCount[p.id] ?? 0,
      }))

      setStudents(withProgress)
      setLoading(false)
    }
    load()
    loadPending()
  }, [])

  async function addPendingRestriction(e) {
    e.preventDefault()
    if (!newEmail.trim()) return
    setAddingPending(true)
    setPendingError(null)
    const res = await fetch('/api/coach/restrict-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail.trim(), accessLevel: newLevel }),
    })
    setAddingPending(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setPendingError(data.error ?? 'Erreur inconnue.')
      return
    }
    setNewEmail('')
    await loadPending()
  }

  async function removePendingRestriction(email) {
    const supabase = getSupabaseBrowserClient()
    await supabase.from('restricted_signups').delete().eq('email', email)
    await loadPending()
  }

  async function openStudent(student) {
    setSelected(student)
    setDetail(null)
    const supabase = getSupabaseBrowserClient()
    const [{ data: modules }, { data: roleplays }, { data: objections }] = await Promise.all([
      supabase
        .from('module_progress')
        .select('module_id, score, completed_at')
        .eq('user_id', student.id)
        .order('completed_at'),
      supabase
        .from('roleplay_sessions')
        .select('profile_key, score, created_at')
        .eq('user_id', student.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('objection_attempts')
        .select('objection_key, score')
        .eq('user_id', student.id),
    ])

    const objectionAvg = {}
    ;(objections ?? []).forEach((o) => {
      if (!objectionAvg[o.objection_key]) objectionAvg[o.objection_key] = []
      objectionAvg[o.objection_key].push(o.score)
    })
    const weakestObjections = Object.entries(objectionAvg)
      .map(([key, scores]) => ({
        key,
        avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
        attempts: scores.length,
      }))
      .sort((a, b) => a.avg - b.avg)

    setDetail({ modules: modules ?? [], roleplays: roleplays ?? [], weakestObjections })
  }

  async function setAccess(student, nextLevel) {
    if (nextLevel === student.access_level) return
    setUpdatingAccess(true)
    const res = await fetch('/api/coach/set-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: student.id, accessLevel: nextLevel }),
    })
    setUpdatingAccess(false)
    if (!res.ok) return

    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, access_level: nextLevel } : s))
    )
    setSelected((prev) => (prev && prev.id === student.id ? { ...prev, access_level: nextLevel } : prev))
  }

  async function sendMessage() {
    if (!message.trim() || !selected || !user) return
    setSending(true)
    const supabase = getSupabaseBrowserClient()
    await supabase.from('coach_messages').insert({
      from_user_id: user.id,
      to_user_id: selected.id,
      body: message.trim(),
    })
    await supabase.from('notifications').insert({
      user_id: selected.id,
      type: 'message_coach',
      title: 'Message de ton coach',
      body: message.trim(),
    })
    setMessage('')
    setSending(false)
  }

  const currentModuleLabel = useMemo(
    () => (student) => {
      if (student.completedCount >= moduleOrder.length) return 'Parcours terminé'
      const m = getModule(moduleOrder[student.completedCount])
      return m?.titre ?? '—'
    },
    []
  )

  if (loading) return <p className="text-sm text-mist-muted">Chargement...</p>

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-ink-border bg-ink-100/40 p-6">
        <p className="flex items-center gap-2 font-display text-sm font-bold text-white">
          <ShieldOff size={15} className="text-amber" />
          Restreindre un email avant inscription
        </p>
        <p className="mt-1.5 text-xs text-mist-muted">
          Utile quand quelqu'un va s'inscrire mais que son accès ne doit pas s'ouvrir tout de
          suite (ex. acompte versé, solde en attente). Dès qu'il crée son compte avec cet email,
          il démarre directement au niveau choisi au lieu de l'accès complet par défaut.
        </p>
        <form onSubmit={addPendingRestriction} className="mt-4 flex flex-wrap items-center gap-2.5">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="email@exemple.com"
            className="min-w-[220px] flex-1 rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
          />
          <select
            value={newLevel}
            onChange={(e) => setNewLevel(e.target.value)}
            className="rounded-lg border border-ink-border bg-ink-100/60 px-3 py-2.5 text-sm text-white focus:border-volt/50 focus:outline-none"
          >
            <option value="aucun">Aucun accès</option>
            <option value="apercu">Aperçu (Fondations)</option>
          </select>
          <Button type="submit" size="md" disabled={addingPending || !newEmail.trim()}>
            {addingPending ? 'Ajout...' : 'Ajouter'}
          </Button>
        </form>
        {pendingError && <p className="mt-2 text-xs text-coral">{pendingError}</p>}

        {pending.length > 0 && (
          <div className="mt-5 flex flex-col gap-2">
            {pending.map((p) => (
              <div
                key={p.email}
                className="flex items-center justify-between rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm"
              >
                <span className="text-mist">
                  {p.email}{' '}
                  <span className="text-xs text-mist-dim">
                    ({p.access_level === 'aucun' ? 'aucun accès' : 'aperçu'} à l'inscription)
                  </span>
                </span>
                <button
                  onClick={() => removePendingRestriction(p.email)}
                  className="text-mist-dim hover:text-coral"
                  title="Retirer la restriction"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-ink-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink-border bg-ink-100/60 text-xs uppercase tracking-wide text-mist-dim">
              <th className="px-5 py-3.5">Élève</th>
              <th className="px-5 py-3.5">Accès</th>
              <th className="px-5 py-3.5">Module en cours</th>
              <th className="px-5 py-3.5">Progression</th>
              <th className="px-5 py-3.5">Dernière connexion</th>
              <th className="px-5 py-3.5">Streak</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr
                key={s.id}
                onClick={() => openStudent(s)}
                className="cursor-pointer border-b border-ink-border last:border-0 hover:bg-ink-100/40"
              >
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-white">{s.prenom ?? '—'}</p>
                  <p className="text-xs text-mist-dim">{s.email}</p>
                </td>
                <td className="px-5 py-3.5">
                  {(() => {
                    const badge = ACCESS_BADGE[s.access_level] ?? ACCESS_BADGE.complet
                    const BadgeIcon = badge.icon
                    return (
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${badge.classes}`}
                      >
                        <BadgeIcon size={11} />
                        {badge.label}
                      </span>
                    )
                  })()}
                </td>
                <td className="px-5 py-3.5 text-mist">{currentModuleLabel(s)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-ink-200">
                      <div
                        className="h-full rounded-full bg-volt-gradient"
                        style={{ width: `${(s.completedCount / moduleOrder.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-mist-dim">
                      {s.completedCount}/{moduleOrder.length}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-mist-dim">{timeAgo(s.last_login_date)}</td>
                <td className="px-5 py-3.5 text-mist">{s.login_streak ?? 0}j</td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-mist-dim">
                  Aucun élève inscrit pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-ink-border bg-ink-50 p-8"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-display text-xl font-bold italic text-white">
                  {selected.prenom}
                </h2>
                <p className="text-sm text-mist-dim">{selected.email}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-mist-dim hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 rounded-lg border border-ink-border bg-ink-100/60 p-4">
              <div>
                <p className="text-sm font-semibold text-white">
                  Accès {ACCESS_BADGE[selected.access_level]?.label.toLowerCase() ?? 'complet'}
                </p>
                <p className="text-xs text-mist-dim">
                  {selected.access_level === 'aucun' &&
                    "Rien n'est débloqué, même pas Fondations."}
                  {selected.access_level === 'apercu' &&
                    'Seul le niveau Fondations est débloqué — Arena/Objections/Défi fermés.'}
                  {(!selected.access_level || selected.access_level === 'complet') &&
                    'Accès normal à tout le programme.'}
                </p>
              </div>
              <select
                value={selected.access_level ?? 'complet'}
                onChange={(e) => setAccess(selected, e.target.value)}
                disabled={updatingAccess}
                className="rounded-lg border border-ink-border bg-ink-100/60 px-3 py-2.5 text-sm text-white focus:border-volt/50 focus:outline-none disabled:opacity-50"
              >
                <option value="aucun">Aucun accès</option>
                <option value="apercu">Aperçu (Fondations)</option>
                <option value="complet">Complet</option>
              </select>
            </div>

            {!detail ? (
              <p className="mt-6 text-sm text-mist-muted">Chargement...</p>
            ) : (
              <>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-volt">
                    Modules complétés ({detail.modules.length}/{moduleOrder.length})
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {detail.modules.map((m) => (
                      <span
                        key={m.module_id}
                        className="rounded-md bg-volt/10 px-2.5 py-1 text-xs font-semibold text-volt"
                      >
                        {m.module_id}
                      </span>
                    ))}
                    {detail.modules.length === 0 && (
                      <span className="text-xs text-mist-dim">Aucun module complété.</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-volt">
                    <Swords size={13} />
                    Roleplays ({detail.roleplays.length})
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {detail.roleplays.slice(0, 5).map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between rounded-lg border border-ink-border bg-ink-100/60 px-3.5 py-2 text-xs"
                      >
                        <span className="text-mist">{r.profile_key}</span>
                        <span className="font-semibold text-white">{r.score}/100</span>
                      </div>
                    ))}
                    {detail.roleplays.length === 0 && (
                      <span className="text-xs text-mist-dim">Aucun roleplay joué.</span>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-volt">
                    <Target size={13} />
                    Objections les plus ratées
                  </p>
                  <div className="mt-2 flex flex-col gap-1.5">
                    {detail.weakestObjections.slice(0, 4).map((o) => (
                      <div
                        key={o.key}
                        className="flex items-center justify-between rounded-lg border border-coral/25 bg-coral/5 px-3.5 py-2 text-xs"
                      >
                        <span className="text-mist">
                          {getObjection(o.key)?.label ?? o.key} ({o.attempts} essais)
                        </span>
                        <span className="font-semibold text-coral">{o.avg}/100</span>
                      </div>
                    ))}
                    {detail.weakestObjections.length === 0 && (
                      <span className="text-xs text-mist-dim">Aucune tentative.</span>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t border-ink-border pt-6">
                  <p className="text-xs font-bold uppercase tracking-wide text-volt">
                    Envoyer un message direct
                  </p>
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Écris ton message..."
                      className="flex-1 rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
                    />
                    <Button onClick={sendMessage} size="md" disabled={sending || !message.trim()}>
                      <Send size={15} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
