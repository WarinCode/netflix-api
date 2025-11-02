import * as z from "zod";
import ZodSchemas from "@/app/_schemas";

export interface NextJSEnvironment extends NodeJS.ProcessEnv {
  readonly DATABASE_URL: string;
  readonly NEXT_PUBLIC_STACK_PROJECT_ID: string;
  readonly NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: string;
  readonly STACK_SECRET_SERVER_KEY: string;
  readonly NETFLIX_API_KEY: string;
  readonly NETFLIX_USER_ID: string;
}

export type EnvironmentKeys =
  | "DATABASE_URL"
  | "NEXT_PUBLIC_STACK_PROJECT_ID"
  | "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"
  | "STACK_SECRET_SERVER_KEY"
  | "NETFLIX_API_KEY"
  | "NETFLIX_USER_ID";

export interface Movie {
  show_id: string;
  type: string;
  title: string;
  director: string | null;
  cast_members: string | null;
  country: string | null;
  dated_added: Date;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
  description: string;
}

export type Movies = Movie[];

export interface Payload {
  type: string;
  title: string;
  director: string | null;
  castMembers: string | null;
  country: string | null;
  dateAdded: Date | string;
  releaseYear: number;
  rating: string;
  duration: string;
  listedIn: string;
  description: string;
}

export interface NextParams<T extends object> {
  params: Promise<T>;
}

export interface Id {
  id: string;
}

export type AddMovie = z.infer<typeof ZodSchemas.addMovie>;
export type UpdateMovie = z.infer<typeof ZodSchemas.updateMovie>;

export interface ApiKey {
  id: string;
  description: string;
  expiresAt?: Date | undefined;
  manuallyRevokedAt?: (Date | null) | undefined;
  createdAt: Date;
  value: {
    lastFour: string;
  };
  update: (options: any) => Promise<void>;
  revoke: () => Promise<void>;
  isValid: () => boolean;
  whyInvalid: () => "manually-revoked" | "expired" | null;
  type: "user";
  userId: string;
}
export type ApiKeys = ApiKey[];

export interface SuccessResponse {
  message: string;
}