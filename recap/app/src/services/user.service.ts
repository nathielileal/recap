import axios from "axios";
import { createApiInstance } from "./api.service";
import { User } from "../models/user";

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

    getFollowers: async (): Promise<User[]> => {
        try {
            const response = await api.get<User[]>('/users/me/followers');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuários.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },
   
    getFollowing: async (): Promise<User[]> => {
        try {
            const response = await api.get<User[]>('/users/me/following');

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Erro ao buscar usuários.');
            }

            throw new Error('Ocorreu um erro desconhecido.');
        }
    },
};