import { getAllNews } from "@/lib/news";

// GET /api/news
export function GET(req: Request) {
    const news = getAllNews();
    return Response.json({
        data: news,
    })
}