import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from '../services/auth.service';

interface AuthContextType {
    isAuthenticated: boolean | null;
    isLoading: boolean;
    logout: () => Promise<void>;
    updateAuthStatus: () => Promise<void>;
    sessionExpired: boolean,
    setSessionExpired: (v: boolean) => void,
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: null,
    isLoading: true,
    logout: () => Promise.resolve(),
    updateAuthStatus: () => Promise.resolve(),
    sessionExpired: false,
    setSessionExpired: () => { },
});

export function useAuthContext() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [sessionExpired, setSessionExpired] = useState(false);

    const logout = async (dueToExpiration = false) => {
        await AuthService.clearSession();

        setIsAuthenticated(false);
        setSessionExpired(false);
        setIsLoading(false);
    };

    const checkAuth = async () => {
        const token = await AuthService.getAuthToken();

        setIsAuthenticated(!!token);

        if (token) {
            setSessionExpired(false);
        }

        setIsLoading(false);
    };

    const updateAuthStatus = async () => {
        setIsLoading(true);
        await checkAuth();
    }

    useEffect(() => {
        AuthService.setSessionExpiredNotifier((value: boolean) => {
            setSessionExpired(value);
        });

        checkAuth();
    }, []);

    const value = { isAuthenticated, isLoading, logout, updateAuthStatus, sessionExpired, setSessionExpired };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}