// Icon props
export interface LeftArrowIconProps {
    className?: string;
}

// Page with dynamic slug
export interface NewsDetailPageProps {
    params: {
        slug: string;
    };
}

// Layout with parallel route slots
export interface LayoutProps {
    children: React.ReactNode;
    modal?: React.ReactNode;
}

// Error boundary props
export interface ErrorProps {
    error: Error;
    reset: () => void;
}

// Styled link button props
export interface MainLinkProps {
    className?: string;
    text?: string;
    children?: React.ReactNode;
    href: string;
}

// Archive parallel route slots
export interface ArchiveLayoutProps {
    archive: React.ReactNode;
    latest: React.ReactNode;
}

// Catch-all year/month filter
export interface ArchiveFilterPageProps {
    params: { filter: [string, string?] };
}

export interface NewsListProps {
    news: {
        id: string;
        slug: string;
        image: string;
        title: string;
        date: string;
        content: string;
    }[];
}

// Loading indicator props
export interface LoadingProps {
  text: string;
}