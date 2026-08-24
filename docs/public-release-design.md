# Public Release Hardening Design

## Goal

Turn `markpaine-site` into a polished personal site that is also safe and
straightforward for other people to fork, customize, build, and deploy.

The live Mark Paine site remains the canonical example. The repository becomes
a fork-friendly starter rather than a second generic template product.

## Reuse Model

### Configuration

Create one central site configuration for:

- Name, domain, email, location, and abbreviated mobile location.
- Shell prompt, current status, social links, and repository URL.
- Current role, employer, homepage highlights, and JSON-LD identity.
- PDF filename and public image paths.
- Optional geographic footer decoration.

Keep career history, skills, and education in `data/cv.ts`. Components must not
contain Mark-specific identity or career copy.

Provide example configuration and CV data that show fork owners exactly what to
replace. Mark's real data remains the live example.

### Assets

The NZ footer decoration becomes optional. Forks can use a text-only footer.

`public/headshot.jpg` is not offered under the repository's MIT license. The
README must tell fork owners to replace it and record the photo's separate
copyright status.

Remove the Mark-specific CV revision design note from the public repository.
Keep the architecture ADR because it explains the reusable site/PDF model.

## README and Repository Presentation

Rewrite the README around the reusable product:

1. Clear value proposition.
2. Live site and generated PDF links.
3. Desktop screenshot.
4. Feature summary.
5. Five-minute fork and customization path.
6. Local build and PDF commands.
7. Static-host, Docker, and optional GitOps deployment paths.
8. Architecture and project-structure explanation.
9. Asset licensing and attribution.
10. Welcoming MIT note: use it, fork it, and make it yours.

Update GitHub repository metadata with:

- Homepage: `https://markpaine.dev`
- A description that presents the repository as a fork-friendly CV site.
- Topics covering Next.js, CV/resume templates, static sites, Playwright,
  Docker, and GitOps.

## Application and Accessibility

- Footer displays `Auckland, New Zealand` on desktop and `Auckland, NZ` on
  mobile.
- Add a skip link and `aria-current` navigation state.
- Announce email-copy confirmation through a live region.
- Replace generic resume bullet and title containers with semantic headings and
  lists while preserving the current design.
- Raise low-contrast small-text colors to accessible levels.
- Add page-specific canonical/Open Graph metadata, sitemap, robots metadata,
  and an accessible custom 404.
- Escape embedded JSON-LD defensively.

## Dependencies and Quality Gates

Upgrade to Next.js 16 and compatible current dependencies to resolve the
audited PostCSS and Sharp advisories.

Add non-interactive quality commands:

- Lint.
- Typecheck.
- Unit/config validation where useful.
- Production build.
- PDF generation and validation.
- Playwright route, responsive-layout, link, and accessibility smoke tests.

CI must run these checks for pull requests and main-branch changes.

## PDF Generation

The PDF renderer must:

- Refuse paths outside the static output directory.
- Check that `/resume/` loaded successfully.
- Assert identifying resume content before rendering.
- Always close browser and server resources.
- Verify that the result is a non-trivial PDF artifact.

The generated PDF remains derived from the resume page and print stylesheet.

## Delivery and Security

Split CI concerns:

- Validation uses read-only permissions.
- Image publishing only runs for an explicitly enabled main-branch deployment.
- Image coordinates derive from the fork owner's repository rather than
  `mpainenz`.
- The private Solus GitOps update is optional and guarded by repository
  variables/secrets.
- Deployment concurrency prevents an older run from replacing a newer image.

Make `docker build` work from a clean checkout through a multi-stage build. Use
an unprivileged nginx runtime and add a `.dockerignore`.

Add practical static-site headers for clickjacking, MIME sniffing, referrer,
permissions, and content security. Add Dependabot coverage for npm, Actions, and
Docker dependencies.

## LinkedIn Deliverable

Do not modify LinkedIn automatically. Prepare ready-to-paste:

- General senior CI/CD/platform/SRE headline.
- About section aligned with the CV.
- House of Doge and One New Zealand descriptions.
- Featured-link title and description for `markpaine.dev`.
- Profile checklist covering website/contact links, skills, certification,
  custom URL, banner, and stale low-value sections.

## Verification

Before publishing:

- Dependency audit has no known high or critical issues.
- Lint, typecheck, tests, build, and PDF validation pass.
- Docker image builds from a clean source tree and serves the static site.
- Desktop and mobile screenshots show no overflow or regressions.
- Automated accessibility smoke tests pass.
- PDF text extraction retains the intended reading order.
- README links and fork instructions are valid.
- GitHub metadata links back to the live site.
