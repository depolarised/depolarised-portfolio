import { cn } from '@/lib/cn'
import { MonoLabel } from './MonoLabel'

/** Numbered section heading — mono index + EN·JP title. */
export function SectionHeader({
  index,
  title,
  titleJa,
  description,
  className,
  onField = false,
}: {
  index: string
  title: string
  titleJa?: string
  description?: string
  className?: string
  onField?: boolean
}) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <MonoLabel className={onField ? 'text-chalk/70' : 'text-field'}>
        {index} — {title}
      </MonoLabel>
      <h2
        className={cn(
          'mt-4 font-display text-h1',
          onField ? 'text-chalk' : 'text-ink',
        )}
      >
        {title}
        {titleJa && (
          <span className={cn('ml-3 align-middle', onField ? 'text-lime' : 'text-field')}>
            {titleJa}
          </span>
        )}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-body-lg leading-relaxed',
            onField ? 'text-chalk/80' : 'text-haze',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
