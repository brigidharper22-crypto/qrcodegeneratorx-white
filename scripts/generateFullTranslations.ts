import fs from "fs";
import path from "path";
import { BLOG_POSTS, BlogPost } from "../src/data/blogData";

type TargetLocale = "ar" | "fr" | "es" | "de" | "zh" | "pt" | "ja";

// Category translations
const CATEGORIES: Record<TargetLocale, Record<string, string>> = {
  ar: { Tutorials: "دروس", Guides: "أدلة", Design: "تصميم", Business: "أعمال", Marketing: "تسويق", Education: "تعليم", Networking: "شبكات", Support: "دعم" },
  fr: { Tutorials: "Tutoriels", Guides: "Guides", Design: "Design", Business: "Affaires", Marketing: "Marketing", Education: "Éducation", Networking: "Réseautage", Support: "Support" },
  es: { Tutorials: "Tutoriales", Guides: "Guías", Design: "Diseño", Business: "Negocios", Marketing: "Marketing", Education: "Educación", Networking: "Redes", Support: "Soporte" },
  de: { Tutorials: "Anleitungen", Guides: "Leitfäden", Design: "Design", Business: "Geschäft", Marketing: "Marketing", Education: "Bildung", Networking: "Netzwerk", Support: "Support" },
  zh: { Tutorials: "教程", Guides: "指南", Design: "设计", Business: "商业", Marketing: "营销", Education: "教育", Networking: "社交", Support: "支持" },
  pt: { Tutorials: "Tutoriais", Guides: "Guias", Design: "Design", Business: "Negócios", Marketing: "Marketing", Education: "Educação", Networking: "Redes", Support: "Suporte" },
  ja: { Tutorials: "チュートリアル", Guides: "ガイド", Design: "デザイン", Business: "ビジネス", Marketing: "マーケティング", Education: "教育", Networking: "人脈", Support: "サポート" }
};

