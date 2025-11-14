export interface Movie {
    tmdbId: number;
    title: string;
    posterPath: string;
    overview: string;
    backdropPath?: string; // to-do: ainda não tem na api
    runtime?: string; // to-do: ainda não tem na api
    releaseDate: string;
    average?: number; // to-do: vem separado, na api de rating
}