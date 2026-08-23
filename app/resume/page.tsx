import type { Metadata } from 'next';
import { site, experience, earlierRoles, skills, education } from '@/data/cv';

export const metadata: Metadata = { title: 'Resume' };

export default function Resume() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      {/* Print-only letterhead: the on-screen identity lives in the nav/About, which print hides. */}
      <div className="print-only print-letterhead">
        <div className="name">{site.name}</div>
        <div className="byline">{site.byline}</div>
        <div className="contact">
          {[site.email, site.location].map((item, i) => (
            <span key={item}>
              {i > 0 && <span> · </span>}
              <span style={{ whiteSpace: 'nowrap' }}>{item}</span>
            </span>
          ))}
        </div>
      </div>

      <header className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <h1 className="page-title">Resume</h1>
          <a href="/Mark-Paine-CV.pdf" download className="btn btn-accent btn-beam">
            <svg className="btn-icon" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" />
            </svg>
            Download CV
          </a>
        </div>
        <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
          {site.keywords[0].join(' · ')}
          <br />
          {site.keywords[1].join(' · ')}
        </div>
      </header>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="prompt-line mono">
          $ cat experience.log<span className="cursor" style={{ marginLeft: 6 }} />
        </div>
        <div className="print-only print-section-heading">EXPERIENCE</div>
        {experience.map((job) => (
          <article key={job.company} className="panel job-card">
            <div className="job-head">
              <div className="job-title">
                {job.company} <span className="job-role">· {job.role}</span>
              </div>
              {(job.meta || job.current) && (
                <div className="job-meta">
                  {job.meta}
                  {job.current && (
                    <>
                      {' '}
                      <span className="current-dot" aria-hidden="true"></span>
                      <span style={{ color: 'var(--accent)' }}>Current</span>
                    </>
                  )}
                </div>
              )}
            </div>
            {job.blurb && <p className="job-blurb" style={{ margin: 0 }}>{job.blurb}</p>}
            {job.intro && <p className="job-intro" style={{ margin: 0 }}>{job.intro}</p>}
            <div className="bullets">
              {job.bullets.map((b) => (
                <div key={b} className="bullet">
                  <span className="bullet-marker">▸</span>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          {earlierRoles.map((r) => (
            <div
              key={r.company}
              className="panel"
              style={{ flex: '1 1 300px', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}
            >
              <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-soft)' }}>
                {r.company} <span style={{ color: 'var(--faint)', fontWeight: 400 }}>· {r.role}</span>
              </div>
              <div className="mono" style={{ fontSize: 11.5, color: 'var(--faint)' }}>{r.meta}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: 'flex', gap: 24, alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="prompt-line mono">$ cat skills.yaml</div>
          <div className="print-only print-section-heading">SKILLS</div>
          <div
            className="panel skills-grid"
            style={{
              padding: '18px 22px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px 26px',
              fontSize: 12.5,
              flexGrow: 1,
            }}
          >
            {skills.map((s) => (
              <div key={s.group}>
                <div style={{ color: 'var(--faint)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {s.group}
                </div>
                <div style={{ color: 'var(--text-soft)' }}>{s.items}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="prompt-line mono">$ cat education</div>
          <div className="print-only print-section-heading">EDUCATION</div>
          <div
            className="panel education-list"
            style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12.5, lineHeight: 1.55, flexGrow: 1 }}
          >
            {education.map((e) => (
              <div key={e.title}>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>{e.title}</div>
                {e.detail && <div style={{ color: 'var(--faint)' }}>{e.detail}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
