# Cursor Layout Design

## Goal

Keep exactly one blinking terminal cursor on each content page and place the
Contact page's terminal prompt immediately above its action buttons.

## Changes

- Resume keeps the cursor after `$ cat experience.log`.
- Resume removes the cursor after `$ cat references.txt`; the prompt text
  remains unchanged.
- Contact moves the complete `$ mark --contact` prompt from the top of the
  content column to between the location paragraph and the button row.
- The existing spacing, typography, animation, accessibility behavior, and
  responsive layout remain unchanged.
- The existing `GitLab CI/CD` wording remains unchanged because the source
  contains no `GitLabs` typo.

## Scope

Only `app/resume/page.tsx` and `app/contact/page.tsx` require markup changes.
No shared component or CSS refactor is warranted for this small correction.

## Verification

- Search the application pages and confirm one `cursor` element per page.
- Run lint and the production build.
- Check Resume and Contact at desktop and mobile widths.
- Confirm the Contact prompt appears directly above the button row.
