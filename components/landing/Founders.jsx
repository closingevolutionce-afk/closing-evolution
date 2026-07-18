import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

export default function Founders() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[400px] -translate-y-1/2 bg-volt-gradient opacity-20 blur-[130px]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Qui est derrière Closing Evolution"
          title="Deux closers, une méthode forgée call après call"
          description="Pas une théorie apprise dans un livre — un système construit sur des centaines d'appels réels, débriefés, corrigés, répétés."
        />

        <div className="mt-14 flex flex-col items-center gap-8">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-ink-border shadow-card">
            <Image
              src="/images/founders.jpeg"
              alt="Chirine et Emilien Besnardeau, fondateurs de Closing Evolution"
              width={640}
              height={630}
              className="w-full object-cover"
              priority={false}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center">
            <div>
              <p className="font-display text-base font-bold text-white">Chirine</p>
              <p className="text-sm text-mist-dim">Fondatrice</p>
            </div>
            <span className="hidden h-8 w-px bg-ink-border sm:block" />
            <div>
              <p className="font-display text-base font-bold text-white">Emilien Besnardeau</p>
              <p className="text-sm text-mist-dim">Co-fondateur</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
