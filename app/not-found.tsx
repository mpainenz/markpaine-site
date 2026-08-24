import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="fill-main centered" style={{ gap: 18 }}>
      <div className="prompt-line mono">404: path not found</div>
      <h1 className="page-title">This page does not exist.</h1>
      <p style={{ color: 'var(--muted)', margin: 0 }}>
        The address may have changed, or the link may be incomplete.
      </p>
      <div>
        <Link href="/" className="btn btn-accent btn-beam">
          Return home
        </Link>
      </div>
    </main>
  );
}
