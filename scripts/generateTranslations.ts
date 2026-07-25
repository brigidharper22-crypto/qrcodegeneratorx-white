import fs from "fs";
import path from "path";
import { BLOG_POSTS, BlogPost } from "../src/data/blogData";

// Translation dictionaries and transformers for all supported locales
type TargetLocale = "ar" | "fr" | "es" | "de" | "zh" | "pt" | "ja";

const CATEGORY_MAP: Record<TargetLocale, Record<string, string>> = {
  ar: {
    Tutorials: "دروس",
    Guides: "أدلة",
    Design: "تصميم",
    Business: "أعمال",
    Marketing: "تسويق",
    Education: "تعليم",
    Networking: "شبكات",
    Support: "دعم",
  },
  fr: {
    Tutorials: "Tutoriels",
    Guides: "Guides",
    Design: "Design",
    Business: "Affaires",
    Marketing: "Marketing",
    Education: "Éducation",
    Networking: "Réseautage",
    Support: "Support",
  },
  es: {
    Tutorials: "Tutoriales",
    Guides: "Guías",
    Design: "Diseño",
    Business: "Negocios",
    Marketing: "Marketing",
    Education: "Educación",
    Networking: "Redes",
    Support: "Soporte",
  },
  de: {
    Tutorials: "Anleitungen",
    Guides: "Leitfäden",
    Design: "Design",
    Business: "Geschäft",
    Marketing: "Marketing",
    Education: "Bildung",
    Networking: "Netzwerk",
    Support: "Support",
  },
  zh: {
    Tutorials: "教程",
    Guides: "指南",
    Design: "设计",
    Business: "商业",
    Marketing: "营销",
    Education: "教育",
    Networking: "社交",
    Support: "支持",
  },
  pt: {
    Tutorials: "Tutoriais",
    Guides: "Guias",
    Design: "Design",
    Business: "Negócios",
    Marketing: "Marketing",
    Education: "Educação",
    Networking: "Redes",
    Support: "Suporte",
  },
  ja: {
    Tutorials: "チュートリアル",
    Guides: "ガイド",
    Design: "デザイン",
    Business: "ビジネス",
    Marketing: "マーケティング",
    Education: "教育",
    Networking: "人脈",
    Support: "サポート",
  },
};

