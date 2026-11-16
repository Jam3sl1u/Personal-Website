import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education } from '../content/site'

export function Education() {
  return (
    <section id="education" className="border-t border-line py-24 md:py-36">
      <div className="container-page">
        <SectionHeading index="05" label="Education">
          {education.school}
        </SectionHeading>

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{education.college}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {[education.degree, education.minor, education.specialization].map((line, i) => (
                <li key={line} className="flex items-baseline gap-5 py-5">
                  <span className="font-mono text-[0.7rem] text-faint">0{i + 1}</span>
                  <span className={i === 0 ? 'text-2xl font-medium tracking-[-0.025em]' : 'text-xl text-muted tracking-[-0.02em]'}>{line}</span>
                </li>
              ))}
            </ul>

            {/* Timeline */}
            <div className="mt-10" aria-label={education.period} role="img">
              <div className="flex items-center gap-4 font-mono text-xs text-faint">
                <span className="text-fg">{education.start}</span>
                <span className="relative h-px flex-1 bg-line-strong">
                  <span className="absolute inset-y-0 left-0 w-[80%] bg-accent" />
                  <span className="absolute left-[80%] top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
                </span>
                <span className="text-fg">{education.end}</span>
              </div>
              <p className="mt-3 text-sm text-muted">Expected graduation: June 2027</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="rounded-3xl border border-line bg-elev p-7 sm:p-9">
              <p className="eyebrow">Honors</p>
              <p className="mt-5 flex items-end gap-4">
                <span className="text-[5.5rem] font-medium leading-[0.8] tracking-[-0.06em]">{education.honors.count}</span>
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

              <p className="eyebrow mt-10">Relevant coursework</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {education.coursework.map((c) => (
                  <li key={c} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-fg/90">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
