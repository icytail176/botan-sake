import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { parseText, parseImageName, importArchive, manualSchema } from '../scripts/archive.mjs';
test('BBCode names, arbitrary order, uncertainty; image URLs are discarded',()=>{
 const issues=[];const r=parseText('[size=20]2.[url=https://example.com/item]名称 B[/url][/size]\n[img]https://old.invalid/a.png[/img]\n\n1.[url=https://example.com/]名称 A[/url] 不确定','info.txt',issues);
 assert.equal(r.size,2);assert.equal(r.get(2).name,'名称 B');assert.equal(r.get(2).status,'unreviewed');assert.equal(r.get(1).status,'uncertain');assert.equal(r.get(1).source,null);assert.equal(issues.length,0);
});
test('Markdown/plain text fields are explicit, unknown categories are reported',()=>{
 const issues=[];const r=parseText('## 001. [麦酒](https://example.com/)\n分類: ビール\n出典: 第2話 p.12\n識別: 確定\n備考: メモ\n2. テスト\n分類: invented','info.md',issues);
 assert.equal(r.get(1).category,'ビール');assert.equal(r.get(1).source,'第2話 p.12');assert.equal(r.get(1).status,'confirmed');assert.equal(r.get(2).category,null);assert.equal(issues[0].code,'unknown-category');
});
test('number recognition accepts mixed formats and multiple screenshot variants',()=>{
 for(const name of ['1.jpg','001.jpeg','001.PNG','001-02.webp','001_02.jpg'])assert.equal(parseImageName(name).number,1);
 assert.equal(parseImageName('001-02.png').variant,2);assert.equal(parseImageName('unknown.jpg'),null);assert.equal(parseImageName('1-other.jpg'),null);
});
test('manual data rejects misspelled keys, unsafe URLs and unknown categories',()=>{
 assert.throws(()=>manualSchema.parse({products:{'v01-001':{nmae:'name'}},appearances:{}}));
 assert.throws(()=>manualSchema.parse({products:{'v01-001':{url:'javascript:alert(1)'}},appearances:{}}));
 assert.throws(()=>manualSchema.parse({products:{'v01-001':{category:'fake'}},appearances:{}}));
});
test('multi-volume import, same product repeated, multi-scenes, manual preservation, deduplication and recoverable assets',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botan-import-'));
 try{
  await mkdir(path.join(root,'data'));await mkdir(path.join(root,'reports'));
  const image=await sharp({create:{width:60,height:180,channels:3,background:'#8b4150'}}).png().toBuffer();
  for(const dir of ['第1巻','第2卷']){await mkdir(path.join(root,dir,'products'),{recursive:true});await mkdir(path.join(root,dir,'scenes'));await writeFile(path.join(root,dir,'products','001.png'),image);await writeFile(path.join(root,dir,'scenes','001-01.png'),image);await writeFile(path.join(root,dir,'scenes','001-02.png'),image);await writeFile(path.join(root,dir,'info.txt'),'1. 自動名称\nURL: https://example.com/');}
  const manual={products:{'v01-001':{name:'手動の名前',url:'https://example.org/',notes:'保持するメモ'}},appearances:{'v02-001':{productId:'v01-001',status:'confirmed',source:'第7話'}}};
  const before=JSON.stringify(manual,null,2);await writeFile(path.join(root,'data/manual.json'),before);
  const r=await importArchive(root);assert.equal(r.products,1);assert.equal(r.appearances,2);assert.equal(r.uniqueOutputAssets,2);
  const catalog=JSON.parse(await readFile(path.join(root,'data/catalog.json'),'utf8'));assert.equal(catalog.products[0].name,'手動の名前');assert.equal(catalog.appearances[1].scenes.length,2);assert.equal(catalog.appearances[1].source,'第7話');assert.equal(catalog.appearances[0].source,null);
  await rm(path.join(root,'public'),{recursive:true});await writeFile(path.join(root,'第1巻/info.txt'),'1. 変更された自動名称');await importArchive(root);
  assert.equal(await readFile(path.join(root,'data/manual.json'),'utf8'),before);assert.equal(JSON.parse(await readFile(path.join(root,'data/catalog.json'),'utf8')).products[0].name,'手動の名前');
  assert.deepEqual(await readFile(path.join(root,'第1巻/products/001.png')),image);
  const meta=await sharp(path.join(root,'public',catalog.products[0].thumbnail.path)).metadata();assert.equal(meta.width,800);assert.equal(meta.height,800);
  const {data,info}=await sharp(path.join(root,'public',catalog.products[0].thumbnail.path)).removeAlpha().raw().toBuffer({resolveWithObject:true});assert(data[0]>245 && data[1]>245 && data[2]>245);assert.equal(info.width,800);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('conflicting numeric image IDs block publication; unmatched files and missing images are reported',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botan-conflict-'));
 try{await mkdir(path.join(root,'reports'));await mkdir(path.join(root,'第1巻/products'),{recursive:true});await mkdir(path.join(root,'第1巻/scenes'));const bytes=await sharp({create:{width:2,height:2,channels:3,background:'#fff'}}).png().toBuffer();for(const n of ['1.png','001.png','unknown.png'])await writeFile(path.join(root,'第1巻/products',n),bytes);await writeFile(path.join(root,'第1巻/info.txt'),'1. 本物\n2. 画像欠落');await assert.rejects(importArchive(root),/Import blocked/);const r=JSON.parse(await readFile(path.join(root,'reports/import-report.json'),'utf8'));for(const code of ['image-number-conflict','unmatched-file','missing-product-image','missing-scene'])assert(r.issues.some(i=>i.code===code),code);
 }finally{await rm(root,{recursive:true,force:true});}
});

test('bare BBCode URLs are parsed; invalid links are reported without creating fake data',()=>{
 const issues=[];const r=parseText('1. 名前 [url]https://example.com/[/url]\n2. 別の名前\n[url]https://example.org/[/url]\n3. URLなし\nURL: javascript:bad','info.txt',issues);
 assert.equal(r.get(1).name,'名前');assert.equal(r.get(1).url,'https://example.com/');assert.equal(r.get(2).url,'https://example.org/');assert.equal(r.get(3).url,null);assert(issues.some(i=>i.code==='invalid-product-url'));
});
