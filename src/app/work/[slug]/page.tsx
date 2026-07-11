import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { workItems } from '@/content/work'
import { MonoLabel } from '@/components/ui/MonoLabel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icons'
import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = workItems.find((w) => w.slug === params.slug)
  if (!item) return {}
  return { title: item.title, description: item.tagline }
}

export default function WorkCaseStudy({ params }: { params: { slug: string } }) {
  const item = workItems.find((w) => w.slug === params.slug)
  if (!item) notFound()

  return (
    <article>
      <section className="field">
        <div className="section-container py-16 md:py-24">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-label uppercase text-chalk/70 transition-colors hover:text-chalk"
          >
            <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
            Work
          </Link>
          <MonoLabel className="mt-8 block text-chalk/70">
            {item.role} · {item.organization} · {item.period}
          </MonoLabel>
          <h1 className="mt-4 font-display text-display text-chalk">{item.title}</h1>
          {item.titleJa && (
            <p className="mt-3 font-display text-h2 font-normal tracking-[0.04em] text-accent">
              {item.titleJa}
            </p>
          )}
          <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-chalk/85">
            {item.tagline}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="section-container mb-14 md:mb-16">
          <IllustrationPlaceholder caption={item.title} />
        </div>
        <div className="section-container grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-h2 leading-snug text-ink">{item.summary}</p>

            <div className="mt-12">
              <MonoLabel className="text-accent">What I do</MonoLabel>
              <ul className="mt-5 space-y-3">
                {item.contributions.map((c) => (
                  <li key={c} className="flex gap-3 leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-lime" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-10">
            <div>
              <MonoLabel className="text-accent">Context</MonoLabel>
              <ul className="mt-5 space-y-3">
                {item.context.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-haze">
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-haze" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <MonoLabel className="text-accent">Stack</MonoLabel>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.stack.map((s) => (
                  <Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>

            {item.links && item.links.length > 0 && (
              <div>
                <MonoLabel className="text-accent">Links</MonoLabel>
                <ul className="mt-5 space-y-2">
                  {item.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-accent hover:text-ink"
                      >
                        <Icon name="external" className="h-3.5 w-3.5" />
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <div className="section-container mt-16 flex flex-wrap gap-3 border-t border-ink/12 pt-10">
          <Button href="/work" variant="secondary" withArrow>
            All work
          </Button>
          <Button href="/#contact" variant="ghost" withArrow>
            Get in touch
          </Button>
        </div>
      </section>
    </article>
  )
}
