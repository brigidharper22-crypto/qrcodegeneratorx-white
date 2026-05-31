import { useI18n } from "../../hooks/useI18n";
import { Link, CheckCircle, Shield, Award, Users, Trash2, ArrowUpRight, Cpu } from "lucide-react";
import { AdSlot, AD_PLACEMENTS } from "../ads/MediavineAd";

// How It Works Detailed page layout
export function HowItWorksView() {
  const { t } = useI18n();
  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      {/* Hero headers */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
          How It <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Generate professional, branding-compliant QR codes in three simple steps. Learn how our client-side software encodes and distributes high-fidelity files instantly.
        </p>
      </div>

      {/* 3 Step Card Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative">
          <span className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">1</span>
          <h3 className="text-lg font-bold font-display text-slate-900 mt-2 mb-3">Choose Content Medium</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Select standard input configurations supporting standard web URLs, local Wi-Fi router binds, SMS texting, map coordinates, emails, or personal vCard directory profiles.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative">
          <span className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">2</span>
          <h3 className="text-lg font-bold font-display text-slate-900 mt-2 mb-3">Aesthetic Adjustments</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Customize layout patterns by matching brand hex numbers, increase error mitigation structures (Reed-Solomon), and upload a transparent corporate trademark logo directly in the center.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 relative">
          <span className="absolute -top-4 left-6 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold font-mono">3</span>
          <h3 className="text-lg font-bold font-display text-slate-900 mt-2 mb-3">Vector Export Codes</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Specify output pixel layout sizes (128px up to 1024px), verify the live generating layout, and download instantly in screens-optimized PNG, vector SVG, or printable vector PDF.
          </p>
        </div>
      </div>

      <AdSlot placement={AD_PLACEMENTS.betweenSections1} />

      {/* Advanced info section */}
      <div className="bg-blue-50 border border-blue-150 rounded-2xl p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">Under the hood</span>
          <h2 className="text-2xl font-bold font-display text-slate-900">High Scannability Engineering</h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Typical makers draw pixels without margin buffers, resulting in overlay logos that overlap matrix cells and break scans. qrcodegeneratorx utilizes custom mathematical equations to create an offset shield around your central logo, isolating logo elements from QR square blocks and boosting scannability across low-light phone optics.
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-600">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Forced Reed-Solomon H (30%) parity block rendering.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Correct four-module Quiet Zone margin clearance protection.</span>
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center bg-white p-6 border border-slate-200 rounded-xl shadow-inner">
          <Cpu className="w-16 h-16 text-blue-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Features Detailed page layout
export function FeaturesView() {
  const features = [
    { title: "10 Format Mediums", text: "Whether routing visitors to booking pages, Wi-Fi networks, SMS drafts, geo coordinates, or emails, qrcodegeneratorx carries native fields that format inputs correctly matching global standards.", icon: Link },
    { title: "Dynamic Color Presets", text: "Pick curated, high-contrast visual pallets like Indigo Trust, Rose Brand, and Eco Mint, or define accurate Hex values manually with standard live pickers.", icon: Award },
    { title: "Correction Level Selectors", text: "Select Reed-Solomon error correction rates from Low (7%) up to High (30%). Essential for outdoor physical items that gather dust, creases, or tears.", icon: Shield },
    { title: "Central Corporate Logos", text: "Drag-and-drop your company trademark emblem. Our generator center aligns, crops, outlines, and embeds the emblem at exactly 20% scale.", icon: Users },
    { title: "Lossless PDF & SVG Exports", text: "Export lossless vector SVG or print-ready PDF formats. Scale graphics up to highway billboards or down to company business cards with zero pixel bleed.", icon: ArrowUpRight },
    { title: "Pure Client Privacy", text: "We believe in strict security limits. Your company passwords, phone lines, and links are computed inside your active browser - never uploaded to databases.", icon: CheckCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black font-display tracking-tight text-slate-900 leading-tight">
          Powerful <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Features</span>
        </h1>
        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The ultimate platform for creating branding-ready static QR codes. Fast, secure, transparent, and completely free of charge.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200/80 hover:border-blue-500 hover:shadow-md transition-all duration-200 rounded-2xl p-6 group">
              <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-150 flex items-center justify-center text-blue-650 mb-4.5 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shadow-sm">
                <Icon className="w-5.5 h-5.5" />
              </div>
              <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">{feat.text}</p>
            </div>
          );
        })}
      </div>

      <AdSlot placement={AD_PLACEMENTS.betweenSections2} />
    </div>
  );
}

