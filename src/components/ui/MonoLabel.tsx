import { cn } from '@/lib/cn'

/** The system's voice for indices, tags, captions and source lines. */
export function MonoLabel({
  children,
  className,
  as: Tag = 'span',
}: {
  children: React.ReactNode
  className?: string
  as?: 'span' | 'div' | 'p'
}) {
  return <Tag className={cn('mono-label', className)}>{children}</Tag>
}
