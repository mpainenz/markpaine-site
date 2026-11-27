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
    meta: 'Remote contractor from Auckland · 2025 — Aug 2026',
    blurb:
      'House of Doge is a Texas-headquartered cryptocurrency startup building payment and tokenization infrastructure for Dogecoin — the services, rails, and blockchain plumbing connecting traditional finance with cryptocurrency ledgers.',
    bullets: [
      'Applied autonomous agentic engineering to build SRE tooling supporting fault identification, investigation and resolution',
      'Built MCP services providing secure access to internal systems, with auditing and least-privilege guardrails for developer agents',
      'Built highly available, multi-environment and multi-region AWS EKS platforms, including VPCs, subnetting, private endpoints, load balancing, DNS, and Linkerd mTLS',
      'Authored Helm charts and Kustomize overlays and troubleshot production workloads with kubectl',
      'Built self-service delivery through standardised pipelines and a custom Argo CD-integrated deployment interface',
      'Implemented review-gated AWS CDK workflows that generated infrastructure diffs before deployment',
      'Provisioned and maintained production PostgreSQL databases and highly available Aurora, ClickHouse, and TigerBeetle infrastructure',
      'Operated observability with OpenTelemetry, Honeycomb, Prometheus, Alertmanager, Grafana, and Sentry',
      'Implemented least-privilege IAM and secrets management with External Secrets Operator, supporting SOC 2 readiness',
    ],
  },
  {
    company: 'One New Zealand',
    role: 'Senior Developer, then Principal Developer',
    meta: 'Auckland · Aug 2015 — 2025',
    intro:
      'I was the second developer on Bandit, WxC’s CRM, billing and service provisioning platform. I continued building it at Sulaco Technology after WxC spun out its development team. Sulaco merged back into WxC in July 2015. I joined Vodafone NZ as a Senior Developer when it acquired the combined business that August and later progressed to Principal Developer.',
    bullets: [
      'Wrote application code for Bandit’s desktop client, React/TypeScript staff and customer portals, and C#/.NET and Python backend services.',
      'Led engineering work in small project teams within an Agile environment, allocating tasks, reviewing code and providing technical feedback while coordinating delivery with business stakeholders. Mentored and onboarded colleagues through practical guidance and show-and-tell sessions introducing engineering concepts and capabilities.',
      'Owned the architecture, maintenance and operation of Bandit’s AWS environment, helping evolve the platform from self-hosted client/server systems into containerised microservices and serverless components. Deployed services on ECS/Fargate and migrated large production databases.',
      'Designed and developed Bandit’s product and service billing functionality for different plans and billing models, including monthly recurring charges, variable charges and pro rata billing.',
      'Developed customer accounting and finance functionality, including ledger and transaction tables, invoicing, refunds, partial payments allocated across invoices, account transfers and reconciliation. Built financial and product reporting for finance teams and management.',
      'Built payment integrations covering gateways, customer portal payments and in-person payments, supporting PCI DSS compliance for card handling.',
      'Contributed substantial code to the separate .NET call-rating and Python number-portability engines. Bandit processed millions of call records each month.',
      'Developed and supported carrier-grade VoIP and SIP integrations with platforms including BroadSoft and Ribbon SBCs. These services supported complex enterprise voice and contact-centre environments, including connectivity to customer SIP endpoints, for organisations such as IRD, BNZ, NZ Police and IAG.',
      'Wrote and supported Bandit’s call-routing management service end to end. Its REST API translated requests from the application backend into carrier switch configuration changes, with retries that rechecked actual switch state and rollback using SQL Server configuration history.',
      'Worked with product owners from planning and requirements through design, implementation, testing, deployment and production support. Built GitLab delivery workflows with automated regression checks, approval-gated releases and support for Windows container workloads.',
      'Built Cisco Meraki integrations for device procurement and SD-WAN provisioning, and AWS ECS services for enterprise telematics.',
      'Partnered with Microsoft to build a multi-tenant Azure IoT management platform using IoT Hub, Event Hubs and Service Bus.',
      'Worked with One NZ’s wholesale team to design and build a GCP-backed platform integration enabling customers to use Starlink and wireless connectivity through IoT devices.',
      'Diagnosed production faults across application code, SQL, APIs and dependent services, using test environments and targeted diagnostics to verify fixes. Responsibilities included on-call response, incident leadership, monitoring and alerting.',
      'Administered AWS and Azure environments, including identity, permissions, Entra ID and Active Directory, and maintained staff Windows desktop environments.',
    ],
  },
  {
    company: 'Solus Designs Limited',
    role: 'Founder & Software Engineer',
    meta: '2011 — present',
    printBreak: true,
    blurb:
      'Independent software business building AI applications and distributed systems, with responsibility across product design, development, testing and deployment.',
    bullets: [
      'Developing Ahoyhoy, a multi-tenant AI receptionist platform combining SIP telephony, OpenAI’s Realtime API and Agents SDK, a Next.js/React management portal and PostgreSQL-backed TypeScript services.',
      'Built configurable call handling and business-knowledge ingestion and retrieval, using the Responses API, tool calling and structured outputs. Added automated conversation evaluations and checks against source information.',
      'Designed and built TensorRelay, a Steam-distributed LLM inference platform using pipeline parallelism across heterogeneous consumer GPUs, with a Go control plane, custom Rust runtime, C++/llama.cpp execution and Steam P2P transport.',
      'Implemented dynamic model-layer sharding, cluster scheduling, model distribution and an OpenAI-compatible API; deployed the private-beta backend to Kubernetes through GitHub Actions and Argo CD.',
    ],
  },
];

