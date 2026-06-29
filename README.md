# NextNews — Modern News Aggregation Platform

NextNews is a production-grade, server-rendered news aggregation platform built with **Next.js 16** and **React 19**. It delivers the latest headlines through a clean, accessible dark-themed interface with article browsing, interactive image modals, and a date-filtered archive system — all powered by a built-in **SQLite** database and a RESTful API layer.

---

## 🌐 Live Preview

> **👀 Watch Live Demo:** [https://next-news-nextjs-web-app.vercel.app](https://next-news-nextjs-web-app.vercel.app)

---


## 👀 Website Preview:
<a href="https://next-news-nextjs-web-app.vercel.app" title="demo">
  <img src="https://github.com/user-attachments/assets/e57a4fd2-31db-496e-a2dc-ebda6268581d" alt="website preview - Demo - UI Mockup" width="400">
</a>

---

## 💻 Used Technologies

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack React framework providing server-side rendering, file-based routing, parallel routes, intercepting routes, and API route handlers for a performant SEO-friendly SPA. |
| **React 19** | Component-based UI library for building interactive, reactive user interfaces with server components and client components. |
| **TypeScript** | Strongly-typed superset of JavaScript that improves code quality, maintainability, and developer experience through static type checking. |
| **Tailwind CSS v4** | Utility-first CSS framework used for rapid, consistent styling directly in markup with a custom dark theme and responsive design. |
| **better-sqlite3** | Synchronous SQLite3 driver for Node.js used as the embedded database engine for storing and querying news articles without external dependencies. |
| **ESLint** | Static code analysis tool enforcing consistent code style and catching potential bugs early in development. |

### Hosting

| Layer | Provider |
|---|---|
| **Frontend** | Vercel (Next.js-native deployment) |
| **Backend (API)** | Vercel (serverless functions via Next.js API routes) |
| **Database** | Embedded SQLite (local `news.db` file, bundled with the app) |

---

## ✨ Key Features

| Feature | Description |
|---|---|
| **Server-Rendered News Feed** | All pages are server-rendered using Next.js App Router, ensuring fast initial load times and excellent SEO. |
| **Article Detail Pages** | Dedicated dynamic routes for each news article with full content, metadata, and Open Graph tags for social sharing. |
| **Image Modal (Parallel Route)** | Click any article image to open it in an interactive modal overlay using Next.js intercepting routes — preserves the article context beneath. |
| **Date-Filtered Archive** | Browse news by year and month through a dynamic archive system with parallel route slots showing the latest articles alongside. |
| **Responsive Mobile Navigation** | Collapsible hamburger menu with smooth slide-in animation and overlay backdrop for mobile devices. |
| **Embedded SQLite Database** | Zero-configuration database that auto-seeds with sample data on first run — no external database setup required. |
| **RESTful API Layer** | Built-in `/api/news` endpoints returning JSON for programmatic access to articles. |
| **Comprehensive SEO** | Full metadata strategy including Open Graph, Twitter Cards, JSON-LD structured data (WebSite + NewsArticle schemas), auto-generated sitemap, and robots.txt. |
| **Dark Theme UI** | Cohesive dark color scheme (`#181817` background) with serif/ sans-serif typography using Inter and Merriweather fonts. |
| **Loading & Error Boundaries** | Suspense-powered loading states, custom error pages, and not-found handling for every route segment. |
| **Health-Check Endpoint** | Root API route (`/api`) for monitoring and health verification. |

---

## Best Practices and Standards

### Performance Optimization
- **Server-Side Rendering (SSR)** — Pages are rendered on the server, reducing client-side JavaScript and improving Time to First Paint (TTFP).
- **Next.js Image Optimization** — Native `next/image` component with automatic lazy loading, responsive srcset, and WebP format negotiation.
- **Turbopack** — Lightning-fast development builds and optimized production bundles using Rust-based bundler.
- **Font Optimization** — Google Fonts (Inter + Merriweather) loaded via `next/font` with automatic `font-display: swap` and subsetting.

### Security
- **Automatic CSRF Protection** — Next.js server actions and API routes are protected against cross-site request forgery.
- **No Secret Exposure** — No API keys or secrets committed to the repository.
- **Read-Only Database in Production** — SQLite database opened in read-only mode when `NODE_ENV=production`.
- **XSS Prevention** — React's built-in JSX escaping prevents cross-site scripting attacks.

### Accessibility
- **Semantic HTML** — Proper use of `<article>`, `<header>`, `<nav>`, `<main>`, `<time>`, `<dialog>` elements.
- **Keyboard Navigation** — Modal dialogs and navigation menus support keyboard interaction.
- **Focus Management** — Modal open/close manages focus correctly to prevent trapping.
- **Screen Reader Support** — Meaningful `alt` text on all images and `aria-label` attributes where needed.
- **Responsive Design** — Fully responsive layout with mobile-first breakpoints, collapsible navigation, and touch-friendly targets.

### User Experience
- **Suspense Loading States** — Granular loading spinners for data-fetching segments prevent layout shift.
- **Error Boundaries** — Custom error pages at route-group level provide graceful failure recovery.
- **Not-Found Pages** — Dedicated 404 pages for missing articles and invalid archive filters.
- **Optimistic UI Patterns** — Intercepting routes allow image modals without losing scroll position or article context.

### SEO
- **Structured Data (JSON-LD)** — `WebSite` schema with `SearchAction` on the root layout, `NewsArticle` schema per article with full metadata (headline, image, datePublished, author, publisher).
- **Open Graph & Twitter Cards** — Comprehensive OG tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`) and Twitter `summary_large_image` cards.
- **Semantic URL Structure** — Clean, human-readable URLs (`/news/will-ai-replace-humans`) with canonical tags.
- **Auto-Generated Sitemap** — Dynamic `sitemap.xml` with all static and dynamic routes, proper priorities, and change frequencies.
- **Robots Configuration** — `robots.txt` allows all crawlers except `/api/`, with sitemap reference.
- **Metadata Composition** — Template-based title composition (`%s | Next News`) ensures consistent branding across all pages.

### OOP & SOLID Principles
- **Single Responsibility** — Each component and module has one clearly defined purpose (e.g., `NewsList` only renders the grid, `ImageDialog` only manages the modal).
- **Separation of Concerns** — Data access (`lib/news.js`), UI components (`components/`), API routes (`api/`), and page layouts (`app/`) are cleanly separated.
- **Dependency Inversion** — High-level page components depend on abstractions (API endpoints) rather than concrete data sources.
- **Interface Segregation** — TypeScript interfaces (`LayoutProps`, `NewsDetailPageProps`, `ArchiveFilterPageProps`) define precisely the props each component needs.

### Design Patterns
- **Route Group Pattern** — `(main)` group encapsulates shared layout logic (header) without affecting URL structure.
- **Parallel Routes** — `@modal`, `@archive`, `@latest` slots render independent UI sections that can error or load separately.
- **Intercepting Routes** — `(.)image` pattern intercepts navigation to `/news/[slug]/image` to render an inline modal instead of navigating away.
- **Repository Pattern** — `lib/news.js` acts as a data repository abstracting SQLite queries behind clean function names.
- **Factory Function** — `initDB()` factory handles conditional database initialization and seeding.
- **Wrapper Component** — `NewsListWrapper` abstracts data fetching from presentation, enabling Suspense integration.

---

## 📥 Installation Instructions for Local Setup

### Prerequisites

- **Node.js** v18+ (recommended: v20 LTS)
- **npm** v9+ (ships with Node.js)
- **Git** (for cloning the repository)

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd next-news
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step 4: Run the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

On first run, the SQLite database (`news.db`) is automatically created and seeded with sample articles.

### Step 5: Build for Production

```bash
npm run build
npm start
```

---

## Project Structure

```
next-news/
├── app/                              # Next.js App Router pages & layouts
│   ├── (main)/                       # Route group — shared header layout
│   │   ├── archive/
│   │   │   ├── @archive/             # Parallel route: filterable archive content
│   │   │   │   └── [[...filter]]/    # Catch-all optional year/month filter
│   │   │   │       ├── page.tsx      # Archive filter logic & rendering
│   │   │   │       └── error.tsx     # Archive-specific error boundary
│   │   │   ├── @latest/              # Parallel route: latest 3 articles
│   │   │   │   └── default.tsx       # Latest news fallback
│   │   │   ├── default.tsx           # Archive default when no filter selected
│   │   │   └── layout.tsx            # Archive page layout + metadata
│   │   ├── news/
│   │   │   ├── [slug]/               # Dynamic article detail route
│   │   │   │   ├── (.)image/         # Intercepting route — inline image modal
│   │   │   │   │   └── page.tsx      # Modal dialog component
│   │   │   │   ├── image/
│   │   │   │   │   └── page.tsx      # Full-page image (fallback when accessed directly)
│   │   │   │   ├── default.tsx       # Modal slot default when not active
│   │   │   │   ├── layout.tsx        # Dynamic metadata + JSON-LD + modal slot
│   │   │   │   ├── not-found.tsx     # 404 for missing articles
│   │   │   │   └── page.tsx          # Article detail page
│   │   │   ├── layout.tsx            # News listing page metadata
│   │   │   ├── page.tsx              # News listing page
│   │   │   └── error.tsx             # News-specific error boundary
│   │   └── layout.tsx                # Shared content layout with MainHeader
│   ├── api/
│   │   ├── news/
│   │   │   ├── [slug]/route.tsx      # GET /api/news/:slug — single article
│   │   │   └── route.tsx             # GET /api/news — all articles
│   │   └── route.tsx                 # GET /api — health check
│   ├── assets/
│   │   ├── dummy-news.ts             # Sample news data for database seeding
│   │   └── logo.jpg                  # Application logo
│   ├── components/
│   │   ├── Buttons/
│   │   │   └── main-link.tsx         # Reusable styled link button
│   │   ├── Icons/
│   │   │   ├── left-arrow-icon.tsx   # Left arrow SVG icon
│   │   │   └── reload-icon.tsx       # Reload SVG icon
│   │   ├── Loading/
│   │   │   └── Loading.tsx           # Generic loading spinner component
│   │   ├── Loader/
│   │   │   ├── main-loader.tsx       # Main page loader component
│   │   │   └── main-loader.module.css
│   │   ├── MainHeader/
│   │   │   ├── main-header.tsx       # Site header with logo & navigation
│   │   │   ├── nav-link.tsx          # Active-aware navigation link
│   │   │   └── navLinks.tsx          # Responsive nav with hamburger menu
│   │   ├── NewsListWrapper/
│   │   │   └── news-list-wrapper.tsx # Data-fetching wrapper for news list
│   │   ├── ImageDialog.tsx           # Modal image dialog overlay
│   │   ├── news-list.tsx             # News article grid component
│   │   └── overlay.tsx               # Backdrop overlay for mobile menu
│   ├── error.tsx                     # Root error boundary
│   ├── globals.css                   # Global styles + Tailwind directives
│   ├── layout.tsx                    # Root layout — fonts, metadata, JSON-LD
│   ├── loading.tsx                   # Root loading state
│   ├── not-found.tsx                 # Root 404 page
│   ├── page.tsx                      # Homepage
│   ├── manifest.ts                   # PWA manifest generator
│   ├── robots.ts                     # robots.txt generator
│   ├── sitemap.ts                    # Dynamic sitemap.xml generator
│   └── types.ts                      # Shared TypeScript interfaces
├── lib/
│   └── news.js                       # SQLite database layer (CRUD operations)
├── public/
│   ├── images/
│   │   └── news/                     # Article images (ai-robot.jpg, beaver.jpg, etc.)
│   ├── file.svg                      # Default file icon
│   ├── globe.svg                     # Default globe icon
│   ├── logo.jpg                      # Site favicon / OG image
│   ├── next.svg                      # Next.js logo
│   ├── vercel.svg                    # Vercel logo
│   └── window.svg                    # Default window icon
├── next.config.ts                    # Next.js configuration
├── tsconfig.json                     # TypeScript configuration
├── postcss.config.mjs                # PostCSS + Tailwind configuration
├── eslint.config.mjs                 # ESLint flat config
├── package.json                      # Project metadata & dependencies
└── README.md                         # Project documentation
```

---

## Database Structure

The application uses an embedded **SQLite** database stored locally as `news.db`.

### Table: `news`

| Column    | Type         | Constraints              | Description                     |
|-----------|--------------|--------------------------|---------------------------------|
| `id`      | VARCHAR(255) | PRIMARY KEY              | Unique article identifier       |
| `slug`    | TEXT         | UNIQUE, NOT NULL         | URL-friendly unique slug        |
| `title`   | TEXT         | NOT NULL                 | Article headline                |
| `image`   | TEXT         | NOT NULL                 | Filename of the article image   |
| `date`    | TEXT         | DEFAULT CURRENT_DATE     | Publication date (ISO format)   |
| `content` | TEXT         | NOT NULL                 | Full article body               |

### Auto-Seeding

On first run in non-production environments, the database is automatically created and populated with sample articles from `app/assets/dummy-news.ts`.

### Key Queries (via `lib/news.js`)

| Function                          | SQL Query                                              | Returns               |
|-----------------------------------|--------------------------------------------------------|-----------------------|
| `getAllNews()`                    | `SELECT * FROM news`                                   | All articles          |
| `getLatestNews()`                 | `SELECT * FROM news ORDER BY date DESC LIMIT 3`        | 3 most recent         |
| `getNewsBySlug(slug)`             | `SELECT * FROM news WHERE slug = ?`                    | Single article        |
| `getNewsForYear(year)`            | `SELECT * FROM news WHERE strftime('%Y', date) = ?`    | Articles by year      |
| `getNewsForYearAndMonth(y, m)`    | `SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ?` | Articles by year+month |
| `getAvailableNewsYears()`         | `SELECT DISTINCT strftime('%Y', date) FROM news`       | Available years       |
| `getAvailableNewsMonths(year)`    | `SELECT DISTINCT strftime('%m', date) FROM news WHERE strftime('%Y', date) = ?` | Months in a year      |
| `getNewsImageBySlug(slug)`        | `SELECT image FROM news WHERE slug = ?`                | Image filename        |

---

## API Docs

Base URL: `http://localhost:3000/api` (development) or `https://next-news-nextjs-web-app.vercel.app/api` (production)

### `GET /api`

Health check endpoint.

**Response:**
```
Hello from the API route!
```

---

### `GET /api/news`

Returns all news articles.

**Response:**
```json
{
  "data": [
    {
      "id": "n1",
      "slug": "will-ai-replace-humans",
      "title": "Will AI Replace Humans?",
      "image": "ai-robot.jpg",
      "date": "2021-07-01",
      "content": "Since late 2022 AI is on the rise..."
    }
  ]
}
```

---

### `GET /api/news/:slug`

Returns a single news article by its slug.

**Success Response (200):**
```json
{
  "data": {
    "id": "n1",
    "slug": "will-ai-replace-humans",
    "title": "Will AI Replace Humans?",
    "image": "ai-robot.jpg",
    "date": "2021-07-01",
    "content": "Since late 2022 AI is on the rise..."
  }
}
```

**Not Found Response (404):**
```json
{
  "message": "News with slug \"non-existent-slug\" not found"
}
```

---

## 📬 Contact
- 🧑‍💻 **Portfolio:** <a href="https://ahmedmaher-portfolio.vercel.app/" title="See My Portfolio">https://ahmedmaher-portfolio.vercel.app/</a>
- 🔗 **LinkedIn:** <a href="https://www.linkedin.com/in/ahmed-maher-algohary" title="Contact via LinkedIn">https://www.linkedin.com/in/ahmed-maher-algohary</a>
- 📧 **Email:** <a href="mailto:ahmedmaher.dev1@gmail.com" title="Contact via Email">ahmedmaher.dev1@gmail.com</a>

---

## 📊 Additional Documentation

- **[UML Diagrams](UML_DIAGRAMS.md)** — Class diagrams, component diagrams, and sequence diagrams illustrating the system architecture.
- **[Program Flow](PROGRAM_FLOW.md)** — Detailed walkthrough of request lifecycle, navigation flows, and data flow from database to UI.

---

## ⭐ Support

If you find this project useful or inspiring, please consider giving it a ⭐ on GitHub. Your support is greatly appreciated and helps the project grow!

[![GitHub stars](https://img.shields.io/github/stars/Ahmed-Maher77/next-news__nextjs-web-application?style=social)](https://github.com/your-username/next-news)
