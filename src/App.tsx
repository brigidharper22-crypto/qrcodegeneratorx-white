import { useState, useEffect, useCallback, useMemo, Fragment, lazy, Suspense } from "react";
import { useI18n, SUPPORTED_LOCALES } from "./hooks/useI18n";
import { Locale } from "./types";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { MediavineAdScript, AdSlot, AD_PLACEMENTS } from "./components/ads/MediavineAd";
import { AdSenseAd } from "./components/ads/AdSenseAd";
import JsonLd from "./components/seo/JsonLd";
import FAQAccordion from "./components/ui/FAQAccordion";
import { BLOG_POSTS } from "./data/blogData";
import { getBlogPostsForLocale } from "./data/blogTranslations";
import { syncArticlesWithServer } from "./utils/customArticlesStorage";

const QRGenerator = lazy(() => import("./components/tool/QRGenerator"));
const BlogCard = lazy(() => import("./components/ui/BlogCard").then(m => ({ default: m.BlogCard })));
const BlogPostDetail = lazy(() => import("./components/ui/BlogCard").then(m => ({ default: m.BlogPostDetail })));

const HowItWorksView = lazy(() => import("./components/views/StaticPages").then(m => ({ default: m.HowItWorksView })));
const FeaturesView = lazy(() => import("./components/views/StaticPages").then(m => ({ default: m.FeaturesView })));
const PrivacyPolicyView = lazy(() => import("./components/views/StaticPages").then(m => ({ default: m.PrivacyPolicyView })));
const TermsView = lazy(() => import("./components/views/StaticPages").then(m => ({ default: m.TermsView })));
const ArticleEditorView = lazy(() => import("./components/views/ArticleEditorView").then(m => ({ default: m.ArticleEditorView })));
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  ShieldAlert,
  Download,
  FolderLock,
  Zap,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Search,
  ChevronRight,
} from "lucide-react";

