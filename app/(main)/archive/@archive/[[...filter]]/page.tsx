// Catch-all optional year/month filter

import NewsList from "@/app/components/news-list";
import { ArchiveFilterPageProps } from "@/app/types";
import {
    getAvailableNewsMonths,
    getAvailableNewsYears,
    getNewsForYear,
    getNewsForYearAndMonth,
} from "@/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";

const ArchiveFilterPage = async ({ params }: ArchiveFilterPageProps) => {
    const availableYears: string[] = getAvailableNewsYears();
    let links = availableYears;

    if (!availableYears || availableYears.length === 0) {
        notFound();
    }

    const { filter } = await params;
    const [year, month] = filter || [];
    let renderedContent;

    // No filter selected
    if (!year && !month) {
        renderedContent = <p>Please select a year and month to view news.</p>;
    }

    // Year selected, no month
    if (year && !month) {
        const news = getNewsForYear(year);
        links = getAvailableNewsMonths(year);
        if (news.length === 0) {
            renderedContent = <p>No news found for the specified year.</p>;
        } else {
            renderedContent = <NewsList news={news} />;
        }
    }
    // Year and month selected
    if (year && month) {
        const months = getAvailableNewsMonths(year);
        const news = getNewsForYearAndMonth(year, month);
        
        if (months.indexOf(month) === -1) {
            renderedContent = <p>Invalid month selected, please try again.</p>;
        } else {
            if (news.length === 0) {
                renderedContent = (
                    <p>No news found for the specified month of this year.</p>
                );
            } else {
                renderedContent = <NewsList news={news} />;
            }
        }
    }

    // Invalid year fallback
    if (availableYears.indexOf(year) === -1) {
        renderedContent = <p>Invalid year selected, please try again.</p>;
    }

    return (
        <div>
            <header id="archive-header" className="mt-3">
                <nav>
                    <ul>
                        {links.length > 0 && links.map((link) => {
                            const href =
                                !year && !month
                                    ? `/archive/${link}`
                                    : year && !month
                                      ? `/archive/${year}/${link}`
                                      : null;
                            return (
                                <li key={link}>
                                    {href && <Link href={href}>{link}</Link>}
                                </li>
                            );
                        })}
                    </ul>
                    {year && month && (
                        <Link
                            href="/archive"
                            className="text-yellow-500 hover:text-yellow-600 mb-3 block -mt-4"
                        >
                            Go Back
                        </Link>
                    )}
                </nav>
            </header>
            {renderedContent}
        </div>
    );
};

export default ArchiveFilterPage;
