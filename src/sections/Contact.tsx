import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { CopyEmail } from '../components/ui/CopyEmail'
import { GithubIcon, LinkedinIcon } from '../components/ui/icons'
import { Reveal } from '../components/ui/Reveal'
import { contact, lookingFor, resumeLink, site } from '../content/site'

export function Contact() {
  const resume = resumeLink()
  const rowCls =
    'group flex items-center justify-between gap-6 border-b border-line py-5 text-lg transition-[padding,color] duration-500 hover:pl-3 hover:text-accent'
  return (
    <section id="contact" className="relative isolate overflow-hidden border-t border-line py-20 md:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_80%_at_50%_100%,black,transparent)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-64 left-1/2 -z-10 size-[46rem] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container-page">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="eyebrow text-accent">06</span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="mt-8 text-[clamp(2.6rem,8vw,7.25rem)] font-medium leading-[0.95] tracking-[-0.05em] text-balance">
            {contact.headline.plain} <span className="serif-accent text-accent">{contact.headline.accent}</span>
          </h2>
        </Reveal>

        <Reveal className="mt-14">
          <p className="max-w-3xl text-[clamp(1.15rem,2vw,1.45rem)] font-medium leading-snug tracking-[-0.015em] text-pretty">{lookingFor.statement}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Role interests">
            {lookingFor.interests.map((item) => (
              <li key={item.title} className="rounded-full border border-line-strong px-4 py-2 text-sm">
                {item.title}
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{lookingFor.alsoOpen}</p>
          <dl className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {lookingFor.logistics.map((l) => (
              <div key={l.label} className="border-t border-line py-4">
                <dt className="eyebrow">{l.label}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed">{l.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-lg text-lg leading-relaxed text-muted text-pretty">{contact.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`mailto:${site.email}`}>
                <Mail className="size-4" aria-hidden="true" />
                Email me
              </Button>
              <CopyEmail />
            </div>
            <p className="mt-5 font-mono text-sm text-faint">{site.email}</p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <ul className="border-t border-line">
              <li>
                <a href={site.links.github} target="_blank" rel="noreferrer noopener" className={rowCls}>
                  <span className="flex items-center gap-4">
                    <GithubIcon className="size-5" />
                    GitHub
                  </span>
                  <span className="flex items-center gap-3 font-mono text-sm text-faint">
                    Jam3sl1u
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" className={rowCls}>
                  <span className="flex items-center gap-4">
                    <LinkedinIcon className="size-5" />
                    LinkedIn
                  </span>
                  <span className="flex items-center gap-3 font-mono text-sm text-faint">
                    james-liu
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                {resume.kind === 'pdf' ? (
                  <a href={resume.href} download={resume.download} target="_blank" rel="noreferrer noopener" className={rowCls}>
                    <span className="flex items-center gap-4">
                      <Download className="size-5" aria-hidden="true" />
                      Download Resume
                    </span>
                    <span className="font-mono text-sm text-faint">PDF</span>
                  </a>
                ) : (
                  <Link to={resume.to} className={rowCls}>
                    <span className="flex items-center gap-4">
                      <Download className="size-5" aria-hidden="true" />
                      Resume
                    </span>
                    <span className="font-mono text-sm text-faint">View online</span>
                  </Link>
                )}
              </li>
            </ul>
            <p className="eyebrow mt-6">{site.location}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
