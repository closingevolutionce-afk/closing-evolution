import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/landing/Navbar'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'
import MessageOfDay from '@/components/mindset/MessageOfDay'
import { objections } from '@/lib/knowledge'
import { objectionLines, objectionIcons, objectionSlugs } from '@/lib/objection-content'

export const metadata = {
  title: 'Simulateur d’Objections — Closing Evolution',
  description: 'Entraîne-toi objection par objection avec un feedback immédiat de l’IA.',
}

export default function ObjectionsPage() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden pb-24 pt-40">
        <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-volt-gradient opacity-30 blur-[140px]" />

        <Container className="relative">
          <Badge>Simulateur d’Objections</Badge>
          <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
            Choisis l'objection à <span className="gradient-text">travailler</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
            Une objection, une réponse, un feedback immédiat : as-tu identifié la vraie objection
            derrière — argent ou peur — et appliqué le Framework Split ?
          </p>

          <MessageOfDay className="mt-8 max-w-xl" />

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {objections.map((objection) => {
              const Icon = objectionIcons[objection.key]
              return (
                <Link
                  key={objection.key}
                  href={`/objections/${objectionSlugs[objection.key]}`}
                  className="group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-100/60 p-7 shadow-card transition-colors duration-300 hover:border-volt/40"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                    <Icon size={22} strokeWidth={2} />
                  </div>

                  <h2 className="mt-6 font-display text-xl font-bold text-white">
                    « {objectionLines[objection.key]} »
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-mist-muted">
                    Vraie objection attendue : {objection.vraie_objection}
                  </p>

                  <div className="mt-6 flex items-center gap-2 border-t border-ink-border pt-5 text-sm font-semibold italic text-volt">
                    S'entraîner
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              )
            })}
          </div>
        </Container>
      </main>
    </>
  )
}
