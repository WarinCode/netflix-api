import * as z from "zod";

namespace ZodSchemas {
  export const id = z.string().startsWith("s").lowercase().trim();
  export const title = z.string().min(2).max(100).trim();
  export const director = z.string().min(2).max(80).trim();
  export const year = z.number().int().min(1900).max(2050);
  export const country = z.string().min(2).max(60).trim();
  export const type = z.literal(["Movie", "TV Show"]);
  export const date = z.iso.date();
  export const castMembers = z.string().min(3).max(200).trim();
  export const rating = z.literal([
    "NR",
    "74 min",
    "TV-Y",
    "TV-Y7-FV",
    "TV-G",
    "66 min",
    "TV-14",
    "84 min",
    "TV-MA",
    "TV-Y7",
    "G",
    "NC-17",
    "PG",
    "TV-PG",
    "PG-13",
    "R",
    "UR",
  ]);
}

export default ZodSchemas;
