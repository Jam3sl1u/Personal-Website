import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { leadership } from '../content/site'

export function Leadership() {
  const { campus } = leadership
  return (
    <section id="leadership" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="container-page">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="eyebrow text-accent">06</span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <h2 className="eyebrow">Leadership and values</h2>
          </div>
          <figure className="mt-8">
            <blockquote className="serif-accent max-w-5xl text-[clamp(2rem,5vw,4rem)] leading-[1.06] text-balance">
              <span className="text-accent">&ldquo;</span>
              {leadership.philosophy}
              <span className="text-accent">&rdquo;</span>
            </blockquote>
            <figcaption className="eyebrow mt-6">How I think about leading</figcaption>
          </figure>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.practices.map((p, i) => (
            <RevealItem key={p.title} className="border-t border-line-strong pt-5">
              <p className="font-mono text-[0.7rem] text-accent">0{i + 1}</p>
              <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{p.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{p.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-20">
          <article className="grid overflow-hidden rounded-3xl border border-line bg-elev lg:grid-cols-12">
            <div className="relative flex flex-col justify-between gap-10 border-b border-line p-7 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r">
              <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
              <div className="relative">
                <p className="eyebrow">Campus leadership</p>
                <h3 className="mt-4 text-2xl font-medium leading-tight tracking-[-0.03em]">
                  {campus.role}
                  <span className="block text-muted">{campus.org}</span>
                </h3>
                <p className="mt-3 text-sm text-muted">
                  {campus.location} · {campus.period}
                </p>
              </div>
              <p className="relative">
                <span className="block text-[4.5rem] font-medium leading-none tracking-[-0.05em]">
                  75<span className="text-accent">+</span>
                </span>
                <span className="mt-2 block text-sm text-muted">{campus.stat.label}</span>
              </p>
            </div>
            <div className="p-7 sm:p-10 lg:col-span-8">
              <ul className="space-y-4 text-[1.02rem] leading-relaxed">
                {campus.bullets.map((b) => (
                  <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-8 text-[0.98rem] leading-relaxed text-muted">{campus.story}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
