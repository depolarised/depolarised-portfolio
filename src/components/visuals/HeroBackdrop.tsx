'use client'

import dynamic from 'next/dynamic'
import { HERO_FRAG } from '@/components/visuals/shaderKit'

const FragmentCanvas = dynamic(() => import('@/components/visuals/FragmentCanvas'), {
  ssr: false,
  loading: () => null,
})

/** Site-wide signature backdrop (mounted once in the root layout): the grape
 *  field carrying a contained AF-ECG feature, receding as each route scrolls. */
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
