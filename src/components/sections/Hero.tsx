'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { MonoLabel } from '@/components/ui/MonoLabel'
import { revealStagger, revealItem } from '@/lib/motion'

const SignalField = dynamic(() => import('@/components/visuals/SignalField'), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
})

export default function Hero() {
  return (
    <section className="field relative overflow-hidden">
      <div className="section-container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div variants={revealStagger(0.12)} initial="hidden" animate="show">
          <motion.div variants={revealItem}>
            <MonoLabel className="text-chalk/70">{profile.name}</MonoLabel>
          </motion.div>

          <motion.h1
            variants={revealItem}
            className="mt-5 font-display text-display-xl text-chalk"
          >
            {profile.tagline}
          </motion.h1>

          <motion.p
            variants={revealItem}
            className="mt-3 font-display text-h2 text-chalk/80"
          >
            {profile.taglineJa}
          </motion.p>

          <motion.p
            variants={revealItem}
            className="mt-6 max-w-xl text-body-lg leading-relaxed text-chalk/85"
          >
            {profile.summary}
          </motion.p>

          <motion.div variants={revealItem} className="mt-8 flex flex-wrap gap-3">
            <Button href="/work" variant="onField" withArrow>
              View work
            </Button>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-chalk/40 px-6 py-3 font-sans font-bold text-chalk transition-colors duration-200 hover:bg-chalk hover:text-ink"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div variants={revealItem} className="mt-10 space-y-1.5">
            <MonoLabel as="div" className="text-chalk/55">
              {profile.role} · {profile.location}
            </MonoLabel>
            {profile.credentials && (
              <MonoLabel as="div" className="text-chalk/70">
                {profile.credentials}
              </MonoLabel>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[280px] sm:h-[360px] lg:h-[460px]"
        >
          <SignalField />
        </motion.div>
      </div>
    </section>
  )
}
