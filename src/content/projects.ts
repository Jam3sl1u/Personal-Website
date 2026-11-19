// Featured projects, in display order, plus the compact "More on GitHub" list.

export type ProjectVisual = 'chariot' | 'graceful' | 'calendar'

export type Project = {
  slug: string
  index: string
  title: string
  subtitle: string
  period: string
  description: string
  /** One-line answers to the questions a reviewer asks first. */
  problem: string
  role: string
  users: string
  engineering: string[]
  highlights: { value: string; label: string }[]
  stack: string[]
  links: { github?: string; demo?: string; caseStudy?: string }
  visual: ProjectVisual
  layout: 'visual-right' | 'visual-left' | 'wide'
}

export const projects: Project[] = [
  {
    slug: 'chariot',
    index: '01',
    title: 'Chariot',
    subtitle: 'Club Rides Scheduler',
    period: 'Live since September 2026',
    description:
      'A Discord bot and dashboard that auto-matches club members who need rides with drivers, so weekly ride planning runs itself. Built and run solo, with as much care on failure cases as on the happy path.',
    problem: 'Clubs had no reliable way to match riders with drivers each week without double-booking or dropping anyone.',
    role: 'Solo: I designed, built, and operate it.',
    users: 'Up to 20 club members, every week.',
    engineering: [
      'Deterministic greedy matcher written as a pure function, so the same input always gives the same plan.',
      'Claim-before-send idempotency, capped retries, and missed-job catch-up, so a crash never double-posts.',
      'Google Sheets and Discord integration, covered by 90+ automated tests.',
    ],
    highlights: [
      { value: 'Up to 20', label: 'users coordinated every week' },
      { value: '90+', label: 'automated tests across 8 suites' },
    ],
    stack: ['TypeScript', 'Node.js', 'discord.js', 'Google Sheets API', 'Apps Script'],
    links: {
      github: 'https://github.com/Jam3sl1u/Chariot',
      // Returned 404 when checked on 2026-11-16. Uncomment once the dashboard is deployed again.
      // demo: 'https://chariot-mu.vercel.app',
      caseStudy: '/work/chariot',
    },
    visual: 'chariot',
    layout: 'visual-right',
  },
  {
    slug: 'graceful',
    index: '02',
    title: 'Graceful',
    subtitle: 'Scheduling and Setlists',
    period: 'June to September 2026',
    description:
      'A scheduling and setlist coordination app with modern team-management capabilities: weekly scheduling, invitations, conflict detection, setlists and songs, a document library, and Google Calendar integration. Installable as a PWA.',
    problem: 'Worship teams need to schedule people, manage setlists, and share documents without a full church-management platform.',
    role: 'Solo: product design, full stack, and testing.',
    users: 'Worship teams. A public live demo is linked below.',
    engineering: [
      'Every database operation goes through Next.js API routes validated with Zod, with Supabase’s REST API disabled.',
      'Clerk authentication with Google OAuth, edge rate limiting, and a nonce-based content security policy.',
      'Conflict detection for schedules, with dev, staging, and production environments and Jest and Playwright tests.',
    ],
    highlights: [
      { value: 'PWA', label: 'installable, with dev, staging, and production environments' },
      { value: 'Jest + Playwright', label: 'unit and end-to-end tests' },
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'Supabase', 'Clerk'],
    links: {
      github: 'https://github.com/Jam3sl1u/Graceful',
      demo: 'https://graceful-wheat.vercel.app',
      caseStudy: '/work/graceful',
    },
    visual: 'graceful',
    layout: 'visual-left',
  },
  {
    slug: 'ai-calendar',
    index: '03',
    title: 'AI Calendar Assistant',
    subtitle: 'Natural Language to Structured Events',
    period: 'March to June 2026',
    description:
      'A full-stack app that turns everyday event descriptions into structured calendar entries. Built with a 4-person team: Flan-T5-Base fine-tuned on 1,430 examples, rule-based post-processing, and a 500-example eval harness that showed exactly where the model struggles.',
    problem: 'Calendars need structured fields, but people describe events in everyday language, and dates are the hard part.',
    role: '4-person team. I did much of the frontend design and the API route integration, ran extensive end-to-end testing, and helped build the 500-example evaluation harness.',
    users: 'Anyone who describes events in plain language and wants them on a calendar.',
    engineering: [
      'Fine-tuned Flan-T5-Base on 1,430 Claude-generated examples, with rule-based post-processing on top.',
      'Scored each field separately on 500 examples, which showed date reasoning (32.2%) is the bottleneck.',
      'Documented limits: the training data is generated, and the scoring is strict exact match.',
    ],
    highlights: [
      { value: '95.6%', label: 'recurrence accuracy' },
      { value: '93.8%', label: 'time accuracy' },
      { value: '500', label: 'example evaluation harness' },
    ],
    stack: ['React', 'Next.js', 'Flask', 'Python', 'Flan-T5'],
    links: {
      github: 'https://github.com/Jam3sl1u/NLP-Calendar',
      caseStudy: '/work/ai-calendar',
    },
    visual: 'calendar',
    layout: 'wide',
  },
]

export const moreProjects: { title: string; description: string; stack: string[]; href?: string }[] = [
  {
    title: 'Fashion-MNIST Classification',
    description:
      'A 3-person machine learning project comparing kNN, logistic regression, an MLP, and SVM on 10 clothing categories. I owned the MLP: 83% with ReLU versus 72% with tanh. The best model, an RBF-kernel SVM, reached 86%.',
    stack: ['scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'],
    // The repository is private (404 when checked on 2026-11-16). Add `href` once it is public.
  },
  {
    title: 'Airport Database Interface',
    description: 'A desktop app for reviewing airports by region and country, with SQLite queries behind a Tkinter GUI.',
    stack: ['Python', 'SQLite', 'Tkinter'],
    href: 'https://github.com/Jam3sl1u/Airport-Database-Interface',
  },
  {
    title: 'Grin Language Interpreter',
    description: 'A Python program that reads a grammar file and generates sentences from the rules.',
    stack: ['Python'],
    href: 'https://github.com/Jam3sl1u/Grin-Language-Interpreter',
  },
  {
    title: 'Direct Messaging Chat',
    description:
      'A Python Tkinter app for sending and receiving direct messages, with contacts and history stored locally so they still work offline.',
    stack: ['Python', 'Tkinter'],
    href: 'https://github.com/Jam3sl1u/Direct-Messaging-Chat',
  },
]
