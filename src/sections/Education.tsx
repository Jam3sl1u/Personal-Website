import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education, leadership } from '../content/site'

/** Education and leadership share one section so secondary material takes less scrolling. */
export function Education() {
  const { campus } = leadership
  return (
    <section id="education" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="05" label="Education and leadership">
          {education.school}
        </SectionHeading>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Education */}
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{education.college}</p>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {[education.degree, education.minor, education.specialization].map((line, i) => (
                <li key={line} className="flex items-baseline gap-5 py-4">
                  <span className="font-mono text-[0.7rem] text-faint">0{i + 1}</span>
                  <span className={i === 0 ? 'text-2xl font-medium tracking-[-0.025em]' : 'text-lg text-muted tracking-[-0.02em]'}>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">{education.period}</p>
            <p className="eyebrow mt-8">Relevant coursework</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/90">
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Honors */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-3xl border border-line bg-elev p-7 sm:p-9">
              <p className="eyebrow">Honors</p>
              <p className="mt-5 flex items-end gap-4">
                <span className="text-[4.5rem] font-medium leading-[0.8] tracking-[-0.06em]">{education.honors.count}</span>
                <span className="pb-1 text-lg leading-tight">
                  <span className="block font-medium">{education.honors.title}</span>
                  <span className="text-muted">{education.honors.unit}</span>
                </span>
              </p>
              <div className="mt-6 flex gap-1.5" aria-hidden="true">
                {Array.from({ length: education.honors.count }, (_, i) => (
                  <span key={i} className="h-1.5 flex-1 rounded-full bg-accent" style={{ opacity: 0.4 + (i / education.honors.count) * 0.6 }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Leadership */}
        <Reveal className="mt-16">
          <figure className="border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="serif-accent max-w-4xl text-[clamp(1.4rem,2.6vw,2.1rem)] leading-[1.18] text-fg text-balance">
              {leadership.philosophy}
            </blockquote>
            <figcaption className="eyebrow mt-4">How I think about leading</figcaption>
          </figure>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.practices.map((p, i) => (
            <RevealItem key={p.title} className="border-t border-line-strong pt-4">
              <p className="font-mono text-[0.7rem] text-accent">0{i + 1}</p>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">{p.short}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <article className="grid gap-6 rounded-3xl border border-line bg-elev p-7 sm:p-9 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">Campus leadership</p>
              <h3 className="mt-3 text-xl font-medium leading-tight tracking-[-0.03em]">
                {campus.role}
                <span className="block text-muted">{campus.org}</span>
              </h3>
              <p className="mt-2 text-sm text-muted">
                {campus.location} · {campus.period}
              </p>
              <p className="mt-5 text-[3.25rem] font-medium leading-none tracking-[-0.05em]">
                75<span className="text-accent">+</span>
                <span className="ml-3 text-sm font-normal tracking-normal text-muted">{campus.stat.label}</span>
              </p>
            </div>
            <ul className="space-y-3 text-[0.98rem] leading-relaxed lg:col-span-8">
              {campus.bullets.map((b) => (
                <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                  {b}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
