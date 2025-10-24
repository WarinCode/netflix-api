import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const rating: string | null = nextUrl.searchParams.get("rating");

    try {        
        if (rating !== null && rating.toLowerCase() === "null"){
            const data = await sql`SELECT * FROM netflix_shows WHERE rating IS NULL;`;
            return NextResponse.json(data, { status: 200 });
        }

        await ZodSchemas.rating.parseAsync(rating);
        const data = await sql`SELECT * FROM netflix_shows WHERE rating = ${rating};`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}