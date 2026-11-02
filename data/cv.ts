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
    blurb:
      'Major New Zealand telecommunications provider operating nationwide mobile, broadband, IoT, and enterprise voice services.',
    intro:
      'Progressed from Junior Developer to Principal Developer over 20 years, mentoring engineers and setting quality standards through architecture guidance and code review.',
    bullets: [
      'Operated business-critical telecom platforms under contractual availability and service-quality commitments, covering on-call, incident leadership, root-cause analysis, and reliability improvements',
      'Designed cloud networking across VPCs, subnetting, routing, VPN connectivity and private endpoints; built GCP-hosted Cisco Meraki integrations and configuration automation supporting device procurement and automated SD-WAN provisioning for One NZ’s Connected Business service',
      'Modernised and containerised core systems for AWS, decomposing selected workloads into microservices and migrating several large production databases from on-premises infrastructure',
      'Built and maintained device-provisioning services on AWS ECS for enterprise telematics integrations with Solution Dynamics and Telematics Guru',
      'Partnered with Microsoft to design and build a multi-tenant IoT management platform on Azure using IoT Hub, Event Hubs and Service Bus, configuring service principals and application permissions to support tenant-specific access',
      'Built CI/CD workflows for Windows container workloads, including building and maintaining Windows Server container images and deploying containerised applications',
      'Administered the organisation’s Azure and AWS environments, including identity and access management (IAM), permissions and day-to-day cloud administration',
      'Managed Microsoft identity environments, including Azure Active Directory (now Microsoft Entra ID) tenant administration and the design, deployment and maintenance of self-hosted and on-premises Active Directory',
      'Built and maintained Windows desktop images for staff virtual machines, using snapshots for repeatable deployment, joining machines to Active Directory and configuring staff access',
      'Built developer self-service delivery through GitLab pipelines, combining automated push/merge deployments with approval-gated releases',
      'Provided observability across AWS and Azure environments using AWS CloudWatch, Azure Monitor, Datadog, Prometheus, Grafana, Loki and Alertmanager',
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
  { group: 'Cloud', items: 'AWS · GCP · Azure' },
  { group: 'Kubernetes', items: 'EKS · Helm · Kustomize · kubectl · Linkerd · Docker' },
  { group: 'Infrastructure as Code', items: 'AWS CDK · Terraform · Pulumi' },
  { group: 'Networking', items: 'SD-WAN · Cisco Meraki · VPCs · Routing · VPNs · Private endpoints · DNS · Load balancing' },
  { group: 'CI/CD & GitOps', items: 'GitHub Actions · GitLab CI/CD · Argo CD' },
  { group: 'Observability', items: 'OpenTelemetry · Prometheus · Alertmanager · Grafana · Loki · Honeycomb · Sentry · AWS CloudWatch · Azure Monitor · Datadog' },
  { group: 'Messaging', items: 'Kafka · AWS SNS/SQS · Google Cloud Pub/Sub · Azure Event Hubs · Service Bus' },
  { group: 'APIs', items: 'REST · ConnectRPC · Protocol Buffers' },
  { group: 'Databases', items: 'PostgreSQL · MySQL · Aurora · ClickHouse · TigerBeetle · Microsoft SQL Server' },
  { group: 'Languages', items: 'Go · C# · TypeScript · Python · Rust · C++ · Java · Kotlin · Delphi' },
  { group: 'Web', items: 'React · HTML · CSS · JavaScript · TypeScript · PHP' },
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
