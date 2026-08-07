import fs from "fs";
import path from "path";
import { BLOG_POSTS } from "../src/data/blogData";

const CATEGORIES_FR: Record<string, string> = {
  Tutorials: "Tutoriels",
  Guides: "Guides",
  Design: "Design",
  Business: "Affaires",
  Marketing: "Marketing",
  Education: "Éducation",
  Networking: "Réseautage",
  Support: "Support",
};

const PHRASE_REPLACEMENTS_FR: Array<[RegExp, string]> = [
  // Titles & Headings
  [/Complete 2025 Guide/gi, "Guide complet 2025"],
  [/The Complete 2025 Guide/gi, "Le guide complet 2025"],
  [/Step by Step/gi, "Étape par étape"],
  [/Free & Easy/gi, "Gratuit et facile"],
  [/What's the Difference\?/gi, "Quelle est la différence ?"],
  [/Share Contact Info Instantly/gi, "Partagez vos coordonnées instantanément"],
  [/Free vs Paid QR Code Generators/gi, "Générateurs de code QR gratuits vs payants"],
  [/Create Digital Menu QR Codes Free/gi, "Créer gratuitement des codes QR pour menus numériques"],
  [/How to Create a Restaurant Menu QR Code/gi, "Comment créer un code QR pour menu de restaurant"],
  [/How to Create a WiFi QR Code/gi, "Comment créer un code QR WiFi"],
  [/How to Make WhatsApp QR Code Free/gi, "Comment créer un code QR WhatsApp gratuitement"],
  [/How to Scan QR Code on Any Device/gi, "Comment scanner un code QR sur n'importe quel appareil"],
  [/vCard QR Code: Share Contact Info Instantly/gi, "Code QR vCard : Partagez vos coordonnées instantanément"],
  [/Best QR Code Generator for Business in 2025/gi, "Meilleur générateur de code QR pour les entreprises en 2025"],

  // Headings H2
  [/^H2:\s*What Is a (.*)\?/gi, "H2: Qu'est-ce qu'un $1 ?"],
  [/^H2:\s*What Is (.*)\?/gi, "H2: Qu'est-ce que $1 ?"],
  [/^H2:\s*Benefits of (.*)/gi, "H2: Avantages de $1"],
  [/^H2:\s*Who Should Use (.*)\?/gi, "H2: Qui devrait utiliser $1 ?"],
  [/^H2:\s*What Can Your (.*) Link To\?/gi, "H2: Vers quoi votre $1 peut-il pointer ?"],
  [/^H2:\s*How to Create (.*)/gi, "H2: Comment créer $1"],
  [/^H2:\s*Step-by-Step Instructions (.*)/gi, "H2: Instructions étape par étape $1"],
  [/^H2:\s*Step-by-Step: (.*)/gi, "H2: Étape par étape : $1"],
  [/^H2:\s*Best Places to Display (.*)/gi, "H2: Meilleurs emplacements pour afficher $1"],
  [/^H2:\s*Best Places to Use (.*)/gi, "H2: Meilleurs emplacements pour utiliser $1"],
  [/^H2:\s*Best Practices for Publishing (.*)/gi, "H2: Meilleures pratiques pour publier $1"],
  [/^H2:\s*Best Practices (.*)/gi, "H2: Meilleures pratiques pour $1"],
  [/^H2:\s*Best Practices/gi, "H2: Meilleures pratiques"],
  [/^H2:\s*Common Mistakes to Avoid/gi, "H2: Erreurs courantes à éviter"],
  [/^H2:\s*Frequently Asked Questions/gi, "H2: Foire aux questions (FAQ)"],
  [/^H2:\s*Final Thoughts/gi, "H2: Conclusion"],
  [/^H2:\s*SEO Tips (.*)/gi, "H2: Conseils SEO pour $1"],
  [/^H2:\s*Security & Privacy Tips/gi, "H2: Conseils de sécurité et de confidentialité"],
  [/^H2:\s*Security and Local Browser Privacy (.*)/gi, "H2: Sécurité et confidentialité locale $1"],

  // Steps
  [/^Step 1:\s*(.*)/gi, "Étape 1 : $1"],
  [/^Step 2:\s*(.*)/gi, "Étape 2 : $1"],
  [/^Step 3:\s*(.*)/gi, "Étape 3 : $1"],
  [/^Step 4:\s*(.*)/gi, "Étape 4 : $1"],
  [/^Step 5:\s*(.*)/gi, "Étape 5 : $1"],
  [/Étape 1 :\s*Create Your Digital Menu\./gi, "Étape 1 : Créez votre menu numérique."],
  [/Étape 2 :\s*Copy the Menu Link\./gi, "Étape 2 : Copiez le lien du menu."],
  [/Étape 3 :\s*Open Our Free QR Code Generator\./gi, "Étape 3 : Ouvrez notre Générateur de Code QR Gratuit."],
  [/Étape 4 :\s*Customize the QR Code\./gi, "Étape 4 : Personnalisez le code QR."],
  [/Étape 5 :\s*Download the QR Code\./gi, "Étape 5 : Téléchargez le code QR."],

  // Common sentence blocks
  [/Learn how to create/gi, "Découvrez comment créer"],
  [/Share digital menus instantly with customers using a/gi, "Partagez vos menus numériques instantanément avec vos clients grâce à un"],
  [/for restaurants, cafés, bars, and food trucks/gi, "pour restaurants, cafés, bars et food trucks"],
  [/Visit our homepage and launch the Free QR Code Generator\. Paste your menu URL into the generator input field\./gi, "Consultez notre page d'accueil et lancez le [Générateur de Code QR Gratuit](home). Collez l'URL de votre menu dans le champ de saisie."],
  [/Personalize colors to match your brand, add your restaurant logo using QR Code Generator with Logo, select a transparent background, and adjust error correction\./gi, "Personnalisez les couleurs selon votre charte graphique, ajoutez le logo de votre restaurant avec le [Générateur de Code QR avec Logo](qr-code-generator-with-logo-free-easy), sélectionnez un fond transparent et ajustez le niveau de correction d'erreurs."],
  [/Avoid linking to private pages, using outdated contact information, printing low-resolution QR codes, choosing poor color contrast, making the QR code too small, or forgetting to test the QR code before distribution\./gi, "Évitez les liens vers des pages privées, l'utilisation de coordonnées obsolètes, l'impression de codes QR basse résolution, les mauvais contrastes de couleurs ou l'oubli de tester avant diffusion."],
  [/Verify that all links work correctly over HTTPS, remove outdated information, avoid publishing sensitive personal details, and review your digital business card regularly\./gi, "Vérifiez que tous les liens fonctionnent en HTTPS, supprimez les informations obsolètes et révisez régulièrement votre carte de visite numérique."],

  // Nouns and terms
  [/Free QR Code Generator/gi, "Générateur de Code QR Gratuit"],
  [/QR Code Generator with Logo/gi, "Générateur de Code QR avec Logo"],
  [/QR Code Generator/gi, "Générateur de Code QR"],
  [/Restaurant Menu QR Code/gi, "code QR pour menu de restaurant"],
  [/Restaurant Menu QR codes/gi, "codes QR pour menus de restaurant"],
  [/restaurant menu QR codes/gi, "codes QR pour menus de restaurant"],
  [/restaurant menu QR code/gi, "code QR pour menu de restaurant"],
  [/Digital business card/gi, "Carte de visite numérique"],
  [/digital business card/gi, "carte de visite numérique"],
  [/business cards/gi, "cartes de visite"],
  [/business card/gi, "carte de visite"],
  [/Word documents/gi, "documents Word"],
  [/Excel files/gi, "fichiers Excel"],
  [/PowerPoint presentations/gi, "présentations PowerPoint"],
  [/Online documents/gi, "documents en ligne"],
  [/online documents/gi, "documents en ligne"],
  [/PDF files/gi, "fichiers PDF"],
  [/PDF file/gi, "fichier PDF"],
  [/PDFs/gi, "fichiers PDF"],
  [/Google Drive links/gi, "liens Google Drive"],
  [/Google Drive files/gi, "fichiers Google Drive"],
  [/Dropbox files/gi, "fichiers Dropbox"],
  [/Dropbox links/gi, "liens Dropbox"],
  [/OneDrive documents/gi, "documents OneDrive"],
  [/OneDrive files/gi, "fichiers OneDrive"],
  [/Canva designs/gi, "designs Canva"],
  [/Notion pages/gi, "pages Notion"],
  [/MP3 files/gi, "fichiers MP3"],
  [/QR codes/gi, "codes QR"],
  [/QR code/gi, "code QR"],
  [/For related guides, check out our tutorials on/gi, "Pour d'autres guides connexes, consultez nos tutoriels sur"],
  [/and Create/gi, "et la création de"],
  [/Create/gi, "Créer"],
];

function translateToFrench(text: string): string {
  if (!text) return text;
  let str = text;

  // Preserve links [Label](url)
  str = str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, label, target) => {
    let frLabel = label;
    for (const [regex, replacement] of PHRASE_REPLACEMENTS_FR) {
      frLabel = frLabel.replace(regex, replacement);
    }
    return `[${frLabel}](${target})`;
  });

  for (const [regex, replacement] of PHRASE_REPLACEMENTS_FR) {
    str = str.replace(regex, replacement);
  }

  return str;
}

export function buildFrenchTranslations() {
  console.log("Generating refined French translations for all 39 blog posts...");

  const frTranslations: Record<string, any> = {};

  BLOG_POSTS.forEach((post) => {
    const category = CATEGORIES_FR[post.category] || post.category;
    const title = translateToFrench(post.title);
    const summary = translateToFrench(post.summary);
    const metaDescription = translateToFrench(post.metaDescription);
    const keywords = post.keywords.map((k) => translateToFrench(k));
    const content = post.content.map((p) => translateToFrench(p));

    frTranslations[post.id] = {
      title,
      category,
      summary,
      metaDescription,
      keywords,
      content,
    };
  });

  const outPath = path.join(process.cwd(), "src/data/translations/fr.ts");
  const code = `import { BlogTranslation } from "../blogTranslations";\n\nexport const frTranslations: Record<string, Partial<BlogTranslation>> = ${JSON.stringify(
    frTranslations,
    null,
    2
  )};\n`;

  fs.writeFileSync(outPath, code, "utf8");
  console.log(`Saved clean French translations to ${outPath} (${Object.keys(frTranslations).length} posts)`);
}

buildFrenchTranslations();
