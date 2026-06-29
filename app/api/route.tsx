import { NextResponse } from "next/server";

// Root API health-check
export function GET(req: Request) {
    console.log(req);
    return new NextResponse("Hello from the API route!");
}