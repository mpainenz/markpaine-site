import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/cv';

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
    <main style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

      <div style={{ display: 'flex', gap: 36, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 15 }}>
          <h1 style={{ fontSize: 46, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05, margin: 0 }}>
            {site.name}
          </h1>
          <p style={{ fontSize: 15.5, color: 'var(--text-soft)', maxWidth: '40ch', margin: 0 }}>{site.byline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {site.keywords.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {row.map((k) => (
                  <span key={k} className="pill">
                    {k}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
            <a href="/Mark-Paine-CV.pdf" download className="btn btn-accent">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" />
              </svg>
              Download CV
            </a>
            <Link href="/resume/" className="btn btn-plain">
              View resume
            </Link>
          </div>
        </div>
        <div
          className="panel"
          style={{ width: 270, height: 330, flexShrink: 0, overflow: 'hidden', borderRadius: 14, position: 'relative' }}
        >
          <Image src="/headshot.jpg" alt={site.name} fill style={{ objectFit: 'cover' }} priority />
        </div>
      </div>

      <div className="panel mono" style={{ padding: '16px 20px', fontSize: 12.5, lineHeight: 1.75, color: 'var(--text-soft)', overflowX: 'auto' }}>
        <div className="prompt-line">$ whoami --verbose</div>
        <div style={{ whiteSpace: 'pre' }}>
          {'Current:   Platform Engineer / SRE @ House of Doge  (Dogecoin payment infrastructure)\n'}
          {'Founder:   Solus Designs Ltd — maker of Tensor Relay, distributed AI inference at scale\n'}
          {'History:   20y telecom-grade backend @ One New Zealand    Status: '}
          <span style={{ color: 'var(--accent)' }}>Running</span>
          <span className="cursor" />
        </div>
      </div>
    </main>
  );
}
