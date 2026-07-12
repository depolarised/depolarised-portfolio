import { recognition } from '@/content/recognition'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Recognition strip — a dense year·title·detail record in the reference's
 * two-line rhythm. Paper idioms (text-ink / text-haze / border-ink) flip to the
 * field via the theme map, so the year reads muted, the title chalk, the detail
 * quiet; the lone lime charge stays in the section-header tick.
 */
export default function Recognition({ index = '03' }: { index?: string }) {
  return (
    <section id="recognition" className="section-y">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Recognition"
            titleJa="評価"
            description="Peer-reviewed publications, competitive funding, and selective research programmes."
          />
        </Reveal>

        <div className="mt-12 border-t border-ink/12">
          {recognition.map((item, i) => (
            <Reveal
              key={`${item.year}-${i}`}
              delay={i * 0.04}
              className="grid grid-cols-[3.5rem_1fr] gap-5 border-b border-ink/12 py-5 sm:grid-cols-[7rem_1fr] sm:gap-10"
            >
              <span className="font-mono text-label text-haze sm:pt-1">{item.year}</span>
              <div>
                <p className="font-display text-lg leading-snug text-ink sm:text-xl">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-haze">{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
