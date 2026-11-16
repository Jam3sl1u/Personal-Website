// Site-wide identity, links, and short copy.
// Everything public-facing about James lives in src/content so updates never
// require touching components.

export const site = {
  name: 'James Liu',
  initials: 'JL',
  role: 'Software Engineer',
  roleLine: 'Software Engineer · CS and Informatics, UC Irvine',
  location: 'Orange County, California',
  headline: {
    // Rendered as: Building *intelligent systems.* Creating *meaningful experiences.*
    lines: [
      { plain: 'Building', accent: 'intelligent systems.' },
      { plain: 'Creating', accent: 'meaningful experiences.' },
    ],
  },
  intro:
    "I'm a Computer Science student at UC Irvine and a software engineer at UCI Beall Applied Innovation, where I build full-stack AI applications with TypeScript, React, and AWS.",
  status: 'Open to new-grad software engineering roles starting July 2027',
  email: 'jliuzhishun@gmail.com',
  links: {
    github: 'https://github.com/Jam3sl1u',
    linkedin: 'https://www.linkedin.com/in/james-liu-426a50281/',
  },
  /**
   * Resume PDF.
   * Leave as null until a verified, phone-free PDF exists. Then drop the file
   * in /public (for example public/James-Liu-Resume.pdf) and set this to the
   * file name: 'James-Liu-Resume.pdf'. Download buttons appear automatically.
   */
  resumePdf: null as string | null,
  /**
   * Portrait. Leave null to show the placeholder. To add one, drop a square
   * image in /public and set this to its file name, e.g. 'portrait.jpg'.
   */
  portrait: null as string | null,
  footerLine: 'James Liu · Software Engineer · UC Irvine',
} as const

export const nav = [
  { label: 'About', section: 'about' },
  { label: 'Work', section: 'work' },
  { label: 'Projects', section: 'projects' },
  { label: 'Resume', route: '/resume' },
  { label: 'Contact', section: 'contact' },
] as const

/** Resolve a file in /public against the configured Vite base path. */
export function asset(file: string): string {
  return `${import.meta.env.BASE_URL}${file.replace(/^\//, '')}`
}

export const about = {
  lead: [
    "I'm James, a Computer Science student at UC Irvine with a minor in Informatics and a specialization in Systems and Software.",
    'I graduate in June 2027.',
  ],
  paragraphs: [
    "At UCI Beall Applied Innovation, the university's startup incubator, I work as a software engineer on an early-stage product team. I help build a client-facing AI avatar platform from the ground up: the full stack in TypeScript, React, and AWS, RAG retrieval over a Neo4j knowledge graph, prompt pipelines, and the systems that make those products safer and faster.",
    'I work with a couple of clients, sit in on product conversations, demo progress, and turn feedback into features, including an onboarding flow for source documents. I explain technical choices in plain terms.',
    'Before this, I taught Python at Integem, tutored UCI lab courses, and spent two years in campus sales, negotiating pricing and design and bringing in more than $35,000 from more than 25 clients. That mix of building and explaining is the work I like most.',
  ],
  belief:
    'I want to build AI that augments human productivity: tools that help people do their best work, not systems that replace or get in the way of human labor.',
  facts: [
    { label: 'Degree', value: 'B.S. Computer Science' },
    { label: 'Minor', value: 'Informatics' },
    { label: 'Specialization', value: 'Systems and Software' },
    { label: 'Graduating', value: 'June 2027' },
    { label: 'Currently', value: 'Software Engineer, UCI Beall Applied Innovation' },
    { label: 'Based in', value: 'Orange County, California' },
  ],
} as const

export const education = {
  school: 'University of California, Irvine',
  college: 'Donald Bren School of Information and Computer Sciences',
  degree: 'Bachelor of Science in Computer Science',
  minor: 'Minor in Informatics',
  specialization: 'Specialization in Systems and Software',
  period: 'September 2023 to June 2027 (expected)',
  start: '2023',
  end: '2027',
  honors: { title: "Dean's Honor List", count: 7, unit: 'quarters' },
  coursework: ['Data Structures', 'Algorithms', 'Systems and Software', 'Machine Learning', 'Artificial Intelligence'],
} as const

export const leadership = {
  philosophy:
    "I think of good leadership as oversight, not over-management. I try to instill trust and real responsibility in a team, give people ownership over their roles and their output, offer guidance when it's needed, and lead by example.",
  practices: [
    {
      title: 'Ownership',
      body: 'At Beall, I take ownership without waiting to be asked: I wrote a design doc for the safety-layer redesign, then built it, and I fixed a buggy companion settings experience after I noticed the gap myself.',
    },
    {
      title: 'Communication',
      body: 'I work across an international intern and contractor team, and I have stepped in to translate between groups when a product discussion was stalling.',
    },
    {
      title: 'Asking early',
      body: 'I ask for help earlier rather than later. Early in the Beall role, I got stuck setting up Docker for the first time, reached out to a contractor, and got the environment running. That experience changed how I handle unfamiliar tools.',
    },
    {
      title: 'Teaching',
      body: 'I like teaching. I have taught Python and AI/AR tools at Integem, tutored UCI lab students, and explained AI product settings to non-technical clients.',
    },
  ],
  campus: {
    role: 'Weekly Meeting Team Lead',
    org: 'UCI CRU',
    location: 'Irvine, CA',
    period: 'September 2024 to present',
    stat: { value: '75+', label: 'members each week' },
    bullets: [
      'Organize and lead weekly club meetings for more than 75 members, overseeing logistics, content, and team coordination each week.',
      'Coordinate detailed planning with a team of student leaders, and help build a welcoming, inclusive environment by greeting and connecting new attendees.',
    ],
    story:
      "One week the original plan for the speaker and structure fell through, with only a day's notice. I rescheduled the speaker lineup, aligned other teams on the new topic and flow, and kept the event on track so attendees didn't feel the scramble. That is the part of leadership I take seriously: stay calm, make a clear plan, and keep the people around you informed.",
  },
} as const

export const lookingFor = {
  statement: "I'm looking for a full-time, long-term new-grad or early-career software engineering role, starting in July 2027.",
  detail:
    "The work I want most combines building and talking to people: full-stack or backend product engineering, practical AI systems, or roles where I can carry a customer's problem all the way into the implementation.",
  interests: [
    { title: 'Full-stack engineering', note: 'Product work across the whole stack' },
    { title: 'Backend systems', note: 'Reliable services and pipelines' },
    { title: 'Practical AI applications', note: 'RAG, LLM pipelines, evaluation, agentic orchestration' },
    { title: 'Customer-facing engineering', note: 'Forward deployed, solutions, or sales engineering' },
  ],
  logistics: [
    { label: 'Start', value: 'July 2027' },
    { label: 'Work authorization', value: 'U.S. citizen, no visa sponsorship needed' },
    { label: 'Format', value: 'Onsite, hybrid, or remote' },
    { label: 'Location', value: 'Orange County, Los Angeles, SF Bay Area, New York City. Open to other U.S. cities for a strong role.' },
  ],
} as const

export const contact = {
  headline: { plain: 'Have something interesting in mind?', accent: "Let's build it." },
  body: "If you're hiring for a 2027 new-grad software role, or you just want to talk about a product you're building, I'd be glad to hear from you.",
} as const
