'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/cn'

const KEY = 'ef-theme'
type Theme = 'light' | 'dark'

/**
 * Light/dark switch. Light is the default; a stored 'dark' preference is
 * applied before paint by the inline script in layout.tsx, so this component
 * reads the current theme from the <html> attribute after mount (SSR-safe).
 */
export default function ThemeToggle({ withLabel = false }: { withLabel?: boolean }) {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const isDark = theme === 'dark'

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'text-haze transition-colors hover:text-ink',
        withLabel
          ? 'flex items-center gap-3 py-3 font-mono text-label uppercase'
          : 'p-2',
      )}
    >
      {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      {withLabel && (isDark ? 'Light theme' : 'Dark theme')}
    </button>
  )
}
