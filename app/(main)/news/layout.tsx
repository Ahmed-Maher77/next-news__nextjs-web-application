import { LayoutProps } from "@/app/types";

export const metadata = {
    title: "NextNews | news",
    description: "Stay updated with the latest news from around the world.",
};

// News layout
const layout = ({ children }: LayoutProps) => {
    return <>{children}</>;
};

export default layout;
