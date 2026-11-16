import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = {
  index: string
  label: string
  /** Heading content. Wrap words in <em> for the serif accent. */
  children: ReactNode
  lede?: ReactNode
  className?: string
}

export function SectionHeading({ index, label, children, lede, className = '' }: Props) {
  return (
    <Reveal className={className}>
      <div className="flex items-center gap-4">
        <span className="eyebrow text-accent">{index}</span>
        <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        <span className="eyebrow">{label}</span>
      </div>
      <h2 className="mt-6 max-w-4xl text-[clamp(2.1rem,5.2vw,4.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-balance [&_em]:serif-accent [&_em]:text-accent">
        {children}
      </h2>
      {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{lede}</p>}
    </Reveal>
  )
}
