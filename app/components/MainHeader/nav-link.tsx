"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Nav link with active detection
const NavLink = ({
    href,
    children,
    startsWith,
}: {
    href: string;
    children: React.ReactNode;
    startsWith: boolean;
}) => {
    const pathname = usePathname();

    const isActiveLink = (link: string): boolean => {
        return pathname.startsWith(link);
    };

    return (
        <li>
            <Link
                href={href}
                className={
                    (startsWith ? isActiveLink(href) : pathname === href)
                        ? "active"
                        : ""
                }
            >
                {children}
            </Link>
        </li>
    );
};

export default NavLink;
