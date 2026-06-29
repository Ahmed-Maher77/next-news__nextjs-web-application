import LeftArrowIcon from '@/app/components/Icons/left-arrow-icon'
import Link from 'next/link'

// Article not found
const NotFoundNews = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-6 py-6 px-8 text-center">
      <h1>The News you are searching for doesn't exist...</h1>
      <Link className="bg-[#bcbcb7] border-2 border-[#bcbcb7] text-[#181817] hover:bg-transparent hover:text-[#bcbcb7] trans-3 py-2.5 px-6 rounded-full flex items-center gap-2" href="/news">
        <span>
        See all news
        </span>
        <LeftArrowIcon className="rotate-180" />
      </Link>
    </div>
  )
}

export default NotFoundNews
