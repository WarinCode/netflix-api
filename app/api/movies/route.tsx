import { NextResponse, NextRequest } from "next/server";
import sql from "@/app/api/actions";
import * as z from "zod";

export async function GET({ nextUrl }: NextRequest) {
    const limit: string | null = nextUrl.searchParams.get("limit");

    try {
        const { success, data }: z.ZodSafeParseResult<number> = await z.number().safeParseAsync(parseInt(limit || ""));
        if (success && limit) {
            const movies = await sql`SELECT * FROM netflix_shows LIMIT ${data};`;
            return NextResponse.json(movies);
        } else {
            const movies = await sql`SELECT * FROM netflix_shows;`;
            return NextResponse.json(movies);
        }
    } catch (err: unknown) {
        if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}
