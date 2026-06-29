import { LayoutProps } from "@/app/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Latest News",
    description:
        "Browse all the latest news articles. Stay informed with concise, unbiased reporting on current events and trending topics.",
    keywords: ["news", "latest news", "articles", "current events", "trending"],
    openGraph: {
        title: "Latest News | Next News",
        description:
            "Browse all the latest news articles. Stay informed with concise, unbiased reporting.",
        url: "https://next-news-nextjs-web-app.vercel.app/news",
    },
};

// News layout
const layout = ({ children }: LayoutProps) => {
    return <>{children}</>;
};

export default layout;
