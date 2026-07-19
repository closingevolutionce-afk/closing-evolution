import Container from '@/components/ui/Container'
import StatCounter from '@/components/ui/StatCounter'
import { stats } from '@/lib/content'

export default function SocialProof() {
  return (
    <section className="relative border-y border-ink-border bg-ink-50/40 py-14">
      <Container>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} {...stat} tone={['coral', 'amber', 'volt', 'coral'][i % 4]} />
          ))}
        </div>
      </Container>
    </section>
  )
}
