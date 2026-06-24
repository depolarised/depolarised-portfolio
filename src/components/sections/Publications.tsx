'use client'

import { useState } from 'react'
import { publications } from '@/content/publications'
import { links } from '@/content/links'
import type { PublicationType } from '@/content/types'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'

type Filter = PublicationType | 'all'

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Journal', value: 'journal' },
  { label: 'Conference', value: 'conference' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Thesis', value: 'thesis' },
]

export default function Publications({ index = '03' }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>('all')
  const list = publications.filter((p) => filter === 'all' || p.type === filter)

  return (
    <section id="publications" className="py-20 md:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Publications"
            titleJa="論文"
            description="Peer-reviewed papers, conference work, and abstracts."
          />
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full px-4 py-2 font-mono text-label uppercase transition-colors',
                filter === f.value
                  ? 'bg-field text-chalk'
                  : 'border border-ink/20 text-haze hover:border-ink/40 hover:text-ink',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 border-t border-ink/12">
          {list.map((pub) => (
            <Reveal
              key={pub.title}
              className="grid gap-4 border-b border-ink/12 py-8 sm:grid-cols-[90px_1fr]"
            >
              <div className="font-mono text-label uppercase text-haze">{pub.year}</div>
              <div>
                <h3 className="font-display text-lg font-bold leading-snug text-ink">
                  {pub.title}
                </h3>
                <p className="mt-2 text-sm text-haze">{pub.authors}</p>
                <p className="mt-1 text-sm italic text-haze">{pub.venue}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge>{pub.type}</Badge>
                  {pub.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {pub.doi && (
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-mono text-label uppercase text-field hover:text-ink"
                  >
                    <Icon name="external" className="h-3.5 w-3.5" />
                    doi: {pub.doi}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={links.orcid} variant="secondary" withArrow>
            ORCID record
          </Button>
          <Button href={links.researchgate} variant="ghost" withArrow>
            ResearchGate
          </Button>
        </div>
      </div>
    </section>
  )
}
