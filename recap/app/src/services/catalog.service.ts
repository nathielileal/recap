import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { Catalog, Movie } from "../models/movie";
import { createApiInstance } from "./api.service";
import { AuthService } from "./auth.service";

interface CatalogResponse {
    userId: string;
    movies: Movie[]; 
}

export const api = createApiInstance('catalog');

export const CatalogService = {
    getMoviesFromCatalog: async (userId: string): Promise<Movie[]> => {
        try {
            const id = userId === '' || userId === undefined ? 'me' : userId;
            const response = await api.get<CatalogResponse>(`/catalog/${id}`);
            const data = response.data.movies;

            const movies = data.map(item => ({
                tmdbId: item.tmdbId,
                title: item.title,
                overview: item.overview,
                poster_path: item.poster_path,
                releaseDate: item.releaseDate,
                runtime: item.runtime,
                vote_average: item.vote_average,
                average: item.average,
                isInCatalog: item.isInCatalog,
                isFavorite: item.isFavorite,
                isWatched: item.isWatched,
            }));

            return movies;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes do catálogo.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    getCatalog: async (userId: string): Promise<Catalog> => {
        try {
            const id = userId === '' || userId === undefined ? 'me' : userId;
            const response = await api.get<Catalog>(`/catalog/${id}`);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes do catálogo.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    async addMovieToCatalog(tmdbId: number): Promise<ApiResponse<Movie>> {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.post('/catalog/add', { userId: userId, tmdbId: tmdbId });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao adicionar filme à watchlist.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar adicionar filme à watchlist. Tente novamente mais tarde.' };
            }
            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async addMovieToFavorite(tmdbId: number, value: boolean): Promise<ApiResponse<Movie>> {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.post('/catalog/favorite', { userId: userId, tmdbId: tmdbId, value: value });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado no cadastro.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar adicionar filme ao catálogo pessoal. Tente novamente mais tarde.' };
            }
            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async addMovieToWatched(tmdbId: number, value: boolean): Promise<ApiResponse<Movie>> {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.post('/catalog/watched', { userId: userId, tmdbId: tmdbId, value: value });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado no cadastro.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar adicionar filme ao catálogo pessoal. Tente novamente mais tarde.' };
            }
            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};