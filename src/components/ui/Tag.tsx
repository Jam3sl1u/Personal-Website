import type { ReactNode } from 'react'

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted">
      {children}
    </span>
  )
}
