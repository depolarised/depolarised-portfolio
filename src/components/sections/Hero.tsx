'use client'

import { profile } from '@/content/profile'
import { MonoLabel } from '@/components/ui/MonoLabel'

/**
 * Home hero — text over the fixed shader backdrop (the single canvas). No own
 * surface: the violet grape field and the anchored AF-ECG feature come from
 * HeroBackdrop behind it, receding as you scroll. Entrance is pure CSS
 * (globals.css) so the first paint is never a frozen empty stage.
 */
export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div className="section-container w-full py-16 md:py-24">
        <div className="max-w-3xl">
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
            <a
              href="/work"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3 font-sans font-bold text-ink transition-colors duration-200 hover:bg-lime/85"
            >
              View work
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-chalk/40 px-7 py-3 font-sans font-bold text-chalk transition-colors duration-200 hover:border-chalk hover:bg-chalk/10"
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
      </div>

      {/* Scroll cue — tucked into the bottom-right corner, clear of the
          left-aligned credentials. Quiet, hidden under reduced motion. */}
      <div
        className="anim-fade pointer-events-none absolute bottom-8 right-6 flex flex-col items-center gap-3 sm:right-8 lg:right-12"
        style={{ animationDelay: '760ms' }}
        aria-hidden
      >
        <MonoLabel className="text-chalk/45">Scroll</MonoLabel>
        <span className="h-10 w-px bg-gradient-to-b from-chalk/40 to-transparent" />
      </div>
    </section>
  )
}
