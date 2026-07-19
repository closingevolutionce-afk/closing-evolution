'use client'

import { useEffect, useState } from 'react'
import { Flame, Layers, Save, Swords, Trophy, Volume2, VolumeX, Zap } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import BadgeIcon from '@/components/profil/BadgeIcon'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { getLevelProgress } from '@/lib/xp'
import { setSoundEnabled } from '@/lib/sounds'

const STAT_TONES = {
  volt: 'bg-volt/10 text-volt ring-volt/25',
  coral: 'bg-coral/10 text-coral ring-coral/25',
  amber: 'bg-amber/10 text-amber ring-amber/25',
}

const BADGE_CARD_TONES = {
  volt: 'border-volt/25 bg-volt/5',
  coral: 'border-coral/25 bg-coral/5',
  amber: 'border-amber/25 bg-amber/5',
}

// Chaque icône de badge est rattachée à la section qu'elle célèbre
// (Arena, Défis, Parcours) pour reprendre le code couleur du reste du site.
const BADGE_TONES = {
  swords: 'coral',
  target: 'coral',
  flame: 'coral',
  trophy: 'amber',
  crown: 'amber',
  flag: 'volt',
  zap: 'volt',
  sparkles: 'volt',
}

function StatCard({ icon: Icon, label, value, tone = 'volt' }) {
  return (
    <div className="rounded-lg border border-ink-border bg-ink-100/60 p-5">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-md ring-1 ${STAT_TONES[tone] ?? STAT_TONES.volt}`}
      >
        <Icon size={17} />
      </span>
      <p className="mt-3 font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-mist-dim">{label}</p>
    </div>
  )
}

export default function ProfilPage() {
  const { user, profile, refreshProfile } = useAuth()
  const [stats, setStats] = useState({ modules: 0, roleplays: 0, bestScore: 0 })
  const [badges, setBadges] = useState([])
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState(null)
  const [soundOn, setSoundOn] = useState(true)

  useEffect(() => {
    if (profile) setEmail(profile.email ?? '')
  }, [profile])

  useEffect(() => {
    setSoundOn(window.localStorage.getItem('cec_sound_enabled') !== 'false')
  }, [])

  function toggleSound() {
    const next = !soundOn
    setSoundOn(next)
    setSoundEnabled(next)
  }

  useEffect(() => {
    if (!user) return
    const supabase = getSupabaseBrowserClient()

    async function load() {
      const [{ count: modulesCount }, { data: roleplays }, { data: userBadges }] =
        await Promise.all([
          supabase
            .from('module_progress')
            .select('module_id', { count: 'exact', head: true })
            .eq('user_id', user.id),
          supabase.from('roleplay_sessions').select('score').eq('user_id', user.id),
          supabase.from('user_badges').select('badge_slug, earned_at, badges (label, description, icon)').eq('user_id', user.id),
        ])

      setStats({
        modules: modulesCount ?? 0,
        roleplays: roleplays?.length ?? 0,
        bestScore: roleplays?.length ? Math.max(...roleplays.map((r) => r.score)) : 0,
      })
      setBadges(userBadges ?? [])
    }

    load()
  }, [user])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setSaveMessage(null)
    const supabase = getSupabaseBrowserClient()
    const updates = {}
    if (email && email !== profile?.email) updates.email = email
    if (newPassword) updates.password = newPassword

    if (Object.keys(updates).length === 0) {
      setSaving(false)
      return
    }

    const { error } = await supabase.auth.updateUser(updates)
    if (error) {
      setSaveMessage({ type: 'error', text: error.message })
    } else {
      setSaveMessage({ type: 'success', text: 'Modifications enregistrées.' })
      setNewPassword('')
      await refreshProfile()
    }
    setSaving(false)
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-24">
          <Container className="max-w-3xl text-center text-mist-muted">Chargement...</Container>
        </main>
      </>
    )
  }

  const { level, nextLevel, percent } = getLevelProgress(profile.xp ?? 0)

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-40 blur-[140px]" />

        <Container className="relative max-w-3xl">
          <div className="flex items-center gap-5">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-volt-gradient font-display text-2xl font-bold text-white shadow-glow">
              {(profile.prenom ?? profile.email)[0]?.toUpperCase()}
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold italic text-white">
                {profile.prenom ?? 'Closer'}
              </h1>
              <Badge className="mt-1.5">{level.label}</Badge>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-ink-border bg-ink-100/60 p-5">
            <div className="flex items-center justify-between text-xs uppercase tracking-wide text-mist-dim">
              <span>{level.label}</span>
              <span>{nextLevel ? `${profile.xp} / ${level.max} XP` : `${profile.xp} XP — niveau max`}</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-200">
              <div
                className="h-full rounded-full bg-volt-gradient transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
            {nextLevel && (
              <p className="mt-2 text-xs text-mist-dim">
                Encore {level.max - profile.xp} XP avant {nextLevel.label}
              </p>
            )}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={Layers} label="Modules complétés" value={stats.modules} tone="volt" />
            <StatCard icon={Swords} label="Roleplays joués" value={stats.roleplays} tone="coral" />
            <StatCard icon={Trophy} label="Meilleur score" value={stats.bestScore} tone="amber" />
            <StatCard
              icon={Flame}
              label="Streak actuel"
              value={profile.login_streak ?? 0}
              tone="coral"
            />
          </div>

          <div className="mt-10">
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
              Badges
            </p>
            {badges.length === 0 ? (
              <p className="mt-3 text-sm text-mist-muted">
                Pas encore de badge — joue ton premier roleplay ou complète ton premier module.
              </p>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {badges.map(({ badge_slug, badges: b }) => {
                  const tone = BADGE_TONES[b?.icon] ?? 'volt'
                  return (
                  <div
                    key={badge_slug}
                    className={`flex items-center gap-3 rounded-lg border p-4 ${BADGE_CARD_TONES[tone]}`}
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ring-1 ${STAT_TONES[tone]}`}>
                      <BadgeIcon icon={b?.icon} />
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-white">{b?.label}</p>
                      <p className="text-xs text-mist-muted">{b?.description}</p>
                    </div>
                  </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="mt-10">
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
              Sons
            </p>
            <button
              type="button"
              onClick={toggleSound}
              className="mt-4 flex w-full items-center justify-between rounded-lg border border-ink-border bg-ink-100/60 p-5 text-left"
            >
              <span className="flex items-center gap-3 text-sm text-mist">
                {soundOn ? <Volume2 size={17} className="text-volt" /> : <VolumeX size={17} />}
                Sons d'interaction (quiz, level up)
              </span>
              <span
                className={`relative h-6 w-11 rounded-full transition-colors ${soundOn ? 'bg-volt' : 'bg-ink-300'}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${soundOn ? 'translate-x-5' : 'translate-x-0.5'}`}
                />
              </span>
            </button>
          </div>

          <div className="mt-10">
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
              Paramètres du compte
            </p>
            <form onSubmit={handleSave} className="mt-4 flex flex-col gap-4 rounded-lg border border-ink-border bg-ink-100/60 p-6">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-ink-border bg-ink-100/60 px-4 py-3 text-sm text-white focus:border-volt/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
                  Nouveau mot de passe
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Laisser vide pour ne pas changer"
                  className="mt-1.5 w-full rounded-lg border border-ink-border bg-ink-100/60 px-4 py-3 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
                />
              </div>
              {saveMessage && (
                <p className={`text-xs ${saveMessage.type === 'error' ? 'text-coral' : 'text-volt'}`}>
                  {saveMessage.text}
                </p>
              )}
              <Button type="submit" size="md" disabled={saving} className="self-start">
                <Save size={15} />
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </>
  )
}
