// Original illustrations for each featured project.
// These are abstract graphics, not product screenshots. Real screenshots or
// video can replace them later: see ProjectShowcase (`media` slot).
import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ProjectVisual } from '../../content/projects'

function Frame({ children, className = '', label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-line bg-elev transition-colors duration-500 group-hover/project:border-line-strong ${className}`}>
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden="true" />
      {children}
      <figcaption className="eyebrow absolute bottom-3 left-4 !text-[0.62rem]">{label} · Illustration</figcaption>
    </figure>
  )
}

/* ---------- 01 Chariot: riders, drivers, routes ---------- */
function ChariotVisual() {
  const routes = [
    'M70 78 C 110 58, 130 54, 162 60 S 222 96, 252 112 S 312 132, 342 142 S 402 170, 432 196',
    'M60 302 C 90 292, 120 282, 152 272 S 212 240, 242 230 S 372 206, 432 196',
    'M252 348 C 282 344, 306 334, 332 320 S 402 250, 432 196',
  ]
  const riders = [
    [162, 60], [252, 112], [342, 142], [152, 272], [242, 230], [332, 320],
  ]
  const drivers = [
    [70, 78, 'D1'], [60, 302, 'D2'], [252, 348, 'D3'],
  ] as const
  return (
    <Frame className="aspect-[4/3]" label="Riders matched to drivers">
      <svg viewBox="0 0 520 390" className="relative size-full" aria-hidden="true">
        {/* Zones */}
        <rect x="28" y="28" width="250" height="150" rx="18" fill="none" stroke="var(--line-strong)" strokeDasharray="3 7" />
        <rect x="28" y="214" width="250" height="150" rx="18" fill="none" stroke="var(--line-strong)" strokeDasharray="3 7" />
        <text x="44" y="166" fontSize="10" fontFamily="var(--font-mono)" fill="var(--faint)">ZONE A</text>
        <text x="44" y="234" fontSize="10" fontFamily="var(--font-mono)" fill="var(--faint)">ZONE B</text>

        {/* Routes */}
        {routes.map((d, i) => (
          <g key={d} fill="none">
            <path d={d} stroke="var(--line-strong)" strokeWidth="1" />
            <path
              d={d}
              stroke="var(--accent)"
              strokeWidth="1.6"
              strokeDasharray="6 8"
              strokeLinecap="round"
              className="anim-dash opacity-60 transition-opacity duration-500 group-hover/project:opacity-100"
              style={{ animationDelay: `${i * -0.5}s` }}
            />
          </g>
        ))}

        {/* Riders */}
        {riders.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" fill="var(--bg-elev)" stroke="var(--fg)" strokeWidth="1.2" />
            <circle cx={x} cy={y} r="2.5" fill="var(--fg)" />
          </g>
        ))}

        {/* Unassigned rider: never silently dropped */}
        <g>
          <circle cx="398" cy="330" r="9" fill="var(--bg-elev)" stroke="var(--faint)" strokeWidth="1.2" strokeDasharray="3 3" />
          <text x="414" y="327" fontSize="10" fontFamily="var(--font-mono)" fill="var(--faint)">unassigned</text>
          <text x="414" y="340" fontSize="10" fontFamily="var(--font-mono)" fill="var(--faint)">reason logged</text>
        </g>

        {/* Drivers */}
        {drivers.map(([x, y, label]) => (
          <g key={label}>
            <rect x={x - 15} y={y - 15} width="30" height="30" rx="8" fill="var(--fg)" />
            <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="var(--font-mono)" fill="var(--bg)">
              {label}
            </text>
          </g>
        ))}

        {/* Destination */}
        <g>
          <circle cx="432" cy="196" r="26" fill="var(--accent)" opacity="0.12" />
          <circle cx="432" cy="196" r="13" fill="var(--accent)" />
          <circle cx="432" cy="196" r="4" fill="var(--accent-ink)" />
          <text x="432" y="242" textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill="var(--muted)">MEETING</text>
        </g>
      </svg>
    </Frame>
  )
}

/* ---------- 02 Graceful: weekly schedule + setlist ---------- */
function GracefulVisual() {
  const rows = ['Keys', 'Guitar', 'Bass', 'Drums', 'Vocals']
  // 1 = scheduled, 2 = highlighted, 3 = conflict, 0 = open
  const grid = [
    [1, 0, 1, 2],
    [0, 1, 1, 0],
    [1, 1, 0, 1],
    [2, 0, 3, 1],
    [1, 2, 1, 0],
  ]
  const cell = ['border-line bg-transparent', 'border-line-strong bg-fg/10', 'border-accent/60 bg-accent/25', 'border-dashed border-line-strong bg-transparent']
  const setlist = [
    ['01', 'w-[72%]', 'G'],
    ['02', 'w-[54%]', 'D'],
    ['03', 'w-[80%]', 'E'],
    ['04', 'w-[46%]', 'A'],
  ]
  return (
    <Frame className="aspect-[4/3]" label="Schedule and setlist">
      <div className="absolute inset-0 p-[6%]" aria-hidden="true">
        {/* Schedule */}
        <div className="w-[68%] rounded-xl border border-line bg-surface p-[4%] shadow-2xl shadow-black/20 transition-transform duration-700 ease-out group-hover/project:-translate-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">Weekly schedule</span>
            <span className="flex gap-1">
              <span className="size-1.5 rounded-full bg-line-strong" />
              <span className="size-1.5 rounded-full bg-line-strong" />
            </span>
          </div>
          <div className="mt-3 grid grid-cols-[3.2rem_repeat(4,1fr)] items-center gap-1.5">
            <span />
            {['W1', 'W2', 'W3', 'W4'].map((w) => (
              <span key={w} className="text-center font-mono text-[0.58rem] text-faint">{w}</span>
            ))}
            {rows.map((row, r) => (
              <div key={row} className="contents">
                <span className="truncate text-[0.68rem] text-muted">{row}</span>
                {grid[r].map((v, c) => (
                  <span key={c} className={`relative h-5 rounded-[5px] border sm:h-6 ${cell[v]}`}>
                    {v === 3 && <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.6rem] text-accent">!</span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Setlist */}
        <div className="absolute bottom-[13%] right-[6%] w-[46%] rounded-xl border border-line-strong bg-surface p-[3.5%] shadow-2xl shadow-black/30 transition-transform duration-700 ease-out group-hover/project:-translate-x-1 group-hover/project:translate-y-1">
          <span className="font-mono text-[0.6rem] uppercase tracking-widest text-faint">Setlist</span>
          <ul className="mt-2.5 space-y-2">
            {setlist.map(([n, w, key]) => (
              <li key={n} className="flex items-center gap-2">
                <span className="font-mono text-[0.58rem] text-faint">{n}</span>
                <span className="flex-1">
                  <span className={`block h-1.5 rounded-full bg-fg/25 ${w}`} />
                </span>
                <span className="flex size-5 items-center justify-center rounded border border-accent/50 font-mono text-[0.58rem] text-accent">{key}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- 03 AI Calendar: language in, structure out ---------- */
function CalendarVisual() {
  const fields = [
    ['title', 'Team sync'],
    ['time', '15:00'],
    ['duration', '45 min'],
    ['recurrence', 'WEEKLY · TU'],
  ]
  const evals = [
    ['Recurrence', 95.6, false],
    ['Time', 93.8, false],
    ['Date', 32.2, true],
  ] as const
  return (
    <Frame label="Natural language to structured event">
      <div className="relative grid items-stretch gap-4 p-5 pb-12 sm:p-8 sm:pb-12 lg:grid-cols-[1.15fr_auto_1fr_1fr] lg:gap-6" aria-hidden="true">
        {/* Input */}
        <div className="flex flex-col justify-between rounded-xl border border-line bg-surface p-5">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">Input · everyday language</span>
          <p className="serif-accent mt-6 text-[1.65rem] leading-[1.15] text-fg">
            &ldquo;Team sync every Tuesday at 3pm for 45 minutes&rdquo;
            <span className="anim-blink ml-0.5 inline-block h-[1em] w-px translate-y-[0.15em] bg-accent" />
          </p>
        </div>

        {/* Pipeline */}
        <div className="flex items-center justify-center gap-2 lg:flex-col">
          <span className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.62rem] text-muted">Flan-T5-Base</span>
          <ArrowRight className="size-4 rotate-90 text-accent transition-transform duration-500 group-hover/project:translate-y-0.5 lg:rotate-0 lg:group-hover/project:translate-x-0.5 lg:group-hover/project:translate-y-0" />
          <span className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[0.62rem] text-muted">+ rules</span>
        </div>

        {/* Structured output */}
        <div className="rounded-xl border border-accent/40 bg-surface p-5">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">Output · structured event</span>
          <dl className="mt-4 space-y-2.5 font-mono text-[0.78rem]">
            {fields.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 last:border-b-0 last:pb-0">
                <dt className="text-faint">{k}</dt>
                <dd className="text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Eval harness */}
        <div className="rounded-xl border border-line bg-surface p-5">
          <span className="font-mono text-[0.62rem] uppercase tracking-widest text-faint">Eval · 500 examples</span>
          <ul className="mt-4 space-y-3.5">
            {evals.map(([name, value, weak]) => (
              <li key={name}>
                <div className="flex items-baseline justify-between text-[0.8rem]">
                  <span className="text-muted">
                    {name}
                    {weak && <span className="ml-2 font-mono text-[0.6rem] uppercase tracking-wider text-faint">bottleneck</span>}
                  </span>
                  <span className="font-mono text-fg">{value}%</span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-fg/10">
                  <div className={`h-full rounded-full ${weak ? 'bg-fg/40' : 'bg-accent'}`} style={{ width: `${value}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  )
}

