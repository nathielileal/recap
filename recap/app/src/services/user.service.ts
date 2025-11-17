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
};