# markpaine-site

Personal site and CV for Mark Paine — [markpaine.dev](https://markpaine.dev).

Built with Next.js (static export). The Download CV button serves a real PDF:
CI renders the `/resume` page through its `@media print` stylesheet with
headless Chromium, so the site and the PDF can never drift apart — the site
*is* the CV.

## How it ships

```
push to main
  → next build            (static export to out/)
  → playwright render     (out/Mark-Paine-CV.pdf from /resume print CSS)
  → docker build + push   (nginx image → ghcr.io/mpainenz/markpaine-site)
  → GitOps tag bump       (private repo; ArgoCD syncs it to the cluster)
```

Pull requests run the build and PDF render only.

## Local development

```
npm install
npm run dev        # dev server
npm run build      # static export to out/
npm run pdf        # render the CV PDF from the built site
```

## Credits

The structure of this site — an About / Resume / Contact split with the
resume doubling as the printable CV — is inspired by Michael D'Angelo's
[mldangelo.com](https://mldangelo.com/) and his
[mldangelo/personal-site](https://github.com/mldangelo/personal-site).
No code was copied; the idea lineage is his.

## License

[MIT](./LICENSE) © Mark Paine
