import { useEffect } from 'react'

const base = 'James Liu | Software Engineer'

function metaDescription() {
  return document.querySelector<HTMLMetaElement>('meta[name="description"]')
}

/**
 * Sets the tab title and, optionally, the meta description for the current route.
 * Both are restored when the route unmounts so the home page keeps its defaults.
 */
export function useDocumentTitle(title?: string, description?: string) {
  useEffect(() => {
    const meta = metaDescription()
    const prevDescription = meta?.content
    document.title = title ? `${title} | James Liu` : base
    if (description && meta) meta.content = description
    return () => {
      document.title = base
      if (meta && prevDescription !== undefined) meta.content = prevDescription
    }
  }, [title, description])
}
