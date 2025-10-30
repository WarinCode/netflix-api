import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import { NextParams, Id, UpdateMovie } from "@/app/_types";
import ZodSchemas from "@/app/_schemas";

export async function GET(req: NextRequest, { params }: NextParams<Id>) {
  const { id }: Id = await params;

  try {
    await ZodSchemas.id.parseAsync(id);

    const data = await sql`SELECT * FROM netflix_shows WHERE show_id = ${id};`;
    return NextResponse.json(data);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 500 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest, { params }: NextParams<Id>) {
  const body: UpdateMovie = await req.json();
  const { id }: Id = await params;

  try {
    await ZodSchemas.id.parseAsync(id);
    await ZodSchemas.updateMovie.parseAsync(body);
    if (!body.director) body.director = null;
    if (!body.castMembers) body.castMembers = null;
    if (!body.country) body.country = null;
    if (!body.listedIn) body.listedIn = null;
    if (!body.description) body.description = null;

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
    }: UpdateMovie = body;
    await sql`UPDATE netflix_shows SET type = ${type}, title = ${title}, director = ${director}, cast_members = ${castMembers}, country = ${country}, date_added = ${dateAdded}, release_year = ${releaseYear}, rating = ${rating}, duration = ${duration}, listed_in = ${listedIn}, description = ${description} WHERE show_id = ${id};`;
    return NextResponse.json({ message: "แก้ไขข้อมูลหนังสำเร็จ" });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 500 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest, { params }: NextParams<Id>) {
  const { id }: Id = await params;

  try {
    await ZodSchemas.id.parseAsync(id);

    await sql`DELETE FROM netflix_shows WHERE show_id = ${id};`;
    return NextResponse.json({ message: "ลบข้อมูลหนังสำเร็จ" });
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 500 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
