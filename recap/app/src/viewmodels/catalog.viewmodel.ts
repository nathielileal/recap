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
            const data = await CatalogService.getMoviesFromCatalog();

            const movies = data.filter((movie: Movie) => {
                switch (type) {
                    case 'Favoritos':
                        return movie.isFavorite === true;

                    case 'Assistidos':
                        return movie.isWatched === true;

                    default:
                        return movie.isInCatalog === true;
                }
            });

            setMovies(movies ?? []);
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