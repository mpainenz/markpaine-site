export const site = {
  name: 'Mark Paine',
  domain: 'markpaine.dev',
  byline:
    'Multi-cloud platform engineering, with a focus on carrier-grade reliability - currently building cryptocurrency payment and tokenization infrastructure.',
  location: 'Auckland, New Zealand',
  email: 'mpainenz@gmail.com',
  github: 'https://github.com/mpainenz',
  linkedin: 'https://www.linkedin.com/in/mark-paine-663092a4/',
  instagram: 'https://www.instagram.com/mpainenz',
  repo: 'https://github.com/mpainenz/markpaine-site',
  keywords: [
    ['Multi-Cloud', 'DevOps / SRE', 'Kubernetes', 'IaC'],
    ['CI/CD', 'Linux', 'Full-Stack', 'ML / AI Inference'],
  ],
};

export const keywordLinks: Record<string, string> = {
  'Multi-Cloud': 'https://en.wikipedia.org/wiki/Multicloud',
  'DevOps / SRE': 'https://en.wikipedia.org/wiki/Site_reliability_engineering',
  Kubernetes: 'https://en.wikipedia.org/wiki/Kubernetes',
  IaC: 'https://en.wikipedia.org/wiki/Infrastructure_as_code',
  'CI/CD': 'https://en.wikipedia.org/wiki/CI/CD',
  Linux: 'https://en.wikipedia.org/wiki/Linux',
  'Full-Stack': 'https://en.wikipedia.org/wiki/Solution_stack',
  'ML / AI Inference': 'https://en.wikipedia.org/wiki/Machine_learning',
};

export type Job = {
  company: string;
  role: string;
  meta: string;
  current?: boolean;
  printBreak?: boolean;
  blurb?: string;
  intro?: string;
  bullets: string[];
};

export const experience: Job[] = [
  {
    company: 'House of Doge',
    role: 'Platform Engineer / SRE',
    meta: 'Remote · 2025 —',
    current: true,
    blurb:
      'House of Doge is a cryptocurrency startup building payment and tokenization infrastructure for Dogecoin — the services, rails, and blockchain plumbing connecting traditional finance with cryptocurrency ledgers.',
    intro: 'Platform, CI/CD, and SRE ownership across the engineering org:',
    bullets: [
      "AWS EKS platform — greenfields build of highly available, multi-environment, multi-region EKS clusters, provisioned entirely through IaC, secured with an mTLS service mesh (Linkerd), and hosting the organisation's full microservice fleet",
      'CI/CD — responsible for the configuration and deployment of ArgoCD, delivering a GitOps and GitHub Actions based approach to container builds and deployment',
      "DBMS — responsible for deploying and managing the organisation's databases as highly available clustered instances: ClickHouse, TigerBeetle, and Aurora DB",
      'Observability — distributed tracing via OpenTelemetry and Honeycomb, metrics and dashboards via Prometheus and Grafana, and error tracking with Sentry',
      'Agentic AI — delivering secured custom MCP services for developers, and building guardrails that give internally deployed agents controlled access into company systems',
    ],
  },
  {
    company: 'One New Zealand',
    role: 'Principal Developer',
    meta: 'Auckland · 2005 — 2025',
    blurb:
      "One New Zealand is the country's incumbent mobile telco — 99.5% population coverage, the world's first nationwide Starlink satellite-TXT service, and deep enterprise IoT and VoIP portfolios.",
    bullets: [
      'Cloud migration — moved core business systems from on-premise data centers to AWS',
      'IoT device management platform spanning Azure and AWS',
      'Routing, provisioning, and monitoring engine for the Ribbon core voice network',
      'CRM financial module — general ledger and PCI-DSS compliant payment handling',
    ],
  },
  {
    company: 'Solus Designs Limited',
    role: 'Founder',
    meta: '',
    printBreak: true,
    blurb:
      'Solus Designs is my independent product company — software products designed, built, and shipped end to end.',
    bullets: [
      'Tensor Relay — distributed AI inference at scale: model catalog and publishing, cluster formation and scheduling, backend services, and a Steam-distributed client',
      'Algorithmic trading — automated trading engine: broker integration, market screeners, machine-learning signal models, options strategy execution, and risk management',
    ],
  },
];

export const earlierRoles = [
  { company: 'WXC Communications', role: 'Technical Support', meta: '2004 — 05' },
  { company: 'iHug', role: 'Customer Services', meta: '2003 — 04' },
];

export const skills: { group: string; items: string }[] = [
  { group: 'Languages', items: 'Go · Rust · Python · C# · C++ · Kotlin · Delphi · PHP · TypeScript · JavaScript · React · HTML · CSS' },
  { group: 'Cloud', items: 'Multi-cloud: AWS · GCP · Azure' },
  { group: 'Platform', items: 'Linux · Kubernetes · Linkerd · Tailscale · Docker' },
  { group: 'Infrastructure as Code', items: 'Terraform · Pulumi · CDK' },
  { group: 'CI/CD', items: 'GitHub Actions · GitLabs · ArgoCD' },
  { group: 'Observability', items: 'OpenTelemetry · Prometheus · Grafana · Loki · Sentry' },
  { group: 'Agentic AI', items: 'Cursor · Codex · Claude Code · LangGraph' },
  { group: 'Databases', items: 'ClickHouseDB · Postgres · MSSQL' },
  { group: 'ML / Data Science', items: 'Linear Regression · Pandas · NumPy · Jupyter' },
];

export const education = [
  { title: 'AWS Certified Developer — Associate', detail: '' },
  { title: 'B. Computing Systems', detail: 'Unitec · 2003 — 2005' },
  { title: 'Extramural: Virology I', detail: 'Columbia University · 2013' },
];
