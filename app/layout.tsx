import type { Metadata } from 'next';
import { site } from '@/data/site.mjs';
import { getAnalyticsConfig } from '@/data/analytics.mjs';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${site.name} — CI/CD & Platform Engineering`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.baseUrl),
  alternates: { canonical: '/' },
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.baseUrl,
    siteName: site.name,
    images: [{ url: site.portraitPath, alt: site.name }],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: site.name,
    description: site.description,
    images: [site.portraitPath],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const analytics = getAnalyticsConfig();

  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {analytics && (
          <script
            defer
            src={analytics.scriptPath}
            data-website-id={analytics.websiteId}
            data-domains={analytics.domains}
            data-do-not-track="true"
          />
        )}
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="page">
          <SiteNav />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
