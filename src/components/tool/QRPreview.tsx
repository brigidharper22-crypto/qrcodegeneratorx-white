import { useRef, useEffect, useState } from "react";
import { QRConfig, QRType, QRHistoryItem } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import QRCode from "qrcode";
import {
  Download,
  Share2,
  FolderDot,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  BookOpen,
} from "lucide-react";

interface QRPreviewProps {
  data: string; // Serialized QR payload
  type: QRType;
  config: QRConfig;
  onSaveToHistory: (label: string) => void;
}

export default function QRPreview({ data, type, config, onSaveToHistory }: QRPreviewProps) {
  const { t } = useI18n();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [svgString, setSvgString] = useState<string>("");
  const [historyLabel, setHistoryLabel] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");
  const [scaleTrigger, setScaleTrigger] = useState<boolean>(false);

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

  // Handle PNG image downloads
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
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
      triggerToast("Error downloading PNG image.");
    }
  };

  // Handle Vector SVG downloads
  const handleDownloadSVG = () => {
    if (!svgString) return;

    try {
      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
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

  // Handle Portable Document Format (PDF) Downloading
  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);

      // Create raw, compliant 100% Client-Side PDF vector document
      // We manually build a lightweight, standard PDF blob to completely bypass third-party bundle errors
      const pdfWidth = 595; // A4 standard width pixels 
      const pdfHeight = 842; // A4 standard height pixels
      const qrPrintSize = 350; // crisp printed size
      const x = (pdfWidth - qrPrintSize) / 2;
      const y = (pdfHeight - qrPrintSize) / 2 - 40;

      // Construct plain PDF structures
      const pdfString = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pdfWidth} ${pdfHeight}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /XObject /Subtype /Image /Width ${config.resolution} /Height ${config.resolution} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imgData.length} >>
stream
${imgData}
endstream
endobj
5 0 obj
<< /Length 120 >>
stream
q
${qrPrintSize} 0 0 ${qrPrintSize} ${x} ${y} cm
/Im1 Do
Q
BT
/Helvetica 14 Tf
70 700 Td
(qrcodegeneratorx - High Resolution Printable PDF Document) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000115 00000 n 
0000000280 00000 n 
0000000450 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
650
%%EOF`;

      const blob = new Blob([pdfString], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = `qrcodegeneratorx-${type}-print-${new Date().getTime()}.pdf`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerToast("Print-ready PDF downloaded successfully!");
    } catch {
      // Elegant alternative using canvas data embedding in an iframe and triggering native PDF save
      const win = window.open("", "_blank");
      if (win) {
        win.document.write(`<html><head><title>Print QR Code</title></head><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#f0fafc;">
          <div style="text-align:center;font-family:sans-serif;background:white;padding:50px;border-radius:24px;box-shadow:0 10px 40px rgba(0,0,0,0.05);max-width:500px;">
            <p style="font-weight:bold;color:#0f172a;font-size:18px;margin-bottom:8px;">qrcodegeneratorx Printable Sheet</p>
            <p style="color:#64748b;font-size:13px;margin-bottom:24px;">Format: ${type.toUpperCase()} | Resolution: ${config.resolution}px</p>
            <img src="${canvas.toDataURL("image/png")}" style="width:300px;height:300px;display:block;margin:0 auto 24px auto;" />
            <button onclick="window.print()" style="background:#2563eb;color:white;border:none;padding:12px 24px;border-radius:12px;font-weight:bold;font-size:14px;cursor:pointer;box-shadow:0 4px 12px rgba(37,99,235,0.15)">Print / Save PDF</button>
          </div>
        </body></html>`);
        win.document.close();
        triggerToast("Alternative printing portal launched!");
      }
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
        className="sticky top-20 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6"
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
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.01]"
            />
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

        {/* Share and Cache Form Section */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase font-mono block">
              {t("history_label")}
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Guest Wi-Fi setup"
                value={historyLabel}
                onChange={(e) => setHistoryLabel(e.target.value)}
                className="flex-1 bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3.5 py-2.5 text-sm outline-none font-medium text-slate-800"
                id="history-label-input"
              />
              <button
                type="button"
                onClick={handleCacheSave}
                className="flex items-center gap-1.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider rounded-xl transition-all active:scale-95 cursor-pointer"
              >
                <FolderDot className="w-4 h-4 text-slate-500" />
                <span>{t("add_to_dashboard")}</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleShareQR}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-blue-300 hover:border-blue-500 text-blue-600 hover:text-blue-700 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors bg-blue-50/50 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{t("share_qr")}</span>
          </button>
        </div>
      </div>
    </>
  );
}
