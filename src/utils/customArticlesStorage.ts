import { BlogPost } from "../data/blogData";
import { INITIAL_CUSTOM_ARTICLES } from "../data/initialCustomArticles";
import { sanitizeSlug } from "./articleAutoParser";

const STORAGE_KEY = "custom_published_articles_v1";
const DRAFT_KEY = "article_editor_draft_v1";

// In-memory cache of custom articles
let inMemoryArticles: BlogPost[] | null = null;
let isInitialSyncDone = false;

// Helper to normalize an article's ID and properties
export function normalizeArticle(article: BlogPost): BlogPost {
  const cleanId = sanitizeSlug(article.id) || article.id.replace(/^\/+|\/+$/g, "").trim().toLowerCase();
  return {
    ...article,
    id: cleanId,
  };
}

// Synchronous getter for instant rendering (seeded with INITIAL_CUSTOM_ARTICLES)
export function getCustomArticles(): BlogPost[] {
  if (inMemoryArticles !== null) {
    return inMemoryArticles;
  }

  // Base starting collection from built-in seed articles
  const seedArticlesMap = new Map<string, BlogPost>();
  INITIAL_CUSTOM_ARTICLES.forEach((a) => {
    const norm = normalizeArticle(a);
    seedArticlesMap.set(norm.id, norm);
  });

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed.forEach((a) => {
            if (a && a.id) {
              const norm = normalizeArticle(a);
              seedArticlesMap.set(norm.id, norm);
            }
          });
        }
      }
    } catch (e) {
      console.error("Failed to load custom articles from localStorage:", e);
    }
  }

  const merged = Array.from(seedArticlesMap.values());
  inMemoryArticles = merged;

  // Trigger background sync on first read
  if (!isInitialSyncDone && typeof window !== "undefined") {
    syncArticlesWithServer();
  }

  return merged;
}

// Fetch all public articles from server and update local cache
export async function syncArticlesWithServer(): Promise<BlogPost[]> {
  isInitialSyncDone = true;
  if (typeof window === "undefined") return INITIAL_CUSTOM_ARTICLES;

  try {
    const res = await fetch("/api/articles");
    if (res.ok) {
      const serverArticles: BlogPost[] = await res.json();
      if (Array.isArray(serverArticles)) {
        const mergedMap = new Map<string, BlogPost>();

        // 1. First add initial seed articles
        INITIAL_CUSTOM_ARTICLES.forEach((a) => {
          const norm = normalizeArticle(a);
          mergedMap.set(norm.id, norm);
        });

        // 2. Add local storage articles
        const local = getLocalArticlesOnly();
        local.forEach((a) => {
          if (a && a.id) {
            const norm = normalizeArticle(a);
            mergedMap.set(norm.id, norm);
          }
        });

        // 3. Server articles take precedence
        serverArticles.forEach((a) => {
          if (a && a.id) {
            const norm = normalizeArticle(a);
            mergedMap.set(norm.id, norm);
          }
        });

        const merged = Array.from(mergedMap.values());
        inMemoryArticles = merged;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        } catch (e) {
          // ignore quota
        }

        window.dispatchEvent(new Event("custom_articles_updated"));
        return merged;
      }
    }
  } catch (err) {
    console.warn("Could not sync with /api/articles, using local cache:", err);
  }

  return getCustomArticles();
}

function getLocalArticlesOnly(): BlogPost[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(normalizeArticle) : [];
  } catch (e) {
    return [];
  }
}

async function saveCustomArticleToServer(article: BlogPost): Promise<boolean> {
  try {
    const res = await fetch("/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    return res.ok;
  } catch (e) {
    console.warn("Failed to POST article to server:", e);
    return false;
  }
}

async function deleteCustomArticleFromServer(id: string): Promise<boolean> {
  try {
    const cleanId = sanitizeSlug(id) || id.replace(/^\/+|\/+$/g, "");
    const res = await fetch(`/api/articles/${encodeURIComponent(cleanId)}`, {
      method: "DELETE",
    });
    return res.ok;
  } catch (e) {
    console.warn("Failed to DELETE article from server:", e);
    return false;
  }
}

export function saveCustomArticle(article: BlogPost): boolean {
  if (typeof window === "undefined") return false;
  try {
    const normalized = normalizeArticle(article);
    const articles = [...getCustomArticles()];
    const existingIndex = articles.findIndex((a) => a.id === normalized.id);

    if (existingIndex >= 0) {
      articles[existingIndex] = normalized;
    } else {
      articles.unshift(normalized);
    }

    inMemoryArticles = articles;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event("custom_articles_updated"));

    // Async push to server for public visibility across all users
    saveCustomArticleToServer(normalized).then((success) => {
      if (success) {
        console.log(`Article "${normalized.title}" published publicly to server database.`);
      }
    });

    return true;
  } catch (e) {
    console.error("Failed to save custom article:", e);
    return false;
  }
}

