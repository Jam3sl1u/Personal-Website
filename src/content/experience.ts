// Professional experience. Wording comes from the approved content kit.
// Public-safety rules: no internal product names, no client names, "clients" plural.

export type Metric = { value: string; label: string; qualifier: string; context: string }
export type FocusArea = { id: string; title: string; body: string; tags: string[] }

export const beall = {
  slug: 'beall',
  role: 'Software Engineer',
  company: 'UCI Beall Applied Innovation',
  location: 'Irvine, CA',
  period: 'Nov 2025 to present',
  periodLong: 'November 2025 to present',
  oneLiner:
    'I build a client-facing AI avatar platform from the ground up: the full stack on AWS, RAG retrieval, LLM orchestration, and a safety layer. I work directly with clients to turn requirements into shipped features.',
  /** Always visible on the home page, so a recruiter sees the scope without opening any tab. */
  highlights: [
    'Own the full stack across TypeScript, React, and AWS (S3, EC2, DynamoDB, Cognito).',
    'RAG retrieval over a Neo4j knowledge graph, prompt pipelines on the Claude API, and an S3 ingestion pipeline with OCR.',
    'Rebuilt the safety and orchestration layer from a design doc: rules for clear cases, parallel model checks for the rest.',
    'Built a hybrid context-compaction pipeline: deterministic trimming plus incremental LLM summarization.',
    'Run LLM-as-judge evals, ablations, and load tests, and work with clients as the technical liaison.',
  ],
  metrics: [
    {
      value: '74%',
      label: 'fewer context tokens',
      qualifier: '40-turn benchmark',
      context:
        'Hybrid conversation-history compaction pipeline, on a 40-turn benchmark, while preserving 100% anchor-fact recall.',
    },
    {
      value: '50%',
      label: 'lower p95 latency',
      qualifier: 'same 40-turn benchmark',
      context: 'The same compaction pipeline, measured on the same 40-turn benchmark.',
    },
    {
      value: '<0.1%',
      label: 'false positives',
      qualifier: 'idiom and hyperbole eval suite',
      context: 'Safety and orchestration layer, measured on an idiom and hyperbole eval suite.',
    },
  ] satisfies Metric[],
  focus: [
    {
      id: 'safety',
      title: 'Safety and orchestration',
      body: 'The safety layer used to run a full model call for almost every check, which added latency and cost. I wrote a design doc first, then rebuilt the orchestration. Clear-cut harmful cases now get stopped by deterministic, rule-based checks in under a millisecond, and the remaining model checks run in parallel. On an idiom and hyperbole eval suite, false positives stayed under 0.1%.',
      tags: ['Rule-based checks', 'Parallel model checks', 'Design doc first'],
    },
    {
      id: 'compaction',
      title: 'Context compaction',
      body: 'I built a hybrid conversation-history compaction pipeline: deterministic trimming plus incremental LLM summarization. On a 40-turn benchmark it cut context tokens 74% and p95 latency 50% while preserving 100% anchor-fact recall.',
      tags: ['Deterministic trimming', 'Incremental summarization', '40-turn benchmark'],
    },
    {
      id: 'rag',
      title: 'Retrieval and pipelines',
      body: 'I implemented RAG-based document retrieval over a Neo4j knowledge graph and engineered prompt pipelines with the Claude API, plus an S3 ingestion pipeline with OCR and metadata generation. Author and document-type metadata filtering improved knowledge-base search precision.',
      tags: ['Neo4j', 'Claude API', 'S3 ingestion + OCR'],
    },
    {
      id: 'evals',
      title: 'Evaluation and performance',
      body: "I ran systematic LLM-as-judge evaluations and ablation studies on prompt-layer trimming, persona placement, and identity location, then used the results to inform production prompt-architecture decisions. I also load-tested the chat API with Artillery across three tuning iterations, reaching 100% completion at about 3 second median latency.",
      tags: ['LLM-as-judge', 'Ablation studies', 'Artillery'],
    },
    {
      id: 'clients',
      title: 'Client-facing product work',
      body: 'I serve as technical liaison to client stakeholders: translating requirements into features, explaining AI configuration settings to non-technical users, and turning 177 real feedback entries into 8 issue categories and a P0 to P3 fix list. Client feedback I relayed led to an onboarding flow for source documents.',
      tags: ['Requirements to features', '177 feedback entries', 'Demos'],
    },
  ] satisfies FocusArea[],
  bullets: [
    'Built an AI-driven application from the ground up, owning the full stack across TypeScript, React, and AWS (S3, EC2, DynamoDB, Cognito).',
    'Implemented RAG-based document retrieval over a Neo4j knowledge graph and engineered prompt pipelines with the Claude API, plus an S3 ingestion pipeline with OCR and metadata generation.',
    'Designed and implemented a safety and orchestration layer that uses rule-based checks for clear cases (stopping clearly harmful messages in under a millisecond), runs remaining model checks in parallel, and holds false positives under 0.1% on an idiom and hyperbole eval suite.',
    'Built a hybrid conversation-history compaction pipeline (deterministic trimming plus incremental LLM summarization) that cut context tokens 74% and p95 latency 50% on a 40-turn benchmark while preserving 100% anchor-fact recall.',
  ],
  stack: ['TypeScript', 'React', 'AWS', 'Neo4j', 'Claude API', 'RAG', 'DynamoDB', 'Cognito'],
} as const

