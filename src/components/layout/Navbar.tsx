import { useState } from "react";
import { useI18n, SUPPORTED_LOCALES, LOCALE_INFO } from "../../hooks/useI18n";
import { Locale } from "../../types";
import { QrCode, Menu, X, Globe, Check } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { locale, setLocale, t, isRTL } = useI18n();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: t("nav_home") },
    { id: "how-it-works", label: t("nav_how") },
    { id: "features", label: t("nav_features") },
    { id: "faq", label: t("nav_faq") },
    { id: "blog", label: t("nav_blog") },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo brand */}
          <a
            href={`/${locale}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("home");
            }}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1.5 cursor-pointer"
            aria-label="qrcodegeneratorx Home"
          >
            <div className="flex flex-col text-left">
              <span className="text-xl font-black font-display tracking-tight leading-none flex items-center select-none">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent font-black">QRcode</span>
                <span className="text-slate-800 font-medium">generator</span>
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black uppercase tracking-wider shadow-sm shadow-blue-500/15">X</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const pathSuffix = item.id === "home" ? "" : `/${item.id}`;
              const href = `/${locale}${pathSuffix}`;
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer inline-block ${
                    currentPage === item.id || (item.id === "home" && currentPage.startsWith("blog/"))
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions & Language Selector */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-zinc-200 hover:border-blue-300 rounded-xl text-sm font-medium text-slate-700 bg-white shadow-sm transition-all cursor-pointer"
                aria-haspopup="true"
                aria-expanded={isLangOpen}
                aria-label="Select language"
              >
                <Globe className="w-4 h-4 text-blue-600" />
                <span>{LOCALE_INFO[locale].flag}</span>
                <span>{LOCALE_INFO[locale].name}</span>
                <span className="text-[10px] text-slate-400">▼</span>
              </button>

              {isLangOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsLangOpen(false)}
                  />
                  <div
                    className={`absolute mt-2 w-48 rounded-xl bg-white border border-zinc-150 shadow-lg py-1 z-20 ${
                      isRTL ? "left-0" : "right-0"
                    }`}
                  >
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest border-b border-zinc-100">
                      Select Language
                    </div>
                    {SUPPORTED_LOCALES.map((code) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLocale(code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                          locale === code
                            ? "bg-blue-50 text-blue-600 font-semibold"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        style={{ textAlign: isRTL ? "right" : "left" }}
                      >
                        <div className="flex items-center gap-2">
                          <span>{LOCALE_INFO[code].flag}</span>
                          <span>{LOCALE_INFO[code].name}</span>
                        </div>
                        {locale === code && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Launch Call To Action */}
            <a
              href={`/${locale}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-500/10 transition-transform active:scale-95 cursor-pointer inline-block text-center"
            >
              Create QR Code
            </a>
          </div>

          {/* Mobile menu and Language triggers */}
          <div className="flex md:hidden items-center gap-2">
            {/* Fast Language Toggle Icon trigger for mobile */}
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl border border-zinc-200 cursor-pointer"
              aria-label="Quick language switcher"
            >
              <Globe className="w-5 h-5 text-blue-600" />
            </button>

            {/* Language dropdown menu for mobile */}
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40 bg-black/10" onClick={() => setIsLangOpen(false)} />
                <div className="absolute top-16 right-4 w-44 rounded-xl bg-white border border-zinc-150 shadow-xl py-1 z-50">
                  {SUPPORTED_LOCALES.map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLocale(code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors cursor-pointer ${
                        locale === code ? "bg-blue-50 text-blue-600 font-medium" : "text-slate-600"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{LOCALE_INFO[code].flag}</span>
                        <span>{LOCALE_INFO[code].name}</span>
                      </span>
                      {locale === code && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-xl border border-zinc-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const pathSuffix = item.id === "home" ? "" : `/${item.id}`;
              const href = `/${locale}${pathSuffix}`;
              return (
                <a
                  key={item.id}
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer block ${
                    currentPage === item.id || (item.id === "home" && currentPage.startsWith("blog/"))
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                  }`}
                  style={{ textAlign: isRTL ? "right" : "left" }}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
          <div className="px-4 py-4 border-t border-zinc-100 bg-zinc-50 flex flex-col gap-2">
            <a
              href={`/${locale}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("home");
              }}
              className="w-full py-3 bg-blue-600 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md text-center cursor-pointer block"
            >
              Start Generating QR
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
