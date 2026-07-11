'use client'

import dynamic from 'next/dynamic'
import { HERO_FRAG } from '@/components/visuals/shaderKit'

const FragmentCanvas = dynamic(() => import('@/components/visuals/FragmentCanvas'), {
  ssr: false,
  loading: () => null,
})

/** Home hero backdrop: a contained, centred AF-ECG feature on the grape field. */
export default function HeroBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <FragmentCanvas
        frag={HERO_FRAG}
        recede
        ariaLabel="A centred iridescent ECG heartbeat, anchored on the violet field."
      />
    </div>
  )
}
