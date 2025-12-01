import { useEffect, useState } from "react";
import { Movie } from "../models/movie";
import { CatalogService } from "../services/catalog.service";
import { movieApi } from "../services/movie.service";
import { Rating } from "../models/rating";
import { RatingService } from "../services/rating.service";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [reviews, setReviews] = useState<Rating[]>([]);
    const [detail, setDetail] = useState<Movie | null>(null);
    const [modal, setModal] = useState(false);
    const [lists, setLists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('A');
    const [user, setUser] = useState<User | null>(null);

    const tmdbId = Number(id);

    const handleOption = (opt: string) => {
        setOption(opt);
    };

    const openCreateModal = () => setModal(true);
    const closeReviewModal = () => setModal(false);
    
    const handleLists = () => {
        setLists(!lists);
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
            const data = await RatingService.getMovieRating(Number(id ?? 0));

            setReviews(data.ratings);
        } catch (error) {
            console.error("Erro ao buscar reviews do cache:", error);
            setReviews([]);
        }
    };
    
    const getUser = async (userId: string) => {
        try {
            const data = await UserService.getUserById(userId);

            setUser(data);
        } catch (error) {
            console.error("Erro ao buscar informações do usuário", error);
            setUser(null);
        }
    };

    const addToCatalog = async (tmdbId: number) => {
        try {
            setLoading(true);

            const result = await CatalogService.addMovieToCatalog(tmdbId);

            setLoading(false);

            if (!result?.success) {
                return result.error || result.message || 'Ocorreu um erro ao tentar adicionar filme à sua watchlist. Tente novamente mais tarde.';
            }

            return result.message || 'Filme adicionado à sua watchlist com sucesso!';
        } catch (e) {
            setLoading(false);
            return 'Ocorreu um erro inesperado.';
        }
    };

    useEffect(() => {
        getDetail();
        getReviews();
    }, [id]);

    return { tmdbId, detail, loading, option, reviews, handleOption, modal, openCreateModal, closeReviewModal, lists, handleLists, getReviews, addToCatalog, user };
}