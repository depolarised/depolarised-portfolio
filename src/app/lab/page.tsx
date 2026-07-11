import type { Metadata } from 'next'
import Link from 'next/link'
import LabBackdrop from '@/components/visuals/LabBackdrop'
import { MonoLabel } from '@/components/ui/MonoLabel'

export const metadata: Metadata = {
  title: 'Lab — ECG ribbon',
  robots: { index: false, follow: false },
}

/** Working page for the ECG-ribbon hero candidate — static, anchored, reactive. */
export default function Lab() {
  return (
    <>
      <LabBackdrop />
      <section className="relative flex min-h-[92vh] flex-col justify-between py-24">
        <div className="section-container">
          <MonoLabel className="text-chalk/60">Lab · 実験 — ECG ribbon</MonoLabel>
          <h1 className="mt-4 font-display text-display text-chalk">
            Ribbon
            <span className="jp-mark text-lime">波帯</span>
          </h1>
          <p className="mt-3 max-w-md text-body-lg leading-relaxed text-chalk/80">
            A single AF-ECG trace as an iridescent ribbon in fake 3D — anchored and stable.
            Move the cursor to shimmer it.
          </p>
        </div>

        <div className="section-container">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-chalk/30 px-6 py-3 font-mono text-label uppercase text-chalk/80 transition-colors hover:bg-chalk/10 hover:text-chalk"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  )
}
