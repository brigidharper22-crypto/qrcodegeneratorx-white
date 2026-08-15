import { BlogPost } from "../data/blogData";

export interface ParsedArticleDraft {
  title: string;
  slug: string;
  focusKeyword: string;
  metaDescription: string;
  category: string;
  summary: string;
  keywords: string[];
  estimatedReadTime: string;
  paragraphs: string[];
  rawBodyText: string;
  detectedStats: {
    headingsCount: number;
    tablesCount: number;
    paragraphsCount: number;
    wordsCount: number;
    keywordsCount: number;
  };
}

/**
 * Clean slug string
 */
export function sanitizeSlug(input: string): string {
  if (!input) return "";
  return input
    .replace(/^https?:\/\/[^/]+/i, "")
    .replace(/^\/?(ar|en|fr|es|de|zh|pt|ja)\//i, "")
    .replace(/^\/?blog\//i, "")
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0621-\u064A-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Intelligent Auto-Classifier for Categories based on text and keywords
 */
export function detectCategory(text: string, currentCategory?: string): string {
  if (currentCategory && currentCategory !== "General" && currentCategory !== "عام") {
    return currentCategory;
  }
  const lower = text.toLowerCase();

  if (/cafe|coffee|restaurant|food|menu|dining|hotel|hospitality|bar|مقهى|كافيه|مطعم|منيو|ضيافة/i.test(lower)) {
    return "Tutorials";
  }
  if (/marketing|seo|campaign|growth|analytics|traffic|تسويق|سيو|حملات/i.test(lower)) {
    return "Marketing";
  }
  if (/business|enterprise|retail|sales|shop|store|تجارة|أعمال|مبيعات|شركات/i.test(lower)) {
    return "Business";
  }
  if (/how to|guide|step by step|tutorial|create|setup|كيف|دليل|شرح|طريقة|خطوات/i.test(lower)) {
    return "Tutorials";
  }
  if (/security|dynamic|tech|api|generator|technology|تقنية|أمان|تكنولوجيا/i.test(lower)) {
    return "Technology";
  }
  if (/event|wedding|invitation|conference|ticket|مناسبات|مؤتمرات|دعوات/i.test(lower)) {
    return "Events";
  }
  return "Tutorials";
}

/**
 * Intelligent Smart Parser for raw article text
 * Handles Title, SEO Title, Meta Description, Primary Keyword, URL Slug, Category, Secondary Keywords,
 * and parses body content distinguishing Headings (H2/H3), Tables, Lists, Callouts, and Paragraphs.
 */
export function parseRawArticleContent(rawInput: string): ParsedArticleDraft {
  const normalized = rawInput.replace(/\r\n/g, "\n");
  const lines = normalized.split("\n");

  let title = "";
  let slug = "";
  let focusKeyword = "";
  let metaDescription = "";
  let category = "";
  let summary = "";
  const rawKeywordsList: string[] = [];

  const bodyLines: string[] = [];
  let isParsingBody = false;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (isParsingBody) {
        bodyLines.push("");
      }
      continue;
    }

    // Check if line is metadata
    const titleMatch = trimmed.match(/^(?:article\s+title|seo\s+title|title|عنوان\s+المقال|العنوان)\s*[:：\-–]\s*(.+)$/i);
    const descMatch = trimmed.match(/^(?:meta\s+description|description|seo\s+description|الوصف\s+المختصر|الوصف|وصف\s+سيو)\s*[:：\-–]\s*(.+)$/i);
    const focusKwMatch = trimmed.match(/^(?:primary\s+keyword|focus\s+keyword|main\s+keyword|الكلمة\s+المفتاحية\s+الرئيسية|الكلمة\s+الدلالية\s+الرئيسية|الكلمة\s+الرئيسية)\s*[:：\-–]\s*(.+)$/i);
    const slugMatch = trimmed.match(/^(?:url\s+slug|slug|url|رابط\s+المقال|الرابط|الاسم\s+اللطيف)\s*[:：\-–]\s*(.+)$/i);
    const kwMatch = trimmed.match(/^(?:secondary\s+keywords|keywords\s+tags|keywords|tags|الكلمات\s+الدلالية|الكلمات\s+المفتاحية|الوسوم)\s*[:：\-–]\s*(.+)$/i);
    const catMatch = trimmed.match(/^(?:category|classification|التصنيف|القسم)\s*[:：\-–]\s*(.+)$/i);
    const sumMatch = trimmed.match(/^(?:summary|quick\s+summary|الملخص|ملخص\s+المقال)\s*[:：\-–]\s*(.+)$/i);

    if (titleMatch && !title) {
      title = titleMatch[1].trim();
      continue;
    }
    if (descMatch && !metaDescription) {
      metaDescription = descMatch[1].trim();
      continue;
    }
    if (focusKwMatch && !focusKeyword) {
      focusKeyword = focusKwMatch[1].trim();
      continue;
    }
    if (slugMatch && !slug) {
      slug = sanitizeSlug(slugMatch[1].trim());
      continue;
    }
    if (kwMatch) {
      rawKeywordsList.push(kwMatch[1].trim());
      continue;
    }
    if (catMatch && !category) {
      category = catMatch[1].trim();
      continue;
    }
    if (sumMatch && !summary) {
      summary = sumMatch[1].trim();
      continue;
    }

    // First non-metadata line without heading prefix could be the article Title if title not yet set
    if (!title && !isParsingBody && !trimmed.startsWith("#") && !trimmed.startsWith("|") && trimmed.length < 150) {
      title = trimmed;
      continue;
    }

    // Otherwise, we have reached the actual article body!
    isParsingBody = true;
    bodyLines.push(rawLine);
  }

  // Parse keywords from rawKeywordsList
  const parsedKeywords: string[] = [];
  const seenKw = new Set<string>();

  // Add focus keyword first if present
  if (focusKeyword) {
    seenKw.add(focusKeyword.toLowerCase());
    parsedKeywords.push(focusKeyword);
  }

  rawKeywordsList.forEach((kwChunk) => {
    kwChunk
      .split(/[,،;؛|\n]+/)
      .map((k) => k.trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, ""))
      .filter(Boolean)
      .forEach((k) => {
        if (!seenKw.has(k.toLowerCase())) {
          seenKw.add(k.toLowerCase());
          parsedKeywords.push(k);
        }
      });
  });

  // If title was found but no slug, auto-generate slug
  if (!slug && title) {
    slug = sanitizeSlug(title);
  }

  // If no category explicitly matched, detect from content
  const detectedCategoryName = detectCategory(`${title} ${focusKeyword} ${bodyLines.slice(0, 30).join(" ")}`, category);

  // If no summary, use meta description or first body paragraph
  if (!summary) {
    if (metaDescription) {
      summary = metaDescription;
    } else {
      const firstRealLine = bodyLines.find((l) => l.trim().length > 30 && !l.trim().startsWith("#") && !l.trim().startsWith("|"));
      summary = firstRealLine ? firstRealLine.trim().slice(0, 200) + (firstRealLine.length > 200 ? "..." : "") : "";
    }
  }

  // Parse structured blocks from bodyLines (distinguishing Headings, Tables, Lists, Callouts, Paragraphs)
  const fullBodyRaw = bodyLines.join("\n").trim();
  const rawParagraphBlocks = fullBodyRaw.split(/\n{2,}/);

  const structuredParagraphs: string[] = [];
  let headingsCount = 0;
  let tablesCount = 0;

  for (const block of rawParagraphBlocks) {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) continue;

    // Check if it is a Table (contains pipes '|' on multiple lines or standard markdown table structure)
    const blockLines = trimmedBlock.split("\n").map((l) => l.trim());
    const isTable =
      blockLines.length >= 2 &&
      blockLines.filter((l) => l.startsWith("|") && l.endsWith("|")).length >= 2;

    if (isTable) {
      tablesCount++;
      structuredParagraphs.push(trimmedBlock);
      continue;
    }

    // Check if it is an H2 Heading
    const isH2Markdown = trimmedBlock.startsWith("## ");
    const isH2Prefix = /^h2\s*[:：\-–]\s*/i.test(trimmedBlock);
    const isNumberedHeading = /^(?:section\s+\d+|\d+\.)\s+[A-Z\u0621-\u064A]/i.test(trimmedBlock) && trimmedBlock.length < 100 && !trimmedBlock.includes(".");
    
    if (isH2Markdown || isH2Prefix) {
      headingsCount++;
      const cleanH2 = trimmedBlock.replace(/^##\s*/, "").replace(/^h2\s*[:：\-–]\s*/i, "").trim();
      structuredParagraphs.push(`H2: ${cleanH2}`);
      continue;
    }

    // Check if it is an H3 Heading
    const isH3Markdown = trimmedBlock.startsWith("### ");
    const isH3Prefix = /^h3\s*[:：\-–]\s*/i.test(trimmedBlock);
    if (isH3Markdown || isH3Prefix) {
      headingsCount++;
      const cleanH3 = trimmedBlock.replace(/^###\s*/, "").replace(/^h3\s*[:：\-–]\s*/i, "").trim();
      structuredParagraphs.push(`H3: ${cleanH3}`);
      continue;
    }

    // Check if single line looking like a strong major heading (e.g., short, capitalized, no ending period, preceded by number)
    if (
      blockLines.length === 1 &&
      trimmedBlock.length < 85 &&
      (isNumberedHeading || /^(?:why|how|what|top\s+\d+|best|benefits|step\s+\d+|guide|مقدمة|أهمية|كيفية|خطوات|أفضل|مميزات)\b/i.test(trimmedBlock)) &&
      !trimmedBlock.endsWith(".") &&
      !trimmedBlock.endsWith("،")
    ) {
      headingsCount++;
      structuredParagraphs.push(`H2: ${trimmedBlock}`);
      continue;
    }

    // Standard paragraph, list, or callout
    structuredParagraphs.push(trimmedBlock);
  }

  // Calculate estimated read time (avg 200 words/min)
  const totalWords = fullBodyRaw ? fullBodyRaw.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(totalWords / 200));
  const estimatedReadTime = `${minutes} min read`;

  return {
    title: title || "New Article Title",
    slug: slug || "new-article-slug",
    focusKeyword: focusKeyword || (parsedKeywords[0] || ""),
    metaDescription: metaDescription || summary || "",
    category: detectedCategoryName,
    summary: summary || metaDescription || "",
    keywords: parsedKeywords,
    estimatedReadTime,
    paragraphs: structuredParagraphs.length > 0 ? structuredParagraphs : [fullBodyRaw || "Start writing your content here..."],
    rawBodyText: fullBodyRaw,
    detectedStats: {
      headingsCount,
      tablesCount,
      paragraphsCount: structuredParagraphs.length,
      wordsCount: totalWords,
      keywordsCount: parsedKeywords.length,
    },
  };
}
