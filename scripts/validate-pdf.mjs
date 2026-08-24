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
assert.ok(document.numPages >= 1 && document.numPages <= 5, `Unexpected CV page count: ${document.numPages}`);

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

const sections = [
  { label: 'EXPERIENCE', pattern: /E\s*X\s*P\s*E\s*R\s*I\s*E\s*N\s*C\s*E/ },
  { label: 'SKILLS', pattern: /S\s*K\s*I\s*L\s*L\s*S/ },
  { label: 'EDUCATION', pattern: /E\s*D\s*U\s*C\s*A\s*T\s*I\s*O\s*N/ },
  { label: 'References', pattern: /References available on request\./ },
];
let previousIndex = -1;
for (const section of sections) {
  const index = text.search(section.pattern);
  assert.ok(index > previousIndex, `CV PDF section is missing or out of order: ${section.label}`);
  previousIndex = index;
}

console.log(`validated ${path.relative(process.cwd(), pdfPath)} (${document.numPages} pages, ${fileStat.size} bytes)`);
