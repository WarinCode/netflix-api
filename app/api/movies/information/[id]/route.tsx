import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import sql from "@/app/api/actions";
import { NextParams, Id } from "@/app/_types";
import ZodSchemas from "@/app/_schemas";

export async function GET(req: NextRequest, { params }: NextParams<Id>) {
  const { id }: Id = await params;

  try {
    await ZodSchemas.id.parseAsync(id);

    const data =
      await sql`SELECT show_id, title, description, duration, rating, type, listed_in, release_year FROM netflix_shows WHERE show_id = ${id};`;
    if (data.length === 1) {
      return NextResponse.json(data[0]);
    }
    return NextResponse.json({});
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 500 });
    } else if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }
}
