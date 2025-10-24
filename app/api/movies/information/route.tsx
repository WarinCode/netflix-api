import { NextResponse } from "next/server";
import sql from "@/app/api/actions";

export async function GET(){
    try {
        const data = await sql`SELECT show_id, title, description, duration, rating, type, listed_in, release_year FROM netflix_shows;`;
        return NextResponse.json(data);
    } catch(err: unknown){
        if (err instanceof Error){
            return NextResponse.json({ error: err.message }, { status: 500 });
        } 
    }
}