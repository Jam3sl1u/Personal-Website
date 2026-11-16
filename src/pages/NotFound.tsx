import { ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useDocumentTitle } from '../lib/useDocumentTitle'

export function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="eyebrow text-accent">404</p>
      <h1 className="mt-5 text-[clamp(2.5rem,7vw,5rem)] font-medium leading-none tracking-[-0.045em]">
        That page <span className="serif-accent text-accent">isn&rsquo;t here.</span>
      </h1>
      <p className="mt-5 max-w-md text-lg text-muted">The link may be old, or the page may have moved.</p>
      <Button to="/" className="mt-9">
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
        Back home
      </Button>
    </section>
  )
}
