import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../../content/projects'
import { GithubIcon } from '../ui/icons'
import { Reveal } from '../ui/Reveal'
import { Tag } from '../ui/Tag'
import { ProjectVisualFor } from './visuals'

function Links({ project }: { project: Project }) {
  const { github, demo, caseStudy } = project.links
  const pill =
    'group/link inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors duration-300 hover:border-fg hover:bg-fg/5'
  return (
    <div className="flex flex-wrap gap-2.5">
      {caseStudy && (
        <Link to={caseStudy} className="group/link inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-colors duration-300 hover:bg-accent hover:text-accent-ink">
          Case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
      {demo && (
        <a href={demo} target="_blank" rel="noreferrer noopener" className={pill}>
          Live demo
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" aria-hidden="true" />
          <span className="sr-only">for {project.title} (opens in a new tab)</span>
        </a>
      )}
      {github && (
        <a href={github} target="_blank" rel="noreferrer noopener" className={pill}>
          <GithubIcon className="size-4" />
          GitHub
          <span className="sr-only">repository for {project.title} (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}

function Copy({ project }: { project: Project }) {
  return (
    <>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{project.index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
        <span>{project.period}</span>
      </p>
      <h3 className="mt-5 text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1] tracking-[-0.04em]">{project.title}</h3>
      <p className="serif-accent mt-2 text-2xl text-muted">{project.subtitle}</p>
      <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-muted text-pretty">{project.description}</p>
    </>
  )
}

function Highlights({ project, className = '' }: { project: Project; className?: string }) {
  return (
    <dl className={`grid gap-x-8 gap-y-5 ${className}`}>
      {project.highlights.map((h) => (
        <div key={h.label} className="border-t border-line pt-4">
          <dt className="sr-only">{h.label}</dt>
          <dd>
            <span className="block text-2xl font-medium tracking-[-0.03em]">{h.value}</span>
            <span className="mt-1 block text-sm leading-snug text-muted">{h.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}

function Stack({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {project.stack.map((s) => (
        <li key={s}>
          <Tag>{s}</Tag>
        </li>
      ))}
    </ul>
  )
}

export function ProjectShowcase({ project }: { project: Project }) {
  if (project.layout === 'wide') {
    return (
      <Reveal>
        <article className="group/project">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Copy project={project} />
            </div>
            <div className="flex flex-col justify-end gap-6 lg:col-span-5">
              <Highlights project={project} className="grid-cols-3" />
            </div>
          </div>
          <div className="mt-10">
            <ProjectVisualFor visual={project.visual} />
          </div>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <Stack project={project} />
            <Links project={project} />
          </div>
        </article>
      </Reveal>
    )
  }

  const visualFirst = project.layout === 'visual-left'
  return (
    <Reveal>
      <article className="group/project grid items-center gap-x-14 gap-y-10 lg:grid-cols-12">
        <div className={`lg:col-span-7 ${visualFirst ? '' : 'lg:order-2'}`}>
          <ProjectVisualFor visual={project.visual} />
        </div>
        <div className={`lg:col-span-5 ${visualFirst ? '' : 'lg:order-1'}`}>
          <Copy project={project} />
          <Highlights project={project} className="mt-8 grid-cols-2" />
          <div className="mt-8">
            <Stack project={project} />
          </div>
          <div className="mt-8">
            <Links project={project} />
          </div>
        </div>
      </article>
    </Reveal>
  )
}
