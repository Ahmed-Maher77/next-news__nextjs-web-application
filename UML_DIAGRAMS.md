# UML Diagrams — NextNews

> These diagrams describe the system architecture, component hierarchy, and request lifecycles for the NextNews application.

---

## 1. Component Diagram

Shows the high-level software components and their dependencies.

```mermaid
graph TB
    subgraph NextNews[NextNews Application]
        AppRouter[App Router<br/>Pages & Layouts]
        API[API Routes<br/>/api/*]
        DB[(SQLite Database<br/>news.db)]

        AppRouter -->|fetch / direct call| API
        API -->|CRUD queries| DB

        subgraph UI[UI Layer]
            Layouts[App Directory Layouts]
            Components[React Components]
            Layouts --> Components
        end

        subgraph Data[Data Layer]
            Repository[lib/news.js<br/>Repository Pattern]
        end

        AppRouter --> Layouts
        Repository -->|reads/writes| DB
        API --> Repository
    end
```

---

## 2. Module Diagram

Illustrates the key modules, their interfaces, and relationships.

```mermaid
classDiagram
    class NewsRepository {
        +getAllNews() News[]
        +getLatestNews() News[]
        +getNewsBySlug(slug) News | null
        +getNewsForYear(year) News[]
        +getNewsForYearAndMonth(y, m) News[]
        +getAvailableNewsYears() string[]
        +getAvailableNewsMonths(y) string[]
        +getNewsImageBySlug(slug) string
    }

    class SQLiteDB {
        +news.db file
        +better-sqlite3 driver
        +readonly in production
    }

    class NewsListAPI {
        +GET(req) Response.json(data)
    }

    class NewsDetailAPI {
        +GET(req, params) Response.json(data)
    }

    class TypeInterfaces {
        +LayoutProps
        +NewsDetailPageProps
        +ArchiveLayoutProps
        +ArchiveFilterPageProps
        +NewsListProps
        +ErrorProps
        +MainLinkProps
    }

    class DummyNewsData {
        +DUMMY_NEWS: News[]
    }

    NewsRepository ..> SQLiteDB : queries
    NewsListAPI --> NewsRepository : getAllNews()
    NewsDetailAPI --> NewsRepository : getNewsBySlug()
    NewsRepository ..> DummyNewsData : seeds from
    TypeInterfaces ..> NewsListAPI : parameter types
    TypeInterfaces ..> NewsDetailAPI : parameter types
```

---

## 3. Route Hierarchy Diagram

Shows the Next.js App Router file-based route nesting and parallel/intercepting route relationships.

```mermaid
graph TB
    Root["/ (Root)"] --> RootLayout["app/layout.tsx<br/>Root Layout"]
    Root --> Home["app/page.tsx<br/>Homepage"]

    Root --> MainGroup["(main)/layout.tsx<br/>Content Layout + Header"]

    MainGroup --> NewsGroup["news/layout.tsx<br/>News Layout"]
    NewsGroup --> NewsList["news/page.tsx<br/>/news"]
    NewsGroup --> SlugGroup["[slug]/layout.tsx<br/>Article Layout"]

    SlugGroup --> Article["[slug]/page.tsx<br/>/news/:slug"]
    SlugGroup --> Intercepted["[slug]/(.)image/page.tsx<br/>Modal Overlay"]
    SlugGroup --> DirectImage["[slug]/image/page.tsx<br/>Full Page Image"]

    MainGroup --> ArchiveGroup["archive/layout.tsx<br/>Archive Layout"]
    ArchiveGroup --> ArchiveSlot["@archive/[[...filter]]/page.tsx<br/>Filter Content"]
    ArchiveGroup --> LatestSlot["@latest/default.tsx<br/>Latest 3 Articles"]

    style Intercepted fill:#2d5a27,stroke:#4caf50
    style ArchiveSlot fill:#5a4027,stroke:#ff9800
    style LatestSlot fill:#5a4027,stroke:#ff9800
```

### Parallel Routes

```mermaid
graph LR
    ArchiveLayout["archive/layout.tsx"] --> ArchiveSlot["@archive/[[...filter]]<br/>Filtered news by year/month"]
    ArchiveLayout --> LatestSlot["@latest/default.tsx<br/>Latest 3 articles"]
```

### Intercepting Route

```mermaid
graph TB
    Article["/news/:slug"] -->|"Click image"| Image["/news/:slug/image"]
    Image --> Intercepted["(.)image/page.tsx<br/>Renders as modal overlay"]
    Intercepted -->|"Direct URL access<br/>(not intercepted)"| Direct["image/page.tsx<br/>Full page image view"]
```

---

## 4. Sequence Diagram — Article Request Lifecycle

Shows the flow when a user navigates to a news article detail page.

