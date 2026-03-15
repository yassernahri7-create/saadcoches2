const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const { createCorsOptions, parsePort } = require('./backend/server-common.cjs');
const { distDir, ensureStorage, readPublicData, uploadsDir } = require('./backend/site-store.cjs');

const app = express();
const port = parsePort(process.env.WEBSITE_PORT || process.env.PORT, 3004);
const devFrontendUrl = process.env.DEV_FRONTEND_URL || 'http://localhost:5173';
const distIndex = path.join(distDir, 'index.html');
const SITE_URL = process.env.SITE_URL || 'https://norcoches.com';

ensureStorage();

app.use(cors(createCorsOptions()));
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'website' });
});

app.get('/api/data', (_req, res) => {
  res.json(readPublicData());
});

// ── robots.txt ──
app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').send(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml`
  );
});

// ── XML Sitemap ──
app.get('/sitemap.xml', (_req, res) => {
  const db = readPublicData();
  const posts = Array.isArray(db.posts) ? db.posts.filter(p => p.published) : [];

  const staticPages = [
    { loc: SITE_URL, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE_URL}/blog`, priority: '0.9', changefreq: 'daily' },
  ];

  const postPages = posts.map(p => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: p.updatedAt || p.publishedAt || new Date().toISOString().split('T')[0]
  }));

  const allPages = [...staticPages, ...postPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${p.loc}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
    ${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  res.type('application/xml').send(xml);
});

// ── SEO Meta Injection for Blog Posts ──
function injectMeta(html, { title, description, image, url, jsonLd }) {
  const og = `
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="article" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <link rel="canonical" href="${url}" />
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}`;

  return html
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${description}" />`)
    .replace('</head>', og + '\n</head>');
}

// Blog list page — inject general meta
app.get('/blog', (_req, res) => {
  if (!fs.existsSync(distIndex)) {
    return res.redirect(302, `${devFrontendUrl}/blog`);
  }
  let html = fs.readFileSync(distIndex, 'utf8');
  html = injectMeta(html, {
    title: 'Blog Norcoches – Conseils, Guide & Actualités Location Voiture à Tanger',
    description: 'Conseils de location voiture à Tanger, guides de voyage au Maroc, astuces et actualités de Norcoches.',
    image: `${SITE_URL}/images/logo.png`,
    url: `${SITE_URL}/blog`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Blog Norcoches',
      url: `${SITE_URL}/blog`,
      publisher: { '@type': 'Organization', name: 'Norcoches', url: SITE_URL }
    }
  });
  res.type('text/html').send(html);
});

// Individual blog post — inject post-specific meta + JSON-LD
app.get('/blog/:slug', (req, res) => {
  const db = readPublicData();
  const post = Array.isArray(db.posts) ? db.posts.find(p => p.slug === req.params.slug && p.published) : null;

  if (!fs.existsSync(distIndex)) {
    return res.redirect(302, `${devFrontendUrl}/blog/${req.params.slug}`);
  }

  let html = fs.readFileSync(distIndex, 'utf8');

  if (post) {
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const coverImage = post.coverImage
      ? (post.coverImage.startsWith('http') ? post.coverImage : `${SITE_URL}${post.coverImage}`)
      : `${SITE_URL}/images/logo.png`;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.metaDescription || post.excerpt,
      image: coverImage,
      url: postUrl,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: { '@type': 'Organization', name: post.author || 'Norcoches' },
      publisher: {
        '@type': 'Organization',
        name: 'Norcoches',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` }
      },
      keywords: Array.isArray(post.tags) ? post.tags.join(', ') : ''
    };

    html = injectMeta(html, {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || '',
      image: coverImage,
      url: postUrl,
      jsonLd
    });
  }

  res.type('text/html').send(html);
});

app.use('/uploads', express.static(uploadsDir));
app.use(express.static(distDir, { index: false }));

app.get(/^\/admin(?:\/.*)?$/, (_req, res) => {
  if (process.env.ADMIN_DOMAIN) {
    res.redirect(302, `https://${process.env.ADMIN_DOMAIN}/admin`);
    return;
  }
  res.status(404).type('text/plain').send('Admin is available on the admin domain.');
});

app.get(/^(?!\/(api|uploads)).*/, (req, res) => {
  if (fs.existsSync(distIndex)) {
    res.sendFile(distIndex);
    return;
  }
  res.redirect(302, `${devFrontendUrl}${req.originalUrl || '/'}`);
});

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: 'not_found' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`NourCoches website server running on 0.0.0.0:${port}`);
});
