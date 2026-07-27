import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import DemarrageTopics from '@/components/demarrage/DemarrageTopics'
import { Rocket } from 'lucide-react'

export const metadata = {
  title: 'Démarrage — Closing Evolution',
  description:
    "Tout ce qu'il faut pour démarrer dans le closing : trouver une offre, les outils du quotidien, la rémunération, et comment candidater.",
}

export default function DemarragePage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-40 blur-[140px]" />

        <Container className="relative max-w-2xl">
          <Badge icon={Rocket}>Démarrage</Badge>
          <h1 className="mt-6 font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            Tout pour <span className="gradient-text">démarrer dans le milieu</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mist-muted">
            La technique de closing ne suffit pas pour vivre du closing. Voici ce qu'il faut
            comprendre pour trouver une offre, structurer son suivi, négocier sa rémunération et
            se présenter comme il faut.
          </p>

          <div className="mt-12">
            <DemarrageTopics />
          </div>
        </Container>
      </main>
    </>
  )
}
