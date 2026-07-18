import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import ReplayGrid from '@/components/replays/ReplayGrid'
import { Video } from 'lucide-react'

export const metadata = {
  title: 'Replays — Closing Evolution',
  description: 'Bibliothèque des calls de coaching en replay.',
}

export default function ReplaysPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />

        <Container className="relative">
          <Badge icon={Video}>Replays</Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            Les calls de <span className="gradient-text">coaching</span>, à volonté.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
            Revisionne les sessions de coaching en replay, quand tu veux.
          </p>

          <div className="mt-12">
            <ReplayGrid />
          </div>
        </Container>
      </main>
    </>
  )
}
