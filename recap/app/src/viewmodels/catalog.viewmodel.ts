import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { CatalogService } from "../services/catalog.service";

export function useCatalogViewModel(type: string | string[]) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => { load() }, []);

    const load = async () => {
        setLoading(true);

        try {
            let data;

            console.log(type);
            if (type === 'W') {
                data = await CatalogService.getMoviesFromCatalog();
            } else if (type === 'F') {
                data = await CatalogService.getMoviesFromCatalog();
            } else {
                data = await CatalogService.getMoviesFromCatalog();
            }

            setMovies(data ?? []);
        } catch (apiError: any) {
            setError(apiError.message || "Erro inesperado ao carregar filmes da lista.");
        } finally {
            setLoading(false);
        }
    };

    return {
        movies,
        loading,
        error
    };
}