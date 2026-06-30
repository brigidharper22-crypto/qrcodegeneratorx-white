import { QRType } from "../../types";
import { useI18n } from "../../hooks/useI18n";
import {
  Link,
  FileText,
  Wifi,
  Contact,
  Mail,
  Phone,
  MessageSquareCode,
  MapPin,
  MessageSquare,
  Bitcoin,
} from "lucide-react";

interface QRTypeSelectorProps {
  activeType: QRType;
  onChange: (type: QRType) => void;
}

const typeStyles: Record<QRType, {
  inactiveBg: string;
  inactiveBorder: string;
  inactiveText: string;
  inactiveIcon: string;
  activeBg: string;
  activeBorder: string;
  activeShadow: string;
}> = {
  website_url: {
    inactiveBg: "hover:bg-blue-50/40 hover:border-blue-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-blue-600",
    inactiveIcon: "text-blue-500",
    activeBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
    activeBorder: "border-blue-600",
    activeShadow: "shadow-md shadow-blue-500/25",
  },
  plain_text: {
    inactiveBg: "hover:bg-amber-50/40 hover:border-amber-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-amber-700",
    inactiveIcon: "text-amber-500",
    activeBg: "bg-gradient-to-br from-amber-500 to-orange-500 text-white",
    activeBorder: "border-amber-500",
    activeShadow: "shadow-md shadow-amber-500/25",
  },
  wifi_router: {
    inactiveBg: "hover:bg-emerald-50/40 hover:border-emerald-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-emerald-700",
    inactiveIcon: "text-emerald-500",
    activeBg: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white",
    activeBorder: "border-emerald-500",
    activeShadow: "shadow-md shadow-emerald-500/25",
  },
  vcard_contact: {
    inactiveBg: "hover:bg-violet-50/40 hover:border-violet-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-violet-700",
    inactiveIcon: "text-violet-500",
    activeBg: "bg-gradient-to-br from-violet-600 to-indigo-600 text-white",
    activeBorder: "border-violet-600",
    activeShadow: "shadow-md shadow-violet-500/25",
  },
  email_scheme: {
    inactiveBg: "hover:bg-rose-50/40 hover:border-rose-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-rose-700",
    inactiveIcon: "text-rose-500",
    activeBg: "bg-gradient-to-br from-rose-500 to-red-500 text-white",
    activeBorder: "border-rose-500",
    activeShadow: "shadow-md shadow-rose-500/25",
  },
  phone_line: {
    inactiveBg: "hover:bg-sky-50/40 hover:border-sky-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-sky-755",
    inactiveIcon: "text-sky-500",
    activeBg: "bg-gradient-to-br from-sky-500 to-blue-500 text-white",
    activeBorder: "border-sky-500",
    activeShadow: "shadow-md shadow-sky-500/25",
  },
  whatsapp_chat: {
    inactiveBg: "hover:bg-teal-50/40 hover:border-teal-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-teal-700",
    inactiveIcon: "text-teal-500",
    activeBg: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white",
    activeBorder: "border-teal-500",
    activeShadow: "shadow-md shadow-teal-500/25",
  },
  geo_location: {
    inactiveBg: "hover:bg-fuchsia-50/40 hover:border-fuchsia-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-fuchsia-700",
    inactiveIcon: "text-fuchsia-500",
    activeBg: "bg-gradient-to-br from-fuchsia-500 to-pink-600 text-white",
    activeBorder: "border-fuchsia-500",
    activeShadow: "shadow-md shadow-fuchsia-500/25",
  },
  sms_message: {
    inactiveBg: "hover:bg-indigo-50/40 hover:border-indigo-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-indigo-700",
    inactiveIcon: "text-indigo-500",
    activeBg: "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
    activeBorder: "border-indigo-500",
    activeShadow: "shadow-md shadow-indigo-500/25",
  },
  bitcoin_crypto: {
    inactiveBg: "hover:bg-orange-50/40 hover:border-orange-200",
    inactiveBorder: "border-slate-200/80",
    inactiveText: "text-slate-700 hover:text-orange-700",
    inactiveIcon: "text-orange-500",
    activeBg: "bg-gradient-to-br from-orange-500 to-amber-600 text-white",
    activeBorder: "border-orange-500",
    activeShadow: "shadow-md shadow-orange-500/25",
  },
};

export default function QRTypeSelector({ activeType, onChange }: QRTypeSelectorProps) {
  const { t } = useI18n();

  const typesList: Array<{ id: QRType; label: string; icon: any }> = [
    { id: "website_url", label: "Website URL", icon: Link },
    { id: "plain_text", label: "Plain Text", icon: FileText },
    { id: "wifi_router", label: "WiFi Router", icon: Wifi },
    { id: "vcard_contact", label: "vCard Contact", icon: Contact },
    { id: "email_scheme", label: "Email", icon: Mail },
    { id: "phone_line", label: "Phone Line", icon: Phone },
    { id: "whatsapp_chat", label: "WhatsApp Chat", icon: MessageSquareCode },
    { id: "geo_location", label: "Geo Location", icon: MapPin },
    { id: "sms_message", label: "SMS Message", icon: MessageSquare },
    { id: "bitcoin_crypto", label: "Bitcoin Wallet", icon: Bitcoin },
  ];

  return (
    <div className="w-full">
      <div
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5 w-full"
        role="tablist"
        aria-label="QR Code Content Formats"
      >
        {typesList.map((typeObj) => {
          const IconComponent = typeObj.icon;
          const isActive = activeType === typeObj.id;
          const style = typeStyles[typeObj.id];

          return (
            <button
              key={typeObj.id}
              onClick={() => onChange(typeObj.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/30 w-full ${
                isActive
                  ? `${style.activeBg} ${style.activeBorder} ${style.activeShadow} scale-[1.02]`
                  : `bg-white ${style.inactiveBorder} ${style.inactiveBg} ${style.inactiveText}`
              }`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${typeObj.id}`}
              id={`tab-${typeObj.id}`}
            >
              <IconComponent
                className={`w-5.5 h-5.5 mb-2 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : style.inactiveIcon
                }`}
              />
              <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {typeObj.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
