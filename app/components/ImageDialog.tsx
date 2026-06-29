"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Image modal dialog
const ImageDialog = ({ slug, image }: { slug: string; image: string }) => {
    const router = useRouter();

    // Prevent scroll while modal open
    useEffect(() => {
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <>
        <div onClick={() => router.back()} className="fixed top-0 left-0 w-screen h-screen bg-black/80"></div>
        <dialog
            open
            className="p-4 w-[90%] max-w-[600px] fixed -translate-x-[50%] -translate-y-[50%] top-1/2 left-1/2 flex items-center justify-center flex-col text-white gap-4 bg-transparent"
        >
            <h1>Image Modal</h1>
            <button
                onClick={() => router.back()}
                className="text-5xl absolute -top-0 -right-10 cursor-pointer"
            >
                &times;
            </button>
            <div className="h-[500px] w-[90%] relative">
                <Image
                    src={`/images/news/${image}`}
                    alt={`${slug}'s image`}
                    fill
                    className="object-cover"
                />
            </div>
        </dialog>
        </>
    );
};

export default ImageDialog;
