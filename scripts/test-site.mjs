import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { startStaticServer } from './static-server.mjs';

const routes = ['/', '/resume/', '/contact/'];
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

function summarizeViolations(violations) {
  return violations.map(({ id, impact, nodes }) => ({
    id,
    impact,
    targets: nodes.map((node) => node.target),
  }));
}

const staticServer = await startStaticServer('out');
let browser;

try {
  browser = await chromium.launch();

  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();

    for (const route of routes) {
      const response = await page.goto(`${staticServer.baseUrl}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200, `${route} did not load at ${viewport.name} size`);

      const overflow = await page.evaluate(() => ({
        document: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        body: document.body.scrollWidth - document.body.clientWidth,
      }));
      assert.ok(overflow.document <= 1 && overflow.body <= 1, `${route} overflows horizontally at ${viewport.name} size`);

      const accessibility = await new AxeBuilder({ page }).analyze();
      assert.deepEqual(
        summarizeViolations(accessibility.violations),
        [],
        `${route} has accessibility violations at ${viewport.name} size`,
      );
    }

    await context.close();
  }

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(staticServer.baseUrl, { waitUntil: 'networkidle' });

  const internalPaths = await page.locator('a[href]').evaluateAll((anchors) =>
    anchors
      .map((anchor) => anchor.getAttribute('href'))
      .filter((href) => href?.startsWith('/'))
      .map((href) => new URL(href, window.location.href).pathname),
  );
  for (const pathname of new Set(internalPaths)) {
    const response = await page.request.get(`${staticServer.baseUrl}${pathname}`);
    assert.equal(response.status(), 200, `Internal link is broken: ${pathname}`);
  }

  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  const lightAccessibility = await new AxeBuilder({ page }).analyze();
  assert.deepEqual(
    summarizeViolations(lightAccessibility.violations),
    [],
    'The light theme has accessibility violations',
  );

  const notFoundResponse = await page.goto(`${staticServer.baseUrl}/not-a-real-page/`);
  assert.equal(notFoundResponse?.status(), 404);
  await page.getByRole('heading', { name: 'This page does not exist.' }).waitFor();

  await context.close();
  console.log('route, responsive layout, link, and accessibility checks passed');
} finally {
  await browser?.close();
  await staticServer.close();
}
