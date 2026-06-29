import NewsList from "../news-list";

const getApiUrl = () => {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
};

// Fetch news from API
const NewsListWrapper = async () => {
    const response = await fetch(`${getApiUrl()}/news`);
    if (!response.ok) {
        throw new Error("Failed to fetch news");
    }
    const { data: news } = await response.json();
    return <NewsList news={news} />;
};

export default NewsListWrapper;
