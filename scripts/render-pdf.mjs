import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { startStaticServer } from './static-server.mjs';

import { site } from '../data/site.mjs';
import { experience, earlierRoles, skills, education, profile, coreStrengths } from '../data/cv.ts';
import { signalDocumentHTML } from './pdf/document.mjs';

const OUT = path.resolve('out');
const pdfFilename = process.env.CV_PDF_FILENAME ?? 'Mark-Paine-CV.pdf';
const PDF = path.resolve(OUT, pdfFilename);

if (!existsSync(OUT)) {
  throw new Error('out/ not found — run `npm run build` first.');
}

if (PDF !== OUT && !PDF.startsWith(`${OUT}${path.sep}`)) {
  throw new Error('CV_PDF_FILENAME must resolve inside out/.');
}

const printDirectory = path.join(OUT, 'print/resume');
await mkdir(printDirectory, { recursive: true });
await writeFile(path.join(printDirectory, 'index.html'), signalDocumentHTML(
  { site, experience, earlierRoles, skills, education, contourProfile: profile, contourStrengths: coreStrengths },
  { id: 'signal-contour', name: 'Signal Contour', layout: 'left', heading: 'DM Sans', body: 'DM Sans', accentPattern: 'topography' },
  'cv',
));

const staticServer = await startStaticServer(OUT);
let browser;

try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  const response = await page.goto(`${staticServer.baseUrl}/print/resume/`, { waitUntil: 'networkidle' });

  if (!response?.ok()) {
    throw new Error(`Resume page failed to load (${response?.status() ?? 'no response'}).`);
  }

  await page.getByRole('heading', { name: 'Mark Paine', exact: true }).waitFor();
  await page.evaluate(() => document.fonts.ready);
  if (!await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))) throw new Error('Missing CV image');
  const pages = await page.locator('.sheet').evaluateAll(sheets => sheets.map(sheet => {
    const footer = sheet.querySelector('.folio').getBoundingClientRect();
    return [...sheet.querySelectorAll('[data-bounds]')].every(column => column.getBoundingClientRect().bottom <= footer.top - 6 && [...column.querySelectorAll('p,li,dt,dd,h1,h2,h3,address > *')].every(text => text.scrollWidth <= text.clientWidth + 1));
  }));
  if (pages.length !== 3 || pages.includes(false)) throw new Error('Contour CV must fit three unclipped pages');
  await page.getByText('House of Doge', { exact: false }).first().waitFor();
  await page.pdf({
    path: PDF,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    tagged: true,
  });

  const pdf = await readFile(PDF);
  const pdfStat = await stat(PDF);
  if (!pdf.subarray(0, 5).equals(Buffer.from('%PDF-')) || pdfStat.size < 5_000) {
    throw new Error(`Rendered PDF is invalid or unexpectedly small (${pdfStat.size} bytes).`);
  }

  console.log(`wrote ${PDF} (${pdfStat.size} bytes)`);
} finally {
  await browser?.close();
  await staticServer.close();
}
