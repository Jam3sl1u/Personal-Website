import { ArrowLeft, Download, Printer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { beall, earlierWork, roles } from '../content/experience'
import { projects } from '../content/projects'
import { asset, education, leadership, site } from '../content/site'
import { skillGroups } from '../content/skills'
import { useDocumentTitle } from '../lib/useDocumentTitle'

/**
 * An online resume generated from the same content as the rest of the site.
 * It never includes a phone number or street address, and it prints cleanly
 * (Print button, then "Save as PDF").
 */

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="eyebrow mb-5 border-b border-line-strong pb-2 !text-fg">{children}</h2>
}

function Entry({ title, org, period, children }: { title: string; org: string; period: string; children?: React.ReactNode }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5">
        <h3 className="font-medium tracking-[-0.01em]">
          {title} <span className="font-normal text-muted">· {org}</span>
        </h3>
        <span className="font-mono text-xs text-faint">{period}</span>
      </div>
      {children}
    </div>
  )
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.92rem] leading-relaxed text-muted marker:text-faint">
      {items.map((b) => (
        <li key={b}>{b}</li>
      ))}
    </ul>
  )
}

export function ResumePage() {
  useDocumentTitle('Resume')
  return (
    <div className="container-page pb-20 pt-28 print:pt-0">
      <div className="no-print mx-auto mb-8 flex max-w-4xl flex-wrap items-center justify-between gap-4">
        <Link to="/" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          Back home
        </Link>
        <div className="flex flex-wrap gap-2.5">
          {site.resumePdf && (
            <Button href={asset(site.resumePdf)} download>
              <Download className="size-4" aria-hidden="true" />
              Download PDF
            </Button>
          )}
          <Button variant={site.resumePdf ? 'outline' : 'primary'} onClick={() => window.print()}>
            <Printer className="size-4" aria-hidden="true" />
            Print or save as PDF
          </Button>
        </div>
      </div>

      <article className="mx-auto max-w-4xl rounded-3xl border border-line bg-elev p-7 sm:p-12 print:rounded-none print:border-0 print:p-0">
        <header className="border-b border-line pb-8">
          <h1 className="text-[clamp(2.4rem,6vw,3.75rem)] font-medium leading-none tracking-[-0.045em]">{site.name}</h1>
          <p className="mt-3 text-lg text-muted">{site.roleLine}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-xs text-muted">
            <li>{site.location}</li>
            <li>
              <a className="underline decoration-line-strong underline-offset-4 hover:text-fg" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="underline decoration-line-strong underline-offset-4 hover:text-fg" href={site.links.github}>
                github.com/Jam3sl1u
              </a>
            </li>
            <li>
              <a className="underline decoration-line-strong underline-offset-4 hover:text-fg" href={site.links.linkedin}>
                linkedin.com/in/james-liu-426a50281
              </a>
            </li>
          </ul>
        </header>

        <div className="mt-10 space-y-11">
          <section>
            <Heading>Education</Heading>
            <Entry title={education.school} org={education.college} period={education.period}>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                {education.degree}. {education.minor}. {education.specialization}.
              </p>
              <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">
                {education.honors.title}, {education.honors.count} {education.honors.unit}. Coursework: {education.coursework.join(', ')}.
              </p>
            </Entry>
          </section>

          <section>
            <Heading>Experience</Heading>
            <div className="space-y-7">
              <Entry title={beall.role} org={beall.company} period={beall.periodLong}>
                <Bullets items={beall.bullets} />
              </Entry>
              {roles.map((r) => (
                <Entry key={r.id} title={r.role} org={r.company} period={r.period}>
                  <Bullets items={r.bullets} />
                </Entry>
              ))}
            </div>
          </section>

          <section>
            <Heading>Projects</Heading>
            <div className="space-y-6">
              {projects.map((p) => (
                <Entry key={p.slug} title={p.title} org={p.stack.join(', ')} period={p.period}>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                    {p.description} {p.highlights.map((h) => `${h.value} ${h.label}`).join('; ')}.
                  </p>
                </Entry>
              ))}
            </div>
          </section>

          <section>
            <Heading>Skills</Heading>
            <dl className="space-y-2.5 text-[0.92rem] leading-relaxed">
              {skillGroups.map((g) => (
                <div key={g.id} className="grid gap-x-6 sm:grid-cols-[13rem_1fr]">
                  <dt className="font-medium">{g.label}</dt>
                  <dd className="text-muted">{g.skills.map((s) => s.name).join(', ')}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <Heading>Leadership</Heading>
            <Entry title={leadership.campus.role} org={leadership.campus.org} period={leadership.campus.period}>
              <Bullets items={leadership.campus.bullets} />
            </Entry>
          </section>

          <section>
            <Heading>Earlier work</Heading>
            <div className="space-y-4">
              {earlierWork.map((w) => (
                <Entry key={w.role} title={w.role} org={w.company} period={w.period}>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{w.note}</p>
                </Entry>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
