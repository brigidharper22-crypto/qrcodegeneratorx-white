import React, { useState, useEffect } from "react";
import { useI18n } from "../../hooks/useI18n";
import { BlogPost, BLOG_POSTS } from "../../data/blogData";
import { getBlogPostsForLocale } from "../../data/blogTranslations";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  Award,
  BookOpen,
  Twitter,
  Linkedin,
  MessageCircle,
  Link2,
  CheckCircle,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { AdSlot, AD_PLACEMENTS } from "../ads/MediavineAd";
import { AdSenseAd } from "../ads/AdSenseAd";

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  key?: string;
}

const RE_BLOG_TRANSLATIONS: Record<string, {
  readFullArticle: string;
  backToBlogList: string;
  tryDirectGenerator: string;
  shareArticle: string;
  copied: string;
  copyLink: string;
  tableOfContents: string;
  readyToCreateTitle: string;
  readyToCreateDesc: string;
  launchFreeGenerator: string;
  targetKeywords: string;
  keepReadingGuides: string;
  readGuide: string;
}> = {
  ar: {
    readFullArticle: "اقرأ المقال كاملاً",
    backToBlogList: "العودة إلى قائمة المدونة",
    tryDirectGenerator: "جرب أداة المصمم مباشرة",
    shareArticle: "مشاركة المقال:",
    copied: "تم النسخ!",
    copyLink: "نسخ الرابط",
    tableOfContents: "جدول المحتويات والرموز",
    readyToCreateTitle: "جاهز لإنشاء كود الـ QR الخاص بك؟",
    readyToCreateDesc: "استمتع بأقوى موّلد كروت كود QR ثابت وآمن ومجاني ومفتوح بالكامل في الويب. صدر ملفات متجهة على الفور بنقاء فائق.",
    launchFreeGenerator: "أطلق المولد المجاني",
    targetKeywords: "الكلمات المفتاحية المستهدفة:",
    keepReadingGuides: "تابع القراءة: أدلة وتوجيهات ذات صلة",
    readGuide: "اقرأ الدليل",
  },
  en: {
    readFullArticle: "Read Full Article",
    backToBlogList: "Back to Blog list",
    tryDirectGenerator: "Try Direct Generator Tool",
    shareArticle: "Share Article:",
    copied: "Copied!",
    copyLink: "Copy Link",
    tableOfContents: "Table of Contents",
    readyToCreateTitle: "Ready to Create Your Custom QR Code?",
    readyToCreateDesc: "Experience the web's most powerful, completely free, and secure client-side static generator. Craft vector assets instantly.",
    launchFreeGenerator: "Launch Free Generator",
    targetKeywords: "Target Keywords:",
    keepReadingGuides: "Keep Reading: Related Guides",
    readGuide: "Read Guide",
  },
  fr: {
    readFullArticle: "Lire l'article complet",
    backToBlogList: "Retour à l'index",
    tryDirectGenerator: "Lancer le générateur",
    shareArticle: "Partager l'article :",
    copied: "Copié !",
    copyLink: "Copier le lien",
    tableOfContents: "Table des matières",
    readyToCreateTitle: "Prêt à créer votre code QR ?",
    readyToCreateDesc: "Découvrez notre moteur sur-mesure pour exporter gratuitement vos formats d'images.",
    launchFreeGenerator: "Lancer le générateur",
    targetKeywords: "Mots-clés cibles :",
    keepReadingGuides: "Poursuivre la lecture : Guides connexes",
    readGuide: "Lire le Guide",
  },
  es: {
    readFullArticle: "Leer artículo completo",
    backToBlogList: "Volver a la lista",
    tryDirectGenerator: "Ir al generador directo",
    shareArticle: "Compartir artículo:",
    copied: "Copia exitosa",
    copyLink: "Copiar enlace",
    tableOfContents: "Índice de temas",
    readyToCreateTitle: "¿Pronto para crear su código QR?",
    readyToCreateDesc: "Disfrute de la plataforma estática nativa libre de anuncios intrusivos y totalmente portable.",
    launchFreeGenerator: "Abrir generador gratis",
    targetKeywords: "Tópicos de búsqueda:",
    keepReadingGuides: "Continúe leyendo sobre el tema:",
    readGuide: "Ver Guía técnica",
  },
  de: {
    readFullArticle: "Vollständigen Artikel lesen",
    backToBlogList: "Zurück zum Blog",
    tryDirectGenerator: "Direkt zum Generator",
    shareArticle: "Artikel teilen:",
    copied: "Kopiert!",
    copyLink: "Link kopieren",
    tableOfContents: "Inhaltsverzeichnis",
    readyToCreateTitle: "Bereit für Ihren QR-Code?",
    readyToCreateDesc: "Verwenden Sie unsere clientseitige Software für sofort hunderte fehlerfreie Scans gratis.",
    launchFreeGenerator: "Generator starten",
    targetKeywords: "Relevante Suchbegriffe:",
    keepReadingGuides: "Weitere interessante Artikel:",
    readGuide: "Artikel lesen",
  },
  zh: {
    readFullArticle: "阅读文章全文",
    backToBlogList: "返回文章列表",
    tryDirectGenerator: "极速体验生成器工具",
    shareArticle: "一键分享本文 :",
    copied: "已复制成功 !",
    copyLink: "复制本文链接",
    tableOfContents: "目录指南",
    readyToCreateTitle: "准备好生成品牌二维码了吗 ?",
    readyToCreateDesc: "体验全网最好用的纯本端点对点高级编码服务，带去无损矢量打包支持。",
    launchFreeGenerator: "点击打开免费工具",
    targetKeywords: "靶向检索词汇 :",
    keepReadingGuides: "猜您喜欢 : 行业相关见解",
    readGuide: "阅读攻略",
  },
  pt: {
    readFullArticle: "Ler Matéria Completa",
    backToBlogList: "Voltar para Lista",
    tryDirectGenerator: "Rodar Painel Direto",
    shareArticle: "Compartilhar Post:",
    copied: "Copiado!",
    copyLink: "Copiar link curto",
    tableOfContents: "Sumário do Guia",
    readyToCreateTitle: "Deseja projetar seu código QR?",
    readyToCreateDesc: "Obtenha cópias definitivas renderizadas localmente e prontas para colocar na sacola comercial.",
    launchFreeGenerator: "Iniciar gerador grátis",
    targetKeywords: "Tags de busca:",
    keepReadingGuides: "Aprenda mais com outros artigos:",
    readGuide: "Acessar Guia",
  },
  ja: {
    readFullArticle: "全編を読む",
    backToBlogList: "ブログ一覧に戻る",
    tryDirectGenerator: "無料作成ボードを試す",
    shareArticle: "記事をシェアする：",
    copied: "コピーしました！",
    copyLink: "リンクをコピー",
    tableOfContents: "目次",
    readyToCreateTitle: "オリジナルQRコードを作成しませんか？",
    readyToCreateDesc: "ブラウザ専用の安心・安全な高画質コーディングをお試しください。面倒な設定や支払はなし。",
    launchFreeGenerator: "作成器を起動する",
    targetKeywords: "技術キーワードの一覧：",
    keepReadingGuides: "こちらの関連記事もおすすめです：",
    readGuide: "コラムを読む",
  }
};