// --- HOME & STRUCTURAL PAGE TRANSLATIONS ---
const HOME_TRANSLATION_MAP: Record<string, {
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitleSuffix: string;
  
  stepsHeader1: string;
  stepsHeader2: string;
  stepsDesc: string;
  
  featuresHeader1: string;
  featuresHeader2: string;
  featuresDesc: string;
  features: Array<{ title: string; text: string }>;
  
  testimonialsHeader1: string;
  testimonialsHeader2: string;
  testimonialsDesc: string;
  testimonials: Array<{ name: string; role: string; text: string }>;
  
  faqHeader1: string;
  faqHeader2: string;
  faqDesc: string;
  faqBtn: string;
  
  blogHeader1: string;
  blogHeader2: string;
  blogDesc: string;
  blogBtnLog: string;
  blogBtnAll: string;
  
  ctaBadge: string;
  ctaHeader: string;
  ctaDesc: string;
  ctaBtn: string;
  
  blogIndexHeader1: string;
  blogIndexHeader2: string;
  blogIndexDesc: string;
  
  faqIndexHeader1: string;
  faqIndexHeader2: string;
  faqIndexDesc: string;
}> = {
  ar: {
    heroBadge: "توليد فوري لملفات متجهة فائقة الدقة",
    heroTitle1: "مولد كود الـ QR",
    heroTitle2: "مجاناً",
    heroSubtitleSuffix: "صانع ومولد كود QR احترافي وسريع عبر الإنترنت",
    stepsHeader1: "أنشئ الرموز في",
    stepsHeader2: "3 خطوات سريعة",
    stepsDesc: "يقوم محركنا الآمن والمحلي بتجميع وبناء الرموز في أجزاء من الثانية. هكذا تبدو الخطوات التفصيلية وبكل بساطة.",
    featuresHeader1: "مجهز بـ",
    featuresHeader2: "مميزات بريميوم فائقة",
    featuresDesc: "احصل على أقصى مرونة للتصميم والتحكم بدون قيود أو فترات تجريبية أو حدود مسح.",
    features: [
      { title: "10 أنواع من المحتوى", text: "أنشئ رموزاً للروابط، وجهات الاتصال vCard، شبكات الواي فاي، رسائل SMS، المواقع الجغرافية، ومحافظ العملات الرقمية." },
      { title: "قوالب وتنسيقات جمالية", text: "طابق هوية شركتك فوراً باستخدام 6 لوحات ألوان مسبقة الصنع أو عبر اختيار اللون السداسي Hex يدوياً." },
      { title: "إدراج الشعار في المنتصف", text: "ارفع شعار شركتك بصيغة PNG أو JPG. سيقوم محركنا بموائمته بالمنتصف وحمايته من التداخل تلقائياً." },
      { title: "تصحيح أخطاء ريد-سولومون", text: "اضبط معدل تعديل وتصحيح الأخطاء (L, M, Q, H) لتضمن أن تظل الرموز التالفة أو المطبوعة تعمل بشكل مثالي." },
      { title: "تصدير متجهات عالية الدقة", text: "حمل الرمز بصيغة PNG للشاشات، أو كملف متجه SVG للطباعة الكبيرة، أو ملف PDF بأحجام من 128 إلى 1024 بكسل." },
      { title: "خصوصية تامة 100%", text: "تتم كامل عمليات المعالجة وبناء المصفوفة وتوليد الملفات في ذاكرة متصفحك محلياً بشكل آمن دون أي رفع سحابي." }
    ],
    testimonialsHeader1: "ماذا يقول",
    testimonialsHeader2: "عملاؤنا عنا",
    testimonialsDesc: "انضم إلى آلاف الشركات والمطاعم ومطوري الويب حول العالم الذين يستعينون بـ qrcodegeneratorx يومياً.",
    testimonials: [
      { name: "ماركوس ف.", role: "رئيس التسويق في بيرانكو", text: "لقد أنقذ qrcodegeneratorx حملة إطلاق الكتالوج المطبوع لشركتنا. حملنا ملفات SVG المتجهة وظلت حادة ونقية جداً في البوسترات الضخمة، فضلاً عن أنه مجاني تماماً!" },
      { name: "إيلينا ر.", role: "مالكة مطعم", text: "كان إعداد رموز الرموز المطبوعة لطاولات مطعمي تجربة مذهلة. المولد يدمج شعار مطعمنا مع تفاصيل اتصال الواي فاي لزبائننا لتتصل هواتفهم فورا." },
      { name: "ديف ك.", role: "مصمم جرافيك محترف", text: "الأداة الأفضل من نوعها على الإطلاق. لا اشتراكات، ولا تسجيل لإنشاء حسابات، ولا ملفات تعريف ارتباط مزعجة. توليد الرموز فائق السرعة." }
    ],
    faqHeader1: "الأسئلة الشائعة",
    faqHeader2: "والأجوبة",
    faqDesc: "هل لديك أي استفسار؟ لدينا إجابات تفصيلية واحترافية عن أبرز الأسئلة التي يطرحها أصحاب الأعمال والمطورون.",
    faqBtn: "استكشف كافة الإجابات الـ 20",
    blogHeader1: "أحدث المقالات من",
    blogHeader2: "مدونتنا المهنية",
    blogDesc: "قم بتحسين عمليات شركتك وتصميماتك وقابلية قراءة رموزك التسويقية مع نصائح احترافية حصرية من خبرائنا.",
    blogBtnLog: "اقرأ المقال",
    blogBtnAll: "اقرأ كافة المقالات",
    ctaBadge: "ابدأ فوراً — لا يتطلب أي بطاقات ائتمان",
    ctaHeader: "جاهز لإنشاء كود الـ QR الخاص بك؟",
    ctaDesc: "أنشئ أكواد QR دائمة وجاهزة للطباعة والترويج بألوان مخصصة وشعار مميز وبدرجات تصحيح الخطأ المرتفعة.",
    ctaBtn: "أطلق أداة المولد الآن",
    blogIndexHeader1: "مقالات حصرية و",
    blogIndexHeader2: "مدونة الخبراء",
    blogIndexDesc: "ابق على اطلاع دائم بقوائم المراجعة التقنية، وكتيبات الحملات التسويقية، وهندسة قابلية القراءة والمسح الضوئي مباشرة من مطبعتنا الرقمية.",
    faqIndexHeader1: "الأسئلة الشائعة",
    faqIndexHeader2: "والاستفسارات",
    faqIndexDesc: "دليل الدعم الشامل الذي يغطي الأسئلة العامة، وتخصيص العلامات التجارية للشركات، والمعايير التقنية ومواصفات الطباعة والخصوصية والتشفير."
  },
  en: {
    heroBadge: "Instant high-fidelity vector generation",
    heroTitle1: "Free QR Code",
    heroTitle2: "Generator",
    heroSubtitleSuffix: "Professional Online QR Code Maker",
    stepsHeader1: "Generate Codes in",
    stepsHeader2: "3 Fast Steps",
    stepsDesc: "Our secure, browser-native engine compiles structured codes in milliseconds. Here is how simple the process is.",
    featuresHeader1: "Packed with",
    featuresHeader2: "Premium Features",
    featuresDesc: "Get maximum design flexibility with zero monthly subscriptions, trial warnings, or scan limitations.",
    features: [
      { title: "10 Media Formats", text: "Create codes for web URLs, personal vCard contacts, guest Wi-Fi networks, SMS texting, geography locations, and cryptocurrency wallets." },
      { title: "Aesthetic Templates", text: "Match your company branding instantly using our 6 curated contrast color presets or use custom hex pickers manually." },
      { title: "Centralized Logos", text: "Upload your corporate trademark PNG or JPG. Our engine crops, isolates, masks, and centers the logo correctly." },
      { title: "Reed-Solomon Correction", text: "Finetune error adjustment arrays (L, M, Q, H presets) so dirty, scraped, or logo-covered printed squares scan perfectly." },
      { title: "Lossless Vector Exports", text: "Download web-ready PNG, lossless vector SVG, or printable vector PDF formats at sizes from 128px up to 1024px." },
      { title: "100% Secure Privacy", text: "All parsing, binarization, and image packaging happen inside your local browser memory space. No remote uploads." }
    ],
    testimonialsHeader1: "What Our Users",
    testimonialsHeader2: "Are Saying",
    testimonialsDesc: "Join thousands of business teams, restaurants, and individuals globally using qrcodegeneratorx daily.",
    testimonials: [
      { name: "Markus V.", role: "Marketing Lead at BrandCo", text: "qrcodegeneratorx saved our catalog launch. Downloaded vector SVGs remained perfectly sharp at poster sizes, completely free! No monthly trial limits." },
      { name: "Elena R.", role: "Restaurant Proprietor", text: "Setting up guest tabletop menus was a breeze. Auto-masks our restaurant logo and Wi-Fi credential codes flawlessly. Our customers scan them instantly." },
      { name: "Dave K.", role: "Graphic Designer", text: "The best client-side tool on the web. No payments, no account signups, zero tracking cookies. High-resolution canvas rendering is exceptionally fast." }
    ],
    faqHeader1: "Frequently Asked",
    faqHeader2: "Questions",
    faqDesc: "Got queries? We have exhaustive, professional solutions to the most common questions raised by developers and businesses.",
    faqBtn: "Explore all 20 Answers",
    blogHeader1: "Latest from Our",
    blogHeader2: "Professional Blog",
    blogDesc: "Finetune your corporate operations, designs, scannability, and analytics with insights from our editorial workspace.",
    blogBtnLog: "Read Post",
    blogBtnAll: "Read all Articles",
    ctaBadge: "Start instantly — No credit cards",
    ctaHeader: "Ready to Build Your Custom QR Code?",
    ctaDesc: "Generate permanent, hi-res QR codes equipped with custom parameters, custom color schemes, error rates and logo overlays.",
    ctaBtn: "Launch Generator Tool",
    blogIndexHeader1: "Editorial",
    blogIndexHeader2: "Insights & Blog",
    blogIndexDesc: "Stay up-to-date with technical checklists, campaign guides, design matrices, and scannability optimization metrics direct from our print panel.",
    faqIndexHeader1: "Frequently Asked",
    faqIndexHeader2: "Questions",
    faqIndexDesc: "Exhaustive support guide covering general questions, custom corporate branding, technical parameters, print specifications, and client-side encryption."
  },
  fr: {
    heroBadge: "Génération vectorielle haute fidélité instantanée",
    heroTitle1: "Code QR",
    heroTitle2: "Gratuit",
    heroSubtitleSuffix: "Créateur de QR Code en ligne professionnel",
    stepsHeader1: "Générez des codes en",
    stepsHeader2: "3 étapes rapides",
    stepsDesc: "Notre moteur sécurisé compile les codes structurés en millisecondes. Voici comment le processus est simple.",
    featuresHeader1: "Rempli de",
    featuresHeader2: "fonctionnalités Premium",
    featuresDesc: "Bénéficiez d'une flexibilité de conception maximale sans abonnements mensuels, alertes d'essai ou limites.",
    features: [
      { title: "10 formats médias", text: "Configurez des codes pour des URL, contacts vCard, réseaux Wi-Fi, textos SMS, et coordonnées géographiques." },
      { title: "Modèles esthétiques", text: "Harmonisez l'image commerciale en utilisant nos préréglages visuels contrastés ou des palettes personnalisées." },
      { title: "Logos centralisés", text: "Importez votre emblème d'entreprise. Notre moteur assure le cadrage et l'alignement centralisé automatique." },
      { title: "Correction Reed-Solomon", text: "Ajustez les taux d'erreur afin que les supports extérieurs abîmés ou couverts par un logo se décodent correctement." },
      { title: "Exports vectoriels haute fidélité", text: "Exportez des fichiers PNG, des courbes SVG sans limite d'agrandissement ou des documents PDF imprimables." },
      { title: "Confidentialité 100 % locale", text: "La mathématique de matrice et la binarisation s'effectuent au sein de votre navigateur sans archivage." }
    ],
    testimonialsHeader1: "Ce que disent",
    testimonialsHeader2: "nos utilisateurs",
    testimonialsDesc: "Rejoignez des milliers de professionnels et de restaurants qui utilisent quotidiennement qrcodegeneratorx.",
    testimonials: [
      { name: "Markus V.", role: "Responsable Marketing chez BrandCo", text: "qrcodegeneratorx a sauvé le lancement de notre catalogue papier. Les fichiers vectoriels exportés sont d'une netteté parfaite !" },
      { name: "Elena R.", role: "Propriétaire de Restaurant", text: "Configurer le menu de table numérique a été un jeu d'enfant. Le logo de notre enseigne est parfaitement intégré." },
      { name: "Dave K.", role: "Designer Graphique", text: "Le meilleur outil de génération côté client. Sans cookies de traçage, totalement gratuit et simple." }
    ],
    faqHeader1: "Foire Aux",
    faqHeader2: "Questions",
    faqDesc: "Des questions ? Nous avons des réponses détaillées couvrant les besoins des concepteurs et gestionnaires de projet.",
    faqBtn: "Découvrir les 20 Réponses",
    blogHeader1: "Dernières publications de",
    blogHeader2: "notre Blog",
    blogDesc: "Optimisez vos opérations, visuels et lisibilité de campagne avec les conseils exclusifs de nos experts.",
    blogBtnLog: "Lire la suite",
    blogBtnAll: "Voir tous les Articles",
    ctaBadge: "Démarrage immédiat — Sans carte bancaire",
    ctaHeader: "Prêt à créer votre Code QR personnalisé ?",
    ctaDesc: "Générez des codes QR durables avec couleurs adaptées, taux d'erreurs optimisés et incrustation de logo de marque.",
    ctaBtn: "Lancer le Générateur",
    blogIndexHeader1: "Conseils et",
    blogIndexHeader2: "Blog Professionnel",
    blogIndexDesc: "Accédez à nos analyses de lisibilité, guides stratégiques d'impression et guides de campagne marketing.",
    faqIndexHeader1: "Foire Aux",
    faqIndexHeader2: "Questions",
    faqIndexDesc: "Guide complet couvrant les interrogations sur le style, le format, la sécurité et la conformité imprimée."
  },
  es: {
    heroBadge: "Generación de vectores a resolución nativa",
    heroTitle1: "Servicio QR",
    heroTitle2: "Gratuito",
    heroSubtitleSuffix: "Plataforma Profesional Online de Códigos QR",
    stepsHeader1: "Convierta datos en",
    stepsHeader2: "3 pasos rápidos",
    stepsDesc: "El motor de compilación calcula píxeles estáticos al segundo. Evalué los pasos prácticos.",
    featuresHeader1: "Equipado con",
    featuresHeader2: "características únicas",
    featuresDesc: "Obtenga máxima flexibilidad libre de cuotas iniciales, marcas de agua o renovaciones exigidas.",
    features: [
      { title: "10 formatos de entrada", text: "Canalice visitas a páginas web, comparta accesos WiFi o componga vCards para tarjetas de presentación." },
      { title: "Paletas con gran contraste", text: "Adopte esquemas estáticos predefinidos o defina los valores cromáticos hexadecimales de su empresa." },
      { title: "Logos integrados", text: "Cargue marcas o isotipos. El sistema cala y ubica la imagen central sin interrumpir la legibilidad." },
      { title: "Fórmulas Reed-Solomon", text: "Configure rangos de corrección (bajo a sofisticado) aptos para contrarrestar raspaduras en carteles." },
      { title: "Exportación pura vectorial", text: "Descargue imágenes PNG clásicas, diagramas de curvas SVG para imprenta o folletos imprimibles PDF." },
      { title: "Confidencialidad rigurosa", text: "El proceso entero se realiza en memoria activa garantizando la inviolabilidad de sus credenciales." }
    ],
    testimonialsHeader1: "Opiniones de",
    testimonialsHeader2: "nuestros clientes",
    testimonialsDesc: "Súmese a los miles de comerciantes y diseñadores gráficos que eligen la solución de qrcodegeneratorx.",
    testimonials: [
      { name: "Markus V.", role: "Director de Marketing en BrandCo", text: "La portabilidad de los SVGs nos permitió imprimir lonas sin granulados. Los códigos funcionaron inmediatamente y sin límites." },
      { name: "Elena R.", role: "Propietaria de Restaurante", text: "Muy intuitivo para crear cartas digitales de mesa. Integró el logo de nuestro restaurante a la perfección." },
      { name: "Dave K.", role: "Diseñador Gráfico", text: "Insustituible recurso online libre de suscripciones molestas. La velocidad de renderizado es impresionante." }
    ],
    faqHeader1: "Preguntas",
    faqHeader2: "Frecuentes",
    faqDesc: "¿Tiene dudas técnicas? Despeje todas sus interrogantes mediante nuestro listado completo.",
    faqBtn: "Acceder a las 20 Respuestas",
    blogHeader1: "Artículos de",
    blogHeader2: "nuestro Blog técnico",
    blogDesc: "Incremente el impacto de sus activaciones físicas mediante el asesoramiento de nuestros editores.",
    blogBtnLog: "Ver artículo",
    blogBtnAll: "Ver todos los artículos",
    ctaBadge: "Acceso inmediato — Sin tarjeta de crédito",
    ctaHeader: "¿Listo para diseñar su código QR personalizado?",
    ctaDesc: "Consiga copias perfectas listas para impresión con colores a juego, marcas de agua corporativas y redundancias óptimas.",
    ctaBtn: "Abrir herramienta generadora",
    blogIndexHeader1: "Blog y",
    blogIndexHeader2: "Novedades de la Industria",
    blogIndexDesc: "Consulte novedades técnicas sobre resolución de imágenes, directrices de impresión comercial y campañas.",
    faqIndexHeader1: "Preguntas",
    faqIndexHeader2: "Frecuentes",
    faqIndexDesc: "Respuestas directas sobre encriptación, diferencias lógicas del estándar estático y consejos de ajuste visual."
  },
  de: {
    heroBadge: "Sofortige, verlustfreie Vektorgenerierung",
    heroTitle1: "Kostenloser QR-Code",
    heroTitle2: "Generator",
    heroSubtitleSuffix: "Professionelles Online QR-Code Werkzeug",
    stepsHeader1: "Codes in nur",
    stepsHeader2: "3 schnellen Schritten",
    stepsDesc: "Unsere sichere, browserbasierte Engine erstellt formatierte Codes in Millisekunden.",
    featuresHeader1: "Ausgestattet mit",
    featuresHeader2: "Premium-Funktionen",
    featuresDesc: "Maximale Gestaltungsfreiheit ohne Abonnements, Testversionseinschränkungen oder Scan-Limits.",
    features: [
      { title: "10 Datenformate", text: "Unterstützung für Web-Links, vertrauliche vCard-Kontakte, verschlüsselte WLAN-Verbindungen und GPS-Koordinaten." },
      { title: "Individuelle Designs", text: "Passen Sie Farbtöne an Firmen-Identitäten an oder nutzen Sie kontrastreiche Theme-Vorlagen." },
      { title: "Zentrierte Logos", text: "Binden Sie Ihre Firmenlogos ein. Unsere Engine umrandet und maskiert das Symbol ohne Datenverlust." },
      { title: "Reed-Solomon Schutz", text: "Verhindern Sie Scan-Abbrüche auf gedrucktem Papier durch mathematische Redundanzberechnung." },
      { title: "Verlustfreier Export", text: "Speichern Sie PNGs für Bildschirme oder unbegrenzt skalierbare Vektor-SVGs und druckbereite PDFs." },
      { title: "100 % Client-Sicherheit", text: "Sämtliche Passwörter und Parameter verbleiben auf Ihrem eigenen Gerät und werden nie online übertragen." }
    ],
    testimonialsHeader1: "Erfahrungsberichte",
    testimonialsHeader2: "unserer Nutzer",
    testimonialsDesc: "Entdecken Sie, warum Unternehmen und Restaurants qrcodegeneratorx für ihre Kampagnen vertrauen.",
    testimonials: [
      { name: "Markus V.", role: "Marketingleiter bei BrandCo", text: "qrcodegeneratorx hat unseren Katalog-Launch gerettet! Die SVGs blieben auf Messetapeten gestochen scharf." },
      { name: "Elena R.", role: "Restaurantbesitzerin", text: "Die Tischmenüs waren im Handumdrehen fertig. Unsere Kunden müssen nur das iPad-Schutzglas darauf ausrichten." },
      { name: "Dave K.", role: "Grafikdesigner", text: "Der beste webbasierte Generator auf dem Markt. Keine lästigen Registrierungsschranken oder Cookies." }
    ],
    faqHeader1: "Häufig gestellte",
    faqHeader2: "Fragen (FAQ)",
    faqDesc: "Fragen zum Scanverhalten? Hier finden Sie detaillierte Lösungen von Entwicklern für Entwickler.",
    faqBtn: "Alle 20 Antworten lesen",
    blogHeader1: "Neueste Artikel",
    blogHeader2: "aus dem Blog",
    blogDesc: "Verfeinern Sie Ihre Print-Kampagnen und Bildscans durch Insidertipps unserer Vektorexperten.",
    blogBtnLog: "Artikel lesen",
    blogBtnAll: "Alle Artikel ansehen",
    ctaBadge: "Sofort starten — Keine Kreditkarte erforderlich",
    ctaHeader: "Bereit, Ihren individuellen QR-Code zu erstellen?",
    ctaDesc: "Erzeugen Sie dauerhaft funktionstüchtige Codes mit eigenen logos, kontrastreichen Farbschemata und Toleranzstufen.",
    ctaBtn: "Erstellungswerkzeug starten",
    blogIndexHeader1: "Vektor-Insights",
    blogIndexHeader2: "& Fachartikel",
    blogIndexDesc: "Erfahren Sie mehr über Druckfehlervermeidung, Kontrastverhältnisse und bewährte Marketingmethoden im Alltag.",
    faqIndexHeader1: "Häufig gestellte",
    faqIndexHeader2: "Fragen",
    faqIndexDesc: "Umfassende Antworten zur Unterscheidung statischer und dynamischer Codes sowie Druckvorgaben."
  },
  zh: {
    heroBadge: "无损矢量和高精度图片极速生成",
    heroTitle1: "免费在线",
    heroTitle2: "二维码生成器",
    heroSubtitleSuffix: "专业实用的本地二维码生成平台",
    stepsHeader1: "仅需极简的",
    stepsHeader2: "3个快速步骤",
    stepsDesc: "本站提供的专业浏览器微芯编译程序可在几毫秒内硬编码并产出高分辨率的静态位图。",
    featuresHeader1: "集成了各项",
    featuresHeader2: "专业高级功能",
    featuresDesc: "享有全卡色盘更换与容错设定，远离收费壁垒、试用期警告与无故过期烦恼。",
    features: [
      { title: "10余个输入格式", text: "便捷支持普通的网页名址跳转、Wi-Fi无密即连、个人数字名片以及比特币网络加密转账。" },
      { title: "丰富的主题彩盘", text: "内置6个极佳的主题配色选项，均保障高对比安全系数，亦可在 Hex 中灵活配选。" },
      { title: "嵌入中央商标 Logo", text: "支持完美上传品牌主图图层，通过建立白色矩阵覆盖保护网对任何偏角镜头保持友善。" },
      { title: "经典里德纠错率调校", text: "支持自由选配容错段（L至H极限段），确保面对被污损的废纸单张扫码识别顺畅。" },
      { title: "真矢量级 PDF/SVG", text: "摆脱印刷造成的噪点困扰。无损 SVG 具有无限保真放大优势，利于商业大幅喷绘海报。" },
      { title: "纯网页端隐私安全", text: "所有文本拼装及图像压缩均为点对点在系统堆栈产生。杜绝资料在远端被截取泄密。" }
    ],
    testimonialsHeader1: "深受业界",
    testimonialsHeader2: "用户一致信赖",
    testimonialsDesc: "了解世界范围内的餐饮网点、初创公司以及开发总监等每日如何高频应用 qrcodegeneratorx。",
    testimonials: [
      { name: "Markus V.", role: "BrandCo 营销副总裁", text: "编译出的 SVG 矢量原档拯救了我们大型商品展的广告。完美实现了按比例拉大，且永久好用。" },
      { name: "Elena R.", role: "连锁餐馆主理人", text: "非常轻松地部署了餐饮扫码下单模式！可以随意嵌入我店的心形标志且完全没有失效时间。" },
      { name: "Dave K.", role: "自由美编", text: "良心推荐、纯前端架构。无需繁冗的邮箱注册即来即用，多色板及无水印服务极其优越。" }
    ],
    faqHeader1: "常见技术问题",
    faqHeader2: "解答汇集",
    faqDesc: "在使用中遇到了瓶颈？我们梳理了最被频繁询问的核心技术指引，让扫码体验再升级。",
    faqBtn: "参阅全部 20 个答案",
    blogHeader1: "本站专业",
    blogHeader2: "最新博文精选",
    blogDesc: "深入分析二维码设计细节、印刷技巧、高容错纠错配置，助力线上推广转化翻倍。",
    blogBtnLog: "阅读正文",
    blogBtnAll: "查看全部资讯",
    ctaBadge: "无需信用卡 — 立刻极速创建",
    ctaHeader: "准备好设计您的定制化二维码了吗？",
    ctaDesc: "永久有效不失效。支持中心加配图标、个性化黑白像素替换、印刷级 PDF，快来开启新的一站式设计。",
    ctaBtn: "点击运行生成器",
    blogIndexHeader1: "营销经验与",
    blogIndexHeader2: "科普资讯",
    blogIndexDesc: "全面审视传统条形码与两维点阵的技术分水岭、商业户外布置规范、和高扫码率策略建议。",
    faqIndexHeader1: "常见常问",
    faqIndexHeader2: "技术常识",
    faqIndexDesc: "详细说明离线静态二维码的安全结构原理、SSID参数设置以及像素分辨率实操指导。"
  },
  pt: {
    heroBadge: "Geração vetorial no padrão da sua marca",
    heroTitle1: "Gerador QR",
    heroTitle2: "Gratuito",
    heroSubtitleSuffix: "Criador de Códigos QR Online Profissional",
    stepsHeader1: "Crie Códigos em",
    stepsHeader2: "3 Etapas Rápidas",
    stepsDesc: "Nosso algoritmo local converte suas credenciais de texto em píxeis sólidos a cada segundo com precisão.",
    featuresHeader1: "Carregado de",
    featuresHeader2: "Aplicações Exclusivas",
    featuresDesc: "Desfrute de total flexibilidade criativa sem tarifas recorrentes mensais ou códigos que expiram.",
    features: [
      { title: "10 Diferentes Formatos", text: "Conectividade fácil de configurar para páginas de internet, senhas isoladas de WiFi ou vCards profissionais." },
      { title: "Curadoria de Contrastes", text: "Utilize templates estáticos harmônicos pré-definidos para focar lentes sensíveis, ou faça o seu próprio design." },
      { title: "Branding Central", text: "Insira a foto ou o logotipo da sua empresa. Nosso motor cria um contorno perimetral para isolar a logomarca." },
      { title: "Taxa de Erro Reed-Solomon", text: "Eleve o padrão de tolerância (até 30% H) para manter a integridade dos impressos se amassados pelo tempo." },
      { title: "Vetor Matemática SVG", text: "Extraia arquivos nítidos recortados em PNG, arquivos PDF para folhetos ou SVGs que suportam ampliações." },
      { title: "Segredo Profissional", text: "Segurança de TI garantida pelo modelo de mineração efetuado unicamente no navegador com total confidencialidade." }
    ],
    testimonialsHeader1: "Avaliação positiva",
    testimonialsHeader2: "dos criadores",
    testimonialsDesc: "Cadastre-se aos milhares de proprietários e profissionais que operam o qrcodegeneratorx.",
    testimonials: [
      { name: "Markus V.", role: "Líder de Marketing na BrandCo", text: "O qrcodegeneratorx salvou nossa ativação gráfica. Os arquivos SVG mantiveram nitidez absurda em placas enormes." },
      { name: "Elena R.", role: "Administradora de Restaurante", text: "Muito prático para criar cardápios contactless de mesa. Bastou subir o arquivo de menu e colocar o logotipo." },
      { name: "Dave K.", role: "Designer Gráfico", text: "Excelente site. Sem restrições e sem emails exigidos de cadastro. A renderização local de imagens é muito veloz." }
    ],
    faqHeader1: "Perguntas",
    faqHeader2: "Frecuentes",
    faqDesc: "Interrogações sobre escaneamento? Acesse repostas completas elaboradas por programadores sêniores.",
    faqBtn: "Verificar todas as 20 respostas",
    blogHeader1: "Destaques do",
    blogHeader2: "Nosso Editorial",
    blogDesc: "Evite erros logísticos na gravação de códigos em fardos de transporte conferindo nossos tópicos.",
    blogBtnLog: "Ver matéria",
    blogBtnAll: "Ver notícias del blog",
    ctaBadge: "Acesso imediato — Não requer cartão",
    ctaHeader: "Pronto para criar seu código QR?",
    ctaDesc: "Obtenha imagens permanentes geradas no navegador com suas cores customizadas e suporte para marca integrada.",
    ctaBtn: "Rodar gerador de códigos",
    blogIndexHeader1: "Blog e",
    blogIndexHeader2: "Artigos Estratégicos",
    blogIndexDesc: "Aprenda truques úteis de contraste para garantir leituras eficientes nos dispositivos celulares antigos.",
    faqIndexHeader1: "Perguntas",
    faqIndexHeader2: "Freqüentes",
    faqIndexDesc: "Saiba diferenciar códigos estáticos permanentes de links dinâmicos e tire suas dúvidas técnicas."
  },
  ja: {
    heroBadge: "ブラウザ内処理による高速ベクターQR生成",
    heroTitle1: "無料QRコード",
    heroTitle2: "作成・生成器",
    heroSubtitleSuffix: "登録不要のプロフェッショナルなQRコード作成ツール",
    stepsHeader1: "わずか簡単な",
    stepsHeader2: "3ステップ作成",
    stepsDesc: "手元のブラウザ内で安全に画像を組み立て、商用グレードの静的QRコードを生成します。",
    featuresHeader1: "使いやすさを追求した",
    featuresHeader2: "プロ仕様の機能一式",
    featuresDesc: "カラーパレット設定や容錯設定の変更、中央部ロゴ合成まで、契約による制限なく無料利用可能です。",
    features: [
      { title: "10種の多様なデータ規格", text: "通常のホームページリンクURLからWi-Fi簡単接続、アドレス帳連絡先vCard等に対応。" },
      { title: "視覚に優しいカラーパレット", text: "推奨コントラスト比を元に調整された美しいテンプレートカラー6選。個別定義も可能。" },
      { title: "企業ロゴ・イラスト合成", text: "中央へ1クリックでブランドアイコンを配置可能。余白や輪郭線を自動制御して誤読を防止。" },
      { title: "誤り訂正コード調整", text: "リード・ソロモン復元を最高30%まで調整。物理的な汚れ、削れ、日焼け耐性に活躍します。" },
      { title: "ベクター形式（SVG/PDF）", text: "拡大・印刷に最も優れているSVGの数学的曲線フォーマットに対応。何m四方の看板でも美観保持。" },
      { title: "プライバシー重視設計", text: "ネットワーク通信を一切せず、システムメモリ内部のみで画像変換。情報の外部漏洩の心配なし。" }
    ],
    testimonialsHeader1: "プロの現場から",
    testimonialsHeader2: "たくさんの信頼の声",
    testimonialsDesc: "qrcodegeneratorxを日頃から採用してマーケティングに生かしているお声をご紹介いたします。",
    testimonials: [
      { name: "Markus V.", role: "BrandCo マーケティング長", text: "qrcodegeneratorxのおかげで展示会で利用する屋外ポスター印刷に間に合いました。SVGは無制限拡大でも完全クッキリでした。" },
      { name: "Elena R.", role: "飲食店・オーナー経営者", text: "飲食店用コード型モバイルメニューの設置が驚くほど簡単になりました。ロゴを入れることで安心感とスキャン率に差が出ます。" },
      { name: "Dave K.", role: "グラフィックデザイナー", text: "お気に入りブックマークです。無料と書きつつ裏で追加プランを強制してくるサイトが多い中、ここは本当に良心的。" }
    ],
    faqHeader1: "よくあるご質問",
    faqHeader2: "技術編 FAQ",
    faqDesc: "スマホから読み取れない、または印刷に際してお困りごとがありますか？詳しい対処法をここに解説します。",
    faqBtn: "合計 20の解答をみる",
    blogHeader1: "関連おすすめ",
    blogHeader2: "ブログ・最新記事",
    blogDesc: "キャンペーンでの読み取り最大化、エラー保護の正しい設計手法等、専門知識を余すことなく紹介中。",
    blogBtnLog: "記事を読む",
    blogBtnAll: "全ブログ記事の一覧をひらく",
    ctaBadge: "今すぐスタート — 登録不要で完全無料",
    ctaHeader: "オリジナルのブランドQRコードを体験しませんか？",
    ctaDesc: "永久保証・サーバー依存一切なし。ロゴ合成カラー設定に対応した静的QRコードをここから瞬時に作成開始。",
    ctaBtn: "作成画面をひらく",
    blogIndexHeader1: "ビジュアル",
    blogIndexHeader2: "解説と技術コラム",
    blogIndexDesc: "スマートフォン内蔵レンズ解析 of の基礎、静的コードとリダイレクト方式の違いをわかりやすくレクチャー。",
    faqIndexHeader1: "よくあるご質問",
    faqIndexHeader2: "FAQ 一覧",
    faqIndexDesc: "Wi-Fi接続用パラメータの入力規則や、Reed-Solomon能力、ロゴ合成比率の技術的な解説事項をお届けします。"
  }
};

