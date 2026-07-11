import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Icon } from './Icons'

/** A numbered index row — the Electric Field list pattern. */
export function IndexRow({
  index,
  href,
  title,
  meta,
  tagline,
}: {
  index: string
  href: string
  title: string
  meta: string
  tagline?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group flex flex-col gap-2 border-t border-ink/12 py-6 transition-colors',
        'hover:bg-mist sm:flex-row sm:items-baseline sm:justify-between sm:gap-8',
      )}
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-label text-haze">{index}</span>
        <span
          className={cn(
            'font-display text-h2 text-ink transition-[background-size] duration-300',
            // A lime rule sweeps left→right under the title on hover — the lime "live" cue on paper.
            'bg-[linear-gradient(var(--lime),var(--lime))] bg-[length:0px_3px] bg-left-bottom bg-no-repeat',
            'group-hover:bg-[length:100%_3px]',
          )}
        >
          {title}
        </span>
      </div>
      <div className="flex items-baseline gap-4 pl-8 sm:pl-0">
        {tagline && (
          <span className="hidden max-w-sm text-right text-sm text-haze lg:block">
            {tagline}
          </span>
        )}
        <span className="font-mono text-label text-haze">{meta}</span>
        <Icon
          name="arrow"
          className="h-4 w-4 -translate-x-1 text-haze opacity-0 transition-all group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
        />
      </div>
    </Link>
  )
}
