import Image from 'next/image';
import Link from 'next/link';
import { site, keywordLinks } from '@/data/site.mjs';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  email: `mailto:${site.email}`,
  url: site.baseUrl,
  image: `${site.baseUrl}${site.portraitPath}`,
  jobTitle: site.currentRole,
  worksFor: { '@type': 'Organization', name: site.currentEmployer },
  sameAs: Object.values(site.social),
};

export default function About() {
  return (
    <main id="main-content" className="fill-main centered" style={{ gap: 20 }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, '\\u003c') }}
      />

      <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <h1 className="hero-name">{site.name}</h1>
          <p style={{ fontSize: 15.5, color: 'var(--text-soft)', maxWidth: '40ch', margin: 0 }}>{site.description}</p>
          <div className="pill-rows" style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {site.keywords.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {row.map((k) => (
                  <a key={k} className="pill" href={keywordLinks[k]} target="_blank" rel="noopener noreferrer" title={`${k} — Wikipedia`}>
                    {k}
                  </a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
            <a href={site.pdfPath} download className="btn btn-accent btn-beam" data-umami-event="cv-download">
              <svg className="btn-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" />
              </svg>
              Download CV
            </a>
            <Link href="/resume/" className="btn btn-plain btn-beam">
              View resume
            </Link>
          </div>
        </div>
        <div className="hero-media" style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
          <div className="panel headshot-card">
            <Image src={site.portraitPath} alt={site.name} fill sizes="(max-width: 720px) 72vw, 330px" style={{ objectFit: 'cover' }} priority />
          </div>
          <div className="status-line">
            Status: <span className="val">{site.status}</span> <span className="spin-line" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div className="panel whoami">
        <div className="prompt-line">
          $ whoami --verbose<span className="cursor" style={{ marginLeft: 6 }} />
        </div>
        <div className="whoami-body">
          <span className="k">Current:</span>
          <span className="v">
            {site.currentRole} @ {site.currentEmployer}&nbsp;&nbsp;({site.currentFocus})
          </span>
          <span className="k">Founder:</span>
          <span className="v">{site.founderSummary}</span>
          <span className="k">History:</span>
          <span className="v">{site.historySummary}</span>
        </div>
      </div>
    </main>
  );
}