export default function App() {
  const { locale, setLocale, t, isRTL } = useI18n();

  // Route State: "home", "how-it-works", "features", "faq", "blog", "blog/id", "privacy-policy", "terms"
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [sharedPayload, setSharedPayload] = useState<any>(null);
  const [articlesVersion, setArticlesVersion] = useState<number>(0);
  const [isSyncingArticles, setIsSyncingArticles] = useState<boolean>(true);

  const hTrans = HOME_TRANSLATION_MAP[locale] || HOME_TRANSLATION_MAP.en;

  // Listen to custom article updates across tabs and within the app
  useEffect(() => {
    // Initial fetch of public articles from backend server
    syncArticlesWithServer()
      .then(() => {
        setArticlesVersion((prev) => prev + 1);
      })
      .finally(() => {
        setIsSyncingArticles(false);
      });

    const handleArticlesUpdate = () => {
      setArticlesVersion((prev) => prev + 1);
    };
    window.addEventListener("custom_articles_updated", handleArticlesUpdate);
    window.addEventListener("storage", handleArticlesUpdate);

    // Periodic sync every 30s to catch new published articles for public readers
    const interval = setInterval(() => {
      syncArticlesWithServer();
    }, 30000);

    return () => {
      window.removeEventListener("custom_articles_updated", handleArticlesUpdate);
      window.removeEventListener("storage", handleArticlesUpdate);
      clearInterval(interval);
    };
  }, []);

  // Parse URL pathname to determine initial route page
  const parseCurrentPath = useCallback(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    
    let pg = "home";
    if (segments.length > 0) {
      if (SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
        pg = segments.slice(1).join("/") || "home";
      } else {
        pg = segments.join("/");
      }
    }
    return pg;
  }, []);

  // Hydrate initial route and check query tags
  useEffect(() => {
    // 1. Initial Page Routing
    const initialPage = parseCurrentPath();
    setCurrentPage(initialPage);

    // 2. Decode shared parameters (?qrs=...)
    const params = new URLSearchParams(window.location.search);
    const qrs = params.get("qrs");
    if (qrs) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(qrs)));
        setSharedPayload(decoded);
      } catch (e) {
        console.error("Invalid QR configuration parameters.");
      }
    }

    // 3. Keep Router states reactive to popstate browser changes
    const handlePopState = () => {
      const activePg = parseCurrentPath();
      setCurrentPage(activePg);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [parseCurrentPath]);

  // Global Secret Shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open secret admin portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        handleNav("admin-portal-x891");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigate utility making path routers instant
  const handleNav = (pageId: string) => {
    setCurrentPage(pageId);
    const cleanPage = pageId === "home" ? "" : pageId;
    const newPath = `/${locale}${cleanPage ? `/${cleanPage}` : ""}`;
    
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Check if current route is the secret admin portal
  const isAdminPortal =
    currentPage === "admin-portal-x891" ||
    currentPage === "admin-studio-secure" ||
    currentPage === "secret-admin" ||
    currentPage === "editor" ||
    currentPage === "admin";

  // Memoized blog posts list for current locale, automatically reactive to new published articles
  const currentBlogPosts = useMemo(() => {
    return getBlogPostsForLocale(locale);
  }, [locale, articlesVersion]);

  // Extract variables for specific blog post route with bulletproof slug normalization
  const getBlogPost = useCallback(() => {
    if (currentPage.startsWith("blog/")) {
      const rawParam = currentPage.replace(/^blog\/?/, "");
      const targetSlug = decodeURIComponent(rawParam)
        .replace(/^https?:\/\/[^/]+/i, "")
        .replace(/^\/?(ar|en|fr|es|de|zh|pt|ja)\//i, "")
        .replace(/^\/?blog\//i, "")
        .replace(/^\/+|\/+$/g, "")
        .trim()
        .toLowerCase();

      if (!targetSlug) return undefined;

      return currentBlogPosts.find((p) => {
        const cleanId = (p.id || "")
          .replace(/^\/+|\/+$/g, "")
          .trim()
          .toLowerCase();
        const cleanSlug = ((p as any).slug || "")
          .replace(/^\/+|\/+$/g, "")
          .trim()
          .toLowerCase();

        return (
          cleanId === targetSlug ||
          cleanSlug === targetSlug ||
          cleanId.replace(/[-_]/g, "") === targetSlug.replace(/[-_]/g, "") ||
          cleanId.endsWith(`/${targetSlug}`) ||
          targetSlug.endsWith(`/${cleanId}`)
        );
      });
    }
    return undefined;
  }, [currentPage, currentBlogPosts]);

  const activeBlogPost = getBlogPost();

  // Dynamic Browser Document Title, Meta Description, and Canonical tag Updates for flawless SEO indexation
  useEffect(() => {
    let title = "Free QR Code Generator | qrcodegeneratorx.com";
    let desc = "Generate QR codes free instantly. Convert URLs, WiFi, WhatsApp, vCards & more. Download PNG, SVG, PDF. No signup. 40ms generation. qrcodegeneratorx.com";
    const canonicalUrl = `https://qrcodegeneratorx.com/${locale}${currentPage === "home" ? "" : `/${currentPage}`}`;

    // Local titles for pages to match selected language cleanly
    if (activeBlogPost) {
      title = `${activeBlogPost.title} | qrcodegeneratorx.com`;
      desc = activeBlogPost.metaDescription;
    } else if (currentPage === "how-it-works") {
      title = locale === "ar" ? "كيف يعمل | مولد كود QR مجاني" : "How It Works | Free QR Code Generator";
      desc = locale === "ar" ? "تعلم كيفية إنشاء رموز الاستجابة السريعة المخصصة خطوة بخطوة وإضافة شعارك الخاص." : "Learn how to generate high-resolution, secure step-by-step custom QR codes with company logo.";
    } else if (currentPage === "features") {
      title = locale === "ar" ? "المميزات الفنية والتقنية والخصوصية والأمان" : "Features | High-Res QR Graphics and Privacy Security";
      desc = locale === "ar" ? "اكتشف أدوات التخصيص الفائقة والتحكم بالألوان وتصدير ملفات SVG و PDF المتجهة مجاناً." : "Discover our browser-native advanced custom grids, central logos alignment, Reed-Solomon recovery tiers, and vector SVG exports.";
    } else if (currentPage === "faq") {
      title = locale === "ar" ? "الأسئلة الشائعة وتكنولوجيا رموز الاستجابة السريعة" : "Frequently Asked Questions | QR Code Technology Info";
      desc = locale === "ar" ? "دليل إجابات الخبراء الشامل حول تصميم أكواد QR الثابتة وصلاحيتها وتشفيرها." : "Read comprehensive expert answers regarding static vs dynamic matrix patterns, SSID WiFi parameters, and Reed-Solomon scales.";
    } else if (currentPage === "blog") {
      title = locale === "ar" ? "المدونة المهنية وأفضل ممارسات التسويق والتصميم" : "QR Code Blog & Guides | qrcodegeneratorx.com";
      desc = locale === "ar" ? "اقرأ أدلة وكلتبات خبرائنا حول توظيف الكود في المطاعم والشركات بجودة طباعة مثالية." : "Free tutorials, guides and tips on how to use QR codes for restaurants, business cards, real estate and more.";
    } else if (currentPage === "privacy-policy") {
      title = locale === "ar" ? "سياسة الخصوصية وأمان البيانات محلياً للمستخدم" : "Privacy Policy | Absolute Local Data Security Assurance";
      desc = locale === "ar" ? "راجع تفاصيل الأمان للتأكيد على أن البيانات تعالج في متصفحك محلياً بالكامل ولا ترفع لخوادمنا." : "Review our detailed privacy statements confirming 100% browser-native data local compilation with zero server collections.";
    } else if (currentPage === "terms") {
      title = locale === "ar" ? "شروط الخدمة والاستخدام التجاري الحر مدى الحياة" : "Terms of Service | Public Commercial Use Rights";
      desc = locale === "ar" ? "اقرأ شروط استخدام الرموز المصممة والتي تمنحك حقوقاً تجارية كاملة مدى الحياة مجاناً." : "Review our standard use agreements granting 100% permanent commercial rights to all generated graphics with no fees.";
    } else if (isAdminPortal) {
      title = "Administration Gate | Secure Portal";
      desc = "Secure system management";
    }

    // Set Document title
    document.title = title;

    // Helper to query or create metadata tags cleanly for flawless SEO coverage
    const setMetaTag = (selector: string, attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", contentVal);
    };

    // Secret Admin Protection: ensure search engines NEVER index or crawl the admin studio!
    if (isAdminPortal) {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow, noarchive');
    } else {
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'index, follow');
    }

    // Set canonical link tag dynamically in head
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // og:image fallback URL
    let ogImage = "https://qrcodegeneratorx.com/og-image.png";
    if (activeBlogPost && (activeBlogPost as any).image) {
      ogImage = (activeBlogPost as any).image;
    }

    // Task 3: Setup dynamic OpenGraph and Twitter cards (creating them if they are missing in head)
    setMetaTag('meta[name="description"]', 'name', 'description', desc);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', desc);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', desc);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // Task 1: Alternate Hreflangs dynamic management
    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());

    const supportedLocalesList = ['en', 'fr', 'es', 'ar', 'de', 'zh', 'pt', 'ja'];
    const routePath = currentPage === "home" ? "" : `/${currentPage}`;

    supportedLocalesList.forEach((loc) => {
      const linkEl = document.createElement("link");
      linkEl.setAttribute("rel", "alternate");
      linkEl.setAttribute("hreflang", loc);
      linkEl.setAttribute("href", `https://qrcodegeneratorx.com/${loc}${routePath}`);
      document.head.appendChild(linkEl);
    });

    const xDefaultEl = document.createElement("link");
    xDefaultEl.setAttribute("rel", "alternate");
    xDefaultEl.setAttribute("hreflang", "x-default");
    xDefaultEl.setAttribute("href", `https://qrcodegeneratorx.com/en${routePath}`);
    document.head.appendChild(xDefaultEl);
  }, [currentPage, activeBlogPost, locale]);

  return (
    <div className="min-h-screen bg-white bg-dot-grid flex flex-col justify-between animate-fade-in" dir={isRTL ? "rtl" : "ltr"}>
      {/* Dynamic SEO JSON-LD structured setups */}
      <JsonLd page={currentPage} locale={locale} blogPostId={activeBlogPost?.id} />

      {/* Mediavine Journey global script loader */}
      <MediavineAdScript />

      {/* Main Navigation bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNav} />

      {/* Dynamic Main Body Content blocks */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-content" style={{ minHeight: "100vh" }}>
        <Suspense fallback={null}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
            {/* VIEW 1: HOME PAGE (Tool + Full landings structure) */}
            {currentPage === "home" && (
              <div className="space-y-16">
                {/* Hero Headers block */}
                <section className="text-center space-y-6 pt-4 max-w-4xl mx-auto">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-150 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider font-mono">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                    <span>{hTrans.heroBadge}</span>
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-body tracking-tight text-slate-900 leading-snug max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
                    <span>{hTrans.heroTitle1}</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-black pb-1">
                      {hTrans.heroTitle2}
                    </span>
                  </h1>
                  <h2 className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    {hTrans.heroSubtitleSuffix} — {t("subtitle")}
                  </h2>
                </section>

                {/* Main QR Code generator compiler element */}
                <section id="qr-tool-section" className="scroll-mt-24">
                  <QRGenerator initialPayloadFromUrl={sharedPayload} />
                </section>

                <AdSenseAd adSlot="AUTO" />

                {/* AD SLOT 1: Below Hero & Tool section */}
                <AdSlot placement={AD_PLACEMENTS.heroLeaderboard} />

                {/* SECTION: How It Works Summary section */}
                <section className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 sm:p-12 space-y-10">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                      {hTrans.stepsHeader1} <span className="text-blue-600">{hTrans.stepsHeader2}</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      {hTrans.stepsDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { step: "1", title: t("step_1"), text: t("step_1_desc") },
                      { step: "2", title: t("step_2"), text: t("step_2_desc") },
                      { step: "3", title: t("step_3"), text: t("step_3_desc") },
                    ].map((stepObj) => (
                      <div key={stepObj.step} className="bg-white border border-slate-150 rounded-2xl p-6 relative shadow-sm hover:shadow transition-shadow">
                        <span className={`absolute -top-3.5 bg-gradient-to-r from-blue-605 to-blue-600 bg-blue-600 text-white w-7.5 h-7.5 rounded-full flex items-center justify-center font-bold text-sm font-mono shadow-md shadow-blue-500/10 ${
                          isRTL ? "right-6" : "left-6"
                        }`}>
                          {stepObj.step}
                        </span>
                        <h3 className="text-base font-bold font-display text-slate-900 mt-2 mb-2">{stepObj.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{stepObj.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* AD SLOT 2: Between Steps and Features sections */}
                <AdSlot placement={AD_PLACEMENTS.betweenSections1} />

                {/* SECTION: Features Cards List */}
                <section className="space-y-10">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                      {hTrans.featuresHeader1} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{hTrans.featuresHeader2}</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      {hTrans.featuresDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hTrans.features.map((feat, index) => {
                      const icons = [QrCode, Zap, Sparkles, ShieldAlert, Download, FolderLock];
                      const IconComponent = icons[index] || QrCode;
                      return (
                        <div key={index} className="bg-white border border-slate-200/85 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200 rounded-2xl p-6 group">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center mb-4 shadow-sm">
                            <IconComponent className="w-5 h-5 animate-none" />
                          </div>
                          <h3 className="text-base font-bold font-display text-slate-900 mb-2">{feat.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{feat.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* SECTION: Social Testimonials */}
                <section className="bg-blue-50/50 border border-blue-105 rounded-3xl p-8 sm:p-12 space-y-10">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                      {hTrans.testimonialsHeader1} <span className="text-blue-600">{hTrans.testimonialsHeader2}</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      {hTrans.testimonialsDesc}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hTrans.testimonials.map((test, index) => (
                      <div key={index} className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
                        <p className="text-xs sm:text-sm text-slate-605 italic leading-relaxed mb-4 font-normal">
                          "{test.text}"
                        </p>
                        <div className="border-t border-slate-100 pt-3.5 flex flex-col">
                          <span className="text-xs font-bold text-slate-900">{test.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold font-mono uppercase mt-0.5">{test.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <AdSenseAd adSlot="AUTO" />

                {/* SECTION: FAQ Quick Preview Block */}
                <section className="space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2 text-left">
                      <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                        {hTrans.faqHeader1} <span className="text-blue-600">{hTrans.faqHeader2}</span>
                      </h2>
                      <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                        {hTrans.faqDesc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNav("faq")}
                      className={`inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/10 cursor-pointer self-start sm:self-auto shrink-0 transition-transform active:scale-95`}
                    >
                      <span>{hTrans.faqBtn}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  <div className="bg-white border border-slate-150 rounded-3xl p-4 sm:p-8 shadow-sm">
                    {/* Render first 5 questions inside accordion container */}
                    <FAQAccordion />
                  </div>
                </section>

                {/* AD SLOT 3: In-Content 3 - between FAQ and Blog Preview */}
                <AdSlot placement={AD_PLACEMENTS.inContent3} />

                {/* SECTION: Blog Quick Preview deck */}
                <section className="space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2 text-left">
                      <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                        {hTrans.blogHeader1} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{hTrans.blogHeader2}</span>
                      </h2>
                      <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                        {hTrans.blogDesc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleNav("blog")}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shrink-0 transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>{hTrans.blogBtnAll}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Render first 3 posts */}
                    {currentBlogPosts.slice(0, 3).map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onClick={() => handleNav(`blog/${post.id}`)}
                      />
                    ))}
                    <noscript>
                      <div className="hidden" style={{ display: "none" }}>
                        {currentBlogPosts.map((post) => (
                          <a key={post.id} href={`/${locale}/blog/${post.id}`}>
                            {post.title}
                          </a>
                        ))}
                      </div>
                    </noscript>
                  </div>
                </section>

                {/* SECTION: Blue Gradient CTA Banner */}
                <section className="bg-gradient-to-r from-blue-650 via-blue-600 to-purple-650 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)" }}>
                  <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
                  <div className="space-y-3 max-w-2xl mx-auto relative z-10">
                    <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono inline-block mb-3">
                      {hTrans.ctaBadge}
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
                      {hTrans.ctaHeader}
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                      {hTrans.ctaDesc}
                    </p>
                  </div>
                  <div className="flex justify-center pt-2 relative z-10">
                    <button
                      onClick={() => {
                        const target = document.getElementById("qr-tool-section");
                        target?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-6 py-3.5 bg-white text-blue-600 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-50 transition-transform active:scale-95 shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <span>{hTrans.ctaBtn}</span>
                      <ArrowRight className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                </section>

                {/* AD SLOT 4: Above footer layout */}
                <AdSlot placement={AD_PLACEMENTS.footerLeaderboard} />
              </div>
            )}

            {/* VIEW 2: HOW IT WORKS PAGE */}
            {currentPage === "how-it-works" && <HowItWorksView />}

            {/* VIEW 3: FEATURES PAGE */}
            {currentPage === "features" && <FeaturesView />}

            {/* VIEW 4: FAQ ARTICLE ARCHIVE PAGE */}
            {currentPage === "faq" && (
              <div className="max-w-4xl mx-auto space-y-8 py-4">
                <div className="text-center space-y-3 max-w-2xl mx-auto mb-6">
                  <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
                    {hTrans.faqIndexHeader1} <span className="text-blue-600">{hTrans.faqIndexHeader2}</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                    {hTrans.faqIndexDesc}
                  </p>
                  <AdSenseAd adSlot="AUTO" />
                </div>

                <div className="bg-white border border-slate-150 rounded-2xl p-6 md:p-8 shadow-sm">
                  <FAQAccordion />
                </div>

                <AdSenseAd adSlot="AUTO" />
              </div>
            )}

            {/* VIEW 5: BLOG ARCHIVE INDEX */}
            {currentPage === "blog" && (
              <div className="max-w-5xl mx-auto space-y-12 py-4">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
                    {hTrans.blogIndexHeader1} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{hTrans.blogIndexHeader2}</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                    {hTrans.blogIndexDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Position 1: Before the first blog card */}
                  <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <AdSenseAd adSlot="AUTO" />
                  </div>

                  {/* Render all articles with inline AdSenseAd placements after every 3 cards */}
                  {currentBlogPosts.map((post, i) => (
                    <Fragment key={post.id}>
                      <BlogCard
                        post={post}
                        onClick={() => handleNav(`blog/${post.id}`)}
                      />
                      {(i + 1) % 3 === 0 && (
                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                          <AdSenseAd adSlot="AUTO" />
                        </div>
                      )}
                    </Fragment>
                  ))}
                  <noscript>
                    <div className="hidden" style={{ display: "none" }}>
                      {currentBlogPosts.map((post) => (
                        <a key={post.id} href={`/${locale}/blog/${post.id}`}>
                          {post.title}
                        </a>
                      ))}
                    </div>
                  </noscript>
                </div>
              </div>
            )}

            {/* VIEW 6: DETAILED BLOG POSTS READ PAGE */}
            {currentPage.startsWith("blog/") && (
              activeBlogPost ? (
                <BlogPostDetail post={activeBlogPost} onBack={() => handleNav("blog")} onNavigate={handleNav} />
              ) : isSyncingArticles ? (
                <div className="max-w-4xl mx-auto py-10 px-4 space-y-6 animate-pulse" id="article-loading-skeleton">
                  <div className="h-6 w-32 bg-slate-200 rounded-lg"></div>
                  <div className="h-10 w-3/4 bg-slate-200 rounded-xl"></div>
                  <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                  <div className="space-y-3 pt-6">
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-100 rounded w-4/6"></div>
                    <div className="h-32 bg-slate-50 border border-slate-100 rounded-2xl"></div>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-8" id="article-not-found-view">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                      {locale === "ar" ? "المقال غير موجود أو تم تحديث رابطه" : "Article Not Found or Moved"}
                    </h2>
                    <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      {locale === "ar"
                        ? "لم يتم العثور على المقال المطلوب في هذا الرابط. يمكنك تصفح قائمة مقالات المدونة الكاملة أدناه."
                        : "The requested guide could not be located. You can explore all available articles and guides below."}
                    </p>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleNav("blog")}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>{locale === "ar" ? "تصفح جميع مقالات المدونة" : "Browse All Blog Articles"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Available articles suggestions */}
                  <div className="pt-8 border-t border-slate-100 text-left space-y-4">
                    <h3 className="text-base font-bold text-slate-800 text-center">
                      {locale === "ar" ? "مقالات مقترحة للقراءة الآن:" : "Recommended Guides to Read:"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {currentBlogPosts.slice(0, 3).map((p) => (
                        <div
                          key={p.id}
                          onClick={() => handleNav(`blog/${p.id}`)}
                          className="p-4 bg-white border border-slate-200 hover:border-blue-400 rounded-xl cursor-pointer transition-all hover:shadow-xs space-y-2"
                        >
                          <span className="text-[10px] font-bold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                            {p.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{p.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2">{p.summary}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* VIEW 7: SECRET ADMIN ARTICLE EDITOR & PUBLISHER STUDIO */}
            {isAdminPortal && (
              <ArticleEditorView onNavigate={handleNav} />
            )}

            {/* VIEW 8: PRIVACY POLICY PAGE */}
            {currentPage === "privacy-policy" && <PrivacyPolicyView />}

            {/* VIEW 9: TERMS OF SERVICE PAGE */}
            {currentPage === "terms" && <TermsView />}
          </motion.div>
        </AnimatePresence>
      </Suspense>
    </main>

      {/* Main Footer footer navigation bar */}
      <Footer onNavigate={handleNav} />
    </div>
  );
}
