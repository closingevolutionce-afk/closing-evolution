import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import HooksGrid from '@/components/hooks/HooksGrid'
import { Zap } from 'lucide-react'

export const metadata = {
  title: 'Hooks — Closing Evolution',
  description: "Des accroches prêtes à l'emploi pour ta prospection et ton positionnement, avec la technique expliquée à chaque fois.",
}

export default function HooksPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-40 blur-[140px]" />

        <Container className="relative max-w-2xl">
          <Badge icon={Zap}>Hooks</Badge>
          <h1 className="mt-6 font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            Des accroches qui <span className="gradient-text">captent l'attention</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mist-muted">
            Des techniques de copywriting prêtes à l'emploi pour ta prospection, ton positionnement
            ou tes réseaux — avec la mécanique expliquée à chaque fois pour que tu puisses les
            adapter toi-même.
          </p>

          <div className="mt-12">
            <HooksGrid />
          </div>
        </Container>
      </main>
    </>
  )
}
