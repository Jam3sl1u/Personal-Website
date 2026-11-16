import { ImagePlus } from 'lucide-react'

/**
 * A clearly labeled slot for media that has not been supplied yet.
 * Replace with an <img loading="lazy" alt="..."> or <video> when the asset exists.
 */
export function Placeholder({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={`dot-grid relative flex aspect-video flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-strong bg-elev p-6 text-center ${className}`}
    >
      <ImagePlus className="size-5 text-faint" aria-hidden="true" />
      <p className="max-w-[26ch] text-sm text-muted">{label}</p>
      <p className="eyebrow">Coming soon</p>
    </div>
  )
}
