import { useState } from 'react';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationType } from '../models/recommendation';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

export const useRecommendationViewModel = () => {
    const [rec, setRec] = useState<RecommendationType[]>([]);
    const [filter, setFilter] = useState<"public" | "private" | "mine">("public");
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState<Movie[]>([]);

    const load = async () => {
        setLoading(true);

        try {
            const data = await RecommendationService.getRecommendationByUser();
            const recommendation = data?.[0]?.movies || [];

            const moviePromises = recommendation
                .filter(item => item.tmdbId > 0)
                .map(item => MovieService.getMoviesById(item.tmdbId));

            const movies = await Promise.all(moviePromises);

            setRec(data);
            setMovie(movies);
        } catch (apiError: any) {
            setRec([]);
            setMovie([]);
            console.error('Erro ao carregar recomendações:', apiError);
        } finally {
            setLoading(false);
        }
    };

    return { rec, load, loading, filter, setFilter, movie };
};