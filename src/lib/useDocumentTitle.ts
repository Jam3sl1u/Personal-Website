import { useEffect } from 'react'

const base = 'James Liu | Software Engineer'

export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | James Liu` : base
    return () => {
      document.title = base
    }
  }, [title])
}
