import { useCallback, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'

function current(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current)

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0a0b0d' : '#f4f3ee')
  }, [theme])

  const toggle = useCallback(() => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    window.setTimeout(() => root.classList.remove('theme-transition'), 500)
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem('theme', next)
      } catch {
        /* storage unavailable: theme still switches for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggle }
}
