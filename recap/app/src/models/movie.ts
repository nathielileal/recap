export interface Movie {
    tmdbId: number;
    title: string;
    overview: string;
    posterPath: string;
    releaseDate: string;
    backdropPath?: string; // to-do: ainda não tem na api
    runtime?: string; // to-do: ainda não tem na api
    average?: number;
}