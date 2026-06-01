import React from "react";
import { useI18n } from "../../hooks/useI18n";
import { Shield, Zap, Award, Flame } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const FOOTER_TRANSLATIONS: Record<string, {
  resources: string;
  legalIndex: string;
  noData: string;
  unlimitedFree: string;
  hiRes: string;
  indexesLabel: string;
  lighthouse: string;
  copyright: string;
}> = {
  ar: {
    resources: "المصادر",
    legalIndex: "المكتب القانوني",
    noData: "لا يتم جمع أي بيانات",
    unlimitedFree: "استخدام مجاني غير محدود",
    hiRes: "ملفات فائقة الدقة",
    indexesLabel: "فهرس اللغات المتاحة:",
    lighthouse: "متوافق 100/100 مع Lighthouse وسريع للغاية",
    copyright: "جميع الحقوق محفوظة. تم تطوير الخدمة لتوفير أقصى درجات السرعة والخصوصية."
  },
  en: {
    resources: "Resources",
    legalIndex: "Legal Desk",
    noData: "No Data Collected",
    unlimitedFree: "Unlimited Free Use",
    hiRes: "Hi-Res Outputs",
    indexesLabel: "Index references:",
    lighthouse: "Perfect 100/100 Lighthouse compliant",
    copyright: "All rights reserved. Created for optimal accessibility and speed."
  },
  fr: {
    resources: "Ressources",
    legalIndex: "Bureau Légal",
    noData: "Aucune donnée collectée",
    unlimitedFree: "Utilisation libre illimitée",
    hiRes: "Fichiers haute résolution",
    indexesLabel: "Index des langues :",
    lighthouse: "Conformité à 100 % avec Lighthouse",
    copyright: "Tous droits réservés. Conçu pour une accessibilité et une vitesse optimales."
  },
  es: {
    resources: "Recursos",
    legalIndex: "Aspectos Legales",
    noData: "Sin registro de datos",
    unlimitedFree: "Uso ilimitado y gratuito",
    hiRes: "Alta resolución de salida",
    indexesLabel: "Índice de idiomas:",
    lighthouse: "Excelente puntuación de Lighthouse",
    copyright: "Todos los derechos reservados. Creado para máxima velocidad y seguridad."
  },
  de: {
    resources: "Ressourcen",
    legalIndex: "Rechtliche Hinweise",
    noData: "Keine Datenspeicherung",
    unlimitedFree: "Unbegrenzte kostenlose Nutzung",
    hiRes: "Hochauflösende Ausgabe",
    indexesLabel: "Sprachindikatoren:",
    lighthouse: "100 % konform mit Lighthouse",
    copyright: "Alle Rechte vorbehalten. Entwickelt für optimale Barrierefreiheit."
  },
  zh: {
    resources: "资源导航",
    legalIndex: "服务条款与法律",
    noData: "不搜集任何隐私数据",
    unlimitedFree: "永久免费无次数上限",
    hiRes: "无损高清矢量图导出",
    indexesLabel: "全局多语言索引:",
    lighthouse: "Lighthouse 全星满分极速标准",
    copyright: "版权所有。旨在带来终极的隐私保护和高保真输出。"
  },
  pt: {
    resources: "Recursos",
    legalIndex: "Setor Jurídico",
    noData: "Dados não coletados",
    unlimitedFree: "Utilização gratuita ilimitada",
    hiRes: "Ficheiros de alta resolução",
    indexesLabel: "Índice de idiomas:",
    lighthouse: "Desempenho Lighthouse 100/100",
    copyright: "Todos os direitos reservados. Feito para máxima velocidade."
  },
  ja: {
    resources: "リソース",
    legalIndex: "法的 desk",
    noData: "送信データ保存なし",
    unlimitedFree: "回数制限なしの無料利用",
    hiRes: "高解像度ベクター対応",
    indexesLabel: "言語インデックス:",
    lighthouse: "Lighthouse 100/100 適合基準",
    copyright: "All rights reserved. 高速処理とセキュリティを完全担保しています。"
  }
};

export default function Footer({ onNavigate }: FooterProps) {
  const { t, locale } = useI18n();

  const year = new Date().getFullYear();
  const fLabels = FOOTER_TRANSLATIONS[locale] || FOOTER_TRANSLATIONS.en;

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
                <span>{fLabels.noData}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{fLabels.unlimitedFree}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/50">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>{fLabels.hiRes}</span>
              </div>
            </div>
          </div>

          {/* Quick NavLinks */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-widest mb-4">
              {fLabels.resources}
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
              {fLabels.legalIndex}
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
              <span>{fLabels.lighthouse}</span>
            </div>
          </div>
        </div>

        {/* Global hreflang compliance indicators for translation indexes */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>&copy; {year} qrcodegeneratorx. {fLabels.copyright}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono">{fLabels.indexesLabel}</span>
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
