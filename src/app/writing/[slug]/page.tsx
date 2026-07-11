import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { notes } from '@/content/writing'
import { MonoLabel } from '@/components/ui/MonoLabel'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icons'
import { IllustrationPlaceholder } from '@/components/ui/IllustrationPlaceholder'

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const note = notes.find((n) => n.slug === params.slug)
  if (!note) return {}
  return { title: note.title, description: note.summary }
}

export default function WritingNote({ params }: { params: { slug: string } }) {
  const note = notes.find((n) => n.slug === params.slug)
  if (!note) notFound()

  return (
    <article>
      <section className="field">
        <div className="section-container py-16 md:py-24">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-label uppercase text-chalk/70 transition-colors hover:text-chalk"
          >
            <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" />
            Writing
          </Link>
          <MonoLabel className="mt-8 block text-chalk/70">
            {note.date}
            {note.draft && <span className="text-lime"> · draft</span>}
          </MonoLabel>
          <h1 className="mt-4 max-w-3xl font-display text-display text-chalk">
            {note.title}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="section-container mb-12 max-w-2xl">
          <IllustrationPlaceholder caption={note.title} />
        </div>
        <div className="section-container max-w-2xl">
          {note.body.map((para, i) => (
            <p key={i} className="mt-6 text-body-lg leading-relaxed text-ink first:mt-0">
              {para}
            </p>
          ))}
          <div className="mt-12 border-t border-ink/12 pt-8">
            <Button href="/writing" variant="secondary" withArrow>
              All writing
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
