import { getNewsBySlug } from "@/lib/news";

// GET /api/news/:slug
export async function GET(
    req: Request,
    { params }: { params: { slug: string } },
) {
    const { slug } = await params;
    const news = getNewsBySlug(slug);    

    if (!news) {
        return Response.json(
            {
                message: `News with slug "${slug}" not found`,
            },
            { status: 404 },
        );
    }

    return Response.json({ data: news });
}
