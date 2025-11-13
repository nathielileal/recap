import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { movieApi } from "../models/services/movie.service";

export interface Category {
    id: string;
    title: string;
    endpoint: string;
    data: Movie[];
    page: number;
}

export function useHomeViewModel() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchMovies, setSearchMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => { load() }, []);

    const load = async () => {
        setLoading(true);

        const categories = [
            { id: 'popular', title: 'Populares', endpoint: '/movie/popular', data: [], page: 1 },
            { id: 'upcoming', title: 'Novidades', endpoint: '/movie/upcoming', page: 1, data: [] },
            { id: 'top_rated', title: 'Mais bem avaliados', endpoint: '/movie/top_rated', page: 1, data: [] },
        ];

        try {
            const get = await Promise.all(
                categories.map(async (category) => {
                    const response = await movieApi.get(category.endpoint, { params: { page: 1 } });

                    return { ...category, data: response.data.results, page: 2 };
                })
            );

            setCategories(get);
        } finally {
            setLoading(false);
        }
    };

    // const loadMore = async (categoryId: string) => {
    //     if (loading) return;

    //     setLoading(true);

    //     try {
    //         const category = categories.find(cat => cat.id === categoryId);

    //         if (category) {
    //             const response = await movieApi.get(category.endpoint, { params: { page: category.page } });

    //             setCategories(prev =>
    //                 prev.map(cat =>
    //                     cat.id === categoryId
    //                         ? { ...cat, data: [...cat.data, ...response.data.results], page: cat.page + 1 }
    //                         : cat
    //                 )
    //             );
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };

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
        categories,
        searchMovies,
        loading,
        empty,
        search,
        // loadMore,
        onSearchChange
    };
}