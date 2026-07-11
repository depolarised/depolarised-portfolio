import { cn } from '@/lib/cn'
import { MonoLabel } from './MonoLabel'

/**
 * Numbered section heading — a lime index tick, mono index, EN·JP title, and a
 * low-contrast ghost numeral counterweighting the empty right half on desktop.
 * Always on paper; the accent reads navy via `.text-accent`.
 */
export function SectionHeader({
  index,
  title,
  titleJa,
  description,
  className,
}: {
  index: string
  title: string
  titleJa?: string
  description?: string
  className?: string
}) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start', className)}>
      <div className="max-w-2xl">
        <div className="flex items-center gap-2.5">
          {/* The one lime shape in the header — a charge tick on paper. */}
          <span aria-hidden className="h-3 w-[3px] flex-shrink-0 rounded-full bg-lime" />
          <MonoLabel className="text-accent">
            {index} — {title}
          </MonoLabel>
        </div>
        <h2 className="mt-4 font-display text-h1 text-ink">
          {title}
          {titleJa && <span className="jp-mark text-accent">{titleJa}</span>}
        </h2>
        {description && (
          <p className="mt-4 text-body-lg leading-relaxed text-haze">{description}</p>
        )}
      </div>
      <span
        aria-hidden
        className="ghost-numeral hidden select-none self-start font-display text-[6.5rem] font-black leading-none lg:block"
      >
        {index}
      </span>
    </div>
  )
}