type EarlierEmployer = {
  company: string;
  positions: { title: string; dates: string }[];
};

type EarlierGroup = {
  dates?: string;
  continuation?: { text: string; label: string; href: string };
  employers: EarlierEmployer[];
};

export const earlierGroups: EarlierGroup[] = [
  {
    dates: '2004 – 2015',
    employers: [
      {
        company: 'Sulaco Technology',
        positions: [{ title: 'Senior Developer', dates: 'WxC transfer – July 2015' }],
      },
      {
        company: 'WXC Communications',
        positions: [
          { title: 'Junior Developer', dates: '2005 – transfer to Sulaco' },
          { title: 'Senior Technical Support Representative', dates: '2004 – 2005' },
        ],
      },
    ],
    continuation: {
      text: 'I continued as a developer at One NZ (then Vodafone NZ) after it acquired the combined WxC and Sulaco business in 2015.',
      label: 'See One NZ',
      href: '#one-new-zealand',
    },
  },
  {
    employers: [
      { company: 'iHug', positions: [{ title: 'Technical Support Representative', dates: '2003 – 2004' }] },
    ],
  },
];

export const skills: { group: string; items: string }[] = [
  { group: 'Programming', items: 'C#/.NET · Python · SQL · Go · TypeScript · Rust · C++ · Java · Kotlin · Delphi' },
  { group: 'Web', items: 'React · Next.js · Node.js · Fastify · JavaScript · HTML · CSS · PHP' },
  { group: 'APIs', items: 'REST · ConnectRPC · Protocol Buffers' },
  { group: 'Databases and caching', items: 'Microsoft SQL Server · PostgreSQL · MySQL · Aurora · Redis / Amazon ElastiCache · ClickHouse · TigerBeetle' },
  { group: 'Testing', items: 'API · Integration · End-to-end · Regression · Load · LLM evaluation' },
  { group: 'Cloud', items: 'AWS · GCP · Azure' },
  { group: 'Systems & containers', items: 'Linux · Kubernetes · Docker · EKS · Helm · Kustomize · Linkerd' },
  { group: 'Infrastructure as Code', items: 'AWS CDK · Terraform · Pulumi' },
  { group: 'CI/CD and GitOps', items: 'GitHub Actions · GitLab CI/CD · Argo CD' },
  { group: 'Observability', items: 'OpenTelemetry · Prometheus · Alertmanager · Grafana · Loki · Honeycomb · Sentry · AWS CloudWatch · Azure Monitor · Datadog' },
  { group: 'Messaging', items: 'Kafka · AWS SNS/SQS · Google Cloud Pub/Sub · Azure Event Hubs · Service Bus' },
  { group: 'Networking and voice', items: 'VoIP · SIP · SD-WAN · Cisco Meraki · VPCs · Subnetting · Routing · VPNs · Private endpoints · DNS · Load balancing' },
  { group: 'Agentic tools', items: 'Cursor · Claude Code · Amp · GrokBot' },
  {
    group: 'AI applications',
    items:
      'OpenAI Responses and Realtime APIs · OpenAI Agents SDK · Tool calling · Structured outputs · RAG · MCP · LangChain · LangGraph · Amazon Bedrock',
  },
  {
    group: 'ML and inference',
    items:
      'Linear regression · MLOps · Model serving · Embeddings · Vector databases (Qdrant) · Distributed LLM inference',
  },
];

export const education = [
  { title: 'AWS Certified Developer – Associate', detail: '2023–2026' },
  { title: 'B. Computing Systems', detail: 'Unitec · 2003 — 2005' },
];

export const profile: string[] = [
  "I’m a software and platform engineer who enjoys working in small, close-knit teams. I value sharing ideas, collaborating with colleagues and building software together, and I’m comfortable taking the technical lead.",
  "My platform experience centres on AWS, where I’ve led the design, build and operational support of production environments and delivery tooling. Alongside that, I’ve developed business applications, AI products and distributed services. I’m looking for a hands-on senior engineering or team lead role where I can stay close to the code, take ownership and contribute to a positive team culture."
];

export const coreStrengths: { title: string; description: string }[] = [
  {
    "title": "AWS & platform engineering",
    "description": "Cloud architecture, Linux and container platforms, infrastructure automation and production ownership."
  },
  {
    "title": "Software & product development",
    "description": "Backend engineering, service integrations and full-stack applications, from business platforms to customer-facing products."
  },
  {
    "title": "Delivery & reliability",
    "description": "Self-service deployments, GitOps, automated testing and observability."
  },
  {
    "title": "AI & distributed systems",
    "description": "AI applications, real-time voice agents, knowledge retrieval and distributed inference. MCP services that give agents scoped, auditable access to production systems."
  }
];
