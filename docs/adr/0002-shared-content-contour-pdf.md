# Shared content, responsive résumé and Contour PDF

The website and PDF read the same profile, strengths, experience, skills and education exports from data/cv.ts. Contact details and the homepage introduction remain in data/site.mjs.

The responsive résumé retains the website theme. The build generates a dedicated, noindex print page at /print/resume/ with the approved three-page Contour presentation. The existing PDF command and container build publish it at the unchanged /Mark-Paine-CV.pdf URL. The private design studio remains an archive of design exploration, not a second production content source.

PDF validation checks all shared content, three-page geometry and clickable links. This replaces the former requirement that the PDF use the same DOM as the screen résumé. Presentation can differ without duplicating the underlying career content. Cover letters are not published on the public website.
