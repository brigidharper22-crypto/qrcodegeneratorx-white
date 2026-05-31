export type QRType =
  | "website_url"
  | "plain_text"
  | "wifi_router"
  | "vcard_contact"
  | "email_scheme"
  | "phone_line"
  | "whatsapp_chat"
  | "geo_location"
  | "sms_message"
  | "bitcoin_crypto";

export interface QRPreset {
  name: string;
  fg: string;
  bg: string;
  isGradient?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
}

export interface QRConfig {
  fgColor: string;
  bgColor: string;
  resolution: number; // 128 to 1024
  errorCorrectionLevel: "L" | "M" | "Q" | "H";
  logoDataUrl?: string; // uploaded logo in base64
  logoScale?: number; // 0.20 default
  isGradient?: boolean;
  gradientStart?: string;
  gradientEnd?: string;
  margin?: number;
}

export interface QRHistoryItem {
  id: string;
  type: QRType;
  label: string;
  data: string; // The raw serialized payload
  createdAt: string;
  config: QRConfig;
}

// Structuring dynamic fields per QR Type
export interface WifiConfig {
  ssid: string;
  password?: string;
  security: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export interface VCardConfig {
  name: string;
  phone?: string;
  email?: string;
  company?: string;
  website?: string;
  address?: string;
}

export interface EmailConfig {
  address: string;
  subject?: string;
  body?: string;
}

export interface WhatsAppConfig {
  phone: string; // country code + number
  message?: string;
}

export interface GeoConfig {
  latitude: string;
  longitude: string;
}

export interface SMSConfig {
  phone: string;
  message?: string;
}

export interface BitcoinConfig {
  address: string;
  amount?: string;
  message?: string;
}

export type Locale = "en" | "fr" | "es" | "ar" | "de" | "zh" | "pt" | "ja";