// Common Heading and Phrase Dictionaries
const PHRASES: Record<TargetLocale, Array<[RegExp, string]>> = {
  ar: [
    [/H2: What Is a (.*)\?/gi, "H2: ما هو $1؟"],
    [/H2: What Is (.*)\?/gi, "H2: ما هو $1؟"],
    [/H2: Benefits of (.*)/gi, "H2: فوائد $1"],
    [/H2: Who Should Use (.*)\?/gi, "H2: من يجب عليه استخدام $1؟"],
    [/H2: What Can Your (.*) Link To\?/gi, "H2: إلى ماذا يمكن أن يربط $1 الخاص بك؟"],
    [/H2: How to Create (.*)/gi, "H2: كيفية إنشاء $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: خطوة بخطوة: $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: أفضل الأماكن لعرض $1"],
    [/H2: Best Practices (.*)/gi, "H2: أفضل الممارسات لـ $1"],
    [/H2: Best Practices/gi, "H2: أفضل الممارسات"],
    [/H2: Common Mistakes to Avoid/gi, "H2: أخطاء شائعة يجب تجنبها"],
    [/H2: Frequently Asked Questions/gi, "H2: الأسئلة الشائعة"],
    [/H2: Final Thoughts/gi, "H2: أفكار ختامية"],
    [/H2: SEO Tips (.*)/gi, "H2: نصائح تحسين محركات البحث لـ $1"],
    [/H2: Step 1: (.*)/gi, "H2: الخطوة 1: $1"],
    [/H2: Step 2: (.*)/gi, "H2: الخطوة 2: $1"],
    [/H2: Step 3: (.*)/gi, "H2: الخطوة 3: $1"],
    [/H2: Step 4: (.*)/gi, "H2: الخطوة 4: $1"],
    [/H2: Step 5: (.*)/gi, "H2: الخطوة 5: $1"],
    [/Step 1: (.*)/g, "الخطوة 1: $1"],
    [/Step 2: (.*)/g, "الخطوة 2: $1"],
    [/Step 3: (.*)/g, "الخطوة 3: $1"],
    [/Step 4: (.*)/g, "الخطوة 4: $1"],
    [/Step 5: (.*)/g, "الخطوة 5: $1"],
    [/Free QR Code Generator/gi, "مولد كود الـ QR المجاني"],
    [/QR Code Generator with Logo/gi, "مولد كود الـ QR مع شعار"],
    [/QR Code Generator/gi, "مولد كود الـ QR"],
    [/QR Codes for Restaurant Menus/gi, "رموز QR لقوائم طعام المطاعم"],
    [/QR Codes for Business Cards/gi, "رموز QR لبطاقات الأعمال"],
    [/QR Codes for Word Documents/gi, "رموز QR لمستندات وورد"],
    [/QR Codes for Excel Files/gi, "رموز QR لملفات إكسيل"],
    [/QR Codes for PowerPoint Presentations/gi, "رموز QR لعروض باوربوينت"],
    [/Create QR Codes for Online Documents/gi, "إنشاء رموز QR للمستندات عبر الإنترنت"],
    [/Digital Business Card QR Codes/gi, "رموز QR لبطاقات الأعمال الرقمية"],
    [/QR Codes for Dropbox Links/gi, "رموز QR لروابط دروببوكس"],
    [/QR Codes for OneDrive Files/gi, "رموز QR لملفات ون درايف"],
    [/Share PDFs Using QR Codes/gi, "مشاركة ملفات PDF باستخدام رموز QR"],
    [/Create QR Codes for Google Drive Files/gi, "إنشاء رموز QR لملفات جوجل درايف"],
    [/Generate QR Codes for Google Docs/gi, "توليد رموز QR لمستندات جوجل"],
    [/How to Create a QR Code for Google Forms/gi, "كيفية إنشاء كود QR لنماذج جوجل"],
    [/How to Create a QR Code for Google Docs/gi, "كيفية إنشاء كود QR لمستندات جوجل"],
    [/How to Create QR Code for Notion Pages/gi, "كيفية إنشاء كود QR لصفحات نوشن"],
    [/How to Create QR Code for Canva Designs/gi, "كيفية إنشاء كود QR لتصاميم كانفا"],
    [/How to Create QR Code for OneDrive Documents/gi, "كيفية إنشاء كود QR لمستندات ون درايف"],
    [/How to Create QR Code for Dropbox Files/gi, "كيفية إنشاء كود QR لملفات دروببوكس"],
    [/How to Create QR Code for Google Drive Links/gi, "كيفية إنشاء كود QR لروابط جوجل درايف"],
    [/How to Create QR Code for MP3 Files/gi, "كيفية إنشاء كود QR لملفات MP3"],
    [/How to Create QR Code for Videos/gi, "كيفية إنشاء كود QR لمقاطع الفيديو"],
    [/How to Create QR Code for Images/gi, "كيفية إنشاء كود QR للصور"],
    [/How to Create QR Code for PDF Files/gi, "كيفية إنشاء كود QR لملفات PDF"],
    [/How to Create QR Code for Google Maps Location/gi, "كيفية إنشاء كود QR لموقع خرائط جوجل"],
    [/vCard QR Code/gi, "كود QR لبطاقة vCard الرقمية"],
    [/WhatsApp QR Code/gi, "كود QR للواتساب"],
    [/WiFi QR Code/gi, "كود QR لشبكة الواي فاي"],
    [/QR Code vs Barcode/gi, "كود QR مقابل الباركوم القياسي"],
    [/How to Scan QR Code/gi, "كيفية مسح كود QR"],
    [/QR code/gi, "كود الـ QR"],
    [/QR codes/gi, "رموز الـ QR"],
    [/For related guides, check out our tutorials on/gi, "للحصول على أدلة ذات صلة، اطلع على دروسنا حول"],
  ],
  fr: [
    [/H2: What Is a (.*)\?/gi, "H2: Qu'est-ce qu'un $1 ?"],
    [/H2: Benefits of (.*)/gi, "H2: Avantages des $1"],
    [/H2: Who Should Use (.*)\?/gi, "H2: Qui devrait utiliser $1 ?"],
    [/H2: How to Create (.*)/gi, "H2: Comment créer $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: Étape par étape : $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: Meilleurs endroits pour afficher $1"],
    [/H2: Best Practices/gi, "H2: Meilleures pratiques"],
    [/H2: Common Mistakes to Avoid/gi, "H2: Erreurs courantes à éviter"],
    [/H2: Frequently Asked Questions/gi, "H2: Foire aux questions"],
    [/H2: Final Thoughts/gi, "H2: Réflexions finales"],
    [/Free QR Code Generator/gi, "Générateur de Code QR Gratuit"],
    [/QR Code Generator with Logo/gi, "Générateur de Code QR avec Logo"],
    [/QR Code Generator/gi, "Générateur de Code QR"],
    [/QR Codes for Restaurant Menus/gi, "Codes QR pour menus de restaurant"],
    [/QR Codes for Business Cards/gi, "Codes QR pour cartes de visite"],
    [/QR Codes for Word Documents/gi, "Codes QR pour documents Word"],
    [/QR Codes for Excel Files/gi, "Codes QR pour fichiers Excel"],
    [/QR Codes for PowerPoint Presentations/gi, "Codes QR pour présentations PowerPoint"],
    [/Create QR Codes for Online Documents/gi, "Créer des codes QR pour documents en ligne"],
    [/Digital Business Card QR Codes/gi, "Codes QR de carte de visite numérique"],
    [/Share PDFs Using QR Codes/gi, "Partager des PDF avec des codes QR"],
    [/QR code/gi, "code QR"],
    [/QR codes/gi, "codes QR"],
    [/For related guides, check out our tutorials on/gi, "Pour des guides connexes, consultez nos tutoriels sur"],
  ],
  es: [
    [/H2: What Is a (.*)\?/gi, "H2: ¿Qué es un $1?"],
    [/H2: Benefits of (.*)/gi, "H2: Beneficios de $1"],
    [/H2: Who Should Use (.*)\?/gi, "H2: ¿Quién debería usar $1?"],
    [/H2: How to Create (.*)/gi, "H2: Cómo crear $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: Paso a paso: $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: Mejores lugares para mostrar $1"],
    [/H2: Best Practices/gi, "H2: Mejores prácticas"],
    [/H2: Common Mistakes to Avoid/gi, "H2: Errores comunes a evitar"],
    [/H2: Frequently Asked Questions/gi, "H2: Preguntas frecuentes"],
    [/H2: Final Thoughts/gi, "H2: Conclusiones"],
    [/Free QR Code Generator/gi, "Generador de Código QR Gratis"],
    [/QR Code Generator with Logo/gi, "Generador de Código QR con Logo"],
    [/QR Code Generator/gi, "Generador de Código QR"],
    [/QR Codes for Restaurant Menus/gi, "Códigos QR para menús de restaurante"],
    [/QR Codes for Business Cards/gi, "Códigos QR para tarjetas de presentación"],
    [/QR Codes for Word Documents/gi, "Códigos QR para documentos de Word"],
    [/QR Codes for Excel Files/gi, "Códigos QR para archivos de Excel"],
    [/QR Codes for PowerPoint Presentations/gi, "Códigos QR para presentaciones de PowerPoint"],
    [/Create QR Codes for Online Documents/gi, "Crear códigos QR para documentos en línea"],
    [/Digital Business Card QR Codes/gi, "Códigos QR para tarjetas de presentación digitales"],
    [/Share PDFs Using QR Codes/gi, "Compartir archivos PDF con códigos QR"],
    [/QR code/gi, "código QR"],
    [/QR codes/gi, "códigos QR"],
    [/For related guides, check out our tutorials on/gi, "Para guías relacionadas, consulte nuestros tutoriales sobre"],
  ],
  de: [
    [/H2: What Is a (.*)\?/gi, "H2: Was ist ein $1?"],
    [/H2: Benefits of (.*)/gi, "H2: Vorteile von $1"],
    [/H2: Who Should Use (.*)\?/gi, "H2: Wer sollte $1 nutzen?"],
    [/H2: How to Create (.*)/gi, "H2: So erstellen Sie $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: Schritt für Schritt: $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: Die besten Orte zum Anzeigen von $1"],
    [/H2: Best Practices/gi, "H2: Bewährte Verfahren"],
    [/H2: Common Mistakes to Avoid/gi, "H2: Häufige Fehler, die Sie vermeiden sollten"],
    [/H2: Frequently Asked Questions/gi, "H2: Häufig gestellte Fragen"],
    [/H2: Final Thoughts/gi, "H2: Fazit"],
    [/Free QR Code Generator/gi, "Kostenloser QR-Code-Generator"],
    [/QR Code Generator with Logo/gi, "QR-Code-Generator mit Logo"],
    [/QR Code Generator/gi, "QR-Code-Generator"],
    [/QR Codes for Restaurant Menus/gi, "QR-Codes für Speisekarten"],
    [/QR Codes for Business Cards/gi, "QR-Codes für Visitenkarten"],
    [/QR Codes for Word Documents/gi, "QR-Codes für Word-Dokumente"],
    [/QR Codes for Excel Files/gi, "QR-Codes für Excel-Dateien"],
    [/QR Codes for PowerPoint Presentations/gi, "QR-Codes für PowerPoint-Präsentationen"],
    [/Create QR Codes for Online Documents/gi, "QR-Codes für Online-Dokumente erstellen"],
    [/Digital Business Card QR Codes/gi, "QR-Codes für digitale Visitenkarten"],
    [/Share PDFs Using QR Codes/gi, "PDFs per QR-Code teilen"],
    [/QR code/gi, "QR-Code"],
    [/QR codes/gi, "QR-Codes"],
    [/For related guides, check out our tutorials on/gi, "Weitere Anleitungen finden Sie in unseren Tutorials zu"],
  ],
  zh: [
    [/H2: What Is a (.*)\?/gi, "H2: 什么是 $1？"],
    [/H2: Benefits of (.*)/gi, "H2: $1 的优势"],
    [/H2: Who Should Use (.*)\?/gi, "H2: 谁应该使用 $1？"],
    [/H2: How to Create (.*)/gi, "H2: 如何创建 $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: 逐步教程: $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: 展示 $1 的最佳位置"],
    [/H2: Best Practices/gi, "H2: 最佳实践"],
    [/H2: Common Mistakes to Avoid/gi, "H2: 需要避免的常见错误"],
    [/H2: Frequently Asked Questions/gi, "H2: 常见问题解答"],
    [/H2: Final Thoughts/gi, "H2: 总结"],
    [/Free QR Code Generator/gi, "免费二维码生成器"],
    [/QR Code Generator with Logo/gi, "带Logo的二维码生成器"],
    [/QR Code Generator/gi, "二维码生成器"],
    [/QR Codes for Restaurant Menus/gi, "餐厅菜单二维码"],
    [/QR Codes for Business Cards/gi, "名片二维码"],
    [/QR Codes for Word Documents/gi, "Word文档二维码"],
    [/QR Codes for Excel Files/gi, "Excel表格二维码"],
    [/QR Codes for PowerPoint Presentations/gi, "PowerPoint演示文稿二维码"],
    [/Create QR Codes for Online Documents/gi, "创建在线文档二维码"],
    [/Digital Business Card QR Codes/gi, "电子名片二维码"],
    [/Share PDFs Using QR Codes/gi, "使用二维码分享PDF文件"],
    [/QR code/gi, "二维码"],
    [/QR codes/gi, "二维码"],
    [/For related guides, check out our tutorials on/gi, "有关相关指南，请查看我们关于以下内容的教程："],
  ],
  pt: [
    [/H2: What Is a (.*)\?/gi, "H2: O que é um $1?"],
    [/H2: Benefits of (.*)/gi, "H2: Benefícios de $1"],
    [/H2: Who Should Use (.*)\?/gi, "H2: Quem deve usar $1?"],
    [/H2: How to Create (.*)/gi, "H2: Como criar $1"],
    [/H2: Step-by-Step: (.*)/gi, "H2: Passo a passo: $1"],
    [/H2: Best Places to Display (.*)/gi, "H2: Melhores lugares para exibir $1"],
    [/H2: Best Practices/gi, "H2: Melhores práticas"],
    [/H2: Common Mistakes to Avoid/gi, "H2: Erros comuns a evitar"],
    [/H2: Frequently Asked Questions/gi, "H2: Perguntas frequentes"],
    [/H2: Final Thoughts/gi, "H2: Considerações finais"],
    [/Free QR Code Generator/gi, "Gerador de Código QR Grátis"],
    [/QR Code Generator with Logo/gi, "Gerador de Código QR com Logo"],
    [/QR Code Generator/gi, "Gerador de Código QR"],
    [/QR Codes for Restaurant Menus/gi, "Códigos QR para cardápios de restaurante"],
    [/QR Codes for Business Cards/gi, "Códigos QR para cartões de visita"],
    [/QR Codes for Word Documents/gi, "Códigos QR para documentos do Word"],
    [/QR Codes for Excel Files/gi, "Códigos QR para arquivos do Excel"],
    [/QR Codes for PowerPoint Presentations/gi, "Códigos QR para apresentações do PowerPoint"],
    [/Create QR Codes for Online Documents/gi, "Criar códigos QR para documentos online"],
    [/Digital Business Card QR Codes/gi, "Códigos QR para cartão de visita digital"],
    [/Share PDFs Using QR Codes/gi, "Compartilhar PDFs usando códigos QR"],
    [/QR code/gi, "código QR"],
    [/QR codes/gi, "códigos QR"],
    [/For related guides, check out our tutorials on/gi, "Para guias relacionados, confira nossos tutoriais sobre"],
  ],
  ja: [
    [/H2: What Is a (.*)\?/gi, "H2: $1とは？"],
    [/H2: Benefits of (.*)/gi, "H2: $1のメリット"],
    [/H2: Who Should Use (.*)\?/gi, "H2: $1を活用すべき対象"],
    [/H2: How to Create (.*)/gi, "H2: $1の作成手順"],
    [/H2: Step-by-Step: (.*)/gi, "H2: ステップ・バイ・ステップ：$1"],
    [/H2: Best Places to Display (.*)/gi, "H2: $1の最適な掲示場所"],
    [/H2: Best Practices/gi, "H2: ベストプラクティス"],
    [/H2: Common Mistakes to Avoid/gi, "H2: 避けるべきよくある間違い"],
    [/H2: Frequently Asked Questions/gi, "H2: よくある質問"],
    [/H2: Final Thoughts/gi, "H2: まとめ"],
    [/Free QR Code Generator/gi, "無料QRコード作成器"],
    [/QR Code Generator with Logo/gi, "ロゴ入りQRコード作成器"],
    [/QR Code Generator/gi, "QRコード作成器"],
    [/QR Codes for Restaurant Menus/gi, "レストランメニュー用QRコード"],
    [/QR Codes for Business Cards/gi, "名刺用QRコード"],
    [/QR Codes for Word Documents/gi, "Wordドキュメント用QRコード"],
    [/QR Codes for Excel Files/gi, "Excelファイル用QRコード"],
    [/QR Codes for PowerPoint Presentations/gi, "PowerPoint用QRコード"],
    [/Create QR Codes for Online Documents/gi, "オンラインドキュメント用QRコード"],
    [/Digital Business Card QR Codes/gi, "デジタル名刺用QRコード"],
    [/Share PDFs Using QR Codes/gi, "QRコードでPDFを共有"],
    [/QR code/gi, "QRコード"],
    [/QR codes/gi, "QRコード"],
    [/For related guides, check out our tutorials on/gi, "関連ガイドについては、以下のチュートリアルをご覧ください："],
  ],
};

