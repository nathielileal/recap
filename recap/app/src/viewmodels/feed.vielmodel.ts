import { useCallback, useState } from "react";
import { AuthService } from "../services/auth.service";
import { RatingService } from "../services/rating.service";
import { Rating, UserRating } from "../models/rating";
import { MovieService } from "../services/movie.service";
import { Social } from "../models/social";
import { UserService } from "../services/user.service";

export function useFeedViewModel() {
    const [review, setReview] = useState<Rating[]>([]);
    const [empty, setEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setEmpty(false);
        setError(null);

        try {
            const loggedUserId = await AuthService.getAuthIDUser();

            if (!loggedUserId) {
                setError("Usuário não autenticado.");
                setEmpty(true);
                return;
            }

            const follows: Social[] = await UserService.getFollowing(loggedUserId);
            const followingIds = follows.map(f => f.followingId);

            if (followingIds.length === 0) {
                setReview([]);
                setEmpty(true);
                return;
            }

            const uniqueUserIds = Array.from(new Set(followingIds));
            const userPromises = uniqueUserIds.map(id => UserService.getUser(id));
            const users = await Promise.all(userPromises);
            
            const usernameMap: Record<string, string> = users.reduce((map, user) => {
                map[user.id] = user.name;
                return map;
            }, {} as Record<string, string>);

            const ratingPromises = followingIds.map(id => RatingService.getUserRating(id));
            const ratingsResponses = await Promise.all(ratingPromises);
            
            let allRatings: Rating[] = [];
            
            ratingsResponses.forEach(response => {
                if (response.success && response.result?.ratings) {
                    allRatings = allRatings.concat(response.result.ratings);
                }
            });

            if (allRatings.length === 0) {
                setReview([]);
                setEmpty(true);
                return;
            }

            const enrichedReviews = await Promise.all(
                allRatings.map(async (rating) => {
                    const movie = await MovieService.getMoviesById(rating.tmdbId ?? 0);
                    
                    const username = usernameMap[rating.userId ?? ''] ?? 'Usuário Desconhecido';
                    
                    return { 
                        ...rating, 
                        movie: movie.title, 
                        username: username 
                    } as Rating;
                })
            );
            
            enrichedReviews.sort((a, b) => {
                const dateA = new Date(a.createdAt ?? '');
                const dateB = new Date(b.createdAt ?? '');
                return dateB.getTime() - dateA.getTime();
            });

            setReview(enrichedReviews);
            setEmpty(enrichedReviews.length === 0);

        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar o feed.");
            setReview([]);
            setEmpty(false);
        } finally {
            setLoading(false);
        }
    }, []);

    return { review, empty, loading, error, load };
}