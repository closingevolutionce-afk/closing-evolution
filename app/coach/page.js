'use client'

import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import CoachDashboard from '@/components/coach/CoachDashboard'
import { useAuth } from '@/components/auth/AuthProvider'

export default function CoachPage() {
  const { profile, loading } = useAuth()

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-24">
          <Container className="text-center text-mist-muted">Chargement...</Container>
        </main>
      </>
    )
  }

  if (profile && profile.role !== 'admin') {
    return (
      <>
        <Navbar />
        <main className="pt-40 pb-24">
          <Container className="max-w-lg text-center">
            <p className="text-mist-muted">
              Cette page est réservée à l'équipe coach.
            </p>
          </Container>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <Container className="relative">
          <Badge>Espace Coach</Badge>
          <h1 className="mt-6 font-display text-3xl font-bold italic text-white sm:text-4xl">
            Vue d'ensemble des élèves
          </h1>
          <p className="mt-3 text-mist-muted">
            Clique sur un élève pour voir son détail complet.
          </p>

          <div className="mt-10">
            <CoachDashboard />
          </div>
        </Container>
      </main>
    </>
  )
}
