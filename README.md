# Next News

**Web App Name:** Next News

**Description:** Next News is a modern, server-rendered news application built with Next.js 16. It delivers the latest news in a concise, unbiased manner through a clean, accessible interface. The app features article browsing, detailed views, image modals, and a date-filtered archive system.

## Key Features

- **News Listing** – Browse all news articles in a responsive grid layout with cover images and titles.
- **Article Detail Pages** – View full article content, title, date, and a clickable image that opens in full-screen.
- **Image Modal (Intercepting Routes)** – Click an article image to open it in a route-intercepted modal overlay without leaving the article page. Modal disables background scrolling and closes via backdrop click, close button, or browser back.
- **Full-Screen Image Page (Parallel Route)** – Navigate directly to `/news/[slug]/image` for a dedicated full-screen image view, accessible without the modal context.
- **Date-Filtered Archive** – Browse news by year and month using dynamic URL segments (`/archive/2024`, `/archive/2024/03`) with filter validation and fallback UI.
- **Latest News Section** – The archive page displays the 3 most recent articles alongside the filterable archive.
- **Navigation with Active Link Highlighting** – Persistent header nav with Home, News, and Archive links; active route is visually indicated.
- **Responsive Mobile Navigation** – Hamburger menu with sliding panel and overlay backdrop for mobile screens.
- **Error Boundaries** – Dedicated error UI with retry and navigation options at global (`app/error.tsx`), news (`app/(main)/news/error.tsx`), and archive filter levels.
- **Custom 404 Pages** – User-friendly not-found pages for global, news detail, and archive routes with guidance and navigation links.
- **Loading States** – Skeleton/spinner-like loading components with animated dots feedback for Suspense boundaries.
- **RESTful API** – JSON API endpoints (`/api/news`, `/api/news/[slug]`) returning all news or a single article by slug.
- **SQLite Database** – Auto-initialized local database with seeded dummy news data on first run.
- **Middleware Proxy** – Request logging middleware targeting API routes (`/api/:path*`).

## Operations the App Can Do

| Operation | Description |
|-----------|-------------|
| Browse News | View a grid of all news articles with images and titles |
| Read Article | Click any article to see its full content and metadata |
| View Image in Modal | Click article image to open an intercepting route modal |
| View Full-Screen Image | Navigate to dedicated image-only page |
| Filter Archive by Year | Select a year to see all articles from that year |
| Filter Archive by Year+Month | Drill down to articles from a specific month |
| Reset Archive Filters | Navigate back to the root archive to clear filters |

## Used Technologies

| Technology | Purpose |
|------------|---------|
| **Next.js 16** (App Router) | Full-stack React framework providing file-based routing, server components, SSR, API routes, and intercepting/parallel route patterns (Figma: built on the same component-based, state-driven design model). |
| **React 19** | UI component library for building interactive, reusable interface elements. |
| **TypeScript** | Static type-checking for safer, more maintainable code. |
| **Tailwind CSS v4** | Utility-first CSS framework for rapid, responsive styling with zero-runtime CSS-in-JS. |
| **better-sqlite3** | Synchronous SQLite3 driver for fast, local-persistent data storage. |
| **PostCSS** | CSS transformation tool used as the pipeline for Tailwind processing. |
| **ESLint** (with `eslint-config-next`) | Linting configured with Next.js core-web-vitals and TypeScript rules for code quality. |
| **next/font** | Automatic font optimization for Inter (sans-serif headings) and Merriweather (serif body). |

## Installation Instructions for Local Setup

### Prerequisites
- Node.js (v20 or later recommended)
- npm (v10+) or yarn/pnpm

### Steps

