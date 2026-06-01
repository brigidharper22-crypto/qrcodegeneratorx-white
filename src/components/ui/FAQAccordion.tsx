import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, HelpCircle, HelpCircle as HelpIcon } from "lucide-react";
import { useI18n } from "../../hooks/useI18n";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const FAQS_AR: FAQItem[] = [
  {
    id: 1,
    category: "عام",
    question: "ما هو كود الـ QR وكيف يعمل؟",
    answer: "رمز الاستجابة السريعة (QR) هو رمز شريطي ثنائي الأبعاد تم تطويره في عام 1994 بواسطة شركة Denso Wave اليابانية. يعمل عن طريق تشفير البيانات الرقمية والأبجدية والروابط في شبكة من المربعات البيضاء والسوداء. عندما يقوم الهاتف الذكي بمسح هذه الشبكة، تترجم الكاميرا النقاط إلى نصوص أو خيارات مباشرة كرابط موقع أو رقم هاتف في أقل من 40 مللي ثانية.",
  },
  {
    id: 2,
    category: "عام",
    question: "كيف يمكنني إنشاء كود QR مجاناً؟",
    answer: "عملية إنشاء رمز QR على موقع qrcodegeneratorx سهلة وآمنة ومجانية بالكامل. ببساطة اختر تبويب المحتوى المطلوب (مثل رابط موقع إلكتروني، شبكة واي فاي، جهة اتصال vCard، واتساب)، ثم أدخل البيانات المطلوبة وتابع المعاينة الحية الفورية بالمنتصف. بمجرد رضاك عن النتيجة، انقر على زر PNG أو SVG أو PDF لتحميل الملف فوراً وجاهزاً للطباعة.",
  },
  {
    id: 3,
    category: "عام",
    question: "هل يمكنني إنشاء رمز QR لأي رابط موقع إلكتروني؟",
    answer: "نعم بالطبع! يمكنك إنشاء رموز QR لأي رابط ويب صحيح. يشمل ذلك المواقع الشخصية، حسابات لينكدإن، قنوات يوتيوب، صفحات السوشيال ميديا، قوائم طعام المطاعم، إحداثيات الخريطة، أو ملفات PDF المرفوعة سحابياً. يتم كتابة الرابط مع رمز http:// أو https:// ليعمل بشكل صحيح ومباشر.",
  },
  {
    id: 4,
    category: "عام",
    question: "ما هو أفضل مولد رموز QR مجاني في عام 2025؟",
    answer: "يعتبر qrcodegeneratorx الخيار الأفضل لأنه يعمل بالكامل من جانب العميل (Client-Side). على عكس المولدات التجارية التي تجمع بياناتك الشخصية، أو تضع تواريخ صلاحية لرموزك لإجبارك على شراء باقة مميزة، qrcodegeneratorx يمنحك رموزاً ثابتة تدوم للأبد ومجانية 100% مع دعم إضافة شعارك وتخصيص ألوانك المفضلة.",
  },
  {
    id: 5,
    category: "تقني",
    question: "كيف يمكنني تحميل كود الـ QR بصيغة PNG أو SVG؟",
    answer: "بمجرد الانتهاء من تخصيص مظهر وتفاصيل كود الـ QR، ستجد أزرار تحميل واضحة: زر PNG وهو الصيغة المثالية للشاشات الرقمية والسوشيال ميديا، وزر SVG وهو صيغة متجهية عالية الدقة لا تفقد نقائها مهما كبرت الصورة مما يجعلها الخيار المثالي للطباعة، وزر PDF لطباعة الرمز مباشرة كملف وثيقة ورقية.",
  },
  {
    id: 6,
    category: "التخصيص والتصميم",
    question: "هل يمكنني إضافة شعاري الخاص في منتصف رمز الـ QR؟",
    answer: "نعم! يمكنك رفع أي شعار مخصص لشركتك أو بطاقتك الشخصية (بصيغ PNG أو JPG) ووضعه في منتصف الرمز. ستقوم المنصة تلقائياً بضبط مقاسه وحمايته لمنع تداخله بـ 20% من مساحة الكود. يوصى برفع مستوى تصحيح الأخطاء إلى 'H' (30%) لضمان موثوقية المسح التام.",
  },
  {
    id: 7,
    category: "تقني",
    question: "ما هو تصحيح الخطأ بطريقة ريد-سولومون (Reed-Solomon)؟",
    answer: "هو نظام رياضي متطور يسمح للهواتف بقراءة رموز الـ QR بنجاح حتى لو تعرض الرمز للتمزق، الأتربة، أو التغطية الجزئية بسبب وجود شعار مخصص في المنتصف. نقوم بدعم 4 مستويات: L (7% استرداد)، M (15% استرداد)، Q (25% استرداد)، و H (30% استرداد). عندما تضيف شعاراً نوصي بتحديد الخيار الأعلى H لضمان المسح المضمون.",
  },
  {
    id: 8,
    category: "عام",
    question: "كيف يمكنني إنشاء كود QR لشبكة واي فاي؟",
    answer: "اختر تبويب 'شبكة واي فاي' وأدخل اسم البث الخاص بالراوتر (SSID) وكلمة المرور ونوع التشفير (WPA/WPA2 هو الخيار القياسي لغالب الأجهزة المعاصرة). بمجرد مسح الضيوف للرمز، ستتصل هواتفهم الذكية بالإنترنت فوراً دون الحاجة لكتابة أحرف معقدة يدوياً.",
  },
  {
    id: 9,
    category: "عام",
    question: "كيف أصنع رمز QR لبطاقة جهة اتصال (vCard) لبطاقات أعمالي؟",
    answer: "اختر تبويب 'جهة اتصال vCard' وأدخل اسمك الكامل، هاتف العمل، البريد الإلكتروني، الموقع وتفاصيل عنوانك. سيقوم المولد بتعبئة هذه التفاصيل وتنسيقها محلياً وبشكل قياسي. بمجرد أن يمسحه العميل أو الزميل، يقترح هاتفه إضافة جهة اتصال جديدة وحفظها فوراً دون كتابة.",
  },
  {
    id: 10,
    category: "عام",
    question: "كيف يمكنني إنشاء كود QR لحساب واتساب؟",
    answer: "اختر تبويب 'محادثة واتساب' وأدخل رقم هاتفك مسبوقاً برمز الدولة (بدون أصفار أو رموز زائد)، واكتب رسالة ترحيبية جاهزة مسودة مثل 'مرحباً، أود الاستفسار عن خدماتكم'. مسح هذا الرمز سيفتح محادثة واتساب جارية فوراً.",
  },
  {
    id: 11,
    category: "عام",
    question: "هل موقع qrcodegeneratorx مجاني بالكامل؟",
    answer: "نعم، qrcodegeneratorx مجاني بالكامل وصالح للاستغلال الشخصي والتجاري واللوجستي والتسويقي مدى الحياة. رموزنا ثابتة ومباشرة، لا تتطلب دفع اشتراكات، ولا تنتهي صلاحيتها على الإطلاق. نوفر الخدمة مجاناً بدعم من إعلانات Mediavine المنسقة وغير المزعجة.",
  },
  {
    id: 12,
    category: "عام",
    question: "هل أحتاج إلى إنشاء حساب لاستخدامه؟",
    answer: "لا يتطلب أي تسجيل أو مشاركة للبريد الإلكتروني أو كلمات مرور! نهدف لتقديم خدمة فائقة الراحة والسرعة؛ تفضل بالزيارة، صمم الكود، وحمله فوراً دون إضاعة دقيقة واحدة.",
  },
  {
    id: 13,
    category: "عام",
    question: "كيف أقوم بمسح كود الـ QR باستخدام هاتفي؟",
    answer: "افتح تطبيق الكاميرا الأساسي في هاتفك الذكي (سواء كان أيفون أو أندرويد). وجه الكاميرا نحو الرمز حتى يتضح بالمنتصف. سيظهر لك إشعار أو بطاقة منبثقة تطلب منك تأكيد الفعل (مثل زيارة الرابط أو الاتصال بالواي فاي)، اضغط عليها للتأكيد.",
  },
  {
    id: 14,
    category: "التخصيص والتصميم",
    question: "هل يمكنني تخصيص وتغيير ألوان كود الـ QR؟",
    answer: "نعم بالطبع! تتميز أدواتنا بلوحة ألوان كاملة مخصصة. يمكنك تحديد أحد التنسيقات سريعة التباين الجاهزة بالمنصة، أو تحديد لون النقاط ولون الأرضية بنفسك بالكامل. احرص دوماً على إحداث تباين كافٍ بين اللونين لضمان سرعة مسح العدسات.",
  },
  {
    id: 15,
    category: "تقني",
    question: "ما الفرق بين رموز الـ QR الثابتة (Static) والديناميكية (Dynamic)؟",
    answer: "أكواد الـ QR الثابتة تقوم بحفظ وتشفير النص والبيانات داخل الرمز نفسه مباشرة؛ وبالتالي لا يمكن تغيير الرابط بداخلها بعد طباعتها، وتتميز بأنها آمنة وتعمل للأبد دون خوادم. بينما الأكواد الديناميكية تسجل رابط خادم وسيط يحول الزوار لأي رابط آخر على الطاير. qrcodegeneratorx هو مولد أكواد ثابتة آمنة ودائمة بالكامل.",
  },
  {
    id: 16,
    category: "عام",
    question: "كم تبلغ مدة صلاحية رموز الـ QR؟",
    answer: "أكواد الـ QR الثابتة التي تنشئها هنا صالحة للعمل مدى الحياة ولا تنتهي صلاحيتها أبداً! نظراً لأن التفاصيل منسوجة بداخل بكسلات المربعات ذاتها، ستظل تعمل طالما كان رابط الوجهة أو الشبكة نشطاً ومتاحاً.",
  },
  {
    id: 17,
    category: "تقني",
    question: "ما هي الدقة المطلوبة لكود الـ QR عند الطباعة؟",
    answer: "للطباعة على المطبوعات متناهية الصغر كبطاقات الأعمال، نوصي بدقة 350 بكسل أو 512 بكسل. أما للوحات الكبيرة والبوسترات يفضل تصدير صيغ الممتجهات SVG أو ملفات PDF حيث تحافظ على نقائها المتكامل مهما تم تكبير الرمز.",
  },
  {
    id: 18,
    category: "عام",
    question: "هل يمكن استخدام رموز الـ QR لقوائم طعام المطاعم والـ Menu؟",
    answer: "بكل تأكيد! هذه ممارسة قياسية شهيرة في قطاع المطاعم والضيافة. ارفع ملف قائمة الطعام بصيغة PDF على الويب (مثل Google Drive أو Dropbox)، وانسخ رابط الملف، والصقه في خانة الرابط بموقعنا، ثم حمل الكود واطبعه على الطاولات.",
  },
  {
    id: 19,
    category: "تقني",
    question: "ما هو الحد الأقصى للبيانات التي يمكن لكود الـ QR تخزينها؟",
    answer: "رمز الـ QR الضخم يمكنه تشفير آلاف الأحرف، ولكن لمنع الرمز من أن يصبح مزدحماً ومقعداً ويصعب على عدسات الهواتف الرخيصة التركيز عليه ومسحه، ننصح بشدة بإبقاء النصوص والروابط بداخل الرمز تحت حاجز 300 حرف.",
  },
  {
    id: 20,
    category: "الأمان والخصوصية",
    question: "هل أكواد الـ QR التي أنشئها آمنة وخاصة؟",
    answer: "نعم، qrcodegeneratorx يعمل 100% داخل المتصفح من جانب العميل، على عكس الخدمات التجارية التي تحتفظ ببياناتك وأسرارك في خوادمها، لدينا لا تغادر بياناتك جهازك ولا تعرض لأي خطر أو تسريب سحابي.",
  }
];

