import { Locale } from "../types";
import { BlogPost, BLOG_POSTS } from "./blogData";
import { getCustomArticles } from "../utils/customArticlesStorage";

import { arTranslations } from "./translations/ar";
import { frTranslations } from "./translations/fr";
import { esTranslations } from "./translations/es";
import { deTranslations } from "./translations/de";
import { zhTranslations } from "./translations/zh";
import { ptTranslations } from "./translations/pt";
import { jaTranslations } from "./translations/ja";

export interface BlogTranslation {
  title: string;
  category: string;
  summary: string;
  metaDescription: string;
  keywords: string[];
  content: string[];
}

export const BLOG_TRANSLATIONS: Record<Exclude<Locale, "en">, Record<string, Partial<BlogTranslation>>> = {
  ar: arTranslations,
  fr: frTranslations,
  es: esTranslations,
  de: deTranslations,
  zh: zhTranslations,
  pt: ptTranslations,
  ja: jaTranslations,
};

// Returns localized version of the blog posts by merging base English posts with translations and user custom posts
export function getBlogPostsForLocale(locale: Locale): typeof BLOG_POSTS {
  const customPosts = getCustomArticles();
  const basePostsMerged = [...customPosts, ...BLOG_POSTS];
  return getBlogPostsForLocalePure(basePostsMerged, locale);
}

export function getBlogPostsForLocalePure(basePosts: any[], locale: Locale): any[] {
  if (locale === "en" || !BLOG_TRANSLATIONS[locale as Exclude<Locale, "en">]) {
    return basePosts;
  }

  const translations = BLOG_TRANSLATIONS[locale as Exclude<Locale, "en">];

  return basePosts.map((post) => {
    const postTranslation = translations[post.id];
    if (!postTranslation) {
      return post; // Fallback to current post data
    }

    return {
      ...post,
      title: postTranslation.title || post.title,
      category: postTranslation.category || post.category,
      summary: postTranslation.summary || post.summary,
      metaDescription: postTranslation.metaDescription || post.metaDescription,
      keywords: postTranslation.keywords || post.keywords,
      content: postTranslation.content || post.content,
    };
  });
}

