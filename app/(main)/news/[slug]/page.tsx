import { NewsDetailPageProps } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

// Article detail page
const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
    const { slug } = await params;
    const res = await fetch(`http://localhost:3000/api/news/${slug}`);

    const body = await res.json();
    if (!res.ok) {
        return <div className="text-center text-red-500 min-h-[200px] flex items-center justify-center">{body?.message || "News not found"}</div>;
    }

    const { data: newsData, message } = body;

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

export default NewsDetailPage;
