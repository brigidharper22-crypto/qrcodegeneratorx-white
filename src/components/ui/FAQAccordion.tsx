import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, HelpCircle, HelpCircle as HelpIcon } from "lucide-react";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "General" | "Customization" | "Technical" | "Security";
}

export default function FAQAccordion() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const faqs: FAQItem[] = [
    {
      id: 1,
      category: "General",
      question: "What is a QR code and how does it work?",
      answer: "A Quick Response (QR) code is a matrix two-dimensional barcode designed in 1994 by Denso Wave. It works by encoding numeric, alphanumeric, binary, and Kanji data into a black and white checkerboard grids. When a smartphone camera scans this grid, its internal processor translates the patterns into a readable string of text, URL, network credentials, or phone numbers. Because it reads in both vertical and horizontal directions, it supports hundreds of times more dataset density than traditional linear barcodes.",
    },
    {
      id: 2,
      category: "General",
      question: "How do I generate a QR code for free?",
      answer: "Generating a QR code on qrcodegeneratorx is simple, safe, and completely free of charge. Simply navigate to the selector at the top of this page, choose your content format (e.g. Website URL, WiFi Router, vCard Contact, SMS), enter the required parameter fields, and review the preview generating instantly in real-time. Once satisfied, click PNG, SVG, or PDF to download the final graphic immediately without leaving the client-side.",
    },
    {
      id: 3,
      category: "General",
      question: "Can I create a QR code for any website URL?",
      answer: "Yes! You can generate QR codes for any valid website URL. This includes standard websites (e.g., https://example.com), online booking links, personal LinkedIn profiles, YouTube videos, Instagram handles, restaurant menus, Google Maps coordinates, or cloud-hosted PDF files. To ensure maximum device compatibility, we validate that the input starts with http:// or https:// so scanner lenses can navigate users directly to the intended viewport.",
    },
    {
      id: 4,
      category: "General",
      question: "What is the best free QR code generator in 2025?",
      answer: "qrcodegeneratorx is established as a premiere choice for 2025 because it operates 100% on the client side. Unlike traditional commercial makers which collect data, gate custom colors behind subscription paywalls, or expire your codes to force a premium upgrade, qrcodegeneratorx is completely free, secure, and permanent. It outputs vector formats (SVG, PDF) and allows custom logos without any signup or premium requirements.",
    },
    {
      id: 5,
      category: "Technical",
      question: "How do I download my QR code as PNG or SVG?",
      answer: "On our generator platform, downloading is straightforward. Once your QR code is formatted in the live panel, you will see blue buttons labelled 'Download PNG', 'Download SVG', and 'Download PDF'. PNG is ideal for displaying on screens (websites, social media, emails). SVG is a lossless vector format, allowing you to scale the QR code to billboards or posters without losing any crisp sharpness. PDF serves as a printable document template ready for flyers.",
    },
    {
      id: 6,
      category: "Customization",
      question: "Can I add my logo to the center of a QR code?",
      answer: "Yes, you can upload any custom corporate logo (PNG, JPG, or SVG) and place it directly inside the center of the QR code using our 'Inject Corporate Logo' feature. For safety, the logo is automatically constrained to 20% of the QR grid. You should ensure the error correction tier is set to 'H' (30% redundancy) to allow scanning devices to read around the logo perfectly.",
    },
    {
      id: 7,
      category: "Technical",
      question: "What is Reed-Solomon error correction in QR codes?",
      answer: "Reed-Solomon error correction is a mathematical algorithm that allows QR codes to be successfully scanned even if parts of them are ripped, dirty, or covered by a central company logo icon. It creates redundant backup data blocks within the matrix. We provide four selectable levels: L (7% recovery), M (15% recovery), Q (25% recovery), and H (30% recovery). Higher error correction makes the QR code pattern more intricate but ensures high-performance scanning in dusty, physical-world use cases.",
    },
    {
      id: 8,
      category: "General",
      question: "How do I create a WiFi QR code?",
      answer: "Select the 'WiFi Router' tab under our configurator tools. Enter the wireless SSID (Network Name) and security password. Choose the encryption style (most modern networks use WPA or WPA2; select 'WEP' for legacy systems, or 'nopass' for open networks). Adjust hidden settings if your router broadcast is invisible. Once scanned by a phone, users can connect to the Wi-Fi instantly without typing long keywords manually.",
    },
    {
      id: 9,
      category: "General",
      question: "How do I make a vCard QR code for my business card?",
      answer: "Select the 'vCard Contact' tab, then provide your name, phone number, work company, email address, website, and physical address. The generator serializes this data according to the absolute vCard 3.0 specification. Once scanned, the phone automatically suggests to 'Create New Contact' on the user's native contact card manager, populating all parameters without typing errors.",
    },
    {
      id: 10,
      category: "General",
      question: "How do I create a WhatsApp QR code?",
      answer: "Select the 'WhatsApp Chat' tab, provide your telephone number including your country prefix code (e.g., +1 for the USA, +33 for France), and write a pre-filled generic message (like 'Hello, I'd like to inquire about your services'). Scanning this instantly triggers a chat interface in the smartphone's WhatsApp application pre-loaded with your draft.",
    },
    {
      id: 11,
      category: "General",
      question: "Is qrcodegeneratorx completely free?",
      answer: "Yes, absolutely! The QR code graphics generated here are completely free, permanent, and commercial-grade. Unlike alternative services, we charge no monthly fees, place no scanner caps, and guarantee your static outputs will never expire after a trial period. We support our hosting through non-blocking, elegant display advertisements in coordination with Mediavine Journey.",
    },
    {
      id: 12,
      category: "General",
      question: "Do I need to create an account?",
      answer: "No registration is required. We believe in providing an lightweight utility experience. You do not need to share your email, input passwords, or verify credentials. Simply visit, customize, download, and launch your business marketing campaign in under 10 seconds.",
    },
    {
      id: 13,
      category: "General",
      question: "How do I scan a QR code with my phone?",
      answer: "Simply launch the built-in Camera app on any modern iPhone, iPad, or Android smartphone. Point the lens directly at the QR code, making sure the entire square is in focus. A popup banner will appear on your viewport indicating the action (such as opening a website url or saving a Wi-Fi connection). Click the banner to execute the action immediately.",
    },
    {
      id: 14,
      category: "Customization",
      question: "Can I customize QR code colors?",
      answer: "Yes, our tool features a full customized color dashboard. You can select from 6 presets (such as Indigo Trust, Sky Dynamic, and Rose Brand) or define color pickers manually for the Foreground and Background colors. For proper scanning, always maintain a high contrast ratio between your dark foreground shapes and pale background layers.",
    },
    {
      id: 15,
      category: "Technical",
      question: "What is the difference between static and dynamic QR codes?",
      answer: "Static QR codes encode data directly inside the symbol grid itself; therefore, the link inside can never be changed once printed. They are permanent, completely private, and have no data redirection steps. Dynamic QR codes encode a short redirection server link, allowing the tracking and changing of targets on the fly. qrcodegeneratorx is a powerful, secure Static QR Generator, meaning all codes generated here are permanent, direct, and non-dependent on any cloud servers.",
    },
    {
      id: 16,
      category: "General",
      question: "How long do QR codes last?",
      answer: "Static QR codes have no expiration date! Because the raw text or link information is directly woven into the physical pixels of the matrix, the QR code remains active forever. The only reason a QR code might stop working is if the destination target url changes or goes offline.",
    },
    {
      id: 17,
      category: "Technical",
      question: "What resolution should my QR code be for printing?",
      answer: "For printing on small items (like business cards or brochures), we recommend an output resolution matching 350px or 512px. For display banners or signage, use 1024px, or download the vector SVG or PDF format entirely. Vector formats remain mathematically perfect and crisp at any print scale.",
    },
    {
      id: 18,
      category: "General",
      question: "Can QR codes be used for restaurant menus?",
      answer: "Definitely! This is standard practice in hospitality. Upload your PDF menu file to a hosting service (such as Google Drive, Dropbox, or your restaurant website), copy that file's share link, choose 'Website URL' inside qrcodegeneratorx, paste the link, and generate the QR code. Print the code onto table stickers or tent cards.",
    },
    {
      id: 19,
      category: "Technical",
      question: "What is the maximum data a QR code can store?",
      answer: "A standard QR code (Version 40 with Low error correction) can store up to 7,091 numeric characters, 4,296 alphanumeric characters, or 2,953 binary bytes. However, for faster and reliable scanner detection, we recommend keeping your strings under 300 characters to prevent the grid cells from becoming extremely small.",
    },
    {
      id: 20,
      category: "Security",
      question: "Are my generated QR codes private and secure?",
      answer: "Yes! qrcodegeneratorx is a completely secure client-side utility. Unlike commercial generators which upload your WiFi passwords, locations, or sensitive vCard phone numbers to remote storage databases, we process everything locally in your active web browser. Your credentials and texts never traverse the internet, representing strict privacy protection.",
    },
  ];

  const categories = ["All", "General", "Customization", "Technical", "Security"];

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = activeCategory === "All" || faq.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Search & Filter tools */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions or keywords... (e.g. WiFi, SVG, Logo)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl text-slate-800 text-sm shadow-sm outline-none transition-all"
            id="fqa-search-input"
          />
        </div>
        <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="FAQ Categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
              id={`fqa-tab-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List container */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-blue-400 shadow-md ring-1 ring-blue-500/10"
                    : "border-slate-250 hover:border-blue-400 hover:shadow-sm"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : faq.id)}
                  className="w-full flex items-start justify-between px-6 py-5 text-left font-display text-base font-semibold text-slate-900 transition-colors cursor-pointer"
                  style={{ gap: "1rem" }}
                  id={`fqa-btn-${faq.id}`}
                >
                  <div className="flex gap-3">
                    <HelpIcon className="w-5.5 h-5.5 text-blue-500 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </div>
                  <span className="p-1 rounded-lg bg-slate-50 border border-slate-100 text-slate-500">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isOpen ? "max-h-72 border-t border-slate-100 bg-slate-50/50" : "max-h-0 pointer-events-none"
                  }`}
                >
                  <div className="px-6 py-5 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Category: {faq.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Article reference #025-FAQ{faq.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-500">No results match your search keywords.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveCategory("All");
            }}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
