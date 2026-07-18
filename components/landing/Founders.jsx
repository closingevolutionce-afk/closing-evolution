'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clock, Play } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Founders() {
  const [playing, setPlaying] = useState(false)

  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 bg-volt-gradient opacity-20 blur-[130px]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Qui est derrière Closing Evolution"
          title="Deux closers devenus Head of Sales"
          description="Un vrai parcours, une vraie expertise, et des millions closés à nous deux. Cette méthode, c'est celle qu'on a appliquée pour y arriver."
        />

        <div className="mt-14 flex flex-col items-center gap-8">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-ink-border shadow-card">
            <Image
              src="/images/founders.jpeg"
              alt="Chirine et Emilien, fondateurs de Closing Evolution"
              width={640}
              height={630}
              className="w-full object-cover"
              priority={false}
            />
          </div>

          <div className="text-center">
            <p className="font-display text-base font-bold text-white">Chirine &amp; Emilien</p>
            <p className="text-sm text-mist-dim">Fondateurs</p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 rounded-2xl border border-ink-border bg-ink-100/40 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-ink-border bg-ink-200"
          >
            {playing ? (
              <p className="px-6 text-center text-sm text-mist-dim">
                Vidéo à venir — Chirine et Emilien l'enregistrent bientôt.
              </p>
            ) : (
              <>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-volt-gradient text-white shadow-glow transition-transform group-hover:scale-110">
                  <Play size={20} fill="currentColor" />
                </span>
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-md bg-ink/80 px-2.5 py-1 text-[11px] font-semibold text-mist">
                  <Clock size={11} />
                  2:00
                </span>
              </>
            )}
          </button>

          <div className="flex flex-col justify-center">
            <p className="font-display text-xs font-bold italic uppercase tracking-wider text-volt">
              On se présente
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-muted">
              On est Chirine et Emilien, aujourd'hui Head of Sales, avec des millions closés à nous
              deux. Cette méthode, c'est celle qu'on a nous-mêmes appliquée pour y arriver — pas une
              théorie qu'on a lue quelque part.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mist-muted">
              Un accompagnement sur mesure pour t'enseigner tout ce qu'on a appris et te transmettre
              notre expertise. <span className="font-semibold text-white">Si on l'a fait, tu peux le
              faire.</span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
