import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const OUT = path.resolve('out');
const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  try { res.end(await readFile(path.join(OUT, p))); } catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const { port } = server.address();
const b = await chromium.launch();
const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
await pg.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle' });
await pg.screenshot({ path: process.env.SHOTDIR + '/r3-home.png' });
await pg.goto(`http://127.0.0.1:${port}/resume/`, { waitUntil: 'networkidle' });
const skills = await pg.locator('.skills-grid').boundingBox();
await pg.screenshot({ path: process.env.SHOTDIR + '/r3-skills.png', clip: { x: 0, y: skills.y - 160, width: 1440, height: Math.min(720, skills.height + 260) } });
await b.close(); server.close();
