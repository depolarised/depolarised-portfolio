import Link from 'next/link'
import { cn } from '@/lib/cn'
import { Icon } from './Icons'

type Variant = 'primary' | 'secondary' | 'onField' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  onField: 'btn-on-field',
  ghost: 'inline-flex items-center gap-2 font-sans font-bold text-ink hover:text-field',
}

export function Button({
  href,
  children,
  variant = 'primary',
  className,
  withArrow = false,
}: {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  withArrow?: boolean
}) {
  const isHttp = /^https?:\/\//.test(href)
  const isProtocol = /^(mailto:|tel:)/.test(href)
  const classes = cn(variants[variant], className)
  const content = (
    <>
      {children}
      {withArrow && <Icon name="arrow" className="h-4 w-4" />}
    </>
  )

  if (isHttp || isProtocol) {
    return (
      <a
        href={href}
        target={isHttp ? '_blank' : undefined}
        rel={isHttp ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {content}
      </a>
    )
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}
