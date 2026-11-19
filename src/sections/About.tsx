import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { about, asset, site } from '../content/site'

/** A real photo when site.portrait is set, otherwise a compact summary card. */
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
  return (
    <dl className="rounded-2xl border border-line bg-elev p-6">
      <p className="eyebrow mb-2 text-accent">At a glance</p>
      {[
        ...about.facts.filter((f) => ['Degree', 'Graduating', 'Currently', 'Based in'].includes(f.label)),
        { label: 'Availability', value: 'Full-time SWE, starting July 2027' },
      ].map((f) => (
        <div key={f.label} className="border-t border-line py-3 first-of-type:mt-3">
          <dt className="eyebrow">{f.label}</dt>
          <dd className="mt-1 text-[0.95rem] leading-snug">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function About() {
  return (
    <section id="about" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading index="03" label="About">
          An engineer who likes the <em>building</em> and the <em>explaining</em>.
        </SectionHeading>

        <div className="mt-12 grid gap-x-12 gap-y-12 lg:grid-cols-12">
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

            <Reveal className="mt-10">
              <figure className="relative border-l-2 border-accent pl-6 md:pl-8">
                <blockquote className="serif-accent text-[clamp(1.4rem,2.5vw,2rem)] leading-[1.2] text-fg text-balance">
                  {about.belief}
                </blockquote>
                <figcaption className="eyebrow mt-4">What I want to build</figcaption>
              </figure>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}
