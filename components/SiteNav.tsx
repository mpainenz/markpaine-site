'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/data/site.mjs';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'About' },
  { href: '/resume/', label: 'Resume' },
  { href: '/contact/', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  return (
    <nav className="nav" aria-label="Primary navigation" style={{ marginBottom: 20 }}>
      <div className="nav-prompt mono">{site.prompt}</div>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? 'active' : ''}
            aria-current={pathname === l.href ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
