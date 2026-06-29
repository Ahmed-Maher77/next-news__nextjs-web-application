import ImageDialog from "@/app/components/ImageDialog";
import { NewsDetailPageProps } from "@/app/types";
import { getNewsImageBySlug } from "@/lib/news";

// Intercepting route – image in modal
const ImagePage = async ({ params }: NewsDetailPageProps) => {
    const { slug } = await params;
    const { image } = getNewsImageBySlug(slug);

    return <ImageDialog slug={slug} image={image} />;
};

export default ImagePage;
