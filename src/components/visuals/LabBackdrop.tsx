'use client'

import dynamic from 'next/dynamic'

const LabShader = dynamic(() => import('@/components/visuals/LabShader'), {
  ssr: false,
  loading: () => null,
})

/**
 * Fixed, full-viewport backdrop for the ECG-ribbon shader. Pass `recede` on
 * scrolling pages (home) so it dims toward the flat field below the hero.
 */
export default function LabBackdrop({ recede = false }: { recede?: boolean }) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <LabShader recede={recede} />
    </div>
  )
}
