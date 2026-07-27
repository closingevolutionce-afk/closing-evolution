import { Quote } from 'lucide-react'
import GlowCard from '@/components/ui/GlowCard'
import { mindsetTexts } from '@/lib/mindset-texts'

export default function MindsetTexts() {
  return (
    <div className="flex flex-col gap-6">
      {mindsetTexts.map((post, i) => (
        <GlowCard key={post.title} delay={i * 0.06} className="px-7 py-9 sm:px-10 sm:py-11">
          <Quote size={22} className="text-volt/50" />
          <h3 className="mt-4 font-display text-2xl font-bold italic leading-snug text-white sm:text-3xl">
            {post.title}
          </h3>
          <div className="mt-6 flex flex-col gap-3">
            {post.lines.map((line, j) => (
              <p key={j} className="text-base leading-relaxed text-mist">
                {line}
              </p>
            ))}
          </div>
        </GlowCard>
      ))}
    </div>
  )
}
