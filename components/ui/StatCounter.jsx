'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export default function StatCounter({ value, suffix = '', prefix = '', label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 30, stiffness: 90 })

  useEffect(() => {
    if (isInView) motionValue.set(value)
  }, [isInView, value, motionValue])

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest).toLocaleString('fr-FR')}${suffix}`
      }
    })
  }, [spring, prefix, suffix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-1.5 text-center"
    >
      <span ref={ref} className="font-display text-4xl font-bold text-white sm:text-5xl">
        {prefix}0{suffix}
      </span>
      <span className="text-sm text-mist-muted">{label}</span>
    </motion.div>
  )
}
