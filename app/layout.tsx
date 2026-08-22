import type { Metadata } from 'next';
import { site } from '@/data/cv';
import SiteNav from '@/components/SiteNav';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Platform Engineering`,
    template: `%s — ${site.name}`,
  },
  description: site.byline,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    title: site.name,
    description: site.byline,
    url: `https://${site.domain}`,
    siteName: site.name,
    images: ['/headshot.jpg'],
    type: 'website',
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <div className="page">
          <SiteNav />
          {children}
        </div>
      </body>
    </html>
  );
}
