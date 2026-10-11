import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, cp, rm, readdir, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { importArchive, manualSchema } from '../scripts/archive.mjs';

// Exercise the Skill's data operations with real records in isolated copies.
// No remote, Git or publication command is run by these fixtures.
const json = async file => JSON.parse(await readFile(file, 'utf8'));
async function fixture(run) {
 const root = await mkdtemp(path.join(tmpdir(), 'botan-skill-'));
 try {
  await mkdir(path.join(root, 'data'));
  await cp('第1巻', path.join(root, '第1巻'), { recursive: true });
  await cp('data/manual.json', path.join(root, 'data/manual.json'));
  await importArchive(root);
  await run(root, await json(path.join(root, 'data/manual.json')), await json(path.join(root, 'data/catalog.json')));
 } finally { await rm(root, { recursive: true, force: true }); }
}
async function saveManual(root, manual) {
 manualSchema.parse(manual);
 const file = path.join(root, 'data/manual.json');
 const text = JSON.stringify(manual, null, 2) + '\n';
 await writeFile(file, text);
 await importArchive(root); await importArchive(root);
 assert.equal(await readFile(file, 'utf8'), text, 'Import must not rewrite manual fields');
 return json(path.join(root, 'data/catalog.json'));
}

test('Skill scenario A: synchronized info/manual URL edit survives import without changing other products or associations', async () => {
 await fixture(async (root, manual, before) => {
  const appearance = before.appearances.find(a => a.volume === 1 && a.number === 4);
  const id = appearance.productId;
  const alternate = manual.products[id].specificationSources.find(s => s.id === 'specialist-nv').url;
  const textFile = path.join(root, '第1巻/info.txt');
  const text = await readFile(textFile, 'utf8');
  assert(text.includes(manual.products[id].url));
  await writeFile(textFile, text.replace(manual.products[id].url, alternate));
  manual.products[id].url = alternate;
  const after = await saveManual(root, manual);
  const expected = structuredClone(before); expected.products.find(p => p.id === id).url = alternate;
  assert.deepEqual(after, expected);
 });
});

test('Skill scenario B: add an already verified sake polishing ratio with its actual source; reject missing citations', async () => {
 await fixture(async (root, manual, before) => {
  const id = before.appearances.find(a => a.volume === 1 && a.number === 3).productId;
  const spec = structuredClone(manual.products[id].specifications.ricePolishingRatio);
  const source = manual.products[id].specificationSources.find(s => s.id === spec.sourceIds[0]);
  assert.equal(source.url, 'https://chichibunishiki.com/meishu/#a03');
  assert.equal(spec.value, '50%');
  // Remove only in the fixture to model adding a sourced, previously absent field.
  delete manual.products[id].specifications.ricePolishingRatio;
  await saveManual(root, manual);
  manual.products[id].specifications.ricePolishingRatio = spec;
  const invalid = structuredClone(manual); invalid.products[id].specifications.ricePolishingRatio.sourceIds = ['absent-source'];
  assert.throws(() => manualSchema.parse(invalid));
  const after = await saveManual(root, manual);
  assert.deepEqual(after, before);
 });
});

