import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { Review } from "../models/review";
import { CatalogService } from "../services/catalog.service";
import { movieApi } from "../services/movie.service";
import { ReviewService } from "../services/review.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [detail, setDetail] = useState<Movie | null>(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('A');

    const tmdbId = Number(id);

    const handleOption = (opt: string) => {
        setOption(opt);
    };

    const handleModal = () => {
        setModal(!modal);
    };

    const getDetail = async () => {
        if (!id) return;

        try {
            setLoading(true);
            const response = await movieApi.get(`/movies/${id}`);
            setDetail(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
        } finally {
            setLoading(false);
        }
    };

    const getReviews = async () => {
        try {
            const data = await ReviewService.getReviewByIdMovie(id?.toString() ?? '');

            setReviews(data);
        } catch (error) {
            console.error("Erro ao buscar reviews do cache:", error);
            setReviews([]);
        }
    };

    const addToCatalog = async (tmdbId: number) => {
        try {
            setLoading(true);

            const result = await CatalogService.addMovieToCatalog(tmdbId);

            setLoading(false);

            if (!result?.success) {
                return result.error || result.message || 'Ocorreu um erro ao tentar adicionar filme ao catálogo pessoal. Tente novamente mais tarde.';
            }

            return result.message || 'Filme adicionado ao seu catálogo pessoal com sucesso!';
        } catch (e) {
            setLoading(false);
            return 'Ocorreu um erro inesperado na comunicação.';
        }
    };

    useEffect(() => {
        getDetail();
        getReviews();
    }, [id]);

    return { tmdbId, detail, loading, option, reviews, handleOption, modal, handleModal, getReviews, addToCatalog };
}