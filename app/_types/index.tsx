export interface NextJSEnvironment extends NodeJS.ProcessEnv{
    readonly DATABASE_URL: string;
}

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