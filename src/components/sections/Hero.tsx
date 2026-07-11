'use client'

import dynamic from 'next/dynamic'
import { profile } from '@/content/profile'
import { Button } from '@/components/ui/Button'
import { MonoLabel } from '@/components/ui/MonoLabel'

const SignalField = dynamic(() => import('@/components/visuals/SignalField'), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden />,
})

export default function Hero() {
  return (
    <section className="field relative overflow-hidden">
      <div className="section-container grid items-center gap-10 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Entrance is pure CSS (see globals.css) so the first paint is never a
            frozen empty stage waiting on hydration. */}
        <div>
          <div
            className="anim-rise mb-6 flex items-center gap-2.5"
            style={{ animationDelay: '0ms' }}
          >
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            <MonoLabel className="text-chalk/70">Open to collaborations</MonoLabel>
          </div>

          <div className="anim-rise" style={{ animationDelay: '80ms' }}>
            <MonoLabel className="text-chalk/70">{profile.name}</MonoLabel>
          </div>

          <h1
            className="anim-rise mt-5 font-display text-display-xl text-chalk"
            style={{ animationDelay: '160ms' }}
          >
            {profile.tagline}
          </h1>

          <p
            className="anim-rise mt-3 font-display text-h2 text-chalk/80"
            style={{ animationDelay: '240ms' }}
          >
            {profile.taglineJa}
          </p>

          <p
            className="anim-rise mt-6 max-w-xl text-body-lg leading-relaxed text-chalk/85"
            style={{ animationDelay: '320ms' }}
          >
            {profile.summary}
          </p>

          <div
            className="anim-rise mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '400ms' }}
          >
            <Button href="/work" variant="onField" withArrow>
              View work
            </Button>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-chalk/40 px-6 py-3 font-sans font-bold text-chalk transition-colors duration-200 hover:bg-chalk hover:text-ink"
            >
              Get in touch
            </a>
          </div>

          <div
            className="anim-rise mt-10 space-y-1.5"
            style={{ animationDelay: '480ms' }}
          >
            <MonoLabel as="div" className="text-chalk/55">
              {profile.role} · {profile.location}
            </MonoLabel>
            {profile.credentials && (
              <MonoLabel as="div" className="text-chalk/70">
                {profile.credentials}
              </MonoLabel>
            )}
          </div>
        </div>

        <div
          className="anim-fade relative h-[280px] sm:h-[360px] lg:h-[460px]"
          style={{ animationDelay: '200ms' }}
        >
          <SignalField />
        </div>
      </div>
    </section>
  )
}
