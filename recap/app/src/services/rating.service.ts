import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { MovieRating, Rating } from "../models/rating";
import { createApiInstance } from "./api.service";

export const api = createApiInstance('rating');

export const RatingService = {
    getMovieRating: async (tmdbId: number): Promise<MovieRating> => {
        try {
            const response = await api.get<MovieRating>(`/ratings/movie/${tmdbId}`);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes da lista.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    async saveRating(data: Rating): Promise<ApiResponse<Rating>> {
        try {
            const response = await api.post('/ratings', data);

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao avaliar.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar avaliar. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async updateRating(data: Rating): Promise<ApiResponse<Rating>> {
        try {
            const response = await api.put(`/ratings`, data);

            if (response.status == 201 || response.status == 200) {
                return { success: true, results: response.data };
            }

            if (response.status === 204) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao atualizar a avaliação.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar atualizar a avaliação. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async deleteRating(id: number): Promise<ApiResponse<Rating>> {
        try {
            const response = await api.delete(`/ratings/${id}`);

            if (response.status == 204 || response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao excluir a avaliação.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar excluir a avaliação. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};
