import { useI18n } from "../../hooks/useI18n";
import { Link, CheckCircle, Shield, Award, Users, ArrowUpRight, Cpu } from "lucide-react";
import { AdSlot, AD_PLACEMENTS } from "../ads/MediavineAd";
import { AdSenseAd } from "../ads/AdSenseAd";

// --- HOW IT WORKS LANGUAGE DICTIONARY ---
const HOW_IT_WORKS_CONTENT: Record<string, {
  title: string;
  titleSpan: string;
  subtitle: string;
  steps: Array<{ step: string; title: string; text: string }>;
  underHoodLabel: string;
  underHoodTitle: string;
  underHoodText: string;
  parity1: string;
  parity2: string;
}> = {
  en: {
    title: "How It",
    titleSpan: "Works",
    subtitle: "Generate professional, branding-compliant QR codes in three simple steps. Learn how our client-side software encodes and distributes high-fidelity files instantly.",
    steps: [
      { step: "1", title: "Choose Content Medium", text: "Select input configurations supporting standard web URLs, local Wi-Fi router binds, SMS texting, map coordinates, emails, or personal vCard directory profiles." },
      { step: "2", title: "Aesthetic Adjustments", text: "Customize layout patterns by matching brand hex numbers, increase error mitigation structures (Reed-Solomon), and upload a transparent corporate trademark logo directly in the center." },
      { step: "3", title: "Vector Export Codes", text: "Specify output pixel layout sizes (128px up to 1024px), verify the live generating layout, and download instantly in screens-optimized PNG, vector SVG, or printable vector PDF." }
    ],
    underHoodLabel: "Under the hood",
    underHoodTitle: "High Scannability Engineering",
    underHoodText: "Typical makers draw pixels without margin buffers, resulting in overlay logos that overlap matrix cells and break scans. qrcodegeneratorx utilizes custom mathematical equations to create an offset shield around your central logo, isolating logo elements from QR square blocks and boosting scannability across low-light phone optics.",
    parity1: "Forced Reed-Solomon H (30%) parity block rendering.",
    parity2: "Correct four-module Quiet Zone margin clearance protection."
  },
  ar: {
    title: "كيف",
    titleSpan: "يعمل",
    subtitle: "أنشئ رموز QR احترافية ومطابقة لعلامتك التجارية في ثلاث خطوات بسيطة. تعرف على كيفية قيام برامجنا بتشفير وتوزيع الملفات عالية الدقة بأمان تام.",
    steps: [
      { step: "1", title: "اختر نوع المحتوى", text: "حدد من بين إعدادات الإدخال القياسية التي تدعم عناوين الروابط، شبكات الواي فاي المحلية، رسائل SMS النصية، إحداثيات الخريطة، البريد الإلكتروني، أو ملفات جهات الاتصال vCard." },
      { step: "2", title: "تعديلات جمالية وتصميمية", text: "قم بتخصيص مظهر الرمز عن طريق مطابقة الرموز السداسية ألوان علامتك التجارية، وزيادة هياكل حماية وتصحيح الخطأ (ريد-سولومون)، ورفع شعار علامتك مباشرة في المنتصف." },
      { step: "3", title: "تصدير الملفات المتجهة", text: "حدد مقاس البكسل المطلوب (من 128 بكسل إلى 1024 بكسل)، وقم بمعاينة التصميم الحي مباشرة، ثم حمله فوراً بصيغة PNG أو كملف متجه SVG أو ملف PDF للطباعة." }
    ],
    underHoodLabel: "خلف الكواليس",
    underHoodTitle: "هندسة قابلية المسح العالية",
    underHoodText: "تقوم المولدات العادية برسم البكسلات دون حماية للهوامش، مما ينتج عنه تداخل الشعارات المركزية مع البيانات وهو ما يفسد المسح. يستخدم qrcodegeneratorx معادلات رياضية مخصصة لإنشاء حاجز وقائي حول شعارك، وعزل الشعار عن مربعات الرمز لتعزيز قابلية القراءة والمسح الضوئي في ظروف الإضاءة الضعيفة.",
    parity1: "فرض معالجة تصحيح الخطأ الفائقة من فئة Reed-Solomon H (30%).",
    parity2: "حماية تباعد هوامش منطقة الهدوء (Quiet Zone) المكونة من أربع وحدات."
  },
  fr: {
    title: "Comment ça",
    titleSpan: "marche",
    subtitle: "Générez des codes QR professionnels et conformes à l'image de marque en trois étapes simples. Découvrez comment notre logiciel côté client encode et distribue des fichiers haute fidélité instantanément.",
    steps: [
      { step: "1", title: "Choisir le support de contenu", text: "Sélectionnez des configurations d'entrée prenant en charge les URL Web standard, les liaisons de routeur Wi-Fi locaux, les SMS, les coordonnées cartographiques, les e-mails ou les profils vCard." },
      { step: "2", title: "Ajustements esthétiques", text: "Personnalisez les modèles de disposition en faisant correspondre les codes hexadécimaux de la marque, augmentez la correction d'erreurs (Reed-Solomon) et téléchargez votre logo." },
      { step: "3", title: "Exporter en formats vectoriels", text: "Spécifiez les tailles de pixels de sortie, vérifiez la disposition en direct et téléchargez instantanément au format PNG optimisé pour l'écran, SVG vectoriel ou PDF imprimable." }
    ],
    underHoodLabel: "Sous le capot",
    underHoodTitle: "Ingénierie de haute lisibilité",
    underHoodText: "Les générateurs typiques dessinent des pixels sans marges de sécurité, ce qui entraîne le chevauchement des logos sur les cellules de données. Notre moteur utilise des équations mathématiques pour isoler le logo central.",
    parity1: "Rendu forcé des blocs de parité Reed-Solomon de niveau H (30 %).",
    parity2: "Marge de protection correcte de la zone silencieuse de quatre modules."
  },
  es: {
    title: "Cómo",
    titleSpan: "funciona",
    subtitle: "Genere códigos QR profesionales compatibles con su marca corporativa en tres sencillos pasos. Descubra cómo nuestro motor procesa y genera archivos vectoriales al instante.",
    steps: [
      { step: "1", title: "Elija el tipo de contenido", text: "Seleccione integraciones para enlaces URL, contraseñas de red Wi-Fi, mensajes de texto SMS, coordenadas GPS, correos o tarjetas de presentación vCard." },
      { step: "2", title: "Estilo personalizado", text: "Ajuste la paleta cromática con valores hexadecimales oficiales, incremente el rango de tolerancia Reed-Solomon e inserte su logotipo corporativo en el centro." },
      { step: "3", title: "Descarga instantánea", text: "Configure las dimensiones de los píxeles, verifique la muestra interactiva en tiempo real y obtenga sus gráficos en formatos digitales PNG, vectoriales SVG o PDF impresos." }
    ],
    underHoodLabel: "Detalles técnicos",
    underHoodTitle: "Diseño de alta escaneabilidad",
    underHoodText: "Los generadores estándar dibujan píxeles sin considerar un margen de seguridad, provocando interferencias en la lectura. Nuestra plataforma crea una máscara protectora alrededor del logotipo central.",
    parity1: "Corrección de errores Reed-Solomon H (30%) de alta redundancia.",
    parity2: "Mantenimiento estricto del espacio mínimo de protección perimetral."
  },
  de: {
    title: "Wie es",
    titleSpan: "funktioniert",
    subtitle: "Erstellen Sie professionelle, markenkonforme QR-Codes in drei einfachen Schritten. Erfahren Sie, wie unsere clientseitige Software hochauflösende Dateien codiert.",
    steps: [
      { step: "1", title: "Inhaltstyp wählen", text: "Wählen Sie Eingabekonfigurationen für herkömmliche Web-URLs, lokale WLAN-Netzwerke, SMS, GPS-Koordinaten, E-Mails oder vCard-Mitarbeiterprofile." },
      { step: "2", title: "Visuelle Anpassungen", text: "Passen Sie die Farbschemata an Ihre Corporate Identity an, erhöhen Sie die Fehlertoleranz (Reed-Solomon) und laden Sie ein Firmenlogo für das Zentrum hoch." },
      { step: "3", title: "Vektordateien exportieren", text: "Legen Sie die Ausgabeauflösung fest, überprüfen Sie die dynamische Live-Vorschau und laden Sie den Code als PNG, Vektor-SVG oder druckfertiges PDF herunter." }
    ],
    underHoodLabel: "Hinter den Kulissen",
    underHoodTitle: "Hohe Scan-Zuverlässigkeit",
    underHoodText: "Standard-Generatoren platzieren Logos oft direkt auf den Kontrollbalken, was Scans behindert. qrcodegeneratorx nutzt mathematische Schutzbereiche um Ihr Firmenlogo.",
    parity1: "Erzwungene Reed-Solomon H (30%) Paritätsblock-Berechnung.",
    parity2: "Korrekte vier-modulige Ruhezonenrand-Freistellung zum Schutz der Matrix."
  },
  zh: {
    title: "使用",
    titleSpan: "指南",
    subtitle: "只需三个简单步骤，即可生成符合品牌规范的专业二维码。深入了解精简的前端内核如何即时、安全地对高保真矢量文件进行硬编码。",
    steps: [
      { step: "1", title: "选定转换格式", text: "选择所需的入参维度：普通互联网网址链接URL、无线Wi-Fi名称及密码、短信起草SMS、坐标位置、电子邮箱或电子商务名片vCard。" },
      { step: "2", title: "高级图形定制", text: "支持完全自由地自定义前景图案和背景色值，调整Reed-Solomon纠错重塑机制，并在矩阵的最核心部分无缝贴附透明公司商标Logo。" },
      { step: "3", title: "高画质无损导出", text: "自主定义输出像宽（从 128px 直至 1024px 高清版），并在完成全部样式预览后，点击下载高清晰PNG、矢量SVG或适于打印的PDF档。" }
    ],
    underHoodLabel: "底层核心机制",
    underHoodTitle: "超强可读性编码工程",
    underHoodText: "目前大部分在线生成器未预置边框保护，若直接叠加品牌标识极易破坏点阵，使移动终端无法完成识别。qrcodegeneratorx在标志中央集成防护缓冲遮罩保护层，确保任何偏角状态下均能顺利秒开。",
    parity1: "全面强制加载 Reed-Solomon H（30% 究极容错）冗余备份区。",
    parity2: "标准模块间隙 4-unit 静默区安全保护，完全隔绝杂色干扰。"
  },
  pt: {
    title: "Como",
    titleSpan: "funciona",
    subtitle: "Crie códigos QR profissionais e adequados à sua identidade visual em três passos descomplicados. Entenda como nosso algoritmo processa tudo offline.",
    steps: [
      { step: "1", title: "Defina o Tipo de Dado", text: "Escolha o formato adequado para links, redes sem fio Wi-Fi, textos de SMS, rotas por geolocalização, emails de contato e cartões vCard." },
      { step: "2", title: "Personalização Avançada", text: "Ajuste os esquemas cromáticos combinando as cores da sua empresa, configure redundância máxima Reed-Solomon e carregue seu logotipo oficial centralizado." },
      { step: "3", title: "Exportação em Vetores", text: "Defina as resoluções de pixel requeridas (de 128px até 1024px), acompanhe o painel em tempo real e salve seus arquivos como PNG clássico ou SVG/PDF." }
    ],
    underHoodLabel: "Bastidores técnicos",
    underHoodTitle: "Alta Escaneabilidade Garantida",
    underHoodText: "Geradores amadores desenham imagens sem área protetora, inutilizando os códigos após a colagem de logos. Nossa engine calcula uma barreira protetora que isola o logotipo.",
    parity1: "Redundância de segurança padrão Reed-Solomon H (30% de integridade).",
    parity2: "Preservação correta da margem perimetral para focar lentes sensíveis."
  },
  ja: {
    title: "使い",
    titleSpan: "方",
    subtitle: "わずか3つのシンプルなステップで、ブランド規格に完全準拠したプロフェッショナルなQRコードを作成。ブラウザ完結のコアエンジンによる高速・安全なコード化プロセスをご紹介します。",
    steps: [
      { step: "1", title: "データ項目の選択", text: "ウェブサイトURLリンク、Wi-Fi接続パスフレーズ、SMS本文メッセージ、GPSマップ座標、Eメール、ビジネス用名刺vCard等からデータ構造を選択します。" },
      { step: "2", title: "スタイルとカラーの調整", text: "カラーピッカーを使用して企業カラーと完全に一致させ、リード・ソロモン誤り訂正能力度を調整。さらに中央部分へ透過ロゴ画像を美しく合成配置します。" },
      { step: "3", title: "高画質ダウンロード", text: "用途に最適な解像度高ピクセルサイズにドラッグし、即時描画プレビュー。あとはPNG、劣化しないベクターSVG、またはPDF形式をワンタップ保存です。" }
    ],
    underHoodLabel: "システム仕様",
    underHoodTitle: "優れた解析スライド工学",
    underHoodText: "一般的なQRコード作成ツールは中央ロゴ合成時、有効セルに重ねてしまいエラーを起こしがちです。当プラットフォームはロゴ周囲に数学的マスキングエリアを確保し、低スペック機や暗所でも爆速スキャンを実現。",
    parity1: "強制的なリード・ソロモン高信頼度レベルH（30%データ復元）コード生成。",
    parity2: "規格準拠の4モジュール分静寂性バッファゾーン（余白保持）搭載。"
  }
};

