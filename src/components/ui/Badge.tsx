import { cn } from '@/lib/cn'

/** A quiet tag pill — mono, tracked, hairline outline. */
export function Badge({
  children,
  className,
  onField = false,
}: {
  children: React.ReactNode
  className?: string
  onField?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-label uppercase',
        onField ? 'border-chalk/40 text-chalk/90' : 'border-ink/15 text-haze',
        className,
      )}
    >
      {children}
    </span>
  )
}
