export interface Movie {
    tmdbId: number;
    title: string;
    overview: string;
    poster_path: string;
    releaseDate: string;
    backdropPath?: string; // to-do: ainda não tem na api
    runtime?: string; // to-do: ainda não tem na api
    vote_average?: number;
    average?: number;
    isInCatalog?: boolean;
    isFavorite?: boolean;
    isWatched?: boolean;
}