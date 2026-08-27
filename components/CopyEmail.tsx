'use client';

import { useState } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (eventName: string) => unknown;
    };
  }
}

function trackEmailCopy() {
  try {
    void Promise.resolve(window.umami?.track('email-copy')).catch(() => {});
  } catch {
    // Analytics must never affect the contact action.
  }
}

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      trackEmailCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <>
      <button className="btn btn-accent btn-beam mono" onClick={copy} style={{ fontSize: 13.5 }}>
        <svg className="btn-icon" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
          <path d="M2 4l6 5 6-5" />
        </svg>
        {copied ? 'copied ✓' : email}
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="var(--faint)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
        </svg>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard.' : ''}
      </span>
    </>
  );
}
