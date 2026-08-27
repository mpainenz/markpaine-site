import type { Metadata } from 'next';
import { site } from '@/data/site.mjs';

export const metadata: Metadata = {
  title: 'Privacy',
  description: `Privacy information for ${site.name}'s website.`,
  alternates: { canonical: '/privacy/' },
  openGraph: {
    title: `Privacy — ${site.name}`,
    description: `Privacy information for ${site.name}'s website.`,
    url: '/privacy/',
  },
};

export default function Privacy() {
  return (
    <main id="main-content" className="fill-main centered">
      <article className="panel" style={{ padding: 'clamp(22px, 5vw, 36px)', maxWidth: '72ch' }}>
        <h1 className="page-title" style={{ marginBottom: 22 }}>
          Privacy
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--text-soft)', lineHeight: 1.7 }}>
          <p style={{ margin: 0 }}>
            This site uses self-hosted, cookieless analytics to understand how visitors use it. Analytics may include pages viewed, visit duration, referring site,
            approximate country or region, browser, operating system, device type, campaign parameters, and interactions such as CV downloads or contact-link clicks.
          </p>
          <p style={{ margin: 0 }}>
            The analytics system does not retain raw IP addresses, use advertising identifiers, or sell information. Normal hosting and security infrastructure may process
            request metadata as part of operating the site.
          </p>
          <p style={{ margin: 0 }}>
            Anonymous visit summaries may be processed by third-party service providers for private operational notifications. Detailed analytics are retained for up to 12
            months. Browser Do Not Track preferences are respected.
          </p>
          <p style={{ margin: 0 }}>Privacy questions can be sent through the contact details on this site.</p>
        </div>
      </article>
    </main>
  );
}
