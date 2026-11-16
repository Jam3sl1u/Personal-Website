import { Check, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { site } from '../../content/site'

/** Copies the email to the clipboard and confirms it, with a live region for screen readers. */
export function CopyEmail({ className = '' }: { className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(t)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
    } catch {
      // Clipboard blocked (e.g. insecure context): fall back to the mail client.
      window.location.href = `mailto:${site.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`group inline-flex h-12 items-center gap-2.5 rounded-full border border-line-strong px-6 text-[0.95rem] font-medium transition-colors duration-300 hover:border-fg hover:bg-fg/5 ${className}`}
    >
      <span className="relative inline-flex size-4 items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0"
          >
            {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? 'Copied to clipboard' : 'Copy email'}</span>
    </button>
  )
}
