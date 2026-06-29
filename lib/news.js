import { DUMMY_NEWS } from "@/app/assets/dummy-news";
import sql from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "news.db");
const isProd = process.env.NODE_ENV === "production";
const db = new sql(dbPath, { readonly: isProd });

// Init DB and seed on first run (only in development/non-production)
const initDB = () => {
    db.prepare(
        `
    CREATE TABLE IF NOT EXISTS news (
      id VARCHAR(255) PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    date TEXT DEFAULT CURRENT_DATE,
    content text NOT NULL
    )
    `,
    ).run();

    const count  = db.prepare(`SELECT COUNT(*) as count FROM news`).get().count;
    if (count > 0) return;

    DUMMY_NEWS.forEach(news => {
      db.prepare(`
        INSERT INTO news (id, slug, title, image, content, date) values (?, ?, ?, ?, ?, ?)
        `).run(
          news.id,
          news.slug,
          news.title,
          news.image,
          news.content,
          news.date
        );
    })
};

if (!isProd) {
    initDB();
}


// Get all news
export function getAllNews() {
    return db.prepare(`SELECT * FROM news`).all();
}

// Get 3 latest articles
export function getLatestNews() {
    return db.prepare(`SELECT * FROM news ORDER BY date DESC LIMIT 3`).all();;
  }
  
// Get available years
export function getAvailableNewsYears() {
  return db.prepare(`SELECT DISTINCT strftime('%Y', date) as year FROM news ORDER BY date ASC`).all().map(r => r.year);;
}

// Get months for a year
export function getAvailableNewsMonths(year) {
    return db.prepare(`SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ? ORDER BY date ASC`).all(year).map(r => r.month);;
}

// Get news for a year
export function getNewsForYear(year) {
    return db.prepare(`SELECT * FROM news WHERE strftime('%Y', date) = ?`).all(year);;
}

// Get news by year and month
export function getNewsForYearAndMonth(year, month) {
    return db.prepare(`SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?`).all(year, month);;
}

// Get article by slug
export function getNewsBySlug(slug) {
    return db.prepare(`SELECT * FROM news WHERE slug = ?`).get(slug);
}

// Get image by slug
export function getNewsImageBySlug(slug) {
    return db.prepare(`SELECT image FROM news WHERE slug = ?`).get(slug);
}
