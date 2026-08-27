import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { analyticsHosts, getAnalyticsConfig } from '../data/analytics.mjs';
import { keywordLinks, site } from '../data/site.mjs';

test('site configuration has valid public URLs and matching keyword links', () => {
  assert.equal(new URL(site.baseUrl).hostname, site.domain);
  assert.equal(new URL(site.repositoryUrl).protocol, 'https:');
  assert.equal(new URL(site.social.github).protocol, 'https:');
  assert.equal(new URL(site.social.linkedin).protocol, 'https:');

  for (const keyword of site.keywords.flat()) {
    assert.ok(keywordLinks[keyword], `Missing link for keyword: ${keyword}`);
  }
});

test('configured public assets exist', async () => {
  for (const publicPath of [site.portraitPath]) {
    assert.ok(publicPath.startsWith('/'), `${publicPath} must be root-relative`);
    await access(path.join('public', publicPath.slice(1)));
  }
});

test('configured PDF path is a safe root-relative filename', () => {
  assert.match(site.pdfPath, /^\/[^/]+\.pdf$/i);
  assert.equal(path.basename(site.pdfPath), site.pdfPath.slice(1));
});

test('analytics is included only in configured production builds', () => {
  assert.equal(getAnalyticsConfig({ NODE_ENV: 'development', NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'website-id' }), null);
  assert.equal(getAnalyticsConfig({ NODE_ENV: 'test', NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'website-id' }), null);
  assert.equal(getAnalyticsConfig({ NODE_ENV: 'production' }), null);
  assert.equal(getAnalyticsConfig({ NODE_ENV: 'production', NEXT_PUBLIC_UMAMI_WEBSITE_ID: '   ' }), null);
  assert.deepEqual(getAnalyticsConfig({ NODE_ENV: 'production', NEXT_PUBLIC_UMAMI_WEBSITE_ID: ' website-id ' }), {
    domains: 'markpaine.dev,www.markpaine.dev',
    scriptPath: '/analytics/script.js',
    websiteId: 'website-id',
  });
});

test('analytics host allowlist includes public hosts and excludes the infrastructure origin', () => {
  assert.deepEqual(analyticsHosts, ['markpaine.dev', 'www.markpaine.dev']);
  assert.ok(!analyticsHosts.includes('origin.markpaine.dev'));
});

test('Umami 3.3.1 same-origin tracker path resolves to the approved collector endpoint', () => {
  const analytics = getAnalyticsConfig({ NODE_ENV: 'production', NEXT_PUBLIC_UMAMI_WEBSITE_ID: 'website-id' });
  const collectorUrl = new URL('api/send', new URL(analytics.scriptPath, site.baseUrl));

  assert.ok(!Object.hasOwn(analytics, 'hostUrl'));
  assert.equal(collectorUrl.origin, site.baseUrl);
  assert.equal(collectorUrl.pathname, '/analytics/api/send');
});

test('canonical domain is a production hostname', () => {
  assert.equal(site.domain, 'markpaine.dev');
  assert.equal(new URL(site.baseUrl).protocol, 'https:');
});

test('content security policy permits only same-origin analytics delivery', async () => {
  const nginxConfig = await readFile('nginx.conf', 'utf8');
  const csp = nginxConfig.match(/add_header Content-Security-Policy "([^"]+)"/)?.[1];

  assert.ok(csp, 'Content-Security-Policy header is missing');
  assert.match(csp, /(?:^|;\s*)script-src 'self' 'unsafe-inline'(?:;|$)/);
  assert.match(csp, /(?:^|;\s*)connect-src 'self'(?:;|$)/);
  assert.doesNotMatch(csp, /https?:\/\//);
});
