export interface Rating {
    id?: number;
    ratingId?: number;
    userId?: string,
    username?: string;
    tmdbId?: number;
    score: number;
    review: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface MovieRating {
    tmdbId: number;
    average: number;
    ratings: Rating[];
}

export interface UserRating {
    userId: string;
    ratings: Rating[];
}