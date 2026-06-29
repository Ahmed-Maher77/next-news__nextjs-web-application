# Program Flow — NextNews

> Detailed walkthrough of the request lifecycle, navigation flows, and data flow from database to UI.

---

## 1. Request Lifecycle Overview

```mermaid
graph TB
    Browser["Browser Request"] --> NextServer["Next.js Server"]

    NextServer --> Middleware["Middleware (proxy.tsx)<br/>Logs API requests"]
    NextServer --> AppRouter["App Router<br/>Matches route to filesystem"]

    AppRouter --> RootLayout["Root Layout (app/layout.tsx)"]
    RootLayout --> Fonts["Font loading (Inter + Merriweather)"]
    RootLayout --> Meta["Metadata generation"]
    RootLayout --> JsonLD["JSON-LD WebSite script injection"]

    AppRouter --> ContentLayout["Content Layout (app/(main)/layout.tsx)"]
    ContentLayout --> Header["MainHeader renders"]

    AppRouter --> PageLayout["Page Layout (route-specific)"]
    PageLayout --> GenMeta["generateMetadata() runs"]
    PageLayout --> DynamicJson["Dynamic JSON-LD (if applicable)"]

    AppRouter --> PageComponent["Page Component"]
    PageComponent --> ServerRender["Server Component renders"]
    PageComponent --> DataFetch["Data fetching (API or direct DB)"]
    PageComponent --> Suspense["Suspense boundaries wrap async data"]
    PageComponent --> HTMLStream["HTML streamed to client"]

    NextServer --> Response["Response"]
    Response --> FullHTML["Full HTML (server-rendered)"]
    Response --> Structured["JSON-LD structured data"]
    Response --> OGTags["OG / Twitter meta tags"]
    Response --> Hydration["Next.js client bundle (hydration)"]
```

---

## 2. Navigation Flows

### 2.1 Homepage → News Listing

```mermaid
graph TB
    UserClick["User clicks 'Read the latest news'"] --> NavNews["Navigates to /news"]

    NavNews --> Header["(main)/layout.tsx → MainHeader"]
    NavNews --> NewsLayout["news/layout.tsx → metadata"]
    NavNews --> NewsPage["news/page.tsx renders"]

    NewsPage --> Suspense["&lt;Suspense fallback=Loading&gt;"]
    Suspense --> Wrapper["NewsListWrapper (async server component)"]
    Wrapper --> Fetch["fetch(/api/news)"]
    Fetch --> APIRoute["api/news/route.tsx"]
    APIRoute --> GetAll["getAllNews()"]
    GetAll --> SQL["SQL: SELECT * FROM news"]
    SQL --> JSON["Returns JSON { data: […] }"]
    JSON --> Grid["Renders NewsList grid"]
    Grid --> Cards["Each item: Link + Image + title"]

    NewsPage --> Stream["Page streams to browser (Suspense resolves)"]
```

### 2.2 News Listing → Article Detail

```mermaid
graph TB
    Click["User clicks article card"] --> NavArticle["Navigates to /news/:slug"]

    NavArticle --> Header["(main)/layout.tsx → MainHeader"]

    NavArticle --> SlugLayout["[slug]/layout.tsx"]
    SlugLayout --> GenMeta["generateMetadata({ slug })"]
    GenMeta --> Find["Find DUMMY_NEWS by slug"]
    Find --> ReturnMeta["Return {title, description, OG, Twitter, robots}"]

    SlugLayout --> DetailLayout["NewsDetailLayout renders"]
    DetailLayout --> ArticleJson["&lt;script&gt; JSON-LD NewsArticle"]
    DetailLayout --> Children["{children} (article page)"]
    DetailLayout --> Modal["{modal} (parallel route slot)"]

    NavArticle --> ArticlePage["[slug]/page.tsx"]
    ArticlePage --> AwaitParams["await params (slug)"]
    ArticlePage --> FetchAPI["fetch(/api/news/{slug})"]
    FetchAPI --> SlugAPI["api/news/[slug]/route.tsx"]
    SlugAPI --> GetBySlug["getNewsBySlug(slug)"]
    GetBySlug --> SlugSQL["SQL: SELECT * WHERE slug = ?"]
    SlugSQL --> ReturnData["Returns { data: {…} } or 404"]

    ArticlePage --> Render["Renders:"]
    Render --> ArticleElem["article.news-article"]
    ArticleElem --> ImgLink["Link → /news/{slug}/image"]
    ImgLink --> ArticleImg["Image(fill)"]
    ArticleElem --> Title["h1 (title)"]
    ArticleElem --> Date["time (date)"]
    ArticleElem --> Content["p (content)"]
```

### 2.3 Article → Image Modal (Intercepted)

```mermaid
graph TB
    Click["User clicks article image"] --> Navigate["Navigates to /news/:slug/image"]

    Navigate --> InterceptedRoute["(.)image/page.tsx (INTERCEPTED)"]
    InterceptedRoute --> Explanation["Navigation from parent route → renders as modal overlay instead of full page"]

    InterceptedRoute --> ImageDialog["ImageDialog (client component)"]
    ImageDialog --> UseClient["'use client'"]
    ImageDialog --> ScrollLock["useEffect → body scroll lock"]
    ImageDialog --> RenderUI["Renders:"]
    RenderUI --> Backdrop["div (fixed backdrop)<br/>onClick = router.back()"]
    RenderUI --> Dialog["&lt;dialog open&gt;"]
    Dialog --> ModalTitle["h1 'Image Modal'"]
    Dialog --> CloseBtn["button (close)<br/>onClick = router.back()"]
    Dialog --> ModalImage["Image(fill)"]

    Note["Article page remains mounted in background"]

    Close --> Return["router.back() → /news/:slug<br/>Scroll position preserved"]
```

