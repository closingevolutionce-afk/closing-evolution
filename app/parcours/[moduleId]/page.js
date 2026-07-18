import { notFound } from 'next/navigation'
import Navbar from '@/components/landing/Navbar'
import ModuleContent from '@/components/parcours/ModuleContent'
import { getModule, moduleOrder } from '@/lib/knowledge'

export function generateStaticParams() {
  return moduleOrder.map((id) => ({ moduleId: id.toLowerCase() }))
}

export async function generateMetadata({ params }) {
  const { moduleId } = await params
  const m = getModule(moduleId.toUpperCase())
  if (!m) return {}
  return {
    title: `${m.titre} — Parcours — Closing Evolution`,
    description: m.objectif,
  }
}

export default async function ModulePage({ params }) {
  const { moduleId } = await params
  const id = moduleId.toUpperCase()
  const m = getModule(id)
  if (!m) notFound()

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />
        <ModuleContent id={id} module={m} />
      </main>
    </>
  )
}