export function BlogCard({ post, onClick }: BlogCardProps) {
  const { locale } = useI18n();
  const bLabels = RE_BLOG_TRANSLATIONS[locale] || RE_BLOG_TRANSLATIONS.en;

  return (
    <article
      className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:border-blue-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
      id={`blog-card-${post.id}`}
    >
      <div className="space-y-4">
        {/* Category & info */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
          <button onClick={onClick} className="text-left font-semibold cursor-pointer focus:outline-none">
            {post.title}
          </button>
        </h3>

        {/* Summary text */}
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {post.summary}
        </p>
      </div>

      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{post.date}</span>
        </div>
        <button
          onClick={onClick}
          className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors cursor-pointer focus:outline-none"
        >
          <span>{bLabels.readFullArticle}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}

interface BlogPostDetailProps {
  post: BlogPost;
  onBack: () => void;
  onNavigate: (pageId: string) => void;
}

export function BlogPostDetail({ post, onBack, onNavigate }: BlogPostDetailProps) {
  const { locale, isRTL } = useI18n();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const bLabels = RE_BLOG_TRANSLATIONS[locale] || RE_BLOG_TRANSLATIONS.en;

  // 1. Reading Progress Bar Monitor
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((scrollY / docHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shareUrl = window.location.href;

  // 2. Social Sharers
  const handleShareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
      "_blank",
      "referrer"
    );
  };

  const handleShareLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      "_blank",
      "referrer"
    );
  };

  const handleShareWhatsapp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + " " + shareUrl)}`,
      "_blank",
      "referrer"
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setShowCopyFeedback(true);
    setTimeout(() => setShowCopyFeedback(false), 2500);
  };

  // 3. Extract related items (exclude the current item) - Maximize to 3 cards as requested
  const relatedArticles = getBlogPostsForLocale(locale).filter((p) => p.id !== post.id).slice(0, 3);

  // Extract headings for the Table of Contents dynamically
  const headings = post.content
    .map((p, index) => {
      if (p.startsWith("H2: ") || p.startsWith("## ")) {
        return {
          title: p.replace(/^(?:H2:\s*|##\s*)/, ""),
          id: `section-${index}`,
        };
      }
      return null;
    })
    .filter(Boolean) as Array<{ title: string; id: string }>;

  // Helper to render markdown inline elements (links, bold, italic, code)
  const renderRichTextContent = (text: string, onLinkClick: (pageId: string) => void) => {
    if (!text) return null;

    // Pattern to match links [text](url), bold **text** or __text__, italic *text*, inline code `code`
    const tokenRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|__([^_]+)__|`([^`]+)`|\*([^*]+)\*)/g;
    const elements: React.ReactNode[] = [];
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(text)) !== null) {
      const [fullToken, , linkText, linkTarget, boldText1, boldText2, codeText, italicText] = match;
      const startPos = match.index;

      if (startPos > lastIdx) {
        elements.push(text.substring(lastIdx, startPos));
      }

      const keyId = `inline-${startPos}-${elements.length}`;

      if (linkText !== undefined && linkTarget !== undefined) {
        // Render Link
        if (linkTarget === "home" || linkTarget === "") {
          elements.push(
            <button
              key={keyId}
              onClick={() => {
                onLinkClick("home");
                const targetEl = document.getElementById("qr-tool-section");
                if (targetEl) {
                  targetEl.scrollIntoView({ behavior: "smooth" });
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 underline-offset-2 font-bold inline cursor-pointer focus:outline-none transition-colors"
            >
              {linkText}
            </button>
          );
        } else {
          elements.push(
            <button
              key={keyId}
              onClick={() => {
                onLinkClick(`blog/${linkTarget}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 underline-offset-2 font-bold inline cursor-pointer focus:outline-none transition-colors"
            >
              {linkText}
            </button>
          );
        }
      } else if (boldText1 !== undefined || boldText2 !== undefined) {
        const bText = boldText1 || boldText2;
        elements.push(
          <strong key={keyId} className="font-extrabold text-slate-900">
            {bText}
          </strong>
        );
      } else if (codeText !== undefined) {
        elements.push(
          <code key={keyId} className="px-1.5 py-0.5 mx-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-xs text-blue-700 font-semibold">
            {codeText}
          </code>
        );
      } else if (italicText !== undefined) {
        elements.push(
          <em key={keyId} className="italic text-slate-800 font-medium">
            {italicText}
          </em>
        );
      }

      lastIdx = startPos + fullToken.length;
    }

    if (lastIdx < text.length) {
      elements.push(text.substring(lastIdx));
    }

    return elements.length > 0 ? elements : text;
  };

  // Helper to render Markdown tables cleanly
  const renderMarkdownTable = (tableText: string) => {
    const rawLines = tableText.trim().split("\n").map((l) => l.trim()).filter(Boolean);
    if (rawLines.length === 0) return null;

    const rows = rawLines.map((line) => {
      return line
        .replace(/^\||\|$/g, "")
        .split("|")
        .map((c) => c.trim());
    });

    // Check if second row is divider row (contains dashes ---)
    const hasDivider = rows.length > 1 && rows[1].every((c) => /^[-:\s]+$/.test(c));
    const headerRow = hasDivider ? rows[0] : null;
    const bodyRows = hasDivider ? rows.slice(2) : rows;

    return (
      <div className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs bg-white">
        <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
          {headerRow && (
            <thead className="bg-slate-50">
              <tr>
                {headerRow.map((cell, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3.5 text-left font-black text-slate-900 text-xs md:text-sm uppercase tracking-wider border-b border-slate-200"
                  >
                    {renderRichTextContent(cell, onNavigate)}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-slate-100 bg-white">
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60 hover:bg-blue-50/40"}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-xs md:text-sm font-medium text-slate-700">
                    {renderRichTextContent(cell, onNavigate)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Helper to render callouts or tip boxes
  const renderCallout = (text: string) => {
    const cleanText = text.replace(/^>\s*/, "");
    return (
      <div className="my-5 p-4 md:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-slate-800 text-sm md:text-base leading-relaxed flex items-start gap-3 shadow-xs">
        <span className="text-xl shrink-0 mt-0.5">💡</span>
        <div className="flex-1 font-medium">{renderRichTextContent(cleanText, onNavigate)}</div>
      </div>
    );
  };

  // Helper to render List Blocks (Bullet or Numbered)
  const renderListBlock = (paragraph: string) => {
    const rawItems = paragraph.split("\n").filter((l) => l.trim());
    const isNumbered = rawItems.some((l) => /^\s*\d+[\.\)]\s+/.test(l));

    return (
      <div className="my-5 p-5 md:p-6 bg-slate-50/90 border border-slate-200/80 rounded-2xl shadow-xs">
        <ul className="space-y-3">
          {rawItems.map((li, lIdx) => {
            const isItemNumbered = /^\s*(\d+)[\.\)]\s+/.test(li);
            const numMatch = li.match(/^\s*(\d+)[\.\)]\s+(.+)$/);
            const cleanText = isItemNumbered && numMatch ? numMatch[2] : li.replace(/^\s*[\*\-\+•◦▪▫✓✔–—]\s+/, "");

            return (
              <li key={lIdx} className="flex items-start gap-3 text-slate-800 text-sm md:text-base leading-relaxed">
                {isNumbered || isItemNumbered ? (
                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {numMatch ? numMatch[1] : lIdx + 1}
                  </span>
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0 mt-2"></span>
                )}
                <div className="flex-1 font-normal">
                  {renderRichTextContent(cleanText, onNavigate)}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4 relative" dir={isRTL ? "rtl" : "ltr"}>
      {/* Scroll indicator bar fixed at top of viewport */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-100 z-[100] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-blue-650 to-purple-650 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Inter-linking local navigation check */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 group px-4 py-2 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl text-sm font-semibold transition-colors bg-white shadow-sm cursor-pointer"
        >
          <ArrowLeft className={`w-4 h-4 transition-transform ${isRTL ? "rotate-180 group-hover:translate-x-1" : "group-hover:-translate-x-1"}`} />
          <span>{bLabels.backToBlogList}</span>
        </button>

        <button
          onClick={() => {
            onNavigate("home");
            setTimeout(() => {
              document.getElementById("qr-tool-section")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }}
          className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>{bLabels.tryDirectGenerator}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white border border-slate-150 rounded-2xl p-6 md:p-10 shadow-sm space-y-6">
        {/* Category, Date, read details */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Title display */}
        <h1 className="text-2xl md:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Social sharing bar */}
        <div className="bg-slate-50 border border-slate-150 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            <Share2 className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>{bLabels.shareArticle}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleShareTwitter}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer"
              aria-label="Share on X"
            >
              <Twitter className="w-3.5 h-3.5" />
              <span>Twitter</span>
            </button>
            <button
              onClick={handleShareLinkedin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer"
              aria-label="Share on LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </button>
            <button
              onClick={handleShareWhatsapp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer ${
                showCopyFeedback
                  ? "bg-emerald-100 border border-emerald-300 text-emerald-700"
                  : "bg-white border border-slate-200 hover:border-blue-500 text-slate-700"
              }`}
              aria-label="Copy short link"
            >
              {showCopyFeedback ? <CheckCircle className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{showCopyFeedback ? bLabels.copied : bLabels.copyLink}</span>
            </button>
          </div>
        </div>

        {/* Summary text block */}
        <div className="bg-blue-50/50 border-l-4 border-blue-600 rounded-r-2xl p-6">
          <p className="text-slate-700 italic font-medium leading-relaxed">
            "{post.summary}"
          </p>
        </div>

        {/* Dynamic Table of Contents Anchor Links Panel */}
        {headings.length > 0 && (
          <div className="bg-slate-55 border border-slate-200/80 rounded-2xl p-5 md:p-6 mb-8 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-3.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>{bLabels.tableOfContents}</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 font-medium">
              {headings.map((item, idx) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-2 focus:outline-none transition-colors text-left cursor-pointer"
                  >
                    <span className="text-[10px] text-blue-400 font-mono">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rich article paragraph blocks with custom renders */}
        <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed font-normal">
          {(() => {
            const firstH2Index = post.content.findIndex((p) => p.startsWith("H2: ") || p.startsWith("## "));
            const middleIndex = Math.floor(post.content.length / 2);
            return post.content.map((paragraph, index) => {
              const isH2 = paragraph.startsWith("H2: ") || paragraph.startsWith("## ");
              const isH3 = paragraph.startsWith("H3: ") || paragraph.startsWith("### ");
              const isCodeBlock = paragraph.startsWith("```");
              const isCallout = paragraph.startsWith("> ") || paragraph.startsWith("💡") || paragraph.startsWith("📌");
              const isTable =
                paragraph.includes("|") &&
                paragraph.split("\n").filter((l) => l.trim().startsWith("|") && l.trim().endsWith("|")).length >= 2;
              const isList =
                paragraph.split("\n").length > 1 &&
                paragraph.split("\n").every((l) => /^\s*[-*•\d+.]\s+/.test(l.trim()) || l.trim() === "");

              const showAdSense1 = isH2 && index === firstH2Index;
              const showAdSense2 = index === middleIndex;
              const showAdSense3 = index === post.content.length - 1;

              return (
                <React.Fragment key={index}>
                  {showAdSense1 && (
                    <div className="my-6">
                      <AdSenseAd adSlot="AUTO" />
                    </div>
                  )}
                  {showAdSense2 && (
                    <div className="my-6">
                      <AdSenseAd adSlot="AUTO" />
                    </div>
                  )}

                  {isH2 ? (
                    <h2
                      id={`section-${index}`}
                      className="text-xl md:text-2xl font-extrabold font-display text-slate-900 pt-6 mt-8 border-t border-slate-100 flex items-center gap-2.5 scroll-mt-24"
                    >
                      <BookOpen className="w-5.5 h-5.5 text-blue-600 shrink-0" />
                      <span>{paragraph.replace(/^(?:H2:\s*|##\s*)/, "")}</span>
                    </h2>
                  ) : isH3 ? (
                    <h3 className="text-lg md:text-xl font-bold font-display text-slate-900 pt-4 mt-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                      <span>{paragraph.replace(/^(?:H3:\s*|###\s*)/, "")}</span>
                    </h3>
                  ) : isTable ? (
                    renderMarkdownTable(paragraph)
                  ) : isCallout ? (
                    renderCallout(paragraph)
                  ) : isCodeBlock ? (
                    <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 md:p-6 font-mono text-xs md:text-sm overflow-x-auto shadow-inner leading-relaxed border border-slate-850">
                      <code>{paragraph.replace(/```text\n|```/g, "")}</code>
                    </pre>
                  ) : isList ? (
                    renderListBlock(paragraph)
                  ) : (
                    <div className="space-y-4">
                      <p>{renderRichTextContent(paragraph, onNavigate)}</p>

                      {/* Ad Placement 1: Mediavine In-Content Mid (after the 3rd paragraph block) */}
                      {index === 2 && (
                        <div className="my-8 justify-center flex">
                          <AdSlot placement={AD_PLACEMENTS.blogMid} className="py-2 w-full" />
                        </div>
                      )}
                    </div>
                  )}

                  {showAdSense3 && (
                    <div className="my-6">
                      <AdSenseAd adSlot="AUTO" />
                    </div>
                  )}
                </React.Fragment>
              );
            });
          })()}

          {/* Ad Placement 2: Mediavine In-Content Bottom (placed precisely at the end of the post content) */}
          <div className="my-8 justify-center flex">
            <AdSlot placement={AD_PLACEMENTS.blogBottom} className="py-2 w-full" />
          </div>
        </div>

        {/* Strategic Cross-linking Call to Action */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 border-l-4 border-blue-500 rounded-2xl p-6 md:p-8 text-white my-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-8">
            <Sparkles className="w-64 h-64" />
          </div>
          <div className="space-y-1.5 relative z-10">
            <h4 className="font-bold text-base md:text-xl flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0 animate-pulse" />
              <span>{bLabels.readyToCreateTitle}</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed">
              {bLabels.readyToCreateDesc}
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate("home");
              setTimeout(() => {
                document.getElementById("qr-tool-section")?.scrollIntoView({ behavior: "smooth" });
              }, 100);
            }}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer relative z-10 hover:shadow-blue-550/20"
          >
            {bLabels.launchFreeGenerator}
          </button>
        </div>

        {/* Keyword list display for good SEO index mapping */}
        <div className="border-t border-slate-100 pt-8 mt-8 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            {bLabels.targetKeywords}
          </span>
          {post.keywords.map((kw, idx) => (
            <span
              key={idx}
              className="bg-slate-100 text-slate-600 border border-slate-150 px-3 py-1 rounded-lg text-xs font-mono font-medium"
            >
              #{kw}
            </span>
          ))}
        </div>
      </div>

      {/* Related Articles Section for higher dwell limits with 3 cards */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h3 className="text-lg font-black font-display text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>{bLabels.keepReadingGuides}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              className="bg-white border border-slate-150 rounded-xl p-5 hover:border-blue-500 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <span className="bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-md text-[9px] uppercase font-bold tracking-wider inline-block">
                  {rel.category}
                </span>
                <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {rel.summary}
                </p>
              </div>
              <button
                onClick={() => {
                  onNavigate(`blog/${rel.id}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-4 inline-flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer text-left"
              >
                <span>{bLabels.readGuide}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
