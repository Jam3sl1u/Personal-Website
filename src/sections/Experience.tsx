import { ArrowRight, Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, RevealGroup, RevealItem } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Tag } from '../components/ui/Tag'
import { beall, roles, type Role } from '../content/experience'
import { ease } from '../lib/motion'

function BeallFeature() {
  const [tab, setTab] = useState(0)
  const tabsId = useId()
  const focus = beall.focus[tab]

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const next = (tab + dir + beall.focus.length) % beall.focus.length
    setTab(next)
    document.getElementById(`${tabsId}-tab-${next}`)?.focus()
  }

  return (
    <Reveal>
      <article className="relative overflow-hidden rounded-3xl border border-line bg-elev">
        <div
          className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full opacity-[0.09] blur-3xl"
          style={{ background: 'radial-gradient(circle, var(--accent), transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Header */}
        <div className="relative grid gap-6 p-6 sm:p-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="flex items-center gap-2 text-accent">
                <span className="anim-pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
                Current
              </span>
              <span>{beall.period}</span>
              <span>{beall.location}</span>
            </p>
            <h3 className="mt-5 text-[clamp(1.9rem,4vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              {beall.role}
              <span className="block text-muted">{beall.company}</span>
            </h3>
          </div>
          <div className="self-end lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted text-pretty">{beall.oneLiner}</p>
            <Link to="/work/beall" className="group mt-5 inline-flex min-h-8 items-center gap-2 text-[0.95rem] font-medium transition-colors hover:text-accent">
              Read the case study
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Metrics */}
        <RevealGroup className="relative grid border-y border-line md:grid-cols-3" step={0.1}>
          {beall.metrics.map((m) => (
            <RevealItem key={m.label} className="border-b border-line p-6 last:border-b-0 sm:p-10 md:border-b-0 md:border-r md:last:border-r-0">
              <p className="text-[clamp(3.2rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.05em]">
                {m.value.replace('%', '')}
                {m.value.includes('%') && <span className="text-accent">%</span>}
              </p>
              <p className="mt-4 text-[1.05rem] font-medium">{m.label}</p>
              <p className="eyebrow mt-2 !text-accent">{m.qualifier}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{m.context}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Key contributions: always visible */}
        <div className="relative p-6 sm:p-10">
          <h4 className="eyebrow">Key contributions</h4>
          <ul className="mt-5 grid gap-x-12 gap-y-3 text-[0.98rem] leading-relaxed lg:grid-cols-2">
            {beall.highlights.map((h) => (
              <li key={h} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Focus areas */}
        <div className="relative border-t border-line px-6 pt-6 sm:px-10">
          <h4 className="eyebrow">Go deeper</h4>
        </div>
        <div className="relative grid lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Areas of work at Beall"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto border-b border-line p-4 sm:px-8 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-r lg:p-6"
          >
            {beall.focus.map((f, i) => {
              const selected = i === tab
              return (
                <button
                  key={f.id}
                  id={`${tabsId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${tabsId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(i)}
                  className={`relative flex shrink-0 items-center gap-4 rounded-full px-4 py-2.5 text-left text-sm transition-colors duration-300 lg:rounded-xl lg:py-3.5 lg:text-[0.98rem] ${
                    selected ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="beall-tab"
                      className="absolute inset-0 rounded-full border border-line-strong bg-fg/5 lg:rounded-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative hidden font-mono text-[0.7rem] lg:block ${selected ? 'text-accent' : 'text-faint'}`}>0{i + 1}</span>
                  <span className="relative whitespace-nowrap">{f.title}</span>
                </button>
              )
            })}
          </div>

          <div id={`${tabsId}-panel`} role="tabpanel" aria-labelledby={`${tabsId}-tab-${tab}`} className="min-h-[16rem] p-6 sm:p-10 lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focus.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease }}
              >
                <h4 className="text-xl font-medium tracking-[-0.02em]">{focus.title}</h4>
                <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-muted text-pretty">{focus.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {focus.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="relative flex flex-col gap-5 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <ul className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-faint" aria-label="Stack">
            {beall.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link
            to="/work/beall"
            className="group inline-flex shrink-0 items-center gap-2.5 text-[0.95rem] font-medium text-fg transition-colors hover:text-accent"
          >
            Read the case study
            <span className="flex size-9 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent">
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </article>
    </Reveal>
  )
}

function RoleRow({ role, open, onToggle }: { role: Role; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <li className="relative border-b border-line pl-7 md:pl-10">
      {/* Timeline dot */}
      <span
        className={`absolute left-0 top-[1.9rem] size-[9px] -translate-x-1/2 rounded-full border transition-colors duration-300 ${
          open ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
        }`}
        aria-hidden="true"
      />
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="group grid w-full grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-6 text-left md:grid-cols-[11rem_1fr_auto]"
        >
          <span className="eyebrow col-span-2 md:col-span-1">{role.period}</span>
          <span>
            <span className={`block font-medium tracking-[-0.02em] transition-colors group-hover:text-accent ${role.compact ? 'text-base' : 'text-xl'}`}>
              {role.role}
            </span>
            <span className="mt-0.5 block text-sm text-muted">
              {role.company} · {role.location}
            </span>
            {!open && <span className="mt-2 hidden max-w-2xl text-[0.92rem] leading-relaxed text-muted md:block">{role.oneLiner}</span>}
          </span>
          <span
            className={`flex size-9 items-center justify-center rounded-full border border-line-strong text-muted transition-all duration-300 group-hover:border-fg group-hover:text-fg ${
              open ? 'rotate-45' : ''
            }`}
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-8 md:grid-cols-[11rem_1fr_auto] md:gap-x-6">
              <div className="md:col-start-2">
                <p className="max-w-2xl text-[1.02rem] leading-relaxed text-pretty">{role.oneLiner}</p>
                <ul className="mt-5 max-w-2xl space-y-3 text-[0.95rem] leading-relaxed text-muted">
                  {role.bullets.map((b) => (
                    <li key={b} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                      {b}
                    </li>
                  ))}
                </ul>
                {role.story && (
                  <p className="serif-accent mt-6 max-w-2xl border-l border-line-strong pl-4 text-xl leading-snug text-fg/90">{role.story}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(null)
  return (
    <section id="work" className="border-t border-line py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          index="01"
          label="Experience"
          lede="I build AI products on an early-stage team at UC Irvine's startup incubator. Earlier roles in teaching, tutoring, and client sales are below."
        >
          AI systems I build, <em>measure</em>, and improve.
        </SectionHeading>

        <div className="mt-12">
          <BeallFeature />
        </div>

        <Reveal className="mt-16">
          <p className="eyebrow mb-2">Other experience</p>
          <ol className="border-l border-line">
            {roles.map((role) => (
              <RoleRow key={role.id} role={role} open={openId === role.id} onToggle={() => setOpenId((cur) => (cur === role.id ? null : role.id))} />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
