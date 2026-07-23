'use client'

import Script from 'next/script'
import Image from 'next/image'
import { CalendarCheck, Clock, MessageCircleQuestion, ShieldCheck } from 'lucide-react'
import Container from '@/components/ui/Container'
import Badge from '@/components/ui/Badge'

const CALENDLY_URL = 'https://calendly.com/closingevolution-ce'

const POINTS = [
  {
    icon: Clock,
    title: '30 minutes',
    description: 'Pour voir si notre accompagnement répond à tes besoins et si on peut travailler ensemble.',
  },
  {
    icon: MessageCircleQuestion,
    title: 'On répond à tes questions',
    description: 'Le programme, le format, ce que ça change concrètement pour toi.',
  },
  {
    icon: ShieldCheck,
    title: 'Sans engagement',
    description: "On voit ensemble si Closing Evolution est fait pour toi — pas de pression.",
  },
]

export default function CandidaterContent() {
  return (
    <Container className="relative">
      <Badge icon={CalendarCheck}>Candidater</Badge>
      <h1 className="mt-6 max-w-2xl font-display text-4xl font-bold italic leading-[1.08] text-white sm:text-5xl">
        Réserve un appel avec <span className="gradient-text">Chirine &amp; Emilien</span>.
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist-muted">
        Choisis un créneau ci-dessous. On échange 30 minutes pour voir si notre accompagnement
        répond à tes besoins et si on peut travailler ensemble.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-2xl border border-ink-border">
            <Image
              src="/images/founders-round.jpg"
              alt="Chirine et Emilien, fondateurs de Closing Evolution"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            {POINTS.map((point) => {
              const Icon = point.icon
              return (
                <div key={point.title} className="flex items-start gap-3 rounded-lg border border-ink-border bg-ink-100/60 p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                    <Icon size={16} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-white">{point.title}</p>
                    <p className="mt-0.5 text-sm text-mist-muted">{point.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-ink-border bg-ink-100/40 shadow-card">
          <div
            className="calendly-inline-widget"
            data-url={CALENDLY_URL}
            style={{ minWidth: '280px', height: '780px' }}
          />
          <Script
            src="https://assets.calendly.com/assets/external/widget.js"
            strategy="lazyOnload"
          />
        </div>
      </div>
    </Container>
  )
}