// Sentence / phrase replacement dictionaries for high frequency patterns across all posts
const TRANSLATION_PATTERNS: Record<TargetLocale, Array<[RegExp, string]>> = {
  ar: [
    [/Microsoft OneDrive/g, "مايكروسوفت ون درايف"],
    [/Microsoft Excel/g, "مايكروسوفت إكسيل"],
    [/Microsoft Word/g, "مايكروسوفت وورد"],
    [/Microsoft PowerPoint/g, "مايكروسوفت باوربوينت"],
    [/Google Docs/g, "مستندات جوجل"],
    [/Google Drive/g, "جوجل درايف"],
    [/Google Forms/g, "نماذج جوجل"],
    [/Google Maps/g, "خرائط جوجل"],
    [/Dropbox/g, "دروببوكس"],
    [/Notion/g, "نوشن"],
    [/Canva/g, "كانفا"],
    [/QR Code Generator/g, "مولد كود الـ QR"],
    [/QR Code/g, "كود الـ QR"],
    [/QR codes/g, "رموز الـ QR"],
    [/QR code/g, "كود الـ QR"],
    [/Free QR Code Generator/g, "مولد كود الـ QR المجاني"],
    [/QR Code Generator with Logo/g, "مولد كود الـ QR مع شعار"],
    [/vCard/g, "بطاقة vCard"],
    [/PDF files/g, "ملفات PDF"],
    [/PDF file/g, "ملف PDF"],
    [/PDFs/g, "ملفات PDF"],
    [/PDF/g, "PDF"],
    [/Excel files/g, "ملفات إكسيل"],
    [/Excel file/g, "ملف إكسيل"],
    [/Word documents/g, "مستندات وورد"],
    [/Word document/g, "مستند وورد"],
    [/PowerPoint presentations/g, "عروض باوربوينت"],
    [/PowerPoint presentation/g, "عرض باوربوينت"],
    [/business cards/g, "بطاقات الأعمال"],
    [/business card/g, "بطاقة أعمال"],
    [/digital business card/g, "بطاقة أعمال رقمية"],
    [/restaurant menus/g, "قوائم الطعام للمطاعم"],
    [/restaurant menu/g, "قائمة طعام المطعم"],
    [/online documents/g, "المستندات عبر الإنترنت"],
  ],
  fr: [
    [/Free QR Code Generator/g, "Générateur de Code QR Gratuit"],
    [/QR Code Generator with Logo/g, "Générateur de Code QR avec Logo"],
    [/QR Code Generator/g, "Générateur de Code QR"],
    [/QR codes for/g, "Codes QR pour"],
    [/QR code for/g, "Code QR pour"],
    [/QR codes/g, "codes QR"],
    [/QR code/g, "code QR"],
    [/OneDrive files/g, "fichiers OneDrive"],
    [/Online Documents/g, "Documents en Ligne"],
    [/PowerPoint Presentations/g, "Présentations PowerPoint"],
    [/Excel Files/g, "Fichiers Excel"],
    [/Word Documents/g, "Documents Word"],
    [/Business Cards/g, "Cartes de Visite"],
    [/Digital Business Card/g, "Carte de Visite Numérique"],
    [/Restaurant Menus/g, "Menus de Restaurant"],
    [/Share PDFs Using QR Codes/g, "Partager des PDF via Codes QR"],
  ],
  es: [
    [/Free QR Code Generator/g, "Generador de Código QR Gratis"],
    [/QR Code Generator with Logo/g, "Generador de Código QR con Logo"],
    [/QR Code Generator/g, "Generador de Código QR"],
    [/QR codes for/g, "Códigos QR para"],
    [/QR code for/g, "Código QR para"],
    [/QR codes/g, "códigos QR"],
    [/QR code/g, "código QR"],
    [/OneDrive files/g, "archivos de OneDrive"],
    [/Online Documents/g, "Documentos en Línea"],
    [/PowerPoint Presentations/g, "Presentaciones de PowerPoint"],
    [/Excel Files/g, "Archivos de Excel"],
    [/Word Documents/g, "Documentos de Word"],
    [/Business Cards/g, "Tarjetas de Presentación"],
    [/Digital Business Card/g, "Tarjeta de Presentación Digital"],
    [/Restaurant Menus/g, "Menús de Restaurante"],
    [/Share PDFs Using QR Codes/g, "Compartir PDF con Códigos QR"],
  ],
  de: [
    [/Free QR Code Generator/g, "Kostenloser QR-Code-Generator"],
    [/QR Code Generator with Logo/g, "QR-Code-Generator mit Logo"],
    [/QR Code Generator/g, "QR-Code-Generator"],
    [/QR codes for/g, "QR-Codes für"],
    [/QR code for/g, "QR-Code für"],
    [/QR codes/g, "QR-Codes"],
    [/QR code/g, "QR-Code"],
    [/OneDrive files/g, "OneDrive-Dateien"],
    [/Online Documents/g, "Online-Dokumente"],
    [/PowerPoint Presentations/g, "PowerPoint-Präsentationen"],
    [/Excel Files/g, "Excel-Dateien"],
    [/Word Documents/g, "Word-Dokumente"],
    [/Business Cards/g, "Visitenkarten"],
    [/Digital Business Card/g, "Digitale Visitenkarte"],
    [/Restaurant Menus/g, "Speisekarten für Restaurants"],
    [/Share PDFs Using QR Codes/g, "PDFs per QR-Code teilen"],
  ],
  zh: [
    [/Free QR Code Generator/g, "免费二维码生成器"],
    [/QR Code Generator with Logo/g, "带Logo的二维码生成器"],
    [/QR Code Generator/g, "二维码生成器"],
    [/QR codes for/g, "二维码适用于"],
    [/QR code for/g, "二维码用于"],
    [/QR codes/g, "二维码"],
    [/QR code/g, "二维码"],
    [/OneDrive files/g, "OneDrive文件"],
    [/Online Documents/g, "在线文档"],
    [/PowerPoint Presentations/g, "PowerPoint演示文稿"],
    [/Excel Files/g, "Excel表格文件"],
    [/Word Documents/g, "Word文档"],
    [/Business Cards/g, "名片"],
    [/Digital Business Card/g, "电子名片"],
    [/Restaurant Menus/g, "餐厅菜单"],
    [/Share PDFs Using QR Codes/g, "使用二维码分享PDF文件"],
  ],
  pt: [
    [/Free QR Code Generator/g, "Gerador de Código QR Grátis"],
    [/QR Code Generator with Logo/g, "Gerador de Código QR com Logo"],
    [/QR Code Generator/g, "Gerador de Código QR"],
    [/QR codes for/g, "Códigos QR para"],
    [/QR code for/g, "Código QR para"],
    [/QR codes/g, "códigos QR"],
    [/QR code/g, "código QR"],
    [/OneDrive files/g, "arquivos do OneDrive"],
    [/Online Documents/g, "Documentos Online"],
    [/PowerPoint Presentations/g, "Apresentações do PowerPoint"],
    [/Excel Files/g, "Arquivos do Excel"],
    [/Word Documents/g, "Documentos do Word"],
    [/Business Cards/g, "Cartões de Visita"],
    [/Digital Business Card/g, "Cartão de Visita Digital"],
    [/Restaurant Menus/g, "Cardápios de Restaurante"],
    [/Share PDFs Using QR Codes/g, "Compartilhar PDFs usando Códigos QR"],
  ],
  ja: [
    [/Free QR Code Generator/g, "無料QRコード作成器"],
    [/QR Code Generator with Logo/g, "ロゴ入りQRコード作成器"],
    [/QR Code Generator/g, "QRコード作成器"],
    [/QR codes for/g, "〜用QRコード"],
    [/QR code for/g, "〜用QRコード"],
    [/QR codes/g, "QRコード"],
    [/QR code/g, "QRコード"],
    [/OneDrive files/g, "OneDriveファイル"],
    [/Online Documents/g, "オンラインドキュメント"],
    [/PowerPoint Presentations/g, "PowerPointプレゼンテーション"],
    [/Excel Files/g, "Excelファイル"],
    [/Word Documents/g, "Wordドキュメント"],
    [/Business Cards/g, "名刺"],
    [/Digital Business Card/g, "デジタル名刺"],
    [/Restaurant Menus/g, "レストランメニュー"],
    [/Share PDFs Using QR Codes/g, "QRコードでPDFを共有"],
  ],
};

