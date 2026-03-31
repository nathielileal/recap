import { useCallback, useState } from "react";
import { AuthService } from "../services/auth.service";
import { RatingService } from "../services/rating.service";
import { Rating, UserRating } from "../models/rating";
import { MovieService } from "../services/movie.service";

export function useReviewViewModel(tmdbId: number, initialScore?: number, initialReview?: string) {
    const [review, setReview] = useState<Rating[]>([]);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [rate, setRate] = useState(initialScore ?? 0);
    const [description, setDescription] = useState<string>(initialReview ?? '');
    const [isExpanded, setIsExpanded] = useState(false);
    const [modal, setModal] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        setEmpty(false);

        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await RatingService.getUserRating(userId ?? '');

            const result = response.result?.ratings ?? [];

            if (result.length === 0) {
                setReview([]);
                setEmpty(true);
                return;
            }

            const reviews = await Promise.all(
                result.map(async (rating) => {
                    const movie = await MovieService.getMoviesById(rating.tmdbId ?? 0);

                    return { ...rating, movie: movie.title } as Rating;
                })
            );

            setReview(reviews);
            setEmpty(reviews.length === 0);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar avaliações.");
            setReview([]);
            setEmpty(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleModal = () => {
        setModal(!modal);
    };

    const clearForm = () => {
        setRate(0);
        setDescription('');
    }

    const saveRating = async () => {
        const userId = await AuthService.getAuthIDUser();
        const rating: Rating = { userId: userId ?? '', tmdbId: tmdbId, score: rate, review: description };

        return await RatingService.saveRating(rating);
    }

    const updateRating = async (ratingId: number) => {
        const rating: Rating = { ratingId: ratingId, score: rate, review: description };

        return await RatingService.updateRating(rating);
    }

    const deleteRating = async (ratingId: number) => {
        return await RatingService.deleteRating(ratingId);
    }

    return {
        rate, setRate, description, setDescription, clearForm, isExpanded, setIsExpanded, saveRating, updateRating, deleteRating, modal, handleModal,
        review, empty, loading, error, load
    };
}