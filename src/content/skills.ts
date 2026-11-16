// Skills, grouped. `core: true` items are rendered large.
// Only skills supported by the resume master are listed. No proficiency scores.

export type SkillGroup = {
  id: string
  label: string
  blurb: string
  skills: { name: string; core?: boolean }[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    blurb: 'TypeScript first. Python for ML and tooling.',
    skills: [
      { name: 'TypeScript', core: true },
      { name: 'Python', core: true },
      { name: 'JavaScript' },
      { name: 'SQL' },
      { name: 'C' },
      { name: 'C++' },
      { name: 'Java' },
      { name: 'R' },
      { name: 'Prolog' },
      { name: 'Lisp' },
    ],
  },
  {
    id: 'app',
    label: 'Frontend and Backend',
    blurb: 'Full-stack product work, from UI to API to tests.',
    skills: [
      { name: 'React', core: true },
      { name: 'Next.js', core: true },
      { name: 'Node.js' },
      { name: 'Flask' },
      { name: 'Bun' },
      { name: 'discord.js' },
      { name: 'Playwright' },
      { name: 'Unittest' },
      { name: 'JUnit' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud and Infrastructure',
    blurb: 'Shipping and operating on AWS.',
    skills: [
      { name: 'AWS', core: true },
      { name: 'S3' },
      { name: 'EC2' },
      { name: 'DynamoDB' },
      { name: 'Cognito' },
      { name: 'Bedrock' },
      { name: 'Docker' },
      { name: 'Docker Compose' },
      { name: 'GitHub Actions CI' },
      { name: 'Git' },
      { name: 'Artillery' },
    ],
  },
  {
    id: 'data',
    label: 'Databases',
    blurb: 'Graph, key-value, relational, and vector stores.',
    skills: [{ name: 'Neo4j', core: true }, { name: 'DynamoDB' }, { name: 'SQLite' }, { name: 'Qdrant' }],
  },
  {
    id: 'ai',
    label: 'AI and Machine Learning',
    blurb: 'Building, evaluating, and hardening LLM systems.',
    skills: [
      { name: 'RAG pipelines', core: true },
      { name: 'LLM-as-judge evaluation', core: true },
      { name: 'Prompt engineering' },
      { name: 'Claude API' },
      { name: 'OpenRouter' },
      { name: 'AWS Bedrock' },
      { name: 'Langfuse' },
      { name: 'scikit-learn' },
      { name: 'NumPy' },
      { name: 'Pandas' },
      { name: 'Matplotlib' },
    ],
  },
]
