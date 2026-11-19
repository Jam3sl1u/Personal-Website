// Diagrams for the case-study pages.
//
// Every diagram is drawn from functionality that is documented in the case-study
// copy or in the project repositories. They are labeled "Diagram" so they are never
// mistaken for screenshots. The Beall diagrams are deliberately generalized: no
// product names, client names, or internal implementation details.
//
// Built from semantic HTML (ordered lists), so screen readers can read the steps,
// text reflows on small screens, and colors follow the theme tokens.
import { ArrowDown, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { FigureId } from '../../content/caseStudies'

/* ---------- primitives ---------- */

function FigureFrame({ title, caption, children }: { title: string; caption: string; children: ReactNode }) {
  return (
    <figure className="rounded-2xl border border-line bg-elev p-5 sm:p-7">
      <p className="eyebrow">
        <span className="text-accent">Diagram</span> · {title}
      </p>
      <div className="mt-5">{children}</div>
      <figcaption className="mt-5 max-w-3xl border-t border-line pt-4 text-sm leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  )
}

type Step = { title: string; detail?: string; accent?: boolean }

function StepBox({ step }: { step: Step }) {
  return (
    <div className={`h-full rounded-xl border px-4 py-3 ${step.accent ? 'border-accent/60 bg-accent/5' : 'border-line-strong bg-bg/60'}`}>
      <p className="text-[0.92rem] font-medium leading-snug">{step.title}</p>
      {step.detail && <p className="mt-1 text-xs leading-relaxed text-muted">{step.detail}</p>}
    </div>
  )
}

function Flow({ steps, label }: { steps: Step[]; label: string }) {
  return (
    <ol aria-label={label} className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-stretch">
      {steps.map((s, i) => (
        <li key={s.title} className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
          <StepBox step={s} />
          {i < steps.length - 1 && <ArrowRight className="hidden size-4 shrink-0 self-center text-faint md:block" aria-hidden="true" />}
          {i < steps.length - 1 && <ArrowDown className="size-4 shrink-0 self-center text-faint md:hidden" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  )
}

function Lane({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mt-6 first:mt-0">
      <p className="mb-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">{label}</p>
      {children}
    </div>
  )
}

/** Horizontal bars with visible values, so the numbers are never only in the graphic. */
function Bars({ rows, label, max = 100, unit = '' }: { rows: { name: string; value: number; note?: string; muted?: boolean }[]; label: string; max?: number; unit?: string }) {
  return (
    <ul aria-label={label} className="space-y-4">
      {rows.map((r) => (
        <li key={r.name} className="grid grid-cols-[6.5rem_1fr_3.75rem] items-center gap-x-3 gap-y-1 sm:grid-cols-[9rem_1fr_4.5rem]">
          <span className="text-sm">{r.name}</span>
          <span className="relative block h-3 overflow-hidden rounded-full bg-fg/10" aria-hidden="true">
            <span className={`absolute inset-y-0 left-0 rounded-full ${r.muted ? 'bg-faint' : 'bg-accent'}`} style={{ width: `${(r.value / max) * 100}%` }} />
          </span>
          <span className="text-right font-mono text-sm">
            {r.value}
            {unit}
          </span>
          {r.note && <span className="col-span-3 text-xs text-muted sm:col-start-2 sm:col-span-2">{r.note}</span>}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Beall (generalized) ---------- */

function BeallArchitecture() {
  return (
    <FigureFrame
      title="Generalized system architecture"
      caption="A simplified, public-safe view. Names and internals are intentionally generic, and the order of the components inside the orchestration layer is not shown."
    >
      <Lane label="Request path">
        <ol aria-label="Request path" className="flex flex-col gap-2 md:flex-row md:items-stretch">
          <li className="flex flex-col gap-2 md:flex-row md:items-center">
            <StepBox step={{ title: 'Web client', detail: 'React + TypeScript' }} />
            <ArrowRight className="hidden size-4 shrink-0 text-faint md:block" aria-hidden="true" />
            <ArrowDown className="size-4 shrink-0 self-center text-faint md:hidden" aria-hidden="true" />
          </li>
          <li className="flex flex-col gap-2 md:flex-row md:items-center">
            <StepBox step={{ title: 'API on AWS', detail: 'Cognito auth, DynamoDB' }} />
            <ArrowRight className="hidden size-4 shrink-0 text-faint md:block" aria-hidden="true" />
            <ArrowDown className="size-4 shrink-0 self-center text-faint md:hidden" aria-hidden="true" />
          </li>
          <li className="flex flex-col gap-2 md:flex-row md:items-center">
            <div className="rounded-xl border border-accent/60 bg-accent/5 p-3">
              <p className="px-1 pb-2 text-[0.92rem] font-medium">Orchestration layer</p>
              <ul className="grid gap-2 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
                <li><StepBox step={{ title: 'Safety checks', detail: 'rules, then models' }} /></li>
                <li><StepBox step={{ title: 'Retrieval', detail: 'knowledge graph + documents' }} /></li>
                <li><StepBox step={{ title: 'Context compaction', detail: 'trim + summarize' }} /></li>
              </ul>
            </div>
            <ArrowRight className="hidden size-4 shrink-0 text-faint md:block" aria-hidden="true" />
            <ArrowDown className="size-4 shrink-0 self-center text-faint md:hidden" aria-hidden="true" />
          </li>
          <li className="flex flex-col gap-2 md:flex-row md:items-center">
            <StepBox step={{ title: 'LLM', detail: 'Claude API' }} />
            <ArrowRight className="hidden size-4 shrink-0 text-faint md:block" aria-hidden="true" />
            <ArrowDown className="size-4 shrink-0 self-center text-faint md:hidden" aria-hidden="true" />
          </li>
          <li><StepBox step={{ title: 'Response', detail: 'back to the client' }} /></li>
        </ol>
      </Lane>
      <Lane label="Document ingestion">
        <Flow
          label="Document ingestion"
          steps={[
            { title: 'Source documents', detail: 'stored in S3' },
            { title: 'OCR' },
            { title: 'Metadata', detail: 'author, document type' },
            { title: 'Knowledge graph', detail: 'Neo4j' },
            { title: 'Filtered retrieval', detail: 'by author and document type', accent: true },
          ]}
        />
      </Lane>
    </FigureFrame>
  )
}

function BeallSafety() {
  return (
    <FigureFrame
      title="Safety and orchestration"
      caption="Clear-cut harmful messages are stopped by deterministic rules in under a millisecond. Everything else gets model checks that run in parallel, so one slow check does not serialize the rest."
    >
      <Flow
        label="Safety pipeline"
        steps={[
          { title: 'Incoming message' },
          { title: 'Rule-based checks', detail: 'under 1 ms', accent: true },
          { title: 'Model checks in parallel', detail: 'only for cases the rules do not settle' },
          { title: 'Allow or block' },
        ]}
      />
      <p className="mt-4 text-sm text-muted">
        <span className="font-medium text-fg">Clear-cut harmful:</span> stopped at the rule stage, with no model call.
        <span className="mx-2 text-faint">·</span>
        <span className="font-medium text-fg">Everything else:</span> continues to the parallel model checks.
      </p>
    </FigureFrame>
  )
}

function BeallCompaction() {
  return (
    <FigureFrame
      title="Context compaction"
      caption="Deterministic trimming handles what can be removed safely. Incremental summarization compresses the rest. Anchor-fact recall was measured alongside size and latency, so a shorter context could not hide lost facts."
    >
      <Flow
        label="Compaction pipeline"
        steps={[
          { title: 'Conversation history', detail: 'grows every turn' },
          { title: 'Deterministic trimming' },
          { title: 'Incremental LLM summarization' },
          { title: 'Compact context', detail: 'sent to the model', accent: true },
        ]}
      />
    </FigureFrame>
  )
}

function BeallBenchmark() {
  return (
    <FigureFrame
      title="Compaction benchmark, indexed to baseline"
      caption="Indexed so that the baseline equals 100. Measured on a single 40-turn benchmark, with 100% anchor-fact recall preserved. This is a controlled benchmark, not a production-wide result."
    >
      <Bars
        label="Benchmark results relative to baseline"
        rows={[
          { name: 'Baseline', value: 100, muted: true },
          { name: 'Context tokens', value: 26, note: '74% fewer' },
          { name: 'p95 latency', value: 50, note: '50% lower' },
        ]}
      />
    </FigureFrame>
  )
}

/* ---------- Chariot ---------- */

function ChariotFlow() {
  return (
    <FigureFrame
      title="Weekly assignment flow"
      caption="Members register and request rides in Discord. Data lives in a Google Sheet, and every write is scoped to a club ID. A scripted run assigns riders, then reconciles with earlier assignments instead of duplicating them."
    >
      <Flow
        label="Weekly flow"
        steps={[
          { title: 'Discord', detail: 'register, request, driver availability' },
          { title: 'Google Sheet', detail: '8 tabs, every write scoped to a club ID' },
          { title: 'Apps Script run', detail: 'script lock' },
          { title: 'Matcher', detail: 'pure function', accent: true },
          { title: 'Reconcile', detail: 'with prior assignments' },
          { title: 'Notify', detail: 'claim before send' },
        ]}
      />
    </FigureFrame>
  )
}

function ChariotMatcher() {
  return (
    <FigureFrame
      title="How the matcher decides"
      caption="A deterministic greedy matcher with no external I/O, so the same input always gives the same plan. Riders who cannot be placed get an explicit reason instead of disappearing from the plan."
    >
      <ol aria-label="Matcher priorities, in order" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { n: 1, title: 'Same housing', detail: 'preferred first' },
          { n: 2, title: 'Distance', detail: 'cached, or haversine' },
          { n: 3, title: 'Zone priority' },
          { n: 4, title: 'Stable ID tie-break', detail: 'keeps results repeatable' },
        ].map((r) => (
          <li key={r.n} className="rounded-xl border border-line-strong bg-bg/60 px-4 py-3">
            <p className="font-mono text-[0.7rem] text-accent">0{r.n}</p>
            <p className="mt-1 text-[0.92rem] font-medium">{r.title}</p>
            {r.detail && <p className="mt-1 text-xs text-muted">{r.detail}</p>}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-muted">
        <span className="font-medium text-fg">Outcome:</span> assigned to a driver, or <span className="font-medium text-fg">unassigned with a reason</span>.
      </p>
    </FigureFrame>
  )
}

function ChariotRecovery() {
  return (
    <FigureFrame
      title="Failure handling"
      caption="Each row is a failure the system is designed to absorb without sending a message twice or dropping a person."
    >
      <ul aria-label="Failure cases and responses" className="grid gap-2 sm:grid-cols-2">
        {[
          { when: 'The bot restarts', then: 'Weekly state is preserved, and a job missed while it was down runs when it is back, if it is still the same week.' },
          { when: 'Google Sheets rate-limits a call', then: 'Capped retries with jittered exponential backoff.' },
          { when: 'A send is retried or a process crashes', then: 'The message was claimed before sending, so it is not posted twice.' },
          { when: 'A rider cannot be placed', then: 'They get an explicit unassigned reason, not a silent drop.' },
        ].map((r) => (
          <li key={r.when} className="rounded-xl border border-line-strong bg-bg/60 px-4 py-3">
            <p className="text-[0.92rem] font-medium">{r.when}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{r.then}</p>
          </li>
        ))}
      </ul>
    </FigureFrame>
  )
}

/* ---------- Graceful ---------- */

function GracefulArchitecture() {
  return (
    <FigureFrame
      title="Application architecture"
      caption="Supabase’s auto-generated REST API is disabled, so every read and write goes through the app’s own API handlers. Development, staging, and production each have their own credentials."
    >
      <Flow
        label="Request path"
        steps={[
          { title: 'Browser or installed PWA' },
          { title: 'Edge middleware', detail: 'Clerk auth, public-route allowlist, rate limiting, CSP' },
          { title: 'Next.js API handlers', detail: 'Zod validation, role checks', accent: true },
          { title: 'Supabase Postgres', detail: 'REST API disabled' },
        ]}
      />
      <Lane label="Services behind the handlers">
        <ul aria-label="Connected services" className="flex flex-wrap gap-2">
          {['Cloudflare R2: document library', 'Google Calendar integration', 'Clerk with Google OAuth: sign-in'].map((s) => (
            <li key={s} className="rounded-full border border-line-strong px-3.5 py-1.5 text-sm">
              {s}
            </li>
          ))}
        </ul>
      </Lane>
      <Lane label="Environments">
        <Flow label="Environments" steps={[{ title: 'Development', detail: 'local' }, { title: 'Staging', detail: 'E2E tests run here', accent: true }, { title: 'Production', detail: 'after staging passes' }]} />
      </Lane>
    </FigureFrame>
  )
}

/* ---------- AI Calendar ---------- */

function CalendarIO() {
  return (
    <FigureFrame
      title="Input and structured output"
      caption="A record from the project’s dataset, shown to illustrate the schema. The output here is the dataset’s expected answer, not a model prediction."
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-line-strong bg-bg/60 p-4">
          <p className="eyebrow">Natural-language input</p>
          <p className="mt-3 text-[0.95rem] leading-relaxed">
            “Let’s schedule a monthly budget review on the 15th of each month starting January 15, 2025 at 2:30 PM for 45 minutes in the main conference room”
          </p>
        </div>
        <div className="rounded-xl border border-accent/60 bg-accent/5 p-4">
          <p className="eyebrow">Structured event</p>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.8rem]">
            {[
              ['title', 'Budget Review'],
              ['date', '2025-01-15'],
              ['time', '14:30'],
              ['duration_minutes', '45'],
              ['location', 'Main Conference Room'],
              ['recurrence', 'monthly'],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-faint">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <Lane label="Pipeline">
        <Flow label="Pipeline" steps={[{ title: 'Text' }, { title: 'Flan-T5-Base', detail: 'fine-tuned on 1,430 examples' }, { title: 'Rule-based post-processing', detail: 'dates, durations, recurrence' }, { title: 'Structured event', accent: true }]} />
      </Lane>
    </FigureFrame>
  )
}

function CalendarAccuracy() {
  return (
    <FigureFrame
      title="Accuracy by field"
      caption="Exact-match accuracy on the 500-example evaluation harness. Scoring each field separately is what showed that recurrence and time are strong and date reasoning is the bottleneck."
    >
      <Bars
        label="Exact-match accuracy by field"
        unit="%"
        rows={[
          { name: 'Recurrence', value: 95.6 },
          { name: 'Time', value: 93.8 },
          { name: 'Date', value: 32.2, note: 'The main bottleneck' },
        ]}
      />
    </FigureFrame>
  )
}

/* ---------- registry ---------- */

const registry: Record<FigureId, () => ReactNode> = {
  'beall-architecture': BeallArchitecture,
  'beall-safety': BeallSafety,
  'beall-compaction': BeallCompaction,
  'beall-benchmark': BeallBenchmark,
  'chariot-flow': ChariotFlow,
  'chariot-matcher': ChariotMatcher,
  'chariot-recovery': ChariotRecovery,
  'graceful-architecture': GracefulArchitecture,
  'calendar-io': CalendarIO,
  'calendar-accuracy': CalendarAccuracy,
}

export function CaseFigure({ id }: { id: FigureId }) {
  const Figure = registry[id]
  return <Figure />
}
