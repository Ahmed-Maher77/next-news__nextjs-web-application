import NewsList from "../news-list";

// Fetch news from API
const NewsListWrapper = async () => {
    const response = await fetch("http://localhost:3000/api/news");
    if (!response.ok) {
        throw new Error("Failed to fetch news");
    }
    const { data: news } = await response.json();
    return <NewsList news={news} />;
};

export default NewsListWrapper;
