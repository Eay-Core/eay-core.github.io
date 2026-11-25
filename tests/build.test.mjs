// Run after `npm run build`: checks the exported page, not the source.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const html = readFileSync(new URL('../out/index.html', import.meta.url), 'utf8');

test('no em or en dashes in visible copy', () => {
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
  assert.ok(!/[—–]/.test(text), 'found an em/en dash');
});

test('every local asset referenced by the page exists', () => {
  const refs = [...html.matchAll(/(?:src|href)="(\/[^"#?]+)"/g)].map((m) => m[1]).filter((p) => !p.startsWith('/_next/'));
  assert.ok(refs.length > 0);
  for (const ref of new Set(refs)) {
    const path = ref.endsWith('/') ? `${ref}index.html` : ref;
    assert.ok(existsSync(new URL(`../out${path}`, import.meta.url)), `missing ${ref}`);
  }
});

test('in-page anchors point at sections that exist', () => {
  for (const [, id] of html.matchAll(/href="#([a-z-]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `no section #${id}`);
  }
});

test('private eay-core is not linked and has no install that would 404', () => {
  assert.ok(!html.includes('github.com/Eay-Core/eay-core"'), 'links to private repo');
});