// --- FEATURES LANGUAGE DICTIONARY ---
const FEATURES_CONTENT: Record<string, {
  title: string;
  titleSpan: string;
  subtitle: string;
  cards: Array<{ title: string; text: string }>;
}> = {
  en: {
    title: "Powerful",
    titleSpan: "Features",
    subtitle: "The ultimate platform for creating branding-ready static QR codes. Fast, secure, transparent, and completely free of charge.",
    cards: [
      { title: "10 Format Mediums", text: "Whether routing visitors to booking pages, Wi-Fi networks, SMS drafts, geo coordinates, or emails, qrcodegeneratorx carries native fields that format inputs correctly matching global standards." },
      { title: "Dynamic Color Presets", text: "Pick curated, high-contrast visual pallets like Indigo Trust, Rose Brand, and Eco Mint, or define accurate Hex values manually with standard live pickers." },
      { title: "Correction Level Selectors", text: "Select Reed-Solomon error correction rates from Low (7%) up to High (30%). Essential for outdoor physical items that gather dust, creases, or tears." },
      { title: "Central Corporate Logos", text: "Drag-and-drop your company trademark emblem. Our generator center aligns, crops, outlines, and embeds the emblem at exactly 20% scale." },
      { title: "Lossless PDF & SVG Exports", text: "Export lossless vector SVG or print-ready PDF formats. Scale graphics up to highway billboards or down to company business cards with zero pixel bleed." },
      { title: "Pure Client Privacy", text: "We believe in strict security limits. Your company passwords, phone lines, and links are computed inside your active browser - never uploaded to databases." }
    ]
  },
  ar: {
    title: "المميزات",
    titleSpan: "القوية",
    subtitle: "المنصة المثالية لإنشاء رموز QR ثابتة وجاهزة للعلامات التجارية. سريعة وآمنة وشفافة ومجانية بالكامل دون اشتراك.",
    cards: [
      { title: "10 أنواع من المحتوى والوسائط", text: "سواء كنت توجه الزوار لصفحات حجز أو شبكات واي فاي أو رسائل SMS أو موقع جغرافي أو بريد إلكتروني، فلدينا حقول مخصصة تقوم بتنسيق المدخلات لتطابق المعايير العالمية." },
      { title: "لوحات ألوان ديناميكية مسبقة الصنع", text: "اختر ألواناً احترافية عالية التباين كالأزرق الداكن والأخضر والوردي، أو اختر رموز الألوان السداسية Hex يدوياً لتطابق علامتك بدقة." },
      { title: "مستويات متقدمة لتصحيح الأخطاء", text: "اختر درجة تصحيح الخطأ بطريقة ريد-سولومون من منخفض (7%) إلى عالٍ (30%). وهي ميزة فائقة الأهمية للمطبوعات واللوحات الخارجية المعرضة للأتربة والبهتان." },
      { title: "إدراج شعارات الشركات في المنتصف", text: "اسحب وأسقط شعار شركتك أو علامتك التجارية. المولد سيوائم الشعار بالمنتصف ويحدد هوامشه بنسبة 20% بدقة متناهية وسهولة مطلقة." },
      { title: "تصدير بصيغ SVG و PDF دون فقدان الجودة", text: "صدر الرمز بصيغة SVG المتجهة أو PDF للطباعة الفورية. مدد الرسم ليلائم اللوحات الإعلانية الضخمة أو صغره ليلائم بطاقات الأعمال دون أي تشويه." },
      { title: "خصوصية تامة محليا 100%", text: "نحن نؤمن بحقك المطلق في الخصوصية وحماية بياناتك. يتم معالجة وعرض وتوليد كلمات مرور الواي فاي وجهات الاتصال والروابط في متصفحك وحاسوبك محلياً ولا يتم رفعها لخوادمنا نهائياً." }
    ]
  },
  fr: {
    title: "Fonctionnalités",
    titleSpan: "puissantes",
    subtitle: "La plateforme ultime pour créer des codes QR statiques prêts pour l'image de marque. Rapide, sécurisée, transparente et gratuite.",
    cards: [
      { title: "10 supports de format", text: "Qu'il s'agisse d'orienter les visiteurs vers des pages de réservation, des réseaux Wi-Fi, des SMS, des coordonnées géographiques ou des e-mails, qrcodegeneratorx gère de nombreux formats." },
      { title: "Préréglages de couleurs", text: "Choisissez des palettes de couleurs contrastées coordonnées comme Indigo Trust ou définissez des valeurs hexadécimales précises." },
      { title: "Sélecteurs de correction d'erreur", text: "Sélectionnez des taux de correction d'erreurs Reed-Solomon de faible (7 %) à élevé (30 %). Utile pour les supports physiques extérieurs." },
      { title: "Logos d'entreprise centraux", text: "Insérez un emblème de marque déposée de l'entreprise. Notre moteur centre, aligne, découpe et intègre votre image à 20%." },
      { title: "Exportations PDF et SVG sans perte", text: "Exportez des formats vectoriels de haute résolution. Redimensionnez à l'infini sans flou." },
      { title: "Confidentialité côté client", text: "Toutes les opérations d'encodage et les informations restent sur votre matériel local et ne sont jamais enregistrées sur un serveur." }
    ]
  },
  es: {
    title: "Características",
    titleSpan: "Premium",
    subtitle: "La mejor plataforma en línea para crear códigos QR permanentes. Rápida, segura de usar y libre de suscripciones de pago.",
    cards: [
      { title: "10 formatos integrados", text: "Canalice visitas a páginas web, comparta redes inalámbricas de forma intuitiva, componga mensajes WhatsApp o genere vCards de contacto." },
      { title: "Paletas dinámicas seleccionadas", text: "Utilice esquemas predefinidos como Verde Ecológico o defina los códigos de color de su empresa mediante el selector integrado." },
      { title: "Grado de tolerancia ajustable", text: "Aplique algoritmos Reed-Solomon optimizados para garantizar escaneos exitosos en papel arrugado, sucio o parcialmente cubierto." },
      { title: "Inserción de marca central", text: "Cargue su emblema corporativo de forma transparente, ajustando las líneas exteriores automáticamente a un 20% del total de puntos." },
      { title: "Vectores puros SVG y PDF", text: "Genere copias vectorizadas infinitas libres de distorsión ideales para trabajos en imprentas comerciales." },
      { title: "Cumplimiento legal de privacidad", text: "Garantizamos confidencialidad absoluta mediante procesamiento de datos local e inmediato en su computador." }
    ]
  },
  de: {
    title: "Leistungsstarke",
    titleSpan: "Funktionen",
    subtitle: "Die ultimative Plattform zur Erstellung von branding-fähigen statischen QR-Codes. Schnell, sicher, transparent und völlig kostenlos.",
    cards: [
      { title: "10 Formatmedien", text: "Ob Links, WLAN-Netzwerke, SMS-Entwürfe, GPS-Koordinaten oder E-Mails – wir unterstützen alle globalen Standards." },
      { title: "Dynamische Farbpaletten", text: "Wählen Sie kuratierte Kontrastfarben oder geben Sie die präzisen Hex-Farbwerte Ihres Unternehmens ein." },
      { title: "Fehlerkorrektur-Schnittstelle", text: "Wählen Sie Reed-Solomon-Korrekturraten von Low (7 %) bis High (30 %), um Scans auf beschädigtem Material zu schützen." },
      { title: "Zentralisiertes Markenlogo", text: "Fügen Sie Firmenlogos ein. Die Engine positioniert, umrandet, skaliert und maskiert Ihr Symbol fehlerfrei." },
      { title: "Verlustfreie SVG- & PDF-Exporte", text: "Dokumente und Vektoren verlustfrei skalieren und direkt drucken. Perfekt für Visitenkarten oder Riesenplakate." },
      { title: "Absolute Client-Privatsphäre", text: "Alle Schlüssel und Verbindungsdaten verbleiben sicher in Ihrem lokalen Speicher und werden niemals hochgeladen." }
    ]
  },
  zh: {
    title: "核心",
    titleSpan: "功能",
    subtitle: "打造最具可塑性的开源、静态二维码自主编译平台。极速隐私、透明度高、无需注册且无任何计费隐藏规则。",
    cards: [
      { title: "10余种通用数据媒介支持", text: "完美整合了标准网址跳转、Wi-Fi热点快速绑定、SMS预填草稿、地理GPS坐标、电子邮箱、比特币Wallet地址等多维交互场景。" },
      { title: "视觉专属主题彩盘一键切换", text: "内置优雅深蓝、质感深灰、苹果绿等多个经典高对比度色值方案，也支持自主通过Hex调色盘设置企业注册品牌标准配色色阶。" },
      { title: "多段纠错算法冗余参数调整", text: "支持自由把纠错能力从 Low (7%) 梯次增益到 High (30%)。在二维码经常容易被折叠、磨损的物理介质户外推广中极其至关重要。" },
      { title: "无缝中心品牌Logo叠加贴附", text: "点按拖入任意带透明背景的PNG/JPG，内核自动剪裁、绘制防重叠白色光学隔离层，完美按照黄金20%极限占比精准锁死定位。" },
      { title: "矢量级高清 PDF/SVG 图档打包", text: "针对实体印刷对分辨率的严苛考量，支持导出由矢量曲线构成的 SVG/PDF，以承载超大喷绘看板或袖珍型商业名片而永不虚角。" },
      { title: "不涉及云端交互的绝对个人隐私", text: "严格杜绝第三方恶意截获。密码、数字钱包地址等任何私密内容均仅保存在本机页面运行时堆栈中，对互联网完全隐蔽。" }
    ]
  },
  pt: {
    title: "Recursos",
    titleSpan: "Exclusivos",
    subtitle: "A plataforma ideal para gerar códigos QR estáticos de nível corporativo. Rápida, 100% segura para uso empresarial e pessoal.",
    cards: [
      { title: "10 Diferentes Formatos", text: "Suporte para múltiplos campos como sites de internet, logins de WiFi fechado, textos de SMS, destinos GPS, emails de contato e carteiras Bitcoin." },
      { title: "Modelos Especiais Cromáticos", text: "Escolha combinações ricas em contraste ou preencha de forma editável os tons e matizes de sua marca profissional." },
      { title: "Seletor de Redundância", text: "Customize as taxas Reed-Solomon de proteção, facilitando leituras rápidas até em materiais arranhados no ambiente externo." },
      { title: "Logotipo Central Customizável", text: "Embale a logomarca da sua companhia ajustando as margens e bordas externas de maneira proporcional e segura." },
      { title: "Fidelidade Vetorial (SVG/PDF)", text: "Obtenha cópias matemáticas nítidas prontas para impressão no atacado em lonas gigantes ou crachás de funcionários." },
      { title: "Privacidade e Segurança Total", text: "Segurança avançada através de criptografia e renderização efetuadas localmente em seu navegador Chrome/Safari." }
    ]
  },
  ja: {
    title: "多彩な",
    titleSpan: "先進機能",
    subtitle: "ビジネス対応の静的QRコードを作成するための最強プラットフォーム。安全・迅速で面倒な契約は一切不要の無料プラン。",
    cards: [
      { title: "10種の入力データ形式に対応", text: "リンク変換はもちろん、Wi-Fi、SMS、Eメール、連絡先、暗号通貨送金アドレスまで、国際標準規格に即したインプットが可能です。" },
      { title: "お洒落なビジュアルプリセット", text: "コントラスト比に配慮した6つのプリセットテーマから選ぶか、RGB/HEXピッカーを使用して任意のブランドカラーを指定できます。" },
      { title: "エラー訂正スライダ設定", text: "誤り訂正コードを最低7%から最大H（30%）まで調整可能。傷がついたり汚れたりするリスクのある名刺やポスターにおすすめです。" },
      { title: "中央ロゴ合成マスタリング", text: "丸型・角型の会社の象徴マークをブラウザ上で数秒トリミング配置。余白カット、ホワイトアウトラインを施して美観を保持します。" },
      { title: "印刷に適したSVG / PDFに対応", text: "拡大縮小に強いベクターSVG、および高品質PDF形式の出力を選べるため、車体ラッピングや広域ビル看板を綺麗に印刷可能です。" },
      { title: "完全お約束する徹底した暗号化", text: "他社と異なり、生成に必要な全データは手元のブラウザ内で安全に組み立てられます。個人漏洩の心配は文字通り永久にありません。" }
    ]
  }
};

