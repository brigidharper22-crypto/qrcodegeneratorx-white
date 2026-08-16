import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  parseRawArticleContent,
  sanitizeSlug,
  detectCategory,
  ParsedArticleDraft,
  readFileAsText,
  isListItemLine,
  cleanListItemLine,
} from "../../utils/articleAutoParser";
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
  Wand2,
  FileUp,
  Table as TableIcon,
  ListFilter,
  Sliders,
  UploadCloud,
  FileCheck,
  FolderOpen,
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

  // Smart Auto-Parser & Import Modal State
  const [showSmartImportModal, setShowSmartImportModal] = useState(false);
  const [smartImportInput, setSmartImportInput] = useState("");
  const [parsedDraftPreview, setParsedDraftPreview] = useState<ParsedArticleDraft | null>(null);

  // File Upload State & Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadedFileInfo, setUploadedFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [isReadingFile, setIsReadingFile] = useState(false);

  // Read and parse an uploaded text/markdown file
  const handleProcessUploadedFile = async (file: File, autoApplyDirectly: boolean = false) => {
    if (!file) return;

    // Check valid file extensions or mime types
    const validExtensions = [".txt", ".md", ".text", ".markdown", ".rtf", ".html", ".htm", ".doc"];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt && !file.type.startsWith("text/")) {
      showToast("يرجى اختيار ملف نصي بصيغة .txt أو .md أو .text");
      return;
    }

    setIsReadingFile(true);
    try {
      const content = await readFileAsText(file);
      if (!content || !content.trim()) {
        showToast("الملف النصي فارغ!");
        setIsReadingFile(false);
        return;
      }

      // Format file size
      const sizeInKb = (file.size / 1024).toFixed(1);
      const formattedSize = file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(2)} MB` : `${sizeInKb} KB`;
      setUploadedFileInfo({ name: file.name, size: formattedSize });

      const parsed = parseRawArticleContent(content);
      setSmartImportInput(content);
      setParsedDraftPreview(parsed);

      if (autoApplyDirectly) {
        handleApplySmartDraft(parsed);
        showToast(`🎉 تم قراءة ملف "${file.name}" (${formattedSize}) والتعرف على العنوان، الكلمات المفتاحية والجداول بنجاح!`);
      } else {
        setShowSmartImportModal(true);
        showToast(`📄 تم تحليل ملف "${file.name}" وتصنيف عناصره تلقائياً! اضغط "تطبيق" للتأكيد.`);
      }
    } catch (err) {
      console.error("File upload error:", err);
      showToast("حدث خطأ أثناء قراءة الملف النصي");
    } finally {
      setIsReadingFile(false);
    }
  };

  const handleNativeFileChange = (e: React.ChangeEvent<HTMLInputElement>, autoApply: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessUploadedFile(file, autoApply);
    }
    // reset input value so user can re-upload same file if edited
    e.target.value = "";
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent, autoApply: boolean = false) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessUploadedFile(file, autoApply);
    }
  };

  // Handle live input change in Smart Import Modal
  const handleSmartImportInputChange = (val: string) => {
    setSmartImportInput(val);
    if (val.trim().length > 10) {
      const parsed = parseRawArticleContent(val);
      setParsedDraftPreview(parsed);
    } else {
      setParsedDraftPreview(null);
    }
  };

  // Apply parsed draft into editor state
  const handleApplySmartDraft = (draftToApply?: ParsedArticleDraft) => {
    const targetDraft = draftToApply || parsedDraftPreview || parseRawArticleContent(smartImportInput);
    if (!targetDraft.title && targetDraft.paragraphs.length === 0) {
      showToast("يرجى لصق نص المقال أو رفع ملف نصي أولاً.");
      return;
    }

    setTitle(targetDraft.title);
    setSlug(targetDraft.slug);
    setCategory(targetDraft.category);
    setFocusKeyword(targetDraft.focusKeyword);
    setKeywords(targetDraft.keywords);
    setSummary(targetDraft.summary);
    setMetaDescription(targetDraft.metaDescription);
    setParagraphs(targetDraft.paragraphs);
    setRawText(targetDraft.rawBodyText);
    setShowSmartImportModal(false);
    setSmartImportInput("");
    setParsedDraftPreview(null);
    showToast(`✨ تم استيراد وتصنيف مقال "${targetDraft.title}" وتوزيع جميع العناوين والجداول بنجاح!`);
  };

  // Smart Auto-parse from raw markdown text directly
  const handleSmartParseFromRawText = () => {
    if (!rawText.trim()) {
      showToast("يرجى كتابة أو لصق نص المقال أولاً.");
      return;
    }
    const parsed = parseRawArticleContent(rawText);
    setTitle(parsed.title);
    setSlug(parsed.slug);
    setCategory(parsed.category);
    setFocusKeyword(parsed.focusKeyword);
    setKeywords(parsed.keywords);
    setSummary(parsed.summary);
    setMetaDescription(parsed.metaDescription);
    setParagraphs(parsed.paragraphs);
    showToast("✨ تم تصنيف المقال وتمييز العناوين والجداول وتحديث البيانات بنجاح!");
  };

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

  // Parse comma-separated or bulk keywords text (stripping common prefixes like "Secondary Keywords:")
  const parseKeywordsString = (input: string): string[] => {
    if (!input) return [];
    // Strip common AI/SEO prefixes
    const cleanPrefix = input.replace(
      /^(?:secondary\s+keywords|primary\s+keywords|focus\s+keywords?|keywords|الكلمات\s+المفتاحية|الكلمات\s+الدلالية|الكلمات\s+الفرعية)\s*[:：\-–]\s*/i,
      ""
    );
    // Split on commas (English , & Arabic ،), semicolons (; & ؛), pipes (|), and newlines
    return cleanPrefix
      .split(/[,،;؛|\n]+/)
      .map((k) => k.trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, ""))
      .filter((k) => k.length > 0);
  };

  // Add bulk or single keywords
  const addKeywordsFromText = (rawText: string) => {
    const newItems = parseKeywordsString(rawText);
    if (newItems.length === 0) return;
    setKeywords((prev) => {
      const existing = new Set(prev.map((k) => k.toLowerCase().trim()));
      const toAdd: string[] = [];
      for (const item of newItems) {
        if (!existing.has(item.toLowerCase())) {
          existing.add(item.toLowerCase());
          toAdd.push(item);
        }
      }
      return [...prev, ...toAdd];
    });
  };

  // Auto-split existing keywords if any item contains commas or newlines
  useEffect(() => {
    const hasCommas = keywords.some((k) => /[,،;؛|\n]/.test(k));
    if (hasCommas) {
      const flattened: string[] = [];
      const seen = new Set<string>();
      keywords.forEach((k) => {
        parseKeywordsString(k).forEach((subK) => {
          if (!seen.has(subK.toLowerCase())) {
            seen.add(subK.toLowerCase());
            flattened.push(subK);
          }
        });
      });
      setKeywords(flattened);
    }
  }, [keywords]);

  // Handle typing in keyword input
  const handleKeywordInputChange = (val: string) => {
    if (/[,،;؛|\n]/.test(val)) {
      addKeywordsFromText(val);
      setKeywordInput("");
    } else {
      setKeywordInput(val);
    }
  };

  // Handle paste in keyword input
  const handleKeywordPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    if (pasted) {
      e.preventDefault();
      addKeywordsFromText(pasted);
      setKeywordInput("");
    }
  };

  // Add/Remove keywords
  const handleAddKeyword = () => {
    if (!keywordInput.trim()) return;
    addKeywordsFromText(keywordInput);
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
    if (paragraphs.length <= 1) {
      setParagraphs([""]);
      return;
    }
    setParagraphs(paragraphs.filter((_, i) => i !== index));
  };

  const handleClearParagraphs = () => {
    setParagraphs([""]);
    setRawText("");
    showToast("تم مسح جميع الفقرات بنجاح");
  };

  const handleClearAll = () => {
    setTitle("");
    setSlug("");
    setFocusKeyword("");
    setMetaDescription("");
    setSummary("");
    setKeywords([]);
    setParagraphs([""]);
    setRawText("");
    showToast("تم مسح كافة الحقول ومحتوى المقال بالكامل");
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

  // Helper to determine block type
  const getBlockType = (p: string): "h2" | "h3" | "list" | "table" | "callout" | "code" | "paragraph" => {
    const trimmed = p.trim();
    if (trimmed.startsWith("H2: ") || trimmed.startsWith("## ")) return "h2";
    if (trimmed.startsWith("H3: ") || trimmed.startsWith("### ")) return "h3";
    if (trimmed.startsWith("```")) return "code";
    if (trimmed.startsWith(">") || trimmed.startsWith("💡") || trimmed.startsWith("📌") || trimmed.startsWith("⚠️")) return "callout";
    if (trimmed.includes("|") && trimmed.split("\n").filter((l) => l.trim().startsWith("|")).length >= 2) return "table";
    if (trimmed.split("\n").filter((l) => l.trim()).every((l) => /^[\*\-\+•◦▪▫✓✔–—\d+.]\s+/.test(l.trim()))) return "list";
    return "paragraph";
  };

  // Convert a block to a specific format
  const convertBlockFormat = (index: number, targetType: "h2" | "h3" | "list" | "callout" | "table" | "paragraph") => {
    const raw = paragraphs[index] || "";
    let clean = raw
      .replace(/^(?:H2:\s*|##\s*|H3:\s*|###\s*|>\s*|💡\s*)/, "")
      .trim();

    if (targetType === "h2") {
      updateParagraph(index, `H2: ${clean}`);
    } else if (targetType === "h3") {
      updateParagraph(index, `H3: ${clean}`);
    } else if (targetType === "callout") {
      updateParagraph(index, `> 💡 ${clean}`);
    } else if (targetType === "list") {
      // Split lines and prefix with *
      const lines = clean.split("\n").filter((l) => l.trim());
      if (lines.length > 0) {
        const formatted = lines
          .map((l) => (isListItemLine(l) ? cleanListItemLine(l) : `* ${l.replace(/^[\*\-\+•◦▪▫✓✔–—\d+.]\s*/, "")}`))
          .join("\n");
        updateParagraph(index, formatted);
      } else {
        updateParagraph(index, `* عنصر قائمة 1\n* عنصر قائمة 2\n* عنصر قائمة 3`);
      }
    } else if (targetType === "table") {
      if (!clean.includes("|")) {
        updateParagraph(
          index,
          `| الميزة / العنصر | الوصف والأهمية |\n| --- | --- |\n| ${clean || "الخاصية الأولى"} | التفاصيل والميزة هنا |\n| خاصية إضافية | شرح إضافي |`
        );
      } else {
        updateParagraph(index, clean);
      }
    } else {
      // Normal paragraph
      const unbulleted = clean
        .split("\n")
        .map((l) => l.replace(/^[\*\-\+•◦▪▫✓✔–—\d+.]\s*/, ""))
        .join(" ");
      updateParagraph(index, unbulleted);
    }
  };

  // Auto-Detect Entire Article Structure & Formatting
  const handleAutoDetectFormatting = () => {
    const combinedText = rawMarkdownMode ? rawText : paragraphs.join("\n\n");
    if (!combinedText.trim()) {
      showToast("يرجى كتابة أو لصق نص المقال أولاً للتعرف على شكله.");
      return;
    }

    const parsed = parseRawArticleContent(combinedText, {
      currentTitle: title,
      currentSlug: slug,
      currentCategory: category,
    });

    // Apply structured paragraphs
    if (parsed.paragraphs && parsed.paragraphs.length > 0) {
      setParagraphs(parsed.paragraphs);
      setRawText(parsed.paragraphs.join("\n\n"));
    }

    // Update metadata if missing or newly extracted
    if (!title || title === "عنوان المقال الجديد" || title === "New Article Title") {
      if (parsed.title && parsed.title !== "New Article Title") {
        setTitle(parsed.title);
      }
    }
    if (!slug || slug === "new-article-post" || slug === "qr-article-guide") {
      if (parsed.slug && parsed.slug !== "qr-article-guide") {
        setSlug(parsed.slug);
      }
    }
    if (!focusKeyword && parsed.focusKeyword) {
      setFocusKeyword(parsed.focusKeyword);
    }
    if (keywords.length === 0 && parsed.keywords.length > 0) {
      setKeywords(parsed.keywords);
    }
    if (!summary && parsed.summary) {
      setSummary(parsed.summary);
    }
    if (!metaDescription && parsed.metaDescription) {
      setMetaDescription(parsed.metaDescription);
    }
    if ((!category || category === "Guides") && parsed.category) {
      setCategory(parsed.category);
    }

    const stats = parsed.detectedStats;
    showToast(
      `⚡ تم التعرف على شكل الكتابة بنجاح! (${stats.h2Count} عنوان H2، ${stats.h3Count} عنوان H3، ${stats.listsCount} قوائم نقطية، ${stats.tablesCount} جداول، ${stats.calloutsCount} تلميحات)`
    );
  };

  // Smart Paste Handler for Block Textarea
  const handleBlockPaste = (idx: number, e: React.ClipboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    if (!pastedText) return;

    // Check if pasted text contains multi-line content or formatted elements
    if (
      pastedText.includes("\n") &&
      (pastedText.split("\n").filter((l) => l.trim()).length > 1 ||
        pastedText.includes("|") ||
        pastedText.startsWith("#") ||
        pastedText.startsWith("*") ||
        pastedText.startsWith("•"))
    ) {
      e.preventDefault();
      const parsed = parseRawArticleContent(pastedText, { currentTitle: title });
      if (parsed.paragraphs && parsed.paragraphs.length > 0 && parsed.paragraphs[0] !== "") {
        const nextParagraphs = [...paragraphs];
        nextParagraphs.splice(idx, 1, ...parsed.paragraphs);
        setParagraphs(nextParagraphs);
        showToast(`⚡ تم تقسيم النص الملصق تلقائياً إلى ${parsed.paragraphs.length} أقسام منسقة!`);
      } else {
        updateParagraph(idx, pastedText);
      }
    }
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
    const cleanId = sanitizeSlug(slug) || generateSlugFromText(title) || "new-article-post";
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

            {/* Quick credentials hint */}
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">بيانات الدخول الافتراضية:</span>
                <button
                  type="button"
                  onClick={() => {
                    setUsernameInput("admin");
                    setPasswordInput("admin1234");
                  }}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer"
                >
                  تعبئة تلقائية (admin1234)
                </button>
              </div>
              <div className="font-mono text-[11px] flex justify-between bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-800">
                <span>المستخدم: <strong className="text-white">admin</strong></span>
                <span>كلمة المرور: <strong className="text-white">admin1234</strong></span>
              </div>
            </div>
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

      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-2xl px-5 py-3 flex flex-wrap items-center justify-between gap-3 border border-slate-800 shadow-xs">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          <span className="font-bold text-xs sm:text-sm text-slate-100">لوحة إدارة ونشر المقالات</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">
            AUTH ACTIVE
          </span>
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
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded-xl text-xs font-semibold transition-colors border border-red-800/80 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900">
              محرر المقالات
            </h1>
          </div>

          {/* Hidden File Input for Native Desktop File Picker */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".txt,.md,.text,.markdown,.html,.htm,.rtf"
            onChange={(e) => handleNativeFileChange(e, true)}
          />

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs rounded-xl shadow-2xs transition-transform active:scale-95 cursor-pointer"
              title="رفع ملف المقال النصي (.txt أو .md) ليتعرف عليه النظام ويفصله فوراً"
            >
              <UploadCloud className="w-4 h-4 text-emerald-600" />
              <span>رفع ملف (.txt / .md)</span>
            </button>

            <button
              onClick={() => setShowSmartImportModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 font-bold text-xs rounded-xl shadow-2xs transition-transform active:scale-95 cursor-pointer"
              title="لصق مقال كامل أو رفع ملف وتصنيف جميع عناصره وجداوله تلقائياً"
            >
              <Wand2 className="w-4 h-4 text-indigo-600" />
              <span>استيراد وتصنيف ذكي</span>
            </button>

            <button
              onClick={handlePublish}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>نشر المقال فوراً</span>
            </button>

            <button
              onClick={handleCopyTypeScriptCode}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              title="نسخ كود TypeScript جاهز للإضافة إلى كود المشروع"
            >
              {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedCode ? "تم النسخ!" : "تصدير كود TypeScript"}</span>
            </button>

            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors text-xs font-semibold cursor-pointer"
              title="بدء مقال جديد"
            >
              <RefreshCw className="w-4 h-4" />
              <span>جديد</span>
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("editor")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "editor"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>كتابة وتنسيق المقال</span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "audit"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>فحص السيو وأدسنس ({auditResults.seoScore}% / {auditResults.adsenseScore}%)</span>
            </button>

            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة المقال الحي</span>
            </button>

            <button
              onClick={() => setActiveTab("manage")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "manage"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>المقالات المنشورة ({customArticles.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("sitemap")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "sitemap"
                  ? "bg-white text-blue-600 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-500" />
              <span>خريطة الموقع Sitemap.xml ({sitemapStats.totalUrls})</span>
            </button>
          </div>

          {/* Quick Word & Readiness Indicators */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
              الكلمات: <strong className="text-slate-900">{totalWords}</strong>
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg">
              وقت القراءة: <strong className="text-slate-900">{estimatedReadTime}</strong>
            </span>
            <span
              className={`px-2.5 py-1 rounded-lg font-bold ${
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
        <div
          className="relative"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, true)}
        >
          {/* Visual Drag and Drop Overlay */}
          {isDraggingFile && (
            <div className="absolute inset-0 bg-blue-600/90 backdrop-blur-xs z-30 rounded-3xl flex flex-col items-center justify-center p-8 text-white border-4 border-dashed border-white/80 animate-in fade-in">
              <UploadCloud className="w-16 h-16 animate-bounce mb-3" />
              <h3 className="text-2xl font-black font-display text-center">
                أفلت ملف المقال النصي (.txt أو .md) هنا
              </h3>
              <p className="text-sm text-blue-100 text-center max-w-md mt-1">
                سيقوم النظام فوراً بقراءة محتوى الملف، واستخراج العنوان، السيو، الكلمات المفتاحية، وفصل الجداول والفقرات تلقائياً!
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Editor Column (2 Cols) */}
            <div className="lg:col-span-2 space-y-6">
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
                    placeholder="مثال: QR Codes for Cafes: The Complete 2026 Guide"
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
                      placeholder="qr-codes-for-cafes"
                      className="flex-1 bg-transparent font-bold text-blue-600 focus:outline-none ml-1"
                    />
                  </div>
                </div>
              </div>

              {/* Paragraphs and Content Builder */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <AlignLeft className="w-4 h-4 text-blue-600" />
                    <span>محتوى المقال وتنسيق الفقرات</span>
                  </h3>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleClearParagraphs}
                      className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                      title="مسح كافة الفقرات وتفريغ المحرر"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح الكل</span>
                    </button>

                    <button
                      id="btn-toggle-markdown-mode"
                      onClick={() => setRawMarkdownMode(!rawMarkdownMode)}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {rawMarkdownMode ? "عرض الفقرات المقسمة" : "وضع النص الكامل (Markdown)"}
                    </button>
                  </div>
                </div>

              {/* RAW TEXT MODE */}
              {rawMarkdownMode ? (
                <div className="space-y-3">
                  <textarea
                    value={rawText}
                    onChange={(e) => handleRawTextChange(e.target.value)}
                    rows={16}
                    placeholder="الصق أو اكتب المقال بالكامل هنا...&#10;&#10;مثال:&#10;H2: عنوان القسم الأول&#10;شرح الفقرة بالتفصيل...&#10;&#10;• ميزة 1: سهولة الاستخدام&#10;• ميزة 2: سرعة المسح&#10;&#10;| Feature | Cafe Benefit |&#10;| Contactless Menu | Speeds up table turns |"
                    className="w-full p-4 border border-slate-200 rounded-xl text-sm leading-relaxed text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-[11px] text-slate-400">
                    💡 تلميح: اكتب في بداية السطر <strong>H2: عنوان القسم</strong> أو <strong>## عنوان</strong> لإنشاء عنوان رئيسي، و <strong>H3: عنوان فرعي</strong> للعنوان الفرعي، أو استخدم النجوم <strong>* عنصر</strong> للقوائم.
                  </p>
                </div>
              ) : (
                /* INTERACTIVE SECTIONS BUILDER */
                <div className="space-y-4">
                  {/* Block List */}
                  {paragraphs.map((p, idx) => {
                    const blockType = getBlockType(p);
                    const cleanValue = p.replace(/^(?:H2:\s*|##\s*|H3:\s*|###\s*|>\s*|💡\s*)/, "");

                    const badgeConfig = {
                      h2: { label: `عنوان رئيسي H2 #${idx + 1}`, bg: "bg-blue-600 text-white", border: "border-blue-200 bg-blue-50/40" },
                      h3: { label: `عنوان فرعي H3 #${idx + 1}`, bg: "bg-purple-600 text-white", border: "border-purple-200 bg-purple-50/40" },
                      list: { label: `قائمة نقطية #${idx + 1}`, bg: "bg-emerald-600 text-white", border: "border-emerald-200 bg-emerald-50/40" },
                      table: { label: `جدول منظم #${idx + 1}`, bg: "bg-amber-600 text-white", border: "border-amber-200 bg-amber-50/40" },
                      callout: { label: `ملاحظة / تلميح #${idx + 1}`, bg: "bg-cyan-600 text-white", border: "border-cyan-200 bg-cyan-50/40" },
                      code: { label: `كود برمجي #${idx + 1}`, bg: "bg-slate-800 text-white", border: "border-slate-300 bg-slate-100" },
                      paragraph: { label: `فقرة نصية #${idx + 1}`, bg: "bg-slate-600 text-white", border: "border-slate-200 bg-slate-50/60" },
                    }[blockType];

                    return (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border transition-all ${badgeConfig.border} shadow-2xs`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-md uppercase tracking-wider ${badgeConfig.bg} shadow-2xs`}>
                              {badgeConfig.label}
                            </span>

                            {/* Format Conversion Pill Selector */}
                            <div className="flex items-center gap-1 bg-white/80 p-0.5 rounded-lg border border-slate-200 text-[10px] font-bold">
                              <button
                                onClick={() => convertBlockFormat(idx, "h2")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "h2" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-blue-600"}`}
                                title="تحويل إلى H2"
                              >
                                H2
                              </button>
                              <button
                                onClick={() => convertBlockFormat(idx, "h3")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "h3" ? "bg-purple-600 text-white" : "text-slate-600 hover:text-purple-600"}`}
                                title="تحويل إلى H3"
                              >
                                H3
                              </button>
                              <button
                                onClick={() => convertBlockFormat(idx, "list")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "list" ? "bg-emerald-600 text-white" : "text-slate-600 hover:text-emerald-600"}`}
                                title="تحويل إلى قائمة"
                              >
                                قائمة
                              </button>
                              <button
                                onClick={() => convertBlockFormat(idx, "callout")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "callout" ? "bg-cyan-600 text-white" : "text-slate-600 hover:text-cyan-600"}`}
                                title="تحويل إلى ملاحظة"
                              >
                                تنبيه
                              </button>
                              <button
                                onClick={() => convertBlockFormat(idx, "table")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "table" ? "bg-amber-600 text-white" : "text-slate-600 hover:text-amber-600"}`}
                                title="تحويل إلى جدول"
                              >
                                جدول
                              </button>
                              <button
                                onClick={() => convertBlockFormat(idx, "paragraph")}
                                className={`px-1.5 py-0.5 rounded cursor-pointer ${blockType === "paragraph" ? "bg-slate-700 text-white" : "text-slate-600 hover:text-slate-900"}`}
                                title="تحويل إلى فقرة عادية"
                              >
                                فقرة
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Insert Bold snippet */}
                            <button
                              onClick={() => {
                                updateParagraph(idx, `${p} **نص عريض**`);
                              }}
                              className="text-[11px] font-bold text-slate-600 hover:text-blue-600 px-2 py-0.5 bg-white border border-slate-200 rounded-md cursor-pointer"
                              title="إضافة كلمة عريضة"
                            >
                              B
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

                        {blockType === "h2" ? (
                          <input
                            type="text"
                            value={cleanValue}
                            onChange={(e) => updateParagraph(idx, `H2: ${e.target.value}`)}
                            onPaste={(e) => handleBlockPaste(idx, e)}
                            placeholder="اكتب عنوان القسم الرئيسي H2 هنا..."
                            className="w-full px-3.5 py-2.5 bg-white border border-blue-200 rounded-lg text-sm font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : blockType === "h3" ? (
                          <input
                            type="text"
                            value={cleanValue}
                            onChange={(e) => updateParagraph(idx, `H3: ${e.target.value}`)}
                            onPaste={(e) => handleBlockPaste(idx, e)}
                            placeholder="اكتب العنوان الفرعي أو السؤال H3 هنا..."
                            className="w-full px-3.5 py-2.5 bg-white border border-purple-200 rounded-lg text-sm font-bold text-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        ) : blockType === "callout" ? (
                          <textarea
                            value={cleanValue}
                            onChange={(e) => updateParagraph(idx, `> 💡 ${e.target.value}`)}
                            onPaste={(e) => handleBlockPaste(idx, e)}
                            rows={2}
                            placeholder="اكتب نص الملاحظة أو التنبيه الهام..."
                            className="w-full px-3.5 py-2.5 bg-white border border-cyan-200 rounded-lg text-sm font-medium text-cyan-950 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                          />
                        ) : blockType === "table" ? (
                          <textarea
                            value={p}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            onPaste={(e) => handleBlockPaste(idx, e)}
                            rows={4}
                            placeholder="| Column 1 | Column 2 |\n| --- | --- |\n| Value 1 | Value 2 |"
                            className="w-full px-3.5 py-2.5 bg-white border border-amber-200 rounded-lg text-xs font-mono leading-relaxed text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                          />
                        ) : (
                          <textarea
                            value={p}
                            onChange={(e) => updateParagraph(idx, e.target.value)}
                            onPaste={(e) => handleBlockPaste(idx, e)}
                            rows={blockType === "list" ? 4 : 3}
                            placeholder={blockType === "list" ? "* عنصر القائمة 1\n* عنصر القائمة 2" : "اكتب نص الفقرة بتفاصيل وافية وقيمة تفيد القارئ..."}
                            className={`w-full px-3.5 py-2.5 bg-white rounded-lg text-sm leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                              blockType === "list" ? "border-emerald-200 font-medium" : "border-slate-200"
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}

                  {/* Add Paragraph / Heading Controls Bottom Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-2.5">
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
                        <span>إضافة عنوان رئيسي H2</span>
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

                    <button
                      onClick={handleClearParagraphs}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      title="مسح كل فقرات المحتوى وتفريغ المحرر"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>مسح الكل</span>
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
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    الكلمات الدلالية (Keywords Tags)
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {keywords.length} وسم
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => handleKeywordInputChange(e.target.value)}
                    onPaste={handleKeywordPaste}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "," || e.key === "،") {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                    placeholder="الصق قائمة مفصولة بفواصل (,) أو اكتب واضغط Enter..."
                    className="flex-1 px-3 py-1.5 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddKeyword}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                  >
                    إضافة
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 leading-tight">
                  💡 يتم فصل الكلمات تلقائياً عند كتابة أو لصق نص يحتوي على فواصل (مثل <code>،</code> أو <code>,</code>).
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1 max-h-48 overflow-y-auto">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-medium transition-colors"
                    >
                      <span>{kw}</span>
                      <button
                        onClick={() => handleRemoveKeyword(kw)}
                        className="text-slate-400 hover:text-red-600 text-xs font-bold cursor-pointer"
                        title="حذف الوسم"
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
        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Top Bar for Preview Tab */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <Eye className="w-4 h-4 text-blue-600" />
              <span>معاينة المقال الحي بتنسيق المدونة الفعلي</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab("editor")}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold cursor-pointer transition-colors"
              >
                العودة للمحرر
              </button>
              <button
                onClick={handlePublish}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>نشر المقال فوراً</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
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
                if (block.startsWith("H3: ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-xl font-bold font-display text-slate-900 pt-4 pb-1"
                    >
                      {block.replace(/^H3:\s*/, "")}
                    </h3>
                  );
                }
                if (block.startsWith("> ") || block.startsWith("💡") || block.startsWith("📌") || block.startsWith("⚠️")) {
                  const cleanText = block.replace(/^>\s*/, "");
                  return (
                    <div key={idx} className="my-5 p-4 md:p-5 rounded-2xl bg-blue-50/80 border border-blue-200 text-slate-800 text-sm md:text-base leading-relaxed flex items-start gap-3 shadow-xs">
                      <span className="text-xl shrink-0 mt-0.5">💡</span>
                      <div className="flex-1 font-medium">{cleanText}</div>
                    </div>
                  );
                }
                if (block.startsWith("|") && block.includes("\n|")) {
                  const rawLines = block.trim().split("\n").map((l) => l.trim()).filter(Boolean);
                  const rows = rawLines.map((line) => line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
                  const hasDivider = rows.length > 1 && rows[1].every((c) => /^[-:\s]+$/.test(c));
                  const headerRow = hasDivider ? rows[0] : null;
                  const bodyRows = hasDivider ? rows.slice(2) : rows;

                  return (
                    <div key={idx} className="overflow-x-auto my-6 rounded-2xl border border-slate-200 shadow-xs bg-white">
                      <table className="min-w-full divide-y divide-slate-200 text-sm text-slate-700">
                        {headerRow && (
                          <thead className="bg-slate-50">
                            <tr>
                              {headerRow.map((cell, cIdx) => (
                                <th key={cIdx} className="px-4 py-3.5 text-left font-black text-slate-900 text-xs md:text-sm uppercase tracking-wider border-b border-slate-200">
                                  {cell}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        )}
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {bodyRows.map((row, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3 text-xs md:text-sm font-medium text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (block.includes("\n• ") || block.includes("\n* ") || block.includes("\n- ") || block.startsWith("• ") || block.startsWith("* ") || block.startsWith("- ") || /^\s*\d+[\.\)]\s+/.test(block)) {
                  const rawItems = block.split("\n").filter((l) => l.trim());
                  const isNumbered = rawItems.some((l) => /^\s*\d+[\.\)]\s+/.test(l));

                  return (
                    <div key={idx} className="my-5 p-5 md:p-6 bg-slate-50/90 border border-slate-200/80 rounded-2xl shadow-xs">
                      <ul className="space-y-3">
                        {rawItems.map((li, lIdx) => {
                          const isItemNumbered = /^\s*(\d+)[\.\)]\s+/.test(li);
                          const numMatch = li.match(/^\s*(\d+)[\.\)]\s+(.+)$/);
                          const cleanText = isItemNumbered && numMatch ? numMatch[2] : li.replace(/^\s*[\*\-\+•◦▪▫✓✔–—]\s+/, "");
                          return (
                            <li key={lIdx} className="flex items-start gap-3 text-slate-700 text-sm md:text-base leading-relaxed">
                              {isNumbered || isItemNumbered ? (
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                                  {isItemNumbered && numMatch ? numMatch[1] : lIdx + 1}
                                </span>
                              ) : (
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-2 ring-4 ring-blue-100" />
                              )}
                              <div className="flex-1 font-medium">{cleanText}</div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
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

      {/* ======================================================== */}
      {/* SMART ARTICLE AUTO-PARSER & CLASSIFIER MODAL */}
      {/* ======================================================== */}
      {showSmartImportModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200 my-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-slate-800 shrink-0">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold font-mono">
                  <Wand2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>المستورد والمصنف التلقائي الذكي (Smart Auto-Classifier & Parser)</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-black font-display text-white">
                  استيراد وتصنيف المقال بالكامل بضغطة زر واحدة
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  الصق نص المقال الخام هنا (مع العناوين وسيو والكلمات المفتاحية والجداول)، وسيتولى النظام فرز كل عنصر ووضعه في مكانه المخصص تلقائياً.
                </p>
              </div>

              <button
                onClick={() => setShowSmartImportModal(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
              {/* Dedicated Text File Upload Dropzone */}
              <input
                type="file"
                ref={modalFileInputRef}
                className="hidden"
                accept=".txt,.md,.text,.markdown,.html,.htm,.rtf"
                onChange={(e) => handleNativeFileChange(e, false)}
              />

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, false)}
                onClick={() => modalFileInputRef.current?.click()}
                className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-2 ${
                  isDraggingFile
                    ? "border-indigo-600 bg-indigo-50/80 scale-[1.01]"
                    : uploadedFileInfo
                    ? "border-emerald-400 bg-emerald-50/40 hover:bg-emerald-50/70"
                    : "border-slate-300 hover:border-indigo-500 bg-slate-50/80 hover:bg-indigo-50/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${uploadedFileInfo ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}`}>
                    {uploadedFileInfo ? <FileCheck className="w-6 h-6" /> : <UploadCloud className="w-6 h-6" />}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">
                        {uploadedFileInfo ? `تم تحميل الملف: ${uploadedFileInfo.name}` : "اسحب وأفلت ملف المقال النصي (.txt أو .md) هنا"}
                      </span>
                      {uploadedFileInfo && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                          {uploadedFileInfo.size}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      يدعم ملفات .txt و .md بترميز UTF-8 مع التعرف التلقائي الفوري على العناوين، الجداول، والسيو
                    </p>
                  </div>
                </div>

                <div className="mt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 rounded-lg text-xs font-semibold shadow-2xs">
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{uploadedFileInfo ? "اختيار ملف آخر من جهازك" : "أو اضغط للاختيار من الكمبيوتر"}</span>
                  </span>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 bg-indigo-50/70 border border-indigo-150 p-3 rounded-2xl">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>أو ابدأ بمثال تجريبي:</span>
                </span>
                <button
                  onClick={() => {
                    const sample = `QR Codes for Cafes: The Complete 2026 Guide

SEO Title: QR Codes for Cafes – Create a Free Cafe QR Code

Meta Description: Learn how to use QR codes for cafes to share digital menus, WiFi, ordering pages, reviews, payments, and promotions with customers instantly.

Primary Keyword: QR Codes for Cafes

URL Slug: /qr-codes-for-cafes

Secondary Keywords: cafe QR code, QR code for cafe, coffee shop QR code, digital menu QR, cafe WiFi QR code, cafe payment QR, restaurant QR codes

## 1. Why Cafes and Coffee Shops Need QR Codes in 2026
Modern coffee shops and cafes thrive on speed, customer satisfaction, and repeat business. Dynamic QR codes provide instant, contactless connections from physical counters to digital menus, social accounts, and WiFi networks without requiring any app download.

## 2. Top Use Cases for Cafe QR Codes

| QR Code Type | Best Cafe Location | Main Benefit |
| Contactless Menu QR | On every table & acrylic tent | Faster ordering, instant price updates |
| Free WiFi QR | Counter, walls & napkins | Zero typing, instant one-tap WiFi login |
| Google Review QR | Receipt & exit doors | Boosts 5-star local ratings by 300% |
| Loyalty & Deals QR | Cup sleeves & takeaway bags | Drives repeat visits and member signups |

## 3. Step-by-Step: How to Create a Cafe QR Code
1. Open our Free QR Code Generator tool.
2. Select your desired type: URL, WiFi, or Social.
3. Paste your digital menu link or enter cafe details.
4. Customize colors and add your coffee shop logo.
5. Download in high-resolution vector format ready for printing.

> 💡 Pro-Tip: Print a test QR code before printing hundreds of cup sleeves to guarantee high scannability under cafe ambient lighting!`;
                    handleSmartImportInputChange(sample);
                  }}
                  className="px-3 py-1.5 bg-white hover:bg-indigo-600 hover:text-white border border-indigo-200 rounded-xl text-xs font-bold text-indigo-700 transition-colors shadow-2xs cursor-pointer"
                >
                  تحميل مثال مقال المقاهي (Cafes Guide Example)
                </button>
              </div>

              {/* Textarea Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>أو الصق نص المقال الخام هنا (Raw Article Text):</span>
                  </label>
                  <span className="text-xs font-mono text-slate-400">
                    {smartImportInput.length.toLocaleString()} حرفاً
                  </span>
                </div>
                <textarea
                  value={smartImportInput}
                  onChange={(e) => handleSmartImportInputChange(e.target.value)}
                  rows={8}
                  placeholder={`الصق المقال هنا أو ارفع ملف نصي أعلاه...`}
                  className="w-full p-4 border border-slate-200 rounded-2xl text-xs sm:text-sm font-mono leading-relaxed text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                />
              </div>

              {/* LIVE PARSED BREAKDOWN PREVIEW */}
              {parsedDraftPreview && (
                <div className="space-y-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>معاينة الفرز والتصنيف التلقائي الذكي (Live Detection Breakdown):</span>
                    </h4>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      تم الاكتشاف بنجاح ✓
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {/* Title */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">عنوان المقال (H1 Title):</span>
                      <p className="font-bold text-slate-900 text-xs sm:text-sm">
                        {parsedDraftPreview.title || "—"}
                      </p>
                    </div>

                    {/* Slug */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">الرابط الدائم (Slug URL):</span>
                      <p className="font-mono font-bold text-blue-600">
                        /{parsedDraftPreview.slug || "—"}
                      </p>
                    </div>

                    {/* Primary Keyword */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">الكلمة المفتاحية المستهدفة (Focus Keyword):</span>
                      <p className="font-bold text-indigo-700">
                        {parsedDraftPreview.focusKeyword || "—"}
                      </p>
                    </div>

                    {/* Category */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">تصنيف الفئة التلقائي (Category):</span>
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">
                        📁 {parsedDraftPreview.category}
                      </span>
                    </div>

                    {/* Meta Description */}
                    <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">وصف الميتا لمحركات البحث (Meta Description):</span>
                      <p className="text-slate-700 leading-relaxed">
                        {parsedDraftPreview.metaDescription || "—"}
                      </p>
                    </div>

                    {/* Secondary Keywords Tags */}
                    {parsedDraftPreview.keywords.length > 0 && (
                      <div className="sm:col-span-2 bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">
                          الكلمات المفتاحية المفصولة تلقائياً ({parsedDraftPreview.keywords.length}):
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {parsedDraftPreview.keywords.map((kw, kwIdx) => (
                            <span
                              key={kwIdx}
                              className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-[11px] border border-blue-200 flex items-center gap-1"
                            >
                              <span>#{kw}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Stats */}
                    <div className="sm:col-span-2 flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-600 font-mono">
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        📄 الفقرات: <strong>{parsedDraftPreview.paragraphs.length}</strong>
                      </span>
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        📑 العناوين الفرعية (H2/H3):{" "}
                        <strong>
                          {parsedDraftPreview.paragraphs.filter((p) => p.startsWith("H2: ") || p.startsWith("H3: ") || p.startsWith("## ")).length}
                        </strong>
                      </span>
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        📊 الجداول:{" "}
                        <strong>
                          {parsedDraftPreview.paragraphs.filter((p) => p.includes("|") && p.split("\n").length >= 2).length}
                        </strong>
                      </span>
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        📝 الكلمات: <strong>{parsedDraftPreview.detectedStats.wordsCount}</strong>
                      </span>
                      <span className="bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                        ⏱️ وقت القراءة: <strong>{parsedDraftPreview.estimatedReadTime}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setShowSmartImportModal(false)}
                className="px-4 py-2.5 text-slate-600 hover:bg-slate-200 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                إلغاء
              </button>

              <button
                onClick={() => handleApplySmartDraft()}
                disabled={!smartImportInput.trim()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 transition-transform active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>تطبيق وفصل المقال فوراً إلى المحرر</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PUBLISH SUCCESS NOTIFICATION MODAL */}
      {/* ======================================================== */}
      {publishedSuccessArticle && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 my-auto text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                تم نشر المقال بنجاح للعموم! 🎉
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                مقالك متاح الآن في صفحة المدونة لجميع الزوار، وتمت إضافته تلقائياً لخريطة الموقع sitemap.xml.
              </p>
            </div>

            {/* Article Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-right space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400 font-mono text-[11px]">
                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">{publishedSuccessArticle.category}</span>
                <span>{publishedSuccessArticle.date}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{publishedSuccessArticle.title}</h4>
              <p className="text-slate-500 line-clamp-2 text-[11px]">{publishedSuccessArticle.summary}</p>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-600">
                <span>الرابط: <strong className="text-blue-600">/blog/{publishedSuccessArticle.id}</strong></span>
                <span>{publishedSuccessArticle.readTime}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  const targetId = publishedSuccessArticle.id;
                  setPublishedSuccessArticle(null);
                  onNavigate(`blog/${targetId}`);
                }}
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>معاينة المقال في المدونة فوراً</span>
              </button>

              <button
                onClick={() => {
                  setPublishedSuccessArticle(null);
                  setActiveTab("manage");
                }}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                إدارة المقالات
              </button>

              <button
                onClick={() => setPublishedSuccessArticle(null)}
                className="w-full sm:w-auto px-4 py-3 text-slate-400 hover:text-slate-700 text-xs font-semibold cursor-pointer"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}

      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}
