import { readdir, readFile, mkdir, writeFile, copyFile, access } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { z } from 'zod';

export const categories = ['ビール', '日本酒', '焼酎', 'ウイスキー', 'ワイン', 'その他'];
const status = z.enum(['confirmed', 'uncertain', 'unreviewed']);
const url = z.url().refine(s => /^https?:\/\//.test(s), 'Only HTTP(S) URLs are allowed');
const textValue = z.string().trim().min(1);
const sourceId = z.string().regex(/^[a-z][a-z0-9-]*$/);
const specification = z.object({ label: textValue, value: textValue, sourceIds: z.array(sourceId).min(1), note: textValue.optional() }).strict();
const specificationSource = z.object({ id: sourceId, title: textValue, url, checkedAt: z.iso.date(), versionNote: textValue.optional() }).strict();
const sourcedText = z.object({ text: textValue, sourceIds: z.array(sourceId).min(1), note: textValue.optional() }).strict();
const specificationFields = {
  description: sourcedText.nullable().optional(),
  tastingNotes: z.array(sourcedText.extend({ attribution: textValue })).optional(),
  background: z.array(sourcedText.extend({ scope: z.enum(['product', 'brand']) })).optional(),
  specifications: z.record(z.string().regex(/^[a-z][a-zA-Z0-9]*$/), specification.nullable()).optional(),
  specificationSources: z.array(specificationSource).optional(),
  specificationGaps: z.record(z.string(), textValue).optional()
};
function checkSpecificationReferences(product, ctx) {
  const sources = product.specificationSources ?? [];
  const ids = new Set(sources.map(s=>s.id));
  if (ids.size !== sources.length) ctx.addIssue({ code: 'custom', path: ['specificationSources'], message: 'Duplicate specification source ID' });
  for (const field of ['description', 'tastingNotes', 'background']) {
    const entries = field === 'description' ? (product.description ? [product.description] : []) : (product[field] ?? []);
    for (const [index, entry] of entries.entries()) for (const id of entry.sourceIds) {
      if (!ids.has(id)) ctx.addIssue({ code: 'custom', path: [field, ...(field === 'description' ? [] : [index]), 'sourceIds'], message: `Missing prose source: ${id}` });
    }
  }
  for (const [key, spec] of Object.entries(product.specifications ?? {})) {
    if (!spec) continue;
    for (const id of spec.sourceIds) if (!ids.has(id)) ctx.addIssue({ code: 'custom', path: ['specifications', key, 'sourceIds'], message: `Missing specification source: ${id}` });
    if (product.specificationGaps?.[key]) ctx.addIssue({ code: 'custom', path: ['specificationGaps', key], message: 'A field cannot be both verified and unresolved' });
  }
}
const productEdit = z.object({ name: z.string().min(1).optional(), url: url.nullable().optional(), category: z.enum(categories).nullable().optional(), categorySource: z.string().min(1).nullable().optional(), notes: z.string().nullable().optional(), ...specificationFields }).strict().superRefine(checkSpecificationReferences);
const appearanceEdit = z.object({ productId: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(), status: status.optional(), source: z.string().nullable().optional(), notes: z.string().nullable().optional() }).strict();
export const manualSchema = z.object({ products: z.record(z.string(), productEdit), appearances: z.record(z.string(), appearanceEdit) }).strict();
const assetSchema = z.object({ path: z.string(), source: z.string(), width: z.number().positive(), height: z.number().positive(), hash: z.string() });
export const catalogSchema = z.object({ schemaVersion: z.literal(1), volumes: z.array(z.object({ number: z.number().int().positive(), directory: z.string(), label: z.string() })), products: z.array(z.object({ id: z.string(), name: z.string().min(1), category: z.enum(categories).nullable(), categorySource: z.string().nullable(), url: url.nullable(), notes: z.string().nullable(), images: z.array(assetSchema), thumbnail: assetSchema.nullable(), ...specificationFields, description: specificationFields.description.default(null), tastingNotes: specificationFields.tastingNotes.default([]), background: specificationFields.background.default([]), specifications: specificationFields.specifications.default({}), specificationSources: specificationFields.specificationSources.default([]), specificationGaps: specificationFields.specificationGaps.default({}) }).superRefine(checkSpecificationReferences)), appearances: z.array(z.object({ id: z.string(), productId: z.string(), volume: z.number().positive(), number: z.number().int().nonnegative(), status, source: z.string().nullable(), notes: z.string().nullable(), scenes: z.array(assetSchema), textSources: z.array(z.string()) })) });
const strip = s => s.replace(/\[img[^\]]*\][\s\S]*?\[\/img\]/gi, '').replace(/\[\/?(?:size|center|b|i|color|url)[^\]]*\]/gi, '').trim();
export function parseText(text, source, issues = []) {
  const records = new Map(); let current;
  for (const raw of text.replace(/\r\n/g, '\n').split('\n')) {
    const plain = strip(raw);
    const head = plain.match(/^\s*(?:#{1,6}\s*)?(\d+)\s*[.．、:：)）]\s*(.+)$/);
    if (head) {
      const number = Number(head[1]);
      if (records.has(number)) issues.push({ severity: 'error', code: 'duplicate-text-number', file: source, number });
      const link = raw.match(/\[url=(https?:\/\/[^\]]+)\]([^]*?)\[\/url\]/i);
      const bareLink = raw.match(/\[url\](https?:\/\/[^]*?)\[\/url\]/i);
      const md = head[2].match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      const uncertain = /不确定|不確定|未確定|要確認|推定|uncertain/i.test(head[2]);
      let name = link ? strip(link[2]) : md ? md[1] : head[2].replace(bareLink?.[1] ?? '\u0000', '').replace(/\s*(?:不确定|不確定|未確定|要確認|推定|uncertain)\s*$/i, '').trim();
      current = { number, name, url: link?.[1] ?? md?.[2] ?? bareLink?.[1] ?? null, category: null, source: null, status: uncertain ? 'uncertain' : 'unreviewed', notes: uncertain ? '不确定（原始资料标记）' : null, textSources: [source] };
      records.set(number, current); continue;
    }
    if (!current || !plain) continue;
    const bareUrl = raw.match(/^\s*\[url\](https?:\/\/[^]*?)\[\/url\]\s*$/i);
    if (bareUrl) { current.url = bareUrl[1]; continue; }
    const field = plain.match(/^(名称|名前|name|商品URL|URL|リンク|分類|分类|category|出典|出处|source|識別|识别|status|備考|备注|notes)\s*[:：]\s*(.*)$/i);
    if (!field) { if (!/^\[|^https?:/.test(plain)) current.notes = [current.notes, plain].filter(Boolean).join('\n'); continue; }
    const [, key, value] = field;
    if (/名称|名前|name/i.test(key) && value) current.name = value;
    else if (/URL|リンク/i.test(key)) current.url = value || null;
    else if (/分類|分类|category/i.test(key)) {
      if (categories.includes(value)) current.category = value;
      else issues.push({ severity: 'warning', code: 'unknown-category', file: source, number: current.number, value });
    } else if (/出典|出处|source/i.test(key)) current.source = value || null;
    else if (/識別|识别|status/i.test(key)) {
      if (/^(確定|确定|confirmed)$/.test(value)) current.status = 'confirmed';
      else if (/^(不确定|未確定|不確定|要確認|推定|uncertain)$/.test(value)) current.status = 'uncertain';
      else if (/^(未確認|unreviewed)$/.test(value)) current.status = 'unreviewed';
      else issues.push({ severity: 'warning', code: 'unknown-status', file: source, number: current.number, value });
    } else current.notes = [current.notes, value].filter(Boolean).join('\n');
  }
  for (const record of records.values()) if (record.url && !url.safeParse(record.url).success) { issues.push({ severity: 'warning', code: 'invalid-product-url', file: source, number: record.number, value: record.url }); record.url = null; }
  return records;
}
export function parseImageName(name) {
  const match = name.match(/^(\d+)(?:[-_](\d+))?\.(jpe?g|png|webp)$/i);
  return match ? { number: Number(match[1]), variant: Number(match[2] ?? 0) } : null;
}
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
const idFor = (volume, number) => `v${String(volume).padStart(2, '0')}-${String(number).padStart(3, '0')}`;
async function list(dir) { try { return await readdir(dir, { withFileTypes: true }); } catch (e) { if (e.code === 'ENOENT') return []; throw e; } }
async function jsonWrite(file, data) { await mkdir(path.dirname(file), { recursive: true }); await writeFile(file, JSON.stringify(data, null, 2) + '\n'); }
export async function importArchive(root) {
  const issues = [], inventory = [], imported = [], volumes = [];
  const dirs = (await list(root)).filter(e => e.isDirectory() && /^第\d+[巻卷]$/.test(e.name)).sort((a,b) => Number(a.name.match(/\d+/)[0]) - Number(b.name.match(/\d+/)[0]));
  let manual;
  try { manual = manualSchema.parse(JSON.parse(await readFile(path.join(root, 'data/manual.json'), 'utf8'))); }
  catch (e) { if (e.code === 'ENOENT') manual = { products: {}, appearances: {} }; else throw e; }
  const seenVolumes = new Set(), emitted = new Set();
  async function asset(file, kind) {
    const bytes = await readFile(path.join(root, file)); const hash = digest(bytes);
    const meta = await sharp(bytes).metadata();
    if (!meta.width || !meta.height) throw new Error(`Invalid image ${file}`);
    const oriented = [5,6,7,8].includes(meta.orientation) ? { width: meta.height, height: meta.width } : { width: meta.width, height: meta.height };
    const extension = meta.format === 'jpeg' ? 'jpg' : meta.format;
    const output = kind === 'thumb' ? `images/thumbs/${hash}-800-v1.webp` : `images/originals/${hash}.${extension}`;
    if (!emitted.has(output)) {
      await mkdir(path.join(root, 'public', path.dirname(output)), { recursive: true });
      let exists = false;
      try { await access(path.join(root, 'public', output)); exists = true; } catch {}
      if (!exists && kind === 'thumb') await sharp(bytes).rotate().flatten({ background: '#fff' }).resize(800, 800, { fit: 'contain', background: '#fff' }).webp({ quality: 88 }).toFile(path.join(root, 'public', output));
      else if (!exists) await copyFile(path.join(root, file), path.join(root, 'public', output));
      emitted.add(output);
    }
    return { path: output, source: file, width: kind === 'thumb' ? 800 : oriented.width, height: kind === 'thumb' ? 800 : oriented.height, hash };
  }
  for (const dir of dirs) {
    const volume = Number(dir.name.match(/\d+/)[0]);
    if (volume < 1 || seenVolumes.has(volume)) { issues.push({ severity: 'error', code: 'volume-conflict', file: dir.name }); continue; }
    seenVolumes.add(volume); volumes.push({ number: volume, directory: dir.name, label: `第${volume}巻` });
    const text = new Map(), imageGroups = { products: new Map(), scenes: new Map() };
    const entries = await list(path.join(root, dir.name));
    for (const e of entries) {
      if (!e.isFile() || e.name.startsWith('.')) continue;
      const file = `${dir.name}/${e.name}`;
      if (!/\.(txt|md|markdown)$/i.test(e.name)) { issues.push({ severity: 'warning', code: 'unsupported-volume-file', file }); continue; }
      const bytes = await readFile(path.join(root, file)); inventory.push({ file, kind: 'text', bytes: bytes.length, sha256: digest(bytes) });
      const parsed = parseText(bytes.toString('utf8'), file, issues);
      if (!parsed.size) issues.push({ severity: 'warning', code: 'no-text-records', file });
      for (const [n, record] of parsed) { if (text.has(n)) issues.push({ severity: 'error', code: 'duplicate-text-number', file, number: n }); else text.set(n, record); }
    }
    if (!text.size) issues.push({ severity: 'warning', code: 'missing-text', file: dir.name });
    for (const kind of ['products', 'scenes']) {
      const imgs = await list(path.join(root, dir.name, kind));
      for (const e of imgs.sort((a,b)=>a.name.localeCompare(b.name, 'en', { numeric: true }))) {
        if (e.name.startsWith('.')) continue;
        const file = `${dir.name}/${kind}/${e.name}`, parsed = parseImageName(e.name);
        if (!e.isFile() || !parsed) { issues.push({ severity: 'warning', code: 'unmatched-file', file }); continue; }
        const bytes = await readFile(path.join(root, file));
        inventory.push({ file, kind, number: parsed.number, variant: parsed.variant, bytes: bytes.length, sha256: digest(bytes) });
        const group = imageGroups[kind].get(parsed.number) ?? [];
        if (group.some(i => i.variant === parsed.variant)) issues.push({ severity: 'error', code: 'image-number-conflict', file, number: parsed.number, conflictsWith: group.filter(i=>i.variant===parsed.variant).map(i=>i.file) });
        group.push({ ...parsed, file }); imageGroups[kind].set(parsed.number, group);
      }
    }
    const numbers = [...new Set([...text.keys(), ...imageGroups.products.keys(), ...imageGroups.scenes.keys()])].sort((a,b)=>a-b);
    for (const number of numbers) {
      const id = idFor(volume, number), record = text.get(number);
      if (!record) issues.push({ severity: 'warning', code: 'missing-name', id });
      const products = (imageGroups.products.get(number) ?? []).sort((a,b)=>a.variant-b.variant);
      const scenes = (imageGroups.scenes.get(number) ?? []).sort((a,b)=>a.variant-b.variant);
      if (!products.length) issues.push({ severity: 'warning', code: 'missing-product-image', id });
      if (!scenes.length) issues.push({ severity: 'warning', code: 'missing-scene', id });
      try {
        imported.push({ id, volume, number, name: record?.name ?? null, url: record?.url ?? null, category: record?.category ?? null, status: record?.status ?? 'unreviewed', source: record?.source ?? null, notes: record?.notes ?? null, textSources: record?.textSources ?? [], images: await Promise.all(products.map(i=>asset(i.file, 'original'))), thumbnail: products.length ? await asset(products[0].file, 'thumb') : null, scenes: await Promise.all(scenes.map(i=>asset(i.file, 'original'))) });
      } catch (e) { issues.push({ severity: 'error', code: 'image-processing-failed', id, message: e.message }); }
    }
  }
  const productMap = new Map(), appearances = [];
  for (const item of imported) {
    const aEdit = manual.appearances[item.id] ?? {}, productId = aEdit.productId ?? item.id, pEdit = manual.products[productId] ?? {};
    if (!productMap.has(productId)) productMap.set(productId, { id: productId, name: item.name ?? '名称未登録', category: item.category, categorySource: item.category ? item.textSources.join(', ') : null, url: item.url, notes: null, images: item.images, thumbnail: item.thumbnail, ...pEdit });
    else {
      const p = productMap.get(productId); p.images = [...p.images, ...item.images.filter(a=>!p.images.some(b=>b.hash===a.hash))];
      p.thumbnail ??= item.thumbnail;
    }
    const appearance = { id: item.id, productId, volume: item.volume, number: item.number, status: item.status, source: item.source, notes: item.notes, scenes: item.scenes, textSources: item.textSources, ...aEdit };
    appearances.push(appearance);
    if (!productMap.get(productId).category) issues.push({ severity: 'warning', code: 'category-not-provided', id: item.id });
    if (!appearance.source) issues.push({ severity: 'info', code: 'source-not-provided', id: item.id });
    if (appearance.status !== 'confirmed') issues.push({ severity: appearance.status === 'uncertain' ? 'warning' : 'info', code: `identification-${appearance.status}`, id: item.id });
  }
  for (const key of Object.keys(manual.appearances)) if (!imported.some(i=>i.id===key)) issues.push({ severity: 'warning', code: 'orphan-manual-appearance', id: key });
  for (const key of Object.keys(manual.products)) if (!productMap.has(key)) issues.push({ severity: 'warning', code: 'orphan-manual-product', id: key });
  for (const p of productMap.values()) if (p.category && !p.categorySource) issues.push({ severity: 'error', code: 'category-evidence-required', id: p.id });
  const catalog = catalogSchema.parse({ schemaVersion: 1, volumes, products: [...productMap.values()], appearances });
  const report = { schemaVersion: 1, volumes: volumes.length, products: catalog.products.length, appearances: appearances.length, productImages: inventory.filter(i=>i.kind==='products').length, sceneImages: inventory.filter(i=>i.kind==='scenes').length, uniqueOutputAssets: emitted.size, inventory, issues };
  await jsonWrite(path.join(root, 'data/imported.json'), { schemaVersion: 1, volumes, records: imported });
  await jsonWrite(path.join(root, 'reports/import-report.json'), report);
  await writeFile(path.join(root, 'reports/import-report.md'), `# 素材导入报告\n\n卷数：${report.volumes}；酒款：${report.products}；登场记录：${report.appearances}。\n商品图：${report.productImages}；作品截图：${report.sceneImages}；去重后输出：${report.uniqueOutputAssets}。\n\n原图未改名、裁切或覆盖。缩略图为 800×800 白色填充 WebP。\n文字权威来源为各卷的人工维护 TXT/Markdown；人工覆盖为 data/manual.json。原始 textClipping 仅作历史备份，导入脚本不会读取它或覆盖 info.txt。\n\n## 需要检查的项目\n\n${issues.map(i=>`- **${i.severity} / ${i.code}**：${i.id ?? i.file}${i.message ? ` — ${i.message}` : ''}${i.conflictsWith ? `；冲突：${i.conflictsWith.join(', ')}` : ''}`).join('\n') || '无。'}\n\n详细文件名、尺寸、哈希和对应编号见 import-report.json 与 data/imported.json。\n`);
  if (issues.some(i=>i.severity==='error')) throw new Error('Import blocked: see reports/import-report.json. Previous catalog retained.');
  await jsonWrite(path.join(root, 'data/catalog.json'), catalog);
  return report;
}
