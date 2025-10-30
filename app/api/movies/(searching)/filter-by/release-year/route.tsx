import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";

export async function GET({ nextUrl }: NextRequest){
    const fromYear: string | null = nextUrl.searchParams.get("fromYear");
    const toYear: string | null = nextUrl.searchParams.get("toYear");

    try {
        await ZodSchemas.releaseYear.parseAsync(parseInt(fromYear as string));
        await ZodSchemas.releaseYear.parseAsync(parseInt(toYear as string));
        if (!fromYear && !toYear){
            throw new Error("ต้องมีการระบุช่วงปีสำหรับการค้นหา!");
        }

        const data = await sql`SELECT * FROM netflix_shows WHERE release_year BETWEEN ${fromYear} AND ${toYear} ORDER BY release_year;`;
        return NextResponse.json(data, { status: 200 });
    } catch(err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}