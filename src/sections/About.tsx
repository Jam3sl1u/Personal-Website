import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { about, asset, site } from '../content/site'

function Portrait() {
  if (site.portrait) {
    return (
      <img
        src={asset(site.portrait)}
        alt={`Portrait of ${site.name}`}
        loading="lazy"
        className="aspect-[4/5] w-full rounded-2xl border border-line object-cover"
      />
    )
  }
  // Placeholder until a real portrait is supplied (set site.portrait in src/content/site.ts).
  return (
    <div
      role="img"
      aria-label="Portrait placeholder. A photo will be added here."
      className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-elev"
    >
      <div className="grid-lines absolute inset-0" aria-hidden="true" />
      <svg viewBox="0 0 200 250" className="absolute inset-0 size-full" aria-hidden="true">
        <circle cx="100" cy="125" r="62" fill="none" stroke="var(--line-strong)" />
        <circle cx="100" cy="125" r="92" fill="none" stroke="var(--line)" strokeDasharray="2 6" />
        <path d="M0 125H200M100 0V250" stroke="var(--line)" />
        <circle cx="162" cy="125" r="3" fill="var(--accent)" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="serif-accent text-7xl text-fg/90">{site.initials}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line bg-bg/60 px-4 py-3 backdrop-blur">
        <span className="eyebrow">Portrait</span>
        <span className="eyebrow">Coming soon</span>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-36">
      <div className="container-page">
        <SectionHeading index="01" label="About">
          An engineer who likes the <em>building</em> and the <em>explaining</em>.
        </SectionHeading>

        <div className="mt-16 grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="mx-auto max-w-xs lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
              <Portrait />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[clamp(1.4rem,2.5vw,2.05rem)] font-medium leading-[1.25] tracking-[-0.02em] text-pretty">
                {about.lead[0]} <span className="text-muted">{about.lead[1]}</span>
              </p>
            </Reveal>

            <RevealGroup className="mt-10 grid gap-x-10 gap-y-6 text-[1.02rem] leading-relaxed text-muted md:grid-cols-2">
              <RevealItem className="space-y-6">
                <p>{about.paragraphs[0]}</p>
              </RevealItem>
              <RevealItem className="space-y-6">
                <p>{about.paragraphs[1]}</p>
                <p>{about.paragraphs[2]}</p>
              </RevealItem>
            </RevealGroup>

            <Reveal className="mt-14">
              <figure className="relative border-l-2 border-accent pl-6 md:pl-8">
                <blockquote className="serif-accent text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.18] text-fg text-balance">
                  {about.belief}
                </blockquote>
                <figcaption className="eyebrow mt-4">What I want to build</figcaption>
              </figure>
            </Reveal>

            <RevealGroup className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2" step={0.05}>
              {about.facts.map((fact) => (
                <RevealItem key={fact.label} className="border-b border-line py-4 sm:odd:pr-8">
                  <dl>
                    <dt className="eyebrow">{fact.label}</dt>
                    <dd className="mt-1.5 text-[0.98rem]">{fact.value}</dd>
                  </dl>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  )
}
