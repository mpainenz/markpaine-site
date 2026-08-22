'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button className="btn btn-accent mono" onClick={copy} style={{ alignSelf: 'flex-start', fontSize: 13.5 }}>
      {copied ? 'copied ✓' : email}
    </button>
  );
}
