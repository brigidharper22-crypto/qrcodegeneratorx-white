import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useI18n } from "../../hooks/useI18n";
import { BlogPost } from "../../data/blogData";
import {
  saveCustomArticle,
  getCustomArticles,
  deleteCustomArticle,
  saveArticleDraft,
  loadArticleDraft,
  clearArticleDraft,
  generateArticleTypeScriptCode,
  verifyAdminLogin,
  updateAdminCredentials,
  isSessionAuthenticated,
  clearAdminSession,
  getAdminCreds,
} from "../../utils/customArticlesStorage";
import {
  generateFullSitemapXml,
  generateArticleSitemapXmlSnippet,
  downloadUpdatedSitemapXml,
  getSitemapStats,
} from "../../utils/sitemapGenerator";
import {
  CheckCircle2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Search,
  Check,
  Copy,
  Trash2,
  Edit3,
  ExternalLink,
  BookOpen,
  Plus,
  ArrowRight,
  Eye,
  FileText,
  HelpCircle,
  TrendingUp,
  Award,
  Layers,
  Heading,
  AlignLeft,
  Link2,
  Download,
  Share2,
  RefreshCw,
  FolderPlus,
  Lock,
  Key,
  Shield,
  ShieldCheck,
  LogOut,
  User,
  KeyRound,
  EyeOff,
  Settings,
  Globe,
  Code2,
  CheckCheck,
} from "lucide-react";
import { AdSenseAd } from "../ads/AdSenseAd";

interface ArticleEditorViewProps {
  onNavigate: (page: string) => void;
}

// Pre-configured High-Ranking Article Templates for SEO & AdSense
const ARTICLE_TEMPLATES = [
  {
    id: "comprehensive-guide-ar",
    name: "دليل إرشادي شامل ومفصل (أفضل لتصدر جوجل وأدسنس)",
    title: "دليل شامل: كيفية إنشاء واستخدام كود الـ QR باحترافية لعام 2026",
    focusKeyword: "كود الـ QR",
    category: "Guides",
    keywords: ["كود الـ QR", "توليد كود qr مجاني", "تصميم كود qr احترافي", "باركود"],
    summary: "دليل تدريبي وتطبيقي شامل يشرح للمبتدئين والشركات كيفية الاستفادة القصوى من أكواد الـ QR وتحويلها لأداة تسويق تفاعلية مجانية.",
    metaDescription: "تعرف على الدليل الشامل لإنشاء كود الـ QR المخصص مجاناً. شرح كامل للأنواع، التنسيقات، ومعدلات تصحيح الخطأ لضمان مسح سريع.",
    content: [
      "في ظل التحول الرقمي المتسارع لعام 2026، أصبحت تقنية كود الـ QR (رمز الاستجابة السريعة) ركيزة أساسية لربط العالم الواقعي بالمنصات الرقمية. سواء كنت تدير متجراً، مطعماً، أو شركة ناشئة، فإن استخدام [مولد كود الـ QR المجاني](home) يمنحك وسيلة فورية للتواصل مع عملائك بدون أي تعقيد أو تكاليف اشتراك.",
      "H2: ما هو كود الـ QR وكيف يعمل تقنياً؟",
      "تم ابتكار رمز الاستجابة السريعة (QR Code) في عام 1994 ليتفوق على الباركود التقليدي. بينما يخزن الباركود العادي 20 حرفاً أفقياً فقط، تستطيع مصفوفة الـ QR ثنائية الأبعاد تخزين آلاف الأحرف والرموز بدقة متناهية، مما يتيح تشفير الروابط، شبكات الواي فاي، جهات الاتصال، والمواقع الجغرافية.",
      "تعتمد المصفوفة على مربعات تحديد الزوايا البصرية (Finder Patterns) التي تمكن كاميرات الهواتف الذكية من التعرف على الرمز وقراءته في أقل من 40 مللي ثانية، حتى عند توجيه الكاميرا بزاوية مائلة أو في إضاءة منخفضة.",
      "H2: أهم مميزات كود الـ QR الثابت للأعمال والتسويق",
      "تتميز الرموز الثابتة (Static QR Codes) بأنها لا تنتهي صلاحيتها أبداً، حيث يتم دمج البيانات مباشرة في مصفوفة البكسلات دون الاعتماد على خوادم وسيطة قد تتعطل لاحقاً. هذا يمنحك أماناً كاملاً لطباعة البوسترات، البطاقات الشخصية، وقوائم الطعام بثقة تامة.",
      "H2: خطوات إنشاء كود QR عالي الجودة والجاهزية للطباعة",
      "1. اختيار نوع المحتوى: حدد ما إذا كنت تريد توجيه الزائر لرابط موقع، شبكة واي فاي، بطاقة عمل رقمية vCard، أو رسالة واتساب.\n2. التخصيص والألوان: اختر ألواناً متباينة تتماشى مع هويتك التجارية مع الحفاظ على وضوح التباين لمساعدة عدسات الكاميرا.\n3. رفع شعار علامتك: أضف شعار شركتك في المنتصف لتعزيز الموثوقية والمظهر الاحترافي.\n4. اختيار صيغة التحميل: حمّل الرمز بصيغة SVG أو PDF لضمان بقاء الخطوط نقية بدقة غير محدودة عند الطباعة الكبيرة.",
      "H2: نصائح ذهبية لضمان أعلى معدل مسح ضوئي (Scan Rate)",
      "لضمان عدم فشل المسح، اترك دائماً هامش أمان أبيض (Quiet Zone) حول الرمز، واضبط مستوى تصحيح الخطأ Reed-Solomon على المستوى المرتفع (H - 30%) إذا كنت تضع شعاراً في المنتصف.",
      "H2: الخلاصة والبدء العملي",
      "يمثل كود الـ QR أداة تسويقية مجانية بالكامل وذات عائد ضخم. ابدأ الآن في تجربة [أداة إنشاء الأكواد السريعة](home) واحصل على تصاميمك فوراً بأعلى دقة متجهة."
    ]
  },
  {
    id: "tutorial-wifi-ar",
    name: "شرح تطبيقي لحل مشكلة (Tutorial Template)",
    title: "كيفية تحويل كلمة سر الواي فاي إلى كود QR للمطاعم والمنازل",
    focusKeyword: "واي فاي كود QR",
    category: "Tutorials",
    keywords: ["واي فاي كود QR", "مشاركة الواي فاي بالباركود", "مولد كود qr للواي فاي"],
    summary: "خطوات تفصيلية عملية لإنشاء رمز QR يتيح للضيوف والزبائن الاتصال بشبكة الإنترنت تلقائياً بدون كتابة كلمة السر.",
    metaDescription: "طريقة سهلة ومجانية لإنشاء واي فاي كود QR لشبكتك المنزلية أو مطعمك. شارك الإنترنت بضغطة زر وبأمان محلي 100%.",
    content: [
      "تعتبر كتابة كلمات سر الواي فاي الطويلة والمعقدة من أكثر التجارب المزعجة للضيوف في المطاعم والمقاهي. يوفر إنشاء واي فاي كود QR حلاً عصرياً يتيح لأي هاتف آيفون أو أندرويد الاتصال فوراً بمجرد توجيه الكاميرا.",
      "H2: صيغة تشفير بيانات شبكات الواي فاي",
      "تتعرف الهواتف الذكية على شبكة الإنترنت عبر قراءة تركيبة برمجية قياسية محددة تبدأ بـ WIFI:S:اسم_الشبكة;T:WPA;P:كلمة_السر;;. يقوم محركنا بتوليد هذه الصيغة بدقة دون رفع بياناتك لأي خادم خارجي.",
      "H2: خطوات الإعداد في 3 دقائق",
      "أدخل اسم الشبكة (SSID) تماماً كما هو مكتوب في جهاز الراوتر، ثم حدد نوع التشفير (غالباً WPA/WPA2)، وأدخل كلمة السر. قم بمعاينة الكود وتنزيل الملصق بدقة عالية لطباعته ووضعه على الطاولات.",
      "H2: نصائح أمان مهمة لأصحاب المقاهي",
      "يُفضل دائماً تخصيص شبكة ضيوف معزولة (Guest Network) وتوليد كود الـ QR الخاص بها، لحماية أجهزتك وحساباتك الإدارية من أي وصول غير مصرح به."
    ]
  }
];

