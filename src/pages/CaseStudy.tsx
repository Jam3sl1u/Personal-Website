import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { CaseFigure } from '../components/caseStudies/figures'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { caseStudies, getCaseStudy } from '../content/caseStudies'
import { asset } from '../content/site'
import { fadeUp, stagger } from '../lib/motion'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { NotFound } from './NotFound'

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-x-12 gap-y-5 border-t border-line py-12 md:py-16 lg:grid-cols-12">
        <h2 className="eyebrow lg:col-span-3 lg:pt-1.5">{label}</h2>
        <div className="lg:col-span-9">{children}</div>
      </section>
    </Reveal>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)
  useDocumentTitle(study?.title, study?.summary)
  if (!study) return <NotFound />

  const headline = study.results.filter((r) => r.headline)
  const rest = study.results.filter((r) => !r.headline)
  const i = caseStudies.findIndex((c) => c.slug === study.slug)
  const next = caseStudies[(i + 1) % caseStudies.length]

  return (
    <article className="relative isolate pb-12 pt-28 md:pt-36">
      <div className="grid-lines pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="container-page">
        <motion.header variants={stagger(0.09)} initial="hidden" animate="show" key={study.slug}>
          <motion.div variants={fadeUp}>
            <Link to="/?s=projects" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
              All work
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="eyebrow mt-10 text-accent">
            Case study · {study.kicker}
          </motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 max-w-5xl text-[clamp(2.4rem,6.5vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.045em] text-balance">
            {study.title}
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-8 max-w-3xl text-xl leading-relaxed text-muted text-pretty">
            {study.summary}
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
            {study.links.map((l, idx) => (
              <Button key={l.href} href={l.href} external variant={idx === 0 ? 'primary' : 'outline'}>
                {l.label}
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Button>
            ))}
            <span className="eyebrow sm:ml-2">{study.period}</span>
          </motion.div>
        </motion.header>

        <div className="mt-14 md:mt-20">
          {/* At a glance */}
          <Reveal>
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {study.glance.map((g) => (
                <div key={g.label} className="bg-bg p-5 sm:p-6">
                  <dt className="eyebrow">{g.label}</dt>
                  <dd className="mt-2 text-[0.95rem] leading-snug">{g.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Key results */}
          {headline.length > 0 && (
            <Reveal className="mt-6">
              <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3" aria-label="Key results">
                {headline.map((r) => (
                  <div key={r.text} className="bg-bg p-6 sm:p-8">
                    <dt className="text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.045em]">{r.value}</dt>
                    <dd className="mt-3 text-[0.95rem] leading-relaxed text-muted">{r.text}</dd>
                    {r.qualifier && <p className="eyebrow mt-3 !text-accent">{r.qualifier}</p>}
                  </div>
                ))}
              </dl>
            </Reveal>
          )}

          <div className="mt-14 md:mt-20">
            <Block label="The problem">
              <p className="max-w-3xl text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.02em] text-pretty">{study.problem}</p>
            </Block>

            {study.constraints && study.constraints.length > 0 && (
              <Block label="Constraints">
                <ul className="max-w-3xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
                  {study.constraints.map((c) => (
                    <li key={c} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-accent">
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block label="What I built">
              <ul className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
                {study.built.map((b) => (
                  <li key={b} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-accent">
                    {b}
                  </li>
                ))}
              </ul>
            </Block>

            <Block label="Architecture and implementation">
              {study.figures && study.figures.length > 0 && (
                <div className="mb-12 space-y-6">
                  {study.figures.map((id) => (
                    <CaseFigure key={id} id={id} />
                  ))}
                </div>
              )}
              <RevealGroup className="grid gap-x-10 gap-y-10 md:grid-cols-2">
                {study.how.map((h, idx) => (
                  <RevealItem key={h.title}>
                    <p className="font-mono text-[0.7rem] text-accent">0{idx + 1}</p>
                    <h3 className="mt-3 text-xl font-medium tracking-[-0.02em]">{h.title}</h3>
                    <p className="mt-3 text-[1rem] leading-relaxed text-muted">{h.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Block>

            {study.media && study.media.length > 0 && (
              <Block label="Screenshots and media">
                <div className="grid gap-6 sm:grid-cols-2">
                  {study.media.map((m) => (
                    <figure key={m.src}>
                      {m.kind === 'image' ? (
                        <img
                          src={asset(m.src)}
                          alt={m.alt}
                          width={m.width}
                          height={m.height}
                          loading="lazy"
                          decoding="async"
                          className="h-auto w-full rounded-2xl border border-line"
                        />
                      ) : (
                        <video
                          src={asset(m.src)}
                          poster={m.poster ? asset(m.poster) : undefined}
                          width={m.width}
                          height={m.height}
                          controls
                          preload="metadata"
                          playsInline
                          aria-label={m.alt}
                          className="h-auto w-full rounded-2xl border border-line"
                        />
                      )}
                      <figcaption className="mt-3 text-sm text-muted">
                        <span className="eyebrow mr-2 text-accent">{m.kind === 'image' ? 'Screenshot' : 'Video'}</span>
                        {m.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </Block>
            )}

            {study.decisions && study.decisions.length > 0 && (
              <Block label="Engineering decisions and trade-offs">
                <div className="max-w-3xl divide-y divide-line border-y border-line">
                  {study.decisions.map((d, idx) => (
                    <details key={d.decision} className="group py-5" open={idx === 0}>
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left text-[1.08rem] font-medium tracking-[-0.015em] marker:hidden [&::-webkit-details-marker]:hidden">
                        <span>{d.decision}</span>
                        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                          <Plus className="size-4" />
                        </span>
                      </summary>
                      <dl className="mt-4 space-y-4 text-[0.98rem] leading-relaxed">
                        <div>
                          <dt className="eyebrow">Why</dt>
                          <dd className="mt-1 text-muted">{d.why}</dd>
                        </div>
                        <div>
                          <dt className="eyebrow">Trade-off</dt>
                          <dd className="mt-1 text-muted">{d.tradeoff}</dd>
                        </div>
                        {d.alternative && (
                          <div>
                            <dt className="eyebrow">Alternative considered</dt>
                            <dd className="mt-1 text-muted">{d.alternative}</dd>
                          </div>
                        )}
                      </dl>
                    </details>
                  ))}
                </div>
              </Block>
            )}

            {rest.length > 0 && (
              <Block label={headline.length > 0 ? 'More results' : 'Results'}>
                <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
                  {rest.map((r) => (
                    <div key={r.text} className="flex flex-col justify-end bg-bg p-7">
                      {r.value && <dt className="text-[clamp(2rem,3.6vw,2.9rem)] font-medium leading-none tracking-[-0.045em]">{r.value}</dt>}
                      <dd className={`text-[0.95rem] leading-relaxed text-muted ${r.value ? 'mt-3' : ''}`}>{r.text}</dd>
                      {r.qualifier && <p className="eyebrow mt-3 !text-accent">{r.qualifier}</p>}
                    </div>
                  ))}
                </dl>
              </Block>
            )}

            {study.limitations && study.limitations.length > 0 && (
              <Block label="Limitations and lessons">
                <ul className="max-w-3xl space-y-3 text-[1.02rem] leading-relaxed text-muted">
                  {study.limitations.map((l) => (
                    <li key={l} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-accent">
                      {l}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block label="Stack">
              <ul className="flex flex-wrap gap-2">
                {study.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
              {study.note && <p className="mt-6 max-w-2xl text-sm leading-relaxed text-faint">{study.note}</p>}
            </Block>
          </div>
        </div>

        <Reveal>
          <Link to={`/work/${next.slug}`} className="group mt-8 flex items-center justify-between gap-8 rounded-3xl border border-line bg-elev p-7 transition-colors duration-500 hover:border-line-strong sm:p-10">
            <span>
              <span className="eyebrow">Next case study</span>
              <span className="mt-3 block text-[clamp(1.4rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.03em] transition-colors group-hover:text-accent">
                {next.title}
              </span>
            </span>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
