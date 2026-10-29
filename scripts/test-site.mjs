import assert from 'node:assert/strict';
import AxeBuilder from '@axe-core/playwright';
import { chromium } from 'playwright';
import { analyticsHosts } from '../data/analytics.mjs';
import { startStaticServer } from './static-server.mjs';

const routes = ['/', '/resume/', '/contact/', '/privacy/'];
const expectedWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const expectAnalytics = process.env.ANALYTICS_EXPECTED === 'true';
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
  const tracker = page.locator('script[src="/analytics/script.js"]');
  if (expectAnalytics) {
    assert.ok(expectedWebsiteId, 'NEXT_PUBLIC_UMAMI_WEBSITE_ID is required when ANALYTICS_EXPECTED=true');
    assert.equal(await tracker.getAttribute('data-website-id'), expectedWebsiteId);
    assert.equal(await tracker.getAttribute('data-domains'), analyticsHosts.join(','));
    assert.equal(await tracker.getAttribute('data-do-not-track'), 'true');
  } else {
    assert.equal(await tracker.count(), 0, 'Unconfigured builds must not load analytics');
  }
  await page.locator('[data-umami-event="cv-download"]').first().waitFor();

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
  const sitemap = await (await page.request.get(`${staticServer.baseUrl}/sitemap.xml`)).text();
  assert.match(sitemap, /<loc>https:\/\/markpaine\.dev\/privacy\/<\/loc>/);

  await page.goto(`${staticServer.baseUrl}/privacy/`);
  const privacyParagraphs = await page.locator('main article p').allTextContents();
  assert.deepEqual(
    privacyParagraphs.map((paragraph) => paragraph.replace(/\s+/g, ' ').trim()),
    [
      'This site uses self-hosted, cookieless analytics to understand how visitors use it. Analytics may include pages viewed, visit duration, referring site, approximate country or region, browser, operating system, device type, campaign parameters, and interactions such as CV downloads or contact-link clicks.',
      'The analytics system does not retain raw IP addresses, use advertising identifiers, or sell information. Normal hosting and security infrastructure may process request metadata as part of operating the site.',
      'Anonymous visit summaries may be processed by third-party service providers for private operational notifications. Detailed analytics are retained for up to 12 months. Browser Do Not Track preferences are respected.',
      'Privacy questions can be sent through the contact details on this site.',
    ],
  );

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

  const analyticsContext = await browser.newContext();
  await analyticsContext.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async () => {} },
    });
    globalThis.__trackedEvents = [];
    globalThis.umami = {
      track: (eventName) => {
        globalThis.__trackedEvents.push(eventName);
      },
    };
  });
  const analyticsPage = await analyticsContext.newPage();

  await analyticsPage.goto(`${staticServer.baseUrl}/contact/`);
  for (const eventName of ['github-click', 'linkedin-click', 'instagram-click']) {
    assert.ok((await analyticsPage.locator(`[data-umami-event="${eventName}"]`).count()) >= 1, `Missing ${eventName} event`);
  }
  const emailButton = analyticsPage.locator('button.btn-accent');
  await emailButton.click();
  assert.deepEqual(await analyticsPage.evaluate(() => globalThis.__trackedEvents), ['email-copy']);
  await analyticsPage.getByRole('status').getByText('Email address copied to clipboard.').waitFor();

  await analyticsPage.evaluate(() => {
    globalThis.umami.track = () => {
      throw new Error('collector unavailable');
    };
  });
  await emailButton.click();
  await analyticsPage.getByRole('status').getByText('Email address copied to clipboard.').waitFor();

  await analyticsPage.goto(`${staticServer.baseUrl}/resume/`);
  await analyticsPage.locator('[data-umami-event="cv-download"]').waitFor();
  await analyticsPage.locator('[data-umami-event="contact-click"]').first().waitFor();

  await analyticsContext.close();
  console.log('route, responsive layout, link, and accessibility checks passed');
} finally {
  await browser?.close();
  await staticServer.close();
}
