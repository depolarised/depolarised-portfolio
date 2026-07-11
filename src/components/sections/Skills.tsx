import { skillGroups } from '@/content/skills'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'

export default function Skills({ index = '01' }: { index?: string }) {
  return (
    <section id="toolbox" className="section-y">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Toolbox"
            titleJa="道具"
            description="The languages, frameworks, and systems I reach for."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <Reveal key={group.category} className="bg-chalk p-7">
              <h3 className="font-mono text-label uppercase text-accent">{group.category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Reveal>
          ))}

          {/* Coda — fills the grid so it reads intentional, not a drawn empty box. */}
          <Reveal className="flex flex-col justify-between gap-8 bg-chalk p-7">
            <span aria-hidden className="h-3 w-[3px] rounded-full bg-lime" />
            <p className="font-display text-h2 leading-tight text-ink">
              Always
              <br />
              learning
              <span className="jp-mark text-accent">現在進行形</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
