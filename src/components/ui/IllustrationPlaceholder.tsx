import { cn } from '@/lib/cn'
import { MonoLabel } from './MonoLabel'

/**
 * Hero illustration slot for project/post detail pages. Holds a placeholder
 * until a real drawing is supplied — replace the inner block with an
 * <Image>/<img> or an inline SVG. Theme-aware (mist surface, one lime charge).
 */
export function IllustrationPlaceholder({
  caption = 'Illustration',
  className,
}: {
  caption?: string
  className?: string
}) {
  return (
    <figure
      className={cn(
        'relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-ink/12 bg-mist',
        className,
      )}
      aria-label={`${caption} — drawing to come`}
    >
      {/* Replace this block with the real drawing. */}
      <svg
        viewBox="0 0 48 36"
        className="h-16 w-auto text-ink opacity-20 sm:h-20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="1" y="1" width="46" height="34" rx="3" />
        <circle cx="14" cy="13" r="3.5" />
        <path d="M3 31 L18 17 L27 25 L34 19 L45 30" />
      </svg>

      <span aria-hidden className="absolute right-5 top-5 h-2 w-2 rounded-full bg-lime" />

      <figcaption className="absolute bottom-4 left-5">
        <MonoLabel className="text-haze">{caption} · drawing to come</MonoLabel>
      </figcaption>
    </figure>
  )
}
