import Link from 'next/link'
import { NAV } from '@/lib/constants'
import { profile } from '@/content/profile'
import { socialLinks } from '@/content/links'
import { Icon } from './Icons'
import { MonoLabel } from './MonoLabel'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-field-deep text-chalk">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded bg-field font-display text-sm font-black text-chalk">
                IV
              </span>
              <span className="font-display text-base font-bold">{profile.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-chalk/70">
              {profile.summary}
            </p>
            <p className="mt-4 font-mono text-label uppercase text-chalk/50">
              {profile.location} · {profile.affiliation}
            </p>
          </div>

          <div>
            <MonoLabel className="text-chalk/50">Index</MonoLabel>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-chalk/80 transition-colors hover:text-lime"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <MonoLabel className="text-chalk/50">Elsewhere</MonoLabel>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="group inline-flex items-center gap-3 text-sm text-chalk/80 transition-colors hover:text-lime"
                  >
                    <Icon name={link.icon} className="h-4 w-4" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-chalk/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-label uppercase text-chalk/50">
            © {year} {profile.name}
          </p>
          <p className="font-mono text-label uppercase text-chalk/40">
            Built with Next.js · Electric Field
          </p>
        </div>
      </div>
    </footer>
  )
}