```mermaid
sequenceDiagram
    participant User
    participant Server as Next.js Server
    participant Layout as [slug]/layout.tsx
    participant Page as [slug]/page.tsx
    participant API as API Route
    participant DB as SQLite

    User->>Server: GET /news/:slug
    Server->>Layout: Render layout
    Layout->>Layout: generateMetadata()
    Layout->>Layout: find newsItem by slug
    Layout-->>Server: Return {title, OG, Twitter, JSON-LD}

    Server->>Page: Render page
    Page->>API: fetch(/api/news/:slug)
    API->>DB: getNewsBySlug(slug)
    DB-->>API: News row
    API-->>Page: { data: newsItem }
    Page->>Page: Render article with Image, title, content, date

    Server-->>User: HTML (SSR)
```

---

## 5. Sequence Diagram — Archive Navigation Flow

Shows the flow when a user navigates through the archive filter.

```mermaid
sequenceDiagram
    participant User
    participant Server as Archive Page
    participant Repo as lib/news.js
    participant DB as SQLite

    User->>Server: GET /archive
    Server->>Repo: getAvailableNewsYears()
    Repo->>DB: SELECT DISTINCT year
    DB-->>Repo: ["2021","2022","2024"]
    Repo-->>Server: Available years
    Server-->>User: Render year links

    User->>Server: Click /archive/2022
    Server->>Repo: getNewsForYear("2022")
    Repo->>DB: SELECT * WHERE year = 2022
    DB-->>Repo: [beaver, landscape]
    Repo-->>Server: Articles for 2022
    Server->>Repo: getAvailableNewsMonths("2022")
    Repo->>DB: SELECT DISTINCT month WHERE year = 2022
    DB-->>Repo: ["01","05","07"]
    Repo-->>Server: Months in 2022
    Server-->>User: Render NewsList + month links

    User->>Server: Click /archive/2022/05
    Server->>Repo: getNewsForYearAndMonth("2022","05")
    Repo->>DB: SELECT * WHERE year=2022 AND month=05
    DB-->>Repo: [beaver]
    Repo-->>Server: Filtered article
    Server-->>User: Render filtered list
```

---

## 6. State Diagram — Page States

Shows the possible states for any page/route segment.

```mermaid
stateDiagram-v2
    [*] --> Loading : Navigate to route
    Loading --> Loaded : Data fetched
    Loaded --> Loading : Navigate away
    Loaded --> Error : Runtime error
    Error --> Loaded : reset() clicked
    Error --> NotFound : 404 / missing data
    NotFound --> Loading : Navigate to valid route
```

---

## 7. Component Tree

```mermaid
graph TB
    RootLayout["RootLayout"]
    ContentLayout["ContentLayout (main)"]

    RootLayout --> ContentLayout
    RootLayout --> JsonLD["&lt;script&gt; JSON-LD WebSite"]

    ContentLayout --> MainHeader
    MainHeader --> Logo["Logo Link(/)"]
    MainHeader --> NavLinks["NavLinks"]
    NavLinks --> NavHome["NavLink(/)"]
    NavLinks --> NavNews["NavLink(/news)"]
    NavLinks --> NavArchive["NavLink(/archive)"]

    ContentLayout --> HomePage["HomePage<br/>route: /"]

    ContentLayout --> NewsPage["NewsPage<br/>route: /news"]
    NewsPage --> Suspense["Suspense"]
    Suspense --> Loader["Loading"]
    Suspense --> NewsListWrapper["NewsListWrapper"]
    NewsListWrapper --> NewsList["NewsList"]
    NewsList --> NewsCard["Link → /news/:slug<br/>Image + title"]

    ContentLayout --> NewsDetail["NewsDetailPage<br/>route: /news/:slug"]
    NewsDetail --> ArticleScript["&lt;script&gt; JSON-LD NewsArticle"]
    NewsDetail --> Article["article.news-article"]
    Article --> ArticleLink["Link → /news/:slug/image"]
    ArticleLink --> ArticleImage["Image(fill)"]
    Article --> Title["h1 (title)"]
    Article --> Date["time (date)"]
    Article --> Content["p (content)"]

    ContentLayout --> ImageModal["ImageModal (intercepted)<br/>route: /news/:slug/(.)image"]
    ImageModal --> ImageDialog["ImageDialog (client)"]
    ImageDialog --> Backdrop["div (backdrop) → router.back()"]
    ImageDialog --> Dialog["dialog"]
    Dialog --> CloseBtn["button (close)"]
    Dialog --> ModalImage["Image(fill)"]

    ContentLayout --> ArchivePage["ArchivePage<br/>route: /archive"]
    ArchivePage --> ArchiveSlot["@archive slot"]
    ArchiveSlot --> ArchiveNav["nav (year/month links)"]
    ArchiveSlot --> ArchiveList["NewsList (filtered)"]
    ArchivePage --> LatestSlot["@latest slot"]
    LatestSlot --> LatestTitle["h2 'Latest News'"]
    LatestSlot --> LatestList["NewsList (3 latest)"]
```
