import { MainLinkProps } from "@/app/types";
import Link from "next/link";

// Styled link button
const MainLink = ({ className, text, children, href }: MainLinkProps) => {
    return (
        <Link
            href={href}
            className={`bg-white border-2 border-white hover:bg-black hover:text-white text-black py-3 px-5 rounded-full transition duration-300 flex gap-3 items-center justify-center ${className}`}
        >
            {children}

            <span>{text}</span>
        </Link>
    );
};

export default MainLink;
