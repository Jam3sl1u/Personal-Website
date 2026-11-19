import { Download, FileText } from 'lucide-react'
import { resumeLink } from '../../content/site'
import { Button } from './Button'

/**
 * One place that decides what a "Resume" button does: download the PDF when one
 * is configured in site.ts, otherwise open the online resume at /resume.
 */
export function ResumeButton({ variant = 'outline', className = '' }: { variant?: 'primary' | 'outline' | 'ghost'; className?: string }) {
  const r = resumeLink()
  if (r.kind === 'pdf') {
    return (
      <Button href={r.href} download={r.download} external variant={variant} className={className}>
        <Download className="size-4" aria-hidden="true" />
        {r.label}
      </Button>
    )
  }
  return (
    <Button to={r.to} variant={variant} className={className}>
      <FileText className="size-4" aria-hidden="true" />
      {r.label}
    </Button>
  )
}