### 2.4 Direct URL Access (Non-Intercepted)

```mermaid
graph LR
    Direct["User accesses /news/:slug/image directly"] --> Check["Not from in-app navigation"]
    Check --> NotIntercepted["(.)image/page.tsx NOT triggered<br/>(interception only applies from parent route)"]
    Check --> DirectPage["image/page.tsx renders full-page image view"]
```

---

## 3. Archive Navigation Flow

### 3.1 No Filter Selected

```mermaid
graph TB
    Archive["GET /archive"] --> ArchiveLayout["archive/layout.tsx"]
    ArchiveLayout --> Title["h1 'News Archive'"]
    ArchiveLayout --> ArchiveSection["section.archive-filter"]
    ArchiveSection --> ArchivePage["@archive/[[...filter]]/page.tsx"]
    ArchivePage --> GetYears["getAvailableNewsYears()"]
    GetYears --> YearSQL["SQL: SELECT DISTINCT year"]
    YearSQL --> YearLinks["Render year links: [2021] [2022] [2024]"]
    YearLinks --> NoFilter["No filter → 'Please select…'"]

    ArchiveLayout --> LatestSection["section.latest-filter"]
    LatestSection --> LatestDefault["@latest/default.tsx"]
    LatestDefault --> GetLatest["getLatestNews()"]
    GetLatest --> LatestSQL["SQL: SELECT * ORDER BY date DESC LIMIT 3"]
    LatestSQL --> LatestList["Renders NewsList (3 articles)"]

    Note["Both parallel slots render independently"]
```

### 3.2 Year Filter Selected

```mermaid
graph TB
    ArchiveYear["GET /archive/2022"] --> Filter["filter = ['2022']"]
    Filter --> GetYear["getNewsForYear('2022')"]
    GetYear --> YearSQL["SQL: SELECT * WHERE year = 2022"]
    YearSQL --> YearArticles["Articles for 2022"]

    Filter --> GetMonths["getAvailableNewsMonths('2022')"]
    GetMonths --> MonthSQL["SQL: SELECT DISTINCT month WHERE year = 2022"]
    MonthSQL --> MonthLinks["Month links: [01] [05] [07]"]

    Filter --> Render["Renders:"]
    Render --> MonthNav["Month links navigation"]
    Render --> NewsGrid["NewsList with 2022 articles"]

    Filter --> Invalid["If year invalid → 'Invalid year selected'"]
```

### 3.3 Year + Month Filter Selected

```mermaid
graph TB
    ArchiveYM["GET /archive/2022/05"] --> Filter["filter = ['2022', '05']"]
    Filter --> Verify["Verify month exists in 2022 months"]
    Filter --> GetYM["getNewsForYearAndMonth('2022', '05')"]
    GetYM --> YMSQL["SQL: SELECT * WHERE year = 2022 AND month = 05"]
    YMSQL --> YMArticles["Filtered articles"]

    Filter --> Render["Renders:"]
    Render --> MonthNav["Month links (for 2022)"]
    Render --> NewsGrid["NewsList with filtered articles"]
    Render --> GoBack["'Go Back' link → /archive"]

    Filter --> InvalidMonth["If month invalid → 'Invalid month selected'"]
    Filter --> NotFound["If no news → 'No news found…'"]
```

---

## 4. Data Flow Diagram

```mermaid
graph TB
    subgraph DataSources[Data Sources]
        SeedData["DUMMY_NEWS (seed data)"] --> Repository["lib/news.js<br/>initDB() seeds on first run"]
        DB[(news.db<br/>SQLite file)] <--> Repository
    end

    Repository --> API["API Routes<br/>(GET /api/news, GET /api/news/:slug)"]
    Repository --> Sitemap["Sitemap Generator<br/>(app/sitemap.ts)"]
    Repository --> Pages["Pages<br/>(via fetch or direct call)"]

    API --> ServerComponents["Next.js Server Components"]
    Pages --> ServerComponents

    ServerComponents --> HTMLResponse["HTML Response (SSR)"]
```

---

## 5. Error Handling Flow

```mermaid
graph TB
    Error["Error occurs (any segment)"] --> CheckError["error.tsx exists at segment level?"]
    CheckError -->|Yes| ErrorUI["Renders custom error UI<br/>'Try again' button"]
    ErrorUI --> Reset["onClick = reset()<br/>Retries render"]

    Error --> CheckNotFound["not-found.tsx exists?<br/>(404 / missing data)"]
    CheckNotFound -->|Yes| NotFoundUI["Renders custom 404 UI"]

    Error --> NoBoundary["No error boundary exists"]
    NoBoundary --> BubbleUp["Bubbles up to parent error boundary"]
    BubbleUp --> RootError["Until root error.tsx"]
```
