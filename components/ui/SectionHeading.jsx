'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-emerald">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base leading-relaxed text-mist-muted sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}
