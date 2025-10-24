import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const castMembers: string | null = nextUrl.searchParams.get("castMembers");

    try {
        await ZodSchemas.castMembers.parseAsync(castMembers); 
        if (castMembers !== null && castMembers.toLowerCase() === "null"){
            const data = await sql`SELECT * FROM netflix_shows WHERE cast_members IS NULL;`;
            return NextResponse.json(data, { status: 200 });
        }
       
        const temp: string = `%${castMembers}%`;
        const data = await sql`SELECT * FROM netflix_shows WHERE cast_members LIKE ${temp} OR cast_members = ${castMembers};`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}