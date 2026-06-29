import NewsList from '@/app/components/news-list';
import { getLatestNews } from '@/lib/news';

// Latest 3 articles
const page = () => {
  const news = getLatestNews();
  return (
    <div className="border-t-2 border-[#bcbcb7] pb-5 mt-6">
      <h1 className="text-3xl font-bold mt-6 mb-6">Latest News</h1>
      <NewsList news={news} />
    </div>
  )
}

export default page
