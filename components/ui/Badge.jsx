import { cn } from '@/lib/utils'

export default function Badge({ children, className, icon: Icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border border-volt/30 bg-volt/10 px-3.5 py-1.5 text-xs font-semibold italic uppercase tracking-wider text-volt-soft',
        className
      )}
    >
      {Icon && <Icon size={13} strokeWidth={2.5} />}
      {children}
    </span>
  )
}
