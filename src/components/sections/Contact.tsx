import { profile } from '@/content/profile'
import { socialLinks, links } from '@/content/links'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icons'

const openTo = [
  'Research & engineering roles in signal / ML at scale',
  'Collaborations on time-series and detection problems',
  'Speaking, peer review, and technical writing',
]

export default function Contact({ index = '03' }: { index?: string }) {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Contact"
            titleJa="連絡"
            description="Open to interesting problems in signal, scale, and learning. The fastest way to reach me is email."
          />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal className="grid gap-px overflow-hidden rounded border border-ink/10 bg-ink/10 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="group flex items-start gap-4 bg-chalk p-5 transition-colors hover:bg-mist"
              >
                <span className="mt-0.5 text-haze transition-colors group-hover:text-field">
                  <Icon name={link.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-bold text-ink">
                    {link.name}
                  </span>
                  <span className="block truncate text-sm text-haze">{link.handle}</span>
                </span>
              </a>
            ))}
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="font-mono text-label uppercase text-field">Open to</h3>
            <ul className="mt-5 space-y-4">
              {openTo.map((item) => (
                <li key={item} className="flex gap-3 text-ink">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-field" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={links.email} variant="primary" withArrow>
                {profile.email}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
