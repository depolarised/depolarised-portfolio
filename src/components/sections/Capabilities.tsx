import { capabilities } from '@/content/capabilities'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'

export default function Capabilities({ index = '02' }: { index?: string }) {
  return (
    <section id="approach" className="field py-20 md:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Approach"
            titleJa="手法"
            description="Four threads run through everything I build — from a clinical ECG to a survey of the sky, the problem rhymes."
            onField
          />
        </Reveal>

        {/* One field, divided by hairlines — not nested violet boxes. */}
        <div className="mt-12 grid border-t border-chalk/15 sm:grid-cols-2">
          {capabilities.map((cap) => (
            <Reveal
              key={cap.index}
              className="border-b border-chalk/15 p-7 sm:p-8 sm:odd:border-r"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-label text-chalk/50">{cap.index}</span>
                <h3 className="font-display text-h2 text-chalk">
                  {cap.title}
                  <span className="ml-2 align-middle text-base text-chalk/50">
                    {cap.titleJa}
                  </span>
                </h3>
              </div>
              <p className="mt-4 leading-relaxed text-chalk/80">{cap.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {cap.tags.map((tag) => (
                  <Badge key={tag} onField>
                    {tag}
                  </Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
