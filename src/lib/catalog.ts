import raw from '../../data/catalog.json';
export interface Asset { path: string; source: string; width: number; height: number; hash: string }
export interface Specification { label: string; value: string; sourceIds: string[]; note?: string }
export interface SpecificationSource { id: string; title: string; url: string; checkedAt: string; versionNote?: string }
export interface SourcedText { text: string; sourceIds: string[]; note?: string }
export interface TastingNote extends SourcedText { attribution: string }
export interface Background extends SourcedText { scope: 'product' | 'brand' }
export interface Product { description: SourcedText | null; tastingNotes: TastingNote[]; background: Background[]; id: string; name: string; category: string | null; categorySource: string | null; url: string | null; notes: string | null; images: Asset[]; thumbnail: Asset | null; specifications: Partial<Record<string, Specification | null>>; specificationSources: SpecificationSource[]; specificationGaps: Partial<Record<string, string>> }
export const specificationsFor = (product: Product) => Object.entries(product.specifications).filter((entry): entry is [string, Specification] => entry[1] != null);
export interface Appearance { id: string; productId: string; volume: number; number: number; status: 'confirmed' | 'uncertain' | 'unreviewed'; source: string | null; notes: string | null; scenes: Asset[]; textSources: string[] }
export const catalog = raw as { schemaVersion: number; volumes: { number: number; directory: string; label: string }[]; products: Product[]; appearances: Appearance[] };
export const appearancesFor = (id: string) => catalog.appearances.filter(a => a.productId === id).sort((a,b)=>a.volume-b.volume || a.number-b.number);
export const products = [...catalog.products].sort((a,b) => { const x = appearancesFor(a.id)[0]!, y = appearancesFor(b.id)[0]!; return x.volume-y.volume || x.number-y.number; });
export const withBase = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const statusLabel = (s: Appearance['status']) => ({ confirmed: '確認済み', uncertain: '銘柄は要確認', unreviewed: '照合未確認' })[s];
