import { notFound } from 'next/navigation'
import Navbar from '@/components/landing/Navbar'
import ObjectionDrill from '@/components/objections/ObjectionDrill'
import { getObjection, objections } from '@/lib/knowledge'
import { objectionLines, objectionSlugs, slugToObjectionKey } from '@/lib/objection-content'

export function generateStaticParams() {
  return objections.map((o) => ({ slug: objectionSlugs[o.key] }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const objectionKey = slugToObjectionKey[slug]
  if (!objectionKey) return {}
  return {
    title: `« ${objectionLines[objectionKey]} » — Simulateur d’Objections — Cercle Élite Closing`,
  }
}

export default async function ObjectionDrillPage({ params }) {
  const { slug } = await params
  const objectionKey = slugToObjectionKey[slug]
  const objection = objectionKey ? getObjection(objectionKey) : null
  if (!objection) notFound()

  return (
    <>
      <Navbar />
      <main className="relative pb-16 pt-28">
        <ObjectionDrill
          objectionKey={objectionKey}
          objection={objection}
          line={objectionLines[objectionKey]}
        />
      </main>
    </>
  )
}
