import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { CatalogService } from "../services/catalog.service";

export function useCatalogViewModel() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { load() }, []);

    const load = async () => {
        setLoading(true);

        try {
            const data = await CatalogService.getMoviesFromCatalog();

            setMovies(data ?? []);
        } catch (error) {
            console.error("Erro ao carregar filmes do catálogo. ", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        movies, 
        loading,
    };
}