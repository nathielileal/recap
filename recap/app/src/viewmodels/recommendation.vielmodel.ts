import { useCallback, useState } from 'react';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationType } from '../models/recommendation';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

export const useRecommendationViewModel = () => {
    // rec perfil
    const [rec, setRec] = useState<RecommendationType | null>(null);
    const [movie, setMovie] = useState<Movie[]>([]);

    // rec texto
    const [textMovie, setTextMovie] = useState<Movie[]>([]);

    // reqs usuario
    const [history, setHistory] = useState<RecommendationType[]>([]);
    const [historyMovie, setHistoryMovie] = useState<Movie[]>([]);

    const [filter, setFilter] = useState<"public" | "private" | "mine">("public");
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [hasRecommendations, setHasRecommendations] = useState(true);
    const [like, setLike] = useState<boolean | null>(null);

    const get = useCallback(async () => {
        setLoading(true);
        setHasRecommendations(false);

        try {
            const data = await RecommendationService.getRecommendationByUser();

            if (data.length === 0) {
                setHistory([]);
                setHistoryMovie([]);
                return;
            }

            const hist = data.map(recommendation => ({
                ...recommendation,
                textPrompt: recommendation.textPrompt || 'Recomendação personalizada feita por IA' 
            }));

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

            movies.forEach(movie => { map.set(movie.tmdbId, movie); });

            setHistory(hist);
            setHistoryMovie(Array.from(map.values()));
            setHasRecommendations(data.length > 0);
        } catch (apiError: any) {
            setHistory([]);
            setHistoryMovie([]);
            setHasRecommendations(false);
            console.error('Erro ao carregar recomendações:', apiError);
        } finally {
            setLoading(false);
        }
    }, []);

    const load = async () => {
        setLoading(true);

        try {
            const data = await RecommendationService.saveRecommendation();

            if (!data.success || !data.result) {
                setRec(null);
                setMovie([]);
                setHasRecommendations(false);
                setLoading(false);
                return;
            }

            const recommendation = data.result;
            const recommendedMovies = recommendation.movies || [];
            
            setHasRecommendations(recommendedMovies.length > 0);

            if (recommendedMovies.length === 0) {
                setRec(null);
                setMovie([]);
                return;
            }

            const moviePromises = recommendedMovies
                .filter(item => (item.tmdbId ?? 0) > 0)
                .map(item => MovieService.getMoviesById(item.tmdbId ?? 0));

            const movies = await Promise.all(moviePromises);

            setRec(recommendation);
            setMovie(movies);
        } catch (apiError: any) {
            setRec(null);
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
                setTextMovie([]);
                setHasRecommendations(false);
                setLoading(false);
                return;
            }

            const recommendation = data.results || [];
            setHasRecommendations(recommendation.length > 0);

            if (recommendation.length === 0) {
                setTextMovie([]);
                return;
            }

            const moviePromises = recommendation
                .filter(item => (item.tmdbId ?? 0) > 0)
                .map(item => MovieService.getMoviesById(item.tmdbId ?? 0));

            const movies = await Promise.all(moviePromises);

            setTextMovie(movies);
        } catch (apiError: any) {
            setTextMovie([]);
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
            setRec(prevRec => {
                if (prevRec && prevRec.id === id) {
                    return { ...prevRec, liked: liked };
                }

                return prevRec;
            });
        }

        return result;
    };

    return { rec, history, load, get, loading, filter, setFilter, movie, textMovie, historyMovie, hasRecommendations, search, setSearch, saveTextRec, rate, like };
};