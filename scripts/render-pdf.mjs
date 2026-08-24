import { readFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { startStaticServer } from './static-server.mjs';

const OUT = path.resolve('out');
const pdfFilename = process.env.CV_PDF_FILENAME ?? 'Mark-Paine-CV.pdf';
const PDF = path.resolve(OUT, pdfFilename);

if (!existsSync(OUT)) {
  throw new Error('out/ not found — run `npm run build` first.');
}

if (PDF !== OUT && !PDF.startsWith(`${OUT}${path.sep}`)) {
  throw new Error('CV_PDF_FILENAME must resolve inside out/.');
}

const staticServer = await startStaticServer(OUT);
let browser;

try {
  browser = await chromium.launch();
  const page = await browser.newPage();
  const response = await page.goto(`${staticServer.baseUrl}/resume/`, { waitUntil: 'networkidle' });

  if (!response?.ok()) {
    throw new Error(`Resume page failed to load (${response?.status() ?? 'no response'}).`);
  }

  await page.getByRole('heading', { name: 'Resume' }).waitFor();
  await page.getByText('House of Doge', { exact: false }).first().waitFor();
  await page.pdf({
    path: PDF,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
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