const FAQS_EN: FAQItem[] = [
  {
    id: 1,
    category: "General",
    question: "What is a QR code and how does it work?",
    answer: "A Quick Response (QR) code is a matrix two-dimensional barcode designed in 1994 by Denso Wave. It works by encoding data into a black and white checkerboard grid. When scanned by a phone, it translates the patterns into a readable URL or text instantly.",
  },
  {
    id: 2,
    category: "General",
    question: "How do I generate a QR code for free?",
    answer: "Simply choose your format (URL, WiFi, etc.), input details, customize styles (colors/logos), and click PNG, SVG or PDF to download immediately on the client side.",
  },
  {
    id: 3,
    category: "General",
    question: "Can I create a QR code for any website URL?",
    answer: "Yes, including link configurations, social media, dining menus, Google Drive URLs or PDF shares, with mandatory http:// or https:// schema inclusion.",
  },
  {
    id: 4,
    category: "General",
    question: "What is the best free QR code generator in 2025?",
    answer: "qrcodegeneratorx is a top choice is because it operates 100% client-side. No logins required, no expired static codes, no secret paywalls, and high vector formats built-in.",
  },
  {
    id: 5,
    category: "Technical",
    question: "How do I download my QR code as PNG or SVG?",
    answer: "Use SVG for high-resolution print banners; they remain mathematically perfect. For screens like websites or newsletters, use standard PNG files.",
  },
  {
    id: 6,
    category: "Customization",
    question: "Can I add my logo to the center of a QR code?",
    answer: "Yes, easily drag-and-drop your company trademark PNG or JPG. It masks and center aligns automatically within 20% size limits.",
  },
  {
    id: 7,
    category: "Technical",
    question: "What is Reed-Solomon error correction?",
    answer: "It is a mathematical error mitigation structure allowing QR readers to decode correctly even if parts are damaged or obstructed by central logo layers.",
  },
  {
    id: 8,
    category: "General",
    question: "How do I create a WiFi QR code?",
    answer: "Under the 'WiFi Router' tab, input SSID, Security password and protocol. Scanners will connect guests to the hotspot with no typing friction.",
  },
  {
    id: 9,
    category: "General",
    question: "How do I make a vCard QR code for business?",
    answer: "Enter your contact parameters in the vCard tab. Scanners can save your phone number, email, and address details straight to their phone book.",
  },
  {
    id: 10,
    category: "General",
    question: "How do I create a WhatsApp QR code?",
    answer: "Use the WhatsApp tab, insert your mobile country prefix and pre-prepared text message. Scanning begins a chat window instantly.",
  },
  {
    id: 11,
    category: "General",
    question: "Is qrcodegeneratorx completely free?",
    answer: "Absolutely! There are no limits or expiring trial traps. Our robust operations are funded by unobtrusive ads coordinated with Mediavine.",
  },
  {
    id: 12,
    category: "General",
    question: "Do I need to create an account?",
    answer: "No account or profile signup is required. You get seamless, lightweight, immediate utilities in under 10 seconds.",
  },
  {
    id: 13,
    category: "General",
    question: "How do I scan a QR code with my phone?",
    answer: "Launch your iOS or Android camera app and point it squarely at the pattern. Tap the popup action banner that displays.",
  },
  {
    id: 14,
    category: "Customization",
    question: "Can I customize QR code colors?",
    answer: "Yes. Use our customized visual palette presets or choose custom color hexes manually. Keep high contrast for optimum scanning.",
  },
  {
    id: 15,
    category: "Technical",
    question: "What is the difference between static and dynamic QRs?",
    answer: "Static codes write data directly into the matrix block and work forever without servers. Dynamic codes use redirect servers to alter links later.",
  },
  {
    id: 16,
    category: "General",
    question: "How long do QR codes last?",
    answer: "Our static QR codes last forever and have no expiration dates because they represent hardcoded browser coordinates.",
  },
  {
    id: 17,
    category: "Technical",
    question: "What resolution should my QR code be?",
    answer: "Use 350px or 512px for business cards, and download SVG vectors for large placards to ensure the graphics remain crisp.",
  },
  {
    id: 18,
    category: "General",
    question: "Can QR codes be used for restaurant menus?",
    answer: "Certainly! Upload your menu PDF to a cloud service, copy its share link, and paste indeed into our 'Website URL' tab to print menu codes.",
  },
  {
    id: 19,
    category: "Technical",
    question: "What is the maximum data capacity?",
    answer: "A QR code can store up to 7,091 digits, but keeping strings under 300 characters avoids overly cramped visual layouts.",
  },
  {
    id: 20,
    category: "Security",
    question: "Are my generated QR codes private and secure?",
    answer: "Yes. All operations compile strictly inside your active local browser space and are never shared or sent to any server.",
  }
];

