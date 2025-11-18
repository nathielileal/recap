import { useState } from "react";
import { AuthService } from "../services/auth.service";
import { RatingService } from "../services/rating.service";
import { Rating } from "../models/rating";

export function useReviewViewModel(tmdbId: number, initialScore?: number, initialReview?: string) {
    const [rate, setRate] = useState(initialScore ?? 0);
    const [description, setDescription] = useState<string>(initialReview ?? '');
    const [isExpanded, setIsExpanded] = useState(false);
    const [modal, setModal] = useState(false);

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

    return { rate, setRate, description, setDescription, clearForm, isExpanded, setIsExpanded, saveRating, updateRating, deleteRating, modal, handleModal };
}