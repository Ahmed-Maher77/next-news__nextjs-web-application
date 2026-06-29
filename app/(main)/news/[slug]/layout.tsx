import { DUMMY_NEWS } from "@/app/assets/dummy-news";
import { LayoutProps } from "@/app/types";

const SITE_URL = "https://next-news-nextjs-web-app.vercel.app";

// Dynamic SEO metadata
export const generateMetadata = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const { slug } = await params;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);

    if (!newsItem) {
        return {
            title: "Article Not Found",
        };
    }

    const imageUrl = `${SITE_URL}/images/news/${newsItem.image}`;

    return {
        title: newsItem.title,
        description: newsItem.content.slice(0, 160),
        keywords: [
            "news",
            newsItem.title,
            "article",
            "breaking news",
            "latest news",
        ],
        openGraph: {
            title: newsItem.title,
            description: newsItem.content.slice(0, 160),
            type: "article",
            publishedTime: newsItem.date,
            authors: ["Ahmed"],
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: newsItem.title,
                },
            ],
            url: `${SITE_URL}/news/${slug}`,
        },
        twitter: {
            card: "summary_large_image",
            title: newsItem.title,
            description: newsItem.content.slice(0, 160),
            images: [imageUrl],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
};

// Children + modal slot
export default async function NewsDetailLayout({
    children,
    modal,
    params,
}: LayoutProps & { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);

    if (!newsItem) {
        return (
            <>
                {children}
                {modal}
            </>
        );
    }

    const imageUrl = `${SITE_URL}/images/news/${newsItem.image}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: newsItem.title,
        image: [imageUrl],
        datePublished: newsItem.date,
        dateModified: newsItem.date,
        author: {
            "@type": "Person",
            name: "Ahmed",
        },
        publisher: {
            "@type": "Organization",
            name: "Next News",
            logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo.jpg`,
            },
        },
        description: newsItem.content.slice(0, 200),
        articleBody: newsItem.content,
        url: `${SITE_URL}/news/${slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${SITE_URL}/news/${slug}`,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
            {modal}
        </>
    );
}
