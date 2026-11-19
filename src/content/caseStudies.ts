// Case-study pages: /work/:slug
// Layout: at a glance, key results, problem, constraints, contributions,
// architecture (diagrams + how it works), decisions and trade-offs, more
// results, limitations and lessons, stack.
//
// Optional sections (constraints, decisions, limitations, media, figures) render
// only when they have content, so nothing on the page is an empty placeholder.

/** Diagram ids. Each one is drawn in src/components/caseStudies/figures.tsx. */
export type FigureId =
  | 'beall-architecture'
  | 'beall-safety'
  | 'beall-compaction'
  | 'beall-benchmark'
  | 'chariot-flow'
  | 'chariot-matcher'
  | 'chariot-recovery'
  | 'graceful-architecture'
  | 'calendar-io'
  | 'calendar-accuracy'

/**
 * A real screenshot or video. Add files under public/work/<slug>/ and list them here.
 * Width and height are required so the page never shifts while the image loads.
 */
export type Media = {
  kind: 'image' | 'video'
  src: string
  alt: string
  caption: string
  width: number
  height: number
  poster?: string
}

export type Result = {
  value?: string
  text: string
  /** What the number was measured on. Always shown next to benchmark-style results. */
  qualifier?: string
  /** Shown in the strip at the top of the page (keep to three). */
  headline?: boolean
}

export type Decision = {
  decision: string
  why: string
  tradeoff: string
  alternative?: string
}

