import { cn } from '@/lib/utils'

const TONES = {
  volt: 'border-volt/30 bg-volt/10 text-volt-soft',
  coral: 'border-coral/30 bg-coral/10 text-coral-soft',
  amber: 'border-amber/30 bg-amber/10 text-amber',
}

export default function Badge({ children, className, icon: Icon, tone = 'volt' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-3.5 py-1.5 text-xs font-semibold italic uppercase tracking-wider',
        TONES[tone] ?? TONES.volt,
        className
      )}
    >
      {Icon && <Icon size={13} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
