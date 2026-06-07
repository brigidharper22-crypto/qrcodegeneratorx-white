import { useEffect, useRef, useState } from 'react';

export function AdSenseAd({ adSlot = "AUTO" }: { adSlot?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          // Load AdSense script only when ad is visible
          if (!(window as any).adsbygoogleLoaded) {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8349675226743692';
            script.crossOrigin = 'anonymous';
            script.onload = () => {
              (window as any).adsbygoogleLoaded = true;
              try {
                ((window as any).adsbygoogle = 
                  (window as any).adsbygoogle || []).push({});
              } catch (e) {}
            };
            document.head.appendChild(script);
          } else {
            try {
              ((window as any).adsbygoogle = 
                (window as any).adsbygoogle || []).push({});
            } catch (e) {}
          }
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [loaded]);

  const slotId = adSlot === "AUTO" ? "8179247169" : adSlot;

  return (
    <div ref={ref} style={{ minHeight: '100px', margin: '2rem auto' }}>
      {loaded && (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-8349675226743692"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  );
}

export default AdSenseAd;
