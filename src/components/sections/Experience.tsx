'use client'

import { useState } from 'react'
import { experiences } from '@/content/experience'
import type { ExperienceType } from '@/content/types'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icons'
import { cn } from '@/lib/cn'

type Filter = ExperienceType | 'all'

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Academic', value: 'academic' },
  { label: 'Industry', value: 'industry' },
  { label: 'Teaching', value: 'teaching' },
]

export default function Experience({ index = '02' }: { index?: string }) {
  const [filter, setFilter] = useState<Filter>('all')
  const list = experiences.filter((e) => filter === 'all' || e.type === filter)

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Experience"
            titleJa="経歴"
            description="Sixteen years across academia and industry, in research, engineering, and shipping."
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
          {list.map((exp) => (
            <Reveal
              key={`${exp.title}-${exp.organization}`}
              className="grid gap-4 border-b border-ink/12 py-8 sm:grid-cols-[180px_1fr]"
            >
              <div>
                <div className="font-mono text-label uppercase text-haze">{exp.period}</div>
                <div className="mt-3">
                  <Badge>{exp.type}</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-display text-h2 text-ink">{exp.title}</h3>
                <p className="mt-1 font-medium text-field">
                  {exp.organization}
                  <span className="text-haze"> · {exp.location}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {exp.description.map((d, i) => (
                    <li key={i} className="flex gap-3 leading-relaxed text-haze">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-field" />
                      {d}
                    </li>
                  ))}
                </ul>
                {exp.skills && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.skills.map((s) => (
                      <Badge key={s}>{s}</Badge>
                    ))}
                  </div>
                )}
                {exp.links && (
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {exp.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 font-mono text-label uppercase text-haze transition-colors hover:text-field"
                      >
                        {l.label}
                        <Icon name="external" className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
