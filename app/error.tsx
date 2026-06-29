"use client";
import LeftArrowIcon from "@/app/components/Icons/left-arrow-icon";
import { ErrorProps } from "@/app/types";
import ReloadIcon from "./components/Icons/reload-icon";
import MainLink from "./components/Buttons/main-link";

// Global error boundary
const Error = ({ error, reset }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 text-center py-6 px-8">
            <h1 className="text-3xl font-bold">Something went wrong...</h1>
            <p className="text-red-500">{error.message}</p>

            <div className="btns flex flex-wrap flex-row-reverse gap-4 items-center mt-8 justify-center">
                <MainLink href="/news" text="Go Home">
                    <LeftArrowIcon className="rotate-180" />
                </MainLink>

                <button
                    className="hover:text-amber-500 trans-3 py-2.5 px-6 rounded-full flex items-center gap-2 cursor-pointer"
                    onClick={reset}
                >
                    <span>Retry</span>
                    <ReloadIcon />
                </button>
            </div>
        </div>
    );
};

export default Error;
