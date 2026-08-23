import Image from 'next/image';
import Link from 'next/link';
import { site, keywordLinks } from '@/data/cv';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  email: `mailto:${site.email}`,
  url: `https://${site.domain}`,
  image: `https://${site.domain}/headshot.jpg`,
  jobTitle: 'Platform Engineer / SRE',
  worksFor: { '@type': 'Organization', name: 'House of Doge' },
  sameAs: [site.github, site.linkedin, site.instagram],
};

export default function About() {
  return (
    <main className="fill-main centered" style={{ gap: 20 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <h1 className="hero-name">{site.name}</h1>
          <p style={{ fontSize: 15.5, color: 'var(--text-soft)', maxWidth: '40ch', margin: 0 }}>{site.byline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
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
            <a href="/Mark-Paine-CV.pdf" download className="btn btn-accent btn-beam">
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
          <div className="panel headshot-card">
            <Image src="/headshot.jpg" alt={site.name} fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div className="status-line">
            Status: <span className="val">Building</span> <span className="spin-line" aria-hidden="true"></span>
          </div>
        </div>
      </div>

      <div className="panel whoami">
        <div className="prompt-line">$ whoami --verbose</div>
        <div style={{ whiteSpace: 'pre' }}>
          {'Current:   Platform Engineer / SRE @ House of Doge  (Dogecoin payment infrastructure)\n'}
          {'Founder:   Solus Designs Ltd — maker of Tensor Relay, distributed AI inference at scale\n'}
          {'History:   20y telecom-grade backend @ One New Zealand '}
          <span className="cursor" />
        </div>
      </div>
    </main>
  );
}
