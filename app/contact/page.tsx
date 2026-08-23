import type { Metadata } from 'next';
import { site } from '@/data/cv';
import CopyEmail from '@/components/CopyEmail';

export const metadata: Metadata = { title: 'Contact' };

const iconGitHub = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);
const iconLinkedIn = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);
const iconInstagram = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
    <circle cx="12" cy="12" r="4.4" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

export default function Contact() {
  return (
    <main className="fill-main" style={{ gap: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, flexGrow: 1, justifyContent: 'center', maxWidth: '56ch' }}>
        <div className="prompt-line mono" style={{ fontSize: 13.5 }}>
          $ mark --contact
          <span className="cursor" />
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 7vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, margin: 0 }}>
          Interesting problem?
          <br />
          Let&apos;s talk.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', margin: 0 }}>
          Based in Auckland, New Zealand — comfortable remote across timezones.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
          <CopyEmail email={site.email} />
          <a href={site.github} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
            {iconGitHub} GitHub
          </a>
          <a href={site.linkedin} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
            {iconLinkedIn} LinkedIn
          </a>
          <a href={site.instagram} className="btn btn-plain" target="_blank" rel="noopener noreferrer">
            {iconInstagram} Instagram
          </a>
        </div>
        <div style={{ fontSize: 12, color: 'var(--faint)' }}>The email button copies the address to your clipboard.</div>
      </div>
      <footer
        className="site-footer"
        style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 12, color: 'var(--faint)' }}
      >
        <span>Mark Paine · Auckland, NZ</span>
        <span className="mono">
          built by hand ·{' '}
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            deployed from a public repo
          </a>
        </span>
      </footer>
    </main>
  );
}
