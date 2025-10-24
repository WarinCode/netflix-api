"use server";


import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { getEnv } from "@/app/_utils";

const databaseUrl: string = getEnv("DATABASE_URL");
const sql: NeonQueryFunction<false, false> = neon(databaseUrl);

export default sql;