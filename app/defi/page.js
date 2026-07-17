import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import DefiCard from '@/components/defi/DefiCard'
import { getChallengeForDate } from '@/lib/interactive-content'

export const metadata = {
  title: 'Défi du Jour — Cercle Élite Closing',
  description: 'Une micro-situation chaque jour pour garder le réflexe closing, 5 minutes suffisent.',
}

export default function DefiPage() {
  const challenge = getChallengeForDate()

  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-20 blur-[140px]" />

        <Container className="relative max-w-2xl">
          <Badge>Défi du jour</Badge>
          <h1 className="mt-6 font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            5 minutes pour garder le <span className="gradient-text">réflexe</span>.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-mist-muted">
            Une micro-situation par jour. Réponds, compare avec la réponse idéale, garde ta série
            active.
          </p>

          <div className="mt-10">
            <DefiCard challenge={challenge} />
          </div>
        </Container>
      </main>
    </>
  )
}
