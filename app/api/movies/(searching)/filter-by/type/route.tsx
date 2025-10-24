import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const movieType: string | null = nextUrl.searchParams.get("movieType");

    try {
        await ZodSchemas.type.parseAsync(movieType);
        const data = await sql`SELECT * FROM netflix_shows WHERE type = ${movieType};`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}