export function deleteCustomArticle(id: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const cleanId = sanitizeSlug(id) || id.replace(/^\/+|\/+$/g, "");
    const articles = getCustomArticles().filter((a) => a.id !== cleanId && a.id !== id);
    inMemoryArticles = articles;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new Event("custom_articles_updated"));

    // Async delete from server
    deleteCustomArticleFromServer(id);

    return true;
  } catch (e) {
    console.error("Failed to delete custom article:", e);
    return false;
  }
}

export function saveArticleDraft(draft: Partial<BlogPost> & { focusKeyword?: string }): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error("Failed to save draft:", e);
  }
}

export function loadArticleDraft(): (Partial<BlogPost> & { focusKeyword?: string }) | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearArticleDraft(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch (e) {
    // ignore
  }
}

// Generate TypeScript code ready for copy-pasting into blogData.ts
export function generateArticleTypeScriptCode(article: BlogPost): string {
  return `  {
    id: ${JSON.stringify(article.id)},
    title: ${JSON.stringify(article.title)},
    date: ${JSON.stringify(article.date)},
    readTime: ${JSON.stringify(article.readTime)},
    category: ${JSON.stringify(article.category)},
    keywords: ${JSON.stringify(article.keywords)},
    summary: ${JSON.stringify(article.summary)},
    metaDescription: ${JSON.stringify(article.metaDescription)},
    content: ${JSON.stringify(article.content, null, 6)}
  },`;
}

// --- ADMIN AUTHENTICATION & SECURITY ---
const ADMIN_AUTH_KEY = "qr_admin_secure_creds_v2";
const ADMIN_SESSION_KEY = "qr_admin_active_session_v2";

// Default admin credentials (Username: admin, Password: Admin#Secret2026!)
const DEFAULT_ADMIN = {
  username: "admin",
  passwordHash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", // 'password' or custom
  lastUpdated: 1718000000000,
};

// Fast standard hash function using browser subtle crypto or polynomial hashing
export async function hashPassword(plainText: string): Promise<string> {
  try {
    if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode("SALT_QR_STUDIO_2026_" + plainText);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch (e) {
    // fallback
  }
  // Safe deterministic string fallback
  let hash = 0;
  for (let i = 0; i < plainText.length; i++) {
    hash = (hash << 5) - hash + plainText.charCodeAt(i);
    hash |= 0;
  }
  return "hash_" + Math.abs(hash).toString(16);
}

export function getAdminCreds(): { username: string; passwordHash: string } {
  if (typeof window === "undefined") return { username: "admin", passwordHash: "" };
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // fallback
  }
  return {
    username: "admin",
    passwordHash: "DEFAULT_UNINITIALIZED",
  };
}

export async function verifyAdminLogin(usernameInput: string, passwordInput: string): Promise<{ success: boolean; error?: string }> {
  if (typeof window === "undefined") return { success: false, error: "Environment error" };
  
  const creds = getAdminCreds();
  const inputHash = await hashPassword(passwordInput.trim());

  // Default initial check if never configured before
  if (creds.passwordHash === "DEFAULT_UNINITIALIZED") {
    // Initial default credentials
    if (
      usernameInput.trim() === "admin" &&
      (passwordInput === "admin1234" ||
        passwordInput === "admin123" ||
        passwordInput === "Admin#2026" ||
        passwordInput === "admin")
    ) {
      const initialHash = await hashPassword(passwordInput);
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify({ username: "admin", passwordHash: initialHash }));
      sessionStorage.setItem(ADMIN_SESSION_KEY, `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
      return { success: true };
    }
  }

  if (creds.username.toLowerCase() === usernameInput.trim().toLowerCase() && creds.passwordHash === inputHash) {
    sessionStorage.setItem(ADMIN_SESSION_KEY, `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
    return { success: true };
  }

  return { success: false, error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
}

export async function updateAdminCredentials(
  currentPasswordInput: string,
  newUsername: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!newUsername.trim() || newPassword.length < 6) {
    return { success: false, error: "يجب أن تكون كلمة المرور 6 أحرف على الأقل" };
  }

  const creds = getAdminCreds();
  const currentHash = await hashPassword(currentPasswordInput.trim());

  if (creds.passwordHash !== "DEFAULT_UNINITIALIZED" && creds.passwordHash !== currentHash) {
    return { success: false, error: "كلمة المرور الحالية غير صحيحة" };
  }

  const newHash = await hashPassword(newPassword.trim());
  localStorage.setItem(
    ADMIN_AUTH_KEY,
    JSON.stringify({
      username: newUsername.trim(),
      passwordHash: newHash,
      updatedAt: Date.now(),
    })
  );

  return { success: true };
}

export function isSessionAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const token = sessionStorage.getItem(ADMIN_SESSION_KEY);
    return Boolean(token && token.startsWith("session_"));
  } catch (e) {
    return false;
  }
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  } catch (e) {
    // ignore
  }
}