```bash
# 1. Navigate to the project root
cd next-news

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
next-news/
├── app/                          # Next.js App Router (pages, layouts, API)
│   ├── (main)/                   # Route group (shared layout with header)
│   │   ├── archive/              # Archive feature
│   │   │   ├── @archive/         # Parallel route: filterable archive content
│   │   │   │   └── [[...filter]]/ # Catch-all segment for year/month
│   │   │   ├── @latest/          # Parallel route: latest news section
│   │   │   ├── default.tsx       # Fallback when parallel route not matched
│   │   │   └── layout.tsx        # Archive page layout with named slots
│   │   ├── news/                 # News feature
│   │   │   ├── [slug]/           # Dynamic route for a single article
│   │   │   │   ├── @modal/       # Parallel route: image modal
│   │   │   │   │   └── (.)image/ # Intercepting route: modal image view
│   │   │   │   ├── image/        # Direct full-screen image page
│   │   │   │   ├── default.tsx   # Fallback for modal slot
│   │   │   │   ├── layout.tsx    # News detail layout (renders children + modal)
│   │   │   │   ├── not-found.tsx # Custom 404 for missing articles
│   │   │   │   └── page.tsx      # Article detail page (fetches from API)
│   │   │   ├── error.tsx         # Error boundary for news pages
│   │   │   ├── layout.tsx        # News section layout with metadata
│   │   │   └── page.tsx          # News listing page (Suspense + wrapper)
│   │   └── layout.tsx            # Main layout with header
│   ├── api/                      # API routes
│   │   ├── news/
│   │   │   ├── [slug]/route.tsx  # GET /api/news/[slug] – single article
│   │   │   └── route.tsx         # GET /api/news – all articles
│   │   └── route.tsx             # GET /api – placeholder hello route
│   ├── assets/                   # Static assets
│   │   ├── dummy-news.ts         # Seed data for SQLite
│   │   └── logo.jpg              # App logo
│   ├── components/               # Reusable UI components
│   │   ├── Buttons/main-link.tsx  # Styled navigation link
│   │   ├── Icons/                # SVG icons (left-arrow, reload)
│   │   ├── ImageDialog.tsx       # Modal dialog for article image
│   │   ├── Loading/Loading.tsx   # Animated dots loading indicator
│   │   ├── MainHeader/           # Header with logo, nav links, mobile menu
│   │   ├── NewsListWrapper/      # Async wrapper fetching news from API
│   │   ├── news-list.tsx         # News grid list component
│   │   └── overlay.tsx           # Mobile menu backdrop overlay
│   ├── error.tsx                 # Global error boundary
│   ├── globals.css               # Tailwind imports + custom global styles
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── not-found.tsx             # Global 404 page
│   ├── page.tsx                  # Home/landing page
│   └── types.ts                  # Shared TypeScript interfaces
├── lib/
│   └── news.js                   # SQLite database helpers (CRUD operations)
├── public/
│   ├── images/news/              # News article images (5 dummy images)
│   └── ...                       # Default Next.js static assets
├── proxy.tsx                     # Middleware: logs incoming API requests
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
├── postcss.config.mjs            # PostCSS configuration (Tailwind plugin)
├── eslint.config.mjs             # ESLint configuration
└── package.json                  # Dependencies and scripts
```

## Database Structure

**Engine:** SQLite (via `better-sqlite3`)  
**File:** `news.db` (auto-created on first run)

### Table: `news`

| Column    | Type         | Constraints              | Description                    |
|-----------|--------------|--------------------------|--------------------------------|
| `id`      | VARCHAR(255) | PRIMARY KEY              | Unique article identifier      |
| `slug`    | TEXT         | UNIQUE, NOT NULL         | URL-friendly identifier        |
| `title`   | TEXT         | NOT NULL                 | Article headline               |
| `image`   | TEXT         | NOT NULL                 | Image filename                 |
| `date`    | TEXT         | DEFAULT CURRENT_DATE     | Publication date (ISO format)  |
| `content` | TEXT         | NOT NULL                 | Full article body              |

**Seeding:** On initial load, 5 dummy articles are inserted from `app/assets/dummy-news.ts`.

## API Docs

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### `GET /api/news`

Returns all news articles.

**Response `200`:**

```json
{
  "data": [
    {
      "id": "n1",
      "slug": "will-ai-replace-humans",
      "title": "Will AI Replace Humans?",
      "image": "ai-robot.jpg",
      "date": "2021-07-01",
      "content": "Since late 2022..."
    }
  ]
}
```

#### `GET /api/news/:slug`

Returns a single news article by slug.

**Path Parameters:** `slug` (string) – The URL slug of the article.

**Response `200`:**

```json
{
  "data": {
    "id": "n1",
    "slug": "will-ai-replace-humans",
    "title": "Will AI Replace Humans?",
    "image": "ai-robot.jpg",
    "date": "2021-07-01",
    "content": "Since late 2022..."
  }
}
```

**Response `404`:**

```json
{
  "message": "News with slug \"invalid-slug\" not found"
}
```

## Best Practices and Standards Followed

### Performance Optimization
- **Server Components** – All data fetching and rendering happens server-side, reducing client JS bundle size.
- **React Suspense** – Wrapped news list in Suspense boundary with a loading fallback for streaming SSR.
- **CSS Grid** – Used `grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr))` for responsive layouts without JS.
- **next/image** – Automatic image optimization, lazy loading, and responsive sizing via the built-in Image component.
- **next/font** – Automatic font subsetting and layout shift prevention for Google Fonts.
- **Efficient CSS** – Single `globals.css` with Tailwind utility classes, no runtime CSS-in-JS overhead.
- **Minimal Dependencies** – Only 4 runtime dependencies (next, react, react-dom, better-sqlite3).

