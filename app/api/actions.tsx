// app/actions.ts
"use server";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { NextJSEnvironment } from "@/app/_types";

const { DATABASE_URL } = process.env as NextJSEnvironment;
const sql: NeonQueryFunction<false, false> = neon(DATABASE_URL);

export default sql;