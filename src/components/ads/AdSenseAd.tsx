import React, { useEffect, useRef } from "react";

interface AdSenseAdProps {
  adSlot?: string;
  style?: React.CSSProperties;
}

export function AdSenseAd({ adSlot = "AUTO", style = {} }: AdSenseAdProps) {
  return null; // Temporarily hidden pending AdSense approval

  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adRef.current) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          try {
            ((window as any).adsbygoogle = 
              (window as any).adsbygoogle || []).push({});
          } catch (e) {}
          observer.disconnect();
        }
      });
    }, { rootMargin: '200px' });
    
    observer.observe(adRef.current);
    
    return () => observer.disconnect();
  }, []);

  const mergedStyle: React.CSSProperties = {
    display: 'block', 
    margin: '2rem auto',
    textAlign: 'center',
    minHeight: '100px',
    ...style
  };

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={mergedStyle}
      data-ad-client="ca-pub-8349675226743692"
      data-ad-slot={adSlot === "AUTO" ? "8179247169" : adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