export type Role = {
  id: string
  role: string
  company: string
  location: string
  period: string
  oneLiner: string
  bullets: string[]
  story?: string
  compact?: boolean
  note?: string
}

export const roles: Role[] = [
  {
    id: 'handshake',
    role: 'Generative AI Analyst',
    company: 'Handshake',
    location: 'Remote, contract',
    period: 'Oct 2025 to present',
    compact: true,
    oneLiner:
      'I evaluate multimodal model outputs, especially image recognition, and write structured feedback that other teams can use.',
    bullets: [
      'Evaluate multimodal AI model outputs on image recognition tasks, judging object identification, scene descriptions, and visual reasoning for accuracy against detailed rubrics.',
      'Identify and categorize model failure patterns such as misidentified objects, hallucinated details, and missed visual context, and produce structured feedback for model developers.',
      'Compare and rank competing model responses to the same image prompt, with written justifications for each rating.',
    ],
  },
  {
    id: 'integem',
    role: 'Technical Instructor Intern',
    company: 'Integem Inc.',
    location: 'Tustin, CA',
    period: 'Jun 2025 to Aug 2025',
    oneLiner:
      'I taught Python, critical thinking, and AI/AR tools to a non-technical student audience, and I stayed in close contact with parents.',
    bullets: [
      'Taught Python programming and critical-thinking concepts to non-technical students, breaking complex ideas into accessible lessons.',
      'Completed in-depth training in AR concepts, Adobe AI tools, and AI-based image recognition, then taught AI and AR tools to students.',
      'Led technical instruction, monitored student progress, and maintained ongoing communication with parents.',
    ],
    story:
      'I learned to start with the outcome the student cared about, then work backward to the concept. That same habit shows up in my client work now: explain the mechanism only as far as it helps someone make a good decision.',
  },
  {
    id: 'tutor',
    role: 'Undergraduate Lab Tutor / Learning Assistant',
    company: 'UC Irvine, Donald Bren School of ICS',
    location: 'Irvine, CA',
    period: 'Sep 2024 to Dec 2024',
    oneLiner:
      'I mentored students through design and development lab work in Python, including debugging, refactoring, and software design.',
    bullets: [
      'Mentored students through design and development lab work, guiding refactoring, debugging, and optimization.',
      'Reinforced core Python fundamentals and the implementation of software design and applications programming.',
    ],
  },
  {
    id: 'sales',
    role: 'Campus Sales Representative',
    company: 'American Casual, Custom Shirts and Uniforms',
    location: 'Anaheim, CA',
    period: 'Aug 2024 to May 2026',
    oneLiner:
      'I ran campus sales for a custom apparel shop, negotiating pricing and design and bringing in more than $35,000.',
    bullets: [
      'Procured more than $35,000 in custom apparel and merchandise sales.',
      'Built and maintained relationships with more than 25 campus-organization clients through in-person outreach and repeat orders.',
      "Brokered and negotiated pricing and design decisions between clients and the production office, writing detailed quotes and price estimates in Deco quoting software for each club's needs and budget.",
    ],
    story:
      'For almost two years I was the person in the middle, between the shop and the client. I had to hear what a client actually needed, not just what they asked for first, and find terms that worked on price, timeline, and specs. I still use that when I translate technical work for non-technical stakeholders.',
  },
]

/** Shown on the resume page only. */
export const earlierWork = [
  {
    role: 'Tickets and Office Assistant',
    company: 'UC Irvine Bren Events Center',
    period: 'Feb 2024 to Oct 2025',
    note: 'Ticketing, box office, will-call, event support, and office shifts.',
  },
  {
    role: 'Summer Fellow',
    company: 'The Webb Schools',
    period: 'Jul 2024',
    note: 'Mentored international and domestic students, led organized sports, and communicated with staff and parents.',
  },
] as const
