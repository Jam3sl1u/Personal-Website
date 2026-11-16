import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { lookingFor } from '../content/site'

export function LookingFor() {
  return (
    <section id="looking" className="border-t border-line py-24 md:py-36">
      <div className="container-page">
        <SectionHeading index="07" label="What I'm looking for" lede={lookingFor.detail}>
          A new-grad software engineering role, starting <em>July 2027</em>.
        </SectionHeading>

        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {lookingFor.interests.map((item, i) => (
            <RevealItem key={item.title} className="group flex min-h-48 flex-col justify-between bg-bg p-7 transition-colors duration-500 hover:bg-elev">
              <span className="font-mono text-[0.7rem] text-faint transition-colors duration-500 group-hover:text-accent">0{i + 1}</span>
              <div>
                <h3 className="text-xl font-medium leading-tight tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-12">
          <dl className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {lookingFor.logistics.map((l) => (
              <div key={l.label} className="border-t border-line py-5">
                <dt className="eyebrow">{l.label}</dt>
                <dd className="mt-2 text-[0.95rem] leading-relaxed">{l.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