function transformText(text: string, locale: TargetLocale): string {
  let result = text;

  // Process markdown links [label](slug)
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, target) => {
    let transLabel = label;
    const rules = PHRASES[locale] || [];
    rules.forEach(([regex, repl]) => {
      transLabel = transLabel.replace(regex, repl);
    });
    return `[${transLabel}](${target})`;
  });

  const rules = PHRASES[locale] || [];
  rules.forEach(([regex, repl]) => {
    result = result.replace(regex, repl);
  });

  return result;
}

function processAllLocales() {
  const locales: TargetLocale[] = ["ar", "fr", "es", "de", "zh", "pt", "ja"];

  locales.forEach((locale) => {
    console.log(`Generating translations for ${locale}...`);
    const translations: Record<string, any> = {};

    BLOG_POSTS.forEach((post) => {
      const category = CATEGORIES[locale][post.category] || post.category;
      const title = transformText(post.title, locale);
      const summary = transformText(post.summary, locale);
      const metaDescription = transformText(post.metaDescription, locale);
      const keywords = post.keywords.map((k) => transformText(k, locale));
      const content = post.content.map((p) => transformText(p, locale));

      translations[post.id] = {
        title,
        category,
        summary,
        metaDescription,
        keywords,
        content,
      };
    });

    const outPath = path.join(process.cwd(), `src/data/translations/${locale}.ts`);
    const code = `import { BlogTranslation } from "../blogTranslations";\n\nexport const ${locale}Translations: Record<string, Partial<BlogTranslation>> = ${JSON.stringify(
      translations,
      null,
      2
    )};\n`;

    fs.writeFileSync(outPath, code, "utf8");
    console.log(`Saved ${locale}.ts (${Object.keys(translations).length} posts)`);
  });
}

processAllLocales();
console.log("Translation processing finished!");
