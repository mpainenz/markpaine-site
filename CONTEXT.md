# Context

Glossary for markpaine-site. Terms only — implementation lives in `docs/adr/`.

| Term | Meaning |
| --- | --- |
| **The CV** | The single body of career content (experience, skills, education) defined in `data/cv.ts`. Rendered two ways: the Resume page on screen, and the PDF in print. There is no other copy. |
| **The PDF** | `Mark-Paine-CV.pdf` — the Resume page rendered through the print stylesheet. Never hand-authored. |
| **Print letterhead** | The name/byline/contact block that exists only in print — on screen that identity lives in the nav and About page. |
| **Island** | A client-side interactive component (theme toggle, copy-email) in an otherwise static page. |
| **GitOps bump** | CI committing a new image tag into the private `solus` repo, which ArgoCD watches. The bump *is* the deploy. |
| **Origin host** | The Cloudflare-bypassing hostname pattern (`*-origin.*`) used on Traefik, mirroring the tensorrelay.com setup. |
| **Earlier roles** | WXC and iHug — shown as one-line tombstones, not full cards. |
