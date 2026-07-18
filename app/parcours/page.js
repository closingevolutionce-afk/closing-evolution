import Navbar from '@/components/landing/Navbar'
import ParcoursRoadmap from '@/components/parcours/ParcoursRoadmap'

export const metadata = {
  title: 'Parcours de Formation — Closing Evolution',
  description:
    "20 modules — Fondations, Pratique Avancée, Élite — pour former de vrais closers d'élite en 3 mois.",
}

export default function ParcoursPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />
        <ParcoursRoadmap />
      </main>
    </>
  )
}
