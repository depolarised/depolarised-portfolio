'use client'

import { useEffect, useState } from 'react'

const KEY = 'ef-variant'
type Variant = 'v1' | 'v2'

const OPTIONS: { value: Variant; label: string }[] = [
  { value: 'v1', label: 'V1 · light' },
  { value: 'v2', label: 'V2 · violet' },
]

/**
 * Dev-only floating switch to compare the two surface treatments.
 * v1 = light base with violet field sections; v2 = violet base everywhere.
 * Writes [data-variant] on <html> and persists the choice in localStorage.
 */
export default function VersionBar() {
  const [variant, setVariant] = useState<Variant>('v1')

  useEffect(() => {
    const stored = (localStorage.getItem(KEY) as Variant | null) ?? 'v1'
    setVariant(stored)
    document.documentElement.dataset.variant = stored
  }, [])

  const choose = (v: Variant) => {
    setVariant(v)
    document.documentElement.dataset.variant = v
    try {
      localStorage.setItem(KEY, v)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-1 rounded-full border border-chalk/15 bg-ink/95 py-1.5 pl-3 pr-1.5 backdrop-blur">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-chalk/45">
        Field
      </span>
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => choose(o.value)}
          aria-pressed={variant === o.value}
          className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
            variant === o.value
              ? 'bg-lime text-ink'
              : 'text-chalk/70 hover:text-chalk'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
