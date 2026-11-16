import { ArrowUpRight } from 'lucide-react'
import { ProjectShowcase } from '../components/projects/ProjectShowcase'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { moreProjects, projects } from '../content/projects'
import { site } from '../content/site'

export function Projects() {
  return (
    <section id="projects" className="border-t border-line py-24 md:py-36">
      <div className="container-page">
        <SectionHeading
          index="03"
          label="Featured projects"
          lede="Four projects, from a bot that runs every week to models I measured until I knew where they break."
        >
          Things I built, and what I <em>learned</em> measuring them.
        </SectionHeading>

        <div className="mt-20 space-y-28 md:space-y-40">
          {projects.map((project) => (
            <ProjectShowcase key={project.slug} project={project} />
          ))}
        </div>

        {/* More on GitHub */}
        <Reveal className="mt-28 md:mt-40">
          <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
            <h3 className="text-2xl font-medium tracking-[-0.03em]">More on GitHub</h3>
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
            >
              All repositories
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </div>
          <ul>
            {moreProjects.map((p) => (
              <li key={p.title} className="border-b border-line">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group grid items-baseline gap-x-8 gap-y-2 py-6 transition-[padding] duration-500 hover:pl-3 md:grid-cols-[16rem_1fr_auto]"
                >
                  <span className="text-lg font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">{p.title}</span>
                  <span className="text-[0.95rem] leading-relaxed text-muted">{p.description}</span>
                  <span className="flex items-center gap-4 font-mono text-xs text-faint">
                    {p.stack.join(' · ')}
                    <ArrowUpRight className="size-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
