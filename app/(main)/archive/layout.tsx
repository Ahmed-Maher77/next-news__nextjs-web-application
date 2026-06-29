import { ArchiveLayoutProps } from "@/app/types"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Archive",
  description:
    "Browse through our news archive to find past articles and updates. Filter by year and month to discover older news stories.",
  keywords: [
    "news archive",
    "past news",
    "historical news",
    "news by date",
    "archive",
  ],
  openGraph: {
    title: "News Archive | Next News",
    description:
      "Browse through our news archive to find past articles and updates. Filter by year and month.",
    url: "https://next-news.vercel.app/archive",
  },
}

// Archive with parallel route slots
const ArchiveLayout = ({ archive, latest }: ArchiveLayoutProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mt-12 mb-4">News Archive</h1>
      <section className="archive-filter">{archive}</section>
      <section className="latest-filter">{latest}</section>
    </div>
  )
}

export default ArchiveLayout
