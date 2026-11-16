import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Placeholder } from '../components/ui/Placeholder'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { Tag } from '../components/ui/Tag'
import { caseStudies, getCaseStudy } from '../content/caseStudies'
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
  useDocumentTitle(study?.title)
  if (!study) return <NotFound />

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

        <div className="mt-16 md:mt-24">
          <Block label="The problem">
            <p className="max-w-3xl text-[clamp(1.25rem,2.2vw,1.7rem)] font-medium leading-[1.3] tracking-[-0.02em] text-pretty">{study.problem}</p>
          </Block>

          <Block label="What I built">
            <ul className="max-w-3xl space-y-4 text-[1.05rem] leading-relaxed text-muted">
              {study.built.map((b) => (
                <li key={b} className="relative pl-6 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-3 before:bg-accent">
                  {b}
                </li>
              ))}
            </ul>
          </Block>

          <Block label="How it works">
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

          <Block label="Results">
            <dl className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.text} className="flex flex-col justify-end bg-bg p-7">
                  {r.value && <dt className="text-[clamp(2.2rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.045em]">{r.value}</dt>}
                  <dd className={`text-[0.95rem] leading-relaxed text-muted ${r.value ? 'mt-3' : ''}`}>{r.text}</dd>
                </div>
              ))}
            </dl>
          </Block>

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

          <Block label="Screens and media">
            <div className="grid gap-5 sm:grid-cols-2">
              {study.assets.map((a) => (
                <Placeholder key={a} label={a} />
              ))}
            </div>
          </Block>
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