// Privacy Policy page
export function PrivacyPolicyView() {
  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-150 rounded-2xl p-6 md:p-10 shadow-sm space-y-6 text-slate-700">
      <h1 className="text-3xl font-black font-display text-slate-900 leading-tight border-b border-slate-100 pb-5">
        Privacy Policy — qrcodegeneratorx
      </h1>
      <p className="text-xs text-slate-400 font-mono">Last updated: May 31, 2026</p>

      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <p>
          At qrcodegeneratorx, your privacy is our absolute priority. Unlike typical online generators, our platform is engineered of a **Pure Client-Side Architecture**. This means all data serialization, mathematical matrix parsing, color transformations, logo cropping overlay layers, and file packaging operations take place 100% inside your active web browser memory.
        </p>
        <p>
          We do not transmit your inputs, WiFi passwords, vCards, locations, or text payloads over the internet. Your source coordinates never reach our servers, guaranteeing absolute protection from data tracking.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">1. Information We Do Not Collect</h3>
        <p>
          We do not operate backend user databases, tracking registries, or cloud data lakes. We do not prompt users to create profiles, share emails, or connect credentials. There are no tracking scripts recording your compiled texts. Only standard client performance states are preserved locally inside your browser storage (if you explicitly use the "Save to Cache" template tool). You can clear this cache history at any time.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">2. Advertisements & Partners</h3>
        <p>
          To maintain our servers and ensure our tools remain 100% free of charge for commercial use, we coordinate visual advertisements on our websites with Mediavine Journey. Ad networks may process basic system metadata or location telemetry to deliver customized placements. These partners comply with rigid privacy structures, GDPR, CCPA, and COPPA frameworks.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">3. External Linking</h3>
        <p>
          Our blog or content cards contain links to third-party domains (such as social networks or payment links). We encourage you to review their specific privacy structures before engaging.
        </p>
      </div>
    </div>
  );
}

// Terms of Service page Layout
export function TermsView() {
  return (
    <div className="max-w-3xl mx-auto bg-white border border-slate-150 rounded-2xl p-6 md:p-10 shadow-sm space-y-6 text-slate-700">
      <h1 className="text-3xl font-black font-display text-slate-900 leading-tight border-b border-slate-100 pb-5">
        Terms of Service
      </h1>
      <p className="text-xs text-slate-400 font-mono">Last updated: May 31, 2026</p>

      <div className="space-y-4 text-sm md:text-base leading-relaxed">
        <h3 className="text-lg font-bold font-display text-slate-900">1. Acceptance of Terms</h3>
        <p>
          By visiting, accessing, or generating files on qrcodegeneratorx, you agree to comply with and be bound by these legal terms. If you do not accept these parameters, you are instructed to exit the application immediately.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">2. Commercial & Personal License</h3>
        <p>
          QR codes generated on qrcodegeneratorx carry a **Lifetime, Commercial-Grade, Free, and Royalty-Free License**. You can use them on physical assets (books, packaging, bills, restaurant menus), digital websites, emails, or billboards. There are no scanner caps, expiration dates, or required attribution tags.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">3. Forbidden usage</h3>
        <p>
          You agree not to utilize qrcodegeneratorx to generate static barcodes representing malicious software downloads, credential spear-phishing campaigns, hate speech, scam operations, or illegal transaction pointers. We disclaim all liability stemming from scanning activities of QR codes designed on our tools.
        </p>

        <h3 className="text-lg font-bold font-display text-slate-900 pt-3">4. Disclaimer of Warranty</h3>
        <p>
          The platform, graphics, outputs, and blog materials are served "AS IS" without warranty of any kind, whether direct or implied. We do not guarantee that the client-side files will work flawlessly with all legacy smartphone camera sensors. Users are instructed to perform scannability tests on secondary devices before launching large physical print runs.
        </p>
      </div>
    </div>
  );
}
