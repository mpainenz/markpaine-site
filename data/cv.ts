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
    role: 'Principal Developer',
    meta: 'Auckland · 2005 — 2025',
    intro:
      'Joined WXC Communications as the second developer building Bandit, an in-house CRM, billing and service-provisioning platform. WXC was acquired by Vodafone NZ (now One NZ) in 2015, and Bandit became integral to One NZ’s business systems. Progressed from Junior Developer to Principal Developer, mentoring engineers through architecture guidance and code review.',
    bullets: [
      'Wrote application code for Bandit’s desktop client, React/TypeScript staff and customer portals, and C#/.NET and Python backend services.',
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
    role: 'Founder',
    meta: '2011 —',
    printBreak: true,
    blurb:
      'Solus Designs is my independent AI systems company, building production machine-learning software and distributed LLM inference infrastructure.',
    bullets: [
      'Designed and built TensorRelay, a Steam-distributed LLM inference platform using pipeline parallelism across heterogeneous consumer GPUs, with a Go control plane, custom Rust runtime, C++/llama.cpp stage execution, and Steam P2P transport',
      'Implemented dynamic model-layer sharding, cluster scheduling and admission control, model artifact distribution, and an OpenAI-compatible API; deployed the private-beta backend to Kubernetes through GitHub Actions and Argo CD',
    ],
  },
];

export const earlierRoles = [
  { company: 'WXC Communications', role: 'Technical Support', meta: '2004 — 05' },
  { company: 'iHug', role: 'Customer Services', meta: '2003 — 04' },
];

export const skills: { group: string; items: string }[] = [
  { group: 'Programming', items: 'C#/.NET · Python · SQL · Go · TypeScript · Rust · C++ · Java · Kotlin · Delphi' },
  { group: 'Web', items: 'React · JavaScript · HTML · CSS · PHP' },
  { group: 'APIs', items: 'REST · ConnectRPC · Protocol Buffers' },
  { group: 'Databases and caching', items: 'Microsoft SQL Server · PostgreSQL · MySQL · Aurora · Redis / Amazon ElastiCache · ClickHouse · TigerBeetle' },
  { group: 'Testing', items: 'API · Integration · End-to-end · Regression · Load' },
  { group: 'Cloud', items: 'AWS · GCP · Azure' },
  { group: 'Containers and orchestration', items: 'Kubernetes · Docker · EKS · Helm · Kustomize · Linkerd' },
  { group: 'Infrastructure as Code', items: 'AWS CDK · Terraform · Pulumi' },
  { group: 'CI/CD and GitOps', items: 'GitHub Actions · GitLab CI/CD · Argo CD' },
  { group: 'Observability', items: 'OpenTelemetry · Prometheus · Alertmanager · Grafana · Loki · Honeycomb · Sentry · AWS CloudWatch · Azure Monitor · Datadog' },
  { group: 'Messaging', items: 'Kafka · AWS SNS/SQS · Google Cloud Pub/Sub · Azure Event Hubs · Service Bus' },
  { group: 'Networking and voice', items: 'VoIP · SIP · SD-WAN · Cisco Meraki · VPCs · Subnetting · Routing · VPNs · Private endpoints · DNS · Load balancing' },
  { group: 'Agentic tools', items: 'Cursor · Claude Code · Amp · GrokBot' },
  {
    group: 'AI / ML',
    items:
      'Linear regression · MLOps · Model serving · RAG · Embeddings · Vector databases (Qdrant) · LangChain · LangGraph · Amazon Bedrock · MCP · Distributed LLM inference',
  },
];

export const education = [
  { title: 'AWS Certified Developer — Associate', detail: 'Active' },
  { title: 'B. Computing Systems', detail: 'Unitec · 2003 — 2005' },
];
