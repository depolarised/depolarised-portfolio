'use client'

import dynamic from 'next/dynamic'

const SignalField = dynamic(() => import('@/components/visuals/SignalField'), {
  ssr: false,
  loading: () => null,
})

/**
 * Fixed, full-viewport violet field carrying the AF-ECG that the whole page
 * scrolls over — the single canvas. The signal recedes (dims) on scroll; see
 * SignalField's `backdrop` variant. `var(--field)` is used directly (not the
 * `bg-field` utility, which the dark map repurposes as the lime accent).
 */
export default function SignalBackdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10"
      style={{ background: 'var(--field)' }}
    >
      <SignalField variant="backdrop" />
    </div>
  )
}