### SEO
- **Semantic HTML** – Uses `<article>`, `<header>`, `<nav>`, `<time>`, `<h1>` elements.
- **Dynamic Metadata** – `generateMetadata` on news detail page creates unique titles/descriptions per article.
- **Metadata Template** – Root layout uses `title.template: "%s | Next News"` for consistent page titles.
- **Descriptive Meta** – Title and description metadata on every layout.
- **Semantic Image Alt Text** – All `<Image>` components include descriptive `alt` attributes.
- **Proper Link Elements** – Semantic `<Link>` components for navigation with meaningful text.

### Accessibility
- **Semantic Landmarks** – Navigation (`<nav>`), main content (`<main>` via layout), articles (`<article>`).
- **Focus Management** – Modal disables background scroll to prevent focus trap issues.
- **Responsive Text** – Uses `text-sm sm:text-base` patterns for mobile-first typography.
- **Color Contrast** – Light-on-dark theme (`#e5e5e1` on `#181817`) with high contrast.
- **Interactive States** – Hover and focus styles on all interactive elements with `transition` animations.
- **Suppress Hydration Warning** – `suppressHydrationWarning` on `<body>` to avoid console noise.
- **Meaningful Loading Text** – `"Loading News"` with animated dots for screen reader context.

### UX (Usability Heuristics)

- **Error Recovery (Visibility of System Status)** – Global error boundary with retry button and navigation home. News-specific error with retry. Archive filter error with guidance.
- **Help Users Recognize, Diagnose, and Recover from Errors** – Custom 404 pages with clear messages:
  - Global: *"Please check the URL or go back to Home Page"*
  - News detail: *"The News you are searching for doesn't exist..."*
  - Archive: *"There are no News available for the selected year..."* with suggestion: *"Please select a different year."*
- **User Control and Freedom** – Modal closes via close button, backdrop click, or browser back button.
- **Consistency and Standards** – Consistent link styling, button patterns, and layout structure across pages.
- **Validation and Guidance** – Archive filter validates year/month existence and shows fallback messages like *"Invalid month selected, please try again."*, *"No news found for the specified year."*
- **Clear Navigation** – Persistent header with active link highlighting; mobile hamburger menu with overlay.
- **Fallback Messages** – `notFound()` redirects to custom 404s; archive filter shows fallback text when no year/month selected.
- **Shareable URLs** – Archive uses URL-based filter state (`/archive/2024/03`) enabling bookmarking and sharing.

### Code Quality & Architecture (OOP / SOLID)

- **Single Responsibility** – Each component/file has one clear purpose (e.g., `news-list.tsx` only renders the list, `Loading.tsx` only displays loading state, `ImageDialog.tsx` only handles the image modal).
- **Separation of Concerns** – Database logic in `lib/news.js`, API routes in `app/api/`, UI components in `app/components/`, page layouts in route files.
- **Reusability** – Shared components: `MainLink`, `NewsList`, `Loading`, `LeftArrowIcon`, `ReloadIcon`, `Overlay`, `NavLink`.
- **TypeScript Interfaces** – All props typed via `app/types.ts` for compile-time safety.
- **Clean Data Flow** – Server components fetch data via API internally; intercepting routes use parallel route slots for clean separation of modal vs. page content.

### Additional Standards

| Area | Practice |
|------|----------|
| **Routing** | File-based App Router with route groups `(main)`, parallel routes `@modal`/`@archive`/`@latest`, intercepting routes `(.)image`, catch-all segments `[[...filter]]` |
| **CSS** | Tailwind v4 utility classes + PostCSS; mobile-first responsive design with `md:` breakpoints; CSS transitions for interactions; CSS Grid for layout |
| **State Management** | URL-driven state via search params and dynamic routes; local React state for mobile menu and loading dots |
| **Error Handling** | Nested error boundaries at global, page, and section levels with `error.tsx` files |
| **Data Persistence** | SQLite with `better-sqlite3` for zero-config local storage; auto-seeded on first run |
| **API Design** | RESTful JSON endpoints with consistent response structure `{ data, message }` and proper HTTP status codes |
| **Middleware** | Request logging middleware targeting API routes via `proxy.tsx` with `matcher` config |