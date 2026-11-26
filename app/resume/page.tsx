import { companyMark } from '@/data/company-marks.mjs';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site.mjs';
import { experience, earlierRoles, skills, education, coreStrengths } from '@/data/cv';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${site.name}'s experience, skills, and education.`,
  alternates: { canonical: '/resume/' },
  openGraph: {
    title: `Resume — ${site.name}`,
    description: `${site.name}'s experience, skills, and education.`,
    url: '/resume/',
  },
};

function CompanyMark({ company }: { company: string }) {
  const image = companyMark(company)?.image;
  if (!image) return null;
  return (
    <span className="company-mark">
      <Image src={`/cv-assets/companies/${image}`} alt="" width={36} height={36} unoptimized />
    </span>
  );
}

function CompanyHeading({ company, role, focus }: { company: string; role: string; focus?: string }) {
  return (
    <div className="company-heading">
      <CompanyMark company={company} />
      <div>
        <h3 className="job-title">
          {company}
          <span className="job-sep"> · </span>
          <span className="job-role">{role}</span>
        </h3>
        {focus && <div className="job-focus">{focus}</div>}
      </div>
    </div>
  );
}

export default function Resume() {
  const printContacts = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.location },
    { label: 'github.com/mpainenz', href: site.social.github },
    { label: 'linkedin.com/in/markpainenz', href: site.social.linkedin },
  ];

  return (
    <main id="main-content" className="resume-content" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      {/* Print-only letterhead: the on-screen identity lives in the nav/About, which print hides. */}
      <div className="print-only print-letterhead">
        <div className="name">{site.name}</div>
        <div className="byline">{site.description}</div>
        <div className="contact">
          {printContacts.map((item, i) => (
            <span key={item.label}>
              {i > 0 && <span> · </span>}
              {item.href ? (
                <a
                  href={item.href}
                  style={{ whiteSpace: 'nowrap', color: 'inherit', textDecoration: 'none' }}
                  data-umami-event={
                    item.href === site.social.github
                      ? 'github-click'
                      : item.href === site.social.linkedin
                        ? 'linkedin-click'
                        : undefined
                  }
                >
                  {item.label}
                </a>
              ) : (
                <span style={{ whiteSpace: 'nowrap' }}>{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      <header className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <h1 className="page-title">Resume</h1>
          <a
            href={site.pdfPath}
            download
            className="btn btn-accent btn-beam"
            style={{ padding: '8px 14px', fontSize: 13 }}
            data-umami-event="cv-download"
          >
            <svg className="btn-icon" width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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

      <section className="resume-strengths no-print" aria-labelledby="strengths-heading">
        <h2 id="strengths-heading" className="sr-only">Core strengths</h2>
        <div className="prompt-line mono" aria-hidden="true">$ cat strengths.md</div>
        <dl className="panel strengths-list">
          {coreStrengths.map((strength) => (
            <div key={strength.title}>
              <dt>{strength.title}</dt>
              <dd>{strength.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="experience-heading" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <h2 id="experience-heading" className="sr-only">Experience</h2>
        <div className="prompt-line mono">
          $ cat experience.log<span className="cursor" style={{ marginLeft: 6 }} />
        </div>
        <div className="print-only print-section-heading">EXPERIENCE</div>
        {experience.map((job) => (
          <article key={job.company} id={job.company.toLowerCase().replaceAll(' ', '-')} className={`panel job-card${job.printBreak ? ' print-break' : ''}`}>
            <div className="job-head">
              <CompanyHeading company={job.company} role={job.role} focus={job.focus} />
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
            <ul className="bullets">
              {job.bullets.map((b) => (
                <li key={b} className="bullet">
                  <span className="bullet-marker" aria-hidden="true">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <div className="tombstones" id="earlier-experience">
          {earlierRoles.map(({ company, positions: [primary, ...previous], seeAlso }) => (
            <article className="panel earlier-job" key={company}>
              <CompanyHeading company={company} role={primary.title} />
              <span className="job-meta">{primary.dates}</span>
              {previous.map(({ title, dates }) => (
                <div className="earlier-position" key={title}>
                  <span>{title}</span>
                  <span className="job-meta">{dates}</span>
                </div>
              ))}
              {seeAlso && <small>(<a href={seeAlso.href}>{seeAlso.label}</a>)</small>}
            </article>
          ))}
        </div>
      </section>

      <section className="credentials-layout" style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <section aria-labelledby="skills-heading" style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 id="skills-heading" className="sr-only">Skills</h2>
          <div className="prompt-line mono">$ cat skills.yaml</div>
          <div className="print-only print-section-heading">SKILLS</div>
          <dl
            className="panel skills-grid"
            style={{
              margin: 0,
              padding: '16px 22px',
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, max-content) 1fr',
              gap: '7px 18px',
              fontSize: 12.5,
              alignContent: 'start',
            }}
          >
            {skills.map((s) => (
              <div key={s.group} style={{ display: 'contents' }}>
                <dt style={{ color: 'var(--faint)', fontSize: 10.5, letterSpacing: '0.08em', textTransform: 'uppercase', paddingTop: 2 }}>
                  {s.group}
                </dt>
                <dd style={{ color: 'var(--text-soft)', margin: 0 }}>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="education-heading" style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 id="education-heading" className="sr-only">Education</h2>
          <div className="prompt-line mono">$ cat education</div>
          <div className="print-only print-section-heading">EDUCATION</div>
          <ul
            className="panel education-list"
            style={{ margin: 0, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 12.5, lineHeight: 1.55, listStyle: 'none' }}
          >
            {education.map((e) => (
              <li key={e.title}>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>{e.title}</div>
                {e.detail && <div style={{ color: 'var(--faint)' }}>{e.detail}</div>}
              </li>
            ))}
          </ul>
        </section>
      </section>

      <section aria-labelledby="references-heading" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h2 id="references-heading" className="sr-only">References</h2>
        <div className="prompt-line mono">$ cat references.txt</div>
        <div className="panel no-print mono references-copy" style={{ padding: '14px 20px', fontSize: 12.5, lineHeight: 1.7 }}>
          <div style={{ color: '#E5C07B' }}>cat: references.txt: elevated permissions required</div>
          <div style={{ color: 'var(--faint)' }}>
            # references are available on request —{' '}
            <Link href="/contact/" data-umami-event="contact-click">
              mark --contact
            </Link>
          </div>
        </div>
        <div className="print-only" style={{ fontSize: '10pt', color: '#444b55' }}>References available on request.</div>
      </section>
    </main>
  );
}
