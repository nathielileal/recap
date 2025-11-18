import axios from "axios";
import { createApiInstance } from "./api.service";
import { User } from "../models/user";
import { ApiResponse } from "../models/api-response";
import { Social } from "../models/social";

export const api = createApiInstance('user');

export const UserService = {
    getUser: async (): Promise<User> => {
        try {
            const response = await api.get<User>('/user/me');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuário.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    getUsers: async (): Promise<User[]> => {
        try {
            const response = await api.get<User[]>('/user');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuários.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    getUserById: async (id: string): Promise<User> => {
        try {
            const response = await api.get<User>(`/user/${id}`);

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuário.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    // social
    getFollowers: async (): Promise<Social[]> => {
        try {
            const response = await api.get<Social[]>('/users/me/followers');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuários.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    getFollowing: async (): Promise<Social[]> => {
        try {
            const response = await api.get<Social[]>('/users/me/following');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuários.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },

    async follow(followingId: string): Promise<ApiResponse<Social>> {
        try {
            const response = await api.post(`/users/me/follow`, { targetId: followingId });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao seguir usuário.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar seguir este usuário. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async unfollow(followingId: string): Promise<ApiResponse<Social>> {
        try {
            const response = await api.post(`/users/me/unfollow`, { targetId: followingId });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao deixar de seguir usuário.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao tentar deixar de seguir este usuário. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};