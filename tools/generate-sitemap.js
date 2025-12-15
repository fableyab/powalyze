// Generates sitemap.xml and robots.txt into dist after Vite build
// Usage: node tools/generate-sitemap.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const distDir = path.join(projectRoot, 'dist');

  // Ensure dist exists
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found. Run build first.');
    process.exit(1);
  }

  // Prefer SITE_URL env for canonical, fallback to powalyze.ch
  const siteUrl = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://powalyze.ch';

  // Import the sitemap generator from src (ESM)
  const sitemapModulePath = path.join(projectRoot, 'src', 'utils', 'sitemapGenerator.js');
  let sitemapXml = '';
  try {
    const mod = await import(pathToFileURL(sitemapModulePath).href);
    if (typeof mod.generateSitemap === 'function') {
      // If generator uses a fixed URL, allow replacing base via env
      sitemapXml = (mod.generateSitemapWithBase
        ? mod.generateSitemapWithBase(siteUrl)
        : mod.generateSitemap());
    }
  } catch (e) {
    console.warn('Could not import sitemap generator, using minimal sitemap:', e.message);
  }

  if (!sitemapXml) {
    // Minimal fallback
    const today = new Date().toISOString().split('T')[0];
    sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;
  }

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

  // robots.txt
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  const robotsPath = path.join(distDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf8');

  console.log('✓ Generated sitemap.xml and robots.txt in dist/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
