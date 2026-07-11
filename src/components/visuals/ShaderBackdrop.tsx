'use client'

import dynamic from 'next/dynamic'

const ShaderField = dynamic(() => import('@/components/visuals/ShaderField'), {
  ssr: false,
  loading: () => null,
})

/**
 * Fixed, full-viewport iridescent shader the page sits on. `var(--field)` is the
 * flat-violet fallback shown until the shader paints (or if WebGL is
 * unavailable). Pass `recede` on scrolling pages (home) so it dims toward the
 * flat field and keeps content below legible.
 */
export default function ShaderBackdrop({ recede = false }: { recede?: boolean }) {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <ShaderField recede={recede} />
    </div>
  )
}
