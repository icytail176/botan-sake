import { products, withBase } from '../lib/catalog';
export function GET() {
  const routes = ['', 'about/', ...products.map(p=>`sake/${p.id}/`)];
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(p=>`<url><loc>https://icytail176.github.io${withBase(p)}</loc></url>`).join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
