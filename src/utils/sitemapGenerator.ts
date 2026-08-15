import { BlogPost, BLOG_POSTS } from "../data/blogData";
import { getCustomArticles } from "./customArticlesStorage";

const DOMAIN = "https://qrcodegeneratorx.com";
const LOCALES = ["en", "ar", "fr", "es", "de", "zh", "pt", "ja"] as const;

const STATIC_PAGES = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "how-it-works", priority: "0.9", changefreq: "daily" },
  { path: "features", priority: "0.9", changefreq: "daily" },
  { path: "faq", priority: "0.9", changefreq: "daily" },
  { path: "blog", priority: "0.8", changefreq: "daily" },
  { path: "privacy", priority: "0.9", changefreq: "daily" },
  { path: "terms", priority: "0.9", changefreq: "daily" },
];

/**
 * Returns formatted ISO date YYYY-MM-DD
 */
export function getFormattedCurrentDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Generates the complete, standardized XML string for sitemap.xml
 * Including all static pages, all built-in blog posts, and all newly published custom articles across all 8 languages.
 */
export function generateFullSitemapXml(customArticlesOverride?: BlogPost[]): string {
  const customArticles = customArticlesOverride || getCustomArticles();
  const currentDate = getFormattedCurrentDate();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages for all 8 locales
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      const urlPath = page.path ? `/${locale}/${page.path}` : `/${locale}`;
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}${urlPath}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  // 2. Custom newly published articles (Top priority)
  for (const article of customArticles) {
    for (const locale of LOCALES) {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/${locale}/blog/${article.id}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  // 3. Built-in standard blog posts
  for (const post of BLOG_POSTS) {
    for (const locale of LOCALES) {
      xml += `  <url>\n`;
      xml += `    <loc>${DOMAIN}/${locale}/blog/${post.id}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>`;
  return xml;
}

/**
 * Generates XML snippet specifically for one article across all 8 locales
 */
export function generateArticleSitemapXmlSnippet(article: BlogPost): string {
  const currentDate = getFormattedCurrentDate();
  let snippet = `<!-- XML Tags for Article: ${article.title} -->\n`;
  for (const locale of LOCALES) {
    snippet += `<url>\n`;
    snippet += `  <loc>${DOMAIN}/${locale}/blog/${article.id}</loc>\n`;
    snippet += `  <lastmod>${currentDate}</lastmod>\n`;
    snippet += `  <changefreq>weekly</changefreq>\n`;
    snippet += `  <priority>0.8</priority>\n`;
    snippet += `</url>\n`;
  }
  return snippet;
}

/**
 * Triggers a browser download of the updated sitemap.xml
 */
export function downloadUpdatedSitemapXml(customArticlesOverride?: BlogPost[]): void {
  if (typeof window === "undefined") return;
  const xmlContent = generateFullSitemapXml(customArticlesOverride);
  const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sitemap.xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Get calculation stats of all indexed URLs in sitemap.xml
 */
export function getSitemapStats(customArticlesOverride?: BlogPost[]) {
  const customArticles = customArticlesOverride || getCustomArticles();
  const staticCount = LOCALES.length * STATIC_PAGES.length;
  const builtInCount = LOCALES.length * BLOG_POSTS.length;
  const customCount = LOCALES.length * customArticles.length;
  const totalCount = staticCount + builtInCount + customCount;

  return {
    totalUrls: totalCount,
    staticCount,
    builtInPostsCount: builtInCount,
    customPostsCount: customCount,
    customArticlesCount: customArticles.length,
    lastUpdated: getFormattedCurrentDate(),
  };
}
