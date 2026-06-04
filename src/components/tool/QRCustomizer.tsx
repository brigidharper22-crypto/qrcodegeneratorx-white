import React, { useState, useRef, useEffect } from "react";
import { QRPreset, QRConfig } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import { Sliders, Palette, Upload, Trash2, CheckCircle2, ChevronDown, Hash, Shapes, Image } from "lucide-react";

interface QRCustomizerProps {
  config: QRConfig;
  onChange: (updates: Partial<QRConfig>) => void;
}

export default function QRCustomizer({ config, onChange }: QRCustomizerProps) {
  const { locale, t } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoName, setLogoName] = useState<string>("");
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    // Keep closed on mobile by default to improve layout density, and open on desktop
    if (window.innerWidth >= 1024) {
      setActiveAccordion("customize");
    }
  }, []);

  // Premium presets with beautiful foreground gradients showing "gradient colors in the small boxes/squares"
  const presets: QRPreset[] = [
    { name: "Royal Obsidian", fg: "#0F172A", bg: "#FFFFFF", isGradient: false },
    { name: "Electric Indigo", fg: "#2563EB", bg: "#FFFFFF", isGradient: false },
    { name: "Sunset Crimson", fg: "#E11D48", bg: "#FFFFFF", isGradient: true, gradientStart: "#F43F5E", gradientEnd: "#BE123C" },
    { name: "Forest Emerald", fg: "#059669", bg: "#FFFFFF", isGradient: true, gradientStart: "#10B981", gradientEnd: "#059669" },
    { name: "Cosmic Amethyst", fg: "#7C3AED", bg: "#FFFFFF", isGradient: true, gradientStart: "#8B5CF6", gradientEnd: "#6D28D9" },
    { name: "Ocean Sapphire", fg: "#1E3A8A", bg: "#FFFFFF", isGradient: true, gradientStart: "#06B6D4", gradientEnd: "#2563EB" },
  ];

  const handlePresetSelect = (preset: QRPreset) => {
    onChange({
      fgColor: preset.isGradient ? preset.gradientStart || preset.fg : preset.fg,
      bgColor: preset.bg,
      isGradient: preset.isGradient || false,
      gradientStart: preset.gradientStart,
      gradientEnd: preset.gradientEnd,
    });
  };

  // Local state for smooth Hex text inputs and paste events
  const [fgHex, setFgHex] = useState(config.fgColor || "#0F172A");
  const [bgHex, setBgHex] = useState(config.bgColor || "#FFFFFF");
  const [gradStartHex, setGradStartHex] = useState(config.gradientStart || "#2563EB");
  const [gradEndHex, setGradEndHex] = useState(config.gradientEnd || "#7C3AED");

  // Sync state if config changes externally (e.g., preset clicked)
  useEffect(() => {
    setFgHex(config.fgColor);
    setBgHex(config.bgColor);
    if (config.gradientStart) setGradStartHex(config.gradientStart);
    if (config.gradientEnd) setGradEndHex(config.gradientEnd);
  }, [config.fgColor, config.bgColor, config.gradientStart, config.gradientEnd]);

  const isValidHex = (hex: string) => {
    return /^#[0-9A-F]{6}$/i.test(hex) || /^#[0-9A-F]{3}$/i.test(hex);
  };

  const handleFgTextChange = (val: string) => {
    let raw = val;
    if (!raw.startsWith("#") && raw.length > 0) {
      raw = "#" + raw;
    }
    setFgHex(raw);
    if (isValidHex(raw)) {
      onChange({ fgColor: raw, isGradient: false });
    }
  };

  const handleBgTextChange = (val: string) => {
    let raw = val;
    if (!raw.startsWith("#") && raw.length > 0) {
      raw = "#" + raw;
    }
    setBgHex(raw);
    if (isValidHex(raw)) {
      onChange({ bgColor: raw });
    }
  };

  const handleGradStartTextChange = (val: string) => {
    let raw = val;
    if (!raw.startsWith("#") && raw.length > 0) {
      raw = "#" + raw;
    }
    setGradStartHex(raw);
    if (isValidHex(raw)) {
      onChange({ gradientStart: raw, isGradient: true });
    }
  };

  const handleGradEndTextChange = (val: string) => {
    let raw = val;
    if (!raw.startsWith("#") && raw.length > 0) {
      raw = "#" + raw;
    }
    setGradEndHex(raw);
    if (isValidHex(raw)) {
      onChange({ gradientEnd: raw, isGradient: true });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        onChange({
          logoDataUrl: reader.result as string,
          errorCorrectionLevel: "H", // Auto force High error correction level for logos
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange({
      logoDataUrl: undefined,
    });
  };

  // Dedicated multi-language dictionary for Accordion titles & subtitles
  const customDictionary: Record<string, Record<string, string>> = {
    en: {
      frame: "Frame",
      frame_desc: "Add a border style around your code",
      customize: "Customize",
      customize_desc: "Adjust shape and color",
      logo: "Logo",
      logo_desc: "Add a logo in the center",
      margin_size: "Quiet Zone / Border Size",
      margin_desc: "Controls the white frame thickness around your QR Code",
    },
    ar: {
      frame: "الإطار",
      frame_desc: "أضف نمط إطار أو حافة حول الرمز الخاص بك",
      customize: "تخصيص",
      customize_desc: "اضبط التصميم والألوان",
      logo: "الشعار",
      logo_desc: "أضف شعاراً في المنتصف",
      margin_size: "منطقة الأمان / حجم الإطار",
      margin_desc: "التحكم في سمك الإطار الأبيض حول رمز الاستجابة السريعة الخاص بك",
    },
    fr: {
      frame: "Cadre",
      frame_desc: "Ajouter un style de bordure autour de votre code",
      customize: "Personnaliser",
      customize_desc: "Ajuster la forme et la couleur",
      logo: "Logo",
      logo_desc: "Ajouter un logo au centre",
      margin_size: "Zone tranquille / Taille de bordure",
      margin_desc: "Contrôle l'épaisseur du cadre blanc autour de votre code QR",
    },
    es: {
      frame: "Marco",
      frame_desc: "Añada un estilo de borde de su código",
      customize: "Personalizar",
      customize_desc: "Ajuste la forma y el color",
      logo: "Logo",
      logo_desc: "Añada un logotipo en el centro",
      margin_size: "Zona tranquila / Tamaño del borde",
      margin_desc: "Controla el grosor del marco blanco alrededor de su código QR",
    },
    de: {
      frame: "Rahmen",
      frame_desc: "Fügen Sie einen Rahmen um Ihren Code hinzu",
      customize: "Anpassen",
      customize_desc: "Form und Farbe anpassen",
      logo: "Logo",
      logo_desc: "In der Mitte ein Logo hinzufügen",
      margin_size: "Ruhezone / Rahmengröße",
      margin_desc: "Steuert die weiße Rahmendicke um Ihren QR-Code",
    },
    zh: {
      frame: "边框",
      frame_desc: "在您的二维码周围添加边框样式",
      customize: "自定义设计",
      customize_desc: "调整形状与颜色",
      logo: "中心 logo",
      logo_desc: "在二维码中心添加标志",
      margin_size: "留白区域 / 边框大小",
      margin_desc: "控制二维码周围白色边框的厚度",
    },
    pt: {
      frame: "Moldura",
      frame_desc: "Adicione um estilo de borda ao redor do seu código",
      customize: "Personalizar",
      customize_desc: "Ajuste a forma e a cor",
      logo: "Logotipo",
      logo_desc: "Adicione um logotipo no centro",
      margin_size: "Zona de silêncio / Tamanho da borda",
      margin_desc: "Controla a espessura da moldura branca ao redor do seu código QR",
    },
    ja: {
      frame: "フレーム",
      frame_desc: "コードの周囲にボーダースタイルを追加する",
      customize: "カスタマイズ",
      customize_desc: "形状と色の調整",
      logo: "ロゴ",
      logo_desc: "中央にロゴを追加する",
      margin_size: "クワイエットゾーン / 余白サイズ",
      margin_desc: "QRコード周囲 of 白い余白の厚さを調整します",
    }
  };

  const getLabel = (key: string) => {
    const dict = customDictionary[locale] || customDictionary.en;
    return dict[key] || customDictionary.en[key] || key;
  };

  return (
    <div className="space-y-4">
      {/* 2. CUSTOMIZE ACCORDION */}
      <div 
        className={`bg-white border rounded-2xl transition-all duration-300 ${
          activeAccordion === "customize" 
            ? "border-slate-300 shadow-md shadow-slate-100/40" 
            : "border-slate-200 hover:border-slate-300 shadow-sm"
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveAccordion(activeAccordion === "customize" ? null : "customize")}
          className="w-full text-start p-5 sm:p-6 flex items-center justify-between cursor-pointer focus:outline-none select-none"
        >
          <div className="flex items-center gap-4.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-150 text-slate-750 shrink-0">
              <Shapes className="w-5.5 h-5.5 text-slate-600" />
            </div>
            <div className="text-start font-body">
              <h3 className="text-base font-bold text-slate-800 leading-none">
                {getLabel("customize")}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-none font-medium">
                {getLabel("customize_desc")}
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
            activeAccordion === "customize" ? "rotate-180 text-blue-600" : "rotate-0"
          }`} />
        </button>

        {activeAccordion === "customize" && (
          <div className="px-5 pb-6 border-t border-slate-100 pt-5 space-y-5 animate-fade-in">
            {/* Color Palettes / Presets */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                {t("presets")}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {presets.map((preset) => {
                  const isSelected = preset.isGradient
                    ? config.isGradient && config.gradientStart === preset.gradientStart && config.gradientEnd === preset.gradientEnd && config.bgColor === preset.bg
                    : !config.isGradient && config.fgColor === preset.fg && config.bgColor === preset.bg;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handlePresetSelect(preset)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer group ${
                        isSelected
                          ? "border-blue-600 bg-blue-50/40 shadow-sm"
                          : "border-slate-200 hover:border-blue-300 bg-white"
                      }`}
                    >
                      <div className="flex -space-x-1 shrink-0">
                        <div
                          className="w-4.5 h-4.5 rounded-md border border-slate-200 shadow-sm transition-transform group-hover:scale-105"
                          style={{
                            background: preset.isGradient
                              ? `linear-gradient(135deg, ${preset.gradientStart}, ${preset.gradientEnd})`
                              : preset.fg
                          }}
                        />
                        <div
                          className="w-4.5 h-4.5 rounded-md border border-slate-100 shadow-sm"
                          style={{ backgroundColor: preset.bg }}
                        />
                      </div>
                      <div className="text-start leading-none flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-slate-700 block truncate">{preset.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Picking system */}
            <div className="space-y-4 border-t border-slate-100 pt-4.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                  {t("custom_colors")}
                </label>
                <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => onChange({ isGradient: false })}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      !config.isGradient
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Solid
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ 
                      isGradient: true, 
                      gradientStart: config.gradientStart || config.fgColor, 
                      gradientEnd: config.gradientEnd || "#7C3AED" 
                    })}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                      config.isGradient
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    Gradient
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Foreground Pickers */}
                {!config.isGradient ? (
                  <div className="flex items-center gap-2.5 p-2.5 border border-slate-200 rounded-xl bg-slate-50/40 relative">
                    <div 
                      className="relative w-8.5 h-8.5 rounded-lg overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundColor: config.fgColor }}
                    >
                      <input
                        type="color"
                        value={config.fgColor}
                        onChange={(e) => {
                          onChange({ fgColor: e.target.value, isGradient: false });
                          setFgHex(e.target.value);
                        }}
                        className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0 scale-150"
                      />
                      <Palette className="w-4 h-4 text-white mix-blend-difference" />
                    </div>
                    <div className="text-start flex-1 min-w-0">
                      <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block tracking-wider leading-none mb-0.5">
                        {t("fg_color")}
                      </span>
                      <input
                        type="text"
                        value={fgHex}
                        onChange={(e) => handleFgTextChange(e.target.value)}
                        placeholder="#000000"
                        className="w-full bg-transparent font-mono text-[11px] font-bold text-slate-700 uppercase outline-none focus:text-blue-600 border-b border-transparent focus:border-blue-300 py-0.5"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 p-2.5 border border-slate-200 rounded-xl bg-slate-50/40">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block tracking-wider leading-none">
                      GRADIENT FOREGROUND
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200">
                        <div 
                          className="relative w-6 h-6 rounded-md overflow-hidden border border-slate-250 shadow-sm flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: config.gradientStart || "#2563EB" }}
                        >
                          <input
                            type="color"
                            value={config.gradientStart || "#2563EB"}
                            onChange={(e) => {
                              onChange({ gradientStart: e.target.value, isGradient: true });
                              setGradStartHex(e.target.value);
                            }}
                            className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={gradStartHex}
                          onChange={(e) => handleGradStartTextChange(e.target.value)}
                          className="w-full bg-transparent font-mono text-[9px] font-bold text-slate-750 uppercase outline-none focus:text-blue-600"
                        />
                      </div>

                      <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200">
                        <div 
                          className="relative w-6 h-6 rounded-md overflow-hidden border border-slate-250 shadow-sm flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                          style={{ backgroundColor: config.gradientEnd || "#7C3AED" }}
                        >
                          <input
                            type="color"
                            value={config.gradientEnd || "#7C3AED"}
                            onChange={(e) => {
                              onChange({ gradientEnd: e.target.value, isGradient: true });
                              setGradEndHex(e.target.value);
                            }}
                            className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0"
                          />
                        </div>
                        <input
                          type="text"
                          value={gradEndHex}
                          onChange={(e) => handleGradEndTextChange(e.target.value)}
                          className="w-full bg-transparent font-mono text-[9px] font-bold text-slate-755 uppercase outline-none focus:text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Background Checker */}
                <div className="flex items-center gap-2.5 p-2.5 border border-slate-200 rounded-xl bg-slate-50/40 relative">
                  <div 
                    className="relative w-8.5 h-8.5 rounded-lg overflow-hidden border border-slate-200 shadow-inner flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: config.bgColor }}
                  >
                    <input
                      type="color"
                      value={config.bgColor}
                      onChange={(e) => {
                        onChange({ bgColor: e.target.value });
                        setBgHex(e.target.value);
                      }}
                      className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer opacity-0 scale-150"
                    />
                    <Palette className="w-4 h-4 text-black mix-blend-difference" />
                  </div>
                  <div className="text-start flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block tracking-wider leading-none mb-0.5">
                      {t("bg_color")}
                    </span>
                    <input
                      type="text"
                      value={bgHex}
                      onChange={(e) => handleBgTextChange(e.target.value)}
                      placeholder="#FFFFFF"
                      className="w-full bg-transparent font-mono text-[11px] font-bold text-slate-750 uppercase outline-none focus:text-blue-600 border-b border-transparent focus:border-blue-300 py-0.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Resolution and Quiet Zone controls shifted inside Customize */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-slate-100 pt-5 mt-5">
              {/* Output Resolution Sizing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                    {t("resolution") || "OUTPUT RESOLUTION"}
                  </label>
                  <span className="bg-slate-100 text-slate-705 px-2.5 py-0.5 rounded text-xs font-mono font-bold border border-slate-200">
                    {config.resolution} x {config.resolution} PX
                  </span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="8"
                  value={config.resolution}
                  onChange={(e) => onChange({ resolution: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />

              </div>

              {/* Quiet Zone / Border Thickness */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-400 uppercase font-mono tracking-wider">
                    {getLabel("margin_size")}
                  </label>
                  <span className="bg-slate-100 text-slate-705 px-2.5 py-0.5 rounded text-xs font-mono font-bold border border-slate-200">
                    {config.margin !== undefined ? config.margin : 4} blocks
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={config.margin !== undefined ? config.margin : 4}
                  onChange={(e) => onChange({ margin: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-100 border border-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. LOGO ACCORDION */}
      <div 
        className={`bg-white border rounded-2xl transition-all duration-300 ${
          activeAccordion === "logo" 
            ? "border-slate-300 shadow-md shadow-slate-100/40" 
            : "border-slate-200 hover:border-slate-300 shadow-sm"
        }`}
      >
        <button
          type="button"
          onClick={() => setActiveAccordion(activeAccordion === "logo" ? null : "logo")}
          className="w-full text-start p-5 sm:p-6 flex items-center justify-between cursor-pointer focus:outline-none select-none"
        >
          <div className="flex items-center gap-4.5">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-slate-50 border border-slate-150 text-slate-750 shrink-0">
              <Image className="w-5.5 h-5.5 text-slate-600" />
            </div>
            <div className="text-start font-body">
              <h3 className="text-base font-bold text-slate-800 leading-none">
                {getLabel("logo")}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-none font-medium">
                {getLabel("logo_desc")}
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${
            activeAccordion === "logo" ? "rotate-180 text-blue-600" : "rotate-0"
          }`} />
        </button>

        {activeAccordion === "logo" && (
          <div className="px-5 pb-6 border-t border-slate-100 pt-5 space-y-5 animate-fade-in">
            <div className="space-y-4">
              {config.logoDataUrl ? (
                <div className="flex items-center justify-between p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white border border-emerald-100 shadow-sm flex items-center justify-center overflow-hidden p-1 shrink-0">
                      <img
                        src={config.logoDataUrl}
                        alt="Logo Preview"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-emerald-800 block">
                        {logoName || "Logo Embedded"}
                      </span>
                      <span className="text-[9px] text-emerald-600 font-mono flex items-center gap-1 font-medium mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span>Correction forced to Level H</span>
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="p-1.5 border border-emerald-200 hover:border-red-400 text-slate-500 hover:text-red-500 rounded-xl bg-white transition-colors cursor-pointer"
                    title="Delete logo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-blue-600/25 hover:border-blue-600 rounded-2xl p-5 text-center bg-blue-50/40 hover:bg-blue-50 text-blue-600 transition-all cursor-pointer group flex flex-col items-center justify-center gap-2"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/png, image/jpeg, image/jpg"
                    className="hidden"
                  />
                  <Upload className="w-5.5 h-5.5 text-blue-600 group-hover:scale-110 transition-transform duration-150" />
                  <span className="text-xs font-bold tracking-wider uppercase block">
                    {t("upload_logo") || "UPLOAD CORPORATE LOGO"}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium font-sans">
                    Under 1.5MB recommended (Transparent BG preferred)
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
