import { useCallback, useState } from 'react';
import { NotificatonService } from '../services/notification.service';
import { Notification, NotificationData } from '../models/notification';

export const useNotificationViewModel = () => {
    const [notif, setNotif] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);

    const get = useCallback(async () => {
        setLoading(true);

        try {
            const result = await NotificatonService.getNotificationByUserID();

            const data = result.sort((a, b) => {
                const dateA = new Date(a.createdAt).getTime();
                const dateB = new Date(b.createdAt).getTime();

                return dateB - dateA;
            });

            setNotif(data);
        } catch (apiError: any) {
            setNotif([]);
            console.error('Erro ao carregar notificações:', apiError);
        } finally {
            setLoading(false);
        }
    }, []);

    const markRead = async (notificationId: string) => {
        return await NotificatonService.markRead(notificationId);
    };

    const deleteNotif = async (id: string) => {
        return await NotificatonService.delete(id);
    };

    return { notif, get, loading, markRead, deleteNotif };
};