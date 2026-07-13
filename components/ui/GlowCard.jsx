'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function GlowCard({ children, className, delay = 0 }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-100/60 p-7 shadow-card transition-colors duration-300 hover:border-volt/30',
        className
      )}
      style={{
        '--x': `${pos.x}%`,
        '--y': `${pos.y}%`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at var(--x) var(--y), rgba(138,92,246,0.14), transparent 70%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
