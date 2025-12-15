
// Utility to generate sitemap XML structure dynamically if needed
// Can be run via a node script in a build pipeline

export const routes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'yearly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/faq', priority: '0.7', changefreq: 'monthly' },
  { path: '/pmo-solution', priority: '0.9', changefreq: 'monthly' },
  { path: '/rgpd', priority: '0.5', changefreq: 'yearly' },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' },
];

export const generateSitemap = () => {
  const baseUrl = 'https://powalyze.ch';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">`;

  routes.forEach(route => {
    xml += `
  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr${route.path}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${route.path}" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/de${route.path}" />
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};
