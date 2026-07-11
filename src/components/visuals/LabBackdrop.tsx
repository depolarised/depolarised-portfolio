'use client'

import dynamic from 'next/dynamic'

const LabShader = dynamic(() => import('@/components/visuals/LabShader'), {
  ssr: false,
  loading: () => null,
})

/** Fixed, full-viewport backdrop for the ECG-ribbon shader study. */
export default function LabBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <LabShader />
    </div>
  )
}
