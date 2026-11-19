import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'outline' | 'ghost'

type Props = {
  children: ReactNode
  variant?: Variant
  /** Internal route (react-router). */
  to?: string
  /** External URL or mailto. */
  href?: string
  external?: boolean
  /** true, or the file name the browser should save the download as. */
  download?: boolean | string
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  'aria-label'?: string
}

const base =
  'group inline-flex h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-accent hover:text-accent-ink',
  outline: 'border border-line-strong text-fg hover:border-fg hover:bg-fg/5',
  ghost: 'text-muted hover:text-fg',
}

export function Button({ children, variant = 'primary', to, href, external, download, onClick, className = '', ...rest }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} onClick={onClick} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={cls}
        download={download}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  )
}
