import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { resumeLink, site } from '../../content/site'
import { scrollToTop } from '../../lib/scroll'

export function Footer() {
  const year = new Date().getFullYear()
  const resume = resumeLink()
  const linkCls = 'inline-flex min-h-8 items-center text-muted underline-offset-4 transition-colors hover:text-fg hover:underline'
  return (
    <footer className="no-print border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-medium">{site.footerLine}</p>
          <p className="mt-1 text-sm text-faint">
            © {year} {site.name}. {site.location}.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <a href={`mailto:${site.email}`} className={linkCls}>
            Email
          </a>
          <a href={site.links.github} target="_blank" rel="noreferrer noopener" className={linkCls}>
            GitHub
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" className={linkCls}>
            LinkedIn
          </a>
          {resume.kind === 'pdf' ? (
            <a href={resume.href} download={resume.download} target="_blank" rel="noreferrer noopener" className={linkCls}>
              Resume
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>
          ) : (
            <Link to={resume.to} className={linkCls}>
              Resume
            </Link>
          )}
        </nav>
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-3 self-start text-sm text-muted transition-colors hover:text-fg md:self-auto"
        >
          Back to top
          <span className="flex size-10 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </footer>
  )
}
