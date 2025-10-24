import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const director: string | null = nextUrl.searchParams.get("director");

    try {
        await ZodSchemas.director.parseAsync(director);
        
        if (director !== null && director.toLowerCase() === "null"){
            const data = await sql`SELECT * FROM netflix_shows WHERE director IS NULL;`;
            return NextResponse.json(data, { status: 200 });
        }
        
        const temp: string = `%${director}%`;
        const data = await sql`SELECT * FROM netflix_shows WHERE director LIKE ${temp} OR director = ${director};`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}