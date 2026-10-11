import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { catalogSchema, parseImageName } from './archive.mjs';
import astroConfig from '../astro.config.mjs';
const root = process.cwd(), base=`${astroConfig.base.replace(/\/$/, '')}/`, site=astroConfig.site;
const catalog = catalogSchema.parse(JSON.parse(await readFile('data/catalog.json','utf8')));
const ids = new Set(catalog.products.map(p=>p.id));
assert.equal(ids.size,catalog.products.length,'Duplicate product ID');
assert.equal(new Set(catalog.appearances.map(a=>a.id)).size,catalog.appearances.length,'Duplicate appearance ID');
for(const a of catalog.appearances){
  assert(ids.has(a.productId),`Missing product ${a.productId}`); assert(catalog.volumes.some(v=>v.number===a.volume),`Missing volume ${a.volume}`);
  assert.equal(a.id,`v${String(a.volume).padStart(2,'0')}-${String(a.number).padStart(3,'0')}`,'Unstable appearance ID');
  for(const image of a.scenes){ const volume=catalog.volumes.find(v=>v.number===a.volume);assert(image.source.startsWith(`${volume.directory}/scenes/`));assert.equal(parseImageName(path.basename(image.source))?.number,a.number,'Wrong scene association'); }
}
let imageCount=0, checkedLinks=0, checkedAssetCopies=0; const failures=[];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
for(const asset of [...catalog.products.flatMap(p=>p.images),...catalog.appearances.flatMap(a=>a.scenes)]){
  assert.equal(hash(await readFile(asset.source)),asset.hash,`Source hash mismatch ${asset.source}`);
  for(const directory of ['public','dist'])assert.equal(hash(await readFile(path.join(directory,asset.path))),asset.hash,`Altered image copy ${directory}/${asset.path}`);
  checkedAssetCopies++;
}
for(const p of catalog.products){
  assert(catalog.appearances.some(a=>a.productId===p.id),`Orphan product ${p.id}`);
  if(p.category)assert(p.categorySource,`Missing category evidence ${p.id}`);
  if(p.thumbnail){const meta=await sharp(path.join('public',p.thumbnail.path)).metadata();assert.equal(meta.width,800);assert.equal(meta.height,800);assert.equal(meta.format,'webp');}
  for(const image of p.images){assert(catalog.appearances.some(a=>{const volume=catalog.volumes.find(v=>v.number===a.volume);return a.productId===p.id && image.source.startsWith(`${volume.directory}/products/`) && parseImageName(path.basename(image.source))?.number===a.number;}),`Wrong product image association ${image.source}`);}
}
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});return(await Promise.all(entries.map(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]))).flat();}
const pages=(await walk('dist')).filter(f=>f.endsWith('.html'));
for(const file of pages){
  const html=await readFile(file,'utf8');
  assert(html.includes('lang="ja"'),`Missing Japanese locale ${file}`);
  assert(!/icytail176\.github\.io\/image-host|wsrv\.nl/.test(html),`Old image host reference ${file}`);
  assert(/<title>[^<]+<\/title>/.test(html),`Missing title ${file}`);
  const pathname=file.endsWith('404.html')?`${base}404.html`:`${base}${path.relative('dist',path.dirname(file))}/`.replace(/\/+/g,'/');
  const canonical=html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.equal(canonical?.[1],new URL(pathname,site).href,`Incorrect canonical ${file}`);
  if(file.endsWith('404.html'))assert(html.includes('name="robots" content="noindex"'),'404 must be noindex');
  const product=catalog.products.find(p=>file===`dist/sake/${p.id}/index.html`);
  if(product && catalog.appearances.filter(a=>a.productId===product.id).every(a=>a.status==='confirmed'))assert(!/照合未確認|識別未確定|銘柄は要確認|確認済み|不确定|同定が未確定/.test(html),`Stale state UI ${file}`);
  if(product){
    if(product.url)assert(html.includes(`href="${product.url.replace(/&/g,'&amp;')}"`),`Wrong product reference ${file}`);
    assert(!/rogergoulart\.ne\.jp/.test(html),`Obsolete product URL ${file}`);
    const text=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1].replace(/<[^>]+>/g,' ') ?? '';
    assert(!/\bv\d{2}-\d{3}\b|\b00[1-9]\b|\b010\b|資料番号|話数|ページは未登録|第\d+話|出典/.test(text),`Hidden detail metadata leaked ${file}`);
    assert(html.includes('登場巻：'),`Volume missing ${file}`);
    const specs=Object.entries(product.specifications).filter(([,s])=>s!==null);
    assert.equal((html.match(/data-specification=/g) ?? []).length,specs.length,`Incorrect specification row count ${file}`);
    assert.equal(html.includes('id="specifications-title"'),specs.length>0,`Empty basic info section ${file}`);
    for(const [key,spec] of specs){assert(html.includes(`data-specification="${key}"`));for(const id of spec.sourceIds){const number=product.specificationSources.findIndex(s=>s.id===id)+1;assert(html.includes(`href="#reference-${number}"`));}}
  }
  for(const match of html.matchAll(/\b(?:href|src)="([^"<>]+)"/g)){
    const ref=match[1].replace(/&amp;/g,'&');
    if(/^(?:https?:|mailto:|data:)/.test(ref))continue;
    const url=new URL(ref,`https://local.test${pathname}`);checkedLinks++;
    if(!url.pathname.startsWith(base)){failures.push(`${file}: outside base: ${ref}`);continue;}
    const local=path.join('dist',decodeURIComponent(url.pathname.slice(base.length)));
    let target=local;
    try{const s=await stat(local);if(s.isDirectory())target=path.join(local,'index.html');await stat(target);}catch{failures.push(`${file}: missing ${ref}`);continue;}
    if(url.hash && target.endsWith('.html')){const targetHtml=await readFile(target,'utf8');if(!targetHtml.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`))failures.push(`${file}: missing anchor ${ref}`);}
    if(match[0].startsWith('src='))imageCount++;
  }
}
for(const p of catalog.products)await stat(`dist/sake/${p.id}/index.html`);
await stat('dist/about/index.html');await stat('dist/sitemap.xml');
const sitemap=await readFile('dist/sitemap.xml','utf8');
const locations=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.deepEqual(locations,['','about/',...catalog.products.map(p=>`sake/${p.id}/`)].map(p=>new URL(`${base}${p}`,site).href),'Incorrect sitemap URLs');
for(const file of (await walk('dist')).filter(f=>/\.(html|css|js|xml)$/.test(f)))assert(!/icytail176\.github\.io\/image-host|wsrv\.nl|imagedelivery\.net|cloudflare-ipfs\.com/.test(await readFile(file,'utf8')),`Old image host dependency ${file}`);
const originals=JSON.parse(await readFile('reports/original-checksums.json','utf8'));
for(const [file,hash] of Object.entries(originals)){const bytes=await readFile(path.join(root,file));assert.equal(createHash('sha256').update(bytes).digest('hex'),hash,`Original changed: ${file}`);}
assert.equal(failures.length,0,failures.join('\n'));
const result={pages:pages.length,products:catalog.products.length,appearances:catalog.appearances.length,confirmed:catalog.appearances.filter(a=>a.status==='confirmed').length,checkedLinks,imageReferences:imageCount,checkedAssetCopies,canonicalPages:pages.length,sitemapURLs:locations.length,unchangedOriginals:Object.keys(originals).length,specificationRows:catalog.products.reduce((n,p)=>n+Object.values(p.specifications).filter(Boolean).length,0),productsWithSpecifications:catalog.products.filter(p=>Object.values(p.specifications).some(Boolean)).length,hiddenDetailMetadata:true,base,failures};
await writeFile('reports/build-validation.json',JSON.stringify(result,null,2)+'\n');console.log('Build validation:',result);
