import axios from "axios";
import { ApiResponse } from "../models/api-response";
import { List } from "../models/list";
import { Movie } from "../models/movie";
import { createApiInstance } from "./api.service";
import { AuthService } from "./auth.service";

export const api = createApiInstance('list');

export const ListService = {
    getUserLists: async (): Promise<List[]> => {
        try {
            const response = await api.get<List[]>('/lists/me');
            const data = response.data;
           
            data.sort((a, b) =>
                b.createdAt.localeCompare(a.createdAt)
            );

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar listas.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    getMoviesPerList: async (listId: number): Promise<Movie[]> => {
        try {
            const response = await api.get<Movie[]>(`/lists/${listId}/me`);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar filmes da lista.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    async saveList(name: string): Promise<ApiResponse<List>> {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.post('/lists', { userId: userId, name: name });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao criar a lista.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar criar a lista. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async updateList(listId: number, name: string): Promise<ApiResponse<List>> {
        try {
            const response = await api.put(`/lists/${listId}`, { name: name });

            if (response.status == 201 || response.status == 200) {
                return { success: true, results: response.data };
            }

            if (response.status === 204) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao atualizar a lista.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar atualizar a lista. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async deleteList(listId: number): Promise<ApiResponse<List>> {
        try {
            const response = await api.delete(`/lists/${listId}`);

            if (response.status == 200 || response.status == 201 || response.status === 204) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao excluir a lista.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar excluir a lista. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async addMovieToList(listId: number, tmdbId: number): Promise<ApiResponse<List>> {
        try {
            const response = await api.post(`/lists/${listId}/movies`, { tmdbId: tmdbId });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao adicionar o filme à lista.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar adicionar o filme à lista. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};