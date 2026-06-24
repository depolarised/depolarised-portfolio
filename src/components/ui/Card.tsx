import { cn } from '@/lib/cn'

/** A flat surface — mist fill, hairline outline, no decorative shadow. */
export function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded border border-ink/10 bg-mist p-6 sm:p-8', className)}>
      {children}
    </div>
  )
}
