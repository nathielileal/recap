import { Movie } from "./movie";

export interface Recommendation {
    recommendations: RecommendationType[];
}

export interface RecommendationType {
    // text
    title?: string; 
    tmdbId?: number;

    // user
    id?: string;
    liked?: boolean;
    userId?: string;
    createdAt?: string;
    textPrompt?: string;
    movies?: Movie[];
}