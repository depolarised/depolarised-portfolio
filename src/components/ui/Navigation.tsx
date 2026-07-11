'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/cn'
import { NAV } from '@/lib/constants'
import { profile } from '@/content/profile'

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
      {/* Full-bleed bar — items span the whole width, not clustered right. */}
      <div className="w-full px-6 sm:px-10 lg:px-14">
        <div className="flex h-20 items-center justify-between gap-6 md:h-24">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={profile.name}
          >
            <span className="grid h-10 w-10 place-items-center rounded bg-field font-display text-base font-black text-chalk">
              IV
            </span>
            <span className="hidden font-display text-lg font-bold text-ink lg:block">
              {profile.name}
            </span>
          </Link>

          <nav className="hidden flex-1 items-stretch justify-between px-4 md:flex lg:px-14">
            {NAV.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-5 py-2.5 transition-colors',
                    active ? 'bg-chalk/10' : 'hover:bg-chalk/5',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[15px] uppercase tracking-wide transition-colors md:text-base',
                      active ? 'text-ink' : 'text-haze group-hover:text-ink',
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="font-display text-[11px] font-normal tracking-[0.2em] text-chalk/45 transition-colors group-hover:text-chalk/70">
                    {item.ja}
                  </span>
                  {/* Lime bar at the bottom of the box (under the JP mark):
                      persistent for the active page, fades in on hover. */}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute inset-x-5 bottom-1 h-[3px] rounded-full bg-lime transition-opacity duration-200',
                      active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden shrink-0 px-6 text-base md:inline-flex"
          >
            CV
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-chalk md:hidden">
          <div className="space-y-1 px-6 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between py-4 font-mono text-lg uppercase text-haze hover:text-ink"
              >
                <span>{item.label}</span>
                <span className="font-display text-sm text-chalk/45">{item.ja}</span>
              </Link>
            ))}
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-3 w-full py-3 text-base"
            >
              Download CV
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
