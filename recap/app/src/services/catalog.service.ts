import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { Movie } from "../models/movie";
import { createApiInstance } from "./api.service";
import { AuthService } from "./auth.service";

interface CatalogResponse {
    userId: string;
    movies: Movie[]; 
}

export const api = createApiInstance('movies');

export const CatalogService = {
    async addMovieToCatalog(tmdbId: number): Promise<ApiResponse<Movie>> {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.post('/catalog/add', { userId: userId, tmdbId: tmdbId });

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

    getMoviesFromCatalog: async (page: number = 1): Promise<Movie[]> => {
        try {
            const response = await api.get<CatalogResponse>('/catalog/me');
            const data = response.data.movies;

            const movies = data.map(item => ({
                tmdbId: item.tmdbId,
                title: item.title,
                overview: item.overview,
                posterPath: item.posterPath,
                releaseDate: item.releaseDate,
            }));

            return movies;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes do catálogo.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },
};