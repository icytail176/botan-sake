import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, cp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { parseText, importArchive, manualSchema } from '../scripts/archive.mjs';
import { cleanInfo, cleanMaintainedInfo } from '../scripts/clean-info.mjs';

const ids=Array.from({length:10},(_,i)=>`v01-${String(i+1).padStart(3,'0')}`);
test('cleanup is idempotent, preserves meaningful fields, and retains future uncertain records',()=>{
 const manual={products:{},appearances:{'v01-004':{status:'confirmed'}}};
 const old='[size=20]4.[url=https://example.com/p?a=b#c]そのままの名称[/url] 不确定[/size]\n[center][img=200,300]https://old.example/a.png[/img][/center]\n備考: 大切な人工メモ\n出典: 第5話 p.8\n5. 次のお酒 推定\n備考: 次の記録のメモ';
 const clean=cleanInfo(old,'第1巻/info.txt',1,manual);
 assert.equal(cleanInfo(clean,'第1巻/info.txt',1,manual),clean);
 const parsed=parseText(clean,'第1巻/info.txt');assert.equal(parsed.get(4).name,'そのままの名称');assert.equal(parsed.get(4).url,'https://example.com/p?a=b#c');assert.equal(parsed.get(4).notes,'大切な人工メモ');assert.equal(parsed.get(4).source,'第5話 p.8');assert.equal(parsed.get(5).status,'uncertain');assert.match(parsed.get(5).notes,/次の記録のメモ/);assert(!/\[\/?(?:img|size|center|url)/.test(clean));assert(!clean.includes('old.example'));
});
test('current ten manual confirmations survive repeated imports, clean text stays authoritative, new volume remains unreviewed',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botan-release-'));
 try{
  await mkdir(path.join(root,'data'));await mkdir(path.join(root,'reports'));
  await cp('第1巻',path.join(root,'第1巻'),{recursive:true});await cp('data/manual.json',path.join(root,'data/manual.json'));
  // A historical clipping must never overwrite maintained source text.
  await writeFile(path.join(root,'historical.textClipping'),'OLD BACKUP / [size]不确定[/size]');
  const originalManual=await readFile(path.join(root,'data/manual.json'),'utf8'),originalText=await readFile(path.join(root,'第1巻/info.txt'),'utf8');
  assert(!/\[\/?(?:size|url|img|center)\b|image-host|wsrv\.nl|不确定/.test(originalText));
  const names=parseText(originalText,'第1巻/info.txt'),manual=JSON.parse(originalManual);assert(names.size >= 10);
  const first=await importArchive(root);assert(first.products >= 10);assert(first.productImages >= 10);assert(first.sceneImages >= 10);
  const firstCatalog=await readFile(path.join(root,'data/catalog.json'),'utf8');
  for(const id of ids){assert.equal(JSON.parse(firstCatalog).appearances.find(a=>a.id===id).status,'confirmed');const p=JSON.parse(firstCatalog).products.find(p=>p.id===id);assert.deepEqual(p.specifications,manual.products[id]?.specifications ?? {});assert.deepEqual(p.specificationSources,manual.products[id]?.specificationSources ?? []);assert.deepEqual(p.specificationGaps,manual.products[id]?.specificationGaps ?? {});for(const key of ['description','tastingNotes','background'])assert.deepEqual(p[key],manual.products[id]?.[key] ?? (key==='description'?null:[]));}
  assert.equal(JSON.parse(firstCatalog).products.find(p=>p.id==='v01-004').category,manual.products['v01-004']?.category ?? names.get(4).category);
  assert.equal(JSON.parse(firstCatalog).appearances.find(a=>a.id==='v01-004').notes,manual.appearances['v01-004'].notes === undefined ? names.get(4).notes : manual.appearances['v01-004'].notes);
  await importArchive(root);assert.equal(await readFile(path.join(root,'data/catalog.json'),'utf8'),firstCatalog);
  assert.deepEqual(await cleanMaintainedInfo(root),[]);
  const freshVolume=Math.max(1,...Object.keys(manual.appearances).map(id=>Number(id.match(/^v(\d+)-/)?.[1] ?? 0)))+1,freshId=`v${String(freshVolume).padStart(2,'0')}-001`;
  await mkdir(path.join(root,`第${freshVolume}巻`));await writeFile(path.join(root,`第${freshVolume}巻/info.txt`),'001. 新規資料の仮名\n備考: テスト用の記録（本番データではない）\n');
  await importArchive(root);
  const catalog=JSON.parse(await readFile(path.join(root,'data/catalog.json'),'utf8'));
  for(const id of ids)assert.equal(catalog.appearances.find(a=>a.id===id).status,'confirmed');
  assert.equal(catalog.appearances.find(a=>a.id===freshId).status,'unreviewed');assert.equal(catalog.appearances.find(a=>a.id===freshId).source,null);
  assert.equal(await readFile(path.join(root,'data/manual.json'),'utf8'),originalManual);assert.equal(await readFile(path.join(root,'第1巻/info.txt'),'utf8'),originalText);
  for(const product of catalog.products.filter(p=>ids.includes(p.id))){const a=catalog.appearances.find(a=>a.productId===product.id);assert.equal(product.name,manual.products[product.id]?.name ?? names.get(a.number).name);assert.equal(product.url,manual.products[product.id]?.url === undefined ? names.get(a.number).url : manual.products[product.id].url);assert(product.images.length>=1 && a.scenes.length>=1);for(const image of product.images)assert.equal(Number(path.basename(image.source).match(/^\d+/)[0]),a.number);for(const scene of a.scenes)assert.equal(Number(path.basename(scene.source).match(/^\d+/)[0]),a.number);}
 }finally{await rm(root,{recursive:true,force:true});}
});


test('specifications require real values and resolvable dated HTTP sources; unresolved fields stay null',()=>{
 const entry={specifications:{abv:{label:'アルコール度数',value:'16%',sourceIds:['official']},acidity:null},specificationSources:[{id:'official',title:'公式商品仕様',url:'https://example.com/product',checkedAt:'2026-10-11'}],specificationGaps:{acidity:'未公開'}};
 const parse=entry=>manualSchema.parse({products:{'v01-001':entry},appearances:{}});
 assert.deepEqual(parse(entry).products['v01-001'],entry);
 const invalid=[
 {...entry,specificationSources:[]},
 {...entry,specificationSources:[...entry.specificationSources,...entry.specificationSources]},
 {...entry,specifications:{abv:{label:'度数',value:' ',sourceIds:['official']}}},
 {...entry,specifications:{abv:{label:'度数',value:'16%',sourceIds:[]}}},
 {...entry,specificationGaps:{abv:'未確認'}},
 {...entry,specificationSources:[{...entry.specificationSources[0],url:'javascript:alert(1)'}]},
 {...entry,specificationSources:[{...entry.specificationSources[0],checkedAt:'2026-02-30'}]}
 ];
 for(const value of invalid)assert.throws(()=>parse(value));
});

test('a manual specification correction survives changed automatic text and multi-volume association',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'botan-specification-'));
 try {
  await mkdir(path.join(root,'data'));
  for(const volume of [1,2]) {await mkdir(path.join(root,`第${volume}巻`));await writeFile(path.join(root,`第${volume}巻/info.txt`),'001. 自動の商品名\n出典: 第9話 p.20\n');}
  const manual={products:{'v01-001':{specifications:{abv:{label:'度数',value:'16%',sourceIds:['official']},acidity:null},specificationSources:[{id:'official',title:'公式仕様',url:'https://example.com/product',checkedAt:'2026-10-11'}]}},appearances:{'v02-001':{productId:'v01-001'}}};
  const file=path.join(root,'data/manual.json');await writeFile(file,JSON.stringify(manual));await importArchive(root);
  manual.products['v01-001'].specifications.abv.value='15%';await writeFile(file,JSON.stringify(manual));
  await writeFile(path.join(root,'第1巻/info.txt'),'001. 自動資料の修正\n出典: 第10話 p.21\n');await importArchive(root);await importArchive(root);
  const catalog=JSON.parse(await readFile(path.join(root,'data/catalog.json'),'utf8'));
  assert.equal(catalog.products.length,1);assert.equal(catalog.appearances.length,2);
  assert.deepEqual(catalog.products[0].specifications,manual.products['v01-001'].specifications);
  assert.deepEqual(catalog.products[0].specificationSources,manual.products['v01-001'].specificationSources);
  assert.equal(catalog.appearances[0].source,'第10話 p.21');assert.equal(catalog.appearances[1].source,'第9話 p.20');
  assert.equal(await readFile(file,'utf8'),JSON.stringify(manual));
 }finally{await rm(root,{recursive:true,force:true});}
});
