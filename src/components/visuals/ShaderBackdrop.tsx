'use client'

import dynamic from 'next/dynamic'

const ShaderField = dynamic(() => import('@/components/visuals/ShaderField'), {
  ssr: false,
  loading: () => null,
})

/**
 * Fixed, full-viewport iridescent shader the page sits on — the /lab variant of
 * SignalBackdrop. `var(--field)` is the flat-violet fallback shown until the
 * shader paints (or if WebGL is unavailable).
 */
export default function ShaderBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <ShaderField />
    </div>
  )
}
