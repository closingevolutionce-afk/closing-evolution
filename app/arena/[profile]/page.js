import { notFound } from 'next/navigation'
import Navbar from '@/components/landing/Navbar'
import ArenaChat from '@/components/arena/ArenaChat'
import { prospectProfiles, prospectProfileKeys } from '@/lib/knowledge'

export function generateStaticParams() {
  return prospectProfileKeys.map((profile) => ({ profile }))
}

export async function generateMetadata({ params }) {
  const { profile: profileKey } = await params
  const profile = prospectProfiles[profileKey]
  if (!profile) return {}
  return {
    title: `${profile.nom} — Arena du Roleplay — Cercle Élite Closing`,
  }
}

export default async function ArenaProfilePage({ params }) {
  const { profile: profileKey } = await params
  const profile = prospectProfiles[profileKey]
  if (!profile) notFound()

  return (
    <>
      <Navbar />
      <main className="relative pb-16 pt-28">
        <ArenaChat profileKey={profileKey} profile={profile} />
      </main>
    </>
  )
}
