'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/cn'
import { NAV } from '@/lib/constants'
import { profile } from '@/content/profile'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navigation() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-colors duration-300',
        scrolled
          ? 'border-ink/10 bg-chalk/90 backdrop-blur'
          : 'border-transparent bg-chalk/0',
      )}
    >
      <nav className="section-container">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="flex items-center gap-3" aria-label={profile.name}>
            <span className="grid h-9 w-9 place-items-center rounded bg-field font-display text-sm font-black text-chalk">
              IV
            </span>
            <span className="hidden font-display text-base font-bold text-ink sm:block">
              {profile.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'pb-1 font-mono text-label uppercase transition-colors',
                    active
                      ? 'border-b-[3px] border-lime text-ink'
                      : 'text-haze hover:text-ink',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <ThemeToggle />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary px-5 py-2 text-sm"
            >
              CV
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-chalk md:hidden">
          <div className="section-container space-y-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-mono text-label uppercase text-haze hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle withLabel />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 w-full"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
