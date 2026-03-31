import { useEffect, useMemo, useState } from "react";
import { Movie } from "../models/movie";
import { CatalogService } from "../services/catalog.service";
import { movieApi, MovieService } from "../services/movie.service";
import { Rating } from "../models/rating";
import { RatingService } from "../services/rating.service";
import { UserService } from "../services/user.service";

export function useDetailsViewModel(id: string | string[] | undefined) {
    const [reviews, setReviews] = useState<Rating[]>([]);
    const [detail, setDetail] = useState<Movie | null>(null);
    const [modal, setModal] = useState(false);
    const [lists, setLists] = useState(false);
    const [loading, setLoading] = useState(false);
    const [option, setOption] = useState('A');

    const tmdbId = useMemo(() => {
        if (!id) return 0;

        const ids = Array.isArray(id) ? id[0] : id;

        return Number(ids);
    }, [id]);

    const handleOption = (opt: string) => {
        setOption(opt);
    };

    const openCreateModal = () => setModal(true);
    const closeReviewModal = () => setModal(false);

    const handleLists = () => {
        setLists(!lists);
    };

    const getDetail = async () => {
        if (!tmdbId) return;

        try {
            setLoading(true);

            const response = await MovieService.getMoviesById(tmdbId);

            setDetail(response);
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
        } finally {
            setLoading(false);
        }
    };

    const getReviews = async () => {
        try {
            const data = await RatingService.getMovieRating(tmdbId);

            const rating = data.ratings.map(async (rating) => {
                let username = 'usuário desconhecido';

                try {
                    const user = await UserService.getUserById(rating.userId || '');
                    username = user?.name ?? username;
                } catch (e) {
                    console.error(`Erro ao buscar nome do usuário ${rating.userId}`, e);
                }
                return { ...rating, username: username };
            });

            const ratings = await Promise.all(rating);

            setReviews(ratings);
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
                return result.error || result.message || 'Ocorreu um erro ao tentar adicionar filme à sua watchlist. Tente novamente mais tarde.';
            }

            return result.message || 'Filme adicionado à sua watchlist com sucesso!';
        } catch (e) {
            setLoading(false);
            return 'Ocorreu um erro inesperado.';
        }
    };

    const setFavorite = async (tmdbId: number, value: boolean) => {
        try {
            setLoading(true);
            const result = await CatalogService.addMovieToFavorite(tmdbId, value);
            setLoading(false);

            if (result?.success) {
                setDetail(prevDetail => prevDetail ? ({ ...prevDetail, isFavorite: value }) : null);

                const msg = value ? 'Filme adicionado à' : 'Filme removido da';
                return result.message || `${msg} sua lista de favoritos com sucesso!`;
            }
        } catch (e) {
            setLoading(false);
            return 'Ocorreu um erro inesperado.';
        }
    };

    const setWatched = async (tmdbId: number, value: boolean) => {
        try {
            setLoading(true);
            const result = await CatalogService.addMovieToWatched(tmdbId, value);
            setLoading(false);

            if (result?.success) {
                setDetail(prevDetail => prevDetail ? ({ ...prevDetail, isWatched: value }) : null);

                const msg = value ? 'Filme adicionado à' : 'Filme removido da';
                return result.message || `${msg} sua lista de assistidos com sucesso!`;
            }
        } catch (e) {
            setLoading(false);
            return 'Ocorreu um erro inesperado.';
        }
    };

    useEffect(() => {
        getDetail();
        getReviews();
    }, [tmdbId]);

    return { tmdbId, detail, loading, option, reviews, handleOption, modal, openCreateModal, closeReviewModal, lists, handleLists, getReviews, addToCatalog, setFavorite, setWatched, getDetail };
}