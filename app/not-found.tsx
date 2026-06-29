import Link from "next/link";
import LeftArrowIcon from "./components/Icons/left-arrow-icon";
import MainLink from "./components/Buttons/main-link";

// Global 404 page
const NotFoundPage = () => {
    return (
        <div
            id="NotFound-Page"
            className="flex justify-center items-center h-screen"
        >
            <div className="page-container flex flex-col items-center gap-4 py-6 px-10 text-center">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    Oops! Not Found Page
                </h1>
                <p className="text-sm sm:text-base mb-5">
                    Please check the URL or go back to Home Page
                </p>
                
                <MainLink href="/" text="Home Page">
                    <LeftArrowIcon />
                </MainLink>
            </div>
        </div>
    );
};

export default NotFoundPage;
