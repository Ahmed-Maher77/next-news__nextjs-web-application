import Link from "next/link";
import NavLinks from "@/app/components/MainHeader/navLinks";

// Site header
const MainHeader = () => {
    return (
        <header id="main-header">
            <div id="logo">
                <Link href="/">NextNews</Link>
            </div>

            <NavLinks />
        </header>
    );
};

export default MainHeader;
