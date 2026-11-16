import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Cursor } from './components/layout/Cursor'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { CaseStudyPage } from './pages/CaseStudy'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ResumePage } from './pages/Resume'

/** Start every route at the top (the home page handles its own ?s=section scrolling). */
function ScrollManager() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    if (pathname === '/' && search.includes('s=')) return
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, search])
  return null
}

/**
 * HashRouter keeps every route inside index.html (/#/work/chariot), so deep
 * links and refreshes work on GitHub Pages with no server rewrites, under a
 * user site, a project subpath, or a custom domain.
 */
export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollManager />
        <Cursor />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work/:slug" element={<CaseStudyPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
    </MotionConfig>
  )
}
