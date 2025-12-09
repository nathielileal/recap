import axios from "axios";
import { createApiInstance } from "./api.service";
import { AuthService } from "./auth.service";
import { Notification } from "../models/notification";
import { ApiResponse } from "../models/api-response";

export const api = createApiInstance('notification');

export const NotificatonService = {
    getNotificationByUserID: async (): Promise<ApiResponse<Notification[]>> => {
        try {
            const userId = await AuthService.getAuthIDUser();
            const response = await api.get<Notification[]>(`/notifications/${userId}`);

             if (response.status == 201 || response.status == 200) {
                return { success: true, result: response.data };
            }

            return { success: false, error: 'Ocorreu um erro inesperado ao mostrar notificações.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao mostrar as notificações. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async markRead(notificationId: string): Promise<ApiResponse<Notification>> {
        try {
            const response = await api.post('/notifications/mark-read', { notificationId: notificationId });

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao ler notificação.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao ler a notificação. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },

    async delete(id: string): Promise<ApiResponse<Notification>> {
        try {
            const response = await api.delete(`/notifications/${id}`);

            if (response.status == 201 || response.status == 200) {
                return { success: true };
            }

            return { success: false, message: response.data.message, error: 'Ocorreu um erro inesperado ao excluir notificação.' };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const apiError = error.response?.data?.error || error.response?.data?.message;

                return { success: false, error: apiError || 'Ocorreu um erro ao excluir a notificação. Tente novamente mais tarde.' };
            }

            return { success: false, error: 'Ocorreu um erro desconhecido.' };
        }
    },
};