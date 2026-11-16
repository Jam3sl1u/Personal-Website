import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * Hero graphic: an abstract map of the kind of AI system James builds at work.
 * Signals travel along the edges; hovering a node lights up its connections and
 * explains that part of the system. It is an illustration, not a real diagram
 * of any client product.
 */

type Shape = 'circle' | 'square' | 'diamond'
type Node = { id: string; x: number; y: number; label: string; note: string; shape: Shape; hub?: boolean }

const W = 660
const H = 456

const nodes: Node[] = [
  { id: 'client', x: 52, y: 250, label: 'client', shape: 'square', note: 'Someone asks a question in a client-facing AI application.' },
  { id: 'rules', x: 192, y: 138, label: 'rule checks', shape: 'diamond', note: 'Deterministic checks stop clearly harmful messages in under a millisecond.' },
  { id: 'models', x: 192, y: 362, label: 'model checks', shape: 'diamond', note: 'The remaining model checks run in parallel. False positives stay under 0.1% on an idiom and hyperbole eval suite.' },
  { id: 'orch', x: 332, y: 250, label: 'orchestrator', shape: 'circle', hub: true, note: 'The orchestration layer decides what runs, and what can run at the same time.' },
  { id: 'retrieval', x: 472, y: 132, label: 'retrieval', shape: 'circle', note: 'RAG-based document retrieval, with author and document-type metadata filtering.' },
  { id: 'graph', x: 592, y: 56, label: 'knowledge graph', shape: 'circle', note: 'Source documents live in a Neo4j knowledge graph, fed by an S3 ingestion pipeline with OCR.' },
  { id: 'memory', x: 472, y: 368, label: 'compaction', shape: 'circle', note: 'Hybrid history compaction cut context tokens 74% and p95 latency 50% on a 40-turn benchmark.' },
  { id: 'llm', x: 472, y: 250, label: 'LLM', shape: 'square', note: 'Prompt pipelines on the Claude API, tuned with LLM-as-judge evaluations.' },
  { id: 'out', x: 604, y: 250, label: 'response', shape: 'square', note: 'An answer comes back with citations the person can open and check.' },
]

const edges: [string, string][] = [
  ['client', 'rules'],
  ['client', 'models'],
  ['rules', 'orch'],
  ['models', 'orch'],
  ['orch', 'retrieval'],
  ['retrieval', 'graph'],
  ['orch', 'llm'],
  ['orch', 'memory'],
  ['retrieval', 'llm'],
  ['memory', 'llm'],
  ['llm', 'out'],
]

const byId = Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<string, Node>

function edgePath(a: Node, b: Node) {
  const mx = (a.x + b.x) / 2
  return `M ${a.x} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x} ${b.y}`
}

function NodeShape({ node, active }: { node: Node; active: boolean }) {
  const stroke = active ? 'var(--accent)' : 'var(--line-strong)'
  const common = { fill: 'var(--bg-elev)', stroke, strokeWidth: 1.25, style: { transition: 'stroke 0.4s ease' } }
  if (node.shape === 'square') return <rect x={-17} y={-17} width={34} height={34} rx={8} {...common} />
  if (node.shape === 'diamond') return <rect x={-15} y={-15} width={30} height={30} rx={5} transform="rotate(45)" {...common} />
  return <circle r={node.hub ? 28 : 18} {...common} />
}

export function SystemGraph() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)
  const [cycle, setCycle] = useState(3) // start on the orchestrator

  // Walk through the system on its own until someone takes over.
  useEffect(() => {
    if (reduce || hovered) return
    const t = window.setInterval(() => setCycle((c) => (c + 1) % nodes.length), 3200)
    return () => window.clearInterval(t)
  }, [reduce, hovered])

  const activeId = hovered ?? nodes[cycle].id
  const active = byId[activeId]

  return (
    <figure className="relative overflow-hidden rounded-2xl border border-line bg-elev/70 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="eyebrow">system.overview</span>
        <span className="eyebrow flex items-center gap-2">
          <span className="anim-pulse-dot size-1.5 rounded-full bg-accent" aria-hidden="true" />
          signals flowing
        </span>
      </div>

      <div className="dot-grid relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--bg-elev)_100%)]" aria-hidden="true" />
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="relative block h-auto w-full"
          role="img"
          aria-label="Abstract diagram of an AI system: a client request passes safety checks, an orchestrator, retrieval over a knowledge graph, context compaction, and an LLM before a response returns."
        >
          <g fill="none">
            {edges.map(([from, to], i) => {
              const d = edgePath(byId[from], byId[to])
              const lit = from === activeId || to === activeId
              const dur = 2.4 + (i % 4) * 0.45
              const begin = `${(i * 0.41).toFixed(2)}s`
              return (
                <g key={`${from}-${to}`}>
                  <path
                    d={d}
                    stroke={lit ? 'var(--accent)' : 'var(--line-strong)'}
                    strokeWidth={lit ? 1.4 : 1}
                    strokeOpacity={lit ? 0.9 : 0.7}
                    style={{ transition: 'stroke 0.4s ease, stroke-opacity 0.4s ease' }}
                  />
                  {!reduce && (
                    <circle r={2.6} fill="var(--accent)">
                      <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={d} />
                      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={`${dur}s`} begin={begin} repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              )
            })}
          </g>

          {nodes.map((node) => {
            const isActive = node.id === activeId
            const labelY = (node.hub ? 28 : 20) + 20
            return (
              <g
                key={node.id}
                transform={`translate(${node.x} ${node.y})`}
                onPointerEnter={() => setHovered(node.id)}
                onPointerLeave={() => setHovered(null)}
                data-cursor
                className="cursor-pointer"
              >
                {node.hub && (
                  <circle r={38} fill="none" stroke="var(--line-strong)" strokeDasharray="2 7" className={reduce ? undefined : 'anim-spin-slow'} />
                )}
                {isActive && <circle r={node.hub ? 44 : 30} fill="var(--accent)" opacity={0.08} />}
                <NodeShape node={node} active={isActive} />
                <circle r={isActive ? 4.5 : 3} fill={isActive ? 'var(--accent)' : 'var(--fg)'} style={{ transition: 'fill 0.4s ease, r 0.4s ease' }} />
                <text
                  y={labelY}
                  textAnchor="middle"
                  fontSize={11.5}
                  fontFamily="var(--font-mono)"
                  fill={isActive ? 'var(--fg)' : 'var(--faint)'}
                  className="hidden sm:block"
                  style={{ transition: 'fill 0.4s ease' }}
                >
                  {node.label}
                </text>
                {/* Larger invisible hit target */}
                <circle r={34} fill="transparent" />
              </g>
            )
          })}
        </svg>
      </div>

      <figcaption className="flex min-h-[6.25rem] flex-col justify-center border-t border-line px-4 py-3.5 sm:min-h-[5.25rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <p className="eyebrow text-accent">{active.label}</p>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-muted">{active.note}</p>
          </motion.div>
        </AnimatePresence>
      </figcaption>
    </figure>
  )
}