export function ArticleEditorView({ onNavigate }: ArticleEditorViewProps) {
  const { locale, isRTL } = useI18n();

  // Authentication & Security States
  const [isAuthenticated, setIsAuthenticated] = useState(() => isSessionAuthenticated());
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState<number>(0);

  // Change Credentials Modal State
  const [showChangeCredsModal, setShowChangeCredsModal] = useState(false);
  const [currentPassInput, setCurrentPassInput] = useState("");
  const [newUsernameInput, setNewUsernameInput] = useState("");
  const [newPassInput, setNewPassInput] = useState("");
  const [credsStatus, setCredsStatus] = useState<{ success?: string; error?: string } | null>(null);

  // Active View Tab: "editor" | "audit" | "preview" | "manage" | "sitemap"
  const [activeTab, setActiveTab] = useState<"editor" | "audit" | "preview" | "manage" | "sitemap">("editor");

  // Form States
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Guides");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([
    "اكتب مقدمة المقال هنا لجذب انتباه القارئ ومحركات البحث...",
    "H2: ما هي أهمية الموضوع ولماذا يهم القارئ؟",
    "اشرح بالتفصيل الأسباب والفوائد والخطوات بأسلوب سلس وغني بالمعلومات القيمة..."
  ]);
  const [rawMarkdownMode, setRawMarkdownMode] = useState(false);
  const [rawText, setRawText] = useState("");

  // Storage and notification feedback
  const [customArticles, setCustomArticles] = useState<BlogPost[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSitemapXml, setCopiedSitemapXml] = useState(false);
  const [copiedSnippetArticleId, setCopiedSnippetArticleId] = useState<string | null>(null);
  const [publishedSuccessArticle, setPublishedSuccessArticle] = useState<BlogPost | null>(null);
  const [isEditingExistingId, setIsEditingExistingId] = useState<string | null>(null);

  // Load custom articles list
  const refreshCustomArticles = useCallback(() => {
    setCustomArticles(getCustomArticles());
  }, []);

  useEffect(() => {
    refreshCustomArticles();
    const handleUpdate = () => refreshCustomArticles();
    window.addEventListener("custom_articles_updated", handleUpdate);
    return () => window.removeEventListener("custom_articles_updated", handleUpdate);
  }, [refreshCustomArticles]);

  // Load draft on mount if exists
  useEffect(() => {
    const draft = loadArticleDraft();
    if (draft && !title) {
      if (draft.title) setTitle(draft.title);
      if (draft.id) setSlug(draft.id);
      if (draft.category) setCategory(draft.category);
      if (draft.focusKeyword) setFocusKeyword(draft.focusKeyword);
      if (draft.keywords) setKeywords(draft.keywords);
      if (draft.summary) setSummary(draft.summary);
      if (draft.metaDescription) setMetaDescription(draft.metaDescription);
      if (draft.content && draft.content.length > 0) setParagraphs(draft.content);
    }
  }, []);

  // Auto-generate slug from title if user hasn't typed a custom slug
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (!isEditingExistingId && (!slug || slug === generateSlugFromText(title))) {
      setSlug(generateSlugFromText(newTitle));
    }
  };

  const generateSlugFromText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s\u0621-\u064A-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Keep rawText synced when switching between blocks and raw editor
  useEffect(() => {
    if (!rawMarkdownMode) {
      setRawText(paragraphs.join("\n\n"));
    }
  }, [paragraphs, rawMarkdownMode]);

  const handleRawTextChange = (val: string) => {
    setRawText(val);
    const parsed = val
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    setParagraphs(parsed.length > 0 ? parsed : [""]);
  };

  // Add/Remove keywords
  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    if (!keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
    }
    setKeywordInput("");
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter((k) => k !== kw));
  };

  // Paragraph manipulations
  const updateParagraph = (index: number, val: string) => {
    const updated = [...paragraphs];
    updated[index] = val;
    setParagraphs(updated);
  };

  const addParagraph = (asHeading: boolean = false) => {
    const prefix = asHeading ? "H2: " : "";
    setParagraphs([...paragraphs, `${prefix}عنوان قسم رئيسي جديد`]);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length <= 1) return;
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const moveParagraph = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === paragraphs.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...paragraphs];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setParagraphs(updated);
  };

  // Auto-Save Draft to LocalStorage
  useEffect(() => {
    if (title || paragraphs.length > 0) {
      const timer = setTimeout(() => {
        saveArticleDraft({
          id: slug,
          title,
          category,
          focusKeyword,
          keywords,
          summary,
          metaDescription,
          content: paragraphs,
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [title, slug, category, focusKeyword, keywords, summary, metaDescription, paragraphs]);

  // Load an existing template
  const applyTemplate = (template: typeof ARTICLE_TEMPLATES[0]) => {
    setTitle(template.title);
    setSlug(template.id);
    setCategory(template.category);
    setFocusKeyword(template.focusKeyword);
    setKeywords(template.keywords);
    setSummary(template.summary);
    setMetaDescription(template.metaDescription);
    setParagraphs(template.content);
    setIsEditingExistingId(null);
    showToast("تم تحميل القالب بنجاح!");
  };

  // Load an existing custom article for editing
  const loadArticleForEditing = (article: BlogPost) => {
    setTitle(article.title);
    setSlug(article.id);
    setCategory(article.category);
    setKeywords(article.keywords || []);
    setSummary(article.summary || "");
    setMetaDescription(article.metaDescription || "");
    setParagraphs(article.content || []);
    setIsEditingExistingId(article.id);
    setActiveTab("editor");
    showToast(`تم فتح مقال "${article.title}" للتعديل`);
  };

  // Clear Editor
  const handleClear = () => {
    setTitle("");
    setSlug("");
    setCategory("Guides");
    setFocusKeyword("");
    setKeywords([]);
    setSummary("");
    setMetaDescription("");
    setParagraphs([""]);
    setIsEditingExistingId(null);
    clearArticleDraft();
    showToast("تم تفريغ المحرر وبدء مقال جديد");
  };

  // Toast feedback
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Calculate estimated reading time
  const totalWords = useMemo(() => {
    const fullText = [title, summary, metaDescription, ...paragraphs].join(" ");
    return fullText.trim().split(/\s+/).filter(Boolean).length;
  }, [title, summary, metaDescription, paragraphs]);

  const estimatedReadTime = useMemo(() => {
    const minutes = Math.max(1, Math.ceil(totalWords / 180));
    return `${minutes} min read`;
  }, [totalWords]);

  // Build the complete BlogPost object
  const currentBlogPostObject: BlogPost = useMemo(() => {
    const cleanId = slug.trim() || generateSlugFromText(title) || "new-article-post";
    const dateFormatted = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      id: cleanId,
      title: title.trim() || "عنوان المقال الجديد",
      date: dateFormatted,
      readTime: estimatedReadTime,
      category: category || "Guides",
      keywords: keywords.length > 0 ? keywords : [focusKeyword || "qr code"],
      summary: summary.trim() || (paragraphs[0]?.replace(/^H2:\s*/, "") || ""),
      metaDescription: metaDescription.trim() || summary.trim() || "وصف مختصر للمقال",
      content: paragraphs.filter((p) => p.trim().length > 0),
    };
  }, [slug, title, estimatedReadTime, category, keywords, focusKeyword, summary, metaDescription, paragraphs]);

  // Computed live sitemap stats
  const sitemapStats = useMemo(() => {
    return getSitemapStats(customArticles);
  }, [customArticles]);

  // PUBLISH INSTANTLY TO BLOG
  const handlePublish = () => {
    if (!title.trim()) {
      showToast("يرجى كتابة عنوان المقال أولاً!");
      return;
    }
    if (paragraphs.length === 0 || !paragraphs[0].trim()) {
      showToast("يرجى كتابة محتوى المقال!");
      return;
    }

    const success = saveCustomArticle(currentBlogPostObject);
    if (success) {
      refreshCustomArticles();
      setPublishedSuccessArticle(currentBlogPostObject);
      showToast("🎉 تم نشر المقال وإضافته لخريطة الموقع sitemap.xml والمدونة بنجاح!");
      clearArticleDraft();
    } else {
      showToast("حدث خطأ أثناء الحفظ. يرجى المحاولة ثانية.");
    }
  };

  // Copy Complete Sitemap XML
  const handleCopyFullSitemap = () => {
    const fullXml = generateFullSitemapXml(customArticles);
    navigator.clipboard.writeText(fullXml);
    setCopiedSitemapXml(true);
    showToast("تم نسخ كود ملف sitemap.xml كاملاً!");
    setTimeout(() => setCopiedSitemapXml(false), 3000);
  };

  // Copy Snippet XML for specific article
  const handleCopyArticleSnippet = (article: BlogPost) => {
    const snippet = generateArticleSitemapXmlSnippet(article);
    navigator.clipboard.writeText(snippet);
    setCopiedSnippetArticleId(article.id);
    showToast(`تم نسخ وسم خريطة الموقع لمقال "${article.title}"`);
    setTimeout(() => setCopiedSnippetArticleId(null), 3000);
  };

  // DELETE ARTICLE
  const handleDeleteArticle = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف مقال "${name}"؟`)) {
      deleteCustomArticle(id);
      refreshCustomArticles();
      showToast("تم حذف المقال بنجاح");
      if (isEditingExistingId === id) {
        handleClear();
      }
    }
  };

  // COPY CODE
  const handleCopyTypeScriptCode = () => {
    const code = generateArticleTypeScriptCode(currentBlogPostObject);
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast("تم نسخ كود المقال بصيغة TypeScript! يمكنك لصقه مباشرة في ملف blogData.ts");
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // -------------------------------------------------------------
  // ADVANCED REAL-TIME SEO & ADSENSE AUDIT METRICS
  // -------------------------------------------------------------
  const auditResults = useMemo(() => {
    const kw = focusKeyword.trim().toLowerCase();
    const fullContentText = paragraphs.join(" ").toLowerCase();
    const titleLower = title.toLowerCase();
    const metaLower = metaDescription.toLowerCase();
    const slugLower = slug.toLowerCase();

    // Headings count
    const h2Count = paragraphs.filter((p) => p.startsWith("H2: ")).length;

    // Internal links count
    const linkMatches = (fullContentText.match(/\[([^\]]+)\]\(([^)]+)\)/g) || []).length;

    // Keyword density
    let kwCount = 0;
    if (kw) {
      const regex = new RegExp(kw, "gi");
      kwCount = (fullContentText.match(regex) || []).length;
    }
    const kwDensity = totalWords > 0 && kw ? ((kwCount / totalWords) * 100).toFixed(1) : "0";

    // Checks breakdown
    const seoChecks = [
      {
        id: "kw_defined",
        label: "تحديد الكلمة المفتاحية المستهدفة (Focus Keyword)",
        passed: Boolean(kw),
        advice: "حدد كلمة مفتاحية رئيسية واحدة ترغب في تصدر نتائج البحث بها.",
        importance: "high",
      },
      {
        id: "kw_in_title",
        label: "وجود الكلمة المفتاحية في عنوان المقال (H1 Title)",
        passed: Boolean(kw && titleLower.includes(kw)),
        advice: "يُفضل أن تبدأ بالكلمة المفتاحية أو تضعها في النصف الأول من العنوان.",
        importance: "high",
      },
      {
        id: "title_length",
        label: "طول العنوان مثالي لمحركات البحث (40 - 65 حرفاً)",
        passed: title.length >= 35 && title.length <= 68,
        advice: `العنوان الحالي يتكون من ${title.length} حرفاً. الطول الموصى به هو بين 40 و 65 حرفاً لتجنب اقتطاعه في جوجل.`,
        importance: "medium",
      },
      {
        id: "kw_in_meta",
        label: "وجود الكلمة المفتاحية في الوصف التعريفي (Meta Description)",
        passed: Boolean(kw && metaLower.includes(kw)),
        advice: "أضف الكلمة المفتاحية في الوصف التعريفي بشكل طبيعي وجذاب للنقر (CTR).",
        importance: "high",
      },
      {
        id: "meta_length",
        label: "طول الوصف التعريفي متوافق مع شاشات الجوال والحاسوب (120 - 160 حرفاً)",
        passed: metaDescription.length >= 110 && metaDescription.length <= 165,
        advice: `الوصف الحالي يتكون من ${metaDescription.length} حرفاً. الطول المثالي هو 120 إلى 160 حرفاً.`,
        importance: "medium",
      },
      {
        id: "kw_in_slug",
        label: "الكلمة المفتاحية في الرابط الدائم (Slug URL)",
        passed: Boolean(kw && (slugLower.includes(kw.replace(/\s+/g, "-")) || slugLower.length > 5)),
        advice: "تأكد من أن رابط المقال قصير، معبر، وخالٍ من الرموز المعقدة.",
        importance: "medium",
      },
      {
        id: "headings_structure",
        label: "هيكلية العناوين الفرعية (H2 Headings)",
        passed: h2Count >= 3,
        advice: `المقال يحتوي على ${h2Count} عناوين فرعية H2. يوصى بوجود 3 إلى 6 عناوين فرعية لتقسيم الأفكار بوضوح.`,
        importance: "high",
      },
      {
        id: "internal_links",
        label: "روابط داخلية وخارجية مفيدة (Internal Links)",
        passed: linkMatches >= 1,
        advice: "أضف روابط داخلية لصفحة المولد الرئيسية [الرابط](home) أو مقالات أخرى لتعزيز بقاء الزائر.",
        importance: "medium",
      },
      {
        id: "kw_density",
        label: `كثافة الكلمة المفتاحية طبيعية (${kwDensity}% | الموصى به 1% - 2.5%)`,
        passed: parseFloat(kwDensity) >= 0.8 && parseFloat(kwDensity) <= 3.5,
        advice: `تم تكرار الكلمة المفتاحية ${kwCount} مرات. تجنب حشو الكلمات (Keyword Stuffing) للحفاظ على تجربة القارئ.`,
        importance: "medium",
      },
    ];

    const adsenseChecks = [
      {
        id: "word_count_adsense",
        label: "حجم المقال وعمق المحتوى (> 600 كلمة، والأفضل > 900 كلمة)",
        passed: totalWords >= 500,
        bonus: totalWords >= 900,
        advice: `عدد كلمات المقال حالياً ${totalWords} كلمة. تتطلب جوجل أدسنس مقالات غنية وتفصيلية وذات قيمة مضافة حقيقية للقارئ لتجنب رفض (المحتوى غير ذي قيمة).`,
        importance: "critical",
      },
      {
        id: "paragraph_length",
        label: "سهولة القراءة وتناسق الفقرات (تجنب الكتل النصية الضخمة)",
        passed: paragraphs.every((p) => p.length < 800),
        advice: "قسّم الفقرات الطويلة إلى فقرات أصغر (3-5 أسطر لكل فقرة) مع استخدام القوائم النقطية لتسهيل القراءة وتوزيع مساحات الإعلانات.",
        importance: "high",
      },
      {
        id: "user_value_intro",
        label: "مقدمة واضحة تحدد الفائدة المباشرة للزائر",
        passed: Boolean(summary.length > 40 || paragraphs[0]?.length > 80),
        advice: "ابدأ المقال بإجابة فورية عن استفسار الزائر وبناء الثقة.",
        importance: "high",
      },
      {
        id: "call_to_action",
        label: "خاتمة ودعوة لاتخاذ إجراء (Call to Action / FAQ)",
        passed: paragraphs.some((p) => p.toLowerCase().includes("خلاصة") || p.toLowerCase().includes("conclusion") || p.toLowerCase().includes("خطوات") || p.startsWith("H2: ")),
        advice: "اختم المقال بملخص وتوجيه القارئ لتجربة الأداة أو مشاركة المقال.",
        importance: "medium",
      },
    ];

    const seoPassedCount = seoChecks.filter((c) => c.passed).length;
    const seoScore = Math.round((seoPassedCount / seoChecks.length) * 100);

    const adsensePassedCount = adsenseChecks.filter((c) => c.passed).length;
    const adsenseScore = Math.round((adsensePassedCount / adsenseChecks.length) * 100);

    return {
      seoScore,
      adsenseScore,
      seoChecks,
      adsenseChecks,
      h2Count,
      linkMatches,
      kwCount,
      kwDensity,
    };
  }, [focusKeyword, paragraphs, title, metaDescription, slug, totalWords, summary]);

  // Lockout Countdown Timer Effect
  useEffect(() => {
    if (lockoutTimer > 0) {
      const interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTimer]);

  // Authentication Handlers
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    if (!usernameInput.trim() || !passwordInput) {
      setAuthError("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const res = await verifyAdminLogin(usernameInput, passwordInput);
      if (res.success) {
        setIsAuthenticated(true);
        setPasswordInput("");
        setFailedAttempts(0);
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        if (nextAttempts >= 5) {
          setLockoutTimer(60);
          setAuthError("تم قفل تسجيل الدخول مؤقتاً لمدة 60 ثانية بسبب المحاولات الخاطئة المتكررة.");
        } else {
          setAuthError(res.error || "بيانات الدخول غير صحيحة");
        }
      }
    } catch (err) {
      setAuthError("حدث خطأ أثناء التحقق من بيانات الدخول");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setUsernameInput("");
    setPasswordInput("");
    setToastMessage("تم تسجيل الخروج وتأمين لوحة التحكم بنجاح.");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredsStatus(null);

    if (!currentPassInput) {
      setCredsStatus({ error: "يرجى كتابة كلمة المرور الحالية" });
      return;
    }

    if (!newUsernameInput.trim() || newPassInput.length < 6) {
      setCredsStatus({ error: "اسم المستخدم مطلوب وكلمة المرور يجب أن تكون 6 أحرف على الأقل" });
      return;
    }

    const res = await updateAdminCredentials(currentPassInput, newUsernameInput, newPassInput);
    if (res.success) {
      setCredsStatus({ success: "تم تحديث بيانات الدخول بنجاح! احتفظ بها في مكان آمن." });
      setCurrentPassInput("");
      setNewPassInput("");
      setTimeout(() => {
        setShowChangeCredsModal(false);
        setCredsStatus(null);
      }, 2000);
    } else {
      setCredsStatus({ error: res.error || "فشل تحديث البيانات، تأكد من كلمة المرور الحالية" });
    }
  };

  // --- 1. SECURE ADMIN LOGIN SCREEN (When not authenticated) ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6" dir={isRTL ? "rtl" : "ltr"}>
        <div className="w-full max-w-md space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden text-slate-100">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-3 relative z-10">
            <div className="inline-flex p-3.5 rounded-2xl bg-blue-950/80 border border-blue-800/60 text-blue-400 shadow-inner">
              <Lock className="w-8 h-8 text-blue-400 animate-pulse" />
            </div>
            <h2 className="text-2xl font-black font-display tracking-tight text-white">
              بوابة الإدارة المخصصة
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed font-mono">
              بوابة سرية ومؤمنة مخصصة لمدير الموقع فقط لكتابة وتدقيق ونشر المقالات.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5 relative z-10">
            {authError && (
              <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{authError}</span>
              </div>
            )}

            {lockoutTimer > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-800 text-amber-300 text-xs text-center font-mono font-bold">
                انتظر {lockoutTimer} ثانية لإعادة المحاولة...
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-blue-400" />
                <span>اسم المستخدم (Admin Username)</span>
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="أدخل اسم المستخدم..."
                disabled={lockoutTimer > 0 || isAuthenticating}
                className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-blue-400" />
                <span>كلمة المرور (Password)</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور..."
                  disabled={lockoutTimer > 0 || isAuthenticating}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500 font-sans pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={lockoutTimer > 0 || isAuthenticating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isAuthenticating ? "جارٍ التحقق والتشفير..." : "تسجيل الدخول وفتح الاستوديو"}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <button
              onClick={() => onNavigate("home")}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>العودة للموقع الرئيسي</span>
            </button>
            <span className="font-mono text-[10px] text-slate-600">256-bit SHA Encrypted</span>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED ADMIN DASHBOARD VIEW ---
  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6" dir={isRTL ? "rtl" : "ltr"}>
      {/* Toast notification banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Change Credentials Modal */}
      {showChangeCredsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">تغيير بيانات الدخول السرية</h3>
                  <p className="text-xs text-slate-500">قم بتعيين اسم مستخدم وكلمة مرور جديدة لحسابك</p>
                </div>
              </div>
              <button
                onClick={() => setShowChangeCredsModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateCreds} className="space-y-4 text-slate-700 text-xs">
              {credsStatus?.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{credsStatus.error}</span>
                </div>
              )}
              {credsStatus?.success && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{credsStatus.success}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">كلمة المرور الحالية</label>
                <input
                  type="password"
                  value={currentPassInput}
                  onChange={(e) => setCurrentPassInput(e.target.value)}
                  placeholder="أدخل كلمة المرور الحالية..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">اسم المستخدم الجديد</label>
                <input
                  type="text"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  placeholder="مثال: my_admin_user"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-800">كلمة المرور الجديدة</label>
                <input
                  type="password"
                  value={newPassInput}
                  onChange={(e) => setNewPassInput(e.target.value)}
                  placeholder="6 أحرف أو أرقام على الأقل..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowChangeCredsModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  حفظ وتأكيد
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Top Security & Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 border border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">لوحة الإدارة المشفرة (Admin Portal)</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
                AUTH ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              الرابط السري مخفي ومحمي من محركات البحث (noindex, nofollow)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChangeCredsModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors border border-slate-700 cursor-pointer"
          >
            <KeyRound className="w-3.5 h-3.5 text-blue-400" />
            <span>تغيير بيانات الدخول</span>
          </button>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-xl text-xs font-semibold transition-colors border border-red-800/80 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج والقفل</span>
          </button>
        </div>
      </div>

      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>لوحة كتابة ونشر المقالات الذكية (SEO & AdSense Publisher Studio)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-slate-900">
              محرر المقالات <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">المتوافقة مع أدسنس وسيو جوجل</span>
            </h1>
            <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
              اكتب مقالات غنية، وقم بفحص جاهزيتها الفورية للقبول في Google AdSense وتصدر الكلمات المفتاحية في محرك البحث، ثم انشرها مباشرة على موقعك بضغطة زر واحدة.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>نشر المقال فوراً للمدونة</span>
            </button>

            <button
              onClick={handleCopyTypeScriptCode}
              className="inline-flex items-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              title="نسخ كود TypeScript جاهز للإضافة إلى كود المشروع"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? "تم نسخ الكود!" : "تصدير كود TypeScript"}</span>
            </button>

            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-xs font-semibold cursor-pointer"
              title="بدء مقال جديد"
            >
              <RefreshCw className="w-4 h-4" />
              <span>جديد</span>
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-2xl">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span>كتابة وتنسيق المقال</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>فحص السيو وأدسنس ({auditResults.seoScore}% / {auditResults.adsenseScore}%)</span>
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>معاينة المقال الحي</span>
            </button>

            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "manage"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>المقالات المنشورة ({customArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sitemap")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "sitemap"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>خريطة الموقع Sitemap.xml ({sitemapStats.totalUrls})</span>
            </button>
          </div>

          {/* Quick Word & Readiness Indicators */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              الكلمات: <strong className="text-slate-900">{totalWords}</strong>
            </span>
            <span className="bg-slate-100 px-3 py-1.5 rounded-lg">
              وقت القراءة: <strong className="text-slate-900">{estimatedReadTime}</strong>
            </span>
            <span
              className={`px-3 py-1.5 rounded-lg font-bold ${
                auditResults.adsenseScore >= 75
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              جاهزية أدسنس: {auditResults.adsenseScore}%
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: ARTICLE EDITOR & COMPOSER */}
      {/* ======================================================== */}
      {activeTab === "editor" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Editor Column (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Templates Selector */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-150 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-xs font-bold text-slate-800">قوالب مقالات جاهزة وعالية الترتيب:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {ARTICLE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => applyTemplate(tmpl)}
                    className="px-3 py-1.5 bg-white hover:bg-blue-600 hover:text-white border border-blue-200 rounded-lg text-xs font-semibold text-blue-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Slug */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Heading className="w-4 h-4 text-blue-600" />
                    <span>عنوان المقال الرئيسي (H1 Title)</span>
                  </label>
                  <span
                    className={`text-[11px] font-mono font-semibold ${
                      title.length >= 35 && title.length <= 68 ? "text-emerald-600" : "text-slate-400"
                    }`}
                  >
                    {title.length} حرفاً (المثالي: 40-65)
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="مثال: الدليل الشامل لإنشاء كود الـ QR باحترافية وتصميمه مجاناً"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Slug URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-slate-400" />
                  <span>الرابط الدائم (Slug URL)</span>
                </label>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-600">
                  <span className="text-slate-400 shrink-0">qrcodegeneratorx.com/{locale}/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(generateSlugFromText(e.target.value))}
                    placeholder="free-qr-code-generator-guide"
                    className="flex-1 bg-transparent font-bold text-blue-600 focus:outline-none ml-1"
                  />
                </div>
              </div>
            </div>

            {/* Paragraphs and Content Builder */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-blue-600" />
                    <span>محتوى المقال وفقراته (Content & Headings)</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    استخدم العناوين الفرعية H2 لتقسيم المقال، ووزع الكلمات المفتاحية بشكل متناسق.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRawMarkdownMode(!rawMarkdownMode)}
                    className="text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    {rawMarkdownMode ? "عرض الفقرات المقسمة" : "وضع النص الكامل (Markdown)"}
                  </button>
                </div>
              </div>

              {/* RAW TEXT MODE */}
              {rawMarkdownMode ? (
                <div className="space-y-2">
                  <textarea
                    value={rawText}
                    onChange={(e) => handleRawTextChange(e.target.value)}
                    rows={16}
                    placeholder="الصق أو اكتب المقال بالكامل هنا... استخدم 'H2: عنوان القسم' لبدء قسم جديد"
                    className="w-full p-4 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 تلميح: اكتب في بداية السطر <strong>H2: عنوان القسم</strong> لتحويله إلى عنوان رئيسي في المقال تلقائياً.
                  </p>
                </div>
              ) : (
                /* INTERACTIVE SECTIONS BUILDER */
                <div className="space-y-4">
                  {paragraphs.map((p, idx) => {
                    const isHeading = p.startsWith("H2: ");
                    const cleanValue = isHeading ? p.replace(/^H2:\s*/, "") : p;

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${
                          isHeading
                            ? "bg-blue-50/50 border-blue-200 shadow-2xs"
                            : "bg-slate-50/60 border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                              isHeading
                                ? "bg-blue-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {isHeading ? `عنوان فرعي (H2 Heading #${idx + 1})` : `فقرة محتوى #${idx + 1}`}
                          </span>

                          <div className="flex items-center gap-1">
                            {/* Toggle Heading Type */}
                            <button
                              onClick={() => {
                                if (isHeading) {
                                  updateParagraph(idx, cleanValue);
                                } else {
                                  updateParagraph(idx, `H2: ${cleanValue}`);
                                }
                              }}
                              className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 px-2 py-1 bg-white border border-slate-200 rounded-md cursor-pointer"
                              title={isHeading ? "تحويل إلى فقرة عادية" : "تحويل إلى عنوان H2"}
                            >
                              {isHeading ? "تحويل لفقرة" : "تحويل لـ H2"}
                            </button>

                            {/* Move Up/Down */}
                            <button
                              onClick={() => moveParagraph(idx, "up")}
                              disabled={idx === 0}
                              className="text-slate-400 hover:text-slate-700 disabled:opacity-30 p-1 cursor-pointer"
                              title="تحريك لأعلى"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => moveParagraph(idx, "down")}
                              disabled={idx === paragraphs.length - 1}
                              className="text-slate-400 hover:text-slate-700 disabled:opacity-30 p-1 cursor-pointer"
                              title="تحريك لأسفل"
                            >
                              ▼
                            </button>

                            {/* Delete paragraph */}
                            <button
                              onClick={() => removeParagraph(idx)}
                              className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                              title="حذف هذا القسم"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {isHeading ? (
                          <input
                            type="text"
                            value={cleanValue}
                            onChange={(e) => updateParagraph(idx, `H2: ${e.target.value}`)}
                            placeholder="اكتب عنوان القسم الفرعي هنا..."
                            className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <textarea
                            value={cleanValue}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            rows={3}
                            placeholder="اكتب نص الفقرة بتفاصيل وافية وقيمة تفيد القارئ..."
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Add Paragraph / Heading Controls */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => addParagraph(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>إضافة فقرة جديدة</span>
                    </button>

                    <button
                      onClick={() => addParagraph(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      <Heading className="w-4 h-4" />
                      <span>إضافة عنوان فرعي H2 جديد</span>
                    </button>

                    {/* Helper to insert internal link */}
                    <button
                      onClick={() => {
                        const linkSnippet = "[مولد كود الـ QR المجاني](home)";
                        navigator.clipboard.writeText(linkSnippet);
                        showToast("تم نسخ كود الرابط الداخلي! الصقه في أي فقرة لربطها بصفحة المولد الرئيسية");
                      }}
                      className="inline-flex items-center gap-1 px-3 py-2 text-[11px] font-semibold text-slate-500 hover:text-blue-600 bg-white border border-slate-200 rounded-xl cursor-pointer"
                      title="نسخ صيغة رابط داخلي لمولد الأكواد"
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>نسخ كود رابط للمولد الرئيسي</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Settings & SEO Attributes Column (1 Col) */}
          <div className="space-y-6">
            {/* Target Keyword Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>الكلمة المفتاحية المستهدفة (Focus Keyword)</span>
                </label>
              </div>
              <input
                type="text"
                value={focusKeyword}
                onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="مثال: كود الـ QR"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                الكلمة الأساسية التي تريد أن يظهر مقالك في الصفحة الأولى عند بحث المستخدمين عنها في جوجل.
              </p>
            </div>

            {/* Meta Description for Google SERP */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>الوصف التعريفي (Meta Description)</span>
                </label>
                <span
                  className={`text-[11px] font-mono font-semibold ${
                    metaDescription.length >= 110 && metaDescription.length <= 165
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {metaDescription.length} / 160
                </span>
              </div>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows={3}
                placeholder="وصف جذاب ومختصر يظهر تحت عنوان المقال في نتائج بحث جوجل..."
                className="w-full p-3 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-[11px] text-slate-500 leading-relaxed">
                يظهر هذا الوصف في بطاقة جوجل. احرص على تضمين كلمتك المفتاحية ودعوة واضحة للنقر.
              </p>
            </div>

            {/* Category & Tags */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  تصنيف المقال (Category)
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Guides">أدلة إرشادية (Guides)</option>
                  <option value="Tutorials">شروحات تطبيقية (Tutorials)</option>
                  <option value="Business">للشركات والمطاعم (Business)</option>
                  <option value="Marketing">التسويق والحملات (Marketing)</option>
                  <option value="Design">التصميم والألوان (Design)</option>
                  <option value="Security">الخصوصية والأمان (Security)</option>
                </select>
              </div>

              {/* Keyword Tags */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  الكلمات الدلالية (Keywords Tags)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="أدخل وسم واضغط Enter..."
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold cursor-pointer"
                  >
                    إضافة
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium"
                    >
                      <span>{kw}</span>
                      <button
                        onClick={() => handleRemoveKeyword(kw)}
                        className="text-slate-400 hover:text-red-500 text-xs font-bold cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Google SERP Live Snippet Preview */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <Search className="w-4 h-4 text-blue-600" />
                <span>معاينة نتيجة جوجل (Google SERP Preview)</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-1.5 text-right font-sans">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white font-bold">
                    Q
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">qrcodegeneratorx.com › blog › {slug || "guide"}</span>
                </div>
                <div className="text-sm font-semibold text-blue-800 hover:underline cursor-pointer leading-tight">
                  {title || "عنوان المقال كما سيظهر في محرك بحث جوجل"}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {metaDescription || "الوصف التعريفي المخصص للمقال سيظهر هنا في محرك البحث للمستخدمين عند البحث عن كلماتك المفتاحية..."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: LIVE SEO & ADSENSE COMPLIANCE AUDIT */}
      {/* ======================================================== */}
      {activeTab === "audit" && (
        <div className="space-y-8">
          {/* Dual Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google SEO Score Meter */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-blue-600">
                    Google SEO Quality Engine
                  </span>
                  <span className="text-2xl font-black font-display text-slate-900">{auditResults.seoScore}%</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">مقياس تصدر نتائج البحث (Google SEO)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  يفحص موضع الكلمة المفتاحية، هيكل العناوين، الروابط، وأطوال النصوص وفق أحدث خوارزميات جوجل.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    auditResults.seoScore >= 80
                      ? "bg-emerald-500"
                      : auditResults.seoScore >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${auditResults.seoScore}%` }}
                />
              </div>

              {/* Check items list */}
              <div className="space-y-3 pt-2">
                {auditResults.seoChecks.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      item.passed
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5 flex-1">
                      <div className="font-bold">{item.label}</div>
                      <div className="text-[11px] opacity-80">{item.advice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google AdSense Approval Score Meter */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-indigo-600">
                    Google AdSense Compliance Engine
                  </span>
                  <span className="text-2xl font-black font-display text-slate-900">{auditResults.adsenseScore}%</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">مقياس قبول جوجل أدسنس (AdSense Approval)</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  يفحص عمق المحتوى، خلوه من المحتوى الضعيف (Thin Content)، ومناسبته للمعلنين وسياسات الجودة.
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    auditResults.adsenseScore >= 80
                      ? "bg-emerald-500"
                      : auditResults.adsenseScore >= 50
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${auditResults.adsenseScore}%` }}
                />
              </div>

              {/* Check items list */}
              <div className="space-y-3 pt-2">
                {auditResults.adsenseChecks.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                      item.passed
                        ? "bg-emerald-50/60 border-emerald-200 text-emerald-900"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5 flex-1">
                      <div className="font-bold">{item.label}</div>
                      <div className="text-[11px] opacity-80">{item.advice}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: LIVE ARTICLE PREVIEW */}
      {/* ======================================================== */}
      {activeTab === "preview" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8 max-w-4xl mx-auto">
          {/* Top Post Metadata Header */}
          <div className="space-y-4 border-b border-slate-100 pb-8 text-center">
            <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs uppercase tracking-wider font-mono">
              {currentBlogPostObject.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight max-w-3xl mx-auto">
              {currentBlogPostObject.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400 font-mono">
              <span>📅 {currentBlogPostObject.date}</span>
              <span>•</span>
              <span>⏱️ {currentBlogPostObject.readTime}</span>
              <span>•</span>
              <span>🏷️ {currentBlogPostObject.keywords.join(", ")}</span>
            </div>
          </div>

          <AdSenseAd adSlot="AUTO" />

          {/* Article Summary Box */}
          {currentBlogPostObject.summary && (
            <div className="bg-slate-50 border-r-4 border-blue-600 p-5 rounded-xl text-slate-700 text-sm leading-relaxed font-medium">
              {currentBlogPostObject.summary}
            </div>
          )}

          {/* Article Body Content */}
          <div className="space-y-6 text-slate-800 text-base leading-relaxed">
            {currentBlogPostObject.content.map((block, idx) => {
              if (block.startsWith("H2: ")) {
                return (
                  <h2
                    key={idx}
                    className="text-2xl font-extrabold font-display text-slate-900 pt-6 border-b border-slate-100 pb-3"
                  >
                    {block.replace(/^H2:\s*/, "")}
                  </h2>
                );
              }
              return (
                <p key={idx} className="leading-relaxed">
                  {block}
                </p>
              );
            })}
          </div>

          <AdSenseAd adSlot="AUTO" />
        </div>
      )}

      {/* ======================================================== */}
      {/* PUBLISH SUCCESS MODAL & SITEMAP CONFIRMATION */}
      {/* ======================================================== */}
      {publishedSuccessArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[11px] font-bold font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    PUBLISHED & INDEXED
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    تم نشر المقال وإضافته لخريطة الموقع بنجاح!
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPublishedSuccessArticle(null)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-400 block font-mono">عنوان المقال المنشور:</span>
                <p className="text-base font-bold text-slate-900">{publishedSuccessArticle.title}</p>
                <div className="flex items-center gap-2 text-xs text-blue-600 font-mono pt-1">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>https://qrcodegeneratorx.com/ar/blog/{publishedSuccessArticle.id}</span>
                </div>
              </div>

              <div className="space-y-2.5 bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-2xl text-slate-700">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>يظهر تلقائياً الآن في صفحة المدونة الرئيسية (Blog) وأعلى قائمة المقالات.</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>تمت إضافة رابط المقال مباشرة إلى خريطة الموقع sitemap.xml بـ 8 لغات عالمية.</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>جاهز فوراً لفهرسة جوجل (Google Indexing) وظهور إعلانات AdSense المتوافقة.</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="space-y-2.5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    const articleId = publishedSuccessArticle.id;
                    setPublishedSuccessArticle(null);
                    onNavigate(`blog/${articleId}`);
                  }}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>عرض المقال في المدونة الآن</span>
                </button>

                <button
                  onClick={() => {
                    setPublishedSuccessArticle(null);
                    onNavigate("blog");
                  }}
                  className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>الذهاب لصفحة جميع المقالات</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => downloadUpdatedSitemapXml(customArticles)}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل ملف sitemap.xml المحدّث</span>
                </button>

                <button
                  onClick={() => handleCopyArticleSnippet(publishedSuccessArticle)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {copiedSnippetArticleId === publishedSuccessArticle.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedSnippetArticleId === publishedSuccessArticle.id ? "تم نسخ وسم XML!" : "نسخ وسم XML للمقال"}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => setPublishedSuccessArticle(null)}
                className="text-xs text-slate-400 hover:text-slate-700 font-medium cursor-pointer"
              >
                إغلاق والمتابعة في لوحة الإدارة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: MY PUBLISHED ARTICLES MANAGEMENT */}
      {/* ======================================================== */}
      {activeTab === "manage" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">المقالات المخصصة المنشورة في الموقع</h2>
              <p className="text-xs text-slate-500">
                هذه المقالات تظهر تلقائياً وفورياً في صفحة المدونة الرئيسية وتضاف لخريطة الموقع sitemap.xml.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("sitemap")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>فحص خريطة الموقع Sitemap.xml</span>
              </button>
              <button
                onClick={() => {
                  handleClear();
                  setActiveTab("editor");
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>كتابة مقال جديد</span>
              </button>
            </div>
          </div>

          {customArticles.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <FolderPlus className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">لا توجد مقالات مخصصة منشورة بعد</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                اكتب مقالك الأول في تبويب "كتابة وتنسيق المقال" ثم اضغط "نشر المقال فوراً" ليظهر هنا وفي مدونة الموقع.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customArticles.map((art) => (
                <div
                  key={art.id}
                  className="p-5 border border-slate-200 rounded-2xl hover:border-blue-300 hover:shadow-sm transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{art.category}</span>
                      <span>{art.date}</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2">{art.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{art.summary || art.metaDescription}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadArticleForEditing(art)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>تعديل</span>
                      </button>

                      <button
                        onClick={() => onNavigate(`blog/${art.id}`)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>عرض بالمدونة</span>
                      </button>

                      <button
                        onClick={() => handleCopyArticleSnippet(art)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        title="نسخ وسم XML الخاص بهذا المقال"
                      >
                        {copiedSnippetArticleId === art.id ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Code2 className="w-3 h-3" />
                        )}
                        <span>XML</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteArticle(art.id, art.title)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="حذف المقال"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: DYNAMIC SITEMAP.XML MANAGER */}
      {/* ======================================================== */}
      {activeTab === "sitemap" && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold mb-1.5 border border-emerald-200">
                <Globe className="w-3.5 h-3.5" />
                <span>خريطة الموقع التلقائية (Dynamic Sitemap Generator)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                إدارة وتوليد روابط خريطة الموقع <span className="text-emerald-600 font-mono">sitemap.xml</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed mt-1">
                تُضاف جميع المقالات المنشورة الجديدة تلقائياً إلى خريطة الموقع بجميع اللغات الثمانية (العربية، الإنجليزية، الفرنسية، الإسبانية، الألمانية، الصينية، البرتغالية، اليابانية) بأعلى معايير محركات البحث وأدسنس.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => downloadUpdatedSitemapXml(customArticles)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>تحميل sitemap.xml المحدّث</span>
              </button>

              <button
                onClick={handleCopyFullSitemap}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                {copiedSitemapXml ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSitemapXml ? "تم نسخ XML كامل!" : "نسخ كود XML كاملاً"}</span>
              </button>
            </div>
          </div>

          {/* Live SEO Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">إجمالي الروابط المفهرسة:</span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {sitemapStats.totalUrls.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">جاهزة لـ Google Console</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">الصفحات الثابتة (8 لغات):</span>
              <span className="text-2xl sm:text-3xl font-black text-blue-600 font-mono">
                {sitemapStats.staticCount}
              </span>
              <span className="text-[10px] text-slate-400 block">الرئيسية، كيف يعمل، المميزات...</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">المقالات الأساسية:</span>
              <span className="text-2xl sm:text-3xl font-black text-indigo-600 font-mono">
                {sitemapStats.builtInPostsCount}
              </span>
              <span className="text-[10px] text-slate-400 block">موزعة على 8 لغات</span>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">المقالات المخصصة الجديدة:</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">
                {sitemapStats.customPostsCount}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block">
                {sitemapStats.customArticlesCount} مقال × 8 لغات
              </span>
            </div>
          </div>

          {/* List of Custom Article URLs in Sitemap */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>روابط المقالات المنشورة في خريطة الموقع</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">
                آخر تعديل: {sitemapStats.lastUpdated}
              </span>
            </div>

            {customArticles.length === 0 ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center text-xs text-slate-500">
                لا توجد مقالات مخصصة بعد. عند نشر أي مقال سيظهر هنا تلقائياً مع وسوم XML بجميع اللغات.
              </div>
            ) : (
              <div className="space-y-3">
                {customArticles.map((art) => (
                  <div
                    key={art.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div>
                        <span className="text-xs font-bold text-slate-900">{art.title}</span>
                        <span className="text-[11px] text-slate-400 font-mono block">slug: {art.id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyArticleSnippet(art)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {copiedSnippetArticleId === art.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedSnippetArticleId === art.id ? "تم النسخ!" : "نسخ وسم XML"}</span>
                        </button>
                        <button
                          onClick={() => onNavigate(`blog/${art.id}`)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>معاينة المقال</span>
                        </button>
                      </div>
                    </div>

                    {/* Language Direct URLs Chips */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                      {["ar", "en", "fr", "es", "de", "zh", "pt", "ja"].map((lang) => (
                        <a
                          key={lang}
                          href={`/${lang}/blog/${art.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 transition-colors flex items-center gap-1"
                        >
                          <span className="font-bold uppercase text-slate-400">{lang}:</span>
                          <span>/blog/{art.id}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Raw XML Viewer Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 font-mono">
                <Code2 className="w-4 h-4 text-slate-500" />
                <span>معاينة كود sitemap.xml الحي (Live XML Output):</span>
              </label>
              <button
                onClick={handleCopyFullSitemap}
                className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
              >
                {copiedSitemapXml ? "✓ تم نسخ الكود" : "نسخ الكود بالكامل"}
              </button>
            </div>
            <div className="relative">
              <pre className="p-4 rounded-2xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-72 leading-relaxed border border-slate-800">
                <code>{generateFullSitemapXml(customArticles).slice(0, 3000)}...</code>
              </pre>
              <div className="absolute bottom-2 left-2 bg-slate-900/90 text-slate-400 text-[10px] font-mono px-2 py-1 rounded-md border border-slate-800">
                معاينة أول 3000 حرف من خريطة الموقع
              </div>
            </div>
          </div>
        </div>
      )}

      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}
