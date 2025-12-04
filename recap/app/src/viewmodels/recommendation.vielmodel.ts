import { useCallback, useState } from 'react';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationType } from '../models/recommendation';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

export const useRecommendationViewModel = () => {
    const [rec, setRec] = useState<RecommendationType[]>([]);
    const [filter, setFilter] = useState<"public" | "private" | "mine">("public");
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState<Movie[]>([]);
    const [search, setSearch] = useState('');
    const [hasRecommendations, setHasRecommendations] = useState(true);
    const [like, setLike] = useState<boolean | null>(null);

    const get = useCallback(async () => {
        setLoading(true);
        setHasRecommendations(false);

        try {
            const data = await RecommendationService.getRecommendationByUser();

            if (data.length === 0) {
                setRec([]);
                setMovie([]);
                return;
            }

            const movielist: Promise<Movie>[] = [];
           
            data.forEach(recommendation => {
                recommendation.movies?.forEach(item => {
                    if (item.tmdbId > 0) {
                        movielist.push(MovieService.getMoviesById(item.tmdbId));
                    }
                });
            });

            const movies = await Promise.all(movielist);
            const map = new Map();
          
            movies.forEach(movie => {map.set(movie.tmdbId, movie);});
          
            setRec(data);
            setMovie(Array.from(map.values()));
            setHasRecommendations(data.length > 0);
        } catch (apiError: any) {
            setRec([]);
            setMovie([]);
            setHasRecommendations(false);
            console.error('Erro ao carregar recomendações:', apiError);
        } finally {
            setLoading(false);
        }
    }, []);

    const load = async () => {
        setLoading(true);
        setHasRecommendations(false);

        try {
            const data = await RecommendationService.getRecommendation();
            const recommendation = data?.[0]?.movies || [];

            setHasRecommendations(recommendation.length > 0);

            if (recommendation.length === 0) {
                setRec([]);
                setMovie([]);
                return;
            }

            const moviePromises = recommendation
                .filter(item => item.tmdbId > 0)
                .map(item => MovieService.getMoviesById(item.tmdbId));

            const movies = await Promise.all(moviePromises);

            setRec(data);
            setLike(data[0].liked ?? false);
            setMovie(movies);
        } catch (apiError: any) {
            setRec([]);
            setMovie([]);
            setHasRecommendations(false);
            console.error('Erro ao carregar recomendações:', apiError);
        } finally {
            setLoading(false);
        }
    };

    const saveTextRec = async (text: string) => {
        setLoading(true);

        try {
            const data = await RecommendationService.saveTextRecommendation(text);

            if (!data.success || !data.results) {
                setRec([]);
                setMovie([]);
                setHasRecommendations(false);
                setLoading(false);
                return;
            }

            const recommendation = data.results || [];
            setHasRecommendations(recommendation.length > 0);

            if (recommendation.length === 0) {
                setRec([]);
                setMovie([]);
                return;
            }

            const moviePromises = recommendation
                .filter(item => (item.tmdbId ?? 0) > 0)
                .map(item => MovieService.getMoviesById(item.tmdbId ?? 0));

            const movies = await Promise.all(moviePromises);

            setRec(recommendation);
            setMovie(movies);
        } catch (apiError: any) {
            setRec([]);
            setMovie([]);
            setHasRecommendations(false);
            console.error('Erro ao carregar recomendações:', apiError);
        } finally {
            setLoading(false);
        }
    };

    const rate = async (id: string, liked: boolean | null) => {
        setLike(liked);
        const result = await RecommendationService.rateRecommendation(id, liked);

        if (result.success) {
            setRec(prevRec =>
                prevRec.map(recommendation => {
                    if (recommendation.id === id) {
                        return { ...recommendation, liked: liked };
                    }
                    return recommendation;
                })
            );
        }

        return result;
    };

    return { rec, load, get, loading, filter, setFilter, movie, hasRecommendations, search, setSearch, saveTextRec, rate, like };
};