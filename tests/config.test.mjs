import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
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