// --- PRIVACY POLICY LANGUAGE DICTIONARY ---
const PRIVACY_CONTENT: Record<string, {
  title: string;
  lastUpdated: string;
  intro: string;
  introSec: string;
  h1: string;
  p1: string;
  h2: string;
  p2: string;
  h3: string;
  p3: string;
}> = {
  en: {
    title: "Privacy Policy — qrcodegeneratorx",
    lastUpdated: "Last updated: May 31, 2026",
    intro: "At qrcodegeneratorx, your privacy is our absolute priority. Unlike typical online generators, our platform is engineered of a **Pure Client-Side Architecture**. This means all data serialization, mathematical matrix parsing, color transformations, logo cropping overlay layers, and file packaging operations take place 100% inside your active web browser memory.",
    introSec: "We do not transmit your inputs, WiFi passwords, vCards, locations, or text payloads over the internet. Your source coordinates never reach our servers, guaranteeing absolute protection from data tracking.",
    h1: "1. Information We Do Not Collect",
    p1: "We do not operate backend user databases, tracking registries, or cloud data lakes. We do not prompt users to create profiles, share emails, or connect credentials. There are no tracking scripts recording your compiled texts. Only standard client performance states are preserved locally inside your browser storage (if you explicitly use the 'Save to Cache' template tool). You can clear this cache history at any time.",
    h2: "2. Advertisements & Partners",
    p2: "To maintain our servers and ensure our tools remain 100% free of charge for commercial use, we coordinate visual advertisements on our websites with Mediavine Journey. Ad networks may process basic system metadata or location telemetry to deliver customized placements. These partners comply with rigid privacy structures, GDPR, CCPA, and COPPA frameworks.",
    h3: "3. External Linking",
    p3: "Our blog or content cards contain links to third-party domains (such as social networks or payment links). We encourage you to review their specific privacy structures before engaging."
  },
  ar: {
    title: "سياسة الخصوصية — qrcodegeneratorx",
    lastUpdated: "آخر تحديث: 31 مايو 2026",
    intro: "في qrcodegeneratorx، خصوصيتك هي أولويتنا المطلقة. على عكس المولدات التقليدية عبر الإنترنت، تم تصميم منصتنا وتطويرها وفقًا لـ **بنية برمجية معالجة محلياً بالكامل من جانب العميل**. هذا يعني أن جميع عمليات تسلسل البيانات، والتحليل الرياضي للمصفوفات، وتحويلات الألوان، وقص الشعارات وتوليد الملفات تتم بنسبة 100% داخل ذاكرة متصفح الويب النشط الخاص بك وبشكل آمن تماماً.",
    introSec: "نحن لا نقوم بإرسال مدخلاتك الحساسة أو كلمات مرور الواي فاي الخاصة بك أو بطاقات الاتصال vCard أو المواقع الجغرافية عبر الإنترنت. لا تصل مدخلاتك أو بياناتك أو صورك إلى خوادمنا على الإطلاق، مما يضمن الحماية المطلقة من تتبع البيانات وسرقتها.",
    h1: "1. المعلومات التي لا نقوم بجمعها",
    p1: "نحن لا نقوم بتشغيل أو الاحتفاظ بقواعد بيانات المستخدمين الخلفية، أو سجلات التتبع، أو مستودعات التخزين السحابي. لا نطلب من الزوار إنشاء ملفات تعريف شخصية، أو مشاركة بريدهم الإلكتروني، أو ربط حساباتهم. لا توجد أي نصوص برمجية لتتبع أو تسجيل نصوصك المفتوحة. يتم الحفاظ فقط على حالات الأداء المحلية القياسية بشكل آمن وتدريجي داخل مساحة تخزين متصفحك (إذا استخدمت أداة الكاش الفردية اختيارياً). يمكنك مسح هذا السجل بالكامل بضغطة واحدة وبكل أريحية وسهولة.",
    h2: "2. الإعلانات والشركاء",
    p2: "للحفاظ على خوادمنا وضمان بقاء أدواتنا مجانية 100% للاستخدام التجاري والشخصي، نقوم بالتنسيق مع شبكة إعلانات Mediavine Journey لعرض لوحات إعلانية غير جائرة. قد تقوم الشبكات الإعلانية بمعالجة البيانات الوصفية الأساسية للنظام أو إحداثيات الخدمة لتقديم إعلانات ذات صلة. يتوافق هؤلاء الشركاء مع هياكل الخصوصية الصارمة كقوانين حماية البيانات العامة في أوروبا (GDPR) وكاليفورنيا (CCPA).",
    h3: "3. الروابط الخارجية",
    p3: "قد تحتوى مدونتنا أو بطاقات المحتوى لدينا على روابط لمواقع خارجية كشبكات التواصل الاجتماعي أو بوابات التبرع. نحن نشجعك تماماً على مراجعة سياسات الخصوصية الخاصة بتلك الأطراف قبل التعامل معها لحماية خصوصيتك بشكل كامل."
  },
  fr: {
    title: "Politique de Confidentialité — qrcodegeneratorx",
    lastUpdated: "Dernière mise à jour : 31 mai 2026",
    intro: "Chez qrcodegeneratorx, la confidentialité est notre priorité absolue. Toutes les opérations ont lieu à 100 % dans la mémoire de votre navigateur.",
    introSec: "Nous ne collectons ni ne transmettons vos mots de passe Wi-Fi, profils de contact vCard ou liens URL configurés aux serveurs.",
    h1: "1. Informations non collectées",
    p1: "Nous n'opérons pas de bases de données privées d'utilisateurs. Seule une session de mise en cache optionnelle enregistre les QR codes générés localement.",
    h2: "2. Publicités et partenaires",
    p2: "Afin de maintenir nos serveurs opérationnels et entièrement gratuits, des partenaires externes comme Mediavine Journey peuvent diffuser des annonces pertinentes basées sur les métadonnées de navigation courantes.",
    h3: "3. Liens externes",
    p3: "Notre blog contient des liens vers des réseaux sociaux ou d'autres applications. Veuillez consulter leurs politiques de confidentialité respectives."
  },
  es: {
    title: "Política de Privacidad — qrcodegeneratorx",
    lastUpdated: "Última actualización: 31 de mayo de 2026",
    intro: "Garantizamos confidencialidad absoluta. La generación de códigos se realiza en memoria activa sin recolecciones externas en servidores.",
    introSec: "No registramos contraseñas WiFi, direcciones físicas o información personal de contacto.",
    h1: "1. Datos no recolectados",
    p1: "No disponemos de servicios informáticos en la nube dedicados al perfilado de visitas. El historial opcional es almacenado localmente.",
    h2: "2. Socios y banners de publicidad",
    p2: "Sostenemos la gratuidad del sitio mediante convenios publicitarios con Mediavine Journey que respetan regulaciones CCPA y GDPR.",
    h3: "3. Vínculos de terceros",
    p3: "Las referencias presentes en este dominio pueden contener accesos a redes de pago o soporte cuyos términos son autónomos."
  },
  de: {
    title: "Datenschutzerklärung — qrcodegeneratorx",
    lastUpdated: "Letzte Aktualisierung: 31. Mai 2026",
    intro: "Ihre Privatsphäre ist unsere oberste Priorität. Alle Berechnungen erfolgen direkt in Ihrem Browser.",
    introSec: "WLAN-Schlüssel, Passwörter, Geodaten oder persönliche Telefonnummern werden niemals an unsere Server gesendet.",
    h1: "1. Keine Informationserfassung",
    p1: "Wir betreiben keine Benutzerdatenbanken oder Tracking-Registrierungen. Sie können die Anwendung völlig anonym nutzen.",
    h2: "2. Werbung & Partner",
    p2: "Zur Deckung unserer Serverkosten schalten wir Werbung über Mediavine Journey. Diese Partner halten sich strikt an die Richtlinien der DSGVO.",
    h3: "3. Externe Links",
    p3: "Unsere Blogartikel verweisen teilweise auf soziale Netzwerke. Wir empfehlen, die Datenschutzbestimmungen der jeweiligen Drittanbieter zu lesen."
  },
  zh: {
    title: "隐私政策描述 — qrcodegeneratorx",
    lastUpdated: "最新更新日期：2026年5月31日",
    intro: "在qrcodegeneratorx，对您隐私权和数据合规的安全管控是我们的核心第一准则。与其它同类平台截然相反，我们全面、彻底地贯彻了本地纯前端代码编译技术。",
    introSec: "我们不会对您的输入、Wi-Fi连接密码、联系档案以及网址传输做任何跨网络同步，极佳地规避了中途被监听的技术漏洞。",
    h1: "1. 关于我们绝不采集信息的声明",
    p1: "我们不部署后台中央服务器，不向商业实体和云端提供日志转存。用户在使用过程中的配置痕迹仅存储在您的个人私有浏览器沙盒（即 LocalStorage 缓存内，除非您点按了清空操作）。",
    h2: "2. 经典投放广告展示安排",
    p2: "为了极力维持我们的服务器运行对所有商业用户均保持永久无门槛免费，我们与 Mediavine Journey 渠道合作开展极简的展示广告，其遵循 GDPR 等安全法规。",
    h3: "3. 外部重定向跳转声明",
    p3: "由于博文推广等原因，部分外链可能指向社交网站等三方容器，请用户在使用前注意阅览前述三方的个案声明。"
  },
  pt: {
    title: "Declaração de Privacidade — qrcodegeneratorx",
    lastUpdated: "Última atualização: 31 de maio de 2026",
    intro: "Garantimos segurança e sigilo pleno. Todas as operações de binarização e recorte de logos ocorrem integralmente no seu dispositivo.",
    introSec: "Não armazenamos credenciais de wifi privado ou informações profissionais em nenhuma hipótese.",
    h1: "1. Dados Não Coletados",
    p1: "Não mantemos cadastros de usuários ativos ou servidores de monitoramento em nuvem. O cache é guardado localmente e apagável.",
    h2: "2. Banners de Anúncios",
    p2: "Para manter o serviço gratuito, exibimos anúncios em cooperação com Mediavine Journey, respeitando plenamente regulamentações GDPR e CCPA.",
    h3: "3. Links Externos",
    p3: "As postagens do blog podem redirecionar para redes ou portais específicos que operam sob declarações próprias."
  },
  ja: {
    title: "プライバシーポリシー — qrcodegeneratorx",
    lastUpdated: "最終更新日：2026年5月31日",
    intro: "当プラットフォームではユーザー情報の保護に万全を期しています。データの暗号化からロゴ合成まで100%デバイス内部で処理します。",
    introSec: "テキスト、パスワード、メール、位置情報の個人詳細パラメーターについて外部サーバー通信は行ないません。",
    h1: "1. 個人情報の収集なし",
    p1: "個人アカウントの作成も必要なく、情報のプロファイリングもしません。作成履歴キャッシュはすべてブラウザ上の保管であり、削除可能です。",
    h2: "2. 広告配信とサードパーティ規定",
    p2: "サーバーの維持管理のため、当サイトはMediavine Journeyを通した安全な広告スペースを設置しています。これらはGDPR等に準拠した管理です。",
    h3: "3. 外部リンクのご案内",
    p3: "ブログやページに第三者へのリンクが存在する場合、接続先のプライバシー記述を確認なさるよう推奨いたします。"
  }
};

