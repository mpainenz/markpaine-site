export const site = {
  name: 'Mark Paine',
  domain: 'markpaine.dev',
  byline:
    'Senior CI/CD and platform engineer with 20 years building and operating high-availability telecom, cloud, and payment systems across AWS, Azure, and GCP.',
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
  focus?: string;
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
    role: 'Senior Developer — CI/CD',
    focus: 'Platform engineering and SRE focus',
    meta: 'Remote · 2025 —',
    current: true,
    blurb:
      'House of Doge is a cryptocurrency startup building payment and tokenization infrastructure for Dogecoin — the services, rails, and blockchain plumbing connecting traditional finance with cryptocurrency ledgers.',
    bullets: [
      'Built highly available, multi-environment and multi-region AWS EKS platforms, including VPCs, subnetting, private endpoints, load balancing, DNS, and Linkerd mTLS',
      'Authored Helm charts and Kustomize overlays and troubleshot production workloads with kubectl',
      'Built self-service delivery through standardised pipelines and a custom Argo CD-integrated deployment interface',
      'Implemented review-gated AWS CDK workflows that generated infrastructure diffs before deployment',
      'Provisioned and maintained production PostgreSQL databases and highly available Aurora, ClickHouse, and TigerBeetle infrastructure',
      'Operated observability with OpenTelemetry, Honeycomb, Prometheus, Alertmanager, Grafana, and Sentry',
      'Implemented least-privilege IAM and secrets management with External Secrets Operator, supporting SOC 2 readiness',
      'Built secured MCP services and least-privilege guardrails for internal developer agents',
    ],
  },
  {
    company: 'One New Zealand',
    role: 'Principal Developer',
    meta: 'Auckland · 2005 — 2025',
    blurb:
      'Major New Zealand telecommunications provider operating nationwide mobile, broadband, IoT, and enterprise voice services.',
    intro:
      'Progressed from Junior Developer to Principal Developer over 20 years, mentoring engineers and setting quality standards through architecture guidance and code review.',
    bullets: [
      'Operated business-critical telecom platforms under contractual availability and service-quality commitments, covering on-call, incident leadership, root-cause analysis, and reliability improvements',
      'Designed cloud networking across VPCs, subnetting, routing, VPN connectivity, and private endpoints, alongside routing and provisioning for the Ribbon core voice network',
      'Migrated core systems from on-premises infrastructure to AWS and contributed to a GCP/Azure IoT platform using Cloud SQL, Cloud Functions, Pub/Sub, Event Hubs, and Service Bus',
      'Built developer self-service delivery through GitLab pipelines, combining automated push/merge deployments with approval-gated releases',
      'Operated monitoring and alerting using Prometheus, Alertmanager, Grafana, and Loki',
      'Owned national telephone-number administration and portability workflows, integrating with the Industry Portability Management System (IPMS) and TNAS toll-free portability system',
      'Built and operated queue-based routing automation for the Ribbon voice platform, processing high-volume number-portability and network-routing updates',
      'Delivered general-ledger and PCI-DSS-compliant payment capabilities',
    ],
  },
  {
    company: 'Solus Designs Limited',
    role: 'Founder',
    meta: '2011 —',
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
  { group: 'Cloud', items: 'AWS · GCP · Azure' },
  { group: 'Kubernetes', items: 'EKS · Helm · Kustomize · kubectl · Linkerd · Docker' },
  { group: 'Infrastructure as Code', items: 'AWS CDK · Terraform · Pulumi' },
  { group: 'CI/CD & GitOps', items: 'GitHub Actions · GitLab CI/CD · Argo CD' },
  { group: 'Observability', items: 'OpenTelemetry · Prometheus · Alertmanager · Grafana · Loki · Honeycomb · Sentry' },
  { group: 'Messaging', items: 'Kafka · AWS SNS/SQS · Google Cloud Pub/Sub · Azure Event Hubs · Service Bus' },
  { group: 'Databases', items: 'PostgreSQL · MySQL · Aurora · ClickHouse · TigerBeetle · Microsoft SQL Server' },
  { group: 'Languages', items: 'Go · C# · TypeScript · Python · Rust · C++ · Java · Kotlin · Delphi' },
  { group: 'Web', items: 'React · HTML · CSS · JavaScript · TypeScript · PHP' },
  { group: 'AI / Data', items: 'MCP · LangGraph · Scikit-learn · Pandas · NumPy · Jupyter' },
];

export const education = [
  { title: 'AWS Certified Developer — Associate', detail: 'Active' },
  { title: 'B. Computing Systems', detail: 'Unitec · 2003 — 2005' },
];
