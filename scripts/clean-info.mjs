import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseText, manualSchema } from './archive.mjs';

// Operates only on maintained info.txt files; historical textClipping is never read.
export function cleanInfo(text, source, volume, manual) {
  const issues = [];
  const records = parseText(text, source, issues);
  if (!records.size || issues.length) throw new Error(`Cleanup needs review: ${source}: ${JSON.stringify(issues)}`);
  return [...records.values()].sort((a, b) => a.number - b.number).map(record => {
    const id = `v${String(volume).padStart(2, '0')}-${String(record.number).padStart(3, '0')}`;
    const confirmed = manual.appearances[id]?.status === 'confirmed';
    const notes = (record.notes ?? '').split('\n').filter(line => !(confirmed && line === '不确定（原始资料标记）')).join('\n').trim();
    const lines = [`${String(record.number).padStart(3, '0')}. ${record.name}`];
    if (record.url) lines.push(`URL: ${record.url}`);
    if (record.category) lines.push(`分類: ${record.category}`);
    if (record.source) lines.push(`出典: ${record.source}`);
    if (!confirmed && record.status !== 'unreviewed') lines.push(`識別: ${record.status}`);
    if (notes) lines.push(`備考: ${notes}`);
    return lines.join('\n');
  }).join('\n\n') + '\n';
}

export async function cleanMaintainedInfo(root) {
  const manual = manualSchema.parse(JSON.parse(await readFile(path.join(root, 'data/manual.json'), 'utf8')));
  const changed = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^第\d+[巻卷]$/.test(entry.name)) continue;
    const file = path.join(root, entry.name, 'info.txt');
    let before;
    try { before = await readFile(file, 'utf8'); } catch (e) { if (e.code === 'ENOENT') continue; throw e; }
    const after = cleanInfo(before, `${entry.name}/info.txt`, Number(entry.name.match(/\d+/)[0]), manual);
    if (before !== after) { await writeFile(file, after); changed.push(`${entry.name}/info.txt`); }
  }
  return changed;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log('Cleaned:', await cleanMaintainedInfo(process.cwd()));
}