// --- TERMS OF SERVICE LANGUAGE DICTIONARY ---
const TERMS_CONTENT: Record<string, {
  title: string;
  lastUpdated: string;
  h1: string;
  p1: string;
  h2: string;
  p2: string;
  h3: string;
  p3: string;
  h4: string;
  p4: string;
}> = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: May 31, 2026",
    h1: "1. Acceptance of Terms",
    p1: "By visiting, accessing, or generating files on qrcodegeneratorx, you agree to comply with and be bound by these legal terms. If you do not accept these parameters, you are instructed to exit the application immediately.",
    h2: "2. Commercial & Personal License",
    p2: "QR codes generated on qrcodegeneratorx carry a **Lifetime, Commercial-Grade, Free, and Royalty-Free License**. You can use them on physical assets (books, packaging, bills, restaurant menus), digital websites, emails, or billboards. There are no scanner caps, expiration dates, or required attribution tags.",
    h3: "3. Forbidden usage",
    p3: "You agree not to utilize qrcodegeneratorx to generate static barcodes representing malicious software downloads, credential spear-phishing campaigns, hate speech, scam operations, or illegal transaction pointers. We disclaim all liability stemming from scanning activities of QR codes designed on our tools.",
    h4: "4. Disclaimer of Warranty",
    p4: "The platform, graphics, outputs, and blog materials are served \"AS IS\" without warranty of any kind, whether direct or implied. We do not guarantee that the client-side files will work flawlessly with all legacy smartphone camera sensors. Users are instructed to perform scannability tests on secondary devices before launching large physical print runs."
  },
  ar: {
    title: "شروط الخدمة والاستخدام",
    lastUpdated: "آخر تحديث: 31 مايو 2026",
    h1: "1. قبول الشروط القانونية",
    p1: "بزيارتك أو تصفحك أو توليد الملفات على qrcodegeneratorx، فإنك توافق صراحة على الالتزام بشروط الخدمة هذه بالكامل والموافقة عليها. إذا لم تكن تقبل هذه الشروط والمعايير، يُرجى مغادرة التطبيق والموقع فوراً.",
    h2: "2. الترخيص التجاري والشخصي مدى الحياة",
    p2: "تحمل رموز كود الـ QR المصممة محلياً على منصتنا **ترخيصاً شخصياً وتجارياً مجانياً بالكامل مدى الحياة وعالمياً**. يمكنك استخدامها في المنتجات والكتب والعبوات وقوائم طعام المطاعم واللوحات الإعلانية الضخمة ومواقع الويب دون أي حدود للتحميل أو تاريخ انتهاء أو قيود للمسح.",
    h3: "3. الاستخدامات المحظورة والممنوعة",
    p3: "أنت تتعهد وتوافق صراحة على عدم استخدام المنصة لتوليد مواصفات كود QR تحتوي على روابط لبرامج وبوتات ضارة، أو حملات تصيد وسرقة بيانات، أو خطابات كراهية، أو منصات احتيالية مضللة. نحن نخلي مسؤوليتنا الجنائية والمدنية تماماً عن أي رمز يتم إنشاؤه واستخدامه خارج الأطر القانونية.",
    h4: "4. إخلاء المسؤولية والضمانات",
    p4: "يتم تقديم الخدمات واللوحات والملفات كما هي \"بحالتها الحالية وبدون أي ضمانات\" مباشرة أو غير مباشرة. نحن لا نضمن ملاءمة الملفات المنتجة لكافة عدسات الهواتف القديمة أو التالفة بشكل معصوم. نحن ننصح وبشدة بإجراء اختبارات مسح عملية على أجهزة مختلفة قبل بدء حملات طباعة كرتونية تجارية ضخمة."
  },
  fr: {
    title: "Conditions d'Utilisation",
    lastUpdated: "Dernière mise à jour : 31 mai 2026",
    h1: "1. Acceptation des conditions",
    p1: "En accédant au service, vous acceptez tacitement l'ensemble de notre charte d'utilisation.",
    h2: "2. Licence personnelle et commerciale",
    p2: "Les codes générés possèdent une licence gratuite, perpétuelle, sans frais et exempte de droits d'auteur, pour des utilisations sur des supports physiques ou médias en ligne.",
    h3: "3. Usages proscrits",
    p3: "Il est formellement interdit de produire des QR codes menant à des tentatives d'escroquerie ou de hameçonnage de données.",
    h4: "4. Absence de garanties",
    p4: "Les outils sont fournis en l'état. Nous recommandons de tester les scans avant de lancer des impressions majeures."
  },
  es: {
    title: "Términos del Servicio",
    lastUpdated: "Última actualización: 31 de mayo de 2026",
    h1: "1. Aceptación de condiciones",
    p1: "El ingreso y descarga de archivos en esta plataforma asume el acatamiento implícito de los presentes lineamientos generales.",
    h2: "2. Concesiones y licencias comerciales",
    p2: "El material producido cuenta con licencia comercial libre de regalias para su uso de por vida en campañas publicitarias, menus gastronómicos o empaquetamientos.",
    h3: "3. Usos indebidos prohibidos",
    p3: "Queda terminantemente prohibido usar los esquemas para rebatir enlaces de malware o suplantación de identidad digital.",
    h4: "4. Garantia limitada",
    p4: "Los gráficos se entregan libre de cargo sin compromisos de compatibilidad en ópticas de fabricación antigua. Se sugiere realizar muestreos."
  },
  de: {
    title: "Nutzungsbedingungen",
    lastUpdated: "Letzte Aktualisierung: 31. Mai 2026",
    h1: "1. Anerkennung der Bestimmungen",
    p1: "Mit der Nutzung dieser Plattform erklären Sie sich mit den nachstehenden Bedingungen vollumfänglich einverstanden.",
    h2: "2. Gewerbliche & Private Lizenzierung",
    p2: "Alle erstellten Codes sind dauerhaft kostenlos und uneingeschränkt kommerziell nutzbar – ohne zeitliche Begrenzung, Scan-Limits oder Namensnennungspflicht.",
    h3: "3. Missbräuchliche Verwendung",
    p3: "Die Verbreitung von Viren, Phishing-Links, Scam-Aktionen oder illegalen Plattformen über unsere QR-Codes ist strengstens untersagt.",
    h4: "4. Gewährleistungsausschluss",
    p4: "Unser kostenloser Dienst wird ohne Mängelgewähr zur Verfügung gestellt. Bitte testen Sie Ihre Codes vor größeren Druckaufträgen eigenhändig."
  },
  zh: {
    title: "使用许可与条款",
    lastUpdated: "最新更新日期：2026年5月31日",
    h1: "1. 使用协议的达成确认",
    p1: "凡是进入本站、下载图片或调用本项目的动作，均意味着您确认完全服从本页所定框架。若拒绝遵守下述约定，请立刻关闭本应用。",
    h2: "2. 商业与非商业永久独占开源免费许可",
    p2: "通过qrcodegeneratorx生成的全部图档具有在全球范围内、永久、极速无偿商选的权利。我们既不设置扫码人数天花板，亦不附带到期账单。",
    h3: "3. 侵权与滥用行为防范",
    p3: "您充分理解并保证：不会将编译出的矩阵直接链挂危险黑客木马网站、垃圾信息收集以及洗黑钱或反人类不法教唆。对任何误用滥用导致的社会负面效应我们概不予负责。",
    h4: "4. 专业免责声明",
    p4: "本网各项程序与配套科普资料均采取“现状展示”原则发放。不保证在极端暗处或对低解析旧规格机体都能达到绝对 scannable，提倡全面下料海量印刷前以真机对标调试。"
  },
  pt: {
    title: "Termos de Serviço",
    lastUpdated: "Última atualização: 31 de maio de 2026",
    h1: "1. Aceitação",
    p1: "Ao navegar e utilizar este gerador, o usuário concorda e expressa ciência destes termos jurídicos.",
    h2: "2. Licenciamento Comercial Grátis",
    p2: "O código QR oriundo de nossa aplicação possui permissão perpétua de uso sem royalties em materiais escolares, marcas corporativas e jornais.",
    h3: "3. Uso Ilícito Vedado",
    p3: "É fortemente restrito usar nosso designer para disseminar links portadores de vírus, fraudes e pirataria eletrônica.",
    h4: "4. Isenção de Responsabilidade",
    p4: "A ferramenta é disponibilizada gratuitamente. Recomendamos exaustivos testes de leitura celular antes de impressões gráficas massivas."
  },
  ja: {
    title: "利用規約",
    lastUpdated: "最終更新日：2026年5月31日",
    h1: "1. 規約の同意確認",
    p1: "当サービスおよび作成機をご利用になるにあたり、ここに記載される全ての法的条件に自動的に合意したものと見なされます。",
    h2: "2. 商用・非商用ロイヤリティフリーライセンス",
    p2: "当サイトで生成したQRコードは、あらゆる商業活動、企業の販促、書籍等にて権利料不要で生涯にわたり無料でお使いいただけます。",
    h3: "3. 違法な利用の禁止",
    p3: "当ツールを用いて、スパイウェア配信、フィッシング詐欺サイト、その他不法な取引決済への誘導等に供することは固くお断りいたします。",
    h4: "4. 免責規定の明記",
    p4: "当ツール一式は「現状有姿」で提供され、稼働は保証されません。多量部数の紙媒体へ印刷を開始する前には、カメラ実機での読み取り確認を強く推奨します。"
  }
};

