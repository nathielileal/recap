import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { movieApi, MovieService } from "../services/movie.service";

export interface Category {
    id: string;
    title: string;
    endpoint: string;
    data: Movie[];
    page: number;
}

export function useHomeViewModel() {
    // const [categories, setCategories] = useState<Category[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [canLoadMore, setCanLoadMore] = useState(true);
    const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => { load() }, []);

    const load = async () => {
        setLoading(true);

        // const categories = [
        //     { id: 'popular', title: 'Populares', endpoint: '/movie/popular', data: [], page: 1 },
        //     { id: 'upcoming', title: 'Novidades', endpoint: '/movie/upcoming', page: 1, data: [] },
        //     { id: 'top_rated', title: 'Mais bem avaliados', endpoint: '/movie/top_rated', page: 1, data: [] },
        // ];

        try {
            const data = await MovieService.getMovies(1);

            setMovies(data ?? []);
            setCurrentPage(2);
            setCanLoadMore(data.length > 0);

            // const get = await Promise.all(
            //     categories.map(async (category) => {
            //         const response = await movieApi.get(category.endpoint, { params: { page: 1 } });

            //         return { ...category, data: response.data.results, page: 2 };
            //     })
            // );
            // setCategories(get);
        } catch (error) {
            console.error("Erro ao carregar filmes. ", error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        if (loading || !canLoadMore || search.length > 2) return;

        setLoading(true);

        try {
            const data = await MovieService.getMovies(currentPage);
            
            if (data.length === 0) {
                setCanLoadMore(false);
            }

            setMovies(prev => [...prev, ...data]);
            setCurrentPage(prev => prev + 1);
        } catch (error) {
            console.error("Erro ao carregar mais filmes:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchMovie = async (query: string) => {
        setLoading(true);

        try {
            const response = await movieApi.get("/search/movie", { params: { query } });

            if (response.data.results.length === 0) {
                setEmpty(true);
                setSearchMovies([]);
            } else {
                setEmpty(false);
                setSearchMovies(response.data.results);
            }
        } finally {
            setLoading(false);
        }
    };

    const onSearchChange = (text: string) => {
        setSearch(text);

        if (text.length > 2) {
            searchMovie(text);
        } else {
            setSearchMovies([]);
            setEmpty(false);
        }
    };

    return {
        // categories,
        movies, 
        searchMovies,
        loading,
        empty,
        search,
        loadMore, 
        onSearchChange
    };
}