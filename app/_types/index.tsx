export interface NextJSEnvironment extends NodeJS.ProcessEnv {
  readonly DATABASE_URL: string;
  readonly NEXT_PUBLIC_STACK_PROJECT_ID: string;
  readonly NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY: string;
  readonly STACK_SECRET_SERVER_KEY: string;
}

export type EnvirontmentKeys =
  | "DATABASE_URL"
  | "NEXT_PUBLIC_STACK_PROJECT_ID"
  | "NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY"
  | "STACK_SECRET_SERVER_KEY";

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
