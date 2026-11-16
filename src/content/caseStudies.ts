// Case-study pages: /work/:slug
// Layout: problem, what I built, how it works, results, stack, links, assets.

export type CaseStudy = {
  slug: string
  kicker: string
  title: string
  period: string
  summary: string
  problem: string
  built: string[]
  how: { title: string; body: string }[]
  results: { value?: string; text: string }[]
  stack: string[]
  links: { label: string; href: string }[]
  /** Labels for media that has not been supplied yet. Rendered as clear placeholders. */
  assets: string[]
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
    problem:
      'A client-facing AI application has to be fast, safe, and grounded in the right documents, and non-technical clients have to be able to configure it themselves. The original safety layer ran a full model call for almost every check, which added latency and cost, and long conversations kept growing the context sent to the model.',
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
      { value: '74%', text: 'fewer context tokens from the compaction pipeline, on a 40-turn benchmark.' },
      { value: '50%', text: 'lower p95 latency from the same pipeline on the same benchmark, with 100% anchor-fact recall preserved.' },
      { value: '<0.1%', text: 'false positives from the safety layer on an idiom and hyperbole eval suite.' },
      { value: '<1 ms', text: 'for rule-based checks to stop clearly harmful messages.' },
      { value: '177', text: 'real feedback entries turned into 8 issue categories and a P0 to P3 fix list.' },
      { value: '100%', text: 'completion at about 3 second median latency after three Artillery load-test tuning iterations on the chat API.' },
    ],
    stack: ['TypeScript', 'React', 'AWS S3', 'EC2', 'DynamoDB', 'Cognito', 'Neo4j', 'Claude API', 'OpenRouter', 'Artillery', 'Docker Compose', 'rclone'],
    links: [],
    assets: ['Architecture diagram', 'Citation viewer screenshot', 'Settings UI screenshot'],
    note: 'This is client work, so there is no public repository, and product and client names are intentionally left out.',
  },
  {
    slug: 'chariot',
    kicker: 'Solo project · Live since September 2026',
    title: 'Chariot: a club rides scheduler that runs itself',
    period: 'July 2026 to present',
    summary:
      'A Discord bot I built and run solo that schedules weekly club rides, matching riders and drivers for up to 20 users every week.',
    problem:
      'Clubs needed a reliable way to coordinate weekly rides: who needs a ride, who can drive, and how to assign people fairly without double-booking or dropping people when something fails.',
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
      { value: 'Weekly', text: 'live since September 2026, coordinating riders and drivers for up to 20 users every week.' },
      { value: '90+', text: 'automated tests (92 test cases across 8 suites): assignment, scheduler, driver sign-up, broadcasts, service, bot, Sheets, and zones, using in-memory Discord and Sheets doubles.' },
      { value: '8', text: 'tab data model, with every write scoped to a club ID.' },
    ],
    stack: ['TypeScript', 'Node.js', 'discord.js', 'Google Sheets API', 'Google Apps Script', 'Luxon', 'Render'],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/Chariot' },
      // Returned 404 when checked on 2026-11-16. Uncomment once the dashboard is deployed again.
      // { label: 'Live dashboard', href: 'https://chariot-mu.vercel.app' },
    ],
    assets: ['Discord screenshot: registration or weekly assignment', 'Short demo video of a weekly run'],
  },
  {
    slug: 'graceful',
    kicker: 'Solo project · June to September 2026',
    title: 'Graceful: scheduling and setlists for music teams',
    period: 'June 2026 to September 2026',
    summary:
      'A Next.js app I built for scheduling, setlists, and music coordination for worship teams, with Planning Center-style capabilities.',
    problem:
      'Worship teams need a straightforward way to schedule who is playing, manage setlists and songs, and share documents, without paying for a full church-management platform.',
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
      { text: 'A public live demo, linked below.' },
      { text: 'Jest, Playwright, and a load-test harness in the repo.' },
      { text: 'Development, staging, and production environments.' },
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'Bun', 'Supabase', 'Clerk', 'Zod', 'Google OAuth', 'Cloudflare R2', 'Jest', 'Playwright'],
    links: [
      { label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/Graceful' },
      { label: 'Live demo', href: 'https://graceful-wheat.vercel.app' },
    ],
    assets: ['Dashboard screenshot', 'Setlist screenshot', 'Weekly schedule screenshot'],
  },
  {
    slug: 'ai-calendar',
    kicker: '4-person team · March to June 2026',
    title: 'AI Calendar Assistant: everyday language in, structured events out',
    period: 'March 2026 to June 2026',
    summary:
      'A full-stack app that turns natural-language event descriptions into structured calendar entries, built with a 4-person team and measured with a 500-example eval harness.',
    problem:
      'People describe events in everyday language. A calendar needs structured fields: time, duration, recurrence, and date. Getting those fields right, especially dates, is the hard part.',
    built: [
      'A full-stack application in React/Next.js and Flask that converts natural-language text into calendar entries.',
      'Flan-T5-Base, fine-tuned on 1,430 Claude-generated examples.',
      'Rule-based post-processing for dates, durations, and recurrence.',
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
      { value: '95.6%', text: 'recurrence accuracy on the 500-example eval harness.' },
      { value: '93.8%', text: 'time accuracy on the same harness.' },
      { value: '32.2%', text: 'date accuracy, which identified date reasoning as the key bottleneck.' },
      { value: '1,430', text: 'Claude-generated examples used to fine-tune Flan-T5-Base.' },
    ],
    stack: ['React', 'Next.js', 'Flask', 'Python', 'Flan-T5', 'Claude API'],
    links: [{ label: 'GitHub repo', href: 'https://github.com/Jam3sl1u/NLP-Calendar' }],
    assets: ['App screenshot: a natural-language input and the structured event it produced', 'Eval-results graphic'],
  },
]

export function getCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug)
}
