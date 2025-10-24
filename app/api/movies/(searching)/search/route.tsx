import { NextResponse, NextRequest } from "next/server";
import sql from "@/app/api/actions";
import ZodSchemas from "@/app/_schemas";
import { ZodError } from "zod";
import { toCamelCase } from "@/app/_utils";

export async function GET({ nextUrl }: NextRequest) {
    const title: string | null = nextUrl.searchParams.get("title");

    try {
        await ZodSchemas.title.parseAsync(title);
        if (title === null) {
            throw new Error("โปรดระบุชื่อหนังภาพยนตร์ที่ต้องการค้นหา!");
        }

        const allCases: string[] = [title.toLowerCase(), title.toUpperCase(), toCamelCase(title)]
        .map((c: string): string[] => [c, `%${c}%`])
        .flat();

        const movies = await sql`SELECT show_id, title, description, duration, rating, type, listed_in, release_year FROM netflix_shows WHERE 
            (title = ${allCases[0]} OR title LIKE ${allCases[1]}) OR
            (title = ${allCases[2]} OR title LIKE ${allCases[3]}) OR
            (title = ${allCases[4]} OR title LIKE ${allCases[5]}) 
            ORDER BY release_year DESC;`;
        return NextResponse.json(movies);
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({ error: err.issues }, { status: 500 });
        } else if (err instanceof Error) {
            return NextResponse.json({ error: err.message }, { status: 500 });
        }
    }
}
