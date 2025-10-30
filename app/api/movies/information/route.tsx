import { NextResponse, NextRequest } from "next/server";
import sql from "@/app/api/actions";

export async function GET({ nextUrl }: NextRequest){
    const limit: string | null = nextUrl.searchParams.get("limit");

    try {
        if (limit){
            const data = await sql`SELECT show_id, title, description, duration, rating, type, listed_in, release_year FROM netflix_shows LIMIT ${limit};`;
            return NextResponse.json(data);
        }

        const data = await sql`SELECT show_id, title, description, duration, rating, type, listed_in, release_year FROM netflix_shows;`;
        return NextResponse.json(data);
    } catch(err: unknown){
        if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        } 
    }
}