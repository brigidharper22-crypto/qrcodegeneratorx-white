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
    h2Count: number;
    h3Count: number;
    listsCount: number;
    tablesCount: number;
    calloutsCount: number;
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

  if (/real estate|property|realtor|house|listing|عقار|عقارات|شقق|منازل/i.test(lower)) {
    return "Marketing";
  }
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
  return "Marketing";
}

/**
 * Helper to check if a line is a bullet item or numbered item
 */
export function isListItemLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  // All standard and unicode bullet symbols: *, -, +, •, ●, ○, ■, □, ▪, ▫, ◆, ◇, ◈, ✓, ✔, ✕, ✖, ★, ☆, ➢, ➤, ➔, ➜, –, —
  if (/^[\*\-\+•●○■□▪▫◆◇◈✓✔✕✖★☆➢➤➔➜–—]\s*/.test(trimmed)) return true;
  // Numbered list in English or Arabic-Indic digits: 1. 2. 1) 2) (1) [1] 1- ١. ٢.
  if (/^(?:\d+|[\u0660-\u0669]+)[\.\)\-]\s*/.test(trimmed) || /^(?:\(\d+\)|\[\d+\])\s*/.test(trimmed)) return true;
  return false;
}

/**
 * Helper to clean a list item prefix for unified formatting
 */
export function cleanListItemLine(line: string): string {
  const trimmed = line.trim();
  if (/^[\*\-\+•●○■□▪▫◆◇◈✓✔✕✖★☆➢➤➔➜–—]\s*/.test(trimmed)) {
    return `* ${trimmed.replace(/^[\*\-\+•●○■□▪▫◆◇◈✓✔✕✖★☆➢➤➔➜–—]\s*/, "")}`;
  }
  const numMatch = trimmed.match(/^((?:\d+|[\u0660-\u0669]+)[\.\)\-]|\(\d+\)|\[\d+\])\s*(.+)$/);
  if (numMatch) {
    const rawNum = numMatch[1].replace(/[\(\)\[\]]/g, "");
    return `${rawNum} ${numMatch[2]}`;
  }
  return `* ${trimmed}`;
}

/**
 * Helper to check if a standalone line is likely a main section Heading (H2)
 */
