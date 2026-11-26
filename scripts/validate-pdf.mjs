import { experience, earlierRoles, skills, education, profile, coreStrengths } from '../data/cv.ts';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

const pdfPath = path.resolve('out', process.env.CV_PDF_FILENAME ?? 'Mark-Paine-CV.pdf');
const bytes = await readFile(pdfPath);
const fileStat = await stat(pdfPath);

assert.ok(bytes.subarray(0, 5).equals(Buffer.from('%PDF-')), 'CV artifact is not a PDF');
assert.ok(fileStat.size >= 5_000, `CV PDF is unexpectedly small (${fileStat.size} bytes)`);

const document = await getDocument({ data: new Uint8Array(bytes) }).promise;
assert.ok(document.numPages === 3, `Unexpected CV page count: ${document.numPages}`);

const pages = [];
for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
  const page = await document.getPage(pageNumber);
  const content = await page.getTextContent();
  pages.push(content.items.map((item) => ('str' in item ? item.str : '')).join(' '));
}

const text = pages.join('\n').replace(/\s+/g, ' ');
for (const expected of ['Mark Paine', 'House of Doge', 'One New Zealand', 'mpainenz@gmail.com']) {
  assert.ok(text.includes(expected), `CV PDF is missing expected text: ${expected}`);
}

const normalise = value => value.normalize('NFKC').replace(/[\s\u00ad]+/g, '');
const fragments = [...profile, ...coreStrengths.flatMap(item => Object.values(item)),
  ...skills.flatMap(item => Object.values(item)), ...education.flatMap(item => Object.values(item)),
  ...earlierRoles.flatMap(item => Object.values(item)),
  ...experience.flatMap(job => [job.company, job.role, job.meta, job.blurb, job.intro, ...job.bullets].filter(Boolean))];
for (const fragment of fragments) assert.ok(normalise(text).includes(normalise(fragment)), `PDF missing shared content: ${fragment}`);
const links = [];
for (let i = 1; i <= document.numPages; i++) {
  const page = await document.getPage(i);
  links.push(...(await page.getAnnotations()).filter(item => item.subtype === 'Link').map(item => item.url));
}
for (const url of ['https://markpaine.dev/', 'https://www.linkedin.com/in/markpainenz/', 'https://one.nz/']) assert.ok(links.includes(url), `Missing PDF link: ${url}`);
console.log(`validated ${path.relative(process.cwd(), pdfPath)} (${document.numPages} pages, shared content and links intact)`);
