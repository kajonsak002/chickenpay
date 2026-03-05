import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ category: string }> }
) {
    const { category } = await params;
    const apiHost = process.env.NEXT_PUBLIC_BYSHOP_HOST || "https://byshop.me/api/";
    const apiKey = process.env.NEXT_PUBLIC_BYSHOP_KEY || "";

    try {
        const res = await fetch(`${apiHost}bypay?api=game`, {
            headers: { Authorization: apiKey },
            next: { revalidate: 60 },
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
        }

        const games = await res.json();
        const game = games.find(
            (g: { category: string }) => g.category === category
        );

        if (!game) {
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }

        return NextResponse.json(game);
    } catch {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
