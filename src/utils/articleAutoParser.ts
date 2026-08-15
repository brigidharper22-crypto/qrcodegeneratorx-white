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

  if (/cafe|coffee|restaurant|food|menu|dining|hotel|hospitality|bar|airbnb|vacation|rental|lodging|host|apartment|guest|مقهى|كافيه|مطعم|منيو|ضيافة|عقارات|ايجار/i.test(lower)) {
    return "Tutorials";
  }
  if (/marketing|seo|campaign|growth|analytics|traffic|تسويق|سيو|حملات/i.test(lower)) {
    return "Marketing";
  }
  if (/business|enterprise|retail|sales|shop|store|commercial|تجارة|أعمال|مبيعات|شركات/i.test(lower)) {
    return "Business";
  }
  if (/how to|guide|step by step|tutorial|create|setup|tips|كيف|دليل|شرح|طريقة|خطوات|نصائح/i.test(lower)) {
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
 * Helper to check if a short isolated line looks like a natural Title Case or Section Heading
 */
function isNaturalHeadingCandidate(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.length < 5 || trimmed.length > 85) return false;
  
  // Must NOT end with standard sentence punctuation
  if (/[.,;:!؟?]$/.test(trimmed)) return false;
  
  // Must NOT be a list item or table
  if (/^[-*+•\d+\.]\s/.test(trimmed) || trimmed.includes("|") || trimmed.startsWith(">")) return false;

  const words = trimmed.split(/\s+/);
  if (words.length < 2 || words.length > 13) return false;

  // Check English Title Case (most words capitalized)
  const capitalizedWords = words.filter((w) => /^[A-Z][a-z0-9]*$/.test(w));
  if (capitalizedWords.length >= Math.ceil(words.length * 0.6)) {
    return true;
  }

  // Common heading prefix indicators (English & Arabic)
  if (/^(start with|why|how to|what is|best|the top|step \d+|guide to|tips for|ways to|key benefits|summary|conclusion|كيفية|طريقة|خطوات|أفضل|لماذا|دليل|نصائح|أهمية|مميزات)/i.test(trimmed)) {
    return true;
  }

  return false;
}

/**
 * Intelligent Smart Parser for raw article text
 * Handles Title, SEO Title, Meta Description, Primary Keyword, URL Slug, Category, Secondary Keywords,
 * and parses body content distinguishing Headings (H2/H3), Tables, Lists, Callouts, and Paragraphs.
 */
