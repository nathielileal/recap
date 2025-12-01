import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { MovieRating, Rating } from "../models/rating";
import { createApiInstance } from "./api.service";
import { Recommendation } from "../models/recommendation";

export const api = createApiInstance('rating');

export const RatingService = {
    getRecommendationByUser: async (userId: string): Promise<Recommendation> => {
        try {
            const response = await api.get<Recommendation>(`/recommendations/${userId}`);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar recomendações.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    async saveTextRecommendation(userId: string, text: string): Promise<ApiResponse<Recommendation>> {
        try {
            const response = await api.post('/recommendations', {userId: userId, text: text});

            if (response.status == 201 || response.status == 200) {
                return { success: true, results: response.data };
            }
            
            if (response.status == 204) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao buscar recomendação.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao buscar recomendação. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};
