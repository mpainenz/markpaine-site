# Cloud and Telematics CV Design

## Goal

Correctly separate Mark's GCP, AWS and Azure work at One New Zealand while
making substantial cloud-modernisation and telematics experience visible in the
general CV.

## One New Zealand

Replace the existing combined networking and cloud-platform wording with three
focused bullets:

- Designed cloud networking across VPCs, subnetting, routing, VPN connectivity
  and private endpoints; built GCP-hosted Cisco Meraki integrations and
  configuration automation supporting device procurement and automated SD-WAN
  provisioning for One NZ's Connected Business service.
- Modernised and containerised core systems for AWS, decomposing selected
  workloads into microservices and migrating several large production
  databases from on-premises infrastructure.
- Built and maintained device-provisioning services on AWS ECS for enterprise
  telematics integrations with Solution Dynamics and Telematics Guru;
  contributed separately to Azure IoT workflows using Event Hubs and Service
  Bus.

## Accuracy Boundaries

- Do not name EROAD in the public CV.
- Do not imply that the Connected Business platform ran on Azure.
- Do not imply that the telematics provisioning platform ran on GCP or Azure.
- Do not name C# in the telematics bullet.
- Describe the AWS modernisation as a mix of containerisation and selective
  microservice decomposition, not a complete rewrite.

## Scope

- Update `data/cv.ts`.
- Preserve the existing general-purpose CV.
- Make only necessary print-layout adjustments if the additional bullet causes
  clipping or increases the PDF page count.

## Verification

- Run the repository's full verification command.
- Confirm the generated PDF remains three pages.
- Confirm the PDF contains the new GCP, AWS modernisation, AWS ECS and Azure
  wording.
