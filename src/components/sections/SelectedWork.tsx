import { workItems } from '@/content/work'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { IndexRow } from '@/components/ui/IndexRow'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import type { WorkItem } from '@/content/types'

export default function SelectedWork({
  index = '01',
  items,
  withViewAll = false,
  withHeader = true,
  description = 'Selected work in signal processing, deep learning, and large-scale systems.',
}: {
  index?: string
  items?: WorkItem[]
  withViewAll?: boolean
  withHeader?: boolean
  description?: string
}) {
  const list = items ?? workItems

  return (
    <section id="work" className="section-y">
      <div className="section-container">
        {withHeader && (
          <Reveal>
            <SectionHeader
              index={index}
              title="Selected work"
              titleJa="仕事"
              description={description}
            />
          </Reveal>
        )}

        <div className={withHeader ? 'mt-12 border-b border-ink/12' : 'border-b border-ink/12'}>
          {list.map((item, i) => (
            <IndexRow
              key={item.slug}
              index={String(i + 1).padStart(2, '0')}
              href={`/work/${item.slug}`}
              title={item.title}
              meta={item.period}
              tagline={item.tagline}
            />
          ))}
        </div>

        {withViewAll && (
          <div className="mt-10">
            <Button href="/work" variant="secondary" withArrow>
              All work
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
