import type { Metadata } from 'next'
import ShaderBackdrop from '@/components/visuals/ShaderBackdrop'
import { profile } from '@/content/profile'
import { MonoLabel } from '@/components/ui/MonoLabel'

export const metadata: Metadata = {
  title: 'Lab — shader variant',
  robots: { index: false, follow: false },
}

/**
 * Experimental variant of the home hero on a bold iridescent WebGL field
 * instead of the AF-ECG signal. Same copy as `/` for an apples-to-apples
 * comparison; the signal home is unchanged.
 */
export default function Lab() {
  return (
    <>
      <ShaderBackdrop />
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <div className="section-container w-full py-20 md:py-28">
          <div className="anim-rise max-w-3xl" style={{ animationDelay: '120ms' }}>
            <MonoLabel className="text-chalk/60">
              Experiment · 実験 — shader variant
            </MonoLabel>
            <h1 className="mt-5 font-display text-display-xl text-chalk">
              {profile.tagline}
            </h1>
            <p className="mt-3 font-display text-h2 text-chalk/80">
              {profile.taglineJa}
            </p>
            <p className="mt-6 max-w-xl text-body-lg leading-relaxed text-chalk/85">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-lime px-7 py-3 font-sans font-bold text-ink transition-colors duration-200 hover:bg-lime/85"
              >
                Back to the signal home
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
