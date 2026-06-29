"use client";

import ReloadIcon from "@/app/components/Icons/reload-icon";
import { ErrorProps } from "@/app/types";

// News section error boundary
const newsError = ({ error, reset }: ErrorProps) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6 text-center py-6 px-8">
            <h1 className="text-3xl font-bold">
                Failed To get News from the server
            </h1>
            <p className="text-red-500">{error.message}</p>
            <button
                className="hover:text-amber-500 trans-3 py-2.5 px-6 rounded-full flex items-center gap-2 cursor-pointer"
                onClick={reset}
            >
                <span>Try Again</span>
                <ReloadIcon />
            </button>
        </div>
    );
};

export default newsError;
