'use client'

import { motion } from 'framer-motion'
import { reveal, viewportOnce } from '@/lib/motion'

/** Scroll-triggered fade + rise. Honours prefers-reduced-motion via globals.css. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
