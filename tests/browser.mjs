import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const home=process.env.BOTAN_TEST_URL ?? 'http://127.0.0.1:4321/botan-sake/';
const target=new URL(home);
assert.equal(target.pathname,'/botan-sake/','Browser checks require the project base path');
assert(['http:','https:'].includes(target.protocol));
const online=!['127.0.0.1','localhost'].includes(target.hostname);
const screenshots=`reports/screenshots/${online?'online':'local'}`;
const canonicalHome='https://icytail176.github.io/botan-sake/';
const results=[];
const catalog=JSON.parse(await readFile('data/catalog.json','utf8'));
const products=[...catalog.products].sort((a,b)=>{const x=catalog.appearances.find(p=>p.productId===a.id),y=catalog.appearances.find(p=>p.productId===b.id);return x.volume-y.volume || x.number-y.number;});
await mkdir(screenshots,{recursive:true});
try {
 for(const width of [375,390,768,1440]) {
  const context=await browser.newContext({ viewport:{width,height:1000}, colorScheme:'dark' });
  const page=await context.newPage();const errors=[],failed=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)failed.push(`${r.status()} ${r.url()}`);});
  await page.goto(home,{waitUntil:'networkidle'});
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),canonicalHome);
  assert.match(await page.title(),/ぼたんの酒手帖/);
  assert.equal(await page.locator('html').getAttribute('lang'),'ja');
  await page.keyboard.press('Tab');assert.equal(await page.locator('.skip-link').evaluate(a=>a===document.activeElement),true);await page.locator('.intro .eyebrow').click();
  await page.locator('.sake-card img').evaluateAll(imgs=>Promise.all(imgs.map(img=>img.decode())));
  const info=await page.evaluate(()=>({ viewport:innerWidth, page:document.documentElement.scrollWidth, columns:getComputedStyle(document.querySelector('.sake-grid')).gridTemplateColumns.split(' ').length, colorScheme:getComputedStyle(document.documentElement).colorScheme, square:[...document.querySelectorAll('.product-square')].every(e=>Math.abs(e.getBoundingClientRect().width-e.getBoundingClientRect().height)<1), images:[...document.images].filter(i=>i.hasAttribute('src')).every(i=>i.complete&&i.naturalWidth>0), contain:[...document.querySelectorAll('.product-square img')].every(e=>getComputedStyle(e).objectFit==='contain'), white:[...document.querySelectorAll('.product-square')].every(e=>getComputedStyle(e).backgroundColor==='rgb(255, 255, 255)') }));
  assert(info.page<=width,`Home overflow ${width}: ${info.page}`);assert.equal(info.columns,width<700?2:width<=1050?3:4);assert(info.square&&info.contain&&info.images&&info.white);assert.equal(info.colorScheme,'light');
  assert.equal(await page.locator('.uncertain-tag').count(),catalog.products.filter(p=>catalog.appearances.some(a=>a.productId===p.id&&a.status!=='confirmed')).length);
  assert.equal(await page.locator('#result-count').textContent(),`全 ${products.length} 銘柄を表示`);
  await page.screenshot({path:`${screenshots}/home-${width}.png`,fullPage:true});
  await page.locator('#search').fill('ちちぶ');assert.equal(await page.locator('.sake-card:visible').count(),0); // kanji readings are not invented
  await page.locator('#search').fill('秩父');assert.equal(await page.locator('.sake-card:visible').count(),3);assert.equal(await page.locator('#result-count').textContent(),`${products.length} 銘柄中 3 銘柄を表示`);
  await page.locator('#search').fill('ﾊﾟﾝｸipa');assert.equal(await page.locator('.sake-card:visible').count(),1);
  await page.locator('#search').fill('');await page.getByRole('button',{name:'ビール',exact:true}).click();assert.equal(await page.locator('.sake-card:visible').count(),3);
  await page.locator('#volume').selectOption('1');assert.equal(await page.locator('.sake-card:visible').count(),3);
  await page.locator('.sake-card:visible a').first().click();await page.waitForURL(/sake\/v01-002/);
  await page.locator('.scene-gallery a').first().click();assert(await page.locator('#image-dialog').isVisible());await page.locator('#lightbox-image').evaluate(i=>i.decode());
  const lightbox=await page.locator('#lightbox-image').evaluate(i=>({width:i.naturalWidth,height:i.naturalHeight,renderedWidth:i.width,renderedHeight:i.height}));assert(Math.abs(lightbox.renderedWidth/lightbox.renderedHeight-lightbox.width/lightbox.height)<.01);
  await page.getByRole('button',{name:'原寸で見る',exact:true}).click();assert.equal(await page.locator('#lightbox-size').getAttribute('aria-pressed'),'true');
  await page.getByRole('button',{name:'画像プレビューを閉じる'}).click();assert(!(await page.locator('#image-dialog').isVisible()));
  await page.locator('.scene-gallery a').first().focus();await page.keyboard.press('Enter');
  for(let n=0;n<4;n++){await page.keyboard.press('Tab');assert(await page.locator('#image-dialog').evaluate(d=>d.contains(document.activeElement)),'Focus escaped modal');}
  await page.keyboard.press('Escape');assert(!(await page.locator('#image-dialog').isVisible()));
  assert(await page.locator('.scene-gallery a').first().evaluate(a=>a===document.activeElement));
  await page.locator('.scene-gallery a').first().click();await page.mouse.click(2,2);assert(!(await page.locator('#image-dialog').isVisible()),'Backdrop did not close');
  assert(await page.locator('.scene-gallery a').first().evaluate(a=>a===document.activeElement));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.goBack();assert.equal(await page.locator('.sake-card:visible').count(),3);assert.equal(await page.locator('[data-filter="ビール"]').getAttribute('aria-pressed'),'true');
  await page.locator('#search').fill('zzzz-nonexistent');assert(await page.locator('#empty-state').isVisible());await page.getByRole('button',{name:'絞り込みをリセット'}).click();assert.equal(await page.locator('.sake-card:visible').count(),products.length);
  await page.goto(`${home}sake/v01-001/`,{waitUntil:'networkidle'});
  await page.locator('.detail-photo img,.scene-gallery img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
  await page.screenshot({path:`${screenshots}/detail-${width}.png`,fullPage:true});
  await page.locator('.scene-gallery a').click();await page.screenshot({path:`${screenshots}/lightbox-${width}.png`});
  await page.getByRole('button',{name:'原寸で見る',exact:true}).click();
  const scrollable=await page.locator('.lightbox-scroll').evaluate(e=>({scroll:e.scrollHeight,client:e.clientHeight}));
  assert(scrollable.scroll>scrollable.client,'Portrait image can scroll at its original size');
  await page.locator('.lightbox-scroll').evaluate(e=>e.scrollTo(0,e.scrollHeight));
  assert(await page.locator('.lightbox-scroll').evaluate(e=>e.scrollTop>0));await page.getByRole('button',{name:'画像プレビューを閉じる'}).click();
  await page.getByRole('link',{name:/図鑑にもどる/}).click();await page.waitForURL(/#catalog$/);assert.equal(await page.locator('.sake-card:visible').count(),products.length);
  // Every static detail route, including the longest name, fits and loads its images.
  for(const [index,product] of products.entries()) {
   await page.goto(`${home}sake/${product.id}/`,{waitUntil:'networkidle'});
   await page.locator('img[src]').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Detail overflow ${width}/${product.id}`);
   assert(await page.evaluate(()=>[...document.images].filter(i=>i.hasAttribute('src')).every(i=>i.complete&&i.naturalWidth>0)));
   assert.equal(await page.locator('h1').innerText(),product.name);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),`${canonicalHome}sake/${product.id}/`);
   if(product.url)assert.equal(await page.locator('.external-link').getAttribute('href'),product.url);
   assert(!/rogergoulart\.ne\.jp|image-host|wsrv\.nl/.test(await page.content()));
   const appearances=catalog.appearances.filter(a=>a.productId===product.id),actual=[];
   for(const image of await page.locator('.scene-gallery img').all())actual.push(await image.getAttribute('src'));
   assert.deepEqual(actual,appearances.flatMap(a=>a.scenes.map(s=>`/botan-sake/${s.path}`)));
   assert.equal(await page.locator('.detail-photo .product-square img').getAttribute('src'),`/botan-sake/${product.images[0].path}`);
   if(appearances.every(a=>a.status==='confirmed'))assert(!/照合未確認|識別未確定|銘柄は要確認|確認済み|不确定|同定が未確定/.test(await page.locator('main').innerText()),`Stale status ${product.id}`);
   if(!product.category)assert.equal(await page.locator('.detail-category').count(),0);
   const visibleText=await page.locator('main').innerText();
   assert(!/\bv\d{2}-\d{3}\b|\b00[1-9]\b|\b010\b|資料番号|話数|ページは未登録|第\d+話|出典/.test(visibleText),`Internal/source metadata visible ${product.id}`);
   assert.equal(await page.locator('.appearance-volumes').innerText(),`登場巻：${[...new Set(appearances.map(a=>a.volume))].map(v=>`第${v}巻`).join('、')}`);
   const specifications=Object.entries(product.specifications).filter(([,s])=>s!==null);
   assert.equal(await page.locator('.specification-table tr').count(),specifications.length);
   assert.equal(await page.locator('.product-specifications').count(),specifications.length?1:0);
   if(!specifications.length)assert.equal(await page.locator('.product-detail').evaluate(e=>getComputedStyle(e).gridTemplateColumns.split(' ').length),1,'Missing-spec page must collapse to a single column');
   for(const [key,spec] of specifications){
    const row=page.locator(`[data-specification="${key}"]`);
    assert.equal(await row.locator('th').innerText(),spec.label);assert.equal(await row.locator('.specification-value').innerText(),spec.value);
    assert(await row.evaluate(e=>e.getBoundingClientRect().right<=innerWidth && e.scrollWidth<=e.clientWidth),'Specification row overflow');
    for(const id of spec.sourceIds){const n=product.specificationSources.findIndex(s=>s.id===id)+1;assert.equal(await page.locator(`#reference-${n} a`).getAttribute('href'),product.specificationSources[n-1].url);await row.locator(`a[href="#reference-${n}"]`).click();assert(await page.locator(`#reference-${n}`).isVisible());}
   }
   for(const a of await page.locator('[data-lightbox]').all())assert(!/v\d{2}-\d{3}|資料番号|\b00[1-9]\b/.test((await a.getAttribute('data-caption')??'')+(await a.getAttribute('aria-label')??'')));
   if(width===375 && product.id==='v01-003'){await page.locator('.scene-gallery a').first().click();assert(!/v\d{2}-\d{3}|\b00[1-9]\b|資料番号/.test(await page.locator('#image-dialog-title').innerText()));await page.keyboard.press('Escape');}
   await page.evaluate(()=>scrollTo(0,0));

   const nav=page.locator('.detail-pagination');const navLinks=await nav.locator('a').evaluateAll(as=>as.map(a=>a.getAttribute('href')));
   assert.deepEqual(navLinks,[...(products[index-1]?[`/botan-sake/sake/${products[index-1].id}/`]:[]),'/botan-sake/#catalog',...(products[index+1]?[`/botan-sake/sake/${products[index+1].id}/`]:[])]);
   for(const image of await page.locator('.scene-gallery img').all()){assert(await image.evaluate(i=>Math.abs(i.getBoundingClientRect().width/i.getBoundingClientRect().height-i.naturalWidth/i.naturalHeight)<.01));}
   await page.screenshot({path:`${screenshots}/${product.id}-${width}.png`,fullPage:true});
  }
  await page.goto(`${home}sake/v01-005/`);await page.getByRole('link',{name:/次のお酒/}).click();await page.waitForURL(/sake\/v01-006/);await page.getByRole('link',{name:/前のお酒/}).click();await page.waitForURL(/sake\/v01-005/);

  await page.goto(`${home}about/`);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),`${canonicalHome}about/`);
  assert.equal(await page.getByRole('link',{name:'GitHub Issues',exact:true}).getAttribute('href'),'https://github.com/icytail176/botan-sake/issues');
  const sitemap=await context.request.get(`${home}sitemap.xml`);assert.equal(sitemap.status(),200);
  const locations=[...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
  assert.deepEqual(locations,[canonicalHome,`${canonicalHome}about/`,...catalog.products.map(p=>`${canonicalHome}sake/${p.id}/`)]);
  // A request for a missing route must serve the custom 404, not the homepage.
  const missing=await context.request.get(`${home}acceptance-missing-page/`);assert.equal(missing.status(),404);
  assert((await missing.text()).includes('このページは見つかりませんでした。'));
  await page.goto(`${home}404.html`,{waitUntil:'networkidle'});
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'),'noindex');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.getByRole('link',{name:'酒図鑑へもどる →',exact:true}).click();await page.waitForURL(home);
  assert.equal(errors.length,0,errors.join('\n'));assert.equal(failed.length,0,failed.join('\n'));
  results.push({width,...info,search:true,category:true,volume:true,emptyReset:true,historyRestore:true,lightboxClose:true,escape:true,focusRestored:true,naturalAspectRatio:true,longImageScrollable:scrollable.scroll>scrollable.client,detailRoutes:products.length,backdropClose:true,keyboardTrap:true,keyboardOpen:true,previousNext:true,matchingAllSourceImages:true,confirmedStateUI:true,hiddenInternalIDs:true,volumeOnly:true,sourcedSpecifications:true,noEmptySpecificationRows:true,responsiveTables:true,productLinks:true,canonical:true,sitemap:true,aboutFeedback:true,custom404:true,errors,failed});
  console.log(`PASS ${width}px: ${info.columns} columns, no overflow, all interactions and 10 routes`);
  await context.close();
 }
 await writeFile(`reports/${online?'online':'browser'}-validation.json`,JSON.stringify({browser:'Chrome / Playwright',scope:online?'online':'local',baseURL:home,checkedAt:new Date().toISOString(),darkEnvironment:true,results},null,2)+'\n');
} finally {await browser.close();}
