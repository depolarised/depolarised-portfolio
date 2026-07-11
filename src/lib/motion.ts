import type { Variants } from 'framer-motion'
import { easing, duration } from './design-tokens'

/** Standard reveal: fade + short rise on a calm expo-out curve. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.reveal, ease: easing.reveal },
  },
}

/** Container that staggers its children's reveal. */
export const revealStagger = (stagger: number = duration.stagger): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
})

/** Child item used inside a revealStagger container. */
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing.reveal },
  },
}

/** Shared viewport config for scroll-triggered reveals. */
export const viewportOnce = { once: true, margin: '-80px' } as const
