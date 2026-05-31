import { useState, useEffect } from "react";
import { QRType, QRConfig, QRHistoryItem } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import QRTypeSelector from "./QRTypeSelector";
import QRCustomizer from "./QRCustomizer";
import QRPreview from "./QRPreview";
import QRHistory from "./QRHistory";
import { AdSlot, AD_PLACEMENTS } from "../ads/MediavineAd";
import { Link, FileText, Wifi, Contact, Mail, Phone, MessageSquare, MapPin, Bitcoin, ShieldCheck } from "lucide-react";

interface QRGeneratorProps {
  initialPayloadFromUrl?: any;
}

export default function QRGenerator({ initialPayloadFromUrl }: QRGeneratorProps) {
  const { t, isRTL } = useI18n();

  // 1. Selector State
  const [activeType, setActiveType] = useState<QRType>("website_url");

  // 2. Individual Content Configuration States
  const [url, setUrl] = useState("https://example.com");
  const [text, setText] = useState("Scan me! Powered by qrcodegeneratorx.");
  const [wifi, setWifi] = useState({ ssid: "", password: "", security: "WPA", hidden: false });
  const [vcard, setVcard] = useState({ name: "", phone: "", email: "", company: "", website: "", address: "" });
  const [email, setEmail] = useState({ address: "", subject: "", body: "" });
  const [phoneLine, setPhoneLine] = useState("");
  const [whatsapp, setWhatsapp] = useState({ phone: "", message: "" });
  const [geo, setGeo] = useState({ latitude: "", longitude: "" });
  const [sms, setSms] = useState({ phone: "", message: "" });
  const [crypto, setCrypto] = useState({ address: "", amount: "", message: "" });

  // 3. Aesthetic Configuration State
  const [config, setConfig] = useState<QRConfig>({
    fgColor: "#1E1B4B", // Navy default
    bgColor: "#FFFFFF",
    resolution: 272,
    errorCorrectionLevel: "H", // H default
    margin: 4,
  });

  // 4. Synchronization Variables
  const [serializedData, setSerializedData] = useState("");
  const [historyRefresh, setHistoryRefresh] = useState(false);

  // Check URL integrations / sharing props on load
  useEffect(() => {
    if (initialPayloadFromUrl) {
      const { d, t: payloadType, f, b, r, e } = initialPayloadFromUrl;
      if (d) {
        setSerializedData(d);
        if (payloadType) {
          setActiveType(payloadType as QRType);
          // Load input field triggers based on types
          switch (payloadType) {
            case "website_url": setUrl(d); break;
            case "plain_text": setText(d); break;
            case "phone_line": setPhoneLine(d.replace("tel:", "")); break;
          }
        }
        setConfig({
          fgColor: f || "#1E1B4B",
          bgColor: b || "#FFFFFF",
          resolution: r ? Number(r) : 272,
          errorCorrectionLevel: e || "H",
          isGradient: f && (f.includes(",") || f.startsWith("gradient:")),
          gradientStart: f && f.includes(",") ? f.split(",")[0] : undefined,
          gradientEnd: f && f.includes(",") ? f.split(",")[1] : undefined,
        });
      }
    }
  }, [initialPayloadFromUrl]);

  // Real-time serializer compilation
  useEffect(() => {
    let raw = "";

    switch (activeType) {
      case "website_url":
        raw = url;
        break;
      case "plain_text":
        raw = text;
        break;
      case "wifi_router":
        // Spec format: WIFI:T:WPA;S:MyNetwork;P:MyPassword;H:false;;
        raw = `WIFI:T:${wifi.security};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? "true" : "false"};;`;
        break;
      case "vcard_contact":
        // Spec version 3.0 vCard matrix
        raw = `BEGIN:VCARD\nVERSION:3.0\nN:${vcard.name};;;;\nFN:${vcard.name}\nTEL;TYPE=CELL:${vcard.phone}\nEMAIL:${vcard.email}\nORG:${vcard.company}\nURL:${vcard.website}\nADR:;;${vcard.address};;;;\nEND:VCARD`;
        break;
      case "email_scheme":
        // Spec format mailto
        raw = `mailto:${email.address}?subject=${encodeURIComponent(email.subject || "")}&body=${encodeURIComponent(email.body || "")}`;
        break;
      case "phone_line":
        raw = `tel:${phoneLine}`;
        break;
      case "whatsapp_chat":
        // Spec wa.me link
        raw = `https://wa.me/${whatsapp.phone.replace("+", "")}?text=${encodeURIComponent(whatsapp.message || "")}`;
        break;
      case "geo_location":
        raw = `geo:${geo.latitude || "0"},${geo.longitude || "0"}`;
        break;
      case "sms_message":
        // Spec sms format
        raw = `SMSTO:${sms.phone}:${sms.message || ""}`;
        break;
      case "bitcoin_crypto":
        // Crypto trans spec
        const opts = [];
        if (crypto.amount) opts.push(`amount=${crypto.amount}`);
        if (crypto.message) opts.push(`message=${encodeURIComponent(crypto.message)}`);
        raw = `bitcoin:${crypto.address}${opts.length > 0 ? `?${opts.join("&")}` : ""}`;
        break;
    }

    setSerializedData(raw);
  }, [activeType, url, text, wifi, vcard, email, phoneLine, whatsapp, geo, sms, crypto]);

  // Restoring template configs from local history list
  const handleLoadHistoryTemplate = (item: QRHistoryItem) => {
    setActiveType(item.type);
    setSerializedData(item.data);
    setConfig({ ...item.config });

    // Repopulate matching entry lines
    switch (item.type) {
      case "website_url":
        setUrl(item.data);
        break;
      case "plain_text":
        setText(item.data);
        break;
    }
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  // Cache template config directly to history log
  const handleCacheSaveTemplate = (label: string) => {
    try {
      const stored = localStorage.getItem("qrify_history");
      const list: QRHistoryItem[] = stored ? JSON.parse(stored) : [];

      const newItem: QRHistoryItem = {
        id: new Date().getTime().toString(),
        type: activeType,
        label: label || `Custom QR - ${new Date().toLocaleTimeString()}`,
        data: serializedData,
        createdAt: new Date().toISOString(),
        config: config,
      };

      // Keep maximum 10 items in list cache
      const updatedList = [newItem, ...list].slice(0, 10);
      localStorage.setItem("qrify_history", JSON.stringify(updatedList));
      setHistoryRefresh((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8" id="qr-generator-root">
      {/* 1. Selector Tab bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <QRTypeSelector activeType={activeType} onChange={setActiveType} />
      </div>

      {/* 2. Double columns interactive split dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left configurations column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold tracking-wider text-slate-800 uppercase font-mono border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>2. Configure QR Target parameters</span>
            </h3>

            {/* Dynamic visual inputs matching active selection */}
            <div className="space-y-4">
              {activeType === "website_url" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <Link className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t("field_url")}</span>
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourbrand.com/deals"
                    className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800 shadow-sm"
                    id="input-website-url"
                  />
                  <p className="text-xs text-slate-400 font-medium">
                    {t("address_validation")}
                  </p>
                </div>
              )}

              {activeType === "plain_text" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    <span>{t("field_text")}</span>
                  </label>
                  <textarea
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type anything or scan coordinates here..."
                    className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800 shadow-sm resize-none"
                    id="input-plain-text"
                  />
                </div>
              )}

              {activeType === "wifi_router" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_wifi_ssid")}
                    </label>
                    <input
                      type="text"
                      value={wifi.ssid}
                      onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                      placeholder="My Home WiFi Network"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-wifi-ssid"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_wifi_pw")}
                    </label>
                    <input
                      type="password"
                      value={wifi.password}
                      onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                      placeholder="WPA password key"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-wifi-password"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_wifi_sec")}
                    </label>
                    <select
                      value={wifi.security}
                      onChange={(e) => setWifi({ ...wifi, security: e.target.value })}
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none text-slate-800 font-semibold"
                      id="input-wifi-security"
                    >
                      <option value="WPA">WPA / WPA2 (Recommended)</option>
                      <option value="WEP">WEP (Legacy)</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 pt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={wifi.hidden}
                      onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                      className="w-4.5 h-4.5 accent-blue-600 border-slate-300 rounded cursor-pointer"
                      id="input-wifi-hidden"
                    />
                    <label htmlFor="input-wifi-hidden" className="text-xs font-bold text-slate-600 uppercase cursor-pointer select-none">
                      {t("field_wifi_hidden")}
                    </label>
                  </div>
                </div>
              )}

              {activeType === "vcard_contact" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_name")}
                    </label>
                    <input
                      type="text"
                      value={vcard.name}
                      onChange={(e) => setVcard({ ...vcard, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-name"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_phone")}
                    </label>
                    <input
                      type="tel"
                      value={vcard.phone}
                      onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-phone"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_email")}
                    </label>
                    <input
                      type="email"
                      value={vcard.email}
                      onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
                      placeholder="jane@corporate.com"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-email"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_company")}
                    </label>
                    <input
                      type="text"
                      value={vcard.company}
                      onChange={(e) => setVcard({ ...vcard, company: e.target.value })}
                      placeholder="Standard Corp Ltd"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-company"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_website")}
                    </label>
                    <input
                      type="url"
                      value={vcard.website}
                      onChange={(e) => setVcard({ ...vcard, website: e.target.value })}
                      placeholder="https://corporate.com"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-website"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_vcard_address")}
                    </label>
                    <input
                      type="text"
                      value={vcard.address}
                      onChange={(e) => setVcard({ ...vcard, address: e.target.value })}
                      placeholder="120 Market St, San Francisco, CA"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-vcard-address"
                    />
                  </div>
                </div>
              )}

              {activeType === "email_scheme" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_email_to")}
                    </label>
                    <input
                      type="email"
                      value={email.address}
                      onChange={(e) => setEmail({ ...email, address: e.target.value })}
                      placeholder="support@product.com"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-email-to"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_email_sub")}
                    </label>
                    <input
                      type="text"
                      value={email.subject}
                      onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                      placeholder="Warranty Claim Inquiry"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-email-subject"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_email_body")}
                    </label>
                    <textarea
                      rows={3}
                      value={email.body}
                      onChange={(e) => setEmail({ ...email, body: e.target.value })}
                      placeholder="Write your email body draft message..."
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800 resize-none shadow-inner"
                      id="input-email-body"
                    />
                  </div>
                </div>
              )}

              {activeType === "phone_line" && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    {t("field_phone")}
                  </label>
                  <input
                    type="tel"
                    value={phoneLine}
                    onChange={(e) => setPhoneLine(e.target.value)}
                    placeholder="+15551234567"
                    className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                    id="input-phone-number"
                  />
                </div>
              )}

              {activeType === "whatsapp_chat" && (
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_whatsapp_phone")}
                    </label>
                    <input
                      type="tel"
                      value={whatsapp.phone}
                      onChange={(e) => setWhatsapp({ ...whatsapp, phone: e.target.value })}
                      placeholder="+15553654455 leading country codes"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-whatsapp-phone"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_whatsapp_msg")}
                    </label>
                    <textarea
                      rows={3}
                      value={whatsapp.message}
                      onChange={(e) => setWhatsapp({ ...whatsapp, message: e.target.value })}
                      placeholder="Hi! I want to book a table reservation."
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800 resize-none shadow-sm"
                      id="input-whatsapp-message"
                    />
                  </div>
                </div>
              )}

              {activeType === "geo_location" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_geo_lat")}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={geo.latitude}
                      onChange={(e) => setGeo({ ...geo, latitude: e.target.value })}
                      placeholder="37.7749"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-geo-latitude"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_geo_lon")}
                    </label>
                    <input
                      type="number"
                      step="any"
                      value={geo.longitude}
                      onChange={(e) => setGeo({ ...geo, longitude: e.target.value })}
                      placeholder="-122.4194"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-geo-longitude"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        // Load SF downtown mock parameters nicely matching functional search features
                        setGeo({ latitude: "37.774929", longitude: "-122.419416" });
                      }}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer underline flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Set to downtown San Francisco mock parameters</span>
                    </button>
                  </div>
                </div>
              )}

              {activeType === "sms_message" && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_sms_phone")}
                    </label>
                    <input
                      type="tel"
                      value={sms.phone}
                      onChange={(e) => setSms({ ...sms, phone: e.target.value })}
                      placeholder="+15555410145"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-sms-phone"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_sms_msg")}
                    </label>
                    <textarea
                      rows={3}
                      value={sms.message}
                      onChange={(e) => setSms({ ...sms, message: e.target.value })}
                      placeholder="Hi and greetings!"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800 resize-none shadow-inner"
                      id="input-sms-message"
                    />
                  </div>
                </div>
              )}

              {activeType === "bitcoin_crypto" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-3">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_crypto_addr")}
                    </label>
                    <input
                      type="text"
                      value={crypto.address}
                      onChange={(e) => setCrypto({ ...crypto, address: e.target.value })}
                      placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-mono font-medium text-slate-800"
                      id="input-crypto-address"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_crypto_amount")}
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={crypto.amount}
                      onChange={(e) => setCrypto({ ...crypto, amount: e.target.value })}
                      placeholder="0.005"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-crypto-amount"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      {t("field_crypto_msg")}
                    </label>
                    <input
                      type="text"
                      value={crypto.message}
                      onChange={(e) => setCrypto({ ...crypto, message: e.target.value })}
                      placeholder="Purchase Payment ID #029"
                      className="w-full bg-white border border-slate-250 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none font-medium text-slate-800"
                      id="input-crypto-message"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3. Color, Logo & Scale dashboard (Left Column Block 2) */}
          <QRCustomizer config={config} onChange={(updates) => setConfig((prev) => ({ ...prev, ...updates }))} />
        </div>

        {/* Right Dynamic Live Output Column */}
        <div className="lg:col-span-5 space-y-6">
          <QRPreview
            data={serializedData}
            type={activeType}
            config={config}
            onSaveToHistory={handleCacheSaveTemplate}
          />

          {/* Ad slot inside Right-side sidebar next to generator tool */}
          <AdSlot placement={AD_PLACEMENTS.sidebarRectangle} />
        </div>
      </div>
    </div>
  );
}