function translateText(text: string, locale: TargetLocale): string {
  let result = text;

  // Process markdown links [Label](target)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
    let translatedLabel = label;
    const patterns = TRANSLATION_PATTERNS[locale];
    if (patterns) {
      patterns.forEach(([from, to]) => {
        translatedLabel = translatedLabel.replace(from, to);
      });
    }
    return `[${translatedLabel}](${target})`;
  });

  // Apply general terms translation
  const patterns = TRANSLATION_PATTERNS[locale];
  if (patterns) {
    patterns.forEach(([from, to]) => {
      result = result.replace(from, to);
    });
  }

  return result;
}

function translateParagraph(p: string, locale: TargetLocale): string {
  if (p.startsWith("H2: ")) {
    const heading = p.substring(4);
    const translatedHeading = translateText(heading, locale);
    return `H2: ${translatedHeading}`;
  }
  return translateText(p, locale);
}

function processLocale(locale: TargetLocale) {
  console.log(`Processing translations for locale: ${locale}`);

  const translations: Record<string, any> = {};

  BLOG_POSTS.forEach((post) => {
    const category = CATEGORY_MAP[locale][post.category] || post.category;
    const title = translateText(post.title, locale);
    const summary = translateText(post.summary, locale);
    const metaDescription = translateText(post.metaDescription, locale);
    const keywords = post.keywords.map((k) => translateText(k, locale));
    const content = post.content.map((p) => translateParagraph(p, locale));

    translations[post.id] = {
      title,
      category,
      summary,
      metaDescription,
      keywords,
      content,
    };
  });

  const filePath = path.join(process.cwd(), `src/data/translations/${locale}.ts`);
  const fileContent = `import { BlogTranslation } from "../blogTranslations";\n\nexport const ${locale}Translations: Record<string, Partial<BlogTranslation>> = ${JSON.stringify(
    translations,
    null,
    2
  )};\n`;

  fs.writeFileSync(filePath, fileContent, "utf8");
  console.log(`Saved ${locale}.ts with ${Object.keys(translations).length} posts.`);
}

const targetLocales: TargetLocale[] = ["ar", "fr", "es", "de", "zh", "pt", "ja"];
targetLocales.forEach(processLocale);

console.log("Translation generation complete!");
