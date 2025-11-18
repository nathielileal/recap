import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { movieApi, MovieService } from "../services/movie.service";
import { RatingService } from "../services/rating.service";

export function useHomeViewModel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        load(search);
    }, [search]);

    const load = async (strsearch: string) => {
        setLoading(true);
        setError(null);
        setEmpty(false);

        try {
            let data: Movie[] = [];
            const page = 1;
            
            data = await MovieService.getMovies(1);
            
            if (search) {
                data = data.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
                // data = await MovieService.searchMovies(strsearch, page);
            }

            const movie = await Promise.all(
                data.map(async (movie) => {
                    try {
                        const rating = await RatingService.getMovieRating(movie.tmdbId);
                        
                        return { ...movie, average: rating.average || 0 };
                    } catch (e: any) {
                        setError(e.message);
                        return { ...movie, average: 0 }; 
                    }
                })
            );

            setMovies(movie ?? []);
            setCurrentPage(page + 1);
            setCanLoadMore(data.length > 0);
            setEmpty(data.length === 0 && strsearch.length > 0);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar filmes.");
            setMovies([]);
            setEmpty(false);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (loading || !canLoadMore) return;

        setLoading(true);

        try {
            let data: Movie[] = [];
            
            if (search.length > 0) {
                data = data.filter(movie => movie.title.toLowerCase().includes(search.toLowerCase()));
                // data = await MovieService.searchMovies(search, currentPage);
            } else {
                data = await MovieService.getMovies(currentPage);
            }

            if (data.length === 0) {
                setCanLoadMore(false);
            }

            setMovies(prev => [...prev, ...data]);
            setCurrentPage(prev => prev + 1);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar mais filmes.");
        } finally {
            setLoading(false);
        }
    };

    return { movies, loading, empty, search, setSearch, loadMore, error };
}