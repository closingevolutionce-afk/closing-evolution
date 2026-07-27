import { ArrowRight } from 'lucide-react'
import GlowCard from '@/components/ui/GlowCard'
import Button from '@/components/ui/Button'
import { demarrageTopics } from '@/lib/demarrage-content'

export default function DemarrageTopics() {
  return (
    <div className="flex flex-col gap-6">
      {demarrageTopics.map((topic, i) => {
        const Icon = topic.icon
        return (
          <GlowCard key={topic.id} delay={i * 0.06} className="px-7 py-8 sm:px-9 sm:py-10">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-volt/10 text-volt ring-1 ring-volt/25">
                <Icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-white">{topic.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">{topic.intro}</p>
              </div>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {topic.points.map((point, j) => (
                <li key={j} className="flex gap-3 text-sm leading-relaxed text-mist">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-volt" />
                  {point}
                </li>
              ))}
            </ul>

            {topic.moduleLink && (
              <div className="mt-6 border-t border-ink-border pt-5">
                <Button href={topic.moduleLink.href} variant="ghost" size="md" className="!px-0">
                  {topic.moduleLink.label}
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            )}
          </GlowCard>
        )
      })}
    </div>
  )
}