export function parseRawArticleContent(rawInput: string): ParsedArticleDraft {
  if (!rawInput || !rawInput.trim()) {
    return {
      title: "",
      slug: "",
      focusKeyword: "",
      metaDescription: "",
      category: "Tutorials",
      summary: "",
      keywords: [],
      estimatedReadTime: "1 min read",
      paragraphs: [],
      rawBodyText: "",
      detectedStats: {
        headingsCount: 0,
        tablesCount: 0,
        paragraphsCount: 0,
        wordsCount: 0,
        keywordsCount: 0,
      },
    };
  }

  const normalized = rawInput.replace(/\r\n/g, "\n");
  const allLines = normalized.split("\n");

  let extractedTitle = "";
  let extractedSeoTitle = "";
  let extractedSlug = "";
  let extractedFocusKeyword = "";
  let extractedMetaDescription = "";
  let extractedCategory = "";
  let extractedSummary = "";
  const rawKeywordsList: string[] = [];

  const bodyLineCandidates: { lineIndex: number; text: string }[] = [];
  let foundFirstNonMetadataLine = false;
  let firstLineAsTitleIndex = -1;

  // Pass 1: Parse and classify lines into Metadata or Body
  for (let i = 0; i < allLines.length; i++) {
    const rawLine = allLines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      if (foundFirstNonMetadataLine) {
        bodyLineCandidates.push({ lineIndex: i, text: "" });
      }
      continue;
    }

    // Check metadata patterns
    const seoTitleMatch = trimmed.match(/^(?:seo\s+title|seo\s+heading|عنوان\s+سيو|عنوان\s+السيو|seo\s+h1)\s*[:：\-–]\s*(.+)$/i);
    const articleTitleMatch = trimmed.match(/^(?:article\s+title|title|h1\s+title|h1|عنوان\s+المقال|العنوان\s+الرئيسي|العنوان)\s*[:：\-–]\s*(.+)$/i);
    const h1MarkdownMatch = trimmed.match(/^#\s+(.+)$/);
    const descMatch = trimmed.match(/^(?:meta\s+description|meta\s+desc|seo\s+description|description|وصف\s+الميتا|الوصف\s+التعريفي|الوصف\s+المختصر|وصف\s+سيو|الوصف)\s*[:：\-–]\s*(.+)$/i);
    const focusKwMatch = trimmed.match(/^(?:primary\s+keywords?|focus\s+keywords?|main\s+keywords?|target\s+keywords?|core\s+keywords?|الكلمة\s+المفتاحية\s+الرئيسية|الكلمة\s+الرئيسية|الكلمة\s+الدلالية\s+الرئيسية|الكلمة\s+المفتاحية\s+المستهدفة|الكلمة\s+المفتاحية)\s*[:：\-–]\s*(.+)$/i);
    const slugMatch = trimmed.match(/^(?:url\s+slug|slug|permalink|url|رابط\s+المقال|الرابط\s+اللطيف|الرابط|الاسم\s+اللطيف)\s*[:：\-–]\s*(.+)$/i);
    const kwMatch = trimmed.match(/^(?:secondary\s+keywords?|related\s+keywords?|secondary\s+kw|additional\s+keywords?|keywords\s+tags?|keywords?|tags?|الكلمات\s+المفتاحية\s+الثانوية|الكلمات\s+الثانوية|الكلمات\s+الدلالية|الكلمات\s+المفتاحية|الوسوم)\s*[:：\-–]\s*(.+)$/i);
    const catMatch = trimmed.match(/^(?:category|classification|section|التصنيف|الفئة|القسم)\s*[:：\-–]\s*(.+)$/i);
    const sumMatch = trimmed.match(/^(?:summary|quick\s+summary|overview|الملخص|ملخص\s+المقال|نبذة)\s*[:：\-–]\s*(.+)$/i);

    if (seoTitleMatch) {
      extractedSeoTitle = seoTitleMatch[1].trim();
      continue;
    }
    if (articleTitleMatch) {
      extractedTitle = articleTitleMatch[1].trim();
      continue;
    }
    if (h1MarkdownMatch) {
      extractedTitle = h1MarkdownMatch[1].trim();
      continue;
    }
    if (descMatch) {
      extractedMetaDescription = descMatch[1].trim();
      continue;
    }
    if (focusKwMatch) {
      extractedFocusKeyword = focusKwMatch[1].trim();
      continue;
    }
    if (slugMatch) {
      extractedSlug = sanitizeSlug(slugMatch[1].trim());
      continue;
    }
    if (kwMatch) {
      rawKeywordsList.push(kwMatch[1].trim());
      continue;
    }
    if (catMatch) {
      extractedCategory = catMatch[1].trim();
      continue;
    }
    if (sumMatch) {
      extractedSummary = sumMatch[1].trim();
      continue;
    }

    // If no title yet, check if this first non-empty line looks like an H1 / Article Title
    if (!extractedTitle && firstLineAsTitleIndex === -1 && !trimmed.startsWith("##") && !trimmed.startsWith("###") && !trimmed.startsWith("|") && !trimmed.startsWith(">") && trimmed.length < 160) {
      extractedTitle = trimmed;
      firstLineAsTitleIndex = i;
      foundFirstNonMetadataLine = true;
      continue;
    }

    foundFirstNonMetadataLine = true;
    bodyLineCandidates.push({ lineIndex: i, text: rawLine });
  }

  // Finalize Title (prefer SEO title if explicitly provided, else extracted title)
  const finalTitle = extractedSeoTitle || extractedTitle || "New Article Title";

  // Parse keywords from rawKeywordsList
  const parsedKeywords: string[] = [];
  const seenKw = new Set<string>();

  if (extractedFocusKeyword) {
    seenKw.add(extractedFocusKeyword.toLowerCase().trim());
    parsedKeywords.push(extractedFocusKeyword.trim());
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

  // Finalize Slug
  const finalSlug = extractedSlug || sanitizeSlug(finalTitle) || "qr-article-guide";

  // Finalize Meta Description and Summary
  const finalMetaDescription = extractedMetaDescription || extractedSummary || "";
  const finalSummary = extractedSummary || extractedMetaDescription || "";

  // Pass 2: Parse Body lines into structured blocks (Headings, Tables, Callouts, Paragraphs)
  const rawBodyLines = bodyLineCandidates.map((c) => c.text);
  const structuredParagraphs: string[] = [];
  let headingsCount = 0;
  let tablesCount = 0;

  let currentTableLines: string[] = [];
  let currentNormalLines: string[] = [];

  const flushNormalLines = () => {
    if (currentNormalLines.length > 0) {
      const blockText = currentNormalLines.join("\n").trim();
      if (blockText) {
        structuredParagraphs.push(blockText);
      }
      currentNormalLines = [];
    }
  };

  const flushTable = () => {
    if (currentTableLines.length > 0) {
      const tableText = currentTableLines.join("\n").trim();
      if (tableText) {
        tablesCount++;
        structuredParagraphs.push(tableText);
      }
      currentTableLines = [];
    }
  };

  // Strip duplicate title if repeated at top of body
  let bodyStartIndex = 0;
  while (bodyStartIndex < rawBodyLines.length) {
    const lineTrim = rawBodyLines[bodyStartIndex].trim();
    if (!lineTrim) {
      bodyStartIndex++;
      continue;
    }
    const lowerTrim = lineTrim.toLowerCase().replace(/^#+\s*/, "");
    if (
      lowerTrim === extractedTitle.toLowerCase() ||
      lowerTrim === extractedSeoTitle.toLowerCase() ||
      lowerTrim === finalTitle.toLowerCase()
    ) {
      bodyStartIndex++;
    } else {
      break;
    }
  }

  for (let i = bodyStartIndex; i < rawBodyLines.length; i++) {
    const rawLine = rawBodyLines[i];
    const trimmed = rawLine.trim();

    // Check if line is part of a markdown table (starts or contains pipe |)
    const isTableLine = trimmed.startsWith("|") || (trimmed.includes("|") && trimmed.split("|").length >= 3);

    if (isTableLine) {
      flushNormalLines();
      currentTableLines.push(trimmed);
      continue;
    } else if (currentTableLines.length > 0) {
      flushTable();
    }

    if (!trimmed) {
      flushNormalLines();
      continue;
    }

    // Check for H2 heading
    const isH2 = trimmed.startsWith("## ") || /^h2\s*[:：\-–]\s*/i.test(trimmed);
    if (isH2) {
      flushNormalLines();
      headingsCount++;
      const cleanH2 = trimmed.replace(/^##\s*/, "").replace(/^h2\s*[:：\-–]\s*/i, "").trim();
      structuredParagraphs.push(`H2: ${cleanH2}`);
      continue;
    }

    // Check for H3 heading
    const isH3 = trimmed.startsWith("### ") || /^h3\s*[:：\-–]\s*/i.test(trimmed);
    if (isH3) {
      flushNormalLines();
      headingsCount++;
      const cleanH3 = trimmed.replace(/^###\s*/, "").replace(/^h3\s*[:：\-–]\s*/i, "").trim();
      structuredParagraphs.push(`H3: ${cleanH3}`);
      continue;
    }

    // Check for standalone callout (> or 💡 or 📌)
    const isCallout = trimmed.startsWith("> ") || trimmed.startsWith("💡") || trimmed.startsWith("📌");
    if (isCallout) {
      flushNormalLines();
      structuredParagraphs.push(trimmed);
      continue;
    }

    // Check for natural Title Case section heading (isolated line)
    const prevLineEmpty = i === bodyStartIndex || !rawBodyLines[i - 1].trim();
    const nextLineEmpty = i === rawBodyLines.length - 1 || !rawBodyLines[i + 1].trim();

    if (prevLineEmpty && nextLineEmpty && isNaturalHeadingCandidate(trimmed)) {
      flushNormalLines();
      headingsCount++;
      structuredParagraphs.push(`H2: ${trimmed}`);
      continue;
    }

    // Normal paragraph text line
    currentNormalLines.push(rawLine);
  }

  flushNormalLines();
  flushTable();

  // If no summary was specified, extract from the first paragraph
  const derivedSummary =
    finalSummary ||
    structuredParagraphs.find((p) => !p.startsWith("H2: ") && !p.startsWith("H3: ") && !p.includes("|") && p.length > 20)?.slice(0, 220) ||
    "";

  // Auto detect category
  const detectedCategory = detectCategory(
    `${finalTitle} ${extractedFocusKeyword} ${parsedKeywords.join(" ")} ${structuredParagraphs.slice(0, 3).join(" ")}`,
    extractedCategory
  );

  // Compute stats
  const fullBodyRawText = structuredParagraphs.join("\n\n");
  const totalWords = fullBodyRawText ? fullBodyRawText.split(/\s+/).filter(Boolean).length : 0;
  const minutes = Math.max(1, Math.ceil(totalWords / 180));
  const estimatedReadTime = `${minutes} min read`;

  return {
    title: finalTitle,
    slug: finalSlug,
    focusKeyword: extractedFocusKeyword || parsedKeywords[0] || "",
    metaDescription: finalMetaDescription || derivedSummary,
    category: detectedCategory,
    summary: derivedSummary,
    keywords: parsedKeywords,
    estimatedReadTime,
    paragraphs: structuredParagraphs.length > 0 ? structuredParagraphs : ["ابدأ بكتابة محتوى المقال هنا..."],
    rawBodyText: fullBodyRawText,
    detectedStats: {
      headingsCount,
      tablesCount,
      paragraphsCount: structuredParagraphs.length,
      wordsCount: totalWords,
      keywordsCount: parsedKeywords.length,
    },
  };
}
