"use client";
import { useState } from "react";
import NavLink from "./nav-link";
import Overlay from "../overlay";

const links: { href: string; label: string; startsWith: boolean }[] = [
    { href: "/", label: "Home", startsWith: false },
    { href: "/news", label: "News", startsWith: true },
    { href: "/archive", label: "Archive", startsWith: true },
];

// Responsive navigation
const navLinks = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav>
            {isMenuOpen && <Overlay onClick={closeMenu} />}

            <button
                className="block md:hidden"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                Burger Icon
            </button>
            <ul className={isMenuOpen ? "flex active" : "hidden md:flex"}>
                <button
                    className="md:hidden ms-auto text-4xl p-2 mb-8 cursor-pointer hover:opacity-75"
                    onClick={closeMenu}
                >
                    &times;
                </button>
                {links.map(({ href, label, startsWith }) => (
                    <NavLink key={href} href={href} startsWith={startsWith}>
                        {label}
                    </NavLink>
                ))}
            </ul>
        </nav>
    );
};

export default navLinks;
