import type { Metadata } from 'next';
import { site } from '@/data/cv';
import CopyEmail from '@/components/CopyEmail';

export const metadata: Metadata = { title: 'Contact' };

export default function Contact() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 24, minHeight: '60vh' }}>
      <div className="prompt-line mono">$ mark --contact</div>
      <h1 style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>
        Interesting problem? Let&apos;s talk.
      </h1>
      <CopyEmail email={site.email} />
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a href={site.github} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={site.linkedin} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={site.instagram} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </div>
      <footer className="site-footer" style={{ marginTop: 'auto', fontSize: 12, color: 'var(--faint)' }}>
        built by hand · deployed from{' '}
        <a href={site.repo} target="_blank" rel="noopener noreferrer">
          a public repo
        </a>
      </footer>
    </main>
  );
}
