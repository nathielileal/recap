import { createContext, useCallback, useContext, useEffect, useState } from "react";

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

const INTERVAL = 30000; 

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = async (): Promise<NotificationCount> => {
        const dummyCount = Math.floor(Math.random() * 5); 
        return { unreadCount: dummyCount }; 
    };

    const refreshCount = useCallback(async () => {
        try {
            const data = await fetchUnreadCount();
            setUnreadCount(data.unreadCount);
        } catch (error) {
            console.error("Erro ao buscar contagem de notificações:", error);
            setUnreadCount(0);
        }
    }, []);

    useEffect(() => {
        refreshCount(); 

        const intervalId = setInterval(() => {
            refreshCount();
        }, INTERVAL);

        return () => clearInterval(intervalId);
    }, [refreshCount]);

    const value = { unreadCount, refreshCount };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}