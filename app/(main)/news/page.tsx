import Loading from "@/app/components/Loading/Loading";
import NewsListWrapper from "@/app/components/NewsListWrapper/news-list-wrapper";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

// News listing with Suspense
const NewsPage = () => {
    return (
        <div id="News-Page">
            <div className="container mx-auto px-6">
                <h1 className="text-3xl mb-4">News Page</h1>

                <Suspense fallback={<Loading text="Loading News" />}>
                    <NewsListWrapper />
                </Suspense>
            </div>
        </div>
    );
};

export default NewsPage;
