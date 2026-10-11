import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { manualSchema } from '../scripts/archive.mjs';

test('sourced prose rejects missing citations, empty text and unattributed sensory claims',()=>{
 const source={id:'official',title:'公式商品',url:'https://example.com/product',checkedAt:'2026-10-11'};
 const parse=p=>manualSchema.parse({products:{'v01-001':p},appearances:{}});
 const base={specificationSources:[source]};
 parse({...base,description:{text:'商品紹介',sourceIds:['official']},tastingNotes:[{text:'公式の説明',sourceIds:['official'],attribution:'蔵元による説明'}],background:[{text:'沿革',sourceIds:['official'],scope:'brand'}]});
 for(const p of [
  {...base,description:{text:' ',sourceIds:['official']}},
  {...base,description:{text:'紹介',sourceIds:[]}},
  {...base,description:{text:'紹介',sourceIds:['unknown']}},
  {...base,tastingNotes:[{text:'味',sourceIds:['official']}]},
  {...base,background:[{text:'沿革',sourceIds:['unknown'],scope:'brand'}]},
  {...base,background:[{text:'沿革',sourceIds:['official'],scope:'unknown'}]}
 ])assert.throws(()=>parse(p));
});

test('Round 5 retains original 39 values, names, URLs, associations and conflicting values',async()=>{
 const baseline=JSON.parse(await readFile('reports/round5-before.json','utf8'));
 const approved=JSON.parse(await readFile('reports/round5-nv-baseline.json','utf8'));
 const manual=manualSchema.parse(JSON.parse(await readFile('data/manual.json','utf8')));
 const catalog=JSON.parse(await readFile('data/catalog.json','utf8'));
 assert(catalog.products.length>=10);
 for(const old of baseline.catalog.appearances){
  assert.deepEqual(catalog.appearances.find(a=>a.id===old.id),old);
  assert.deepEqual(manual.appearances[old.id],baseline.manual.appearances[old.id]);
 }
 let count=0;
 for(const old of baseline.catalog.products){
  const p=manual.products[old.id];
  const current=catalog.products.find(p=>p.id===old.id);
  for(const key of ['name','url'])assert.deepEqual(current[key],old.id===approved.productId ? approved[key==='name'?'expectedName':'expectedURL'] : old[key]);
  for(const key of ['images','thumbnail'])assert.deepEqual(current[key],old[key]);
  for(const [key,spec]of Object.entries(old.specifications))if(spec){count++;assert.equal(p.specifications[key].value,spec.value);assert.equal(p.specifications[key].label,spec.label);assert.deepEqual(p.specifications[key].sourceIds,spec.sourceIds);}
  for(const key of ['name','url','category','notes'])assert.deepEqual(p[key],(old.id===approved.productId ? approved.expectedManual : baseline.manual.products[old.id])?.[key]);
 }
 assert.equal(count,39);
 assert.equal(manual.products['v01-003'].specifications.sakeMeterValue,null);
 assert.equal(manual.products['v01-003'].specifications.acidity,null);
 assert.equal(manual.products['v01-007'].specifications.ingredients.value,'黄金千貫、米麹');
 assert.equal(manual.products['v01-008'].specifications.abv,null);
 assert.deepEqual(manual.products['v01-004'],approved.expectedManual);
});

test('authorized NV revision preserves all other nine Round 5 products and every appearance',async()=>{
 const before=JSON.parse(await readFile('reports/round5-nv-before.json','utf8'));
 const catalog=JSON.parse(await readFile('data/catalog.json','utf8'));
 const manual=JSON.parse(await readFile('data/manual.json','utf8'));
 assert.deepEqual(catalog.appearances,before.catalog.appearances);
 assert.deepEqual(manual.appearances,before.manual.appearances);
 for(const old of before.catalog.products.filter(p=>p.id!=='v01-004')){
  assert.deepEqual(catalog.products.find(p=>p.id===old.id),old);
  assert.deepEqual(manual.products[old.id],before.manual.products[old.id]);
 }
 const p=catalog.products.find(p=>p.id==='v01-004');
 assert.equal(p.category,'ワイン');assert(!p.name.includes('レセルバ'));
 assert.equal(p.url,'https://www.dragee.co.jp/fs/dragee/W-SK18070901');
 assert.equal(Object.values(p.specifications).filter(Boolean).length,11);
 assert.equal(p.specifications.abv.value,'11.5%');
 assert.equal(p.specifications.grapeRatio.value,'マカベオ90%／パレリャーダ10%');
 assert.equal(p.specifications.aging.value,'9ヶ月');
 assert(!JSON.stringify(p.specificationGaps).includes('Reserva'));
});
