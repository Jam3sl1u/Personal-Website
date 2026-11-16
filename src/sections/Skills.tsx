import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { Reveal } from '../components/ui/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'
import { skillGroups } from '../content/skills'
import { ease } from '../lib/motion'

export function Skills() {
  const [index, setIndex] = useState(0)
  const baseId = useId()
  const group = skillGroups[index]
  const core = group.skills.filter((s) => s.core)
  const rest = group.skills.filter((s) => !s.core)

  function onKeyDown(e: React.KeyboardEvent) {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return
    e.preventDefault()
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const next = (index + dir + skillGroups.length) % skillGroups.length
    setIndex(next)
    document.getElementById(`${baseId}-tab-${next}`)?.focus()
  }

  return (
    <section id="skills" className="border-t border-line py-24 md:py-36">
      <div className="container-page">
        <SectionHeading index="04" label="Technical skills">
          The tools I <em>reach for</em>.
        </SectionHeading>

        <Reveal className="mt-16 grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Skill categories"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {skillGroups.map((g, i) => {
              const selected = i === index
              return (
                <button
                  key={g.id}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  onMouseEnter={() => setIndex(i)}
                  className={`group relative flex shrink-0 items-center justify-between gap-6 rounded-full border px-4 py-2.5 text-left transition-colors duration-300 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:border-b lg:border-line lg:px-0 lg:py-5 ${
                    selected ? 'border-line-strong text-fg' : 'border-line text-muted hover:text-fg'
                  }`}
                >
                  <span className="flex items-baseline gap-4">
                    <span className={`hidden font-mono text-[0.7rem] lg:inline ${selected ? 'text-accent' : 'text-faint'}`}>0{i + 1}</span>
                    <span className="whitespace-nowrap text-sm lg:text-xl lg:tracking-[-0.02em]">{g.label}</span>
                  </span>
                  <span className="hidden font-mono text-xs text-faint lg:inline">{g.skills.length}</span>
                  {selected && (
                    <motion.span layoutId="skills-rule" className="absolute inset-x-0 -bottom-px hidden h-px bg-accent lg:block" transition={{ duration: 0.4, ease }} />
                  )}
                </button>
              )
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${index}`}
            className="relative min-h-[22rem] overflow-hidden rounded-3xl border border-line bg-elev p-7 sm:p-10 lg:col-span-8"
          >
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom_left,black,transparent_60%)]" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={group.id}
                className="relative"
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{ show: { transition: { staggerChildren: 0.035 } } }}
              >
                <p className="eyebrow">{group.blurb}</p>
                <ul className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-1">
                  {core.map((s) => (
                    <motion.li
                      key={s.name}
                      variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                      className="text-[clamp(2.2rem,5.5vw,4.25rem)] font-medium leading-[1.08] tracking-[-0.045em]"
                    >
                      {s.name}
                    </motion.li>
                  ))}
                </ul>
                <ul className="mt-9 flex flex-wrap gap-2.5">
                  {rest.map((s) => (
                    <motion.li
                      key={s.name}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } } }}
                      className="rounded-full border border-line-strong bg-bg/40 px-4 py-2 text-[0.95rem] text-fg/90"
                    >
                      {s.name}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
