import { NextResponse, NextRequest } from "next/server";
import sql from "@/app/api/actions";
import * as z from "zod";
import ZodSchemas from "@/app/_schemas";
import { AddMovie } from "@/app/_types";

export async function GET({ nextUrl }: NextRequest) {
  const limit: string | null = nextUrl.searchParams.get("limit");

  try {
    const { success, data }: z.ZodSafeParseResult<number> = await z
      .number()
      .safeParseAsync(parseInt(limit || ""));
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

export async function POST(req: NextRequest) {
  const body: AddMovie = await req.json();

  try {
    await ZodSchemas.addMovie.parseAsync(body);
    if (!body.director) body.director = null;
    if (!body.castMembers) body.castMembers = null;
    if (!body.country) body.country = null;
    if (!body.listedIn) body.listedIn = null;
    if (!body.description) body.description = null;

    const { gen_id } = (await sql`SELECT COUNT(show_id) + 1 AS gen_id FROM netflix_shows;`)[0];
    const id: string = `s${gen_id}`;
    const {
      type,
      title,
      director,
      castMembers,
      country,
      dateAdded,
      releaseYear,
      rating,
      duration,
      listedIn,
      description,
    }: AddMovie = body;
    await sql`INSERT INTO netflix_shows VALUES(${id}, ${type}, ${title}, 
        ${director}, ${castMembers}, ${country}, ${dateAdded}, 
        ${releaseYear}, ${rating}, ${duration}, ${listedIn}, ${description});`;
    return NextResponse.json(
      { message: "เพิ่มข้อมูลหนังสำเร็จ" },
      { status: 201 }
    );
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 500 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
