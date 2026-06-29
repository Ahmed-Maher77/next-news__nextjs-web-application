"use client";

// Archive filter error boundary
const error = () => {
    return (
        <div className="grid place-content-center min-h-[200px] ">
            <div className="error-container flex flex-col gap-3 justify-center text-center">
                <h1 className="text-3xl font-bold text-red-500">
                    An error occurred!
                </h1>
                <p>Invalid Filters! check your URL and try again.</p>
            </div>
        </div>
    );
};

export default error;