// --- HOW IT WORKS VIEW COMPONENT ---
export function HowItWorksView() {
  const { locale } = useI18n();
  const content = HOW_IT_WORKS_CONTENT[locale] || HOW_IT_WORKS_CONTENT.en;

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      {/* Hero headers */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
          {content.title} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{content.titleSpan}</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
        <AdSenseAd adSlot="AUTO" />
      </div>

      {/* 3 Step Card Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.steps.map((step, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 relative">
            <span className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">{step.step}</span>
            <h3 className="text-lg font-bold font-display text-slate-900 mt-2 mb-3">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">{step.text}</p>
          </div>
        ))}
      </div>

      <AdSlot placement={AD_PLACEMENTS.betweenSections1} />

      {/* Advanced info section */}
      <div className="bg-blue-50 border border-blue-150 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            {content.underHoodLabel}
          </span>
          <h2 className="text-2xl font-bold font-display text-slate-900">{content.underHoodTitle}</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            {content.underHoodText}
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{content.parity1}</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{content.parity2}</span>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center bg-white p-6 border border-slate-200 rounded-xl shadow-inner">
          <Cpu className="w-16 h-16 text-blue-600 animate-pulse" />
        </div>
      </div>
      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}

// --- FEATURES VIEW COMPONENT ---
export function FeaturesView() {
  const { locale } = useI18n();
  const content = FEATURES_CONTENT[locale] || FEATURES_CONTENT.en;
  
  const icons = [Link, Award, Shield, Users, ArrowUpRight, CheckCircle];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
          {content.title} <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{content.titleSpan}</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          {content.subtitle}
        </p>
        <AdSenseAd adSlot="AUTO" />
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.cards.map((card, idx) => {
          const Icon = icons[idx] || Link;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-md transition-all duration-200 rounded-2xl p-6 group">
              <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-650 mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{card.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{card.text}</p>
            </div>
          );
        })}
      </div>

      <AdSlot placement={AD_PLACEMENTS.betweenSections2} />
      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}