test('Skill scenario C: prepare a next-volume fixture using existing real material; preserve new unreviewed state and explicit cross-volume association', async () => {
 await fixture(async (root, manual, before) => {
  const old = before.products.find(p => p.id === 'v01-003');
  const appearance = before.appearances.find(a => a.productId === old.id);
  const volume = Math.max(...before.volumes.map(v => v.number)) + 1;
  const directory = `第${volume}巻`, id = `v${String(volume).padStart(2, '0')}-001`;
  await mkdir(path.join(root, directory, 'products'), { recursive: true });
  await mkdir(path.join(root, directory, 'scenes'));
  const ext = path.extname(old.images[0].source);
  await cp(path.join(root, old.images[0].source), path.join(root, directory, 'products', `001${ext}`));
  const sceneExt = path.extname(appearance.scenes[0].source);
  for (const n of ['01', '02']) await cp(path.join(root, appearance.scenes[0].source), path.join(root, directory, 'scenes', `001-${n}${sceneExt}`));
  await writeFile(path.join(root, directory, 'info.txt'), `001. ${old.name}\nURL: ${old.url}\n`);
  await importArchive(root);
  let after = await json(path.join(root, 'data/catalog.json'));
  assert.equal(after.products.length, before.products.length + 1, 'Same name alone must not merge');
  assert.equal(after.appearances.find(a => a.id === id).status, 'unreviewed');
  manual.appearances[id] = { productId: old.id };
  after = await saveManual(root, manual);
  assert.equal(after.products.length, before.products.length);
  assert.deepEqual(after.products, before.products);
  assert.deepEqual(after.appearances.filter(a => a.id !== id), before.appearances);
  const added = after.appearances.find(a => a.id === id);
  assert.equal(added.status, 'unreviewed'); assert.equal(added.productId, old.id);
  assert.equal(added.scenes.length, 2);
  assert(added.scenes.every(s => s.hash === appearance.scenes[0].hash));
 });
});

const skillFile = '.agents/skills/update-sake-catalog/SKILL.md';
async function markdownFiles(dir) {
 const out = [];
 for (const e of await readdir(dir, { withFileTypes: true })) {
  const p = path.join(dir, e.name);
  if (e.isDirectory()) out.push(...await markdownFiles(p));
  else if (e.name.endsWith('.md')) out.push(p);
 }
 return out;
}
function headingAnchors(text) {
 const ids = new Set(), duplicates = new Map();
 for (const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)) {
  const slug = match[1].replace(/<[^>]*>/g, '').toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').trim().replace(/ /g, '-');
  const count = duplicates.get(slug) ?? 0;
  ids.add(count ? `${slug}-${count}` : slug); duplicates.set(slug, count + 1);
 }
 for (const match of text.matchAll(/\b(?:id|name)="([^"]+)"/g)) ids.add(match[1]);
 return ids;
}
test('Maintenance documentation relative links resolve; project Skill path and npm commands are usable', async () => {
 const files = ['README.md', 'AGENTS.md', skillFile, 'reports/round6-maintenance.md', ...await markdownFiles('docs')];
 for (const file of files) {
  const text = await readFile(file, 'utf8');
  const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
  const targets = [...prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g), ...prose.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(m => m[1]);
  for (const raw of targets) {
   const target = raw.replace(/^<|>$/g, '');
   if (/^[a-z]+:/i.test(target)) continue;
   const pathname = decodeURIComponent(target.split('#')[0]);
   assert(!path.isAbsolute(pathname), `Use portable relative link in ${file}: ${target}`);
   const resolved = pathname ? path.resolve(path.dirname(file), pathname) : path.resolve(file);
   await stat(resolved);
   const fragment = target.split('#')[1];
   if (fragment) assert(headingAnchors(await readFile(resolved, 'utf8')).has(decodeURIComponent(fragment)), `Missing anchor ${target} in ${file}`);
  }
  const pkg = await json('package.json');
  for (const match of text.matchAll(/npm run ([a-z][a-z:-]*)/g)) assert(pkg.scripts[match[1]], `Missing command ${match[1]} in ${file}`);
 }
 const agents = await readFile('AGENTS.md', 'utf8');
 assert(agents.includes(`](${skillFile})`));
 const skill = await readFile(skillFile, 'utf8');
 const front = skill.match(/^---\n([\s\S]*?)\n---\n/);
 assert(front, 'Skill requires YAML frontmatter');
 assert.match(front[1], /^name: update-sake-catalog$/m);
 assert.match(front[1], /^description: .+/m);
 assert(!front[1].includes('TODO'));
 const pkg = await json('package.json');
 assert.equal(pkg.scripts.verify, 'npm run test && npm run build');
 const readme = await readFile('README.md', 'utf8');
 assert(readme.includes('actions/workflows/deploy.yml/badge.svg?branch=main'));
 await stat('.github/workflows/deploy.yml');
});
