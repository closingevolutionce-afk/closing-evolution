import { bangers } from '@/lib/knowledge'

export default function BangersMarquee() {
  const loop = [...bangers, ...bangers]

  return (
    <div className="relative overflow-hidden border-y border-ink-border bg-ink-50/40 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((banger, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap text-sm font-medium text-mist-muted"
          >
            <span className="h-1 w-1 rounded-full bg-volt" />
            {banger}
          </span>
        ))}
      </div>
    </div>
  )
}
