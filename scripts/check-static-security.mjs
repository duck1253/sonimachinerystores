import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root = path.resolve(process.argv[2] || 'github-pages-dist');
const files = fs.readdirSync(root, { recursive: true }).filter(name => name.endsWith('.html'));
assert(files.length > 0, 'No generated HTML pages found');
for (const file of files) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const policy = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)?.[1];
  assert(policy, `${file}: missing CSP`);
  assert(policy.includes("object-src 'none'") && policy.includes("base-uri 'none'") && policy.includes("script-src-attr 'none'"), `${file}: missing restrictions`);
  assert(!policy.match(/script-src[^;]*(?:unsafe-inline|unsafe-eval)/), `${file}: unsafe script policy`);
  assert(html.indexOf('Content-Security-Policy') < html.indexOf('<script'), `${file}: late CSP`);
  assert(!/on(?:click|load|error)\s*=/i.test(html), `${file}: inline event handler`);
  assert(!/cdn\.jsdelivr\.net/.test(html), `${file}: remote search dependency`);
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/type="application\/ld\+json"/.test(match[1])) continue;
    if (!/\bsrc=/.test(match[1])) {
      const digest = crypto.createHash('sha256').update(match[2]).digest('base64');
      assert(policy.includes(`'sha256-${digest}'`), `${file}: unapproved inline script`);
    }
  }
  const fuse = html.match(/<script src="\/sonimachinerystores\/(fuse-[^"]+)" integrity="sha384-([^"]+)"/);
  assert(fuse, `${file}: missing pinned search library`);
  assert.equal(crypto.createHash('sha384').update(fs.readFileSync(path.join(root, fuse[1]))).digest('base64'), fuse[2]);
}
console.log(`Security checks passed for ${files.length} HTML pages.`);
