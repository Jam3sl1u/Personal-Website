// Featured projects, in display order, plus the compact "More on GitHub" list.

export type ProjectVisual = 'chariot' | 'graceful' | 'calendar' | 'mnist'

export type Project = {
  slug: string
  index: string
  title: string
  subtitle: string
  period: string
  description: string
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
  {
    slug: 'fashion-mnist',
    index: '04',
    title: 'Fashion-MNIST Classification',
    subtitle: 'ML Benchmarking',
    period: 'May to June 2025',
    description:
      'A 3-person machine learning project comparing kNN, logistic regression, an MLP, and SVM on 10 clothing categories. I owned the MLP: built and tuned it in scikit-learn and compared activation functions.',
    highlights: [
      { value: '86%', label: 'best test accuracy, RBF-kernel SVM' },
      { value: '83%', label: 'MLP with ReLU, versus 72% for tanh' },
    ],
    stack: ['scikit-learn', 'NumPy', 'Pandas', 'Matplotlib'],
    links: {
      // Returned 404 (private repo) when checked on 2026-11-16. Uncomment once the repo is public.
      // github: 'https://github.com/Jam3sl1u/Fashion-MNIST-ML-Classification-Project',
    },
    visual: 'mnist',
    layout: 'visual-right',
  },
]

export const moreProjects = [
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
] as const
