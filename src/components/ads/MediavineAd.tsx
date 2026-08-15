import React, { useEffect } from "react";

// Ad configurations matching requested slot positions, inline styles, minimum heights, and accessibility attributes
export interface AdPlacement {
  id: string;
  style: React.CSSProperties;
}

export const AD_PLACEMENTS: Record<string, AdPlacement> = {
  stickyLeaderboard: {
    id: "mv-sticky-leaderboard",
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  heroRectangle: {
    id: "mv-hero-rectangle",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  sidebarSticky: {
    id: "mv-sidebar-sticky",
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "center"
    }
  },
  inContent1: {
    id: "mv-in-content-1",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  inContent2: {
    id: "mv-in-content-2",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  inContent3: {
    id: "mv-in-content-3",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  blogMid: {
    id: "mv-blog-mid",
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "0",
    }
  },
  blogBottom: {
    id: "mv-blog-bottom",
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "0",
    }
  },
  preFooter: {
    id: "mv-pre-footer",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  },
  adhesionMobile: {
    id: "mv-adhesion-mobile",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0",
    }
  }
};

// Aliases for comprehensive backwards compatibility across the existing application
AD_PLACEMENTS.heroLeaderboard = AD_PLACEMENTS.heroRectangle;
AD_PLACEMENTS.sidebarRectangle = AD_PLACEMENTS.sidebarSticky;
AD_PLACEMENTS.betweenSections1 = AD_PLACEMENTS.inContent1;
AD_PLACEMENTS.betweenSections2 = AD_PLACEMENTS.inContent2;
AD_PLACEMENTS.blogInContent = AD_PLACEMENTS.blogMid;
AD_PLACEMENTS.footerLeaderboard = AD_PLACEMENTS.preFooter;
AD_PLACEMENTS.mobileAdhesion = AD_PLACEMENTS.adhesionMobile;

export function MediavineAdScript() {
  useEffect(() => {
    // Prevent duplicate injection
    if (document.getElementById("mediavine-journey-script")) return;

    const injectScript = () => {
      if (document.getElementById("mediavine-journey-script")) return;
      
      const script = document.createElement("script");
      script.id = "mediavine-journey-script";
      script.src = "https://scripts.mediavine.com/tags/qrcodegeneratorx.js";
      script.async = true;
      script.type = "text/javascript";

      document.head.appendChild(script);
    };

    if (document.readyState === "complete") {
      injectScript();
    } else {
      window.addEventListener("load", injectScript);
      return () => {
        window.removeEventListener("load", injectScript);
      };
    }
  }, []);

  return null;
}

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  style?: React.CSSProperties;
}

export function AdSlot({ placement, className = "", style = {} }: AdSlotProps) {
  // Uses exact format requested, automatically hiding when empty so no blank box shows
  return (
    <div
      id={placement.id}
      className={`mediavine-ad empty:hidden ${className}`}
      style={{ ...placement.style, ...style }}
      aria-label="Advertisement"
    ></div>
  );
}
