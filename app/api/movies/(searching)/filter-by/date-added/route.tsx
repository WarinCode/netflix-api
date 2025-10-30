import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const startDate: string | null = nextUrl.searchParams.get("startDate");
    const endDate: string | null = nextUrl.searchParams.get("endDate");

    try {
        await ZodSchemas.dateAdded.parseAsync(startDate);
        await ZodSchemas.dateAdded.parseAsync(endDate);
        const data = await sql`SELECT * FROM netflix_shows WHERE date_added BETWEEN ${startDate} AND ${endDate} ORDER BY date_added;`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}