export type CaseStudy = {
  slug: string
  kicker: string
  title: string
  period: string
  summary: string
  glance: { label: string; value: string }[]
  problem: string
  constraints?: string[]
  built: string[]
  figures?: FigureId[]
  how: { title: string; body: string }[]
  decisions?: Decision[]
  results: Result[]
  limitations?: string[]
  stack: string[]
  links: { label: string; href: string }[]
  /** Real screenshots or video. Leave empty until they exist. */
  media?: Media[]
  note?: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'beall',
    kicker: 'UCI Beall Applied Innovation · Software Engineer',
    title: 'An AI avatar platform, built from the ground up',
    period: 'November 2025 to present',
    summary:
      'I build a client-facing AI avatar platform on an early-stage product team: the full stack in TypeScript, React, and AWS, RAG retrieval over a Neo4j knowledge graph, and the systems that make the product safer and faster.',
    glance: [
      { label: 'Role', value: 'Software engineer, full stack' },
      { label: 'Team', value: 'Early-stage product team, working with clients, interns, and contractors' },
      { label: 'Timeline', value: 'November 2025 to present' },
      { label: 'Code', value: 'Private client work, so no public repository' },
    ],
    problem:
      'A client-facing AI application has to be fast, safe, and grounded in the right documents, and non-technical clients have to be able to configure it themselves. The original safety layer ran a full model call for almost every check, which added latency and cost, and long conversations kept growing the context sent to the model.',
    constraints: [
      'Client-facing, so response latency and safety both matter, and a gain in one cannot cost the other.',
      'Non-technical clients need to configure the product themselves, so behavior has to be controllable through plain settings.',
      'Early-stage team: a small team of interns and contractors, with requirements arriving from client feedback.',
      'Client work: product names, client names, and internals stay private, so the diagrams below are generalized.',
    ],
    built: [
      'Built an AI-driven application from the ground up, owning the full stack across TypeScript, React, and AWS (S3, EC2, DynamoDB, Cognito).',
      'Implemented RAG-based document retrieval over a Neo4j knowledge graph and engineered prompt pipelines with the Claude API, plus an S3 ingestion pipeline with OCR and metadata generation.',
      'Designed and implemented a safety and orchestration layer with rule-based checks for clear cases and parallel model checks for the rest.',
      'Built a hybrid conversation-history compaction pipeline: deterministic trimming plus incremental LLM summarization.',
      'Shipped user-facing React/TypeScript features, including an in-app citation viewer with auto-scroll and highlighting, a streaming text-to-speech audio player with scrubbing controls, and a settings and profile overlay.',
      'Wrote AWS Cognito admin scripts (bulk invite, migrate, and delete users) and implemented author and document-type metadata filtering to improve knowledge-base search precision.',
      'Migrated and organized thousands of files from Google Drive and Dropbox into AWS S3 using rclone, and produced reusable migration runbooks.',
      'Authored a PRD for a 5,000-document metadata extraction pipeline using OpenRouter and prompt engineering.',
    ],
    how: [
      {
        title: 'Safety layer: rules first, models in parallel',
        body: "I wrote a design doc first, then rebuilt the orchestration. Clear-cut harmful cases now get stopped by deterministic, rule-based checks in under a millisecond, and the remaining model checks run in parallel. I also added an optional stricter content filter that clients can turn on, and a persona identity block that locks the avatar's intended persona, which helps protect against prompt injection and odd behavior from unexpected input.",
      },
      {
        title: 'Compaction: trim deterministically, summarize incrementally',
        body: 'Long conversations are compacted by a hybrid pipeline. Deterministic trimming handles what can be removed safely, and incremental LLM summarization keeps the rest compact, so anchor facts survive while the context shrinks.',
      },
      {
        title: 'Evaluation before decisions',
        body: "I ran systematic LLM-as-judge evaluations and ablation studies on prompt-layer trimming, persona placement, and identity location, then used the results to inform production prompt-architecture decisions. I also built latency-benchmarking suites for an async memory and retrieval system, isolating write-path latency to sequential LLM calls rather than infrastructure, which redirected the team's optimization work.",
      },
      {
        title: 'Explaining it to the people who use it',
        body: "A client needed to understand the custom configuration settings, things like short versus long responses, or strict versus loose citation behavior. I walked him through the prompt-engineering infrastructure in plain terms and kept the focus on the outcome he would see. He left able to configure the product to match what he wanted, without needing to understand the underlying architecture.",
      },
    ],
    results: [
      { value: '74%', text: 'fewer context tokens from the compaction pipeline.', qualifier: '40-turn benchmark', headline: true },
      { value: '50%', text: 'lower p95 latency from the same pipeline, with 100% anchor-fact recall preserved.', qualifier: 'same 40-turn benchmark', headline: true },
      { value: '<0.1%', text: 'false positives from the safety layer.', qualifier: 'idiom and hyperbole eval suite', headline: true },
      { value: '<1 ms', text: 'for rule-based checks to stop clearly harmful messages.' },
      { value: '177', text: 'real feedback entries turned into 8 issue categories and a P0 to P3 fix list.' },
      { value: '100%', text: 'completion at about 3 second median latency after three Artillery load-test tuning iterations on the chat API.', qualifier: 'load-test scenario' },
    ],
    decisions: [
      {
        decision: 'Deterministic rules first, model checks second',
        why: 'The old safety layer ran a full model call for almost every check, which added latency and cost. Clear-cut cases do not need a model, so rules stop them in under a millisecond and the remaining model checks run in parallel.',
        tradeoff: 'Rules only cover clear-cut cases. Idioms and hyperbole look harmful to simple rules, so I built an idiom and hyperbole eval suite to keep false positives under 0.1%.',
        alternative: 'Keep one model call per check, which is simpler but slower and costlier.',
      },
      {
        decision: 'Hybrid compaction: trim, then summarize incrementally',
        why: 'Deterministic trimming removes what is safe to remove without a model call, and incremental summarization compresses the rest, so context shrinks while the facts that matter survive.',
        tradeoff: 'Summaries are lossy. I measured anchor-fact recall next to token and latency numbers, so a smaller context could not hide dropped facts.',
        alternative: 'Trim only, or summarize everything on every turn.',
      },
      {
        decision: 'Evaluate before changing the prompt architecture',
        why: 'Prompt-layer trimming, persona placement, and identity location all affect behavior, so I ran LLM-as-judge evaluations and ablations before committing production changes. Latency benchmarks on the async memory system also showed write-path time came from sequential LLM calls, not infrastructure, which redirected optimization work.',
        tradeoff: 'An LLM judge is a proxy for quality, not a human rating, and each ablation costs time.',
      },
    ],
    limitations: [
      'The 74% and 50% numbers come from one 40-turn benchmark, and the false-positive rate from one idiom and hyperbole suite. They are controlled measurements, not production-wide results.',
      'LLM-as-judge scores are a proxy for quality, not a substitute for human review.',
      'This is private client work, so the code is not public and the diagrams are generalized.',
      'What I took away: write the design doc before the rebuild, measure before deciding, and ask for help early on unfamiliar tooling.',
    ],
    stack: ['TypeScript', 'React', 'AWS S3', 'EC2', 'DynamoDB', 'Cognito', 'Neo4j', 'Claude API', 'OpenRouter', 'Artillery', 'Docker Compose', 'rclone'],
    links: [],
    figures: ['beall-architecture', 'beall-safety', 'beall-compaction', 'beall-benchmark'],
    media: [],
    note: 'This is client work, so there is no public repository, and product and client names are intentionally left out.',
  },
  {
    slug: 'chariot',
    kicker: 'Solo project · Live since September 2026',
    title: 'Chariot: a club rides scheduler that runs itself',
    period: 'July 2026 to present',
    summary:
      'A Discord bot I built and run solo that schedules weekly club rides, matching riders and drivers for up to 20 users every week.',
    glance: [
      { label: 'Role', value: 'Solo: designed, built, and operate it' },
      { label: 'Users', value: 'Up to 20 club members coordinated each week' },
      { label: 'Timeline', value: 'July 2026 to present' },
      { label: 'Code', value: 'Public on GitHub' },
    ],
    problem:
      'Clubs needed a reliable way to coordinate weekly rides: who needs a ride, who can drive, and how to assign people fairly without double-booking or dropping people when something fails.',
    constraints: [
      'A weekly cadence with real people: a missed or duplicated message is visible to everyone in the chat.',
      'Discord is where members already are, so registration and ride requests happen there.',
      'Google Sheets has API rate limits and no transactions, so writes need retries and every write is scoped to a club ID.',
      'One developer: I build it, run it, and fix it, so behavior has to be easy to test and easy to trust.',
    ],
    built: [
      'A live Discord bot on a per-club Google Sheets data model. Members register and request rides in Discord.',
      'A deterministic greedy matcher that assigns riders to drivers: same housing first, then cached or haversine distance, then zone priority, with stable ID tie-breaks.',
      'An Apps Script lock that runs the weekly assignment and reconciles prior assignments instead of duplicating them.',
      'An 8-tab data model (clubs, members, drivers, zones, ride requests, assignments, broadcasts, schedules), with every write scoped to a club ID.',
      'Written from a PRD, with an AGENTS.md working agreement for AI coding agents, and hosted on Render.',
    ],
    how: [
      {
        title: 'The matcher is a pure function',
        body: 'I treated the matcher as a pure function with no external I/O, so the same input always produces the same plan. That makes it easy to test and easy to trust.',
      },
      {
        title: 'Failure-safe scheduling',
        body: 'Claim-before-send idempotency means a crash never double-posts. Capped retries, missed-job catch-up, and jittered exponential backoff on Sheets rate limits cover the rest: if the bot restarts, if Sheets rate-limits us, or if a job is missed, the system catches up without sending a message twice.',
      },
      {
        title: 'Nobody silently disappears',
        body: "Riders who can't be placed get an explicit unassigned reason instead of dropping out of the plan.",
      },
    ],
    results: [
      { value: 'Weekly', text: 'live since September 2026, coordinating riders and drivers for up to 20 users every week.', headline: true },
      { value: '90+', text: 'automated tests (92 test cases across 8 suites): assignment, scheduler, driver sign-up, broadcasts, service, bot, Sheets, and zones, using in-memory Discord and Sheets doubles.', headline: true },
      { value: '8', text: 'tab data model, with every write scoped to a club ID.', headline: true },
    ],
    decisions: [
      {
        decision: 'Google Sheets as the first data store',
        why: 'The first goal was a working weekly flow, and a shared Sheet is a lightweight store that organizers can open and read directly. The store sits behind the same interface as a Postgres store, so it can be swapped later.',
        tradeoff: 'Sheets has rate limits and no transactions. I handle that with capped retries and jittered exponential backoff, and I scope every write to a club ID.',
        alternative: 'Start with Postgres, which is sturdier but slower to a first working version.',
      },
      {
        decision: 'A deterministic greedy matcher, written as a pure function',
        why: 'Riders are assigned by same housing first, then distance, then zone priority, with stable ID tie-breaks, and the function does no I/O. The same input always gives the same plan, so it is easy to test and easy to explain to a club.',
        tradeoff: 'Greedy assignment is not globally optimal. I chose predictable and explainable over the best possible packing, and anyone who cannot be placed gets an explicit unassigned reason.',
        alternative: 'An optimization or routing solver. Detour-cost routing is out of scope for now.',
      },
      {
        decision: 'Claim before send',
        why: 'A message is marked as claimed before it is posted, so a crash or restart cannot post it twice. Missed scheduled jobs catch up when the bot is back, as long as it is still the same week.',
        tradeoff: 'This favors never duplicating a message over guaranteeing every message goes out on the first try. The catch-up run covers most of that gap.',
      },
    ],
    limitations: [
      'The assignment is greedy, so it is predictable but not globally optimal.',
      'The long-term connectors (Postgres, Telnyx SMS, Google Calendar, driving distances) are built and tested against stand-ins, but they are off by default and no data has been migrated off the Sheet.',
      'Not built yet: +1 guests, standing rides, waitlist autofill, detour-cost routing, and self-service club onboarding.',
      'What I took away: treat failure cases as first-class features. Idempotency and explicit unassigned reasons mattered as much as the matching rules.',
    ],
    stack: ['TypeScript', 'Node.js', 'discord.js', 'Google Sheets API', 'Google Apps Script', 'Luxon', 'Render'],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/Chariot' },
      // Returned 404 when checked on 2026-11-16. Uncomment once the dashboard is deployed again.
      // { label: 'Live dashboard', href: 'https://chariot-mu.vercel.app' },
    ],
    figures: ['chariot-flow', 'chariot-matcher', 'chariot-recovery'],
    media: [],
  },
  {
    slug: 'graceful',
    kicker: 'Solo project · June to September 2026',
    title: 'Graceful: scheduling and setlists for music teams',
    period: 'June 2026 to September 2026',
    summary:
      'A Next.js app I built for scheduling, setlists, and music coordination for worship teams, with Planning Center-style capabilities.',
    glance: [
      { label: 'Role', value: 'Solo: product, full stack, and testing' },
      { label: 'Timeline', value: 'June to September 2026' },
      { label: 'Stack', value: 'Next.js, TypeScript, Supabase, Clerk' },
      { label: 'Links', value: 'Public repo and live demo' },
    ],
    problem:
      'Worship teams need a straightforward way to schedule who is playing, manage setlists and songs, and share documents, without paying for a full church-management platform.',
    constraints: [
      'It handles real accounts, invitations, and schedules, so authentication, authorization, and abuse protection had to be designed in from the start.',
      'Development, staging, and production each need their own credentials, with no shared production secrets.',
      'Solo build over a few months, so I leaned on managed services (Clerk, Supabase, Vercel) instead of writing infrastructure.',
    ],
    built: [
      'A TypeScript and Next.js app that runs with Bun.',
      "Auth with Clerk and Google OAuth. Data goes through the app's own Next.js API routes and Supabase, with the auto-generated PostgREST API turned off.",
      'A dashboard, weekly scheduling, invitations, conflict detection, setlists and songs, instrument lists, notifications, and profiles.',
      'A document library on Cloudflare R2, and Google Calendar integration.',
      'Installable as a PWA.',
    ],
    how: [
      {
        title: 'One path to the data',
        body: "Every read and write goes through the app's own API routes, validated with Zod, rather than exposing the database's auto-generated API to the browser.",
      },
      {
        title: 'Tested like a product',
        body: 'Jest unit tests, Playwright end-to-end tests, a load-test harness, and separate development, staging, and production environments.',
      },
    ],
    results: [
      { text: 'A public live demo, linked above.' },
      { text: 'Jest unit tests, Playwright end-to-end tests, and RLS integration tests in the repo.' },
      { text: 'A load-test harness with explicit targets (p95 under 500 ms at 100 concurrent users) for the staging environment.' },
      { text: 'Development, staging, and production environments, with staging as the gate before production.' },
    ],
    decisions: [
      {
        decision: 'Route every database operation through the app’s API handlers',
        why: 'Supabase’s auto-generated REST API is turned off. Every read and write goes through Next.js API routes that validate input with Zod and enforce business rules before touching the database.',
        tradeoff: 'More server code to write and test than querying from the browser. The upside is one place to enforce rules, and the database is never exposed directly.',
        alternative: 'Query Supabase from the client and rely on row-level security alone.',
      },
      {
        decision: 'Keep the service-role key out of anything a user can call',
        why: 'The service-role key bypasses row-level security, so it is allowed only in trusted migration and seed scripts. A check script verifies it never appears in app routes or library code, and a separate scan checks the git history for committed secrets.',
        tradeoff: 'Some tables rely on the disabled REST API as their database-layer guard, so that rule has to stay enforced. The check script and the secret scan help enforce that.',
      },
      {
        decision: 'Authentication at the edge, roles in the handlers',
        why: 'Clerk middleware gates every request that is not on a short public-route list, adds rate limiting, and sets a nonce-based content security policy. Role checks then happen in the route handlers.',
        tradeoff: 'Two layers to keep consistent. Public routes are an explicit allowlist, so a new route is private by default.',
      },
      {
        decision: 'Three isolated environments with staging as a gate',
        why: 'Variables keep the same names in every environment and only the values change, using Vercel’s per-environment scoping. Playwright runs against staging, and production deploys wait for staging to pass.',
        tradeoff: 'More setup up front, in exchange for catching problems before they reach real users.',
      },
    ],
    limitations: [
      'It is built to a Phase 1 scope: scheduling, setlists, and documents are in, and the broader requirements document describes more than is built.',
      'The load-test harness defines targets and a method; its numbers describe the staging environment, not real production traffic.',
      'What I took away: decide the security boundary early. Putting all data access behind API routes made validation, testing, and review simpler.',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'Bun', 'Supabase', 'Clerk', 'Zod', 'Google OAuth', 'Cloudflare R2', 'Jest', 'Playwright'],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/Graceful' },
      { label: 'Live demo', href: 'https://graceful-wheat.vercel.app' },
    ],
    figures: ['graceful-architecture'],
    media: [],
  },
  {
    slug: 'ai-calendar',
    kicker: '4-person team · March to June 2026',
    title: 'AI Calendar Assistant: everyday language in, structured events out',
    period: 'March 2026 to June 2026',
    summary:
      'A full-stack app that turns natural-language event descriptions into structured calendar entries, built with a 4-person team and measured with a 500-example eval harness.',
    glance: [
      { label: 'Role', value: '4-person team; frontend design, API route integration, end-to-end testing, and the evaluation harness' },
      { label: 'Timeline', value: 'March to June 2026' },
      { label: 'Model', value: 'Flan-T5-Base, fine-tuned on 1,430 examples' },
      { label: 'Code', value: 'Public on GitHub' },
    ],
    problem:
      'People describe events in everyday language. A calendar needs structured fields: time, duration, recurrence, and date. Getting those fields right, especially dates, is the hard part.',
    constraints: [
      'Every field has to be exactly right to be useful, since a calendar entry with a wrong date is worse than none.',
      'Flan-T5-Base is a small model, so it is fine-tuned for this one task instead of relying on prompting alone.',
      'Training data had to be generated, not collected: 1,430 Claude-generated examples.',
    ],
    built: [
      'A full-stack application in React/Next.js and Flask that converts natural-language text into calendar entries. I did much of the frontend design and the linking of the frontend to the API routes.',
      'Flan-T5-Base, fine-tuned on 1,430 Claude-generated examples.',
      'Rule-based post-processing for dates, durations, and recurrence.',
      'Extensive end-to-end testing of the full application.',
      'A 500-example evaluation harness, which I helped build.',
    ],
    how: [
      {
        title: 'Model plus rules',
        body: 'The fine-tuned model produces the structured fields, and rule-based post-processing cleans up dates, durations, and recurrence on top.',
      },
      {
        title: 'Measure, then decide',
        body: 'The eval harness scored each field separately. That made it clear that recurrence and time were strong, and that date reasoning was the main bottleneck.',
      },
    ],
    results: [
      { value: '95.6%', text: 'recurrence accuracy.', qualifier: '500-example eval harness, exact match', headline: true },
      { value: '93.8%', text: 'time accuracy.', qualifier: 'same harness', headline: true },
      { value: '32.2%', text: 'date accuracy, which identified date reasoning as the key bottleneck.', qualifier: 'same harness', headline: true },
      { value: '1,430', text: 'Claude-generated examples used to fine-tune Flan-T5-Base.' },
    ],
    decisions: [
      {
        decision: 'A fine-tuned model plus rule-based post-processing',
        why: 'The model produces the structured fields, and deterministic rules clean up dates, durations, and recurrence, which should never vary in format.',
        tradeoff: 'Rules add code to maintain and cannot fix wrong reasoning. Date accuracy stayed at 32.2% even with post-processing.',
      },
      {
        decision: 'Score each field separately, with exact match',
        why: 'The harness compares each field of the prediction to the expected value. One overall score would have hidden that recurrence and time were strong while dates were weak.',
        tradeoff: 'Exact match is strict: a correct value in a different format counts as wrong. It is a conservative measure, and it points straight at what to fix.',
      },
    ],
    limitations: [
      'Date accuracy is 32.2%, so date reasoning is the main unsolved problem.',
      'The training examples were generated with Claude rather than collected from real users, so the model may not match how people actually write.',
      'The scores are exact-match per field on one 500-example set, so they are a measure of this harness, not of every possible input.',
      'What I took away: build the evaluation first. Per-field results told the team where to spend its time.',
    ],
    stack: ['React', 'Next.js', 'Flask', 'Python', 'Flan-T5', 'Claude API'],
    links: [{ label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/NLP-Calendar' }],
    figures: ['calendar-io', 'calendar-accuracy'],
    media: [],
  },
]

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug)
}
