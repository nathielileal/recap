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

// save: userId, tmdbId, score, review
// update: ratingId, score, review
// delete: ratingId

export interface MovieRating {
    tmdbId: number;
    average: number;
    ratings: Rating[];
}

// get-movie: tmdbId, average, ratings