'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Layers, Play, Plus, Trash2, Video, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useAuth } from '@/components/auth/AuthProvider'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { getEmbedUrl, getPlatformLabel } from '@/lib/replays'

function SimpleAddForm({ onAdded }) {
  const { user } = useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !videoUrl.trim()) return
    setSaving(true)
    setError(null)
    const supabase = getSupabaseBrowserClient()
    const { error: insertError } = await supabase.from('replays').insert({
      title: title.trim(),
      description: description.trim() || null,
      video_url: videoUrl.trim(),
      created_by: user.id,
    })
    setSaving(false)
    if (insertError) {
      setError(insertError.message)
      return
    }
    setTitle('')
    setDescription('')
    setVideoUrl('')
    onAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du replay"
        className="rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optionnel)"
        className="rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
      />
      <input
        type="url"
        required
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Lien Fathom / Google Meet / YouTube / Loom / Vimeo"
        className="rounded-lg border border-ink-border bg-ink-100/60 px-4 py-2.5 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
      />
      {error && <p className="text-xs text-coral">{error}</p>}
      <Button type="submit" size="md" disabled={saving} className="self-start">
        <Plus size={15} />
        {saving ? 'Ajout...' : 'Ajouter'}
      </Button>
    </form>
  )
}

function BulkAddForm({ onAdded }) {
  const { user } = useAuth()
  const [bulkText, setBulkText] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const lines = bulkText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)

    if (lines.length === 0) return

    const rows = lines.map((line, i) => {
      const [first, ...rest] = line.split('|').map((s) => s.trim())
      const hasTitle = rest.length > 0
      return {
        title: hasTitle ? first : `Replay coaching ${i + 1}`,
        video_url: hasTitle ? rest.join('|') : first,
        created_by: user.id,
      }
    })

    setSaving(true)
    setError(null)
    setResult(null)
    const supabase = getSupabaseBrowserClient()
    const { error: insertError } = await supabase.from('replays').insert(rows)
    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }
    setResult(`${rows.length} replay(s) ajouté(s).`)
    setBulkText('')
    onAdded()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-xs text-mist-muted">
        Un lien par ligne. Format optionnel avec titre :{' '}
        <span className="text-mist">Titre du call | https://...</span> — sans "|", le lien seul
        suffit.
      </p>
      <textarea
        value={bulkText}
        onChange={(e) => setBulkText(e.target.value)}
        rows={8}
        placeholder={'Call avec Marie — objections | https://fathom.video/share/xxxx\nhttps://fathom.video/share/yyyy'}
        className="rounded-lg border border-ink-border bg-ink-100/60 p-4 font-mono text-xs text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
      />
      {error && <p className="text-xs text-coral">{error}</p>}
      {result && <p className="text-xs text-volt">{result}</p>}
      <Button type="submit" size="md" disabled={saving || !bulkText.trim()} className="self-start">
        <Layers size={15} />
        {saving ? 'Ajout...' : 'Ajouter tous les liens'}
      </Button>
    </form>
  )
}

function AddReplayForm({ onAdded }) {
  const [mode, setMode] = useState('bulk')

  return (
    <div className="mb-10 rounded-2xl border border-volt/25 bg-volt/5 p-6">
      <div className="flex items-center justify-between">
        <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
          Ajouter des replays (coach)
        </p>
        <div className="flex gap-1.5 rounded-md border border-ink-border p-1">
          <button
            type="button"
            onClick={() => setMode('bulk')}
            className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${mode === 'bulk' ? 'bg-volt text-white' : 'text-mist-dim'}`}
          >
            En masse
          </button>
          <button
            type="button"
            onClick={() => setMode('simple')}
            className={`rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors ${mode === 'simple' ? 'bg-volt text-white' : 'text-mist-dim'}`}
          >
            Un par un
          </button>
        </div>
      </div>
      <div className="mt-4">
        {mode === 'bulk' ? <BulkAddForm onAdded={onAdded} /> : <SimpleAddForm onAdded={onAdded} />}
      </div>
    </div>
  )
}

export default function ReplayGrid() {
  const { user, profile } = useAuth()
  const [replays, setReplays] = useState(null)
  const [active, setActive] = useState(null)
  const isAdmin = profile?.role === 'admin'

  async function load() {
    const supabase = getSupabaseBrowserClient()
    const { data } = await supabase
      .from('replays')
      .select('id, title, description, video_url, created_at')
      .order('created_at', { ascending: false })
    setReplays(data ?? [])
  }

  useEffect(() => {
    if (user) load()
  }, [user])

  async function handleDelete(id) {
    const supabase = getSupabaseBrowserClient()
    await supabase.from('replays').delete().eq('id', id)
    setActive(null)
    load()
  }

  if (!replays) return <p className="text-sm text-mist-muted">Chargement...</p>

  return (
    <div>
      {isAdmin && <AddReplayForm onAdded={load} />}

      {replays.length === 0 ? (
        <p className="text-sm text-mist-muted">Aucun replay pour le moment.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {replays.map((r, i) => (
            <motion.button
              key={r.id}
              type="button"
              onClick={() => setActive(r)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="group flex flex-col rounded-2xl border border-ink-border bg-ink-100/60 p-6 text-left transition-colors hover:border-volt/40"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                <Play size={18} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">{r.title}</h3>
              {r.description && (
                <p className="mt-2 line-clamp-2 text-sm text-mist-muted">{r.description}</p>
              )}
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-mist-dim">
                <Video size={12} />
                {getPlatformLabel(r.video_url)}
              </span>
            </motion.button>
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={() => setActive(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-2xl border border-ink-border bg-ink-50"
          >
            <div className="flex items-center justify-between border-b border-ink-border p-5">
              <h3 className="font-display text-base font-bold text-white">{active.title}</h3>
              <button onClick={() => setActive(null)} className="text-mist-dim hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(active.video_url)}
                className="h-full w-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <a
                href={active.video_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-volt hover:text-volt-soft"
              >
                Ouvrir sur {getPlatformLabel(active.video_url)}
                <ExternalLink size={14} />
              </a>
              {isAdmin && (
                <button
                  onClick={() => handleDelete(active.id)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-coral hover:text-coral-soft"
                >
                  <Trash2 size={14} />
                  Supprimer
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
