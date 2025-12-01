export interface Recommendation {
    recommendations: [];
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
    movies?: RecommendationMovie[];
}

export interface RecommendationMovie {
    title: string; 
    tmdbId: number;
}