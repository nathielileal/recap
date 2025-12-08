import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { NotificatonService } from "../services/notification.service";
import { useAuthContext } from "../context/AuthContext";

interface NotificationCount {
    unreadCount: number;
}

interface NotificationContextType {
    unreadCount: number;
    refreshCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType>({
    unreadCount: 0,
    refreshCount: () => Promise.resolve(),
});

export function useNotificationContext() {
    return useContext(NotificationContext);
}

const INTERVAL = 3000;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);
    const { isAuthenticated, isLoading } = useAuthContext();

    const fetchUnreadCount = async (): Promise<NotificationCount> => {
        const data = await NotificatonService.getNotificationByUserID();
        let count = data.filter((notif) => notif.read === false).length

        return { unreadCount: count };
    };

    const refreshCount = useCallback(async () => {
        if (!isAuthenticated) {
            setUnreadCount(0);
            return;
        }

        try {
            const data = await fetchUnreadCount();
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error("Erro ao buscar contagem de notificações:", error);
            setUnreadCount(0);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (!isLoading) {
            refreshCount();

            const intervalId = setInterval(() => {
                refreshCount();
            }, INTERVAL);

            return () => clearInterval(intervalId);
        }
    }, [refreshCount, isLoading]);

    const value = { unreadCount, refreshCount };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}