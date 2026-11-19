import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { scrollToId } from '../lib/scroll'
import { useDocumentTitle } from '../lib/useDocumentTitle'
import { About } from '../sections/About'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Projects } from '../sections/Projects'
import { Skills } from '../sections/Skills'

export function Home() {
  useDocumentTitle()
  const [params] = useSearchParams()
  const target = params.get('s')

  // Deep links like /#/?s=projects scroll to that section.
  useEffect(() => {
    if (!target) return
    const frame = requestAnimationFrame(() => scrollToId(target))
    return () => cancelAnimationFrame(frame)
  }, [target])

  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Skills />
      <Education />
      <Contact />
    </>
  )
}
