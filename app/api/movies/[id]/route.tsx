import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import { getLastPathSegment } from "@/app/_utils";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const id: string | null = getLastPathSegment(nextUrl.pathname);

    try {
        await ZodSchemas.id.parseAsync(id);
        if (id === null) {
            throw new Error("parameter ของ id ไม่สามารถเป็นค่าว่างได้!");
        }

        const data = await sql`SELECT * FROM netflix_shows WHERE show_id = ${id};`;
        return NextResponse.json(data);
    } catch(err: unknown){
        if (err instanceof ZodError){
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        } 
    }
}