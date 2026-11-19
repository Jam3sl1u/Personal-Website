import { ArrowUpRight } from 'lucide-react'
import { ProjectShowcase } from '../components/projects/ProjectShowcase'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { moreProjects, projects } from '../content/projects'
import { site } from '../content/site'

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          index="02"
          label="Featured projects"
          lede="Three projects, from a bot that runs every week to a model I measured until I knew exactly where it breaks."
        >
          Things I built, and what I <em>learned</em> measuring them.
        </SectionHeading>

        <div className="mt-16 space-y-24 md:space-y-32">
          {projects.map((project) => (
            <ProjectShowcase key={project.slug} project={project} />
          ))}
        </div>

        {/* More on GitHub */}
        <Reveal className="mt-24 md:mt-32">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h3 className="text-2xl font-medium tracking-[-0.03em]">More projects</h3>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex min-h-8 items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              All repositories
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <ul>
            {moreProjects.map((p) => {
              const inner = (
                <>
                  <span className={`text-lg font-medium tracking-[-0.02em] ${p.href ? 'transition-colors group-hover:text-accent' : ''}`}>{p.title}</span>
                  <span className="text-[0.95rem] leading-relaxed text-muted">{p.description}</span>
                  <span className="flex items-center gap-4 font-mono text-xs text-faint">
                    {p.stack.join(' · ')}
                    {p.href && (
                      <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                    )}
                  </span>
                </>
              )
              const row = 'grid items-baseline gap-x-8 gap-y-2 py-6 md:grid-cols-[16rem_1fr_auto]'
              return (
                <li key={p.title} className="border-b border-line">
                  {p.href ? (
                    <a href={p.href} target="_blank" rel="noreferrer noopener" className={`group ${row} transition-[padding] duration-500 hover:pl-3`}>
                      {inner}
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <div className={row}>{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
