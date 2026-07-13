import Link from 'next/link'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-volt-gradient text-white uppercase italic shadow-glow hover:shadow-glow-lg hover:brightness-110',
  secondary:
    'glass border border-ink-borderStrong text-mist uppercase italic hover:border-volt/50 hover:text-white',
  ghost: 'text-mist-muted hover:text-white',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-md font-display font-bold tracking-tight transition-all duration-300 ease-out active:scale-[0.97]',
    variants[variant],
    sizes[size],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
