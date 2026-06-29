import NewsList from "../news-list";

// Fetch news from API
const NewsListWrapper = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/news`);
    if (!response.ok) {
        throw new Error("Failed to fetch news");
    }
    const { data: news } = await response.json();
    return <NewsList news={news} />;
};

export default NewsListWrapper;
