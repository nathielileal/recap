import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { Review } from "../models/review";
import { movieApi } from "../models/services/movie.service";
import { ReviewService } from "../models/services/review.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [detail, setDetail] = useState<Movie | null>(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('A');

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
            // const response = await movieBackApi.get(`/movies/${id}`);
            const response = await movieApi.get(`/movie/${id}`);
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

    useEffect(() => {
        getDetail();
        getReviews();
    }, [id]);

    return { detail, loading, option, reviews, handleOption, modal, handleModal, getReviews };
}