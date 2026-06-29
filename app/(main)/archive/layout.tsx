import { ArchiveLayoutProps } from "@/app/types"

export const metadata = {
  title: "News Archive",
  description: "Browse through our news archive to find past articles and updates.",
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