// --- PRIVACY POLICY VIEW COMPONENT ---
export function PrivacyPolicyView() {
  const { locale } = useI18n();
  const content = PRIVACY_CONTENT[locale] || PRIVACY_CONTENT.en;

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-150 rounded-2xl p-6 md:p-10 shadow-sm space-y-6 text-slate-700">
      <h1 className="text-3xl font-black font-display text-slate-900 leading-tight border-b border-slate-100 pb-5">
        {content.title}
      </h1>
      <p className="text-xs text-slate-400 font-mono">{content.lastUpdated}</p>
      <AdSenseAd adSlot="AUTO" />

      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <p>
          {content.intro}
        </p>
        <p>
          {content.introSec}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h1}</h3>
        <p>
          {content.p1}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h2}</h3>
        <p>
          {content.p2}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h3}</h3>
        <p>
          {content.p3}
        </p>
      </div>
      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}

// --- TERMS OF SERVICE VIEW COMPONENT ---
export function TermsView() {
  const { locale } = useI18n();
  const content = TERMS_CONTENT[locale] || TERMS_CONTENT.en;

  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-150 rounded-2xl p-6 md:p-10 shadow-sm space-y-6 text-slate-700">
      <h1 className="text-3xl font-black font-display text-slate-900 leading-tight border-b border-slate-100 pb-5">
        {content.title}
      </h1>
      <p className="text-xs text-slate-400 font-mono">{content.lastUpdated}</p>
      <AdSenseAd adSlot="AUTO" />

      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <h3 className="text-lg font-bold font-display text-slate-900">{content.h1}</h3>
        <p>
          {content.p1}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h2}</h3>
        <p>
          {content.p2}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h3}</h3>
        <p>
          {content.p3}
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">{content.h4}</h3>
        <p>
          {content.p4}
        </p>
      </div>
      <AdSenseAd adSlot="AUTO" />
    </div>
  );
}
