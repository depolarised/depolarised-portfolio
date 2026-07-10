import { projects } from '@/content/projects'
import { links } from '@/content/links'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icons'

export default function Projects({ index = '02' }: { index?: string }) {
  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="section-container">
        <Reveal>
          <SectionHeader
            index={index}
            title="Open source"
            titleJa="制作"
            description="Tools and systems work. Research software and the odd creative-tech experiment."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded border border-ink/10 bg-ink/10 md:grid-cols-3">
          {featured.map((p) => (
            <Reveal key={p.title} className="flex h-full flex-col bg-chalk p-7">
              <h3 className="font-display text-h2 text-ink">{p.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-haze">{p.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-label uppercase text-field hover:text-ink"
                >
                  <Icon name="github" className="h-4 w-4" />
                  Code
                </a>
              )}
            </Reveal>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-px grid gap-px overflow-hidden border-x border-b border-ink/10 bg-ink/10 sm:grid-cols-2">
            {others.map((p) => (
              <a
                key={p.title}
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 bg-chalk p-5 transition-colors hover:bg-mist"
              >
                <span className="mt-0.5 text-haze transition-colors group-hover:text-field">
                  <Icon name="github" className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-display text-base font-bold text-ink">
                    {p.title}
                  </span>
                  <span className="mt-1 block text-sm text-haze">{p.description}</span>
                </span>
              </a>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Button href={links.github} variant="secondary" withArrow>
            More on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}