// Fallback collections for other locales
const LOCALIZED_FAQS: Record<string, FAQItem[]> = {
  ar: FAQS_AR,
  en: FAQS_EN
};

const CATEGORIES_TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    All: "الكل",
    General: "عام",
    Customization: "التخصيص والتصميم",
    Technical: "تقني",
    Security: "الأمان والخصوصية",
    search_placeholder: "ابحث عن الأسئلة أو الكلمات المفتاحية... (مثل واي فاي، لغز، شعار)",
    no_results: "لا توجد نتائج تطابق كلمات البحث الخاصة بك.",
    reset_btn: "إعادة ضبط الفلاتر",
    category_label: "الفئة: ",
    ref_label: "مرجع المقالة: "
  },
  en: {
    All: "All",
    General: "General",
    Customization: "Customization",
    Technical: "Technical",
    Security: "Security",
    search_placeholder: "Search questions or keywords... (e.g. WiFi, SVG, Logo)",
    no_results: "No results match your search keywords.",
    reset_btn: "Reset Filters",
    category_label: "Category: ",
    ref_label: "Article reference: "
  }
};

export default function FAQAccordion() {
  const { locale, isRTL } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(1); // first article open by default

  const currentFaqs = LOCALIZED_FAQS[locale] || LOCALIZED_FAQS.en;
  const labels = CATEGORIES_TRANSLATIONS[locale] || CATEGORIES_TRANSLATIONS.en;

  const categories = ["All", "General", "Customization", "Technical", "Security"];

  const filteredFaqs = useMemo(() => {
    return currentFaqs.filter((faq) => {
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      const mappedCategory = faq.category;
      
      // Category selection check
      let matchCategory = false;
      if (activeCategory === "All") {
        matchCategory = true;
      } else {
        // Find English index of chosen activeCategory
        const catIdx = categories.indexOf(activeCategory);
        if (locale === "ar") {
          const arCategories = ["الكل", "عام", "التخصيص والتصميم", "تقني", "الأمان والخصوصية"];
          matchCategory = mappedCategory === arCategories[catIdx];
        } else {
          matchCategory = mappedCategory === activeCategory;
        }
      }
      
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory, currentFaqs, locale]);

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
  };

  return (
    <div className="w-full" dir={isRTL ? "rtl" : "ltr"}>
      {/* Search & Filter tools */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className={`absolute top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 ${isRTL ? "right-3.5" : "left-3.5"}`} />
          <input
            type="text"
            placeholder={labels.search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-800 text-sm shadow-sm outline-none transition-all ${
              isRTL ? "pl-4 pr-11" : "pl-11 pr-4"
            }`}
            id="fqa-search-input"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="FAQ Categories">
          {categories.map((cat) => {
            const translatedCat = labels[cat] || cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
                id={`fqa-tab-${cat}`}
              >
                {translatedCat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accordion List container */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-400 shadow-md ring-1 ring-blue-500/10"
                    : "border-slate-250 hover:border-blue-400 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                  className={`w-full flex items-start justify-between px-6 py-5 font-display text-base font-semibold text-slate-900 transition-colors cursor-pointer ${
                    isRTL ? "text-right" : "text-left"
                  }`}
                  style={{ gap: "1rem" }}
                  id={`fqa-btn-${faq.id}`}
                >
                  <div className="flex gap-3">
                    <HelpIcon className="w-5.5 h-5.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </div>
                  <span className="p-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[500px] border-t border-slate-100 bg-slate-50/50" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <div className="px-6 py-5 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 relative z-10 rounded">
                        {labels.category_label}{faq.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {labels.ref_label}#025-FAQ{faq.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">{labels.no_results}</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            {labels.reset_btn}
          </button>
        </div>
      )}
    </div>
  );
}