/* ---------- 04 Fashion-MNIST: pixels in, class out ---------- */
const shirt = [
  '..............',
  '...###..###...',
  '..##########..',
  '.############.',
  '##############',
  '###.######.###',
  '.#..######..#.',
  '....######....',
  '....######....',
  '....######....',
  '....######....',
  '....######....',
  '....######....',
  '..............',
]

function MnistVisual() {
  // Verified results only. kNN is 82.5% accuracy (17.5% test error at k=10).
  const bars = [
    ['SVM · RBF', 86, true],
    ['MLP · ReLU', 83, false],
    ['kNN · k=10', 82.5, false],
    ['MLP · tanh', 72, false],
  ] as const
  return (
    <Frame className="aspect-[4/3]" label="Test accuracy by model">
      <div className="absolute inset-0 grid grid-cols-[auto_1fr] items-center gap-[6%] p-[7%] pb-[12%]" aria-hidden="true">
        <div>
          <div className="grid w-[7.5rem] grid-cols-[repeat(14,1fr)] gap-px rounded-lg border border-line bg-surface p-2 sm:w-36">
            {shirt.flatMap((row, r) =>
              row.split('').map((ch, c) => (
                <span
                  key={`${r}-${c}`}
                  className="aspect-square rounded-[1px] bg-fg transition-opacity duration-700"
                  style={{ opacity: ch === '#' ? 0.45 + (((r * 7 + c * 13) % 5) / 5) * 0.5 : 0.05 }}
                />
              )),
            )}
          </div>
          <p className="mt-2.5 text-center font-mono text-[0.6rem] uppercase tracking-widest text-faint">28 × 28 · 10 classes</p>
        </div>
        <ul className="space-y-3.5">
          {bars.map(([name, value, best]) => (
            <li key={name}>
              <div className="flex items-baseline justify-between font-mono text-[0.7rem]">
                <span className={best ? 'text-fg' : 'text-muted'}>{name}</span>
                <span className={best ? 'text-accent' : 'text-muted'}>{value}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-fg/10">
                <div
                  className={`h-full origin-left rounded-full transition-transform duration-700 ease-out group-hover/project:scale-x-100 ${best ? 'bg-accent' : 'bg-fg/45'} scale-x-[0.97]`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  )
}

export function ProjectVisualFor({ visual }: { visual: ProjectVisual }) {
  switch (visual) {
    case 'chariot':
      return <ChariotVisual />
    case 'graceful':
      return <GracefulVisual />
    case 'calendar':
      return <CalendarVisual />
    case 'mnist':
      return <MnistVisual />
  }
}
