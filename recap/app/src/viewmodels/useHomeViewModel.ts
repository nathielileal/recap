import { useEffect, useState } from "react";
import { Movie } from "../models/Movies";
import { api } from "../services/api-filmes";

export function useHomeViewModel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => { load() }, []);

    const load = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await api.get("/movie/popular", { params: { page } });

            setMovies(prev => [...prev, ...response.data.results]);
            setPage(prev => prev + 1);
        } finally {
            setLoading(false);
        }
    };

    const searchMovie = async (query: string) => {
        setLoading(true);

        try {
            const response = await api.get("/search/movie", { params: { query } });

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

    const movieData = search.length > 2 ? searchMovies : movies;

    return {
        movieData,
        loading,
        empty,
        search,
        load,
        onSearchChange
    };
}