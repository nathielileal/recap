import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { movieApi } from "../services/movie.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [detail, setDetail] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getDetail = async () => {
            if (!id) return; 

            try {
                setLoading(true);
                const response = await movieApi.get(`/movie/${id}`);
                setDetail(response.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes do filme:", error);
            } finally {
                setLoading(false);
            }
        };

        getDetail();
    }, [id]);

    return { detail, loading };
}