import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { SystemGraph } from '../components/hero/SystemGraph'
import { Button } from '../components/ui/Button'
import { GithubIcon, LinkedinIcon } from '../components/ui/icons'
import { site } from '../content/site'
import { ease, fadeUp, riseWord, stagger } from '../lib/motion'
import { scrollToId } from '../lib/scroll'

export function Hero() {
  const [first, last] = site.name.split(' ')
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Backdrop: faint engineering grid and one restrained glow. */}
      <div className="grid-lines pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_30%,black,transparent)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] -z-10 size-[42rem] rounded-full opacity-[0.13] blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--accent), transparent 65%)' }}
        aria-hidden="true"
      />

      <div className="container-page grid min-h-[100svh] items-center gap-x-10 gap-y-14 pb-20 pt-28 lg:grid-cols-12 lg:pb-24 lg:pt-24">
        <motion.div className="lg:col-span-7" variants={stagger(0.09, 0.1)} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-line bg-elev/60 py-1.5 pl-3 pr-4 text-[0.8rem] text-muted backdrop-blur">
            <span className="anim-pulse-dot size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
            <span>{site.status}</span>
          </motion.p>

          <h1 className="mt-7 text-[clamp(3.6rem,10vw,8.25rem)] font-medium leading-[0.88] tracking-[-0.055em]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span variants={riseWord} className="block">
                {first}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={riseWord} className="block">
                {last}
                <span className="text-accent">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="eyebrow mt-6 !text-muted">
            {site.roleLine}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-7 max-w-2xl text-[clamp(1.55rem,3vw,2.45rem)] font-medium leading-[1.12] tracking-[-0.03em] text-balance">
            {site.headline.lines.map((line) => (
              <span key={line.plain} className="block">
                {line.plain} <span className="serif-accent text-accent">{line.accent}</span>
              </span>
            ))}
          </motion.p>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted text-pretty">
            {site.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href="#/?s=work"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('work')
              }}
            >
              View My Work
              <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              href="#/?s=contact"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
            >
              Get in Touch
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-12 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg"
              >
                <GithubIcon className="size-[1.05rem]" />
                GitHub
                <ArrowUpRight className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex h-12 items-center gap-2 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg"
              >
                <LinkedinIcon className="size-[1.05rem]" />
                LinkedIn
                <ArrowUpRight className="size-3.5 opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.45 }}
        >
          <SystemGraph />
          <p className="eyebrow mt-3 text-right">Fig. 01 · The shape of systems I build</p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="eyebrow absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 transition-colors hover:text-fg lg:flex"
        aria-label="Scroll to About"
      >
        <span className="relative block h-9 w-px overflow-hidden bg-line-strong" aria-hidden="true">
          <span className="anim-scroll-hint absolute inset-x-0 top-0 block h-1/3 bg-accent" />
        </span>
        Scroll
      </motion.button>
    </section>
  )
}
