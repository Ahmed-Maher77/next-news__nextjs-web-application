import { getNewsBySlug } from "@/lib/news";
import { NextRequest } from "next/server";

// GET /api/news/:slug
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ slug: string }> },
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
