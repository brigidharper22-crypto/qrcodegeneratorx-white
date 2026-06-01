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
      background: "#fff",
      display: "flex",
      justifyContent: "center",
      padding: "8px 0",
      borderBottom: "1px solid #e2e8f0",
      minHeight: "90px"
    }
  },
  heroRectangle: {
    id: "mv-hero-rectangle",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "24px 0",
      background: "#f8faff",
      minHeight: "280px"
    }
  },
  sidebarSticky: {
    id: "mv-sidebar-sticky",
    style: {
      position: "relative",
      minHeight: "600px",
      minWidth: "300px",
      display: "flex",
      justifyContent: "center"
    }
  },
  inContent1: {
    id: "mv-in-content-1",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "24px 0",
      minHeight: "280px"
    }
  },
  inContent2: {
    id: "mv-in-content-2",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "24px 0",
      background: "#f0f5ff",
      minHeight: "280px"
    }
  },
  inContent3: {
    id: "mv-in-content-3",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "24px 0",
      minHeight: "280px"
    }
  },
  blogMid: {
    id: "mv-blog-mid",
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "32px 0",
      minHeight: "280px"
    }
  },
  blogBottom: {
    id: "mv-blog-bottom",
    style: {
      display: "flex",
      justifyContent: "center",
      margin: "32px 0",
      minHeight: "250px"
    }
  },
  preFooter: {
    id: "mv-pre-footer",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "32px 0",
      background: "#f8faff",
      minHeight: "280px"
    }
  },
  adhesionMobile: {
    id: "mv-adhesion-mobile",
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "6px 0",
      minHeight: "60px",
      background: "#fff",
      borderTop: "1px solid #e2e8f0"
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

    const script = document.createElement("script");
    script.id = "mediavine-journey-script";
    script.src = "https://scripts.mediavine.com/tags/qrcodegeneratorx.js";
    script.defer = true;
    script.type = "text/javascript";

    document.head.appendChild(script);
  }, []);

  return null;
}

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
  style?: React.CSSProperties;
}

export function AdSlot({ placement, className = "", style = {} }: AdSlotProps) {
  // Uses exact format requested: <div id="[slot-id]" style="[exact-styles]" aria-label="Advertisement"></div>
  return (
    <div
      id={placement.id}
      className={`mediavine-ad ${className}`}
      style={{ ...placement.style, ...style }}
      aria-label="Advertisement"
    ></div>
  );
}
