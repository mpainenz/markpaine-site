# Networking CV Design

## Goal

Make Mark's enterprise networking and network automation experience visible in
the general CV without presenting him as a customer-facing network architect.

## One New Zealand

Replace the existing cloud networking bullet with:

> Designed cloud networking across VPCs, subnetting, routing, VPN connectivity
> and private endpoints; built Cisco Meraki API integrations and configuration
> automation supporting device procurement and automated SD-WAN provisioning
> for One NZ's Connected Business service.

This wording records direct internal platform enablement work while avoiding a
claim that Mark designed customer SD-WAN solutions.

## Skills

Add a Networking group containing:

`SD-WAN · Cisco Meraki · VPCs · Routing · VPNs · Private endpoints · DNS · Load balancing`

Do not add technologies such as SASE, SSE, firewall platforms, wireless
management or access-control products without direct experience.

## Scope

- Update `data/cv.ts`.
- Preserve the existing general-purpose CV rather than creating an
  Inde-specific variant.
- Do not change role titles, dates or unrelated employment content.
- Make only necessary print-layout adjustments if the additional skills row
  causes clipping or increases the PDF page count.

## Verification

- Run the full repository verification command.
- Confirm the generated PDF remains three pages.
- Confirm the PDF contains `SD-WAN`, `Cisco Meraki`, `Connected Business` and
  `automated SD-WAN provisioning`.
