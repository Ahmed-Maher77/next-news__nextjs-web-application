import Image from "next/image";
import Link from "next/link";
import { NewsListProps } from "../types";

// News grid list
const NewsList = ({ news }: NewsListProps) => {
    return (
        <ul className="news-list">
            {news.map(({ id, slug, image, title }) => (
                <li key={id}>
                    <Link href={`/news/${slug}`}>
                        <Image
                            src={`/images/news/${image}`}
                            alt={title}
                            width={300}
                            height={200}
                        />
                        <span>{title}</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NewsList;
