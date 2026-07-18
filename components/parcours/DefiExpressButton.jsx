import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

export default function DefiExpressButton() {
  return (
    <Link
      href="/defi/express"
      className="group flex items-center justify-between rounded-lg border border-coral/25 bg-coral/5 px-5 py-4 transition-colors hover:border-coral/50"
    >
      <div className="flex items-center gap-3.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-coral/15 text-coral">
          <Zap size={17} />
        </span>
        <div>
          <p className="font-display text-sm font-bold text-white">Défi Express — 5 minutes</p>
          <p className="text-xs text-mist-dim">
            3 flashcards + 1 situation + le défi du jour. Parfait pour garder ta série.
          </p>
        </div>
      </div>
      <ArrowRight size={16} className="text-coral transition-transform group-hover:translate-x-1" />
    </Link>
  )
}
