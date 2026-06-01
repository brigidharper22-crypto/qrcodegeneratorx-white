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

export default function QRTypeSelector({ activeType, onChange }: QRTypeSelectorProps) {
  const { t } = useI18n();

  // Definition array for 10 distinct types
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
        className="flex flex-row overflow-x-auto gap-2.5 pb-2.5 no-scrollbar w-full sm:-mx-4 sm:px-4 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-10 lg:gap-2 lg:overflow-x-visible"
        role="tablist"
        aria-label="QR Code Content Formats"
      >
        {typesList.map((typeObj) => {
          const IconComponent = typeObj.icon;
          const isActive = activeType === typeObj.id;

          return (
            <button
              key={typeObj.id}
              onClick={() => onChange(typeObj.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-center transition-all duration-150 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-blue-500/50 min-w-[115px] sm:min-w-[125px] lg:min-w-0 lg:w-full ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10 scale-[1.02]"
                  : "bg-white border-slate-200/80 hover:border-blue-300 text-slate-700 hover:text-blue-600 hover:shadow-sm hover:bg-slate-50/50"
              }`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${typeObj.id}`}
              id={`tab-${typeObj.id}`}
            >
              <IconComponent
                className={`w-5.2 h-5.2 mb-2 transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-white" : "text-blue-500"
                }`}
              />
              <span className="text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
                {typeObj.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
