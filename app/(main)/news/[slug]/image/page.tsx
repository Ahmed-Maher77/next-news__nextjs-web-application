import { NewsDetailPageProps } from "@/app/types";
import { getNewsImageBySlug } from "@/lib/news";
import Image from "next/image";

// Full-screen image page
const page = async ({ params }: NewsDetailPageProps) => {
    const { slug } = await params;
    const { image } = getNewsImageBySlug(slug);

    return <div className="relative h-screen w-full">
        <Image src={`/images/news/${image}`} alt={`${slug}'s image`} fill className="object-cover" />
    </div>;
};

export default page;
