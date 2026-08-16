import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const ARTICLES_FILE = path.join(process.cwd(), "data", "custom-articles.json");

// Ensure data directory and articles file exist
function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

function readArticles(): any[] {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(ARTICLES_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Error reading articles from file:", e);
    return [];
  }
}

function writeArticles(articles: any[]): boolean {
  try {
    ensureDataDir();
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), "utf8");
    return true;
  } catch (e) {
    console.error("Error writing articles to file:", e);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser for API requests
  app.use(express.json({ limit: "15mb" }));

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. GET ALL PUBLIC ARTICLES
  app.get("/api/articles", (_req, res) => {
    const articles = readArticles();
    res.json(articles);
  });

  // 2. POST / SAVE ARTICLE (Create or Update)
  app.post("/api/articles", (req, res) => {
    try {
      const article = req.body;
      if (!article || !article.id || !article.title) {
        res.status(400).json({ error: "Article id and title are required." });
        return;
      }

      const articles = readArticles();
      const existingIndex = articles.findIndex((a: any) => a.id === article.id);

      if (existingIndex >= 0) {
        articles[existingIndex] = {
          ...articles[existingIndex],
          ...article,
          updatedAt: new Date().toISOString(),
        };
      } else {
        articles.unshift({
          ...article,
          publishedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      const saved = writeArticles(articles);
      if (!saved) {
        res.status(500).json({ error: "Failed to persist article." });
        return;
      }

      res.status(200).json({ success: true, article });
    } catch (err: any) {
      console.error("Error in POST /api/articles:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // 3. DELETE ARTICLE BY ID
  app.delete("/api/articles/:id", (req, res) => {
    try {
      const { id } = req.params;
      const articles = readArticles();
      const filtered = articles.filter((a: any) => a.id !== id);

      if (filtered.length === articles.length) {
        res.status(404).json({ error: "Article not found." });
        return;
      }

      const saved = writeArticles(filtered);
      if (!saved) {
        res.status(500).json({ error: "Failed to delete article." });
        return;
      }

      res.status(200).json({ success: true, id });
    } catch (err: any) {
      console.error("Error in DELETE /api/articles:", err);
      res.status(500).json({ error: err.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
