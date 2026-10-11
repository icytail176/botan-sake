import { importArchive } from './archive.mjs';
const report = await importArchive(process.cwd());
console.log(`Imported ${report.products} products / ${report.appearances} appearances / ${report.volumes} volumes. ${report.issues.filter(i=>i.severity==='warning').length} warnings. See reports/import-report.md.`);
