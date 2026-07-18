'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Swords } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'
import { diagnoseSupabaseEnv } from '@/lib/env-check'

export default function SignupPage() {
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }

    setLoading(true)
    const supabase = getSupabaseBrowserClient()
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { prenom } },
    })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Un compte existe déjà avec cet email.')
      } else if (signUpError.message.includes('ISO-8859-1')) {
        setError(`${signUpError.message} — DIAGNOSTIC : ${diagnoseSupabaseEnv()}`)
      } else {
        setError(signUpError.message)
      }
      setLoading(false)
      return
    }

    await fetch('/api/auth/promote', { method: 'POST' })
    router.push('/onboarding')
  }

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-40 blur-[140px]" />

      <Container className="relative max-w-md">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-volt-gradient text-white">
            <Swords size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-bold italic text-white">
            Closing <span className="text-volt">Evolution</span>
          </span>
        </Link>

        <h1 className="mt-10 font-display text-3xl font-bold italic text-white">
          Crée ton compte
        </h1>
        <p className="mt-2 text-sm text-mist-muted">
          Rejoins le cercle et commence ton parcours de closer d'élite.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
              Prénom
            </label>
            <input
              type="text"
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink-border bg-ink-100/60 px-4 py-3 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
              placeholder="Ton prénom"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink-border bg-ink-100/60 px-4 py-3 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
              placeholder="toi@email.com"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-mist-dim">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-ink-border bg-ink-100/60 px-4 py-3 text-sm text-white placeholder:text-mist-dim focus:border-volt/50 focus:outline-none"
              placeholder="8 caractères minimum"
            />
          </div>

          {error && <p className="text-xs text-coral">{error}</p>}

          <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full justify-center">
            {loading ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-mist-muted">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-semibold text-volt hover:text-volt-soft">
            Connecte-toi
          </Link>
        </p>
      </Container>
    </main>
  )
}
