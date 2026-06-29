import { DUMMY_NEWS } from "@/app/assets/dummy-news";
import { notFound } from "next/navigation";
import { NewsDetailPageProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

// Fallback for news detail slot
const NewsDetailDefault = async ({ params }: NewsDetailPageProps) => {
    const { slug } = await params;
    const newsData = DUMMY_NEWS.find((news) => news.slug === slug);

    if (!newsData) {
        notFound();
    }

    return (
        <article className="news-article">
            <header>
                <div className="relative h-45 w-45 max-w-full mb-4">
                    <Link href={`/news/${newsData?.slug}/image`}>
                        <Image
                            src={`/images/news/${newsData?.image}`}
                            alt={newsData?.title ?? "News image"}
                            fill
                            className="object-cover"
                        />
                    </Link>
                </div>
                <h1>{newsData?.title}</h1>
                <time dateTime={newsData?.date}>{newsData?.date}</time>
            </header>
            <p>{newsData?.content}</p>
        </article>
    );
};

export default NewsDetailDefault;
