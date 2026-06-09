import { useRef, useEffect, useState } from "react";
import { QRConfig, QRType, QRHistoryItem } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";
import {
  Download,
  Share2,
  FolderDot,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  BookOpen,
  Mail,
} from "lucide-react";

interface QRPreviewProps {
  data: string; // Serialized QR payload
  type: QRType;
  config: QRConfig;
  onSaveToHistory: (label: string) => void;
}

export default function QRPreview({ data, type, config, onSaveToHistory }: QRPreviewProps) {
  const { t, locale } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [svgString, setSvgString] = useState<string>("");
  const [historyLabel, setHistoryLabel] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");
  const [scaleTrigger, setScaleTrigger] = useState<boolean>(false);

  const labels: Record<string, Record<string, string>> = {
    share_via: {
      ar: "مشاركة عبر:",
      en: "Share via:",
      fr: "Partager via :",
      es: "Compartir vía:",
      de: "Teilen über:",
      zh: "通过分享:",
      pt: "Compartilhar via:",
      ja: "共有方法:",
    },
    whatsapp: {
      ar: "واتساب",
      en: "WhatsApp",
      fr: "WhatsApp",
      es: "WhatsApp",
      de: "WhatsApp",
      zh: "WhatsApp",
      pt: "WhatsApp",
      ja: "WhatsApp",
    },
    facebook: {
      ar: "فيسبوك",
      en: "Facebook",
      fr: "Facebook",
      es: "Facebook",
      de: "Facebook",
      zh: "Facebook",
      pt: "Facebook",
      ja: "Facebook",
    },
    twitter: {
      ar: "إكس (تويتر)",
      en: "X (Twitter)",
      fr: "X (Twitter)",
      es: "X (Twitter)",
      de: "X (Twitter)",
      zh: "X (Twitter)",
      pt: "X (Twitter)",
      ja: "X (Twitter)",
    },
    telegram: {
      ar: "تيليجرام",
      en: "Telegram",
      fr: "Telegram",
      es: "Telegram",
      de: "Telegram",
      zh: "Telegram",
      pt: "Telegram",
      ja: "Telegram",
    },
    linkedin: {
      ar: "لينكد إن",
      en: "LinkedIn",
      fr: "LinkedIn",
      es: "LinkedIn",
      de: "LinkedIn",
      zh: "LinkedIn",
      pt: "LinkedIn",
      ja: "LinkedIn",
    },
    email: {
      ar: "البريد الإلكتروني",
      en: "Email",
      fr: "Email",
      es: "Email",
      de: "E-Mail",
      zh: "电子邮件",
      pt: "Email",
      ja: "メール",
    },
  };

  const getLabel = (key: string) => {
    return labels[key]?.[locale] || labels[key]?.["en"] || key;
  };

  const getCompiledShareUrl = () => {
    try {
      const serializedObj = {
        d: data,
        t: type,
        f: config.fgColor,
        b: config.bgColor,
        r: config.resolution,
        e: config.errorCorrectionLevel,
      };
      const base64Str = btoa(encodeURIComponent(JSON.stringify(serializedObj)));
      return `${window.location.origin}/${locale}?qrs=${base64Str}`;
    } catch {
      return `${window.location.origin}/${locale}`;
    }
  };

  const shareUrl = getCompiledShareUrl();
  const textEn = "Create custom QR codes instantly with qrcodegeneratorx.com!";
  const textAr = "قم بإنشاء رموز QR مخصصة مجاناً وبسرعة مع qrcodegeneratorx.com!";
  const shareText = locale === "ar" ? textAr : textEn;

  const socialPlatforms = [
    {
      id: "whatsapp",
      color: "bg-[#25D466]/10 hover:bg-[#25D466] text-[#25D466] hover:text-white hover:shadow-[#25D466]/25 border border-[#25D466]/20",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.37 5.054L2 22l5.077-1.331a9.927 9.927 0 0 0 4.93 1.302c5.506 0 9.99-4.478 9.99-9.985S17.519 2 12.012 2zm4.515 13.111c-.247.694-1.433 1.343-1.964 1.412-.486.063-1.121.074-1.802-.138-.415-.13-1.84-.61-2.485-.89-2.753-1.192-4.524-3.952-4.66-4.134-.136-.183-1.112-1.478-1.112-2.822 0-1.343.702-2.003.953-2.268.25-.264.55-.331.733-.331.183 0 .367.004.528.012.173.008.402-.065.628.48.228.556.78 1.901.848 2.04.067.138.112.302.02.485-.091.183-.138.302-.275.457-.138.156-.29.349-.415.47-.138.13-.284.275-.123.551.162.275.72 1.187 1.545 1.916.824.729 1.52.955 1.735 1.063.215.109.341.09.467-.053.127-.142.548-.64.694-.858.147-.218.293-.183.495-.109.202.074 1.282.605 1.502.715.22.109.367.162.421.254.054.091.054.53-.193 1.224z" />
        </svg>
      ),
    },
    {
      id: "facebook",
      color: "bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white hover:shadow-[#1877F2]/25 border border-[#1877F2]/20",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      id: "twitter",
      color: "bg-slate-900/10 hover:bg-slate-900 text-slate-800 hover:text-white hover:shadow-slate-900/25 border border-slate-900/15",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      id: "telegram",
      color: "bg-[#0088cc]/10 hover:bg-[#0088cc] text-[#0088cc] hover:text-white hover:shadow-[#0088cc]/25 border border-[#0088cc]/20",
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.14.73-1.04 5.01-1.5 7.42-.2.99-.57 1.32-.93 1.35-.77.07-1.36-.5-2.1-1-.16-.11-.31-.22-.44-.33-.53-.45-.48-.68.12-1.3l.03-.03c1.23-1.12 2.7-2.48 2.76-2.58.07-.11.07-.2-.05-.25s-.35-.02-.54.06c-.27.11-1.56.96-4.32 2.82-.41.28-.77.42-1.1.41-.36-.01-1.04-.21-1.55-.38-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.74-.57 2.91-1.27 4.85-2.1 5.83-2.5 2.78-1.14 3.36-1.34 3.73-1.34.08 0 .27.02.39.12a.41.41 0 0 1 .15.29c-.01.07-.02.16-.03.22z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      color: "bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white hover:shadow-[#0077B5]/25 border border-[#0077B5]/20",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      id: "email",
      color: "bg-slate-600/10 hover:bg-slate-600 text-slate-700 hover:text-white hover:shadow-slate-600/25 border border-slate-600/20",
      href: `mailto:?subject=${encodeURIComponent("qrcodegeneratorx Share")}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
      icon: (
        <Mail className="w-4.5 h-4.5" />
      ),
    },
  ];

  // Show status feedback toasts
  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3500);
  };

  // 1. Draw core QR with colors and central logo
  useEffect(() => {
    const canvas = canvasRef.current;
    const qrData = data || "https://qrcodegeneratorx.com";
    if (!canvas || !qrData) return;

    // Reset indicator animation
    setScaleTrigger(false);

    // Dynamic resolution multiplier from customizer
    const size = config.resolution;
    canvas.width = size;
    canvas.height = size;

    // Standard styling setup - Draw QR transparent initially to allow gradients over dark pixels easily
    const qrOptions = {
      errorCorrectionLevel: config.errorCorrectionLevel,
      margin: config.margin !== undefined ? config.margin : 4,
      color: {
        dark: config.fgColor,
        light: "#00000000", // Transparent background
      },
      width: size,
    };

    QRCode.toCanvas(canvas, qrData, qrOptions, (err) => {
      if (err) {
        console.error("QR Code Error:", err);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw foreground custom gradient if specified
      if (config.isGradient && config.gradientStart && config.gradientEnd) {
        ctx.save();
        ctx.globalCompositeOperation = "source-in";
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, config.gradientStart);
        gradient.addColorStop(1, config.gradientEnd);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        ctx.restore();
      }

      // Restore/draw the configured background color behind the QR code
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = config.bgColor || "#FFFFFF";
      ctx.fillRect(0, 0, size, size);
      ctx.restore();

      // Check if logo overlay is specified and draw it
      if (config.logoDataUrl) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.referrerPolicy = "no-referrer";
        img.src = config.logoDataUrl;

        img.onload = () => {
          // Draw standard circular logo mask/border to guarantee contrast
          const logoSize = size * 0.20; // 20% size center constraint
          const cx = size / 2;
          const cy = size / 2;
          const half = logoSize / 2;

          // Solid background cutout under the logo which isolates logo elements from QR pixels
          ctx.save();
          ctx.fillStyle = config.bgColor || "#FFFFFF";
          ctx.beginPath();
          // Circular cutout with extra offset to act as a clean margin buffer
          ctx.arc(cx, cy, half + size * 0.02, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Smooth rendering modes
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          // Draw logo exactly in core center
          ctx.drawImage(img, cx - half, cy - half, logoSize, logoSize);
        };
      }

      // Dynamic animation triggers
      setTimeout(() => {
        setScaleTrigger(true);
      }, 50);
    });

    // Generate real-time SVG string for lossless vector downloading on demand
    QRCode.toString(
      qrData,
      {
        type: "svg",
        errorCorrectionLevel: config.errorCorrectionLevel,
        margin: config.margin !== undefined ? config.margin : 4,
        color: {
          dark: config.fgColor,
          light: config.bgColor,
        },
        width: size,
      },
      (err, svgText) => {
        if (!err && svgText) {
          if (config.isGradient && config.gradientStart && config.gradientEnd) {
            const gradientDef = `<defs><linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${config.gradientStart}" /><stop offset="100%" stop-color="${config.gradientEnd}" /></linearGradient></defs>`;
            let processedSvg = svgText.replace(new RegExp(`fill="${config.fgColor}"`, "g"), `fill="url(#qr-gradient)"`);
            if (!processedSvg.includes("id=\"qr-gradient\"")) {
              processedSvg = processedSvg.replace(/fill="[^"]+"/g, `fill="url(#qr-gradient)"`);
            }
            const svgTagMatch = processedSvg.match(/<svg[^>]*>/);
            if (svgTagMatch) {
              const insertIndex = svgTagMatch.index! + svgTagMatch[0].length;
              processedSvg = processedSvg.slice(0, insertIndex) + gradientDef + processedSvg.slice(insertIndex);
            }
            setSvgString(processedSvg);
          } else {
            setSvgString(svgText);
          }
        }
      }
    );
  }, [data, type, config]);

  // Helper to safely get canvas, falling back dynamically to a clean canvas without logo if tainted
  const getSafeCanvas = async (): Promise<HTMLCanvasElement> => {
    const canvas = canvasRef.current;
    if (!canvas) throw new Error("No canvas element");

    try {
      // Test if canvas is tainted by doing a minor read block
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.getImageData(0, 0, 1, 1);
      }
      return canvas;
    } catch (e) {
      console.warn("Canvas is tainted, generating fallback without logo...:", e);
      const fallbackCanvas = document.createElement("canvas");
      const size = config.resolution;
      fallbackCanvas.width = size;
      fallbackCanvas.height = size;

      const qrData = data || "https://qrcodegeneratorx.com";
      const qrOptions = {
        errorCorrectionLevel: config.errorCorrectionLevel,
        margin: config.margin !== undefined ? config.margin : 4,
        color: {
          dark: config.fgColor,
          light: "#00000000",
        },
        width: size,
      };

      await new Promise<void>((resolve, reject) => {
        QRCode.toCanvas(fallbackCanvas, qrData, qrOptions, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const ctx = fallbackCanvas.getContext("2d");
      if (ctx) {
        if (config.isGradient && config.gradientStart && config.gradientEnd) {
          ctx.save();
          ctx.globalCompositeOperation = "source-in";
          const gradient = ctx.createLinearGradient(0, 0, size, size);
          gradient.addColorStop(0, config.gradientStart);
          gradient.addColorStop(1, config.gradientEnd);
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, size, size);
          ctx.restore();
        }

        ctx.save();
        ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = config.bgColor || "#FFFFFF";
        ctx.fillRect(0, 0, size, size);
        ctx.restore();
      }

      triggerToast(locale === "ar" ? "تم التحميل بنجاح بدون الشعار بسبب سياسة الأمان." : "Downloaded successfully without logo due to source security policy.");
      return fallbackCanvas;
    }
  };

  // Handle PNG image downloads
  const handleDownloadPNG = async () => {
    try {
      const canvas = await getSafeCanvas();
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `qrcodegeneratorx-${type}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast("High-resolution PNG downloaded successfully!");
    } catch (e) {
      console.error(e);
      try {
        const fallbackCanvas = document.createElement("canvas");
        await QRCode.toCanvas(fallbackCanvas, data || "https://qrcodegeneratorx.com", {
          width: config.resolution || 272,
          margin: 4,
          color: { dark: config.fgColor || "#1E1B4B", light: config.bgColor || "#FFFFFF" }
        });
        const dataUrl = fallbackCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.download = `qrcodegeneratorx-${type}-${new Date().getTime()}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        triggerToast("PNG downloaded with default settings!");
      } catch (innerError) {
        console.error("Super fallback failed", innerError);
        triggerToast("Error downloading PNG image.");
      }
    }
  };

  const triggerDownloadSVG = (text: string) => {
    try {
      const blob = new Blob([text], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qrcodegeneratorx-${type}-${new Date().getTime()}.svg`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast("Lossless vector SVG downloaded successfully!");
    } catch (e) {
      console.error(e);
      triggerToast("Error downloading SVG vector.");
    }
  };

  // Handle Vector SVG downloads
  const handleDownloadSVG = () => {
    const qrData = data || "https://qrcodegeneratorx.com";
    const size = config.resolution;

    QRCode.toString(
      qrData,
      {
        type: "svg",
        errorCorrectionLevel: config.errorCorrectionLevel,
        margin: config.margin !== undefined ? config.margin : 4,
        color: {
          dark: config.fgColor,
          light: config.bgColor,
        },
        width: size,
      },
      (err, svgText) => {
        if (err || !svgText) {
          if (svgString) {
            triggerDownloadSVG(svgString);
          } else {
            triggerToast("Error downloading SVG vector.");
          }
          return;
        }

        let processedSvg = svgText;
        if (config.isGradient && config.gradientStart && config.gradientEnd) {
          const gradientDef = `<defs><linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${config.gradientStart}" /><stop offset="100%" stop-color="${config.gradientEnd}" /></linearGradient></defs>`;
          processedSvg = svgText.replace(new RegExp(`fill="${config.fgColor}"`, "g"), `fill="url(#qr-gradient)"`);
          if (!processedSvg.includes("id=\"qr-gradient\"")) {
            processedSvg = processedSvg.replace(/fill="[^"]+"/g, `fill="url(#qr-gradient)"`);
          }
          const svgTagMatch = processedSvg.match(/<svg[^>]*>/);
          if (svgTagMatch) {
            const insertIndex = svgTagMatch.index! + svgTagMatch[0].length;
            processedSvg = processedSvg.slice(0, insertIndex) + gradientDef + processedSvg.slice(insertIndex);
          }
        }
        triggerDownloadSVG(processedSvg);
      }
    );
  };

  // Handle Portable Document Format (PDF) Downloading
  const handleDownloadPDF = async () => {
    let canvas: HTMLCanvasElement;
    try {
      canvas = await getSafeCanvas();
    } catch (e) {
      console.error(e);
      triggerToast("Error loading canvas.");
      return;
    }

    try {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      // A4 page dimensions are 210 x 297 mm
      // Let's place the QR code centered and sized elegantly
      const qrWidth = 120;
      const qrHeight = 120;
      const x = (210 - qrWidth) / 2;
      const y = (297 - qrHeight) / 2 - 20; // Slightly raised above center

      // Add elegant typography and branding
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(15, 23, 42); // slate-900
      pdf.text("Custom QR Code", 105, 45, { align: "center" });

      // Add subtitle with generation details
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139); // slate-500
      pdf.text(`Format: ${type.toUpperCase()} | Resolution: ${config.resolution}x${config.resolution}px`, 105, 53, { align: "center" });

      // Embed high-quality PNG image onto the PDF
      pdf.addImage(imgData, "PNG", x, y, qrWidth, qrHeight);

      // Add a clean footer
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184); // slate-400
      pdf.text("Scan this QR code with any mobile camera or scanner app.", 105, 240, { align: "center" });
      pdf.text("Generated via qrcodegeneratorx.com", 105, 246, { align: "center" });

      // Safe save trigger
      pdf.save(`qrcodegeneratorx-${type}-print-${new Date().getTime()}.pdf`);
      triggerToast(locale === "ar" ? "تم تحميل ملف PDF بنجاح!" : "Print-ready PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      triggerToast(locale === "ar" ? "حدث خطأ أثناء تحميل ملف PDF." : "Error downloading PDF document.");
    }
  };

  // Save the template configuration to browser cache
  const handleCacheSave = () => {
    onSaveToHistory(historyLabel);
    setHistoryLabel("");
    triggerToast("QR configuration saved in local cache!");
  };

  // Generate dynamic shareable index page link containing variables
  const handleShareQR = () => {
    try {
      const serializedObj = {
        d: data,
        t: type,
        f: config.fgColor,
        b: config.bgColor,
        r: config.resolution,
        e: config.errorCorrectionLevel,
      };
      const base64Str = btoa(encodeURIComponent(JSON.stringify(serializedObj)));
      const shareUrl = `${window.location.origin}/${document.documentElement.lang || "en"}?qrs=${base64Str}`;
      
      navigator.clipboard.writeText(shareUrl);
      triggerToast(t("copied"));
    } catch {
      triggerToast("Could not generate share link.");
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6"
      >
        {/* Toast Alert message panel overlay */}
        {toastMsg && (
          <div className="absolute top-4 left-4 right-4 bg-slate-900 border border-slate-800 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2.5 animate-slide-in justify-center">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Header Badge metrics */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold tracking-wider text-slate-800 uppercase font-mono flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span>{t("live_output")}</span>
          </h3>
          <span className="bg-emerald-50 text-emerald-600 border border-emerald-150 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider">
            {t("client_side")}
          </span>
        </div>

        {/* Main visual Canvas QR Output card */}
        <div className="flex flex-col items-center justify-center py-4 bg-slate-50/50 rounded-2xl border border-slate-150 relative overflow-hidden group">
          <div
            className={`relative max-w-[280px] w-full aspect-square bg-white rounded-2xl p-4.5 border border-slate-150 shadow-md group-hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex items-center justify-center ${
              scaleTrigger ? "scale-100 opacity-100 rotate-0" : "scale-95 opacity-80"
            }`}
            style={{
              boxShadow: scaleTrigger ? "0 10px 30px -10px rgba(37,99,235,0.12)" : "none",
            }}
          >
            <div style={{
              width: "272px",
              height: "272px",
              minWidth: "272px",
              minHeight: "272px",
              position: "relative"
            }}>
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </div>
          {data && (
            <div className="mt-4.5 text-center text-[10px] text-zinc-400 font-mono tracking-wider flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Ready for 100% Commercial Use</span>
            </div>
          )}
        </div>

        {/* Format download button row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPNG}
            className="flex items-center justify-center gap-2 py-3 px-4.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md shadow-blue-500/10 transition-transform active:scale-95 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PNG</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSVG}
            className="flex items-center justify-center gap-2 py-3 px-4.5 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl bg-white text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-500" />
            <span>SVG</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            className="flex items-center justify-center gap-2 py-3 px-4.5 border border-slate-200 hover:border-blue-500 hover:text-blue-600 rounded-xl bg-white text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-red-500" />
            <span>Print PDF</span>
          </button>
        </div>


      </div>
    </>
  );
}
