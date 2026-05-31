import React from "react";
import { useI18n } from "../../hooks/useI18n";
import { QrCode, Shield, Zap, Award, Flame } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t, locale } = useI18n();

  const year = new Date().getFullYear();

  const companyLinks = [
    { id: "home", label: t("nav_home") },
    { id: "how-it-works", label: t("nav_how") },
    { id: "features", label: t("nav_features") },
    { id: "faq", label: t("nav_faq") },
    { id: "blog", label: t("nav_blog") },
  ];

  const legalLinks = [
    { id: "privacy-policy", label: t("privacy") },
    { id: "terms", label: t("terms") },
  ];

  const handleLinkClick = (e: React.MouseEvent, pageId: string) => {
    e.preventDefault();
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <span className="text-xl font-black font-display tracking-tight leading-none flex items-center select-none">
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent font-black">QRcode</span>
                <span className="text-slate-200 font-medium font-sans">generator</span>
                <span className="ml-1 text-xs px-1.5 py-0.5 rounded-md bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-black uppercase tracking-wider shadow-sm shadow-blue-500/15">X</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t("footer_text")}
            </p>
            {/* Badges of trust */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>No Data Collected</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Unlimited Free Use</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Hl-Res Outputs</span>
              </div>
            </div>
          </div>

          {/* Quick NavLinks */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm" role="navigation">
              {companyLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/${locale}/${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Support Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">
              Legal Desk
            </h3>
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`/${locale}/${link.id}`}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-blue-400 bg-slate-850 px-4 py-2.5 rounded-xl border border-slate-800">
              <Flame className="w-4 h-4 text-orange-500 shrink-0" />
              <span>Perfect 100/100 Lighthouse compliant</span>
            </div>
          </div>
        </div>

        {/* Global hreflang compliance indicators for translation indexes */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>&copy; {year} qrcodegeneratorx. All rights reserved. Created for optimal accessibility and speed.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono">Index references:</span>
            {["en", "fr", "es", "ar", "de", "zh", "pt", "ja"].map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  window.location.pathname = `/${lang}`;
                }}
                className={`uppercase px-2 py-0.5 rounded border border-slate-800 text-[10px] hover:text-slate-300 hover:border-slate-700 font-mono transition-colors cursor-pointer ${
                  locale === lang ? "text-blue-400 border-blue-900/40 font-bold bg-blue-950/20" : "text-slate-500"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
