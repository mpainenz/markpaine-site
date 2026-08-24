# CV Content Revision Design

## Goal

Keep one broadly useful public CV while making Mark's platform, SRE, CI/CD,
networking, and production-operations experience explicit and accurate.

## Positioning

- Byline: "Senior CI/CD and platform engineer with 20 years building and
  operating high-availability telecom, cloud, and payment systems across AWS,
  Azure, and GCP."
- House of Doge title: "Senior Developer - CI/CD", with "Platform engineering
  and SRE focus" presented as a functional subtitle rather than an official
  title.
- One New Zealand shows progression from Junior Developer through Senior
  Developer to Principal Developer without inventing promotion dates.

## Experience Content

### House of Doge

Retain the concise company description and replace generic responsibility
statements with evidence covering:

- Multi-region, multi-environment EKS and cloud networking.
- Helm, Kustomize, kubectl, Linkerd, and production troubleshooting.
- Self-service deployment pipelines and an Argo CD-integrated deployment UI.
- Review-gated AWS CDK diffs in GitHub Actions.
- PostgreSQL, Aurora, ClickHouse, and TigerBeetle infrastructure.
- OpenTelemetry, Honeycomb, Prometheus, Alertmanager, Grafana, and Sentry.
- Least-privilege IAM, External Secrets Operator, AWS Secrets Manager, Parameter
  Store, and SOC 2 readiness.
- Secured MCP services and guardrails for internal developer agents.

### One New Zealand

Use a neutral company description and show:

- Twenty-year progression, mentoring, architecture guidance, and code review.
- Contractual availability and service-quality commitments, on-call, incident
  leadership, root-cause analysis, and reliability improvements.
- VPCs, subnetting, routing, VPNs, private endpoints, and low-level network
  troubleshooting.
- AWS migration and production GCP/Azure IoT exposure through Cloud SQL, Cloud
  Functions, Pub/Sub, Event Hubs, and Service Bus.
- GitLab-based self-service delivery with automated and approval-gated paths.
- Prometheus, Alertmanager, Grafana, and Loki operations.
- National telephone-number administration, IPMS/TNAS portability workflows,
  and queue-based high-volume Ribbon routing updates.
- General-ledger and PCI-DSS-compliant payment capabilities.

### Solus Designs

- Add `2011-present`.
- Retain Tensor Relay and algorithmic-trading projects.

## Skills and Education

Reorganize skills into Cloud, Kubernetes, IaC, CI/CD and GitOps, Observability,
Messaging, Databases, Languages, Web, and AI/Data.

- Keep Go first in Languages without adding proficiency qualifiers.
- Include AWS CDK, Terraform, and Pulumi without implying extensive Terraform
  production depth.
- Add Helm, Kustomize, Alertmanager, Kafka application integration, SNS/SQS,
  Google Cloud Pub/Sub, Azure Event Hubs, Azure Service Bus, PostgreSQL, MySQL,
  Aurora, ClickHouse, and TigerBeetle.
- Correct GitLabs to GitLab CI/CD and ArgoCD to Argo CD.
- Mark AWS Certified Developer - Associate as active.
- Remove Virology I.
- Retain the one-line references statement.

## Presentation

- Add GitHub and LinkedIn to the print letterhead; do not add Instagram.
- Preserve the existing on-screen visual design.
- Give the printed Skills and Education sections a sequential reading order so
  ATS/PDF text extraction does not interleave them.
- Keep the generated PDF as the only downloadable CV.

## Verification

- Run the existing build and PDF-generation scripts.
- Extract text from the generated PDF and verify section order and contact links.
- Check desktop and mobile resume layouts.
- Check the printed PDF remains legible and reasonably sized.