export function isLikelyH2Heading(trimmedLine: string, nextLineIsBlankOrText: boolean = true): boolean {
  if (!trimmedLine) return false;
  if (trimmedLine.length > 120) return false;

  // Explicit H2 marks
  if (/^(?:##\s+|h2\s*[:：\-–]\s*|\[h2\]\s*)/i.test(trimmedLine)) return true;

  // Markdown bold wrapping the entire heading: **Title**
  const boldMatch = trimmedLine.match(/^\*\*([^*]+)\*\*$/);
  if (boldMatch) {
    const inner = boldMatch[1].trim();
    if (inner.length > 2 && inner.length < 90 && !/[.،;؛]$/.test(inner)) {
      return true;
    }
  }

  // Section numbering e.g. "1. Why QR Codes Matter", "Step 1: Create Account", "Part 2: Design"
  if (/^(?:step\s+\d+|part\s+\d+|phase\s+\d+|section\s+\d+|الخطوة\s+\d+|الجزء\s+\d+|المرحلة\s+\d+|الفصل\s+\d+)\s*[:：\-–]\s*.+/i.test(trimmedLine)) {
    return true;
  }

  // Common heading words (Arabic & English)
  if (/^(?:don't|start with|why\b|how to\b|frequently asked|faq\b|best practices|when to|tips for|advantages of|summary|conclusion|final thoughts|key takeaways|الأسئلة الشائعة|أسئلة شائعة|خاتمة|الخاتمة|خلاصة|الخلاصة|نصائح|مميزات|فوائد|كيفية|خطوات|أفضل الممارسات|دليل)/i.test(trimmedLine)) {
    if (!/[.،;؛]$/.test(trimmedLine)) {
      return true;
    }
  }

  // Standalone Title-Cased Line without terminal period/comma (e.g. "Start With the Property Listing", "Why Dynamic QR Codes Win")
  const words = trimmedLine.split(/\s+/);
  if (words.length >= 2 && words.length <= 12 && !/[.,;،؛!؟?]$/.test(trimmedLine)) {
    // English title case check (most words capitalized)
    const capitalizedWords = words.filter((w) => /^[A-Z]/.test(w));
    if (capitalizedWords.length >= Math.ceil(words.length * 0.55)) {
      return true;
    }
    // Arabic standalone short phrase without terminal punctuation
    if (/^[\u0621-\u064A\s0-9]+$/.test(trimmedLine) && words.length <= 8) {
      return true;
    }
  }

  return false;
}

/**
 * Helper to check if a standalone line is likely a Subheading / Question (H3)
 */
export function isLikelyH3Heading(trimmedLine: string): boolean {
  if (!trimmedLine) return false;
  if (trimmedLine.length > 130) return false;

  // Explicit H3 marks
  if (/^(?:###\s+|h3\s*[:：\-–]\s*|\[h3\]\s*)/i.test(trimmedLine)) return true;

  // Q&A / FAQ patterns
  if (/^(?:q\s*[:：\-–]|question\s*[:：\-–]|سؤال\s*[:：\-–]|س\s*[:：\-–]|faq\s*[:：\-–])/i.test(trimmedLine)) {
    return true;
  }

  // Questions ending in ? or ؟
  if (/[?؟]$/.test(trimmedLine)) {
    // Check if it's a question heading
    if (/^(?:what|how|why|when|where|who|can|is|are|do|does|will|should|هل|كيف|ما|ماذا|لماذا|أين|متى|من|كم)\b/i.test(trimmedLine)) {
      return true;
    }
  }

  return false;
}

/**
 * Intelligent Smart Parser for raw article text
 * Handles Title, SEO Title, Meta Description, Primary Keyword, URL Slug, Category, Secondary Keywords,
 * and automatically recognizes text formatting and structures (H2, H3, Lists, Tables, Callouts, Bold, etc.)
 */
export function parseRawArticleContent(
  rawInput: string,
  options?: {
    currentTitle?: string;
    currentSlug?: string;
    currentCategory?: string;
    preserveFirstLineInBody?: boolean;
  }
): ParsedArticleDraft {
  if (!rawInput || !rawInput.trim()) {
    return {
      title: options?.currentTitle || "",
      slug: options?.currentSlug || "",
      focusKeyword: "",
      metaDescription: "",
      category: options?.currentCategory || "Marketing",
      summary: "",
      keywords: [],
      estimatedReadTime: "1 min read",
      paragraphs: [""],
      rawBodyText: "",
      detectedStats: {
        headingsCount: 0,
        h2Count: 0,
        h3Count: 0,
        listsCount: 0,
        tablesCount: 0,
        calloutsCount: 0,
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
    const seoTitleMatch = trimmed.match(/^(?:seo\s+title|عنوان\s+سيو|seo\s+عنوان)\s*[:：\-–]\s*(.+)$/i);
    const articleTitleMatch = trimmed.match(/^(?:article\s+title|title|h1|عنوان\s+المقال|العنوان)\s*[:：\-–]\s*(.+)$/i);
    const h1MarkdownMatch = trimmed.match(/^#\s+(.+)$/);
    const descMatch = trimmed.match(/^(?:meta\s+description|description|seo\s+description|meta\s+field|الوصف\s+المختصر|الوصف|وصف\s+سيو|ميتا\s+دسكربشن)\s*[:：\-–]\s*(.+)$/i);
    const focusKwMatch = trimmed.match(/^(?:primary\s+keywords?|primary\s+keyword|focus\s+keywords?|focus\s+keyword|main\s+keywords?|target\s+keywords?|الكلمة\s+المفتاحية\s+الرئيسية|الكلمة\s+الدلالية\s+الرئيسية|الكلمات\s+الرئيسية|الكلمة\s+الرئيسية|الكلمة\s+المفتاحية)\s*[:：\-–]\s*(.+)$/i);
    const slugMatch = trimmed.match(/^(?:url\s+slug|slug|permalink|url|رابط\s+المقال|الرابط|الاسم\s+اللطيف)\s*[:：\-–]\s*(.+)$/i);
    const kwMatch = trimmed.match(/^(?:secondary\s+keywords?|secondary\s+keyword|keywords\s+tags|keywords|seo\s+keywords?|tags|الكلمات\s+الدلالية|الكلمات\s+المفتاحية|الكلمات\s+الفرعية|الوسوم)\s*[:：\-–]\s*(.+)$/i);
    const catMatch = trimmed.match(/^(?:category|classification|التصنيف|القسم)\s*[:：\-–]\s*(.+)$/i);
    const sumMatch = trimmed.match(/^(?:summary|quick\s+summary|الملخص|ملخص\s+المقال)\s*[:：\-–]\s*(.+)$/i);

    if (seoTitleMatch) {
      extractedSeoTitle = seoTitleMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (articleTitleMatch) {
      extractedTitle = articleTitleMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (h1MarkdownMatch) {
      extractedTitle = h1MarkdownMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (descMatch) {
      extractedMetaDescription = descMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (focusKwMatch) {
      extractedFocusKeyword = focusKwMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (slugMatch) {
      extractedSlug = sanitizeSlug(slugMatch[1].trim().replace(/^\*\*|\*\*$/g, ""));
      continue;
    }
    if (kwMatch) {
      rawKeywordsList.push(kwMatch[1].trim().replace(/^\*\*|\*\*$/g, ""));
      continue;
    }
    if (catMatch) {
      extractedCategory = catMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }
    if (sumMatch) {
      extractedSummary = sumMatch[1].trim().replace(/^\*\*|\*\*$/g, "");
      continue;
    }

    // Always preserve all remaining lines in the body
    foundFirstNonMetadataLine = true;
    bodyLineCandidates.push({ lineIndex: i, text: rawLine });
  }

  // Finalize Title (prefer explicit extracted title or provided current title)
  const finalTitle =
    extractedTitle ||
    extractedSeoTitle ||
    (options?.currentTitle && options.currentTitle !== "عنوان المقال الجديد" ? options.currentTitle : "") ||
    "New Article Title";

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
      .map((k) => k.trim().replace(/^["'“”‘’*]+|["'“”‘’*]+$/g, ""))
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

  // Pass 2: Parse Body lines into structured blocks (Headings, Tables, Lists, Callouts, Paragraphs)
  const rawBodyLines = bodyLineCandidates.map((c) => c.text);
  const structuredParagraphs: string[] = [];
  let h2Count = 0;
  let h3Count = 0;
  let listsCount = 0;
  let tablesCount = 0;
  let calloutsCount = 0;

  let currentTableLines: string[] = [];
  let currentListLines: string[] = [];
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

  const flushList = () => {
    if (currentListLines.length > 0) {
      const listText = currentListLines.join("\n").trim();
      if (listText) {
        listsCount++;
        structuredParagraphs.push(listText);
      }
      currentListLines = [];
    }
  };

  for (let i = 0; i < rawBodyLines.length; i++) {
    const rawLine = rawBodyLines[i];
    const trimmed = rawLine.trim();

    // 1. Table Detection
    const isTableLine = trimmed.startsWith("|") || (trimmed.includes("|") && trimmed.split("|").length >= 3);
    if (isTableLine) {
      flushNormalLines();
      flushList();
      currentTableLines.push(trimmed);
      continue;
    } else if (currentTableLines.length > 0) {
      flushTable();
    }

    // 2. List Item Detection (Bullet or Numbered)
    const isListLine = isListItemLine(trimmed);
    if (isListLine) {
      flushNormalLines();
      flushTable();
      currentListLines.push(cleanListItemLine(trimmed));
      continue;
    } else if (currentListLines.length > 0) {
      flushList();
    }

    if (!trimmed) {
      flushNormalLines();
      continue;
    }

    // 3. Callout Detection (> or 💡 or 📌 or ⚠️ or ملاحظة:)
    const isCallout =
      trimmed.startsWith("> ") ||
      trimmed.startsWith("💡") ||
      trimmed.startsWith("📌") ||
      trimmed.startsWith("⚠️") ||
      trimmed.startsWith("ℹ️") ||
      /^(?:note|tip|warning|important|ملاحظة|تنبيه|نصيحة|هام)\s*[:：\-–]/i.test(trimmed);

    if (isCallout) {
      flushNormalLines();
      calloutsCount++;
      const cleanCallout = trimmed.startsWith(">") ? trimmed : `> ${trimmed}`;
      structuredParagraphs.push(cleanCallout);
      continue;
    }

    // 4. Code Block Detection (```)
    if (trimmed.startsWith("```")) {
      flushNormalLines();
      let codeLines = [trimmed];
      let j = i + 1;
      while (j < rawBodyLines.length) {
        codeLines.push(rawBodyLines[j]);
        if (rawBodyLines[j].trim().endsWith("```")) {
          i = j;
          break;
        }
        j++;
      }
      structuredParagraphs.push(codeLines.join("\n"));
      continue;
    }

    // 5. Explicit or Smart H3 Heading Detection
    if (isLikelyH3Heading(trimmed)) {
      flushNormalLines();
      h3Count++;
      const cleanH3 = trimmed
        .replace(/^###\s*/, "")
        .replace(/^h3\s*[:：\-–]\s*/i, "")
        .replace(/^\[h3\]\s*/i, "")
        .replace(/^\*\*|\*\*$/g, "")
        .trim();
      structuredParagraphs.push(`H3: ${cleanH3}`);
      continue;
    }

    // 6. Explicit or Smart H2 Heading Detection
    const nextLine = i + 1 < rawBodyLines.length ? rawBodyLines[i + 1].trim() : "";
    if (isLikelyH2Heading(trimmed, !nextLine || nextLine.length > 0)) {
      flushNormalLines();
      h2Count++;
      const cleanH2 = trimmed
        .replace(/^##\s*/, "")
        .replace(/^h2\s*[:：\-–]\s*/i, "")
        .replace(/^\[h2\]\s*/i, "")
        .replace(/^\*\*|\*\*$/g, "")
        .trim();
      structuredParagraphs.push(`H2: ${cleanH2}`);
      continue;
    }

    // 7. Normal paragraph line
    currentNormalLines.push(rawLine);
  }

  flushNormalLines();
  flushTable();
  flushList();

  // If no summary was specified, extract from the first paragraph
  const derivedSummary =
    finalSummary ||
    structuredParagraphs
      .find((p) => !p.startsWith("H2: ") && !p.startsWith("H3: ") && !p.startsWith(">") && !p.includes("|") && !p.startsWith("*") && p.length > 20)
      ?.slice(0, 240) ||
    "";

  // If no keywords were explicitly detected, extract natural smart keywords from title and headings
  if (parsedKeywords.length === 0 && finalTitle) {
    const words = finalTitle
      .replace(/[^\w\s\u0621-\u064A]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2);
    const stopWords = new Set([
      "the", "and", "for", "with", "how", "what", "why", "this", "that", "from", "your",
      "في", "من", "إلى", "على", "عن", "مع", "هذا", "هذه", "التي", "الذي", "كيف", "ماذا", "لماذا", "شرح", "دليل"
    ]);
    const cleanWords = words.filter((w) => !stopWords.has(w.toLowerCase()));
    cleanWords.slice(0, 6).forEach((w) => {
      if (!parsedKeywords.includes(w)) {
        parsedKeywords.push(w);
      }
    });
  }

  // Auto detect category
  const detectedCategory = detectCategory(
    `${finalTitle} ${extractedFocusKeyword} ${parsedKeywords.join(" ")} ${structuredParagraphs.slice(0, 4).join(" ")}`,
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
    focusKeyword: extractedFocusKeyword || parsedKeywords[0] || finalTitle.split(" ").slice(0, 3).join(" "),
    metaDescription: finalMetaDescription || derivedSummary,
    category: detectedCategory,
    summary: derivedSummary,
    keywords: parsedKeywords,
    estimatedReadTime,
    paragraphs: structuredParagraphs.length > 0 ? structuredParagraphs : ["ابدأ بكتابة محتوى المقال هنا..."],
    rawBodyText: fullBodyRawText,
    detectedStats: {
      headingsCount: h2Count + h3Count,
      h2Count,
      h3Count,
      listsCount,
      tablesCount,
      calloutsCount,
      paragraphsCount: structuredParagraphs.length,
      wordsCount: totalWords,
      keywordsCount: parsedKeywords.length,
    },
  };
}

/**
 * Helper to safely read a text file (.txt, .md, .doc, etc.) from the user's computer
 */
export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      resolve(content || "");
    };
    reader.onerror = () => {
      reject(new Error("فشل قراءة الملف النصي"));
    };
    reader.readAsText(file, "UTF-8");
  });
}

