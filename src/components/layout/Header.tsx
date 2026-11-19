import { Download, FileText, Menu, Moon, Sun, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { nav, resumeLink, site } from '../../content/site'
import { ease } from '../../lib/motion'
import { scrollToId, scrollToTop } from '../../lib/scroll'
import { useActiveSection } from '../../lib/useActiveSection'
import { useTheme } from '../../lib/useTheme'
import { GithubIcon, LinkedinIcon } from '../ui/icons'

const sectionIds = ['work', 'projects', 'about', 'skills', 'education', 'contact'] as const
/** Sections without their own nav item fall under the nearest one. */
const sectionToNav: Record<string, string> = {
  work: 'work',
  projects: 'projects',
  about: 'about',
  skills: 'about',
  education: 'about',
  contact: 'contact',
}

export function Header() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const activeSection = useActiveSection(sectionIds, onHome)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on route change and on Escape; lock page scroll while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const activeNav = onHome && activeSection ? sectionToNav[activeSection] : null
  const resume = resumeLink()
  const resumeCls =
    'inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors duration-300 hover:border-fg hover:bg-fg/5'

  const items = nav.map((item) => {
    const key = item.section
    const to = `/?s=${item.section}`
    const onClick = () => {
      setOpen(false)
      // Already on the home page: the URL may not change, so scroll directly.
      if (onHome) scrollToId(item.section)
    }
    return { key, to, label: item.label, onClick }
  })

  return (
    <header className="no-print fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        onClick={(e) => {
          e.preventDefault()
          document.getElementById('main')?.focus()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>

      <div
        className={`border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open ? 'border-line bg-bg/75 backdrop-blur-xl' : 'border-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6">
          <Link
            to="/"
            onClick={() => {
              setOpen(false)
              if (onHome) scrollToTop()
            }}
            className="group flex items-center gap-3"
            aria-label={`${site.name}, home`}
          >
            <span className="relative flex size-8 items-center justify-center rounded-lg border border-line-strong font-mono text-[0.7rem] font-medium tracking-tight transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
              {site.initials}
              <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-accent" aria-hidden="true" />
            </span>
            <span className="text-[0.95rem] font-medium tracking-[-0.01em]">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => {
                const active = activeNav === item.key
                return (
                  <li key={item.key}>
                    <Link
                      to={item.to}
                      onClick={item.onClick}
                      aria-current={active ? 'true' : undefined}
                      className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                        active ? 'text-fg' : 'text-muted hover:text-fg'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full border border-line-strong bg-fg/5"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            {resume.kind === 'pdf' ? (
              <a href={resume.href} download={resume.download} target="_blank" rel="noreferrer noopener" className={`${resumeCls} mr-1 hidden md:inline-flex`}>
                <Download className="size-4" aria-hidden="true" />
                Resume
                <span className="sr-only">(PDF, opens in a new tab)</span>
              </a>
            ) : (
              <Link to={resume.to} aria-current={pathname === '/resume' ? 'page' : undefined} className={`${resumeCls} mr-1 hidden md:inline-flex`}>
                <FileText className="size-4" aria-hidden="true" />
                Resume
              </Link>
            )}
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              className="relative flex size-11 items-center justify-center rounded-full text-muted transition-colors duration-300 hover:bg-fg/5 hover:text-fg"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 60, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25, ease }}
                >
                  {theme === 'dark' ? <Moon className="size-[1.05rem]" aria-hidden="true" /> : <Sun className="size-[1.05rem]" aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex size-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-fg/5 md:hidden"
            >
              {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-bg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
            <nav aria-label="Mobile" className="container-page relative flex-1 pt-8">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
              >
                {items.map((item, i) => (
                  <motion.li
                    key={item.key}
                    variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                    className="border-b border-line"
                  >
                    <Link to={item.to} onClick={item.onClick} className="flex items-baseline justify-between py-5">
                      <span className="text-4xl font-medium tracking-[-0.03em]">{item.label}</span>
                      <span className="eyebrow">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="border-b border-line"
                >
                  {resume.kind === 'pdf' ? (
                    <a href={resume.href} download={resume.download} target="_blank" rel="noreferrer noopener" onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                      <span className="text-4xl font-medium tracking-[-0.03em]">Resume</span>
                      <span className="eyebrow">PDF</span>
                    </a>
                  ) : (
                    <Link to={resume.to} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                      <span className="text-4xl font-medium tracking-[-0.03em]">Resume</span>
                      <span className="eyebrow">Online</span>
                    </Link>
                  )}
                </motion.li>
              </motion.ul>
            </nav>
            <div className="container-page relative flex items-center justify-between py-8">
              <a href={`mailto:${site.email}`} className="text-sm text-muted underline decoration-line-strong underline-offset-4">
                {site.email}
              </a>
              <div className="flex gap-2">
                <a href={site.links.github} target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="flex size-11 items-center justify-center rounded-full border border-line">
                  <GithubIcon className="size-4" />
                </a>
                <a href={site.links.linkedin} target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="flex size-11 items-center justify-center rounded-full border border-line">
                  <LinkedinIcon className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
