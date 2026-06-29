import { NextRequest, NextResponse } from "next/server";

// Log all API requests
export default function proxy(req: NextRequest) {
    console.log(req);
    return NextResponse.next();
}

export const config = {
    matcher: "/api/:path*"
}