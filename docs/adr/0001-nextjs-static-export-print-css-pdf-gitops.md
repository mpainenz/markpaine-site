# 0001 — Next.js static export, print-CSS PDF, split-repo GitOps

Date: 2026-08-22
Status: accepted

## Context

A personal CV site with three pages, a downloadable CV, and hosting on a
private home Kubernetes cluster (Traefik + ArgoCD, Cloudflare-fronted). The
CV was previously a Word document maintained separately from any web presence,
and the two drifted.

## Decision

1. **Full Next.js, but `output: 'export'`.** The site is authored as a React
   app (components, JSX, client islands for the theme toggle and copy-email
   button) yet ships as plain static files served by nginx. No Node runtime
   in the cluster.
2. **The PDF is the resume page.** CI renders `/resume` through its
   `@media print` stylesheet with headless Chromium and bakes the result into
   the image at `/Mark-Paine-CV.pdf`. There is no second CV source — print CSS
   *is* the CV layout, so site and PDF cannot drift.
3. **Public code, private manifests.** This repo is public (MIT). The
   Kubernetes manifests live in the private `solus` GitOps repo under
   `argocd/tortoise/apps/markpaine-site/`; CI pushes the image to GHCR and
   bumps the tag over a fine-grained PAT. Cluster hostnames and layout stay
   out of the public repo.

## Consequences

- Anything dynamic must be a client-side island or move the site off static
  export (that line is where this ADR would be revisited).
- The PDF regenerates on every deploy; the Download link always matches the
  live site content.
- Forks of this repo get a working site + PDF pipeline but no deploy target —
  the GitOps bump step degrades to a warning when the token is absent.
- Alternatives rejected: Astro islands (wanted the full-React DX), a Node
  server in-cluster (nothing needs a server), a dedicated PDF template
  (second layout to maintain), manifests in this repo (leaks home-lab detail).
