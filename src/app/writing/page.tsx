import type { Metadata } from 'next'
import Link from 'next/link'
import { notes } from '@/content/writing'
import { PageHeader } from '@/components/ui/PageHeader'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Occasional notes on signal, detection, and learning at scale.',
}

export default function WritingPage() {
  return (
    <>
      <PageHeader
        label="Writing"
        title="Writing"
        titleJa="記録"
        description="Occasional notes on detection, signals, and machine learning."
      />
      <section className="py-20 md:py-28">
        <div className="section-container">
          <div className="border-t border-ink/12">
            {notes.map((note, i) => (
              <Link
                key={note.slug}
                href={`/writing/${note.slug}`}
                className="group block border-b border-ink/12 py-8 transition-colors hover:bg-mist"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-label text-haze">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-h2 text-ink transition-colors group-hover:text-field">
                    {note.title}
                  </h2>
                </div>
                <div className="mt-2 pl-8 font-mono text-label uppercase text-haze">
                  {note.date}
                  {note.draft && <span className="text-field"> · draft</span>}
                </div>
                <p className="mt-3 max-w-2xl pl-8 leading-relaxed text-haze">
                  {note.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
