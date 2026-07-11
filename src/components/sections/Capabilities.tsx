import { capabilities } from '@/content/capabilities'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'

export default function Capabilities({ index = '02' }: { index?: string }) {
  return (
    <section id="approach" className="section-y">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Approach"
            titleJa="手法"
            description="Four threads run through my work, whether the signal comes from a heart or a telescope."
          />
        </Reveal>

        {/* One field, divided by hairlines — not nested boxes. */}
        <div className="mt-12 grid border-t border-ink/12 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <Reveal
              key={cap.index}
              className="border-b border-ink/12 p-7 sm:p-8 sm:odd:border-r"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-label text-haze">{cap.index}</span>
                <h3 className="font-display text-h2 text-ink">
                  {cap.title}
                  <span className="jp-mark text-accent">{cap.titleJa}</span>
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-haze">{cap.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
