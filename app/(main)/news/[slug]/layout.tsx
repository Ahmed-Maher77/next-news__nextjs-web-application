import { DUMMY_NEWS } from "@/app/assets/dummy-news";
import { LayoutProps } from "@/app/types";

// Dynamic SEO metadata
export const generateMetadata = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const { slug } = await params;
    const newsItem = DUMMY_NEWS.find((news) => news.slug === slug);
    return {
        title: "NextNews - " + newsItem?.title,
        description: newsItem?.content,
    };
};

// Children + modal slot
export default function NewsDetailLayout({ children, modal }: LayoutProps) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}
