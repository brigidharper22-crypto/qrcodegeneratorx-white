import { useState, useEffect, useCallback } from "react";
import { useI18n, SUPPORTED_LOCALES } from "./hooks/useI18n";
import { Locale } from "./types";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { MediavineAdScript, AdSlot, AD_PLACEMENTS } from "./components/ads/MediavineAd";
import JsonLd from "./components/seo/JsonLd";
import QRGenerator from "./components/tool/QRGenerator";
import FAQAccordion from "./components/ui/FAQAccordion";
import { BlogCard, BlogPostDetail } from "./components/ui/BlogCard";
import { BLOG_POSTS } from "./data/blogData";
import {
  HowItWorksView,
  FeaturesView,
  PrivacyPolicyView,
  TermsView,
} from "./components/views/StaticPages";
import { motion, AnimatePresence } from "motion/react";
import {
  QrCode,
  ShieldAlert,
  Download,
  Share2,
  FolderLock,
  Zap,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Megaphone,
} from "lucide-react";

export default function App() {
  const { LOCALE } = { LOCALE: "en" }; // Default tracking
  const { locale, setLocale, t, isRTL } = useI18n();

  // Route State: e.g. "home", "how-it-works", "features", "faq", "blog", "blog/id", "privacy-policy", "terms"
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [sharedPayload, setSharedPayload] = useState<any>(null);

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

  // Extract variables for specific blog post route
  const getBlogPost = () => {
    if (currentPage.startsWith("blog/")) {
      const id = currentPage.replace("blog/", "");
      return BLOG_POSTS.find((p) => p.id === id);
    }
    return undefined;
  };

  const activeBlogPost = getBlogPost();

  // Dynamic Browser Document Title, Meta Description, and Canonical tag Updates for flawless SEO indexation
  useEffect(() => {
    let title = "Free QR Code Generator | qrcodegeneratorx.com";
    let desc = "Generate QR codes free instantly. Convert URLs, WiFi, WhatsApp, vCards & more. Download PNG, SVG, PDF. No signup. 40ms generation. qrcodegeneratorx.com";
    const canonicalUrl = `https://qrcodegeneratorx.com/${locale}${currentPage === "home" ? "" : `/${currentPage}`}`;

    if (activeBlogPost) {
      title = `${activeBlogPost.title} | qrcodegeneratorx.com`;
      desc = activeBlogPost.metaDescription;
    } else if (currentPage === "how-it-works") {
      title = "How It Works | Free QR Code Generator";
      desc = "Learn how to generate high-resolution, secure step-by-step custom QR codes with company logo on qrcodegeneratorx.com.";
    } else if (currentPage === "features") {
      title = "Features | High-Res QR Graphics and Privacy Security";
      desc = "Discover our browser-native advanced custom grids, central logos alignment, Reed-Solomon recovery tiers, and vector SVG exports.";
    } else if (currentPage === "faq") {
      title = "Frequently Asked Questions | QR Code Technology Info";
      desc = "Read comprehensive expert answers regarding static vs dynamic matrix patterns, SSID WiFi parameters, and Reed-Solomon scales.";
    } else if (currentPage === "blog") {
      title = "Guides, Tutorials and Business Industry Best Practices | Our Blog";
      desc = "Read our expert marketing guides, business design tutorials, and industrial optimization studies regarding QR data matrix formats.";
    } else if (currentPage === "privacy-policy") {
      title = "Privacy Policy | Absolute Local Data Security Assurance";
      desc = "Review our detailed privacy statements confirming 100% browser-native data local compilation with zero server collections.";
    } else if (currentPage === "terms") {
      title = "Terms of Service | Public Commercial Use Rights";
      desc = "Review our standard use agreements granting 100% permanent commercial rights to all generated graphics with no fees.";
    }

    // Set Document title
    document.title = title;

    // Set Meta Description dynamically in head
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement("meta");
      metaDescEl.setAttribute("name", "description");
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute("content", desc);

    // Set Canonical link tag dynamically in head
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", canonicalUrl);

    // Set OpenGraph meta title and description too if needed
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute("content", title);
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute("content", desc);
    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute("content", canonicalUrl);
  }, [currentPage, activeBlogPost, locale]);

  return (
    <div className="min-h-screen bg-white bg-dot-grid flex flex-col justify-between" dir={isRTL ? "rtl" : "ltr"}>
      {/* Dynamic SEO JSON-LD structured setups */}
      <JsonLd page={currentPage} locale={locale} blogPostId={activeBlogPost?.id} />

      {/* Mediavine Journey global script loader */}
      <MediavineAdScript />

      {/* Main Navigation bar */}
      <Navbar currentPage={currentPage} onNavigate={handleNav} />

      {/* Dynamic Main Body Content blocks */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-content">
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
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant high fidelity vector generation</span>
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-body tracking-tight text-slate-900 leading-snug max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2">
                    <span>Free QR Code</span>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Generator
                    </span>
                  </h1>
                  <h2 className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    Professional Online QR Code Maker — {t("subtitle")}
                  </h2>
                </section>

                {/* Main QR Code generator compiler element */}
                <section id="qr-tool-section" className="scroll-mt-24">
                  <QRGenerator initialPayloadFromUrl={sharedPayload} />
                </section>

                {/* AD SLOT 1: Below Hero & Tool section */}
                <AdSlot placement={AD_PLACEMENTS.heroLeaderboard} />

                {/* SECTION: How It Works Summary section */}
                <section className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 sm:p-12 space-y-10">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                      Generate Codes in <span className="text-blue-600">3 Fast Steps</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      Our secure, browser-native engine compiles structured codes in milliseconds. Here is how simple the process is.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { step: "1", title: t("step_1"), text: t("step_1_desc") },
                      { step: "2", title: t("step_2"), text: t("step_2_desc") },
                      { step: "3", title: t("step_3"), text: t("step_3_desc") },
                    ].map((stepObj) => (
                      <div key={stepObj.step} className="bg-white border border-slate-150 rounded-2xl p-6 relative shadow-sm hover:shadow transition-shadow">
                        <span className="absolute -top-3.5 left-6 bg-gradient-to-r from-blue-605 to-blue-600 bg-blue-600 text-white w-7.5 h-7.5 rounded-full flex items-center justify-center font-bold text-sm font-mono shadow-md shadow-blue-500/10">
                          {stepObj.step}
                        </span>
                        <h3 className="text-base font-bold font-display text-slate-900 mt-2 mb-2">{stepObj.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{stepObj.text}</p>
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
                      Packed with <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Premium Features</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      Get maximum design flexibility with zero monthly subscriptions, trial warnings, or scan limitations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "10 Media Formats", text: "Create codes for web URLs, personal vCard contacts, guest Wi-Fi networks, SMS texting, geography locations, and cryptocurrency wallets.", icon: QrCode },
                      { title: "Aesthetic Templates", text: "Match your company branding instantly using our 6 curated contrast color presets or use custom hex pickers manually.", icon: Zap },
                      { title: "Centralized Logos", text: "Upload your corporate trademark PNG or JPG. Our engine crops, isolates, masks, and centers the logo correctly.", icon: Sparkles },
                      { title: "Reed-Solomon Correction", text: "Finetune error adjustment arrays (L, M, Q, H presets) so dirty, scraped, or logo-covered printed squares scan perfectly.", icon: ShieldAlert },
                      { title: "Lossless Vetor Exports", text: "Download web-ready PNG, lossless vector SVG, or printable vector PDF formats at sizes from 128px up to 1024px.", icon: Download },
                      { title: "100% Secure Privacy", text: "All parsing, binarization, and image packaging happen inside your local browser memory space. No remote uploads.", icon: FolderLock },
                    ].map((feat, index) => {
                      const IconComponent = feat.icon;
                      return (
                        <div key={index} className="bg-white border border-slate-200/85 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-200 rounded-2xl p-6 group">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors flex items-center justify-center mb-4 shadow-sm">
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold font-display text-slate-900 mb-2">{feat.title}</h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{feat.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </section>

                {/* AD SLOT 3: Between Features and Testimonials */}
                <AdSlot placement={AD_PLACEMENTS.betweenSections2} />

                {/* SECTION: Social Testimonials */}
                <section className="bg-blue-50/50 border border-blue-105 rounded-3xl p-8 sm:p-12 space-y-10">
                  <div className="text-center space-y-3">
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                      What Our Users <span className="text-blue-600">Are Saying</span>
                    </h2>
                    <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
                      Join thousands of business teams, restaurants, and individuals globally using qrcodegeneratorx daily.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: "Markus V.", role: "Marketing Lead at BrandCo", text: "qrcodegeneratorx saved our physical catalog launch. Downloaded vector SVGs that remained perfectly sharp at poster sizes, completely free! No monthly trial limits." },
                      { name: "Elena R.", role: "Restaurant Proprietor", text: "Setting up guest tabletop menus was a breeze. Auto-masks my restaurant logo and Wi-Fi credential codes flawlessly. Our customers scan them instantly." },
                      { name: "Dave K.", role: "Graphic Designer", text: "The best client-side tool on the web. No payments, no account signups, zero tracking cookies. High-resolution canvas rendering is exceptionally fast." },
                    ].map((test, index) => (
                      <div key={index} className="bg-white border border-slate-150 rounded-2xl p-6 shadow-sm hover:shadow transition-shadow flex flex-col justify-between">
                        <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-4">
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

                {/* SECTION: FAQ Quick Preview Block */}
                <section className="space-y-10">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2 text-left">
                      <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900">
                        Frequently Asked <span className="text-blue-600">Questions</span>
                      </h2>
                      <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                        Got queries? We have exhaustive, professional solutions to the most common questions raised by developers and businesses.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNav("faq")}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/10 cursor-pointer self-start sm:self-auto shrink-0 transition-transform active:scale-95"
                    >
                      <span>Explore all 20 Answers</span>
                      <ArrowRight className="w-4 h-4" />
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
                        Latest from Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Professional Blog</span>
                      </h2>
                      <p className="text-sm text-slate-500 max-w-xl leading-relaxed">
                        Finetune your corporate operations, designs, scannability, and analytics with insights from or editorial workspace.
                      </p>
                    </div>
                    <button
                      onClick={() => handleNav("blog")}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md ... shrink-0 transition-transform active:scale-95 cursor-pointer"
                    >
                      <span>Read all Articles</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Render first 3 posts */}
                    {BLOG_POSTS.slice(0, 3).map((post) => (
                      <BlogCard
                        key={post.id}
                        post={post}
                        onClick={() => handleNav(`blog/${post.id}`)}
                      />
                    ))}
                  </div>
                </section>

                {/* SECTION: Blue Gradient CTA Banner */}
                <section className="bg-gradient-to-r from-blue-650 via-blue-600 to-purple-650 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl relative overflow-hidden" style={{ backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)" }}>
                  <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
                  <div className="space-y-3 max-w-2xl mx-auto relative z-10">
                    <span className="bg-white/10 text-white border border-white/20 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-mono inline-block mb-3">
                      Start instantly — No credit cards
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight">
                      Ready to Build Your Custom QR Code?
                    </h2>
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                      Generate permanent, hi-res QR codes equipped with custom parameters, custom color schemes, error rates and logo overlays.
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
                      <span>Launch Generator Tool</span>
                      <ArrowRight className="w-4 h-4" />
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
                    Frequently Asked <span className="text-blue-600">Questions</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    Exhaustive support guide covering general questions, custom corporate branding, technical parameters, print specifications, and client-side encryption.
                  </p>
                </div>

                <div className="bg-white border border-slate-150 rounded-2xl p-6 md:p-8 shadow-sm">
                  <FAQAccordion />
                </div>
              </div>
            )}

            {/* VIEW 5: BLOG ARCHIVE INDEX */}
            {currentPage === "blog" && (
              <div className="max-w-5xl mx-auto space-y-12 py-4">
                <div className="text-center space-y-3 max-w-2xl mx-auto">
                  <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
                    Editorial <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Insights & Blog</span>
                  </h1>
                  <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                    Stay up-to-date with technical checklists, campaign guides, design matrices, and scannability optimization metrics direct from our print panel.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Render all 5 articles */}
                  {BLOG_POSTS.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onClick={() => handleNav(`blog/${post.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* VIEW 6: DETAILED BLOG POSTS READ PAGE */}
            {currentPage.startsWith("blog/") && activeBlogPost && (
              <BlogPostDetail post={activeBlogPost} onBack={() => handleNav("blog")} onNavigate={handleNav} />
            )}

            {/* VIEW 7: PRIVACY POLICY PAGE */}
            {currentPage === "privacy-policy" && <PrivacyPolicyView />}

            {/* VIEW 8: TERMS OF SERVICE PAGE */}
            {currentPage === "terms" && <TermsView />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom adhesion ad banner appearing on smaller viewport sizes */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-t border-slate-100 py-1.5 shadow-lg block lg:hidden">
        <AdSlot placement={AD_PLACEMENTS.mobileAdhesion} className="my-0 scale-90" />
      </div>

      {/* Main Footer footer navigation bar */}
      <Footer onNavigate={handleNav} />
    </div>
  );
}
