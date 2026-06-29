import { LayoutProps } from "@/app/types";
import MainHeader from "../components/MainHeader/main-header";

// Shared layout with header only
export default function ContentLayout({ children }: LayoutProps) {
    return (
        <div id="page">
            <MainHeader />
            <main>{children}</main>
        </div>
    );
}
