import { useState, useEffect, useCallback } from "react";
import { Locale } from "../types";
import { DICTIONARY } from "../messages";

// Supported locales list
export const SUPPORTED_LOCALES: Locale[] = ["en", "fr", "es", "ar", "de", "zh", "pt", "ja"];

// Map local codes to human-readable strings and flags
export const LOCALE_INFO: Record<Locale, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  es: { name: "Español", flag: "🇪🇸" },
  ar: { name: "العربية", flag: "🇸🇦" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  zh: { name: "简体中文", flag: "🇨🇳" },
  pt: { name: "Português", flag: "🇵🇹" },
  ja: { name: "日本語", flag: "🇯🇵" },
};

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>("en");

  // Parse path to extract locale and page
  const parseUrl = useCallback(() => {
    const path = window.location.pathname;
    const segments = path.split("/").filter(Boolean);
    
    // First segment might be a locale
    let detectedLocale: Locale = "en";
    let detectedPage = "home";

    if (segments.length > 0) {
      const maybeLocale = segments[0] as Locale;
      if (SUPPORTED_LOCALES.includes(maybeLocale)) {
        detectedLocale = maybeLocale;
        detectedPage = segments.slice(1).join("/") || "home";
      } else {
        detectedPage = segments.join("/");
      }
    }

    return { detectedLocale, detectedPage };
  }, []);

  // Update browser state and document attributes
  const updateLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("qrify_locale", newLocale);

    // Update root HTML element properties
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";

    // Re-route URL: replace or push state with the new locale prefix
    const { detectedPage } = parseUrl();
    const cleanPage = detectedPage === "home" ? "" : detectedPage;
    const newPath = `/${newLocale}${cleanPage ? `/${cleanPage}` : ""}`;
    
    if (window.location.pathname !== newPath) {
      // Use pushState to make routing completely SPA-fast
      window.history.pushState({ locale: newLocale, page: detectedPage }, "", newPath);
      // Dispatch popstate event manually so standard listeners pick it up
      window.dispatchEvent(new Event("popstate"));
    }
  }, [parseUrl]);

  // Initial detection loop and popstate observer
  useEffect(() => {
    const syncLocale = () => {
      const { detectedLocale } = parseUrl();

      // Check localStorage fallback
      const cachedLocale = localStorage.getItem("qrify_locale") as Locale;
      const browserLocale = navigator.language.slice(0, 2) as Locale;

      let finalLocale: Locale = "en";
      if (SUPPORTED_LOCALES.includes(detectedLocale)) {
        finalLocale = detectedLocale;
      } else if (SUPPORTED_LOCALES.includes(cachedLocale)) {
        finalLocale = cachedLocale;
      } else if (SUPPORTED_LOCALES.includes(browserLocale)) {
        finalLocale = browserLocale;
      }

      // Apply & Sync
      setLocaleState(finalLocale);
      document.documentElement.lang = finalLocale;
      document.documentElement.dir = finalLocale === "ar" ? "rtl" : "ltr";
      
      // Sync pathname if we are on root "/"
      if (window.location.pathname === "/") {
        window.history.replaceState(null, "", `/${finalLocale}`);
      }
    };

    // Run once on mount
    syncLocale();

    // Listen to changes in routing/popstate
    window.addEventListener("popstate", syncLocale);
    return () => {
      window.removeEventListener("popstate", syncLocale);
    };
  }, [parseUrl]);

  const t = useCallback(
    (key: string): string => {
      const dictionary = DICTIONARY[locale] || DICTIONARY.en;
      return dictionary[key] || DICTIONARY.en[key] || key;
    },
    [locale]
  );

  return {
    locale,
    setLocale: updateLocale,
    t,
    isRTL: locale === "ar",
  };
}
