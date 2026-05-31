import { Locale } from "../../types";
import { BLOG_POSTS } from "../../data/blogData";

interface JsonLdProps {
  page: string;
  locale: Locale;
  blogPostId?: string;
  faqList?: Array<{ question: string; answer: string }>;
}

export default function JsonLd({ page, locale, blogPostId, faqList }: JsonLdProps) {
  const rootUrl = "https://qrcodegeneratorx.com";
  const localizedUrl = `${rootUrl}/${locale}`;

  // 1. General Organization and Website - rendered on all pages
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${rootUrl}/#organization`,
    "name": "qrcodegeneratorx",
    "url": rootUrl,
    "logo": `${rootUrl}/favicon.svg`,
    "sameAs": ["https://twitter.com/qrcodegeneratorx"],
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${rootUrl}/#website`,
    "name": "qrcodegeneratorx",
    "url": localizedUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${localizedUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 2. Specific Page Schemas
  let pageSpecificData: any = null;

  if (page === "home") {
    pageSpecificData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${localizedUrl}/#softwareapplication`,
      "name": "qrcodegeneratorx Code Generator",
      "url": localizedUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires a modern HTML5-capable web browser.",
      "features": [
        "Pure client-side QR generation",
        "10 different dynamic input types (WiFi, URL, Email, etc)",
        "Curated visual contrast color templates",
        "Custom SVG, PNG and PDF export download shapes",
        "Error correction strength selectors",
        "Center branding logo overlay loader"
      ],
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "USD"
      }
    };
  } else if (page === "how-it-works") {
    pageSpecificData = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Generate a Custom QR Code Online",
      "description": "Step-by-step guide explaining how to create high-resolution QR codes with customizable colors and branding logo.",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose QR Code Content Type",
          "text": "Select from 10 different formats including URL, text, WiFi, email, contacts, location, and other setups.",
          "url": `${localizedUrl}/how-it-works`,
        },
        {
          "@type": "HowToStep",
          "name": "Customize QR Design and Color Palettes",
          "text": "Design custom colors, foreground and background shades, alter error correction levels, and upload your central corporate logo.",
          "url": `${localizedUrl}/how-it-works`,
        },
        {
          "@type": "HowToStep",
          "name": "Download in Vector or Raster Formats",
          "text": "Select the resolution size you require, and download as PNG, clean vector SVG, or printable vector PDF formats.",
          "url": `${localizedUrl}/how-it-works`,
        }
      ]
    };
  } else if (page === "faq" || faqList) {
    const list = faqList || [
      {
        question: "What is a QR code and how does it work?",
        answer: "A Quick Response (QR) code is a matrix two-dimensional barcode designed in 1994 by Denso Wave. It works by encoding numeric, alphanumeric, binary, and Kanji data into a black and white checkerboard grids. When an optical smartphone camera scans this grid, its internal processor translates the patterns into a readable string of text, URL, network credentials, or phone numbers. Because it reads in both vertical and horizontal directions, it supports hundreds of times more dataset density than traditional linear barcodes."
      },
      {
        question: "How do I generate a QR code for free?",
        answer: "Generating a QR code on qrcodegeneratorx is simple, safe, and completely free of charge. Simply navigate to the selector at the top of this page, choose your content format (e.g. Website URL, WiFi Router, vCard Contact, SMS), enter the required parameter fields, and review the preview generating instantly in real-time. Once satisfied, click PNG, SVG, or PDF to download the final graphic immediately without leaving the client-side."
      },
      {
        question: "Can I create a QR code for any website URL?",
        answer: "Yes! You can generate QR codes for any valid website URL. This includes standard websites, online booking links, personal LinkedIn profiles, YouTube videos, Instagram handles, restaurant menus, Google Maps coordinates, or cloud-hosted PDF files. To ensure maximum device compatibility, we validate that the input starts with http:// or https:// so scanner lenses can navigate users directly to the intended viewport."
      },
      {
        question: "What is the best free QR code generator in 2025?",
        answer: "qrcodegeneratorx is established as a premiere choice for 2025 because it operates 100% on the client side. Unlike traditional commercial makers which collect data, gate custom colors behind subscription paywalls, or expire your codes to force a premium upgrade, qrcodegeneratorx is completely free, secure, and permanent. It outputs vector formats (SVG, PDF) and allows custom logos without any signup or premium requirements."
      },
      {
        question: "How do I download my QR code as PNG or SVG?",
        answer: "On our generator platform, downloading is straightforward. Once your QR code is formatted in the live panel, you will see buttons labelled 'Download PNG', 'Download SVG', and 'Download PDF'. PNG is ideal for displaying on screens (websites, social media, emails). SVG is a lossless vector format, allowing you to scale the QR code to billboards or posters without losing any crisp sharpness."
      },
      {
        question: "Can I add my logo to the center of a QR code?",
        answer: "Yes, you can upload any custom corporate logo (PNG, JPG, or SVG) and place it directly inside the center of the QR code using our logos upload section. For safety, the logo is automatically constrained to 20% of the QR matrix. You should ensure the error correction tier is set to 'H' (30% redundancy) to allow scanning devices to read around the logo perfectly."
      },
      {
        question: "What is Reed-Solomon error correction in QR codes?",
        answer: "Reed-Solomon error correction is a mathematical algorithm that allows QR codes to be successfully scanned even if parts of them are ripped, dirty, or covered by a central company logo icon. We provide four selectable levels: L (7% recovery), M (15% recovery), Q (25% recovery), and H (30% recovery)."
      },
      {
        question: "How do I create a WiFi QR code?",
        answer: "Select the 'WiFi Router' tab under our configurator tools. Enter the wireless SSID (Network Name) and security password. Choose the encryption style. Once scanned by a phone, users can connect to the Wi-Fi instantly without typing password keys manually."
      },
      {
        question: "How do I make a vCard QR code for my business card?",
        answer: "Select the 'vCard Contact' tab, then provide your name, phone number, work company, email address, website, and physical address. The generator serializes this data according to the absolute vCard 3.0 specification. Once scanned, the phone automatically suggests to 'Create New Contact'."
      },
      {
        question: "How do I create a WhatsApp QR code?",
        answer: "Select the 'WhatsApp Chat' tab, provide your telephone number including your country prefix code, and write a pre-filled message. Scanning this instantly triggers WhatsApp app pre-loaded with your text."
      },
      {
        question: "Is qrcodegeneratorx completely free?",
        answer: "Yes, absolutely! The QR code graphics generated here are completely free, permanent, and commercial-grade. Unlike alternative services, we charge no monthly fees, place no scanner caps, and guarantee your static outputs will never expire after a trial period."
      },
      {
        question: "Do I need to create an account?",
        answer: "No registration is required. We believe in providing an lightweight utility experience. You do not need to share your email, input passwords, or verify credentials."
      },
      {
        question: "How do I scan a QR code with my phone?",
        answer: "Simply launch the built-in Camera app on any modern smartphone. Point the lens directly at the QR code, making sure the entire square is in focus. A popup banner will appear on your viewport indicating the action."
      },
      {
        question: "Can I customize QR code colors?",
        answer: "Yes, our tool features a full customized color dashboard. You can select from 6 presets or define color pickers manually. Always maintain a high contrast ratio between foreground and background."
      },
      {
        question: "What is the difference between static and dynamic QR codes?",
        answer: "Static QR codes encode data directly inside the symbol grid itself; therefore, the link inside can never be changed once printed. They are permanent and completely private. Dynamic QR codes encode a short redirection server link, allowing the tracking and changing of targets on the fly."
      },
      {
        question: "How long do QR codes last?",
        answer: "Static QR codes have no expiration date! Because the raw text or link information is directly woven into the physical pixels of the matrix, the QR code remains active forever."
      },
      {
        question: "What resolution should my QR code be for printing?",
        answer: "For printing on small items, we recommend an output resolution matching 350px or 512px. For display banners, use 1024px, or download the vector SVG or PDF format entirely."
      },
      {
        question: "Can QR codes be used for restaurant menus?",
        answer: "Definitely! This is standard practice in hospitality. Upload your PDF menu file to a hosting service, copy that file's share link, choose 'Website URL' inside qrcodegeneratorx, paste the link, and generate the QR code."
      },
      {
        question: "What is the maximum data a QR code can store?",
        answer: "A standard QR code can store up to 7,091 numeric characters, 4,296 alphanumeric characters, or 2,953 binary bytes. However, we recommend keeping your strings under 300 characters to prevent the grid cells from becoming too small."
      },
      {
        question: "Are my generated QR codes private and secure?",
        answer: "Yes! qrcodegeneratorx is a completely secure client-side utility. Unlike commercial generators which upload your passwords, locations, or sensitive vCard phone numbers, we process everything locally in your active web browser."
      }
    ];

    pageSpecificData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": list.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };
  } else if (page.startsWith("blog/") && blogPostId) {
    const post = BLOG_POSTS.find((p) => p.id === blogPostId);
    pageSpecificData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post ? post.title : blogPostId.replace(/-/g, " ").toUpperCase(),
      "image": `${rootUrl}/og-images/${blogPostId}.png`,
      "genre": "Digital Marketing",
      "keywords": post ? post.keywords.join(", ") : "qr code guide, qr code business, design tips qr code",
      "publisher": {
        "@type": "Organization",
        "name": "qrcodegeneratorx",
        "logo": {
          "@type": "ImageObject",
          "url": `${rootUrl}/favicon.svg`
        }
      },
      "url": `${localizedUrl}/${page}`,
      "datePublished": post ? "2026-01-15T08:00:00+00:00" : "2026-01-15T08:00:00+00:00",
      "dateModified": "2026-05-31T10:53:23+00:00",
      "author": {
        "@type": "Person",
        "name": "qrcodegeneratorx Editorial Desk"
      },
      "description": post ? post.summary : `Detailed insights, setup tutorials, and industry best-practices on how to optimize QR codes for branding, campaigns, and high-conversion client physical interactions.`
    };
  }

  // 3. Breadcrumb list schema setup
  const breadcrumbItems = [
    { name: "Home", item: localizedUrl },
  ];

  if (page !== "home") {
    breadcrumbItems.push({
      name: page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, " "),
      item: `${localizedUrl}/${page}`
    });
  }

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      {pageSpecificData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSpecificData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
