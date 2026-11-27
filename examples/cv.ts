export const experience = [
  {
    company: 'Example Company',
    role: 'Platform Engineer',
    focus: 'Developer experience and reliability',
    meta: 'Remote · 2022 —',
    current: true,
    blurb: 'A short explanation of what the company does.',
    intro: 'Optional context about progression, scope, or leadership.',
    bullets: [
      'Describe an outcome, the system you changed, and the technologies that made it possible',
      'Prefer measurable impact and operational responsibility over a list of duties',
    ],
  },
];

export const earlierGroups = [
  {
    dates: '2019 – 2022',
    continuation: { text: 'I continued developing the platform at Example Company.', label: 'See Example Company', href: '#example-company' },
    employers: [
      { company: 'Earlier Company', positions: [{ title: 'Software Engineer', dates: '2019 – 2022' }] },
    ],
  },
];

export const skills = [
  { group: 'Cloud', items: 'AWS · Azure · GCP' },
  { group: 'Delivery', items: 'GitHub Actions · Argo CD · Terraform' },
];

export const education = [
  { title: 'Relevant certification or degree', detail: 'Institution · Year' },
];
